// 名词解释组件
class GlossaryComponent {
  render(terms, containerId = 'section-glossary') {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    // 按分类分组
    const groupedTerms = this.groupByCategory(terms);

    Object.entries(groupedTerms).forEach(([category, items]) => {
      const section = document.createElement('div');
      section.className = 'category';
      
      const header = document.createElement('div');
      header.className = 'category-header';
      header.innerHTML = `
        <h2>📖 ${category}</h2>
        <span class="category-count">${items.length}</span>
      `;
      section.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'link-list';
      grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(350px, 1fr))';

      items.forEach(term => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
          <h3 style="display: flex; justify-content: space-between; align-items: center;">
            <span>${term.term}</span>
            <span class="tag" style="background: var(--secondary); color: white; font-size: 10px;">${term.category}</span>
          </h3>
          <p style="color: var(--primary); font-size: 13px; margin: 8px 0; font-weight: 500;">
            ${term.fullName}
          </p>
          <p style="color: var(--text-secondary); font-size: 12px; margin-bottom: 8px;">
            ${term.chinese}
          </p>
          <div class="term-description" style="display: none; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border);">
            <p style="color: var(--text); font-size: 14px; line-height: 1.6;">${term.description}</p>
          </div>
        `;

        card.addEventListener('click', () => {
          const desc = card.querySelector('.term-description');
          desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
        });

        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  groupByCategory(terms) {
    const grouped = {};
    terms.forEach(term => {
      if (!grouped[term.category]) {
        grouped[term.category] = [];
      }
      grouped[term.category].push(term);
    });
    return grouped;
  }

  searchTerms(keyword, terms) {
    if (!keyword) {
      return terms;
    }

    const kw = keyword.toLowerCase();
    return terms.filter(term => 
      term.term.toLowerCase().includes(kw) ||
      term.fullName.toLowerCase().includes(kw) ||
      term.chinese.includes(kw) ||
      term.description.toLowerCase().includes(kw)
    );
  }
}