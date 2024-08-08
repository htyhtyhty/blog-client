import { Request } from '../../index';
export const fetchGetPublicKey = async () => {
  const res = await Request.get<any>({
    url: 'publicKey',
  })
  const val = res.data.replace(/\. +/g, '').replace(/[\r\n]/g, '')
  localStorage.setItem('publicKey', val)
  return val;
}
