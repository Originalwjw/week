import { FC, ReactNode, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css'; 

interface IProps {
  children?: ReactNode;
}

const ExperienceIndex: FC<IProps> = () => {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetch('/Experience.md')
      .then(response => response.text())
      .then(text => setMarkdownContent(text))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="markdown-body" style={{ padding: 20 }}>
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
