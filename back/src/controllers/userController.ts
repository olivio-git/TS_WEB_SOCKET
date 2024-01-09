import { NextFunction, Request, Response } from "express";
import { Usuario } from "../interface/UserInterface";
import capModels from "../db";
import response from "../utils/response";
import ClientError from "../utils/error";
import { Persona } from "../interface/Persona";
import { jwtTokenGenerator, tokenValidity } from "../services/jsonWebToken";
import { RequestWithToken } from "../interface/RequestWithTokenInterface";

export const getUserController = async (__: Request, res: Response) => {
  const result = await capModels.User.findAll();
  response(res, 200, { result });
};
export const getUserControllerSession = async (req: Request, res: Response) => {
  const { user_name, user_password } = req.body;
  const result = await capModels.User.find({ where: { user_name: user_name } });
  if (!result) {
    throw new ClientError("Error login ");
  }
  response(res, 200, { result });
};
export const postUserController = async (req: Request, res: Response) => {
  const usuario: Usuario = req.body;
  const result = await capModels.User.create(usuario);
  response(res, 200, result);
};
export const loginUserVerify = async (req: Request, res: Response) => {
  const user: Persona = req.body; 
  const {findUser,token} = await jwtTokenGenerator(user);
  res.cookie('jwt', token, {
    maxAge: 24 * 60 * 60 * 1000
   })
  response(res, 200,{
    MessageChannel:'Inicio de secion exitoso!',
    user:{
      user_name:findUser.user_name,
      image_profile_url:findUser.image_profile_url 
    }});
};
export const protectedRoutesToken = async (req: Request, res: Response, next: NextFunction) => {
 const authHeader = req.headers.authorizacion;
 const token = authHeader?.toString(); 
 if (!token) {
   throw new ClientError('Token undefined');
 };
 const result = await tokenValidity(next,token);
 if(result){
  response(res,200,{MessageChannel:true})
 }
};
export const validateSecion = async (req: Request, res: Response, next: NextFunction) => {
  const token:string = req.body.token;
  if(!token){
    response(res,200,{MessageChannel:'Token is undefined'});
  }
  const result = await tokenValidity(next,token);
  if(result){
    response(res,200,{MessageChannel:result})
  }
}
