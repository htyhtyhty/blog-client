import React, {useState} from "react";
import {ComEditor} from "./editor";
import { ArticleCategorySelect } from "./articleCategories";
const ArticleEditors:React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  return (
  <div>
      <ComEditor selectedTags={selectedTags} />
      <ArticleCategorySelect selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
    </div>
    )
}
export default ArticleEditors;