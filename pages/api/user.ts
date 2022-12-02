import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from '../../util/cookies';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = Cookies.decode(req.headers.authorization ?? "")
    if (!user) return res.status(401).send("")
    res.send(user)
}
