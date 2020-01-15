import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Card, Collapse } from 'antd';
import { SvcResData, SvcData } from './data';
import { ModelState } from './model';
import { AppData } from './data';
import ResOps from './ResOps';

const { Panel } = Collapse;

interface RoleResProps {
  dispatch: Dispatch<any>;
  app: AppData;
  roleId: string;
  svcs: SvcData[];
  loading: boolean;
}

const RoleRes: React.FC<RoleResProps> = props => {
  const { dispatch, app, roleId, svcs } = props;

  const [roleRes, setRoleRes] = React.useState<SvcResData[]>([]);

  React.useEffect(() => {
    dispatch({ type: 'app/fetchSvcs' });
  }, []);

  React.useEffect(() => {
    setRoleRes(app.roles.filter(role => role.name === roleId)[0].resources);
  }, [app, roleId]);

  return (
    <Card title={`资源管理【${app.id}】->【${roleId}】`} extra={<a href="#">保存</a>}>
      <Collapse>
        {svcs.filter(svc => app.resources.map(svcRes => svcRes.id).includes(svc.id))
          .map(svc => (
            <Panel header={svc.id} key={svc.id}>
              {app.resources.filter(svcRes => svcRes.id === svc.id)[0]?.resources?.map(res => (
                <ResOps key={`${app.id}#${roleId}`} svcId={svc.id} uri={res.uri} ops={res.ops} value={roleRes} onChange={setRoleRes} />
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
    svcs: app.svcs,
    loading: loading.models.app,
  }),
)(RoleRes);