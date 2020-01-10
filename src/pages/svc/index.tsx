import React from 'react';
import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Spin, Menu, List } from 'antd';
import { connect } from 'dva';
import { SvcData, ResData } from './data.d';
import { ModelState } from './model';

import styles from './style.less';

const { Item } = Menu;

interface SvcProps {
  dispatch: Dispatch<any>;
  ids: string[];
  info: SvcData;
  loading: boolean;
}

const SvcView: React.FC<SvcProps> = props => {

  const [id, setId] = React.useState<string>("");
  const [info, setInfo] = React.useState<Partial<SvcData>>({});

  React.useEffect(() => {
    props.dispatch({ type: 'svc/fetchIds' });
  }, []);

  const selectKey = (key: string) => {
    setId(key);
    props.dispatch({
      type: 'svc/fetchInfo',
      payload: key,
      callback: (info: SvcData) => setInfo(info),
    });
  }

  const { ids, loading } = props;

  return (
    <PageHeaderWrapper>
      <Spin spinning={loading}>
        <GridContent>
          <div className={styles.main} >
            <div className={styles.leftMenu}>
              <Menu
                mode="inline"
                selectedKeys={[id]}
                onClick={({ key }) => selectKey(key)}
              >
                {ids.map(id => <Item key={id}>{id}</Item>)}
              </Menu>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{id}</div>
              <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={info.resources}
                renderItem={(item: ResData) => (
                  <List.Item>
                    <List.Item.Meta title={item.uri} description={item.ops.join(' | ')} />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </GridContent>
      </Spin>
    </PageHeaderWrapper>
  )
}

export default connect(
  ({ svc,
    loading,
  }: {
    svc: ModelState,
    loading: { models: { [key: string]: boolean } };
  }) => ({
    ids: svc.ids,
    loading: loading.models.svc,
  }),
)(SvcView);
