import React from 'react';
import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { Button, Icon, Menu, Card, Empty } from 'antd';
import { connect } from 'dva';
import { UserData } from './data';
import { ModelState } from './model';
import UserRole from './UserRole';

import styles from './style.less';

const { Item } = Menu;

interface UserProps {
  dispatch: Dispatch<any>;
  orgId: string;
  users: UserData[];
  loading: boolean;
}

const User: React.FC<UserProps> = props => {
  const { dispatch, orgId, users, loading } = props;

  const [userId, setUserId] = React.useState<string>("");
  const [isCreate, setIsCreate] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch({
      type: 'org/fetchUserByOrgId',
      payload: orgId,
    });
  }, [orgId]);

  const selectKey = (key: string) => {
    setUserId(key);
  }

  return users.length > 0 ? (
    <GridContent>
      <div className={styles.main} >
        <div className={styles.leftMenu}>
          <Menu
            mode="inline"
            selectedKeys={[userId]}
            onClick={({ key }) => selectKey(key)}
          >
            {users.map(user => <Item key={user.id}>{user.id}</Item>)}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            {users.filter(user => user.id === userId).length > 0 ?
              (<UserRole user={users.filter(user => user.id === userId)[0]} />) : (<Empty />)
            }
          </div>
        </div>
      </div>
    </GridContent>
  ) : (<Empty />);
}

export default connect(
  ({
    org,
    loading,
  }: {
    org: ModelState,
    loading: { models: { [key: string]: boolean } };
  }) => ({
    users: org.users,
    loading: loading.models.org,
  }),
)(User);
