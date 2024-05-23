import apiInstance from '.'
// 定义数据的类型
export interface Tags {
  tagsId: string,
  tagsName: string
}


export const addTag = async () => {
  return apiInstance({
      url: '/tags',
      method: 'POST',
  });
};


export const getTags = async (params?: Tags) => {
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