import * as Yup from "yup";

const LoginFormValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
    password: Yup.string().required("Required"),
});

export default LoginFormValidationSchema;