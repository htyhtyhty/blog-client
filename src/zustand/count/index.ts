import { create } from 'zustand'
import { fetchGetInfoCount } from 'src/api/modules/article'

const initState = {
  articleTotal: 0,
  categoryTotal: 0,
  tagTotal: 0,
}

interface IUserInfo {
  articleTotal:number;
  categoryTotal:number;
  tagTotal:number;
}
interface IState {
  countInfo:IUserInfo;
  setCountInfo:()=>void;
}
export const useCountStore = create<IState>((set) => ({
  countInfo: initState,
  setCountInfo: async () => {
    const res = await fetchGetInfoCount()
    set({ countInfo: res.data })
  },
}))
