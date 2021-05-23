const axios = require("axios");
axios
  .get("https://www.flickr.com/services/rest", {
    params: {
      method: "flickr.photos.getRecent",
      api_key: "32945d788fb1c29d99cdb86fc9b6129c",
      per_page: 12,
      format: "json",
    },
  })
  .then((response) => console.log(response.data))
  .catch((error) => {
    console.log(error);
  });
