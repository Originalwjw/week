import { useEffect, useState } from 'react'

const useTableHeight = (otherElementsHeight: number) => {
  const [tableHeight, setTableHeight] = useState<number>(500)

  const updateTableHeight = () => {
    const screenHeight = window.innerHeight
    const remainingHeight = screenHeight - otherElementsHeight

    setTableHeight(remainingHeight - 50)
  }

  useEffect(() => {
    updateTableHeight()
    // 监听窗口大小变化，动态更新表格高度
    window.addEventListener('resize', updateTableHeight)
    // 在组件卸载时移除监听
    return () => {
      window.removeEventListener('resize', updateTableHeight)
    }
  })
  return tableHeight
}
export default useTableHeight
