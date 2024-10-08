const config = {
  zh: {
    title: "内容管理平台",
    setting: "设置",
    name: "名称",
    learning_experience: "学习心得",
    data_name: "数据名称",
    tags_name: "标签名称",
    tags: "标签",
    data: "数据",
    description: "描述",
    data_description: "数据描述",
    add_time: "添加时间",
    id: "编号",
    action: "操作",
    add: "添加",
    addData: "添加数据",
    addTags: "添加标签",
    editTags:"编辑标签",
    edit: "编辑",
    delete: "删除",
    name_key: "请输入名称关键字",
    choose_tags: "请选择标签",
    reset: "重置",
    search: "搜索",
    addRecord:"新增记录",
    editRecord:"编辑记录",
    input_name: "请输入数据名称",
    input_tag_name: "请输入标签名称",
    input_description: "请输入数据描述",
    ok: "提交",
    cancel: "取消",
    confirm_delete: "确认删除",
    delete_tips: "确定要删除这条数据吗？",
    pagination_first:"共",
    pagination_end:"条数据",
    data_manage: "数据管理",
    tags_manage: "标签管理",
    color: "标签颜色",
    other_error: "请求出错，请稍后重试",
    choose_tag_color: "请选择标签颜色",
    copy_successTitle: '成功',
    copy_errorTitle: '错误',
    successCopy: '已复制到剪贴板',
    errorCopy: '复制错误',
  },
  en: {
    title: "Content Management Platform",
    setting: "Settings",
    name: "Name",
    data: "Data",
    learning_experience: "Learn experience",
    data_name: "Data name",
    tags_name: "Tags name",
    tags: "Tags",
    description: "Description",
    data_description: "Description of data",
    add_time: "Add Time",
    id: "ID",
    action: "Action",
    add: "Add",
    addData: "Add Data",
    addTags: "Add Tags",
    editTags: "Edit Tags",
    edit: "Edit",
    delete: "Delete",
    name_key: "Please enter a name keyword",
    choose_tags: "Please select tags",
    reset: "Reset",
    search: "Search",
    addRecord: "add Record",
    editRecord: "edit Record",
    input_name: "Please enter a data name",
    input_tag_name: "Please enter a label name",
    input_description: "Please enter a data description",
    ok: "OK",
    cancel: "Cancel",
    confirm_delete: "Confirm Delete",
    delete_tips: "Are you sure you want to delete this data?",
    pagination_first:"Total",
    pagination_end:"pieces of data",
    data_manage: "Data manage",
    tags_manage: "Tags manage",
    color: "Tags Color",
    other_error: "The request failed. Please try again later！",
    choose_tag_color: "Please select a label color",
    copy_successTitle: 'Success',
    copy_errorTitle: 'Error',
    successCopy: 'Copied to clipboard',
    errorCopy: 'Copying error',
  },
};

export type LangConfig = typeof config;
export type LangKeys = keyof LangConfig;
export default config;
