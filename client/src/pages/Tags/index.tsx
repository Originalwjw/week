import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const TagsIndex: FC<IProps> = () => {

  return (
    <div>
      这个是标签管理
    </div>
  )
}

export default TagsIndex
