import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next'
import Cookies from '../../util/cookies';
import * as oauth from '../../util/steamOauth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (Cookies.decode(req.cookies["user"] ?? "")) return res.redirect("/");
    if (req.query["openid.sig"]) {

        const user = await oauth.auth(req).catch(null);
        if (!user) return res.status(404).redirect("/");
        setCookie("user", Cookies.encode(user, req.query["openid.sig"] as string), { req, res, maxAge: 1000 * 60 * 60 * 24 })
        return res.redirect("/");
    }
    const rederict = await oauth.getRederictUrl().catch(e => null);
    if (!rederict) return res.status(500).send("")
    return res.redirect(rederict);
}
