export interface ResData {
  uri: String;
  ops: ("READ" | "CREATE" | "UPDATE" | "DELETE")[];
}

export interface SvcData {
  id: String;
  resources: ResData[];
}
