import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {

public signup = async (name: string, email: string, password: string)=> {
    if(!name || !email || !password) {
        throw new Error('Insira todas as informações necessárias para o cadastro');
      }//regra de negocio
    
      if(password.length < 6) {
        throw new Error('A senha deve conter no mínimo seis caracteres')
      }//regra de negocio
    
    
  

  const idGenerator = new IdGenerator();
  const id = idGenerator.generateId();

  const hashManager = new HashManager();
  const hashPassword = await hashManager.hash(password);

  const userDataBase = new UserDatabase();

  
  await userDataBase.createUser(
    id,
    name,
    email,
    hashPassword
  );

  const authenticator = new Authenticator();
  const token = authenticator.generateToken({id});
  
  return token;
}
  
}