import { DeleteOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space, Spin, Table, TableProps, Tag } from 'antd'
import React, {  useContext, useEffect,  useState } from 'react'
import type { FC, ReactNode } from 'react'
import { delTag, getTags } from '@/services/tagsApi'
import TagsModalSet from './Component/ModalSet'
import { LangContext } from "@/index";

interface IProps {
  children?: ReactNode
}
interface TagItem {
  id: string;
  name: string;
  color?: string;
}
const TagsIndex: FC<IProps> = () => {
  const { lang } = useContext(LangContext);
  //useMemo根据lange变化来重新渲染
  // const columns = useMemo<TableProps<IProps>['columns']> (()=>[],[lang])
  const columns : TableProps<IProps>['columns'] =[
    {
      title: lang.tags,
      width: 330,
      render:data=>{
        return(
        <Space size="middle">
          <Tag key={data.id} color={data.color } style={{ marginRight: 0 }}>
                  {data.name}
          </Tag>
        </Space>
        )
      }
    },
    {
      title: lang.action,
      width: 220,
      align: 'center',
      fixed: 'right',
      render: data => {
        return (
          <Space size="middle">
            <Button 
              type="primary" 
              shape="circle" 
              icon={<EditOutlined />}
              onClick={()=>editTagsButton(data)}
              />
              <Popconfirm
                title={lang.confirm_delete}
                onConfirm={()=>delTagsButton(data)}
                okText={lang.ok}
                cancelText={lang.cancel}
              >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    },
  ]

  const [reqTags, setReqTags] = useState({
    id: '',
    name: '',
    color: '',
    pageNo: 1,
    pageSize:10
  });
  const [loading, setLoading] = useState(false);
  const [modelVisible, setmodelVisible] = useState(false); //新增（编辑）弹窗的状态
  const [currentItem, setCurrentItem] = useState({}); // 需要被编辑的数据

  //获取数据列表
  const [list, setList] = useState<IProps[]>([]);
  const [count] = useState(0);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      const res = await getTags(reqTags);
      
      setList(res.data);
      // setCount(res.data.pageInfo.total);
    }
    getList();
    setLoading(false);
  }, [reqTags])

    // 表格分页
    const onChange = (pagination: any) => {
      setReqTags((prevState) => ({
        ...prevState,
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
      }));
    };
    //表格选择
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    

  //添加数据
  const addItem = ()=>{
    setCurrentItem({})
    setmodelVisible(true)
  }
  //删除选中
  const delSelectedItem= async (selectedRowKeys: string[] )=>{
    await delTag({id: selectedRowKeys})
    setReqTags({
      ...reqTags,
    })
  }

  //添加(编辑)成功后，重新拉取列表（这里参数要复原）
  const modalConfigm = async (tags: string)=>{
    setmodelVisible(false);
    // await addData(data)

    setReqTags({
      ...reqTags,
    })
  }
  //编辑
  const editTagsButton = async(tags: TagItem)=>{
    setmodelVisible(true);
    setCurrentItem({...tags})
    // console.log(data);
  }
  const setmodelVisibleWarp = ()=>{
    setmodelVisible(false);
  }
  
  //删除
  const delTagsButton =async (tags: { id: string[] }) => {
    // console.log("删除", data);
    await delTag( {id: tags.id} );
      // 更新列表
        setReqTags({
      ...reqTags,
    })
  }
  return (
    <div className="main-container">
      <div>
        <div>
          <div style={{ flexGrow: '1', textAlign: 'right' }}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={addItem}
              style={{ marginRight: '5px' ,marginBottom:'20px'}}
            >
              {lang.addTags}
            </Button>
            <Button
              danger
              disabled={hasSelected? false:true}
              icon={<MinusOutlined />}
              type="primary"
              onClick={()=>delSelectedItem(selectedRowKeys as string[])}
              style={{ marginRight: '5px' }}
            >
              {lang.confirm_delete}
            </Button>
            
          </div>
          {modelVisible && (
            <TagsModalSet
              currentItem={currentItem}
              visible={modelVisible}
              onOk={modalConfigm}
              onCancel={setmodelVisibleWarp}
            />
          )}
        </div>

        <Spin spinning={loading}>
        {/* <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span> */}
          <Table
            bordered
            columns={columns}
            dataSource={list}
            onChange={onChange}
            rowSelection={rowSelection}
            rowKey="id"
            size='middle'
            pagination={{
              total: count,
              pageSize: reqTags.pageSize,
              onChange,
              size:"small",
              showSizeChanger:true,
              showQuickJumper:true,
              showTotal:(total) => `${lang.pagination_first} ${total} ${lang.pagination_end}`,
          }}
          />
        </Spin>
      </div>
    </div>
  )
}

export default TagsIndex
