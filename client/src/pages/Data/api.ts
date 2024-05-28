/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { Tags, getTags } from '@/services/tagsApi';

export const useTagsList = (tags?:Tags) => {
      const [tagsList, setTagsList] = useState([])
      useEffect(() => {
        const getTagsList = async () => {
          const res = await getTags(tags)
          // console.log('res',res.data);
          setTagsList(res.data)
        }
        getTagsList()
      }, [tags])
      
      return tagsList    
}