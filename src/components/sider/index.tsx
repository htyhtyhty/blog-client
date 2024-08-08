import React, { useState, useEffect } from 'react';
import { useUserStore } from 'src/zustand/user';
import { useCountStore } from 'src/zustand/count';
interface IUserInfo {
  name: string;
  url: string;
  id: number;
  description: string;
}
export const SiderWrap: React.FC<any> = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  const countInfo = useCountStore((state) => state.countInfo);
  return (
    <div>
      <div>
        <img className='w-24 h-24 rounded-full' src={userInfo?.url} alt="" />
      </div>
      <div>
        <span>{userInfo?.name}</span>
        <span>{userInfo?.description}</span>
      </div>
      <div>
        <span>{`文章: ${countInfo?.articleTotal}`}</span>
        <span>{`分类: ${countInfo?.categoryTotal}`}</span>
      </div>
    </div>
)
}
