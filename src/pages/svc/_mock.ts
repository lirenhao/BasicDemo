import { Request, Response } from 'express';
import { SvcData } from './data';

const data: SvcData[] = [
  {
    id: "service-1",
    resources: [
      {
        uri: "/merchant",
        ops: ["READ", "CREATE", "UPDATE", "DELETE"],
      },
      {
        uri: "/terminal",
        ops: ["READ", "CREATE", "UPDATE", "DELETE"],
      },
      {
        uri: "/trans",
        ops: ["READ"],
      },
    ],
  },
  {
    id: "service-2",
    resources: [
      {
        uri: "/merchant",
        ops: ["READ"],
      },
      {
        uri: "/terminal",
        ops: ["READ"],
      },
      {
        uri: "/trans",
        ops: ["READ"],
      },
    ],
  },
  {
    id: "service-3",
    resources: [
      {
        uri: "/merchant",
        ops: ["CREATE"],
      },
      {
        uri: "/terminal",
        ops: ["CREATE"],
      },
      {
        uri: "/trans",
        ops: ["READ"],
      },
    ],
  },
  {
    id: "service-4",
    resources: [
      {
        uri: "/merchant",
        ops: ["UPDATE"],
      },
      {
        uri: "/terminal",
        ops: ["UPDATE"],
      },
      {
        uri: "/trans",
        ops: ["READ"],
      },
    ],
  },
]

export default {
  'GET /api/permit/svc': (req: Request, resp: Response) => {
    resp.send(data.map(item => item.id));
  },
  'GET /api/permit/svc/:id': (req: Request, resp: Response) => {
    const { id } = req.params;
    resp.send(data.filter(item => item.id === decodeURIComponent(id))[0]);
  }
}