import apiInstance from '.'
// 定义数据的类型
export interface Tags {
  tagsId: string,
  tagsName: string,
  color?: '',
  pageNo: number,
  pageSize: number,
}


export const addTag = async (data:string) => {
  return apiInstance({
      url: '/tags',
      method: 'POST',
      data,
  });
};


export const getTags = async (params?: any) => {
  return apiInstance({
      url:'/tags',
      method:'GET',
      params,
  })
}
export const editTag = async (data: any) => {
  return apiInstance({
    url: '/tags',
    method: 'PUT',
    data,
});
}

export const delTag = async (params: { id: string[] }) => {
  return apiInstance({
    url: '/tags',
    method: 'DELETE',
    params,
});
}