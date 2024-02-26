import { useCategoryContext } from "../../store/category-context";
import "./CategoryCard.scss";

const CategoryCard = ({ title }) => {
  const { podcastCategory } = useCategoryContext();

  return (
    <div className="categoryCard">
      <div className="categoryCard-title">{title}</div>
      <div className="categoryCard-count">
        <span>Podcast sayısı : </span>
        {Object.values(podcastCategory?.[title]).length}
      </div>
    </div>
  );
};

export default CategoryCard;
