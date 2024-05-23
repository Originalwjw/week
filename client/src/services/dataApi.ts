import apiInstance from '.'
// 定义数据的类型
export interface Data {
    name: string;
    tags?: string[];
    startTime?: string;
    endTime?: string;
    pageNo: number;
    pageSize: number;
}


export const addData = async (data: Partial<Data>) => {
    return apiInstance({
        url: '/data',
        method: 'POST',
        data,
    });
};


export const getData = async (params: Data) => {
    return apiInstance({
        url:'/data',
        method:'GET',
        params,
    })
}
export const editData = async () => {

}

export const delData = async (params: { id: string }) => {
    return apiInstance({
        url:'/data',
        method:'DELETE',
        params,
    })
}