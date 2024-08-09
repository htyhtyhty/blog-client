import { useLocation } from 'react-router-dom'
import { RouterMap } from '../router'
export const useIsShowSider = () => {
  const location = useLocation()
  const pathName = `/${location.pathname.split('/')[1]}`
  if (RouterMap.every((item) => item.path !== pathName)) {
    return false
  }
  if (RouterMap.find((item) => item.path === pathName)?.hasSider) {
    return true
  }
  return false
}
