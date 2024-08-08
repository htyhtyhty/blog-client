import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment';
export const ArticleCard: React.FC<any> = (props) => {
  const { id, content, title, createTime, coverUrl, categoryList, viewTotal } = props.data;
  const navigate = useNavigate();
  const openItemHandle = async (id: number) => {
    navigate(`/article?id=${id}`)
  }
  return (
<div className='flex rounded-xl overflow-x-hidden bg-blue-50 h-48 m-4' key={id} onClick={() => openItemHandle(id)}>
    <div style={{ backgroundImage: `url(${coverUrl})`, backgroundColor: '#ccc' }} className='w-3/12 bg-contain bg-center h-full'/>
    <div className='h-full flex-auto w-9/12 flex flex-col'>
      <h2 className='h-2/6 text-30'>{title}</h2>
      <p className='h-2/6 w-full overflow-hidden text-14'>{content}</p>
      <div className='h-1/6'>{
        categoryList?.map((item) => <span className='bg-slate-500 p-1 m-2' key={item.id}>{item.categoryName}</span>)
      }
      </div>
      <div className='flex h-1/6'>
        <span>{moment.unix(new Date(createTime)?.getTime() / 1000).format('YYYY-MM-DD')}</span>
        <span>{viewTotal}</span>
      </div>
    </div>
</div>
)
}
