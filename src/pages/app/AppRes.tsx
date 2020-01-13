import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Card, Collapse } from 'antd';
import { SvcData, ResWithSvcData } from './data';
import { ModelState } from './model';
import { AppData } from './data';
import ResOps from './ResOps';

const { Panel } = Collapse;

interface AppResProps {
  dispatch: Dispatch<any>;
  svcIds: string[];
  appId: string;
  loading: boolean;
}

const AppRes: React.FC<AppResProps> = props => {

  const [svcs, setSvcs] = React.useState<SvcData[]>([]);
  const [appRes, setAppRes] = React.useState<ResWithSvcData[]>([]);

  React.useEffect(() => {
    props.dispatch({ type: 'app/fetchSvcIds' });
  }, []);

  React.useEffect(() => {
    props.dispatch({
      type: 'app/fetchInfo',
      payload: props.appId,
      callback: (info: AppData) => {
        setAppRes(info.resources);
      },
    });
  }, [props.appId]);

  const handlChange = (key: string | string[]) => {
    if (typeof key === 'string') {
      props.dispatch({
        type: 'app/fetchSvcInfo',
        payload: key,
        callback: (info: SvcData) => {
          setSvcs([
            ...svcs.filter(svc => svc.id !== key),
            info,
          ]);
        },
      });
    } else {
      const svcId = key.filter(svcId => !svcs.map(svc => svc.id).includes(svcId))[0];
      if (svcId) {
        props.dispatch({
          type: 'app/fetchSvcInfo',
          payload: svcId,
          callback: (info: SvcData) => {
            setSvcs([
              ...svcs.filter(svc => svc.id !== svcId),
              info,
            ]);
          },
        });
      }
    }
  }

  const { appId, svcIds } = props;

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
    loading: loading.models.app,
  }),
)(AppRes);