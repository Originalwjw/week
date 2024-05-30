import type { FC, ReactNode } from 'react'
import ReactMarkdown from 'react-markdown';
interface IProps {
  children?: ReactNode
}
const ExperienceIndex: FC<IProps> = () => {
  // Markdown 格式的文本内容
  const markdownContent = `
  ## 1 Markdown.com.cn 简介

  - 支持自定义样式的 Markdown 编辑器
  - 支持微信公众号、知乎和稀土掘金
  - 点击右上方对应图标，一键复制到各平台
  
  ## 2 Markdown语法教程
  
  ### 2.1 标题
  
  不同数量的可以完成不同的标题，如下：
      `;
  return (
    <div className="my-experience">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  )
}

export default ExperienceIndex