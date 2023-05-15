import * as yup from "yup";

export const LoginValidationSchema = yup.object().shape({
    empId: yup.string().required("Please enter your IBM employee ID in 6 character. Eg: xxxxxx"),
    password: yup.string().required("Password is required!"),
});