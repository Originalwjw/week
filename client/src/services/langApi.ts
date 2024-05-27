import apiInstance from '.'

export const getLangAPI = async ()=>{
  return apiInstance({
    url:'/lang',
    method:'GET',
  })
}

export const setLangAPI =async (data?: any)=>{
  return apiInstance({
    url:'/lang',
    method:'POST',
    data,
  })
}
