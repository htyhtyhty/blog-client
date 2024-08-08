import { Request } from '../../index';
export const getUploadDetail = async (params: {md5:string; suffix:string}) => {
  const res = await Request.get<any>({
    url: `uploadDetail?md5=${params.md5}&suffix=${params.suffix}`,
  })
  return res;
}
export const upload = async (params:any) => {
  const res = await Request.post<any>({
    url: 'uploadDetail',
    data: params,
  })
  return res;
}
export const merge = async (params: {md5:string; suffix:string}) => {
  const res = await Request.get<any>({
    url: `mergeFile?md5=${params.md5}&suffix=${params.suffix}`,
  })
  return res;
}
