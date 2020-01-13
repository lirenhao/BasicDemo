import React from 'react';
import { Dispatch } from 'redux';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { Spin, Button, Icon, Tree, Modal, Card, Empty } from 'antd';
import { AntTreeNode } from 'antd/es/tree'
import { connect } from 'dva';
import { AppData } from './data.d';
import { ModelState } from './model';
import TreeMenu from './TreeMeun';
import AppRes from './AppRes';
import RoleRes from './RoleRes';

import styles from './style.less';

const { TreeNode } = Tree;

interface AppProps {
  dispatch: Dispatch<any>;
  ids: string[];
  apps: AppData[];
  loading: boolean;
}

const AppView: React.FC<AppProps> = props => {

  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const [isCreateApp, setIsCreateApp] = React.useState<boolean>(false);

  React.useEffect(() => {
    props.dispatch({ type: 'app/fetchIds' });
  }, []);

  const onLoadRole = (node: AntTreeNode) => {
    const appId = node.props.appId;
    return new Promise<void>(resolve => {
      props.dispatch({
        type: 'app/fetchInfo',
        payload: appId,
        callback: () => {
          resolve();
        },
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

  const { ids, apps, loading } = props;
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
                {ids.map(appId => (
                  <TreeNode
                    appId={appId}
                    key={appId}
                    title={<TreeMenu appId={appId} />}
                    children={apps.filter(app => app.id === appId)[0]?.roles?.map(role => (
                      <TreeNode isLeaf
                        appId={appId}
                        roleId={role.name}
                        key={`${appId}#${role.name}`}
                        title={<TreeMenu appId={appId} roleId={role.name} />} />
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
    ids: app.ids,
    apps: app.apps,
    loading: loading.models.app,
  }),
)(AppView);
