class PromptsRenderer {
  render(keyword = '') {
    const container = document.getElementById('section-prompts');
    container.innerHTML = '';

    let promptsToRender = PROMPT_TEMPLATES;
    
    if (keyword) {
      const kw = keyword.toLowerCase();
      promptsToRender = PROMPT_TEMPLATES.filter(prompt => 
        prompt.title.toLowerCase().includes(kw) ||
        prompt.category.toLowerCase().includes(kw) ||
        prompt.template.toLowerCase().includes(kw)
      );
    }

    if (promptsToRender.length === 0) {
      container.innerHTML = '<div class="no-results">😕 没有找到相关Prompt模板</div>';
      return;
    }

    promptsToRender.forEach((prompt, index) => {
      const card = document.createElement('div');
      card.className = 'prompt-template';
      card.innerHTML = `
        <h3>
          <span>${prompt.title}</span>
          <span class="tag" style="background: var(--primary); color: white;">${prompt.category}</span>
        </h3>
        <div class="prompt-content">
          <button class="copy-btn" onclick="app.copyPrompt(${PROMPT_TEMPLATES.indexOf(prompt)})">📋 复制</button>
          <pre style="white-space: pre-wrap; margin: 0;">${prompt.template}</pre>
        </div>
      `;
      container.appendChild(card);
    });
  }

  copyPrompt(index) {
    const template = PROMPT_TEMPLATES[index].template;
    navigator.clipboard.writeText(template).then(() => {
      alert('✅ Prompt 已复制到剪贴板！');
    });
  }
}