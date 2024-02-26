import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import RootLayout from "./pages/RootLayout/RootLayout";
import Anasayfa from "./pages/Anasayfa/AnaSayfa";
import Podcastler from "./pages/Podcastler/Podcastler";
import Kategoriler from "./pages/Kategoriler/Kategoriler";
import KategoriEkle from "./pages/KategoriEkle/KategoriEkle";
import PodcastEkle from "./pages/PodcastEkle/PodcastEkle";
import EditPodcastPage from "./pages/EditPodcastPage/EditPodcastPage";

import "./App.scss";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Anasayfa />} />
      <Route path="/podcastler">
        <Route index element={<Podcastler />} />
        <Route path="/podcastler/podcastekle" element={<PodcastEkle />} />
        <Route path="/podcastler:id" element={<EditPodcastPage/>}/>
      </Route>
      <Route path="/kategoriler" element={<Kategoriler />}></Route>
    </Route>
  )
);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
