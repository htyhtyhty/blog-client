import React from 'react'
export const Paginate:React.FC<any> = (props) => {
  const { total, getListFn, currentPage } = props
  const handleStep = (idx:number) => {
    getListFn({ current: idx, pageSize: 10 })
  }
  return (
<div className='flex'>
       { currentPage !== 1 && <div onClick={() => handleStep(currentPage - 1)}> 向前 </div>}
    {new Array(Math.ceil(total / 10)).fill(0).map((_, index) => index + 1 ).map((item, idx) => <div onClick={() => handleStep(idx + 1)} key={idx} style={{ width: '50px', height: '50px', marginRight: '30px', backgroundColor: currentPage - 1 === idx ? 'blue' : 'pink' }}>{item}</div>)}
   { currentPage !== (new Array(Math.ceil(total / 10)).fill(0).length) && <div onClick={() => handleStep(currentPage + 1)}> 向后 </div>}
</div>
)
}
