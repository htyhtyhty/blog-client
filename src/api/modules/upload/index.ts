import { Request } from '../../index'
export const fetchUploadImg = async (url:string, formData:FormData) => {
  const res = await Request.post<any>({
    url: `article/img/upload${url}`,
    data: formData,
  })
  return res
}
