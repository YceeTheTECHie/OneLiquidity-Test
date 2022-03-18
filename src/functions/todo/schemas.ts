import * as yup from 'yup';



export  const createTodoSchema = yup.object().shape({
    label: yup.string().required()

}).noUnknown(true).strict();

export  const updateTodoSchema = yup.object().shape({
    label: yup.string().required(),
    completed : yup.boolean().required()

}).noUnknown(true).strict();