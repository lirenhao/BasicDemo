import React from 'react';
import { Dispatch } from 'redux';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { Spin, Button, Icon, Tree, Modal, Card, Empty } from 'antd';
import { AntTreeNode } from 'antd/es/tree'
import { connect } from 'dva';
import { AppTreeData } from './data.d';
import { ModelState } from './model';
import TreeMenu from './TreeMeun';
import AppRes from './AppRes';
import RoleRes from './RoleRes';

import styles from './style.less';

const { TreeNode } = Tree;

interface AppProps {
  dispatch: Dispatch<any>;
  tree: AppTreeData[];
  loading: boolean;
}

const AppView: React.FC<AppProps> = props => {

  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const [isCreateApp, setIsCreateApp] = React.useState<boolean>(false);

  React.useEffect(() => {
    props.dispatch({ type: 'app/fetchIds' });
  }, []);

  const onLoadRole = (node: AntTreeNode) => {
    return new Promise<void>(resolve => {
      props.dispatch({
        type: 'app/fetchRoleIds',
        payload: node.props.appId,
        callback: () => resolve()
      })
    });
  }

  const onTreeSelect = (selectedKeys: string[]) => {
    setSelectedKeys(selectedKeys)
  }

  const handleCreateApp = (id: string) => {

  }

  const renderRes = () => {
    if (selectedKeys.length > 0) {
      const [appId, roleId] = selectedKeys[0].split('#');
      if (!roleId) {
        return (
          <AppRes appId={appId} />
        )
      } else {
        return (
          <RoleRes appId={appId} roleId={roleId} />
        )
      }
    } else {
      return (
        <Card>
          <Empty />
        </Card>
      )
    }

  }

  const { tree, loading } = props;
  return (
    <PageHeaderWrapper>
      <Spin spinning={loading}>
        <GridContent>
          <div className={styles.main} >
            <div className={styles.leftMenu}>
              <Button type="dashed" onClick={() => setIsCreateApp(true)}>
                <Icon type="plus" />
              </Button>
              <Tree
                loadData={onLoadRole}
                onSelect={onTreeSelect}
                selectedKeys={selectedKeys}
              >
                {tree.map(node => (
                  <TreeNode
                    appId={node.id}
                    key={node.id}
                    title={<TreeMenu appId={node.id} />}
                    children={node.roleIds.map(roleId => (
                      <TreeNode isLeaf
                        appId={node.id}
                        roleId={roleId}
                        key={`${node.id}#${roleId}`}
                        title={<TreeMenu appId={node.id} roleId={roleId} />} />
                    ))}
                  />
                ))}
              </Tree>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{renderRes()}</div>
            </div>
          </div>
        </GridContent>
      </Spin>
      <Modal
        title="添加应用"
        visible={isCreateApp}
        onOk={() => handleCreateApp('')}
        onCancel={() => setIsCreateApp(false)}>
        TODO 创建应用
      </Modal>
    </PageHeaderWrapper>
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
    tree: app.tree,
    loading: loading.models.app,
  }),
)(AppView);
