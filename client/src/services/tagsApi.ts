import apiInstance from '.'
// 定义数据的类型
export interface Tags {
  tagsId: string,
  tagsName: string,
  color?: '',
  pageNo: number,
  pageSize: number,
}


export const addTag = async () => {
  return apiInstance({
      url: '/tags',
      method: 'POST',
  });
};


export const getTags = async (params?: any) => {
  return apiInstance({
      url:'/tags',
      method:'GET',
      params,
  })
}
export const editTag = async () => {

}

export const delTag = async () => {

}