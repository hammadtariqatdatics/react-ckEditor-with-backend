import * as yup from "yup";

const articleSchema = yup.object().shape({
  title: yup.string().min(3).max(40).required("Title is required..."),
  content: yup.string().required("Content is required..."),
});

export default articleSchema;
