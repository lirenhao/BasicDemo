import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getOrgTree, getUserByOrgId, getApps } from './service';
import { OrgTreeData, UserData, AppData } from './data';

export interface ModelState {
  orgTree: OrgTreeData[];
  users: UserData[];
  apps: AppData[];
}

export interface ModelType {
  namespace: string;
  state: ModelState;
  effects: {
    fetchOrgTree: Effect;
    fetchUserByOrgId: Effect;
    fetchApps: Effect;
  };
  reducers: {
    setOrgTree: Reducer<ModelState>;
    setUsers: Reducer<ModelState>;
    setApps: Reducer<ModelState>;
  };
}

const defaulState: ModelState = {
  orgTree: [],
  users: [],
  apps: [],
}

const Model: ModelType = {
  namespace: 'org',
  state: defaulState,
  effects: {
    *fetchOrgTree({ callback }, { call, put }) {
      const orgTree = yield call(getOrgTree);
      yield put({
        type: 'setOrgTree',
        payload: orgTree,
      });
      if (callback) callback(orgTree);
    },
    *fetchUserByOrgId({ callback, payload }, { call, put }) {
      const users = yield call(getUserByOrgId, payload);
      yield put({
        type: 'setUsers',
        payload: users,
      });
      if (callback) callback(users);
    },
    *fetchApps({ callback }, { call, put }) {
      const apps = yield call(getApps);
      yield put({ type: 'setApps', payload: apps || [] });
      if (callback) callback(apps || []);
    },
  },
  reducers: {
    setOrgTree(state = defaulState, { payload }) {
      return {
        ...state,
        orgTree: payload,
      };
    },
    setUsers(state = defaulState, { payload }) {
      return {
        ...state,
        users: payload,
      };
    },
    setApps(state = defaulState, { payload }) {
      return {
        ...state,
        apps: payload,
      };
    },
  },
}

export default Model;
