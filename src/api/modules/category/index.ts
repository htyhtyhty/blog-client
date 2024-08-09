import { Request } from '../../index'
export const fetchAddCategory = async (params:{name:string}) => {
  const res = await Request.post<any>({
    url: 'category',
    data: params,
  })
  return res
}
export const fetchGetArticle = async (articleId:number) => {
  const res = await Request.get<any>({
    url: `article/${articleId}`,
  })
  return res
}
export const fetchGetAllCategory = async () => {
  const res = await Request.get<any>({
    url: 'category',
  })
  return res
}
