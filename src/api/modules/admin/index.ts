import { Request } from '../../index'
export const fetchLogin = async (params:IAdmin) => {
  const res = await Request.post<ILoginRes>({
    url: 'admin/login',
    data: params,
  })
  return res
}
