import React, { memo } from "react";
import { Form, Button, Input, Select, DatePicker, Tag } from "antd";
import { useTagsList } from "@/pages/Data/tagsList";
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { LangState } from "@/store";
const { Option } = Select
const { RangePicker } = DatePicker
interface TagItem {
  id: string;
  name: string;
  color?: string;
}
interface SearchBarProps {
  onSearchRuleChange: (values: any) => void;
}
const SearchBar: React.FC<SearchBarProps> = memo((props) => {
  const lang = useSelector((state: LangState) => state.lang.lang);
  const [form] = Form.useForm();
  const { onSearchRuleChange } = props;
  const tagsList: TagItem[] = useTagsList();
  // console.log('tagsList',tagsList);

  

  const handleReset = () => {
    form.resetFields();
    const searchRule = {};
    onSearchRuleChange(searchRule);
  };
  const handleSearch = () => {
    const values = form.getFieldsValue();
    let searchRule: any = {
      ...values,
    };
    onSearchRuleChange(searchRule);
  };

  const formStyle = {
    display: "flex",
    background: "#fff",
    padding: "25px 10px",
    marginBottom: "20px",
    borderBottom: "1px solid #f0f0f0",
  };
  const itemStyle = {
    flex: '1 1 auto',
    marginRight: 20,
    minWidth: 120,
    marginBottom: 20 
  };

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: '1 1 auto'
  };
  return (
    <>
      <Form layout="inline" form={form} style={formStyle}>
          <Form.Item 
            label={lang.name} 
            name="name" 
            style={itemStyle}
            rules={[{ required: true}]}>
            <Input showCount maxLength={20}  placeholder={lang.input_name} />
          </Form.Item>
          <Form.Item 
            label={lang.tags}
            name="tags"
            style={itemStyle}
            >
            <Select
              mode="tags"
              placeholder={lang.input_tag_name}
              style={{ minWidth: 120 }}
              >
              {tagsList.map((tag: TagItem) => 
                <Option key={tag.id}><Tag color={tag.color}>{tag.name}</Tag></Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item 
            label={lang.add_time}
            name="date"
            style={{ minWidth: 200 }}
            >
            <RangePicker showTime></RangePicker>
          </Form.Item>

        <div 
        style={buttonStyle}>

          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            {lang.search}
          </Button>
          <Button icon={<RedoOutlined />} style={{ marginLeft: 8 }} onClick={handleReset}>
            {lang.reset}
          </Button>
        </div>
      </Form>
    </>
  );
})

export default SearchBar;
