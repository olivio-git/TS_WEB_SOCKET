import React, { InputHTMLAttributes } from 'react';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> { }

const InputText: React.FC<InputTextProps> = (props) => <input {...props} /> ;

export default InputText;