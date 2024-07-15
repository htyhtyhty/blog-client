import {Request} from '../../index';
export const fetchSubmitArticle = (params:IArticleSubmitReq) => {
  const res = Request.post({
    url: 'article',
    data: params
  })
  return res;
}
export const fetchGetArticle = (articleId:number):any => {
  const res = Request.get({
    url: `article/${articleId}`,
  })
  return res;
}
export const fetchGetArticleList = (params:IArticleListReq) => {
  const res = Request.get<IArticleListRes>({
    url: 'article',
    params
  })
  return res;
}