import { Request, Response } from 'express';
import { AppData, RoleData } from './data';

const appData: AppData[] = [
  {
    id: "app-1",
    resources: [
      {
        svcId: "service-1",
        res: {
          uri: "/merchant",
          ops: ["READ", "CREATE", "UPDATE", "DELETE"],
        },
      },
      {
        svcId: "service-1",
        res: {
          uri: "/terminal",
          ops: ["READ"],
        },
      },
    ],
  },
  {
    id: "app-2",
    resources: [
      {
        svcId: "service-1",
        res: {
          uri: "/merchant",
          ops: ["READ", "CREATE", "UPDATE", "DELETE"],
        },
      },
    ],
  },
]

const roleData: RoleData[] = [
  {
    appId: "app-1",
    id: "admin",
    resources: [
      {
        svcId: "service-1",
        res: {
          uri: "/merchant",
          ops: ["READ"],
        },
      },
    ],
  },
  {
    appId: "app-1",
    id: "user",
    resources: [
      {
        svcId: "service-1",
        res: {
          uri: "/merchant",
          ops: ["READ"],
        },
      },
    ],
  },
  {
    appId: "app-1",
    id: "anon",
    resources: [
      {
        svcId: "service-1",
        res: {
          uri: "/merchant",
          ops: ["READ"],
        },
      },
    ],
  },
  {
    appId: "app-2",
    id: "admin",
    resources: [
      {
        svcId: "service-1",
        res: {
          uri: "/merchant",
          ops: ["READ"],
        },
      },
    ],
  },
  {
    appId: "app-2",
    id: "user",
    resources: [
      {
        svcId: "service-1",
        res: {
          uri: "/merchant",
          ops: ["READ"],
        },
      },
    ],
  },
  {
    appId: "app-2",
    id: "anon",
    resources: [
      {
        svcId: "service-1",
        res: {
          uri: "/merchant",
          ops: ["READ"],
        },
      },
    ],
  },
]

export default {
  'GET /api/permit/app': (_: Request, resp: Response) => {
    resp.send(appData.map(item => item.id));
  },
  'GET /api/permit/app/:id': (req: Request, resp: Response) => {
    const { id } = req.params;
    resp.send(appData.filter(item => item.id === decodeURIComponent(id))[0]);
  },
  'GET /api/permit/role/:appId': (req: Request, resp: Response) => {
    const { appId } = req.params;
    resp.send(roleData.filter(item => item.appId === decodeURIComponent(appId)).map(item => item.id));
  },
  'GET /api/permit/role/:appId/:id': (req: Request, resp: Response) => {
    const { appId, id } = req.params;
    resp.send(roleData.filter(item => item.appId === decodeURIComponent(appId) && item.id === decodeURIComponent(id))[0]);
  },
}