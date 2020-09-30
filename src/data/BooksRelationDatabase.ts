import {BaseDatabase} from "./BaseDatabase";

export class BooksRelationDatabase extends BaseDatabase{
  private static TABLE_NAME = 'users_relation';

  public async amizadeUser(userId:string, amizadeId: string): Promise<void> {
    await this.getConnection()
      .insert({
        user_id: userId,
        fazeramizade: amizadeId
      }).into(BooksRelationDatabase.TABLE_NAME)
  }




  public async unFollowUser(userId:string, userToUnFollowId: string): Promise<void> {
    await this.getConnection()
      .del()
      .from(BooksRelationDatabase.TABLE_NAME)
      .where({
        user_id: userId,
        fazeramizade: userToUnFollowId
      });
  }
}