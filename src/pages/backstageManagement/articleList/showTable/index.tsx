import React, { useState } from 'react'
import { Table, Button, message } from 'antd'
import { fetchGetArticleList, fetchGetArticle, fetchDeleteArticle } from 'src/api/modules/article'
import { useNavigate } from 'react-router'
import { initPagination } from '../../constant'
export const ShowTable = (props) => {
  const { articleList, pagination, setPagination, formVal, getArticleList } = props
  const navigate = useNavigate()
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '文章封面',
      dataIndex: 'coverUrl',
      key: 'coverUrl',
      render(text) {
        return (
          <div>
            <img width="50px" src={text} alt="" />
          </div>
        )
      },
    },
    {
      title: '发布日期',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '分类',
      dataIndex: 'categoryList',
      key: 'categoryList',

      render(text) {
        return (text && text.length > 0) ? text.map((item) => (<span key={item}>{item.categoryName}</span>)) : '-'
      },
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
    },
    {
      title: '操作',
      key: 'tags',
      render(_, record) {
        return (
          <div className='flex justify-around'>
            <Button onClick={() => stepToItem(record.id)}>查看</Button>
            <Button>编辑</Button>
            <Button onClick={() => deleteArticle(record.id)}>删除</Button>
          </div>
        )
      },
    },
  ]
  // 删除文章
  const deleteArticle = async (id: number) => {
    try {
      const res = await fetchDeleteArticle(id)
      console.log(res, 'resres')
      if (res) {
        message.success('删除成功')
        getArticleList()
      }
    } catch (error) {
      console.log(error)
      message.error(error)
    }
  }
  const stepToItem = (id: number) => {
    navigate(`/backstageManagement/articleItem?id=${id}`)
  }
  const handleChange = (pagination) => {
    setPagination(pagination)
    getArticleList({
      pagination,
      title: formVal.title,
      categoryIdList: formVal.categoryIdList,
    })
  }
  return (
    <div>
      <Table columns={columns} dataSource={articleList} pagination={pagination} onChange={handleChange} />
    </div>
  )
}
