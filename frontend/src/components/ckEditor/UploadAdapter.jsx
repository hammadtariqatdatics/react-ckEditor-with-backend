import axios from "axios";
import cloudinaryConfiguration from "../../config/Config";

class CloudinaryUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file) => {
      //   console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryConfiguration.uploadPreset);
      formData.append("public_id", file.name);

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfiguration.cloudName}/upload`,
          formData
        )
        .then((response) => {
          //   console.log(response);
          return {
            default: response.data.secure_url,
          };
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  }
}

export default CloudinaryUploadAdapter;
