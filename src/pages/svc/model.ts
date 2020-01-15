import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getSvcs } from './service';
import { SvcData } from './data';

export interface ModelState {
  svcs: SvcData[];
}

export interface ModelType {
  namespace: string;
  state: ModelState;
  effects: {
    fetchSvcs: Effect;
  };
  reducers: {
    setSvcs: Reducer<ModelState>;
  };
}

const defaulState: ModelState = {
  svcs: [],
}

const Model: ModelType = {
  namespace: 'svc',
  state: defaulState,
  effects: {
    *fetchSvcs(_, { call, put }) {
      const svcs = yield call(getSvcs);
      yield put({
        type: 'setSvcs',
        payload: svcs,
      });
    },
  },
  reducers: {
    setSvcs(_, action) {
      return {
        svcs: action.payload,
      };
    },
  }
}

export default Model;
