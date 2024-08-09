import { create } from 'zustand'
import { fetchGetUserInfo } from 'src/api/modules/user'

const initState = {
  name: 'hty',
  url: 'http://localhost:8008/2018_2_1702984141715.png',
  id: 1,
  description: '这个人很懒，什么都没有留下',
}
interface IUserInfo {
  name:string;
  url:string;
  id:number;
  description:string;
}
interface IState {
  userInfo:IUserInfo;
  setUserInfo:(userId:number)=>void;
}
export const useUserStore = create<IState>((set) => ({
  userInfo: initState,
  setUserInfo: async (userId:number) => {
    const res = await fetchGetUserInfo(userId)
    set({ userInfo: res.data })
  },
}))
