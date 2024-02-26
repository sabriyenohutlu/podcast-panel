import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const PodcastContext = createContext();

export const PodcastContextWrapper = ({children}) => {

    const [podcast, setPodcast ] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let controller = new AbortController();
        (async () => {
          const q = query(
            collection(db, "podcast"),
            orderBy("datePublished", "asc")
          );
          const jobgetting = onSnapshot(q, (snap) => {
            var podcasts = [];
            
            snap.forEach((doc) => {
              podcasts.unshift({...doc.data(),doc:doc.id});// dataya doc eklemek için
            });
            setPodcast(podcasts);
            setLoading(false);
          });
          return () => jobgetting();
        })();
        return () => controller.abort();
      }, []);


    return(
        <PodcastContext.Provider value={{podcast, loading}}>
            {children}
        </PodcastContext.Provider>
    )
}
export const usePodcastContext = () => useContext(PodcastContext)