import { Modal, Form, Input, Spin} from "antd";
import { addTag, editTag } from "../../../services/tagsApi";
interface IProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (val: any) => void;
  currentItem?: any;
}
function TagsModalSet(props: IProps) {
  const { onCancel, onOk, visible, currentItem: initialValues = {} } = props;
  console.log('props',props);
  
  const [form] = Form.useForm();
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
    console.log({...values, id: initialValues.id,});
    if (isAddStatus) {
      await addTag(values)
    } else {
      await editTag({
        ...values,
        id: initialValues.id,
      })
    }

    onOk(values);
  };
  return (
    <Modal
      title={isAddStatus ? `新增标签` : "编辑标签"}
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
          className="tags-form"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="标签" name="name" rules={[{ required: true}]}>
            <Input showCount maxLength={10}  placeholder="请输入标签" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}
export default TagsModalSet;