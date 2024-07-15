import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router';
import { RouterMap } from '../../router';
interface IMenuItem {
  label: string;
  key: string;
  icon: any;
}
export const BlobHeader = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('mail');
  const menus: IMenuItem[] = RouterMap.filter((item) => item.isMenu).map((item) => {
    return {
      label: item.name,
      key: item.path,
      icon: <MailOutlined />,
    };
  });

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const handleOut = () => {
    navigate('/login');
  }
  return (
    <div className="flex justify-between">
      <div>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
          {menus.map((item, idx) => {
            return <Menu.Item key={idx} >
              <Link to={item?.key || '/' as any}>{item!.label as any}</Link>
            </Menu.Item>
          })}
        </Menu>;
      </div>
      <div onClick={handleOut}>登出</div>
    </div>)
}