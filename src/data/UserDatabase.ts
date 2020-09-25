import { promises } from "fs";
import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME: string = 'UserBook';
  

  public async createUser(id: string, name: string, email: string, password:string): Promise<void> {
    await this.getConnection()
     .insert({
       id,
       name,
       email,
       password
     }) .into(UserDatabase.TABLE_NAME)

  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(UserDatabase.TABLE_NAME)
      .where({ email});
    return result[0]
  }

}


