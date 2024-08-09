import React, { useState, useEffect } from 'react'
import { Button, Table, Form, Input, Upload, message } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { fetchGetAllVideo, fetchDeleteVideo, fetchAddVideo } from 'src/api/modules/video'
import { getUploadDetail, upload, merge } from 'src/api/modules/bigFile'
const VideoManagement:React.FC<any> = () => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [coverUrl, setCoverUrl] = useState('')
  const [dataSource, setDataSource] = useState([])
  // const beforeUpload = (file: RcFile) => {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //   if (!isJpgOrPng) {
  //     message.error('You can only upload JPG/PNG file!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isJpgOrPng && isLt2M;
  // };

  useEffect(() => {
    getAllVideos()
  }, [])
  const getAllVideos = async () => {
    try {
      const res = await fetchGetAllVideo()
      if (res.data) {
        setDataSource(res.data)
        console.log(res.data, 'source')
      }
    } catch (error) {
      console.log(error)
      message.error(error)
    }
  }

  const deleteVideo = async (id) => {
    try {
      const res = await fetchDeleteVideo(id)
      if (res.data) {
        message.success('删除成功')
        getAllVideos()
      }
    } catch (error) {
      console.log(error)
      message.error(error)
    }
  }

  const addVideo = async (formValue) => {
    const { name, description } = formValue
    try {
      const res = await fetchAddVideo({
        name,
        description,
        url: videoUrl,
      })
      if (res.data) {
        message.success('添加成功')
        getAllVideos()
      }
    } catch (error) {
      console.log(error)
      message.error(error)
    }
  }
  const handleChange:UploadProps['onChange'] = (info:UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      console.log(info, 'info')
      setVideoUrl(info.file.response.data.videoUrl)
      setTimeout(() => {
        setCoverUrl(info.file.response.data.coverUrl)
      }, 1000)
    }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '视频名称',
      dataIndex: 'name',
    },
    {
      title: '视频简介',
      dataIndex: 'description',
    },
    {
      title: '上传时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render(_, record) {
        return (
          <div>
            <Button onClick={() => deleteVideo(record.id)}>删除</Button>
            <Button>查看</Button>
          </div>
        )
      },
    },
  ]

  const onSubmit = (formValue) => {
    addVideo(formValue)
  }

  const props:UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([file])
      return false
    },
    fileList,
  }

  const handleUpload = async () => {
    setUploading(true)
    let md5, suffix
    const worker = new Worker(new URL('./md5.worker.ts', import.meta.url))
    worker.postMessage(fileList[0])
    worker.onmessage = async ({ data }) => {
      if (data && data.success) {
        md5 = data.md5
        suffix = data.suffix
        const res = await getUploadDetail({ md5, suffix })
        if (!res.success) return message.success('上传失败!')
        const { isUploaded, list } = res.data
        if (isUploaded) {
          setUploading(false)
          return message.success('上传成功!')
        }

        const file = fileList[0]
        const size = getChunkSize(file.size as number)
        const chunks = getChunks(file, size, md5, suffix, list)
        const tasks = packageTasks(chunks)
        await paralleTask(tasks, 4)
        await merge({ md5, suffix })
        setUploading(false)
      }
    }
    // const { md5, suffix } = await getIdentityAndName(fileList[0]);
  }

  function getChunkSize(fileSize:number) {
    const defaultSize = 1 * 1024 * 1024 // 每片1M
    const defaultCount = 100
    const maxCount = Math.ceil(fileSize / defaultSize)
    const maxSize = Math.ceil(fileSize / defaultCount)
    return maxCount > defaultCount ? maxSize : defaultSize
  }

  function getChunks(file:any, size:number, md5:string, suffix:string, list:string[]) {
    let index = 0
    const end = Math.ceil(file.size / size)
    const result = []
    while (index < end) {
      const chunk = file.slice(index * size, (index + 1) * size)
      const chunkName = `${index}-${md5}.${suffix}`
      if (!isUploadedFile(list, chunkName)) {
        const formData = new FormData()
        formData.append('file', chunk)
        formData.append('md5', md5)
        formData.append('chunkName', chunkName)
        formData.append('suffix', suffix)
        result.push(formData)
      }

      index++
    }
    return result
  }
  function packageTasks(chunks:FormData[]) {
    return chunks.map((item) => upload.bind(null, item))
  }

  function isUploadedFile(list:string[], name:string) {
    return list.includes(name)
  }
  // 并发异步队列,控制异步任务的并发数
  function paralleTask(tasks:any[], max = 4) {
    if (tasks.length === 0) return

    return new Promise((resolve, reject) => {
      let nextIndex = 0
      let finishedIndex = 0
      const len = tasks.length
      for (let i = 0; i < max && i < len; i++) {
        _run()
      }

      async function _run() {
        try {
          const task = tasks[nextIndex]
          nextIndex++
          await task()
          finishedIndex++
          const isFinished = finishedIndex === len
          if (isFinished) {
            resolve(0)
          }

          const hasTask = nextIndex < len
          if (hasTask) {
            _run()
          }
        } catch (error) {
          reject(error)
        }
      }
    })
  }

  return (
    <div>
      <Form form={form} onFinish={onSubmit}>
        <Form.Item label="视频名称" name="name">
          <Input placeholder='请输入视频名称' />
        </Form.Item>
        <Form.Item label="视频简介" name="description">
          <Input placeholder='请输入视频简介' />
        </Form.Item>
        <Form.Item label="视频内容" name="url">
          <Upload
            className="w-12 h-12 overflow-hidden"
            listType="picture-card"
            headers={{
              authorization: localStorage.getItem('token') || '',
            }}
            //  className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:8008/upload/video"
            //  beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {coverUrl ? <img src={coverUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit'>新增</Button>
        </Form.Item>
      </Form>
      <div>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}
export default VideoManagement
