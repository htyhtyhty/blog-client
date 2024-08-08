import { fetchGetPublicKey } from 'src/api/modules/publicKey';
import JSEncrypt from 'jsencrypt';
export const encrypt = async (value:string) => {
  let publicKey = localStorage.getItem('publicKey') || '';
  try {
    if (!publicKey) {
      const res = await fetchGetPublicKey();
      publicKey = res;
    }
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    return encrypt.encrypt(value) as string;
  } catch (err) {
    console.log(err)
    throw err;
  }
}
