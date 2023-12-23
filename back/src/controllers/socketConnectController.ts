import { Request, Response } from 'express';

const connect = (_: Request, res: Response) => {
    res.status(200).json({message:"Hola mundo"});
}

export default connect;
