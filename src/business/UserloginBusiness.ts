import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserloginBusiness {

public login = async (email: string, password: string)=> {
    const userDataBase = new UserDatabase();
    const user = await userDataBase.getUserByEmail(email);

    const hashManager = new HashManager();
    const isPasswordCorrect = await hashManager.compare(password, user.password);

    if(!isPasswordCorrect) {
      throw new Error('Usuário ou senha errados');
    }// regra de negocio 

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({
      id: user.id
    });
    return token 
}
  
}