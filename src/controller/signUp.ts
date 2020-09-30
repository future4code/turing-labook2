import {Request, Response} from "express";
import {IdGenerator} from "../services/IdGenerator";
import {HashManager} from "../services/HashManager";
import {UserDatabase} from "../data/UserDatabase";
import {Authenticator} from "../services/Authenticator";
import {BaseDatabase} from "../data/BaseDatabase";
import {UserBusiness} from '../business/UserBusiness'

export const signup = async (req: Request, res: Response) => {


  
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

  const userBusiness = new UserBusiness();
  const token= await userBusiness.signup(name, email, password);

  res.status(200).send({
    message: 'Usuário criado com sucesso',
    token
  });

  
  } catch (e) {
  res.status(400).send({
    message: e.message
  })
  }
  await BaseDatabase.destroyConnection();
};