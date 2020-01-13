import React from 'react';
import { Dispatch } from 'redux';
import { Button, Dropdown, Menu, Modal } from 'antd';
import { connect } from 'dva';
import { ModelState } from './model';

interface TreeMenuProps {
  dispatch: Dispatch<any>;
  appId: string;
  roleId?: string;
}

const TreeMenu: React.FC<TreeMenuProps> = props => {

  const [isCreateApp, setIsCreateApp] = React.useState<boolean>(false);
  const [isUpdateApp, setIsUpdateApp] = React.useState<boolean>(false);
  const [isCreateRole, setIsCreateRole] = React.useState<boolean>(false);
  const [isUpdateRole, setIsUpdateRole] = React.useState<boolean>(false);

  React.useEffect(() => {
    props.dispatch({ type: 'app/fetchSvcs' });
  }, []);

  const handleCreateApp = (id: string) => {

  }

  const handleUpdateApp = (id: string) => {

  }

  const handleRemoveApp = (id: string) => {

  }

  const handleCreateRole = (id: string, roleId: string) => {

  }

  const handleUpdateRole = (id: string, roleId: string) => {

  }

  const handleRemoveRole = (id: string, roleId: string) => {

  }

  const { appId, roleId } = props;
  return (
    <Dropdown trigger={['contextMenu']} overlay={() => {
      if (roleId) {
        return (
          <Menu>
            <Menu.Item onClick={(e) => {
              e.domEvent.stopPropagation();
              setIsUpdateRole(true);
            }}>
              修改角色
            </Menu.Item>
            <Menu.Item onClick={(e) => {
              e.domEvent.stopPropagation();
              handleRemoveRole(appId, roleId);
            }}>
              删除角色
            </Menu.Item>
          </Menu>
        )
      }
      return (
        <Menu>
          <Menu.Item onClick={(e) => { e.domEvent.stopPropagation(); setIsUpdateApp(true); }}>修改应用</Menu.Item>
          <Menu.Item onClick={(e) => { e.domEvent.stopPropagation(); handleRemoveApp(appId); }}>删除应用</Menu.Item>
          <Menu.Item onClick={(e) => { e.domEvent.stopPropagation(); setIsCreateRole(true); }}>添加角色</Menu.Item>
        </Menu>
      )
    }} >
      <span>{roleId ? roleId : appId}</span>
    </Dropdown>
  );
}

export default connect(
  ({
    loading,
  }: {
    loading: { models: { [key: string]: boolean } };
  }) => ({
    loading: loading.models.app,
  }),
)(TreeMenu);
