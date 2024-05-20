import React from "react";
import { Form, Button, Input, Select, DatePicker } from "antd";

interface SearchBarProps {
  onSearchRuleChange: (values: any) => void;
}
const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [form] = Form.useForm();
  const { onSearchRuleChange } = props;

  const handleReset = () => {
    form.resetFields();
    const searchRule = {};
    console.log("handleReset=>searchRule:", searchRule);
    onSearchRuleChange(searchRule);
  };
  const handleSearch = () => {
    let searchRule = {};

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
        <Form.Item label="名称" name="fuzzyName">
          <Input placeholder="请输入搜索名称" maxLength={20} />
        </Form.Item>

        <div style={{ flexGrow: "1", textAlign: "right" }}>
          <Button onClick={handleSearch} type="primary">
            搜索
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            重置
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SearchBar;
