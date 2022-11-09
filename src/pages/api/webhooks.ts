import { NextApiRequest, NextApiResponse } from 'next';

export default function (req: NextApiRequest, res: NextApiResponse): any {
  console.log('evento recebido');
  res.status(200).json({ ok: true });
}
