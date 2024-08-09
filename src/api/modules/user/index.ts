import { Request } from '../../index'

export const fetchGetUserInfo = async (userId:number) => {
  const res = await Request.get<any>({
    url: `user?userId=${userId}`,
  })
  return res
}
export const fetchUpdateUserInfo = async (params:any) => {
  const res = await Request.patch<any>({
    url: 'user',
    data: params,
  })
  return res
}
