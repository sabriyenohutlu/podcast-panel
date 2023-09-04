import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "../../components/Header/Header"
import AddPodcast from "../../components/AddPodcast/AddPodcast";

const PodcastEkle = () => {
  return (
    <div className="container">
    <Sidebar />
    <div className="wrapper">
      <Header />
      <div className="page">
        <AddPodcast/>
      </div>
    </div>
  </div>
  )
}

export default PodcastEkle