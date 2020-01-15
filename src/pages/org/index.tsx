import React from 'react';
import { Dispatch } from 'redux';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { Spin, Tree, Modal, Card, Empty } from 'antd';
import { connect } from 'dva';
import { OrgTreeData } from './data.d';
import { ModelState } from './model';
import OrgMenu from './OrgMeun';
import User from './User';

import styles from './style.less';

interface OrgProps {
  dispatch: Dispatch<any>;
  orgTree: OrgTreeData[];
  loading: boolean;
}

const OrgView: React.FC<OrgProps> = props => {
  const { orgTree, loading } = props;

  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const [isCreateApp, setIsCreateApp] = React.useState<boolean>(false);

  React.useEffect(() => {
    props.dispatch({ type: 'org/fetchOrgTree' });
  }, []);

  const onTreeSelect = (selectedKeys: string[]) => {
    setSelectedKeys(selectedKeys)
  }

  const handleCreateApp = (id: string) => {

  }

  const loopTreeNode = (data: OrgTreeData[]) => data.map((item) => {
    if (item.children && item.children.length) {
      return (
        <Tree.TreeNode key={item.org.id} title={<OrgMenu node={item} />} info={item.org}>
          {loopTreeNode(item.children)}
        </Tree.TreeNode>
      );
    }
    return <Tree.TreeNode key={item.org.id} title={<OrgMenu node={item} />} info={item.org} />;
  })

  const renderRes = () => {
    if (selectedKeys.length > 0) {
      const orgId = selectedKeys[0];
      return (<User orgId={orgId} />)
    } else {
      return (<Empty />)
    }
  }

  return (
    <PageHeaderWrapper>
      <Spin spinning={loading}>
        <GridContent>
          <div className={styles.main} >
            <div className={styles.leftMenu}>
              <Tree
                onSelect={onTreeSelect}
                selectedKeys={selectedKeys}
              >
                {loopTreeNode(orgTree)}
              </Tree>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>
                用户
              </div>
              {renderRes()}
            </div>
          </div>
        </GridContent>
      </Spin>
      <Modal
        title="添加机构"
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
    org,
    loading,
  }: {
    org: ModelState,
    loading: { models: { [key: string]: boolean } };
  }) => ({
    orgTree: org.orgTree,
    loading: loading.models.org,
  }),
)(OrgView);