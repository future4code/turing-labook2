import {Request, Response} from "express";
import {BaseDatabase} from "../data/BaseDatabase";
import {Authenticator} from "../services/Authenticator";
import {IdGenerator} from "../services/IdGenerator";
import {postDatabase} from "../data/postDatabase";

export const newPost = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(token);
    const userId = authenticationData.id;

    const idGenerator = new IdGenerator();
    const postId = idGenerator.generateId();

    const {foto, descripcao, tipo} = req.body;
    const creationDate = Date.now(); //gera um timestamp pega a data de ese moment exacto

    const PostDatabase = new postDatabase();  // crio meu query para o banco de dados
    await PostDatabase.criandopost(

        postId,
        userId,
        foto,
        descripcao,
        creationDate,
        tipo
    );
    res.status(200).send({
      message: 'Post criado com sucesso'
    })
  } catch (e) {
    res.status(400).send({
      message: e.message
    })
  }
  await BaseDatabase.destroyConnection();
};