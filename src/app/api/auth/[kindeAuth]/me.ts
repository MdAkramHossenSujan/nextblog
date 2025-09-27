import type { NextApiRequest, NextApiResponse } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession(req, res);

    if (!(await isAuthenticated())) {
      res.setHeader("cache-control", "no-store");
      return res.status(401).end();
    }

    const user = await getUser();
    res.setHeader("cache-control", "no-store");
    return res.status(200).json(user);
  } catch {
    res.setHeader("cache-control", "no-store");
    return res.status(500).end();
  }
}
