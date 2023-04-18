import * as yup from "yup";

const articleSchema = yup.object().shape({
  title: yup.string().min(3).max(40).required("Title is required..."),
  content: yup.string().required("Content is required..."),
});

const commentSchema = yup.object().shape({
  comment: yup.string().min(10).max(60).required("Comment is required..."),
});

const paymentSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email address").required("Required"),
  cardNumber: yup.string().required("Required"),
  expMonth: yup.string().required("Required"),
  expYear: yup.string().required("Required"),
  cvc: yup.string().required("Required"),
});

export default articleSchema;
export { commentSchema, paymentSchema };
