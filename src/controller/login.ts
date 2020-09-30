import {Request, Response} from "express";
import {BaseDatabase} from "../data/BaseDatabase";
import { UserloginBusiness } from "../business/UserloginBusiness";

export const login = async (req: Request, res: Response)=>{
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userBusiness = new UserloginBusiness();
    const token= await userBusiness.login( email, password);
   
    res.status(200).send({
      message: 'Usuário logado com sucesso',
      token
    })
  } catch (e) {
    res.status(400).send({
      message: e.message
    })
  }
  await BaseDatabase.destroyConnection();
};