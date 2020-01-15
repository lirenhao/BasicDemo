import React from 'react';
import { Dispatch } from 'redux';
import { Button, Dropdown, Menu, Modal } from 'antd';
import { connect } from 'dva';
import { OrgTreeData } from './data';

interface TreeMenuProps {
  dispatch: Dispatch<any>;
  node: OrgTreeData;
}

const TreeMenu: React.FC<TreeMenuProps> = props => {
  const { node } = props;

  const [isCreate, setIsCreate] = React.useState<boolean>(false);
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);

  const handleCreate = (orgId: string) => {

  }

  const handleUpdate = (orgId: string) => {

  }

  const handleRemove = (orgId: string) => {

  }

  return (
    <Dropdown trigger={['contextMenu']} overlay={() => (
      <Menu>
        <Menu.Item onClick={(e) => {
          e.domEvent.stopPropagation();
          setIsUpdate(true);
        }}>
          修改机构
        </Menu.Item>
        {
          node.children?.length === 0 ? (
            <Menu.Item onClick={(e) => {
              e.domEvent.stopPropagation();
              handleRemove(node.org.id);
            }}>
              删除机构
            </Menu.Item>
          ) : ""
        }
        <Menu.Item onClick={(e) => {
          e.domEvent.stopPropagation();
          setIsCreate(true);
        }}>
          添加子机构
        </Menu.Item>
      </Menu>
    )} >
      <span>{node.org.name}</span>
    </Dropdown>
  );
}

export default connect(
  ({
    loading,
  }: {
    loading: { models: { [key: string]: boolean } };
  }) => ({
    loading: loading.models.org,
  }),
)(TreeMenu);
