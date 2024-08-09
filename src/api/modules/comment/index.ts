import { Request } from '../../index'
export const fetchAddComment = async (params:IAddCommentReq) => {
  const res = await Request.post<any>({
    url: 'comment',
    data: params,
  })
  return res
}

export const fetchGetCommentList = async (params:{articleId:number;commentId?:number}) => {
  const { articleId, commentId } = params
  const res = await Request.get<any>({
    url: `comment?articleId=${articleId}${commentId ? `&commentId=${ commentId}` : ''}`,
  })
  return res
}
