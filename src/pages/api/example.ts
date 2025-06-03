// src/pages/api/example.ts
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

/**
 * @description A sample API route.
 * @param {NextApiRequest} req The request object.
 * @param {NextApiResponse<Data>} res The response object.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    res.status(200).json({ message: "This is a GET request example!" });
  } else if (req.method === "POST") {
    // Process POST request
    // const body = req.body;
    res.status(201).json({ message: "POST request received!" });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
