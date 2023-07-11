import * as yup from "yup";

export const SelectAssociateValidationSchema = yup.object().shape({
    empId: yup.string(),
    associateName: yup.string().required("Please select an associate to view the documents"),
    
});


export const FilterUploadDocumentValidationSchema = yup.object().shape({
    empId: yup.string(),
    //employeeId: yup.string().required("Please select the associate"),
    // documentType: yup.string().required("Please select document type"),
    
});
