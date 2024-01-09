import { Request, Response } from 'express';
import { Persona } from '../interface/Persona';

const connect = (_: Request, res: Response) => {
    res.status(200).json({message:"Hola mundo"});
};
const disconnect = ( req:Request,res:Response) => {
    const persona:Persona = req.body.persona; 
};
export default connect;
