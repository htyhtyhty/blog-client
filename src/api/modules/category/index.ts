import {Request} from '../../index';
export const fetchAddCategory = (params: {name:string}) => {
  const res = Request.post({
    url: 'category',
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
export const fetchGetAllCategory = () => {
  const res = Request.get<any>({
    url: 'category',
  })
  return res;
}