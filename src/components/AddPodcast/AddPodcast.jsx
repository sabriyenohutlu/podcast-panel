import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import "./AddPodcast.scss";
import { useState } from "react";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import { db, storage } from "../../firebase";
import { categoryTitleData } from "../../categoryTitleData.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCategoryContext } from "../../store/category-context";

const AddPodcast = () => {
  //title,summary, mp3, speaker,category,

  const [newPodcast, setNewPodcast] = useState({
    title: "",
    image: "",
    mp3: "",
    speaker: "",
    category: "",
    summary: "",
  });

  const { categoryList } = useCategoryContext();

  const [uploading, setUploading] = useState(true);

  const uploadImage = async (title, id) => {
    let metadata;

    metadata = {
      contentType: "image/jpeg",
    };

    const response = await fetch(newPodcast.image).catch((err) =>
      console.log("resimi fetch etmede hata", err)
    );
    const blob = await response.blob();
    const filename = title;
    const imageRef = ref(storage, `podcast/${filename}-${id}/image`);
    const documentRef = doc(db, "podcast", id);

    await uploadBytes(imageRef, blob, metadata).catch((err) =>
      console.log("yazma hatası", err)
    );
    const downloadedURL = await getDownloadURL(imageRef);
    await updateDoc(documentRef, {
      image: downloadedURL,
    }).catch((err) => console.log("güncelleme hatası", err));
  };
  const uploadAudio = async (title, id) => {
    let metadata;

    metadata = {
      contentType: "audio/mp3",
    };
    const response = await fetch(newPodcast?.mp3).catch((err) =>
      console.log("mp3ü fetch etmede hata", err)
    );
    const blob = await response.blob();
    const filename = title;
    const audioRef = ref(storage, `podcast/${filename}-${id}/audio`);
    const documentRef = doc(db, "podcast", id);

    await uploadBytes(audioRef , blob, metadata).catch((err) =>
      console.log("yazma hatası", err)
    );
    const downloadedURL = await getDownloadURL(audioRef);
    await updateDoc(documentRef, {
      mp3: downloadedURL,
    }).catch((err) => console.log("güncelleme hatası", err));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (newPodcast.image) {
      var idForAll = Math.floor(100000 + Math.random() * 900000).toString();
      var podcastRef = doc(db, "podcast", idForAll);
      setUploading(true);
      var now = new Date();
      let a, b, c;

      var lowerCasedTitle = newPodcast.title
        .trim()
        .toLowerCase()
        .split(" ")
        .join("-");
      var urledTitle = "";
      const regex = /[^a-zA-Z0-9çğıİöşüÇĞIÖŞÜ-\s]/g;

      const titleArray = () => {
        for (let i = 1; i <= lowerCasedTitle.length; i++) {
          var englished = lowerCasedTitle
            .substring(0, i)
            .replace(/ı/g, "i")
            .replace(/ğ/g, "g")
            .replace(/ü/g, "u")
            .replace(/ş/g, "s")
            .replace(/ö/g, "o")
            .replace(/ç/g, "c");
          urledTitle = englished.replace(regex, "");
        }
      };
      titleArray();
      try {
        a = await setDoc(podcastRef, {
          ...newPodcast,
          id: idForAll,
          datePublished: now,
        });

        window.alert("Podcast yüklendi");
      } catch (error) {
        setUploading(false);
        window.alert("bir hata meydana geldi setten sonra", error);
      }
      try {
        b = await uploadImage(urledTitle, idForAll);
        // setNewPodcast({
        //   title: "",
        //   image: "",
        //   mp3: "",
        //   speaker: "",
        //   category: "",
        //   summary: "",
        // });
      } catch (error) {
        setUploading(false);
        window.alert("Bir hata meydana geld burda hata var", error);
      }
      try {
        c = await uploadAudio(urledTitle, idForAll);
        // setNewPodcast({
        //   title: "",
        //   image: "",
        //   mp3: "",
        //   speaker: "",
        //   category: "",
        //   summary: "",
        // });
        setUploading(false);
      } catch (error) {
        setUploading(false);
        window.alert("Bir hata meydana geld ses hata var", error);
      }
      return a + b + c;
    } else {
      window.alert("resim seçmelisiniz");
    }
  };

  const onChangeForm = (e) => {
    const { value, name } = e.target;
    setNewPodcast((pre) => ({ ...pre, [name]: value }));
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPodcast((pre) => ({
        ...pre,
        image: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const onMp3Change = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPodcast((pre) => ({
        ...pre,
        mp3: URL.createObjectURL(e.target.files[0])
      }));
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="form">
      <div className="form-left">
        <label className="form-image-holder" htmlFor="pick-img">
          <span>Podcast Görseli</span>
          {newPodcast.image && (
            <img
              alt="preview image"
              src={newPodcast?.image || ""}
              className="form-image"
              name="image"
            />
          )}
          {!newPodcast.image && (
            <div className="form-img-box">
              <div className="inner-box">Görsel Seç</div>
            </div>
          )}
          <input
            type="file"
            onChange={onImageChange}
            className="file-input"
            //  value={newPodcast.image}
            id="pick-img"
            name="image"
            style={{ display: "none" }}
          />
        </label>
        <div className="form-left__input">
          {/*newPodcast.mp3 && (
            <span>{newPodcast.mp3}</span>
          )*/}
          <div className="inner-box">
            Podcast Ekleyin <PodcastsIcon />
          </div>
          {!newPodcast.mp3 && (
            <div className="form-mp3-box">
              <input
                type="file"
                onChange={onMp3Change}
                className="file-input"
                //value={newPodcast.mp3}
                id="pick-mp3"
                name="mp3"
                // style={{ display: "none" }}
              />
            </div>
          )}
          {newPodcast.mp3 && (
            <div className="form-mp3-url">{newPodcast.mp3}</div>
          )}
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
        <div className="form-right__input">
          <label>Kategori Seçiniz</label>
          <select
            className="select"
            name="category"
            id="category"
            onChange={onChangeForm}
          >
            {categoryList.map((i, idx) => (
              <option key={idx} value={i.title}>
                {i.title}
              </option>
            ))}
          </select>
        </div>
        <button className="btn-submit" type="submit">
          Ekle
        </button>
      </div>
    </form>
  );
};

export default AddPodcast;
