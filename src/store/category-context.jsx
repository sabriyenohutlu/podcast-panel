import { db } from "../firebase";
import { createContext, useContext, useState, useEffect } from "react";
import { usePodcastContext } from "./podcast-context";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const CategoryContext = createContext();

export const CategoryContextWrapper = ({ children }) => {

  const { podcast } = usePodcastContext();
  const [categoryList, setCategoryList ] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   let controller = new AbortController();
   (async () => {
    const q = query(
      collection(db,"category"),
      orderBy("datePublished", "asc")
    );
    const jobgetting = onSnapshot(q, (snap) => {
      var podcastCategoryList = [];

      snap.forEach((doc) => {
        podcastCategoryList.unshift({...doc.data(),doc:doc.id});
      });
      setCategoryList(podcastCategoryList);
      setLoading(true)
    });
    return () => jobgetting();
   })();
   return () => controller.abort();
  }, [])

  var podcastCategory = podcast?.reduce((result, item) => {
    result[item.category] = [];
    return result;
  },{});

  Object.keys(podcastCategory).forEach((category) => {
    let findCategories = podcast.filter((title) => title.category == category);
    podcastCategory[category] = findCategories
  })
  return (
    <CategoryContext.Provider value={{ podcastCategory, categoryList }}>
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategoryContext = () => useContext(CategoryContext);
