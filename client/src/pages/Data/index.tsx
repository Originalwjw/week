import  { useEffect, useState, useCallback, useContext } from 'react';
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

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import './index.css';

import ModalSet from './Component/ModalSet';
import SearchBar from './Component/SearchBar';
import { addData, delData, getData } from '../../services/dataApi';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useTagsList } from './api';
import { LangContext } from '../../index';

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
  const { lang } = useContext(LangContext);
  const columns : TableProps<DataType>['columns'] = [
    {
      title: lang.id,
      key: 'index',
      width: 80,
      fixed: 'left',
      dataIndex: 'index',
      // render: (_, __, index) => index + 1,
    },
    {
      title: lang.name,
      width: 160,
      fixed: 'left',
      dataIndex: 'name',
    },
    {
      title: lang.description,
      width: 220,
      fixed: 'left',
      dataIndex: 'description',
      render: (value) =>         
        <div style={{ textAlign: 'center' }}>
          {value.length > 30 ? (
        <Tooltip title={value}>
          <span>{value.slice(0, 30)}...</span>
        </Tooltip>
        ) : (
          <span>{value}</span>
        )}
        </div>

    },
    {
      title: lang.create_time,
      width: 220,
      fixed: 'left',
      dataIndex: 'time',
      render: (time: number) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: lang.tags,
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
      title: lang.action,
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
              onClick={()=>editDataButton(data)}/>
              <Popconfirm
                title={lang.confirm_delete}
                onConfirm={()=>delDataButton(data)}
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
  ];

  const [reqDate, setReqDate] = useState({
    name: '',
    tags: [''] as string[],
    startTime: '',
    endTime: '',
    pageNo: 1,
    pageSize:10
  });
  const  tagsList  = useTagsList();
  const [loading, setLoading] = useState(false);

  const [modelVisible, setmodelVisible] = useState(false); //新增（编辑）弹窗的状态
  const [currentItem, setCurrentItem] = useState({}); // 需要被编辑的数据




    //获取数据列表
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
  }, []);

  // 表格分页
  const onChange = (pagination: any) => {
    setReqDate((prevState) => ({
      ...prevState,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  //添加数据
  const addItem = ()=>{
    setCurrentItem({})
    setmodelVisible(true)
  }

  //添加(编辑)成功后，重新拉取列表（这里参数要复原）
  const modalConfigm = async (data: any)=>{
    setmodelVisible(false);

    setReqDate({
      ...reqDate,
    })
  }
  //编辑
  const editDataButton = async(data: any)=>{
    setmodelVisible(true);
    setCurrentItem({...data})
  }
  const setmodelVisibleWarp = ()=>{
    setmodelVisible(false);
  }
  
  //删除
  const delDataButton =async (data: { id: string }) => {
    await delData({ id: data.id });
      // 更新列表
        setReqDate({
      ...reqDate,
    })
  }

  return (
    <div className="main-container">
      <div>
        <SearchBar onSearchRuleChange={onSearchRuleChange} />
      </div>
      <div>
        <div>
          <div style={{ flexGrow: '1', textAlign: 'right' }}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={addItem}
              style={{ marginRight: '5px' }}
            >
              {lang.addData}
            </Button>
            
          </div>
          {modelVisible && (
            <ModalSet
              currentItem={currentItem}
              visible={modelVisible}
              onOk={modalConfigm}
              onCancel={setmodelVisibleWarp}
            />
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
              showTotal:(total) => `${lang.pagination_first} ${total} ${lang.pagination_end}`,
          }}
          />
        </Spin>
      </div>
    </div>
  );
}

export default DataIndex;