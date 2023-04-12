const cloudinaryConfiguration = {
  cloudName: `${process.env.REACT_APP_CLOUD_NAME}`,
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  apiSecret: `${process.env.REACT_APP_API_SECRET}`,
  uploadPreset: `${process.env.REACT_APP_UPLOAD_PRESET_NAME}`,
};

export default cloudinaryConfiguration;
