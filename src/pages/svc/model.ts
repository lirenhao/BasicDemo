import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getAllIds, getInfo } from './service';

export interface ModelState {
  ids: string[];
}

export interface ModelType {
  namespace: string;
  state: ModelState;
  effects: {
    fetchIds: Effect;
    fetchInfo: Effect;
  };
  reducers: {
    setIds: Reducer<ModelState>;
  };
}

const Model: ModelType = {
  namespace: 'svc',
  state: {
    ids: [],
  },
  effects: {
    *fetchIds(_, { call, put }) {
      const ids = yield call(getAllIds);
      yield put({
        type: 'setIds',
        payload: ids,
      });
    },
    *fetchInfo({ payload, callback }, { call }) {
      const info = yield call(getInfo, payload);
      if (callback) callback(info);
    },
  },
  reducers: {
    setIds(_, action) {
      return {
        ids: action.payload,
      };
    },
  }
}

export default Model;
