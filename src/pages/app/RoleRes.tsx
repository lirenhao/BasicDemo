import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Card, Collapse } from 'antd';
import { ResWithSvcData } from './data';
import { ModelState } from './model';
import { AppData, RoleData } from './data';
import ResOps from './ResOps';

const { Panel } = Collapse;

interface RoleResProps {
  dispatch: Dispatch<any>;
  svcIds: string[];
  appId: string;
  roleId: string;
  loading: boolean;
}

const RoleRes: React.FC<RoleResProps> = props => {

  const [appRes, setAppRes] = React.useState<ResWithSvcData[]>([]);
  const [roleRes, setRoleRes] = React.useState<ResWithSvcData[]>([]);

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

  React.useEffect(() => {
    props.dispatch({
      type: 'app/fetchRoleInfo',
      payload: {
        appId: props.appId,
        roleId: props.roleId,
      },
      callback: (info: RoleData) => {
        setRoleRes(info.resources);
      },
    });
  }, [props.appId, props.roleId]);

  const handlChange = (svcId: string | string[]) => {
    console.log(svcId)
  }

  const { svcIds, appId, roleId } = props;

  return (
    <Card title={`资源管理【${appId}】->【${roleId}】`} extra={<a href="#">保存</a>}>
      <Collapse onChange={handlChange}>
        {svcIds.filter(svcId => appRes.map(res => res.svcId).includes(svcId))
          .map(svcId => (
            <Panel header={svcId} key={svcId}>
              {appRes.filter(resWithSvc => resWithSvc.svcId === svcId).map(resWithSvc => (
                <ResOps svcId={resWithSvc.svcId} uri={resWithSvc.res.uri} ops={resWithSvc.res.ops} value={roleRes} onChange={setRoleRes} />
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
)(RoleRes);