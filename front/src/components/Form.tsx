import React, { FormHTMLAttributes } from 'react';

interface FormTextProps extends FormHTMLAttributes<HTMLElement> {};

const FormSubmit : React.FC<FormTextProps> = (props) => <form {...props} ></form>;

export default FormSubmit;