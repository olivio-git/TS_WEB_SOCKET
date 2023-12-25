import { Request, Response } from 'express';
import { Usuario } from '../interface/Persona';

const connect = (_: Request, res: Response) => {
    res.status(200).json({message:"Hola mundo"});
};
const disconnect = ( req:Request,res:Response) => {
    const persona:Usuario = req.body.persona; // { nombre:"hadwj" }
};
export default connect;
