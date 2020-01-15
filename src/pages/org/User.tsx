import React from 'react';
import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { Row, Col, Button, Menu, Empty } from 'antd';
import { connect } from 'dva';
import { OrgTreeData, UserData } from './data';
import { ModelState } from './model';
import UserRole from './UserRole';
import UserForm from './UserForm';

import styles from './style.less';

const { Item } = Menu;

interface UserProps {
  dispatch: Dispatch<any>;
  orgTree: OrgTreeData[];
  orgId: string;
  users: UserData[];
  loading: boolean;
}

const User: React.FC<UserProps> = props => {
  const { dispatch, orgTree, orgId, users } = props;

  const [userId, setUserId] = React.useState<string>("");
  const [updateUserId, setUpdateUserId] = React.useState<string>("");
  const [isUpdateUser, setIsUpdateUser] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch({
      type: 'org/fetchUserByOrgId',
      payload: orgId,
    });
  }, [orgId]);

  const selectKey = (key: string) => {
    setUserId(key);
  }

  const handleUpdateUser = (user: UserData) => {
    dispatch({
      type: 'org/fetchCreateOrUpdateUser',
      payload: user,
    });
  }

  const handleRemoveUser = (user: UserData) => {
    dispatch({
      type: 'org/fetchDeleteUser',
      payload: user,
    });
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
            {users.map(user => (
              <Item key={user.id}>
                <Row>
                  <Col span={16}>{user.id}</Col>
                  <Col span={8}>
                    <Button.Group>
                      <Button icon="edit"
                        onClick={e => {
                          e.stopPropagation();
                          setUpdateUserId(user.id);
                          setIsUpdateUser(true);
                        }} />
                      <Button icon="delete"
                        onClick={e => {
                          e.stopPropagation();
                          handleRemoveUser(user);
                        }} />
                    </Button.Group>
                  </Col>
                </Row>
              </Item>
            ))}
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
      <UserForm title="修改用户" visible={isUpdateUser} onCancel={() => setIsUpdateUser(false)}
        orgTree={orgTree} info={users.filter(user => user.id === updateUserId)[0] || {}} onSubmit={handleUpdateUser} />
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
    orgTree: org.orgTree,
    users: org.users,
    loading: loading.models.org,
  }),
)(User);
