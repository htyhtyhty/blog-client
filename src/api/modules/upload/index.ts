import {Request} from '../../index';
export const fetchUploadImg = (formData:FormData) => {
  const res = Request.post({
    url: 'article/img/upload',
    data: formData
  })
  return res;
}