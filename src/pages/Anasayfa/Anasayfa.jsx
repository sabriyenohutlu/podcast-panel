import Header from "../../components/Header/Header";
import Home from "../../components/Home/Home";
import Sidebar from "../../components/Sidebar/Sidebar";
const Anasayfa = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="wrapper">
        <Header />
        <div className="page">
          <Home />
        </div>
      </div>
    </div>
  );
};

export default Anasayfa;
