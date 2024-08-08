import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, message, Input } from 'antd';
import { HeartOutlined, CommentOutlined } from '@ant-design/icons';
import { fetchGetArticle, fetchHandleLike, getArticleState } from 'src/api/modules/article';
import { fetchAddComment } from 'src/api/modules/comment';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';// 支持GFM
import highlight from '@bytemd/plugin-highlight';// 代码高亮
import frontmatter from '@bytemd/plugin-frontmatter';// 解析前题
import mediumZoom from '@bytemd/plugin-medium-zoom';// 缩放图片
import gemoji from '@bytemd/plugin-gemoji' // (支持Gemoji短代码);
import moment from 'moment';
import { Comment } from './comment';
import type { IArticleInfo, IAuthorInfo } from './type';
// 引入基础css
import 'bytemd/dist/index.min.css';
// 引入高亮css
import 'highlight.js/styles/vs.css';
import 'juejin-markdown-themes/dist/scrolls-light.min.css'
import 'highlight.js/styles/docco.css';
const ArticleItem: React.FC = () => {
  const { TextArea } = Input;
  // 登录者是否喜欢该文章
  const [isLike, setIsLike] = useState(false);
  // 作者信息
  const [authorInfo, setAuthorInfo] = useState<IAuthorInfo>({} as IAuthorInfo);
  // 文章信息
  const [articleInfo, setArticleInfo] = useState<IArticleInfo>({} as IArticleInfo);
  const [query]: any = useSearchParams();
  const plugins = [
    gfm(), // GFM
    highlight(), // 代码高亮
    frontmatter(), // 解析前题
    mediumZoom(), // 图片缩放
    gemoji(), // Gemoji短代码
  ];
  useEffect(() => {
    getArticleById();
    getArticleLikedState();
  }, []);
  // 根据id获取具体文章信息
  const getArticleById = async () => {
    const res = await fetchGetArticle(query.get('id'));
    const { content, title, category, createTime, author } = res?.data;
    const html = content?.replace(/\\\\n/g, '\n').replace(/\\n/g, '\n');
    setArticleInfo({ content: html, title, createTime: moment.unix(new Date(createTime)?.getTime() / 1000).format('YYYY-MM-DD'), category })
    setAuthorInfo(author);
  }

  // 获取文章喜欢状态
  const getArticleLikedState = async () => {
    try {
      if (!localStorage.getItem('userId')) {
        return message.info('请先进行登录再进行操作');
      }
      const res = await getArticleState({ userId: +localStorage.getItem('userId'), articleId: query.get('id') });
      setIsLike(res.data.isLiked)
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  }
  // 处理文章点赞
  const handleLike = async () => {
    let type = 0;
    try {
      if (!isLike) {
        type = 1
      }
      if (!localStorage.getItem('userId')) {
        return message.info('请先进行登录再进行操作');
      }
      const res = await fetchHandleLike({ userId: +localStorage.getItem('userId'), articleId: query.get('id'), type });
      if (res.success) {
        await getArticleLikedState();
        message.success('操作成功');
      }
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  }

  const handleComment = () => {
    console.log('comment');
  }
  return (
    <div className='flex'>
      {/* 快捷操作 */}
      <div className='flex flex-col w-2/12'>
        <HeartOutlined className="text-3xl" onClick={handleLike} style={{ color: isLike ? 'pink' : '#333' }} />
        <CommentOutlined className="text-3xl" onClick={handleComment} />
        <div>切换</div>
      </div>
      <div className='w-9/12'>
        {/* 文章信息 */}
        <div>
          <h2 className="text-6xl">{articleInfo.title}</h2>
          <div className='flex'>
            <span className='mr-10'>{authorInfo.name}</span>
            <span>{articleInfo.createTime}</span>
          </div>
        </div>
        {/* 文章内容 */}
        <Viewer value={articleInfo.content} plugins={plugins} />
        {/* 评论 */}
        <Comment articleId={query.get('id')} />
      </div>
    </div>
  )
}
export default ArticleItem;
