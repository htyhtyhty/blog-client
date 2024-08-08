import React, {useState} from 'react';
import { SearchForm } from './searchForm';
import { ShowTable } from './showTable';
import { fetchGetArticleList, fetchGetArticle } from "src/api/modules/article";
import { initPagination } from '../constant';
const ArticleList = () => {
  const [articleList, setArticleList] = useState<IArticleItem[]>([] as any as IArticleItem[]);
  const [pagination, setPagination] = useState(initPagination)
  const [formVal, setFormVal] = useState({});
  const getArticleList = async (params?:any) => {
    const {title, categoryIdList} = params || {};
    const {current, pageSize} = params?.pagination || initPagination;
    const res = await fetchGetArticleList({ current, pageSize, title, categoryIdList});
    if (res?.data) {
      setPagination({current: res.current, total: res.total, pageSize: res.pageSize})
    }
    setArticleList(res.data)
  }
  return <div>
    <SearchForm getArticleList={getArticleList} setFormVal={setFormVal} />
    <ShowTable formVal={formVal} articleList={articleList} setPagination={setPagination} pagination={pagination} getArticleList={getArticleList} />
  </div>
}
export default ArticleList;