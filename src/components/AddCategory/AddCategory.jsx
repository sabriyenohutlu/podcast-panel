import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { categoryTitleData } from "../../categoryTitleData";
import { useState } from "react";
import { db } from "../../firebase";
import { useCategoryContext } from "../../store/category-context";
import "./AddCategory.scss";
const AddCategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryList } = useCategoryContext();

  const onChangeForm = (e) => {
    const { value, name} = e.target;
    setCategory((pre) => ({...pre, [name]: value}));
  };

  const categoryTitleList = categoryList.map((i, idx) => {
    return (
      <div className="category-list" key={idx}>
        <div className="category-item"> {i.title}</div>
      </div>
    );
  });

  var categoryRef = collection(db, "category")

  const formSubmitHandler = async(e) => {
     e.preventDefault();
     var now = new Date();
     let a;
     try {
      a = await addDoc(categoryRef, {
        ...category,
        id: new Date().valueOf().toString().substring(6),
        datePublished: now
      })
      setLoading(false)
      window.alert("Kategori yüklendi")
      setCategory({title:""})
     }
     catch(error) {
         window.alert("Bir hata meydana geldi",error)
     }
     return a;
  }

  console.log(category)

  return (
    <form className="category-form" onSubmit={formSubmitHandler}>
      <label className="category-form__label">Kategori Ekleyin</label>
      <input
        onChange={onChangeForm}
        id="title"
        name="title"
        className="category-form__input"
        placeholder="Kategori ekleyin"
        value={category.title}
      />
      <button className="btn-submit" type="submit">Ekle</button>
    </form>
  );
};

export default AddCategory;
