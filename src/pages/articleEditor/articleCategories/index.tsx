import React, { useState, useEffect } from 'react'
import { Tag } from 'antd'
import { fetchAddCategory, fetchGetAllCategory } from '../../../api/modules/category'
import type { ICategoryRes } from '../type'
const { CheckableTag } = Tag
interface IProps {
  selectedTags:number[];
  setSelectedTags:(value:number[])=>void;
}
export const ArticleCategorySelect:React.FC<IProps> = (props) => {
  const { selectedTags, setSelectedTags } = props
  const [categoryList, setCategoryList] = useState<ICategoryRes[]>([])
  useEffect(() => {
    getAllCategories()
  }, [])
  const getAllCategories = async () => {
    try {
      const res = await fetchGetAllCategory()
      setCategoryList(res.data)
      console.log(res.data, 'datatadta')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (tagId:number, checked:boolean) => {
    if (checked) {
      setSelectedTags([...selectedTags, tagId])
    } else {
      const resTags = selectedTags.filter((item) => item !== tagId)
      setSelectedTags(resTags)
    }
  }
  return (
    <div>
      {
        categoryList.map((item) => (
          <CheckableTag key={item.categoryId} checked={selectedTags.indexOf(item.categoryId) > -1 }
          onChange={(checked) => handleChange(item.categoryId, checked)}
          >
            {item.categoryName}
          </CheckableTag>
        ))
      }
    </div>
  )
}
