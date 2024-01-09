require("dotenv").config();
import jwt from "jsonwebtoken";
import capModels from "../db";
import ClientError from "../utils/error";
import { Persona } from "../interface/Persona";
import { NextFunction } from "express";
import User from "../models/User";
const { SECRET_KEY_JWT } = process.env;
export const jwtTokenGenerator = async (user: Persona) => {
  const findUser = await findUserNamePassword(user);
  const token=await jwt.sign({user_name:findUser.user_name}, SECRET_KEY_JWT || "chat_message_2024", {
    expiresIn: "1d",
  });
  return {findUser:findUser,token:token};
};
export const tokenValidity = async (next:NextFunction,token: string ) => { 
  try { 
    const verify= await jwt.verify(token,SECRET_KEY_JWT || "chat_message_2024");
    if(!verify){
      throw new Error(`Error al verificar el token: ${token}`);
    }
    const decoded = await jwt.decode(token);  
    if (typeof decoded === 'string') {
      throw new ClientError(`Error al verificar el token: ${decoded}`,401);
     }
    const user:Persona = {user_name:decoded?.user_name,user_password:""};
    const findUser = await findUserName(user.user_name);
    return { valid:true,user:{user_name:findUser.user_name,image_profile_url:findUser.image_profile_url}};
  } catch (error) {
    throw new ClientError("La secion a expirado!", 401);
  }
}; 

const findUserNamePassword = async (user:Persona) => {
  const findUser = await capModels.User.findOne({where:{ user_name: user.user_name }}); 
  if (!findUser) {
    throw new ClientError("El usuario no existe!", 401);
  }
  if (findUser.user_password != user.user_password) {
    throw new ClientError("La contraseña es incorrecta!.", 401);
  }
  return findUser;
};
const findUserName = async (user_name:string) => {
  const findUser = await capModels.User.findOne({where:{ user_name: user_name }}); 
  if (!findUser) {
    throw new ClientError("El usuario no existe!", 401);
  }
  return findUser;
}