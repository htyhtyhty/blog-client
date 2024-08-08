import { Request } from '../../index';
export const fetchAddVideo = async (params:{name:string; description:string; url:string}) => {
  const res = await Request.post<any>({
    url: 'video',
    data: params,
  })
  return res;
}
export const fetchGetArticle = async (articleId:number) => {
  const res = await Request.get<any>({
    url: `article/${articleId}`,
  })
  return res;
}
export const fetchGetAllVideo = async () => {
  const res = await Request.get<any>({
    url: 'video',
  })
  return res;
}
export const fetchDeleteVideo = async (id:number) => {
  const res = await Request.delete<any>({
    url: `video/${id}`,
  })
  return res;
}
