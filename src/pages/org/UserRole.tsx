import React from 'react';
import { Dispatch } from 'redux';
import { Button, Icon, Menu, Card } from 'antd';
import { connect } from 'dva';
import { AppData, RoleIdData, UserData } from './data';
import { ModelState } from './model';
import RoleOps from './RoleOps';

interface UserRoleProps {
  dispatch: Dispatch<any>;
  user: UserData;
  apps: AppData[];
  loading: boolean;
}

const UserRole: React.FC<UserRoleProps> = props => {
  const { dispatch, user, apps, loading } = props;

  const [roles, setRoles] = React.useState<RoleIdData[]>([]);

  React.useEffect(() => {
    dispatch({ type: 'org/fetchApps' });
  }, []);

  React.useEffect(() => {
    setRoles(user.roles);
  }, [user]);

  return (
    < Card title={`角色管理【${user.orgId}】->【${user.id}】`}
      extra={< a href="#" > 保存</a>}>
      {apps.map(app => (<RoleOps app={app} value={roles} onChange={setRoles} />))}
    </Card >);
}

export default connect(
  ({
    org,
    loading,
  }: {
    org: ModelState,
    loading: { models: { [key: string]: boolean } };
  }) => ({
    apps: org.apps,
    loading: loading.models.org,
  }),
)(UserRole);
