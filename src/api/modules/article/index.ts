import { Request } from '../../index'
export const fetchSubmitArticle = async (params:IArticleSubmitReq) => {
  const res = await Request.post<any>({
    url: 'article/addArticle',
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
export const fetchGetArticleList = async (params:IArticleListReq) => {
  const res = await Request.post<IArticleListRes>({
    url: 'article',
    data: params,
  })
  return res
}
export const fetchDeleteArticle = async (id:number) => {
  const res = await Request.delete<any>({
    url: `article/${id}`,
  })
  return res
}

// 文章点赞
export const fetchHandleLike = async (params:IHandleLikeReq) => {
  const res = await Request.post<any>({
    url: 'like',
    data: params,
  })
  return res
}

export const getArticleState = async (params:IGetArticleStateReq) => {
  const res = await Request.get<any>({
    url: `like?userId=${params.userId}&articleId=${params.articleId}`,
  })
  return res
}

export const fetchGetInfoCount = async () => {
  const res = await Request.get<any>({
    url: 'count',
  })
  return res
}
