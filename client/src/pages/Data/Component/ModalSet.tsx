import { Modal, Form, Input, Spin, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useTagsList } from "@/pages/Data/api";
import { addData, editData } from "@/services/dataApi";
import { LangContext } from '@/index';
import { memo, useContext } from "react";
const { Option } = Select
interface IProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (val: any) => void;
  currentItem?: any;
}
const  ModalSet = memo((props: IProps)=> {
  const { onCancel, onOk, visible, currentItem: initialValues = {} } = props;
  console.log('props', props);

  const [form] = Form.useForm();
  const tagsList = useTagsList();
  const { lang } = useContext(LangContext);
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
              {tagsList.map((tag: { id: string; name: string; }) =>
                <Option key={tag.id}>{tag.name}</Option>
              )}
            </Select>
          </Form.Item>

        </Form>
      </Spin>
    </Modal>

  );
})
export default ModalSet;