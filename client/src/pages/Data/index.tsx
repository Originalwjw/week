import  { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Table,
  Tooltip,
  Spin,
  Popconfirm,
  Tag,
  Space,
} from 'antd';

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { TableProps,notification } from 'antd';
import ModalSet from './Component/ModalSet';
import SearchBar from './Component/SearchBar';
import {  delData, getData } from '@/services/dataApi';
import dayjs from 'dayjs';
import { useTagsList } from './tagsList';
import useTableHeight from '@/hooks/useTableHeight'
import { useSelector } from 'react-redux';
import { LangState } from '@/store';

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
  const lang = useSelector((state: LangState) => state.lang.lang);
  const columns : TableProps<DataType>['columns'] =[
    {
      title:lang.id,
      key: 'index',
      width: 80,
      fixed: 'left',
      align:'center',
      dataIndex: 'index',
    },
    {
      title: lang.name,
      width: 160,
      fixed: 'left',
      align:'center',
      dataIndex: 'name',
      render: (value) =>         
        <div onClick={()=>onClickCopy(value)}> 
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
      title: lang.description,
      width: 220,
      fixed: 'left',
      align:'center',
      dataIndex: 'description',
      //, whiteSpace: 'nowrap'
      render: (value) =>         
        <div onClick={()=>onClickCopy(value)}> 
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
      title: lang.add_time,
      width: 220,
      fixed: 'left',
      align:'center',
      dataIndex: 'time',
      render: (time: number) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: lang.tags,
      width: 220,
      align:'center',
      render:data=>{
        return(
        <Space size="middle">
          {data.tags.map((tagId: string) => {
             const tag = tagsList.find((item: { id: string; }) => item.id === tagId) as TagItem | undefined;
            if (tag!==undefined) {
              return (
                <Tag key={tag.id} color={tag.color } style={{ marginRight: 0 }} onClick={()=>onClickCopy(tag.name)}>
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
      fixed: 'right',
      align: 'center',
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
  ]

  const [reqDate, setReqDate] = useState({
    name: '',
    tags: [''] as string[],
    startTime: '',
    endTime: '',
    pageNo: 1,
    pageSize: 10
  });
  const  tagsList  = useTagsList();
  const [loading, setLoading] = useState(false);

  const [modelVisible, setmodelVisible] = useState(false); //新增（编辑）弹窗的状态
  const [currentItem, setCurrentItem] = useState({}); // 需要被编辑的数据
  //点击复制
  const onClickCopy = (text:string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          notification.success({
            message: lang.copy_successTitle,
            description: lang.successCopy,
          });
        })
        .catch((err) => {
          notification.error({
            message: lang.copy_errorTitle,
            description: lang.errorCopy,

          });
        });
    }else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed'; //不会影响页面布局
      textArea.style.opacity = '0';     //透明
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
  
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          notification.success({
            message: lang.copy_successTitle,
            description: lang.successCopy,
          });
        }
      } catch (err) {
        notification.error({
          message: lang.copy_errorTitle,
          description: lang.errorCopy,
        });
      }
      document.body.removeChild(textArea);
    }
  };
  // 限定表格的高度
  const otherHeight = 200;
  const tableHeight = useTableHeight(otherHeight);


    //获取数据列表
    const [list, setList] = useState<DataType[]>([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
      const getList = async () => {
        setLoading(true);
        // console.log('reqDate',reqDate);
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
  const modalConfigm = async ()=>{
    setmodelVisible(false);
    //判断是否是编辑 编辑返回当前页 新增返回第一页
    if (currentItem && Object.keys(currentItem).length > 0) {
      setReqDate({
        ...reqDate,
      })
    } else {
      setReqDate({
        ...reqDate,
        pageNo: 1,
      })
    }

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
    //删除时如果是当前页最后一条内容，跳转到上一页
    const currentPageNum = list.length - 1; // 当前页剩余数据项
    if (currentPageNum === 0) {
      setReqDate({
        ...reqDate,
        pageNo:reqDate.pageNo > 1? reqDate.pageNo - 1 : 1
      })
    } else {
      setReqDate({
        ...reqDate,
      })
    }

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
              style={{ marginRight:25, marginBottom:20}}
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
            scroll={{y:tableHeight}}
            pagination={{
              total: count,
              current:reqDate.pageNo,
              pageSize: reqDate.pageSize,
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