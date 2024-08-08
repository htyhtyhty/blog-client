import React, { useState, useEffect } from 'react';
import { Tag, Button } from 'antd';
import { fetchAddCategory, fetchGetAllCategory } from '../../api/modules/category';
import type { ICategoryRes } from '../articleEditor/type';
const ArticleCategory = () => {
  const [categoryList, setCategoryList] = useState<ICategoryRes[]>([]);
  useEffect(() => {
    getAllCategories();
  }, [])
  const getAllCategories = async () => {
    try {
      const res = await fetchGetAllCategory();
      setCategoryList(res.data);
      console.log(res.data, 'datatadta')
    } catch (error) {
      console.log(error)
    }
  }
  const addCategory = async (name:string) => {
    try {
      const res = await fetchAddCategory({ name })
      console.log(res, 'categoryRes')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Button onClick={() => addCategory('css')}>添加标签</Button>
      {categoryList?.map((item) => (
        <div key={item.categoryId}>{item.categoryName}</div>
      ))}
    </div>
  )
}
export default ArticleCategory;
