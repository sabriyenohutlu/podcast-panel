import "./Home.scss";
import { CardContent, Typography } from "@mui/material";
import { usePodcastContext } from "../../store/podcast-context";
import { useCategoryContext } from "../../store/category-context";

const Home = () => {
  const { podcast } = usePodcastContext();
  const { podcastCategory } = useCategoryContext();

  //const categoryPerformanse = Object.keys(podcastCategory).map((i) => i.length);
  //console.log(Object.values(podcastCategory).map((i) => i))
  /*const findMaxNumber = () => {
    let maxNumber = categoryPerformanse[0];
    for (let i = 1; i < categoryPerformanse.length; i++) {
      if (categoryPerformanse[i] > maxNumber) {
        maxNumber = categoryPerformanse[i];
      }
    }
    return maxNumber;
  };

  console.log(findMaxNumber());*/

  return (
    <div className="home-container">
      <div className="home-container-top">
        <div className="home-container-top__allPodcast">
          <div className="box">
          Tüm podcastler: {podcast.length}
          </div>
        </div>
        <div className="home-container-top__mostCategory">
          <div className="box">
          Toplam kategori sayısı : {Object.keys(podcastCategory).length}
          </div>
        </div>
        {/*<div className="home-container-top__allCategory">
          En çok potcast bulunan kategori: <span>Spor</span>
  </div>*/}
      </div>
    </div>
  );
};

export default Home;
