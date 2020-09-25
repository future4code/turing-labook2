import * as jwt from "jsonwebtoken";

export class Authenticator {
  public generateToken(input: AuthenticationData,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!): string {

    const token = jwt.sign(
      {
        id: input.id,
        role: input.role
      },

      process.env.JWT_KEY as string,


      {
        expiresIn,
      }
    );
    return token;
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      role: payload.role
    };
    return result;
  }

  public verify(token: string): AuthenticationData {
    const data = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as any;
    return {
      id: data.id
    }
  }
}

interface AuthenticationData {
  id: string;
  role?: string;
}















