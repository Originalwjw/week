/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useCallback } from 'react';
import { Tags, getTags } from '../../services/tagsApi';
import { log } from 'console';


export const useTagsList = (tags?:Tags) => {
    //1、获取频道中的所有数据
      //存储频道列表
      const [tagsList, setTagsList] = useState([])
      //获取频道列表
      useEffect(() => {
        const getTagsList = async () => {
          const res = await getTags(tags)
          // console.log('res',res.data);
          setTagsList(res.data)
        }
        //调用获取频道函数
        getTagsList()
      }, [tags])
      
      //2、把组件中要用到的数据return出去
      return tagsList    
}