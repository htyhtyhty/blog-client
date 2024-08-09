export interface IArticleInfo {
  title:string;
  content:string;
  createTime:string;
  category:any[];
}

export interface IAuthorInfo {
  name:string;
  description:string;
  avatar:string;
}
export interface IGetCommentReq {
  articleId:number;
  commentId?:number;
}
