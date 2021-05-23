import "./App.css";
import { useState, useRef, useCallback, useEffect } from "react";
import { Header } from "./Components/Header.jsx";
import { ImagePage } from "./Components/ImagePage";
import { Modal } from "./Components/Modal";
import { useSearchHook } from "./Hooks/useSearchHook";
import axios from "axios";

function App() {
  const [modalState, setModalState] = useState({
    class: "modal",
    url: "",
    alt: "",
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const {
    imageList,
    error,
    loading,
    hasMorePages,
    setimageList,
    setLoading,
    setError,
    setHasMorePages,
  } = useSearchHook(search, page);
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePages) {
          console.log("is visible and has more pages");
          setPage((oldPage) => oldPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMorePages]
  );
  const loadDefault = () => {
    setLoading(true);
    axios
      .get("https://www.flickr.com/services/rest", {
        params: {
          method: "flickr.photos.getRecent",
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

        setimageList(
          parsedResData.photos.photo.map((v) => {
            return {
              url: `https://live.staticflickr.com/${v.server}/${v.id}_${v.secret}_w.jpg`,
              alt: v.title,
            };
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };
  useEffect(() => {
    loadDefault();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <Modal modalState={modalState} setModalState={setModalState} />
      <ImagePage
        setModalState={setModalState}
        imageList={imageList}
        loading={loading}
        error={error}
        lastElementRef={lastElementRef}
      />
      <Header setSearch={setSearch} setimageList={setimageList} />
    </div>
  );
}

export default App;
