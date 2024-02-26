import { useCategoryContext } from "../../store/category-context";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./Categories.scss";
const Categories = () => {
  const { podcastCategory } = useCategoryContext();

  const categoryList = Object.keys(podcastCategory).map((i, idx) => {
    return <CategoryCard key={idx} title={i}/>;
  });

  return <div className="categories">{categoryList}</div>;
};

export default Categories;
