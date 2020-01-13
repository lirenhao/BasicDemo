import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getAllIds, getInfo, getSvcIds, getSvcInfo } from './service';
import { AppData, SvcData } from './data';

export interface ModelState {
  ids: string[];
  apps: AppData[];
  svcIds: string[];
  svcs: SvcData[];
}

export interface ModelType {
  namespace: string;
  state: ModelState;
  effects: {
    fetchIds: Effect;
    fetchInfo: Effect;
    fetchSvcIds: Effect;
    fetchSvcInfo: Effect;
  };
  reducers: {
    setIds: Reducer<ModelState>;
    setApps: Reducer<ModelState>;
    setSvcIds: Reducer<ModelState>;
    setSvcs: Reducer<ModelState>;
  };
}

const defaulState: ModelState = {
  ids: [],
  apps: [],
  svcIds: [],
  svcs: [],
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
      if (callback) callback(ids);
    },
    *fetchInfo({ callback, payload }, { call, put }) {
      const info = yield call(getInfo, payload);
      yield put({
        type: 'setApps',
        payload: info,
      });
      if (callback) callback(info);
    },
    *fetchSvcIds({ callback }, { call, put }) {
      const svcIds = yield call(getSvcIds);
      yield put({
        type: 'setSvcIds',
        payload: svcIds,
      });
      if (callback) callback(svcIds);
    },
    *fetchSvcInfo({ callback, payload }, { call, put }) {
      const svcInfo = yield call(getSvcInfo, payload);
      yield put({
        type: 'setSvcs',
        payload: svcInfo,
      });
      if (callback) callback(svcInfo);
    },
  },
  reducers: {
    setIds(state = defaulState, { payload }) {
      return {
        ...state,
        ids: payload,
      };
    },
    setApps(state = defaulState, { payload }) {
      return {
        ...state,
        apps: [...state.apps, payload],
      };
    },
    setSvcIds(state = defaulState, { payload }) {
      return {
        ...state,
        svcIds: payload,
      }
    },
    setSvcs(state = defaulState, { payload }) {
      return {
        ...state,
        svcs: [...state.svcs, payload],
      };
    },
  }
}

export default Model;
