export enum Operator {
  READ = "READ",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface ResData {
  uri: String;
  ops: Operator[];
}

export interface SvcData {
  id: String;
  resources: ResData[];
}
