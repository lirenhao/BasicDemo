import React from 'react';
import { Dispatch } from 'redux';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { Spin, Button, Icon, Tree, Modal, Card, Empty } from 'antd';
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
  apps: AppData[];
  loading: boolean;
}

const AppView: React.FC<AppProps> = props => {
  const { dispatch, apps, loading } = props;

  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const [isCreateApp, setIsCreateApp] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch({ type: 'app/fetchApps' });
  }, []);

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
          <AppRes app={apps.filter(app => app.id === appId)[0]} />
        )
      } else {
        return (
          <RoleRes app={apps.filter(app => app.id === appId)[0]} roleId={roleId} />
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
                onSelect={onTreeSelect}
                selectedKeys={selectedKeys}
              >
                {apps.map(app => (
                  <TreeNode
                    appId={app.id}
                    key={app.id}
                    title={<TreeMenu appId={app.id} />}
                    children={app.roles?.map(role => (
                      <TreeNode isLeaf
                        appId={app.id}
                        roleId={role.name}
                        key={`${app.id}#${role.name}`}
                        title={<TreeMenu appId={app.id} roleId={role.name} />} />
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
    apps: app.apps,
    loading: loading.models.app,
  }),
)(AppView);
