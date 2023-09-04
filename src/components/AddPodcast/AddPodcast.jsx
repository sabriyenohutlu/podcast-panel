import { doc, setDoc } from "firebase/firestore";
import "./AddPodcast.scss";
import { useState } from "react";
import PodcastsIcon from '@mui/icons-material/Podcasts';
const AddPodcast = () => {
  //title,summary, mp3, speaker,category,

  const [newPodcast, setNewPodcast] = useState({
    title: "",
    image: "",
    mp3: "",
    speaker: "",
    summary: "",
  });

  const onChangeForm = (e) => {
    const { value, name } = e.target;
    setNewPodcast((pre) => ({ ...pre, [name]: value }));
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPodcast((pre) => ({
        ...pre,
        img: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(newPodcast);
  };

  return (
    <form onSubmit={formSubmitHandler} className="form">
      <div className="form-left">
        <label className="form-image-holder" htmlFor="pick-img">
          <span>Podcast Görseli</span>
          {newPodcast?.image && (
            <img
              alt="preview image"
              src={newPodcast?.image || ""}
              className="form-image"
              name="image"
            />
          )}
          {!newPodcast?.image && (
            <div className="form-img-box">
              <div className="inner-box">Görsel Seç</div>
            </div>
          )}
          <input
            type="file"
            onChange={onImageChange}
            className="file-input"
            value={newPodcast.image}
            id="pick-img"
            name="image"
            style={{ display: "none" }}
          />
        </label>
        <div className="form-left__input">
          <label>Podcast</label>
          {newPodcast?.mp3 && (
            <input
              onChange={onChangeForm}
              className="form-audio-box"
              type="file"
              id="mp3"
              name="mp3"
              placeholder="mp3"
              value={newPodcast.mp3}
            />
          )}
          {!newPodcast?.mp3 && (
            <div className="form-mp3-box">
              <div className="inner-box">Podcast Ekleyin<PodcastsIcon/></div>
            </div>
          )}
          <input
            type="file"
            onChange={onImageChange}
            className="file-input"
            value={newPodcast.mp3}
            id="pick-mp3"
            name="mp3"
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="form-right">
        <div className="form-right__input">
          <label>Podcast Başlığı</label>
          <input
            onChange={onChangeForm}
            className="title"
            name="title"
            id="title"
            placeholder="Podcast Başlığı giriniz"
            value={newPodcast.title}
          />
        </div>
        <div className="form-right__input">
          <label>Özet Bilgi</label>
          <textarea
            onChange={onChangeForm}
            className="summary"
            name="summary"
            id="summary"
            placeholder="Açıklama Giriniz"
            value={newPodcast.summary}
          />
        </div>
        <div className="form-right__input">
          <label>Konuşmacı</label>
          <input
            onChange={onChangeForm}
            className="speaker"
            id="speaker"
            name="speaker"
            placeholder="Konuşmacı giriniz"
            value={newPodcast.speaker}
          />
        </div>
        <button className="btn-submit" type="submit">
          Ekle
        </button>
      </div>
    </form>
  );
};

export default AddPodcast;
