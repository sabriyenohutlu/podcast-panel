import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import UpdatePodcast from "../../components/UpdatePodcast/UpdatePodcast";

const EditPodcastPage = () => {
  return (
    <div className="container">
    <Sidebar />
    <div className="wrapper">
      <Header />
      <div className="page">
        <UpdatePodcast/>
      </div>
    </div>
  </div>
  )
}

export default EditPodcastPage
