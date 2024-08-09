interface IAdmin {
  name:string;
  password:string;
}
interface ILoginRes {
  msg:string;
  token:string;
  userId:number;
  userName:string;
}

interface IArticleSubmitReq {
  content:string;
  title:string;
  userId:number;
  categoryList:number[];
  coverUrl:string;
}
interface IArticleListReq {
  current:number;
  pageSize:number;
  title?:string;
  categoryIdList?:number[];
}
interface IArticleItem {
  author:any;
  content:string;
  createTime:string;
  id:number;
}
interface IArticleListRes {
  data:IArticleItem[];
  message:string;
  pageSize:number;
  total:number;
  current:number;
}

interface IGetArticleStateReq {
  userId:number;
  articleId:number;
}

interface IHandleLikeReq extends IGetArticleStateReq {
  type:number;
}

interface IAddCommentReq {
  content:string;
  articleId:number;
  userId:string;
  commentId?:number;
}
