import React, { ButtonHTMLAttributes } from 'react';
interface ButtonTextProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const ButtonSend:React.FC<ButtonTextProps> = (props) => <button className='flex w-16 text-white items-center bg-blue-600' type="submit" {...props} /> ;

export default ButtonSend;
