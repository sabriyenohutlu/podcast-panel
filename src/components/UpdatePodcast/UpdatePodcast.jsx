import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../../firebase";
import UpdatePodcastForm from "./UpdatePodcastForm";
import { CircularProgress } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const UpdatePodcast = () => {
  const { id } = useParams();
  const [thisPodcast, setThisPodcast] = useState({});
  const [oldPodcast, setOldPodcast] = useState({});
  const [loading, setLoading] = useState(true);
  const [editted, setEditted] = useState([]);
  const [updating, setUpdating] = useState(null);

  function compareObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const changedKeys = [];

    for (const key of keys1.concat(keys2)) {
      if (obj1[key] !== obj2[key] && !changedKeys.includes(key)) {
        changedKeys.push(key);
      }
    }

    setEditted(changedKeys);
  }

  useEffect(() => {
    compareObjects(oldPodcast, thisPodcast);
  }, [thisPodcast]);

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      var docreferance = doc(db, "podcast", id);
      console.log(docreferance);
      try {
        const response = await getDoc(docreferance, {
          signal: controller.signal,
        });
        const getData = response.data();

        setThisPodcast(getData);
        setOldPodcast(getData);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        window.alert("Bir hata meydana geldi");
        console.log(e.message);
      }
    })();
    return () => controller?.abort();
  }, []);

  const editImage = async () => {
    var oldList = [...editted];
    var newList = oldList.filter((i) => i !== "image");
    let metadata;

    metadata = {
      contentType: "image/jpeg",
    };

    const response = await fetch(thisPodcast.image).catch((err) =>
      console.log("resimi fetch etmede hata", err)
    );
    const blob = await response.blob();
    const filename = thisPodcast.title;
    const imageRef = ref(storage, `podcast/${filename}-${id}/image`);
    const documentRef = doc(db, "podcast", id);

    await uploadBytes(imageRef, blob, metadata).catch((err) =>
      console.log("yazma hatası", err)
    );
    const downloadedURL = await getDownloadURL(imageRef);
    await updateDoc(documentRef, {
      image: downloadedURL,
    })
      .finally(() => {
        setUpdating(null);
        alert(`resim güncellendi burda`);
        setEditted(newList);
        console.log("burda 1")
      })
      .catch((err) => {
        setUpdating(null);
        console.log("güncelleme hatası", err);
        console.log("burda 2")
      });
  };

  const editMp3 = async () => {
    var oldList = [...editted];
    var newList = oldList.filter((i) => i !== "mp3");
    let metadata;
   
    metadata = {
      contentType: "audio/mp3",
    };
    const response = await fetch(thisPodcast.mp3).catch((err) =>
      console.log("resimi fetch etmede hata", err)
    );

    const blob = await response.blob();
    const filename = thisPodcast.title;
    const audioRef = ref(storage, `podcast/${filename}-${id}/audio`);
    const documentRef = doc(db, "podcast", id);

    await uploadBytes(audioRef, blob, metadata).catch((err) =>
      console.log("yazma hatası", err)
    );
    const downloadedURL = await getDownloadURL(audioRef);
    await updateDoc(documentRef, {
      mp3: downloadedURL,
    })
      .finally(() => {
        setUpdating(null);
        alert(`mp3 güncellendi`);
        setEditted(newList);
      })
      .catch((err) => {
        setUpdating(null);
        console.log("güncelleme hatası", err);
      });
  };

  const editOnImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setThisPodcast((pre) => ({
        ...pre,
        image: URL.createObjectURL(event.target.files[0]),
      }));
    }
  };

  const editCategory = (item) => {
    try {
      setThisPodcast((pre) => ({ ...pre, [category]: item.category }));
      console.log("kategori değişti");
    } catch {
      console.log("kategori değişmedi");
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    //setEdit(pre=>({...pre,[name]:value}))
    setThisPodcast((pre) => ({ ...pre, [name]: value }));
  };

  const onChangeForm = (e) => {
    const { value, name } = e.target;
    setThisPodcast((pre) => ({ ...pre, [name]: value }));
  };

  const onImageChange = (e) => {
    try {
      if (e.target.files && e.target.files[0]) {
        setThisPodcast((pre) => ({
          ...pre,
          image: URL.createObjectURL(e.target.files[0]),
        }));
      }
      console.log("resim değişti");
    } catch {
      console.log("resim değişmedi");
    }
  };

  const onAudioChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThisPodcast((pre) => ({
        ...pre,
        mp3: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const editField = async (field) => {
    const documentRef = doc(db, "podcast", id);
    var oldList = [...editted];
    var newList = oldList.filter((i) => i !== field);

    setUpdating(field);
    try {
      await updateDoc(documentRef, {
        [field]: thisPodcast[field],
      });
      console.log("burda 1");
    } catch (error) {
      console.log(error);
      setUpdating(null);
    }
    console.log("burda 2");
    try {
      setUpdating(null);
      alert(`${field} güncellendi`);
      setEditted(newList);
    } catch (error) {
      console.log(error);
      console.log("burda 3");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <UpdatePodcastForm
      handleOnChange={onChangeForm}
      thisPodcast={thisPodcast}
      oldPodcast={oldPodcast}
      updating={updating}
      editted={editted}
      handleOnImageChange={onImageChange}
      handleOnAudioChange={onAudioChange}
      editField={editField}
      editCategory={editCategory}
      editOnImageChange={editOnImageChange}
      editImage={editImage}
      editMp3={editMp3}
    />
  );
};

export default UpdatePodcast;
