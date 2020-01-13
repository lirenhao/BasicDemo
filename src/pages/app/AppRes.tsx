import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Card, Collapse } from 'antd';
import { SvcData, AppData } from './data';
import { ModelState } from './model';
import { SvcResData } from './data';
import ResOps from './ResOps';

const { Panel } = Collapse;

interface AppResProps {
  dispatch: Dispatch<any>;
  svcIds: string[];
  svcs: SvcData[];
  appId: string;
  loading: boolean;
}

const AppRes: React.FC<AppResProps> = props => {

  const { dispatch, appId, svcIds, svcs } = props;

  const [appRes, setAppRes] = React.useState<SvcResData[]>([]);

  React.useEffect(() => {
    dispatch({ type: 'app/fetchSvcIds' });
  }, []);

  React.useEffect(() => {
    dispatch({
      type: 'app/fetchInfo',
      payload: appId,
      callback: (app: AppData) => {
        setAppRes(app.resources);
      },
    });
  }, [appId]);

  const handlChange = (key: string | string[]) => {
    if (typeof key === 'string') {
      props.dispatch({
        type: 'app/fetchSvcInfo',
        payload: key,
      });
    } else {
      const svcId = key.filter(svcId => !svcs.map(svc => svc.id).includes(svcId))[0];
      if (svcId) {
        props.dispatch({
          type: 'app/fetchSvcInfo',
          payload: svcId,
        });
      }
    }
  }

  return (
    <Card title={`资源管理【${appId}】`} extra={<a href="#">保存</a>}>
      <Collapse onChange={handlChange}>
        {svcIds.map(svcId => (
          <Panel header={svcId} key={svcId}>
            {svcs.filter(svc => svc.id === svcId)[0]?.resources?.map(res => (
              <ResOps svcId={svcId} uri={res.uri} ops={res.ops} value={appRes} onChange={setAppRes} />
            ))}
          </Panel>
        ))}
      </Collapse>
    </Card>
  )
}


export default connect(
  ({
    app,
    loading,
  }: {
    app: ModelState,
    loading: { models: { [key: string]: boolean } };
  }) => ({
    svcIds: app.svcIds,
    svcs: app.svcs,
    loading: loading.models.app,
  }),
)(AppRes);