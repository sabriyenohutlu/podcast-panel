import { useState } from "react";
import "./UpdatePodcastForm.scss";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import { useCategoryContext } from "../../store/category-context";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
const UpdatePodcastForm = ({
  thisPodcast,
  handleOnChange,
  oldPodcast,
  handleOnImageChange,
  handleOnAudioChange,
  editField,
  editCategory,
  editImage,
  editMp3
}) => {
  const { categoryList } = useCategoryContext();

  console.log(thisPodcast);

  return (
    <div className="form">
      <div className="form-left">
       <label className="form-image-holder" htmlFor="pick-img">
          <span>Podcast Görseli</span>
          {thisPodcast.image && (
            <img
              alt="preview image"
              src={thisPodcast?.image || ""}
              className="form-image"
              name="image"
            />
          )}
          {!thisPodcast.image && (
            <div className="form-img-box">
              <div className="inner-box">Görsel Seç</div>
            </div>
          )}
          <input
            type="file"
            onChange={handleOnImageChange}
            className="file-input"
            //  value={newPodcast.image}
            id="pick-img"
            name="image"
            style={{ display: "none" }}
          />
          {oldPodcast.image !== thisPodcast.image && (
            <button className="btn-update" type="submit" onClick={editImage}>
             Görseli Güncelle
            </button>
          )}
        </label>
        <div className="form-left__input">
          {/*thisPodcast.mp3 && (
            <span>{thisPodcast.mp3}</span>
          )*/}
          <div className="inner-box">
            Podcast Ekleyin <PodcastsIcon />
          </div>
          {/*thisPodcast?.mp3 && (
            <div>
              <div className="form-mp3-url">{thisPodcast.mp3}</div>
            </div>
          )*/}
          {/*!thisPodcast.mp3 && (
            <input
              type="file"
              onChange={handleOnAudioChange}
              className="file-input"
              //value={thisPodcast.mp3}
              id="pick-mp3"
              name="mp3"
              // style={{ display: "none" }}
            />
          )*/}
               <div className="form-mp3-box">
                <input
                  type="file"
                  onChange={handleOnAudioChange}
                  className="file-input"
                  //value={thisPodcast.mp3}
                  id="pick-mp3"
                  name="mp3"
                  // style={{ display: "none" }}
                />
              </div>
          {oldPodcast.mp3 !== thisPodcast.mp3 && (
            <button className="btn-update" type="submit" onClick={editMp3}>
              Mp3'ü Güncelle
            </button>
          )}
        </div>
      </div>
      <div className="form-right">
        <div className="form-right__input">
          <label>Podcast Başlığı</label>
          <input
            onChange={handleOnChange}
            className="title"
            name="title"
            id="title"
            placeholder="Podcast Başlığı giriniz"
            value={thisPodcast?.title}
          />
          {oldPodcast.title !== thisPodcast.title && (
            <button
              className="btn-update"
              type="submit"
              onClick={() => editField("title")}
            >
              Başlığı Güncelle
            </button>
          )}
        </div>
        <div className="form-right__input">
          <label>Özet Bilgi</label>
          <textarea
            // onChange={onChangeForm}
            className="summary"
            onChange={handleOnChange}
            name="summary"
            id="summary"
            placeholder="Açıklama Giriniz"
            value={thisPodcast?.summary}
          />
          {oldPodcast.summary !== thisPodcast.summary && (
            <button
              className="btn-update"
              type="submit"
              onClick={() => editField("summary")}
            >
              Özet Bilgiyi Güncelle
            </button>
          )}
        </div>
        <div className="form-right__input">
          <label>Konuşmacı</label>
          <input
            // onChange={onChangeForm}
            className="speaker"
            onChange={handleOnChange}
            id="speaker"
            name="speaker"
            placeholder="Konuşmacı giriniz"
            value={thisPodcast?.speaker}
          />
          {oldPodcast.speaker !== thisPodcast.speaker && (
            <button
              className="btn-update"
              type="submit"
              onClick={() => editField("speaker")}
            >
            Konuşmacıyı Güncelle
            </button>
          )}
        </div>
        {/*<div className="form-right__input">
          <label>Kategori Seçiniz</label>
          <select
            className="select"
            name="category"
            id="category"
           // onChange={editCategory}
           onChange={editCategory}
            value={thisPodcast?.category}
          >
            {categoryList.map((i, idx) => (
              <option key={idx}>
                {i.title}
              </option>
            ))}
          </select>
          {oldPodcast.category !== thisPodcast.category && (
            <button className="btn-update" type="submit" onClick={() => editField("category")}>
              Güncelle
            </button>
          )}
        </div>*/}
      </div>
    </div>
  );
};

export default UpdatePodcastForm;
