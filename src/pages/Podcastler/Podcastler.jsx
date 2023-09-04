import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Podcasts from "../../components/Podcasts/Podcasts";

const Podcastler = () => {
  return (
    <div className="container">
    <Sidebar />
    <div className="wrapper">
      <Header />
      <div className="page">
        <Podcasts />
      </div>
    </div>
  </div>
  )
}

export default Podcastler