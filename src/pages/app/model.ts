import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getAllIds, getInfo, getRoleIds, getRoleInfo, getSvcIds, getSvcInfo } from './service';
import { AppTreeData } from './data';

export interface ModelState {
  ids: string[];
  tree: AppTreeData[];
  svcIds: string[];
}

export interface ModelType {
  namespace: string;
  state: ModelState;
  effects: {
    fetchIds: Effect;
    fetchInfo: Effect;
    fetchRoleIds: Effect;
    fetchRoleInfo: Effect;
    fetchSvcIds: Effect;
    fetchSvcInfo: Effect;
  };
  reducers: {
    setIds: Reducer<ModelState>;
    setRoleIds: Reducer<ModelState>;
    setSvcIds: Reducer<ModelState>;
  };
}

const defaulState: ModelState = {
  ids: [],
  tree: [],
  svcIds: [],
}

const Model: ModelType = {
  namespace: 'app',
  state: defaulState,
  effects: {
    *fetchIds({ callback }, { call, put }) {
      const ids = yield call(getAllIds);
      yield put({
        type: 'setIds',
        payload: ids,
      });
      if (callback) callback();
    },
    *fetchInfo({ callback, payload }, { call }) {
      const info = yield call(getInfo, payload);
      if (callback) callback(info);
    },
    *fetchRoleIds({ payload, callback }, { call, put }) {
      const roleIds = yield call(getRoleIds, payload);
      yield put({
        type: 'setRoleIds',
        payload: {
          id: payload,
          roleIds,
        },
      });
      if (callback) callback();
    },
    *fetchRoleInfo({ callback, payload }, { call }) {
      const roleInfo = yield call(getRoleInfo, payload.appId, payload.roleId);
      if (callback) callback(roleInfo);
    },
    *fetchSvcIds({ callback }, { call, put }) {
      const svcIds = yield call(getSvcIds);
      yield put({
        type: 'setSvcIds',
        payload: svcIds,
      });
      if (callback) callback();
    },
    *fetchSvcInfo({ callback, payload }, { call }) {
      const svcInfo = yield call(getSvcInfo, payload);
      if (callback) callback(svcInfo);
    },
  },
  reducers: {
    setIds(state = defaulState, { payload }) {
      return {
        ...state,
        ids: payload,
        tree: payload.map((id: string) => ({ id, roleIds: [] })),
      };
    },
    setRoleIds(state = defaulState, { payload }) {
      const { id, roleIds } = payload;
      return {
        ...state,
        tree: state.tree.map(item => item.id === id ? ({ ...item, roleIds }) : item),
      };
    },
    setSvcIds(state = defaulState, { payload }) {
      return {
        ...state,
        svcIds: payload,
      }
    }
  }
}

export default Model;
