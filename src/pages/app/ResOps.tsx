import React from 'react';
import { Card, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { Operator, ResWithSvcData } from './data';

interface ResOpsProps {
  svcId: string;
  uri: string;
  ops: Operator[];
  value: ResWithSvcData[];
  onChange(value: ResWithSvcData[]): void;
}

const ResOps: React.FC<ResOpsProps> = props => {

  const [indeterminate, setIndeterminate] = React.useState<boolean>(false);
  const [checkAll, setCheckAll] = React.useState<boolean>(false);
  const [checkedList, setCheckedList] = React.useState<Operator[]>([]);

  React.useEffect(() => {
    const ops = props.value.filter(resWithSvc => (resWithSvc.svcId === props.svcId && resWithSvc.res.uri === props.uri))
      .map(res => res.res.ops).reduce((a, b) => [...a, ...b], []);
    setIndeterminate(ops.length > 0 && ops.length < props.ops.length);
    setCheckAll(ops.length >= props.ops.length);
    setCheckedList(ops);
  }, [props.value]);

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      props.onChange([
        ...props.value.filter(resWithSvc => !(resWithSvc.svcId === props.svcId && resWithSvc.res.uri === props.uri)),
        {
          svcId: props.svcId,
          res: {
            uri: props.uri,
            ops: props.ops,
          }
        }
      ])
    } else {
      props.onChange(
        props.value.filter(resWithSvc => !(resWithSvc.svcId === props.svcId && resWithSvc.res.uri === props.uri))
      )
    }
  }

  const onChange = (checkedValue: CheckboxValueType[]) => {
    if (checkedValue.length > 0) {
      props.onChange([
        ...props.value.filter(resWithSvc => !(resWithSvc.svcId === props.svcId && resWithSvc.res.uri === props.uri)),
        {
          svcId: props.svcId,
          res: {
            uri: props.uri,
            ops: checkedValue.map(item => item as Operator),
          }
        }
      ])
    } else {
      props.onChange(
        props.value.filter(resWithSvc => !(resWithSvc.svcId === props.svcId && resWithSvc.res.uri === props.uri))
      )
    }
  }

  const { uri, ops } = props;
  return (
    <Card
      size="small"
      title={uri}
      extra={<Checkbox
        indeterminate={indeterminate}
        checked={checkAll}
        onChange={onCheckAllChange}
      >全选</Checkbox>}
    >
      <Checkbox.Group
        options={ops}
        value={checkedList}
        onChange={onChange}
      />
    </Card>
  )
}

export default ResOps;
