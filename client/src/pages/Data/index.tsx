import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Table,
  message,
  Tooltip,
  Spin,
  Popconfirm,
} from 'antd';

import { DiffOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import './index.css';

import ModalSet from './Component/ModalSet';
import SearchBar from './Component/SearchBar';
import { getData } from '../../services/dataApi';

interface DataType {
  index: string;
  name: string;
  operator: number;

}

function DataIndex() {
  const columns : TableProps<DataType>['columns'] = [
    {
      title: '序号',
      key: 'index',
      width: 60,
      fixed: 'left',
    },
    {
      title: '标题',
      width: 160,
      fixed: 'left',
      dataIndex: 'name',
    },

    {
      title: '操作',
      width: 220,
      align: 'center',
      fixed: 'right',
      dataIndex: 'operator', // for test -1
    },
  ];

    //1.准备参数
    const [reqDate, setReqDate] = useState({
      labName: '',
      tag: [] as string[],
      begin_pubdate: '',
      end_pubdate: '',
      page: 1,
      per_page:2
    });


  const [modelVisible, setmodelVisible] = useState(false); //新增（编辑）弹窗的状态
  const [currentItem, setCurrentItem] = useState({}); // 需要被编辑的数据

  const loading = false;

  // const list :any = []

    //获取文章列表
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
      async function getList() {
        const res = await getData()
        console.log('res.data',res);
        // setList(res.data.results)
        // setCount(res.data.total_count)
        setList(res.data.dataInfo)
        setCount(res.data.pageInfo.total)
      }
      getList()
    }, [reqDate])
    



  // 搜索框内容变化
  const onSearchRuleChange = useCallback((values:any) => {
     // 更新请求参数
    setReqDate(prevState => ({
      ...prevState,
      labName: values.labName,
      tag: values.tag,
      begin_pubdate: values.begin_pubdate,
      end_pubdate: values.end_pubdate,
      page: 1, // 重置页码
    }));
  }, []);

  // 表格分页
  const onChange = ()=>{

  };


  //添加数据
  const addItem = ()=>{
    setmodelVisible(true)
  }

  //添加(编辑)成功后，重新拉取列表（这里参数要复原）
  const modalConfigm = ()=>{
    
  }

  const setmodelVisibleWarp = ()=>{
    
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
          )}
        </div>

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={list}
            onChange={onChange}
            rowKey="id"
            size='middle'
          />
        </Spin>
      </div>
    </div>
  );
}

export default DataIndex;
