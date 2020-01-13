import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Card, Collapse } from 'antd';
import { SvcResData } from './data';
import { ModelState } from './model';
import { AppData } from './data';
import ResOps from './ResOps';

const { Panel } = Collapse;

interface RoleResProps {
  dispatch: Dispatch<any>;
  svcIds: string[];
  appId: string;
  roleId: string;
  apps: AppData[];
  loading: boolean;
}

const RoleRes: React.FC<RoleResProps> = props => {

  const { dispatch, svcIds, appId, roleId, apps } = props;

  const [appRes, setAppRes] = React.useState<SvcResData[]>([]);
  const [roleRes, setRoleRes] = React.useState<SvcResData[]>([]);

  React.useEffect(() => {
    dispatch({ type: 'app/fetchSvcIds' });
  }, []);

  React.useEffect(() => {
    dispatch({
      type: 'app/fetchInfo',
      payload: appId,
      callback: (info: AppData) => {
        setAppRes(info.resources);
      },
    });
  }, [appId]);

  React.useEffect(() => {
    setRoleRes([
      ...apps.filter(app => app.id === appId)[0]?.roles?.filter(role => role.name === roleId)[0]?.resources,
    ]);
  }, [appId, roleId]);

  return (
    <Card title={`资源管理【${appId}】->【${roleId}】`} extra={<a href="#">保存</a>}>
      <Collapse>
        {svcIds.filter(svcId => appRes.map(svcRes => svcRes.id).includes(svcId))
          .map(svcId => (
            <Panel header={svcId} key={svcId}>
              {appRes.filter(svcRes => svcRes.id === svcId)[0]?.resources?.map(res => (
                <ResOps svcId={svcId} uri={res.uri} ops={res.ops} value={roleRes} onChange={setRoleRes} />
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
    apps: app.apps,
    loading: loading.models.app,
  }),
)(RoleRes);