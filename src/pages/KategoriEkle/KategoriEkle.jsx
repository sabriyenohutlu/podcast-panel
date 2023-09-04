import AddCategory from "../../components/AddCategory/AddCategory";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
const KategoriEkle = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="wrapper">
        <Header />
        <div className="page">
          <AddCategory />
        </div>
      </div>
    </div>
  );
};

export default KategoriEkle;
