const { useState, useEffect } = React;

function MarkdownPreview({ markdown }) {
  const [html, setHtml] = useState('');
  useEffect(() => {
    setHtml(marked.parse(markdown));
  }, [markdown]);
  return (
    <div 
      className="p-4 bg-white/80 rounded overflow-auto text-gray-900"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}

function App() {
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    const updateMarkdown = () => {
      const username = document.getElementById('username').value.trim();
      if (!username) {
        const placeholder = "Enter a GitHub username to see your markdown preview";
        setMarkdown(placeholder);
        document.getElementById('codeBlock').textContent = placeholder;
        return;
      }
      let sections = [];
      if (document.getElementById('includeStats').checked) {
        const statsTheme = document.getElementById('statsTheme').value;
        sections.push(
          `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true${statsTheme !== 'default' ? `&theme=${statsTheme}` : ''})`
        );
      }
      if (document.getElementById('includeStreak').checked) {
        const streakTheme = document.getElementById('streakTheme').value;
        sections.push(
          `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${username}${streakTheme !== 'default' ? `&theme=${streakTheme}` : ''})`
        );
      }
      if (document.getElementById('includeFollowers').checked) {
        sections.push(
          `![GitHub followers](https://img.shields.io/github/followers/${username}?label=Follow&style=social)`
        );
      }
      if (document.getElementById('includeRepoStars').checked) {
        const repoName = document.getElementById('repoName').value.trim();
        if (repoName) {
          sections.push(
            `![Repo Stars](https://img.shields.io/github/stars/${username}/${repoName}?style=social)`
          );
        }
      }
      if (document.getElementById('includeTopLangs').checked) {
        const statsTheme = document.getElementById('statsTheme').value;
        sections.push(
          `![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact${statsTheme !== 'default' ? `&theme=${statsTheme}` : ''})`
        );
      }
      const md = sections.join("\n\n");
      setMarkdown(md);
      document.getElementById('codeBlock').textContent = md || "";
    };
    const elements = document.querySelectorAll('#generatorForm input, #generatorForm select');
    elements.forEach(el => {
      el.addEventListener('input', updateMarkdown);
      el.addEventListener('change', updateMarkdown);
    });
    updateMarkdown();
  }, []);
  
  return <MarkdownPreview markdown={markdown} />;
}

ReactDOM.render(<App />, document.getElementById('livePreviewContainer'));
