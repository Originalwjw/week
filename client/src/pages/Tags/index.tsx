import { DeleteOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space, Spin, Table, TableProps, Tag } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useTagsList } from '../Data/api'
import { getTags } from '../../services/tagsApi'

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
          {data.tags.map((tagId: string) => {
             const tag = tagsList.find((item: { id: string; }) => item.id === tagId) as TagItem | undefined;
            if (tag!=undefined) {
              return (
                <Tag key={tag.id} color={tag.color || 'geekblue'} style={{ marginRight: 0 }}>
                  {tag.name}
                </Tag>
              );
            }
            return null;
          })}
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
              // onClick={()=>editDataButton(data)}
              />
              <Popconfirm
                title="确认删除?"
                // onConfirm={()=>delDataButton(data)}
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
      // console.log('res.data', res);
      
      // setList(dataWithIndex);
      // setCount(res.data.pageInfo.total);
    }
    getList();
    setLoading(false);
  }, [reqTags])

  return (
    <div className="main-container">
      <div>
        <div>
          <div style={{ flexGrow: '1', textAlign: 'right' }}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              // onClick={addItem}
              style={{ marginRight: '5px' }}
            >
              添加标签
            </Button>
            <Button
              danger
              icon={<MinusOutlined />}
              type="primary"
              // onClick={addItem}
              style={{ marginRight: '5px' }}
            >
              确定删除
            </Button>
            
          </div>
          {/* {modelVisible && (
            <ModalSet
              currentItem={currentItem}
              visible={modelVisible}
              onOk={modalConfigm}
              onCancel={setmodelVisibleWarp}
            />
          )} */}
        </div>

        <Spin spinning={loading}>
          <Table
            bordered
            columns={columns}
            dataSource={list}
            // onChange={onChange}
            rowKey="id"
            size='middle'
            // pagination={{
            //   current: reqDate.page,
            //   pageSize: reqDate.per_page,
            //   total: count,
            // }}
            pagination={{
              // total: count,
              // pageSize: reqDate.pageSize,
              // onChange,
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
