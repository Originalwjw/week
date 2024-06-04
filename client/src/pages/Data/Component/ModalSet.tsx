import { Modal, Form, Input, Spin, Select, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useTagsList } from "@/hooks/useTagsList";
import { addData, editData } from "@/services/dataApi";
import { memo } from "react";
import { useSelector } from "react-redux";
import { LangState } from "@/store";
const { Option } = Select
interface TagItem {
  id: string;
  name: string;
  color?: string;
}
interface IProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (val: any) => void;
  currentItem?: any;
}
const  ModalSet = memo((props: IProps)=> {
  const { onCancel, onOk, visible, currentItem: initialValues = {} } = props;

  const [form] = Form.useForm();
  const tagsList = useTagsList();
  const lang = useSelector((state: LangState) => state.lang.lang);
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  let isAddStatus = true; // 是否是新增状态
  if (initialValues && Object.keys(initialValues).length > 0) {
    isAddStatus = false
  }

  const modalSetOk = () => {
    form.submit();
  };
  const onFinish = async (values: any) => {
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
      title={isAddStatus ? lang.addRecord : lang.editRecord}
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
          <Form.Item label={lang.name} name="name" rules={[{ required: true, message: '请输入名称' }]}>
            <Input showCount maxLength={20} placeholder={lang.input_name} />
          </Form.Item>
          <Form.Item label={lang.description} name="description" rules={[{ required: true, message: '请输入描述' }]}>
            <TextArea showCount maxLength={50} placeholder={lang.input_description} />
          </Form.Item>
          <Form.Item label={lang.tags} name="tags">
            <Select
              mode="tags"
              placeholder={lang.input_tag_name}
            >
              {tagsList.map((tag: TagItem) => 
                <Option key={tag.id}><Tag color={tag.color}>{tag.name}</Tag></Option>
              )}
            </Select>
          </Form.Item>

        </Form>
      </Spin>
    </Modal>

  );
})
export default ModalSet;