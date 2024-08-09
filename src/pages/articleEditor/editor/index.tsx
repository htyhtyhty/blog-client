import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import zhHans from 'bytemd/locales/zh_Hans.json'
import gfm from '@bytemd/plugin-gfm'// 支持GFM
import highlight from '@bytemd/plugin-highlight'// 代码高亮
import frontmatter from '@bytemd/plugin-frontmatter'// 解析前题
import mediumZoom from '@bytemd/plugin-medium-zoom'// 缩放图片
import gemoji from '@bytemd/plugin-gemoji' // (支持Gemoji短代码);
import { Editor } from '@bytemd/react'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'
import { fetchUploadImg } from '../../../api/modules/upload'
import { fetchSubmitArticle, fetchGetArticle } from '../../../api/modules/article'
// 引入基础css
import 'bytemd/dist/index.min.css'
// 引入高亮css
// import "highlight.js/styles/vs.css";
// import 'juejin-markdown-themes/dist/juejin.min.css'
// import 'juejin-markdown-themes/dist/mk-cute.min.css'
// import 'juejin-markdown-themes/dist/arknights.min.css'
import 'juejin-markdown-themes/dist/scrolls-light.min.css'
import 'highlight.js/styles/docco.css'
import './index.scss'
interface IProps {
  selectedTags:number[];
}
export const ComEditor:React.FC<IProps> = (props) => {
  const { selectedTags } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const [titleValue, setTitleValue] = useState('')
  const plugins = [
    gfm(), // GFM
    highlight(), // 代码高亮
    frontmatter(), // 解析前题
    mediumZoom(), // 图片缩放
    gemoji(), // Gemoji短代码
  ]

  // 编辑器内容
  const [html, setHtml] = useState('')
  const getArticleById = async () => {
    const res = await fetchGetArticle(6)
    console.log(res, 'resres')
    setHtml(res.data.content)
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  const getUploadImgUrl = async (formData:FormData) => {
    try {
      const res:any = await fetchUploadImg('/article', formData)
      return res.data.url
    } catch (error) {
      console.log(error)
    }
  }
  const beforeUpload = (file:RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange:UploadProps['onChange'] = (info:UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      console.log(info, 'info')
      setImageUrl(info.file.response.data.url)
    }
  }

  const submitHandle = async () => {
    const userId = localStorage.getItem('userId') || 0
    const res = await fetchSubmitArticle({ userId: +userId, content: html, categoryList: selectedTags, title: titleValue, coverUrl: imageUrl })
    console.log(html, selectedTags, titleValue, imageUrl, 'ressubmit')
  }
  return (
    <div>
      <div>
        <Form form={form} className="flex justify-between">
          <Form.Item label="文章标题" name="articleName">
            <Input placeholder="请输入标题" onChange={(e) => setTitleValue(e.target.value)} />
          </Form.Item>
          <Form.Item label="文章封面" name="articleCover">
            <Upload
             className="w-12 h-12 overflow-hidden"
             listType="picture-card"
             headers={{
               authorization: localStorage.getItem('token') || '',
             }}
            //  className="avatar-uploader"
             showUploadList={false}
             action="http://localhost:8008/article/img/upload/cover"
             beforeUpload={beforeUpload}
             onChange={handleChange}
            >
                 {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </div>
      <Editor
        locale={zhHans}
        plugins={plugins}
        value={html}
        uploadImages={async (files:any) => {
          let imgUrl = ''
          const formData = new FormData()
          formData.append('uploadImg', files[0])
          const res = await getUploadImgUrl(formData)
          imgUrl = res// 这里是上传成功后，服务端返回的图片地址
          return [
            {
              title: files.map((i:any) => i.name),
              url: imgUrl,
            },
          ]
        }}
        onChange={(v) => (setHtml(v))}
      />
      <Button onClick={submitHandle}>提交</Button>
      <Button onClick={getArticleById}>回显</Button>
    </div>
  )
}
