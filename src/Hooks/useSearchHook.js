import { useEffect, useState } from "react";
import axios from "axios";

export const useSearchHook = (search, page) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [imageList, setimageList] = useState([]);

  useEffect(() => {
    setLoading(true);
    console.log("hook ran");
    if (search) {
      axios
        .get("https://www.flickr.com/services/rest", {
          params: {
            method: "flickr.photos.search",
            text: search,
            api_key: "32945d788fb1c29d99cdb86fc9b6129c",
            per_page: 15,
            page: page,
            format: "json",
          },
        })
        .then((response) => {
          const str = `${response.data}`;
          const parsedResData = JSON.parse(str.substring(14, str.length - 1));
          if (parsedResData.photos.pages <= parsedResData.photos.page) {
            setHasMorePages(false);
          }
          setimageList((prevData) => {
            return [
              ...prevData,
              ...parsedResData.photos.photo.map((v) => {
                return {
                  url: `https://live.staticflickr.com/${v.server}/${v.id}_${v.secret}_w.jpg`,
                  alt: v.title,
                };
              }),
            ];
          });
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        });
    }
  }, [search, page]);
  return {
    imageList,
    error,
    loading,
    hasMorePages,
    setimageList,
    setLoading,
    setError,
    setHasMorePages,
  };
};
