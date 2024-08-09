import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Paginate } from 'src/components/paginate'
import { fetchGetArticleList } from '../../api/modules/article'
import { ArticleCard } from './articleCard'
const ArticleHome:React.FC = () => {
  const [articleList, setArticleList] = useState<IArticleItem[]>([] as any as IArticleItem[])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  useEffect(() => {
    getArticleList()
  }, [])
  const getArticleList = async (currentPage = { current: 1, pageSize: 10 }) => {
    try {
      const res = await fetchGetArticleList(currentPage)
      setArticleList(res.data)
      setTotal(res.total)
      setCurrentPage(res.current)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
  return (
<div>
    <motion.div
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'pink',
        borderRadius: '20px',
      }}
      // 以下三个属性
      // 是motion组件提供的能力

      // 实现鼠标悬浮的效果
      whileHover={{
        rotate: 45,
        scale: 1.2,
      }}
      // 让元素可以随意拖拽
      drag
    >
        <div>span</div>
    </motion.div>
    {
      articleList?.map((item) => <ArticleCard key={item} data={item || {}} />)
    }
    <Paginate articleList={articleList} total={total} getListFn={getArticleList} currentPage={currentPage} />
</div>
)
}
export default ArticleHome
