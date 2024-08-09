import React, { useState, useEffect } from 'react'
import { Input, Button, message } from 'antd'
import { fetchAddComment, fetchGetCommentList } from 'src/api/modules/comment'
import type { IGetCommentReq } from '../type'
export const Comment = (props) => {
  const { articleId } = props
  const { TextArea } = Input
  // 评论发表内容
  const [inputVal, setInputVal] = useState('')
  // 评论列表
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    getCommentList()
  }, [])
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value)
    setInputVal(e.target.value)
  }

  const handleAddComment = () => {
    addComment()
    console.log('rrr')
  }

  // 获取评论列表
  const getCommentList = async (commentId?:number) => {
    try {
      const params:IGetCommentReq = {
        articleId,
      }
      if (commentId) {
        params.commentId = commentId
      }
      const res = await fetchGetCommentList(params)
      if (res.data?.length) {
        console.log(res)
        setCommentList(res.data)
      }
    } catch (error) {
      console.log(error)
      message.error(error)
    }
  }
  const addComment = async () => {
    try {
      const res = await fetchAddComment({
        articleId,
        userId: localStorage.getItem('userId') || '',
        content: inputVal,
      })
      if (res.data) {
        message.success('评论成功')
      }
    } catch (error) {
      console.log(error)
      message.error(error)
    }
  }
  return (
<div>
    {/* 发表评论 */}
    <div>
      <TextArea
        showCount
        maxLength={100}
        style={{ height: 120, resize: 'none' }}
        onChange={onChange}
        placeholder="disable resize"
      />
      <Button type="primary" onClick={handleAddComment}>发表</Button>
    </div>
    {/* 评论展示 */}
    <div />
</div>
)
}
