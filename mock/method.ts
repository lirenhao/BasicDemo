import path from 'path';
import jsonfile from 'jsonfile';
import { Request, Response } from 'express';
import { MethodData } from '@/pages/permit/method/data';

const file = path.resolve('mock/data/method.json');

function find(req: Request, res: Response) {
  const params = req.query;
  let pageSize = 5;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }
  let current = 1;
  if (params.current) {
    current = params.current * 1;
  }
  jsonfile
    .readFile(file)
    .then(dataSource => {
      const list = dataSource
        .filter((item: MethodData) => !params.id || params.id === '' || params.id === item.id)
        .filter((item: MethodData) => !params.name || params.name === '' || params.name === item.name);
      res.json({
        list: list.slice((current - 1) * pageSize, current * pageSize),
        pagination: {
          total: list.length,
          pageSize,
          current,
        },
      });
    })
    .catch(error => res.status(500).send(error));
}

function save(req: Request, res: Response, u: any, b: any) {
  const body = (b && b.body) || req.body;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      jsonfile.writeFileSync(file, [...dataSource, body], { spaces: 2 });
      find(req, res);
    })
    .catch(error => res.status(500).send(error));
}

function update(req: Request, res: Response, u: any, b: any) {
  const body = (b && b.body) || req.body;
  const { id } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      jsonfile.writeFileSync(
        file,
        dataSource.map((item: MethodData) => (item.id === decodeURIComponent(id) ? body : item)),
        { spaces: 2 },
      );
      find(req, res);
    })
    .catch(error => res.status(500).send(error));
}

function remove(req: Request, res: Response) {
  const { id } = req.params;
  jsonfile
    .readFile(file)
    .then(dataSource => {
      jsonfile.writeFileSync(
        file,
        dataSource.filter((item: MethodData) => item.id !== decodeURIComponent(id)),
        { spaces: 2 },
      );
      res.end();
    })
    .catch(error => res.status(500).send(error));
}

export default {
  'GET /api/method': find,
  'POST /api/method': save,
  'PUT /api/method/:id': update,
  'DELETE /api/method/:id': remove,
};
