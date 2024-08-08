import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchGetArticleList } from '../../api/modules/article';
import { ArticleCard } from './articleCard';
const ArticleHome: React.FC = () => {
  const [articleList, setArticleList] = useState<IArticleItem[]>([] as any as IArticleItem[]);
  useEffect(() => {
    getArticleList();
  }, [])
  const getArticleList = async () => {
    const res = await fetchGetArticleList({ current: 1, pageSize: 40 });
    setArticleList(res.data)
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
</div>
)
}
export default ArticleHome;
