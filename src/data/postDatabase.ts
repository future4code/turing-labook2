import {BaseDatabase} from "./BaseDatabase";

export class postDatabase extends BaseDatabase {
  private static TABLE_NAME = 'criapost';

  public async criandopost(post_id: string, user_id: string, foto: string, descripcao: string, createdAt: number, tipo: string): Promise<void> {
    await this.getConnection()
      .insert({
        post_id,
        user_id,
        foto,
        descripcao,
        createdAt,
        tipo
      }).into(postDatabase.TABLE_NAME)
  }

  public async getPostById(postId: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(postDatabase.TABLE_NAME)
      .where({post_id: postId});
    return result[0]
  }
}