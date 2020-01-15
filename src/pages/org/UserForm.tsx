import React from 'react';
import { Modal, Form, Input, TreeSelect } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { TreeNode } from 'antd/es/tree-select';
import { OrgTreeData, UserData } from './data';
import { existUserId } from './service';

interface OrgFormProps extends FormComponentProps {
  title: string;
  visible: boolean;
  onCancel(): void;
  onSubmit(value: UserData): void;
  info: Partial<UserData>;
  orgTree: OrgTreeData[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const OrgForm: React.SFC<OrgFormProps> = props => {
  const {
    title, visible, onCancel, onSubmit,
    info, orgTree, form, form: { getFieldDecorator }
  } = props;

  const makeTree = (orgTree: OrgTreeData[]): TreeNode[] => orgTree.map(orgTree => ({
    value: orgTree.org.id,
    title: orgTree.org.name,
    children: makeTree(orgTree.children || []),
  }));

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values);
        form.resetFields();
      }
    });
  }

  return (
    <Modal
      maskClosable={false}
      title={title}
      visible={visible}
      onOk={handleSubmit}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Item {...formItemLayout} label="用户">
          {getFieldDecorator('id', {
            initialValue: info.id,
            rules: [
              {
                required: true,
                message: '请输入用户',
              },
              {
                validator: (_, value) => value === info.id ? Promise.resolve() : existUserId(value)
                  .then((result: boolean) => result ? Promise.reject('用户已存在') : Promise.resolve()),
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="机构">
          {getFieldDecorator('orgId', {
            initialValue: info.orgId,
            rules: [
              {
                required: true,
                message: '请选择机构',
              },
            ],
          })(
            <TreeSelect
              dropdownStyle={{
                maxHeight: 400,
                overflow: 'auto',
              }}
              placeholder="请选择"
              treeDefaultExpandAll
              treeData={makeTree(orgTree)}
            />
          )}
        </Form.Item>
      </Form>
    </Modal >
  );
}

export default Form.create<OrgFormProps>()(OrgForm);
