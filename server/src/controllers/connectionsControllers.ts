import { Request, Response } from 'express';
import db from '../database/connection';


export default class connectionsController {
  async index(req: Request, res: Response){
    const totalConnection = await db('connections').count('* as total');

    const { total } = totalConnection[0];

    return res.json({ total });
  }

  async create(req: Request, res: Response){
    const { user_id } = req.body;

    await db('connections').insert({
      user_id
    });

    return res.status(201)
  } 
}