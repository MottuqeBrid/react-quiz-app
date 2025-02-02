import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

const useVideoList = (page) => {
  // console.log(page);
  const [loading, setLoading] = useState(true);
  const [error, setEror] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    async function fatchVideos() {
      // database related work
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videosquery = query(
        videosRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(8)
      );
      try {
        setEror(false);
        setLoading(true);
        // request firebase work
        const snapshort = await get(videosquery);
        setLoading(false);
        if (snapshort.exists()) {
          setVideos((prevideos) => {
            // let newarry = [...Object.values(snapshort.val())];
            let newarry = [...prevideos, ...Object.values(snapshort.val())];
            return newarry;
            // return [...prevideos, ...Object.values(snapshort.val())];
          });
          // console.log(videos);
        } else {
          setHasMore(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
        setEror(true);
      }
    }
    // setTimeout(() => {
    //   fatchVideos();
    // }, 3000);
    fatchVideos();
  }, [page]);

  return {
    loading,
    error,
    videos,
    hasMore,
  };
};

export default useVideoList;
