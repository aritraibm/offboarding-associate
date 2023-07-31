import * as yup from 'yup';

const lineSchema = yup.object().shape({
  checkListId: yup.number().required().positive().integer(),
  comment: yup.string().when('checkListId', {
    is: (checkListId: number) => [3, 4, 6, 7].includes(checkListId),
    then: yup.string().required('Comment is required'),
    otherwise: yup.string(),
  }),
});