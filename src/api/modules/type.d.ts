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
}
interface IArticleItem {
  author:any;
  content:string; 
  createTime:string;
  momentId:number;
}
interface IArticleListRes {
  data: IArticleItem[];
  message:string;
  pageSize:string;
  total:string;
  current:string;
}
declare module 'prismjs'