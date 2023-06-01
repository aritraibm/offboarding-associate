import * as yup from "yup";

export const CommentValidationSchema = yup.object().shape({
    empId: yup.string(),
    associateName: yup.string().required("Please select an associate to view the comments"),
    
});

export const addCommentValidationSchema = yup.object().shape({
    empId: yup.string().required("Please select an Associate"),
    comments: yup.string().required("Please provide comments"),
    
});

export const rplyCommentValidationSchema = yup.object().shape({
    empId: yup.string(),
    comments: yup.string(),
    
});

export const addCommentDefaultValues= {
    empId: '',
    comments: '',
}