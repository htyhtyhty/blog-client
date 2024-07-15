import React, { useState, useEffect } from "react";
import { fetchGetArticleList, fetchGetArticle } from "../../api/modules/article";
import { useNavigate } from "react-router";
const ArticleHome: React.FC = () => {
  const [articleList, setArticleList] = useState<IArticleItem[]>([] as any as IArticleItem[]);
  const navigate = useNavigate();
  useEffect(() => {
    getArticleList();
  }, [])
  const getArticleList = async () => {
    const res = await fetchGetArticleList({ current: 1, pageSize: 40 });
    setArticleList(res.data)
  }
  const openItemHandle = async(id:number) => {
    navigate(`/article?id=${id}`)
  }
  return <div>
    {
      articleList?.map((item) => {
        return <div key={item.momentId} onClick={() => openItemHandle(item.momentId)}>
          <p>{item.content}</p>
          <span>{item.createTime}</span>
        </div>
      })
    }
  </div>
}
export default ArticleHome;