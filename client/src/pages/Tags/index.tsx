import { DeleteOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space, Spin, Table, TableProps, Tag } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useTagsList } from '../Data/api'
import { delTag, getTags } from '../../services/tagsApi'
import TagsModalSet from './Component/ModalSet'

interface IProps {
  children?: ReactNode
}
interface TagItem {
  id: string;
  name: string;
  color?: string;
}
const TagsIndex: FC<IProps> = () => {
  const columns:TableProps<IProps>['columns']=[
    {
      title: '标签',
      width: 330,
      render:data=>{
        return(
        <Space size="middle">
          {/* {data.tags.map((tagId: string) => {
            console.log('columns',data)
             const tag = tagsList.find((item: { id: string; }) => item.id === tagId) as TagItem | undefined;
            if (tag!=undefined) {
              return (
                <Tag key={tag.id} color={tag.color || 'geekblue'} style={{ marginRight: 0 }}>
                  {tag.name}
                </Tag>
              );
            }
            return null;
          })} */}
          <Tag key={data.id} color={data.color || 'geekblue'} style={{ marginRight: 0 }}>
                  {data.name}
          </Tag>
        </Space>
        )
      }
    },
    {
      title: '操作',
      width: 220,
      align: 'center',
      fixed: 'right',
      // dataIndex: 'operator', // for test -1
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
                title="确认删除?"
                onConfirm={()=>delTagsButton(data)}
                okText="确认"
                cancelText="取消"
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
  const  tagsList  = useTagsList();
  const [loading, setLoading] = useState(false);
  const [modelVisible, setmodelVisible] = useState(false); //新增（编辑）弹窗的状态
  const [currentItem, setCurrentItem] = useState({}); // 需要被编辑的数据

  //获取数据列表
  const [list, setList] = useState<IProps[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      const res = await getTags(reqTags);
      console.log('res.data', res.data);
      
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
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
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

  //添加(编辑)成功后，重新拉取列表（这里参数要复原）
  const modalConfigm = async (data: any)=>{
    setmodelVisible(false);
    console.log("ModalData:", data);
    // await addData(data)

    setReqTags({
      ...reqTags,
    })
  }
  //编辑
  const editTagsButton = async(data: any)=>{
    setmodelVisible(true);
    setCurrentItem({...data})
    // console.log(data);
  }
  const setmodelVisibleWarp = ()=>{
    setmodelVisible(false);
  }
  
  //删除
  const delTagsButton =async (data: { id: string }) => {
    // console.log("删除", data);
    await delTag({ id: data.id });
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
              添加标签
            </Button>
            <Button
              danger
              disabled={hasSelected? false:true}
              icon={<MinusOutlined />}
              type="primary"
              // onClick={addItem}
              style={{ marginRight: '5px' }}
            >
              确定删除
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
              showTotal:(total) => `共 ${total} 条数据`,
          }}
          />
        </Spin>
      </div>
    </div>
  )
}

export default TagsIndex
