import {Request, Response} from "express";
import {Authenticator} from "../services/Authenticator";
import {UserDatabase} from "../data/UserDatabase";
import {BooksRelationDatabase} from "../data/BooksRelationDatabase";
import {BaseDatabase} from "../data/BaseDatabase";

export const followUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const amizadeId = req.body.amizadeId;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(token);
    const userId = authenticationData.id;

    if(!amizadeId) {
      throw new Error('Insira um id válido')
    }

    const userDataBase = new UserDatabase();
    const user = await userDataBase.getUserByEmail(amizadeId);

    if(!user) {
      throw new Error('Usuário não existe')
    }

    const bookRelationDatabase = new BooksRelationDatabase();
    await bookRelationDatabase.amizadeUser(
      userId,
      amizadeId
    );

    res.status(200).send({
      message: 'Usuário seguido com sucesso'
    })
  } catch (e) {
    res.status(400).send({
      message: e.message
    })
  }
  await BaseDatabase.destroyConnection();
};