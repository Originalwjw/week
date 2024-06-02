import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { message } from 'antd'
import { useSelector } from 'react-redux';
import { LangState } from '@/store';

const apiInstance: AxiosInstance = axios.create({
  baseURL: '/api', // 设置你API地址根路径
})

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  prefixCls: 'my-message',
})

// 请求拦截器
apiInstance.interceptors.request.use((config) => {
  return config
})

// 响应拦截器
apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const responseData = response.data
    if (responseData.code === 200) {
      // message.success(responseData.msg)
    } else if (responseData.code === 201) {
      return responseData
    } else if(responseData.code === 401){
      message.error(responseData.msg)
    }
     else {
      message.error(responseData.msg)
    }
    return responseData
  },
  (error) => {
    // 处理请求错误
    const lang = useSelector((state: LangState) => state.lang.lang);
    message.error(lang.other_error)
    return Promise.reject(error)
  }
)

export default apiInstance
