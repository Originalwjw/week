import React, { useContext, useState } from "react";
import { Form, Button, Input, Select, DatePicker } from "antd";
import { useTagsList } from "../api";
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { LangContext } from '../../../index';
const { Option } = Select
const { RangePicker } = DatePicker

interface SearchBarProps {
  onSearchRuleChange: (values: any) => void;
}
const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { lang } = useContext(LangContext);
  const [form] = Form.useForm();
  const { onSearchRuleChange } = props;
  const  tagsList  = useTagsList();
  // console.log('tagsList',tagsList);
  

  const handleReset = () => {
    form.resetFields();
    const searchRule = {};
    // console.log("handleReset=>searchRule:", searchRule);
    onSearchRuleChange(searchRule);
  };
  const handleSearch = () => {
    const values = form.getFieldsValue();
    let searchRule: any = {
      ...values,
    };
    // if (values.date) {
    //   searchRule.startTime = values.date[0].toDate().getTime();
    //   searchRule.endTime = values.date[1].toDate().getTime();
    //   delete searchRule.date;
    // }
    console.log("handleSearch=>searchRule:", searchRule);
    onSearchRuleChange(searchRule);
  };

  const formStyle = {
    display: "flex",
    background: "#fff",
    padding: "25px 10px",
    marginBottom: "20px",
    borderBottom: "1px solid #f0f0f0",
  };
  return (
    <>
      <Form layout="inline" form={form} style={formStyle}>
        {/* <Form.Item label="名称" name="fuzzyName">
          <Input placeholder="请输入搜索名称" maxLength={20} />
        </Form.Item> */}
          <Form.Item 
            label={lang.name} 
            name="name" 
            style={{ marginRight:20,minWidth: 120}}
            rules={[{ required: true}]}>
            <Input showCount maxLength={20}  placeholder={lang.input_name} />
          </Form.Item>
          <Form.Item 
            label={lang.tags}
            name="tags"
            style={{ marginRight:30}}>
            <Select
              mode="tags"
              placeholder={lang.input_tag_name}
              // defaultValue="lucy"
              style={{ minWidth: 120 }}
            >
              {tagsList.map((tag: { id: string; name: string; }) => 
                <Option key={tag.id}>{tag.name}</Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item 
            label={lang.create_time}
            name="date"
          >
            {/* 传入locale属性 控制中文显示 */}
            <RangePicker showTime></RangePicker>
          </Form.Item>

        <div style={{ flexGrow: "1", textAlign: "right" }}>
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
};

export default SearchBar;
