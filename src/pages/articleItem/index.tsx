import React, {useState, useEffect} from 'react';
import { useSearchParams } from "react-router-dom";
import { Button } from "antd";
import { fetchGetArticle } from "../../api/modules/article";
import { Viewer } from "@bytemd/react";
// 引入基础css
import 'bytemd/dist/index.min.css';
// 引入高亮css
import "highlight.js/styles/vs.css";
import 'juejin-markdown-themes/dist/juejin.min.css'
const ArticleItem: React.FC = () => {
  const [html, setHtml] = useState<string>('');
  const [query]:any = useSearchParams();
  useEffect(() => {
    getArticleById();
  }, []);
  const getArticleById = async() => {
    const res = await fetchGetArticle(query.get('id'));
    setHtml(res.data.content.replace(/\\\\n/g, '\n').replace(/\\n/g, '\n'));
  }
  return (
    <div className='typo line-numbers'>
      <Viewer value={html} />
    </div>
  )
}
export default ArticleItem;