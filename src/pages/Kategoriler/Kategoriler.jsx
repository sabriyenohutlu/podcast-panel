import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Categories from "../../components/Categories/Categories";

const Kategoriler = () => {
  return (
    <div className="container">
    <Sidebar />
    <div className="wrapper">
      <Header />
      <div className="page">
        <Categories />
      </div>
    </div>
  </div>
  )
}

export default Kategoriler;