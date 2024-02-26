import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Categories from "../../components/Categories/Categories";
import AddCategory from "../../components/AddCategory/AddCategory";

const Kategoriler = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="wrapper">
        <Header />
        <div className="page">
          <AddCategory />
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default Kategoriler;
