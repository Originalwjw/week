import { Modal, Form, Input, Spin } from "antd";

interface IProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (val: any) => void;
  currentItem?: any;
}
function ModalSet(props: IProps) {
  const { onCancel, onOk, visible, currentItem: initialValues = {} } = props;

  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const isAddStatus = false; // 是否是新增状态

  return (
    <Modal
      title={isAddStatus ? `新增` : "编辑"}
      visible={visible}
      closable={false}
      width="520px"
      maskClosable
    >
      <Spin spinning={false}>
        <Form
          {...layout}
          layout="vertical"
          initialValues={initialValues}
          className="provider-form"
          form={form}
        ></Form>
      </Spin>
    </Modal>
  );
}
export default ModalSet;
