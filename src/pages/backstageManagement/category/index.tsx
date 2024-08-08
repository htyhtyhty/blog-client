import React from "react";
import {Input, Table, Button} from 'antd';
const CategoryManagement = () => {
  const {Search} = Input;
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
    {
      title: '操作',
      key: 'action',
      render () {
        return <div>
          <Button>编辑</Button>
          <Button>删除</Button>
        </div>
      }
    },
    
  ];
  const onSearch = (value: string) => {
    console.log(value);
  };
  return <div>
    <Search placeholder="请输入分类名称" allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch} />
    <Table columns={columns}  />
  </div>
}
export default CategoryManagement;