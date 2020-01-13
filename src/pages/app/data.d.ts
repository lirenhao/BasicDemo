export type Operator = ("READ" | "CREATE" | "UPDATE" | "DELETE")

export interface ResData {
  uri: string;
  ops: Operator[];
}

export interface SvcData {
  id: string;
  resources: ResData[];
}

export interface ResWithSvcData {
  svcId: string;
  res: ResData;
}

export interface RoleData {
  appId: string;
  id: string;
  resources: ResWithSvcData[];
}

export interface AppData {
  id: string;
  resources: ResWithSvcData[];
}

export interface AppTreeData {
  id: string;
  roleIds: string[];
}
