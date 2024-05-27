import { Modal, Form, Input, Spin, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useTagsList } from "../api";
import { addData, editData } from "../../../services/dataApi";
const { Option } = Select
interface IProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (val: any) => void;
  currentItem?: any;
}
function ModalSet(props: IProps) {
  const { onCancel, onOk, visible, currentItem: initialValues = {} } = props;
  console.log('props', props);

  const [form] = Form.useForm();
  const tagsList = useTagsList();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  let isAddStatus = true; // 是否是新增状态
  if (initialValues && Object.keys(initialValues).length > 0) {
    isAddStatus = false
  }
  console.log(initialValues);

  const modalSetOk = () => {
    form.submit();
  };
  const onFinish = async (values: any) => {
    console.log({ ...values, id: initialValues.id, });
    if (isAddStatus) {
      await addData(values)
    } else {
      await editData({
        ...values,
        id: initialValues.id,
      })
    }

    onOk(values);
  };
  return (
    <Modal
      title={isAddStatus ? `新增记录` : "编辑记录"}
      open={visible}
      onCancel={onCancel}
      onOk={modalSetOk}
      // closable={true}
      width="520px"
      maskClosable={true}
    >
      <Spin spinning={false}>
        <Form
          {...layout}
          layout="horizontal"
          initialValues={initialValues}
          className="data-form"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
            <Input showCount maxLength={20} placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="描述" name="description" rules={[{ required: true, message: '请输入描述' }]}>
            <TextArea showCount maxLength={50} placeholder="请输入描述" />
          </Form.Item>
          <Form.Item label="标签" name="tags">
            <Select
              mode="tags"
              placeholder="请选择标签"
            >
              {tagsList.map((tag: { id: string; name: string; }) =>
                <Option key={tag.id}>{tag.name}</Option>
              )}
            </Select>
          </Form.Item>

        </Form>
      </Spin>
    </Modal>

    //<Modal title="添加记录" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认"cancelText="取消">
    //   <Form onFinish={ModalFinish}>

    //   </Form>
    // </Modal>
  );
}
export default ModalSet;