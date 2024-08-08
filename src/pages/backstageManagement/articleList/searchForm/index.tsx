import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Select} from 'antd'
import { useNavigate } from 'react-router';
import { fetchGetAllCategory } from 'src/api/modules/category';
import type { ICategoryRes } from 'src/pages/articleEditor/type';
interface IProps {
  setFormVal: (params:any) => void
  getArticleList: (params?: any) => void
}
export const SearchForm = (props: IProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { getArticleList, setFormVal} = props;
  const [categoryList, setCategoryList] = useState<ICategoryRes[]>([]);
  useEffect(() => {
    getArticleList();
    getAllCategories();
  }, [])
  const stepToEditArticle = () => {
    navigate('/backstageManagement/articleEditor')
  }

  const getAllCategories = async() => {
    try {
      const res = await fetchGetAllCategory();
      setCategoryList(res.data);
      console.log(res.data, 'datatadta')
    } catch (error) {
      console.log(error)
    }
  }
  const onSearch = () => {
    const formValue = form.getFieldsValue();
    const {title, category} = formValue;
    console.log(formValue, 'formValue')
    getArticleList({title, categoryIdList: category})
    setFormVal({title, categoryIdList: category})

  }
  return <div className='flex justify-between'>
    <Button type='primary' onClick={stepToEditArticle}>写文章</Button>
    <Form form={form} className='flex justify-between'>
      <Form.Item name="title" className='mx-6 w-60'>
        <Input  placeholder='请输入文章标题'/>
      </Form.Item>
      <Form.Item name="category" className='mx-6'>
        <Select mode="multiple"
      allowClear placeholder='请输入文章分类' options={categoryList.map(item => ({label: item.categoryName, value: item.categoryId}))}/>
      </Form.Item>
      <Form.Item name="tag" className='mx-6'>
        <Select  placeholder='请输入文章标签'/>
      </Form.Item>
    </Form>
    <div className='flex items-start'>
      <Button type="primary" htmlType='submit'  onClick={onSearch}>搜索</Button>
      <Button>重置</Button>
    </div>
  </div>
}