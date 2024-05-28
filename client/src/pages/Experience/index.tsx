import type { FC, ReactNode } from 'react'
import ReactMarkdown from 'react-markdown';
interface IProps {
  children?: ReactNode
}
const ExperienceIndex: FC<IProps> = () => {
  // Markdown 格式的文本内容
  const markdownContent = `
    # Hello, Markdown!

    This is a **Markdown** content example.

    ## Features:
    - Easy to write
    - Readable

    ## Syntax Highlighting:
    \`\`\`jsx
    const MyComponent = () => {
      return <div>Hello, World!</div>;
    }
    \`\`\`

    ## Links:
    [Visit React Markdown on GitHub](https://github.com/rexxars/react-markdown)
  `;
  return (
    <div className="my-experience">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  )
}

export default ExperienceIndex