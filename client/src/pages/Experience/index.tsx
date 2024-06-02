import { FC, ReactNode, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css'; // 你也可以选择其他样式

interface IProps {
  children?: ReactNode;
}

const ExperienceIndex: FC<IProps> = () => {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    // Fetch the Markdown file from the public folder
    fetch('/Experience.md')
      .then(response => response.text())
      .then(text => setMarkdownContent(text))
      .catch(error => console.error('Error fetching markdown file:', error));
  }, []);

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}

export default ExperienceIndex;
