import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Table,
  message,
  Tooltip,
  Spin,
  Popconfirm,
  Tag,
  Space,
  Form,
  Input,
  Modal,
  Select,
} from 'antd';

import { DeleteOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import './index.css';

import ModalSet from './Component/ModalSet';
import SearchBar from './Component/SearchBar';
import { delData, getData } from '../../services/dataApi';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useTagsList } from './api';

interface DataType {
  index: number;
  id: string;
  name: string;
  description: string;
  time: string;
  tags: string[];
  operator: number;
}
interface TagItem {
  id: string;
  name: string;
  color?: string;
}

function DataIndex() {

  const columns : TableProps<DataType>['columns'] = [
    {
      title: '编号',
      key: 'index',
      width: 60,
      fixed: 'left',
      render: (_, __, index) => index + 1,
    },
    {
      title: '标题',
      width: 160,
      fixed: 'left',
      dataIndex: 'name',
    },
    {
      title: '描述',
      width: 220,
      fixed: 'left',
      dataIndex: 'description',

    },
    {
      title: '添加时间',
      width: 220,
      fixed: 'left',
      dataIndex: 'time',
      render: (time: number) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
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
            <Button type="primary" shape="circle" icon={<EditOutlined />}/>
              <Popconfirm
                title="确认删除?"
                onConfirm={()=>delDataButton(data)}
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
  ];

    const [reqDate, setReqDate] = useState({
      name: '',
      tags: [''] as string[],
      startTime: '',
      endTime: '',
      pageNo: 1,
      pageSize:2
    });
    const  tagsList  = useTagsList();


  const [modelVisible, setmodelVisible] = useState(false); //新增（编辑）弹窗的状态
  const [currentItem, setCurrentItem] = useState({}); // 需要被编辑的数据

  const [loading, setLoading] = useState(false);

  // const list :any = []

    //获取文章列表
    const [list, setList] = useState<DataType[]>([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
      const getList = async () => {
        setLoading(true);
        console.log('reqDate',reqDate);
        const res = await getData(reqDate);
        // console.log('res.data', res);
        const startIdx = (reqDate.pageNo - 1) * reqDate.pageSize;
        const dataWithIndex = res.data.dataInfo.map((item: DataType, idx: number) => ({
          ...item,
          index: startIdx + idx + 1, // 计算序号
        }));
        setList(dataWithIndex);
        setCount(res.data.pageInfo.total);
      }
      getList();
      setLoading(false);
    }, [reqDate])
    



  // 搜索框内容变化
  const onSearchRuleChange = useCallback((values:any) => {
     // 更新请求参数
    setReqDate(prevState => ({
      ...prevState,
      name: values.name,
      tags : values.tags || [],
      startTime: values.date ? values.date[0].toDate().getTime() : '',
      endTime: values.date ? values.date[1].toDate().getTime() : '',
      pageNo: 1, // 重置页码
    }));
    console.log('values',values);
  }, []);

  // 表格分页
  // const onChange = ()=>{
  // };
  const onChange = (pagination: any) => {
    setReqDate((prevState) => ({
      ...prevState,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };


  //添加数据
  const addItem = ()=>{
    setmodelVisible(true)
  }

  //添加(编辑)成功后，重新拉取列表（这里参数要复原）
  const modalConfigm = ()=>{
    setmodelVisible(false);
    // 重新获取数据
    setReqDate((prevState) => ({ ...prevState, page: 1 }));
  }

    //删除
    const delDataButton =async (data: { id: string }) => {
      console.log("删除", data);
      await delData({ id: data.id });
        // 更新列表
          setReqDate({
        ...reqDate,
      })
    }
  const setmodelVisibleWarp = ()=>{
    setmodelVisible(false);
  }
  //   //新增数据对话框
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };
  //   const handleOk = () => {
  //     setIsModalOpen(false);
  //     ModalFinish()
  
  //   };
  //   const handleCancel = () => {
  //     setIsModalOpen(false);
  //   };
  //     //提交表单的modal
  // const ModalFinish=(formValue)=>{
  //   console.log(formValue);
  //   // //1.按照接口文档格式处理收集的表单数据
  //   // const { title, content, channel_id } = formValue
  //   // const reqData = {
  //   //   title,
  //   //   content,
  //   //   channel_id,
  //   // }
  //   // if (articleId) {
  //   //   //更新接口
  //   // updateArticleAPI({...reqData,id:articleId})
  //   // } else {
  //   // //调用新增文章接口提交
  //   // createArticleAPI(reqData)
  //   // }

  // }
  return (
    <div className="main-container">
      <div>
        <SearchBar onSearchRuleChange={onSearchRuleChange} />
      </div>
      <div>
        <div>
          <div style={{ flexGrow: '1', textAlign: 'right' }}>
            <Button
              icon={<DiffOutlined />}
              type="primary"
              onClick={addItem}
              style={{ marginRight: '5px' }}
            >
              新建
            </Button>
            
          </div>
          {modelVisible && (
            <ModalSet
              currentItem={currentItem}
              visible={modelVisible}
              onOk={modalConfigm}
              onCancel={setmodelVisibleWarp}
            />
          //   <Modal title="添加记录" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认"cancelText="取消">
          //   <Form onFinish={ModalFinish}>
          //     <Form.Item label="名称" name="title" rules={[{ required: true, message: '请输入名称' }]}>
          //       <Input showCount maxLength={20}  placeholder="请输入名称" />
          //     </Form.Item>
          //     <Form.Item label="描述" style={{marginLeft:11}}>
          //       <TextArea showCount maxLength={50}  placeholder="请输入描述" />
          //     </Form.Item>
          //     <Form.Item label="标签" style={{marginLeft:11}} name="channel_id">
          //       <Select
          //         mode="tags"
          //         placeholder="请输入标签"
          //         // defaultValue="lucy"
          //         // style={{ width: 200 }}
          //       >
          //         {channelList.map(item => 
          //           <Option key={item.id} value={item.id}>{item.name}</Option>
          //         )}
          //       </Select>
          //     </Form.Item>
          //   </Form>
          // </Modal>
          )}
        </div>

        <Spin spinning={loading}>
          <Table
            bordered
            columns={columns}
            dataSource={list}
            onChange={onChange}
            rowKey="id"
            size='middle'
            // pagination={{
            //   current: reqDate.page,
            //   pageSize: reqDate.per_page,
            //   total: count,
            // }}
            pagination={{
              total: count,
              pageSize: reqDate.pageSize,
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
  );
}

export default DataIndex;
