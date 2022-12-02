import { User } from "../types";


export default class Cookies {
    private constructor() { }

    private static _tokens: Map<string, User> = new Map<string, User>();

    public static encode(user: User, oauthToken: string): string {
        const token = Buffer.from(oauthToken).toString("base64");
        this._tokens.set(token, user)
        return token;
    }

    public static decode(token: string): User | undefined {
        return this._tokens.get(token);
    }
}