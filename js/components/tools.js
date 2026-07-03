class ToolsRenderer {
  constructor(bookmarkManager) {
    this.bookmarkManager = bookmarkManager;
  }

  render(data) {
    const container = document.getElementById('section-tools');
    if (!container) {
      console.error('渲染失败：找不到 #section-tools 节点');
      return; // 找不到节点直接返回，防止报错
    }
    container.innerHTML = '';

    if (data.length === 0) {
      container.innerHTML = '<div class="no-results">😕 没有找到相关工具</div>';
      return;
    }

    data.forEach(sec => {
      const catDiv = document.createElement('div');
      catDiv.className = 'category';

      const headerDiv = document.createElement('div');
      headerDiv.className = 'category-header';

      const title = document.createElement('h2');
      title.innerHTML = `${sec.icon || ''} ${sec.category}`;

      const count = document.createElement('span');
      count.className = 'category-count';
      count.textContent = sec.links.length;

      headerDiv.appendChild(title);
      headerDiv.appendChild(count);
      catDiv.appendChild(headerDiv);

      const listDiv = document.createElement('div');
      listDiv.className = 'link-list';

      sec.links.forEach(([name, url, tags = []]) => {
        const item = document.createElement('div');
        item.className = 'link-item';

        const isBookmarked = this.bookmarkManager.isBookmarked(url);

        item.innerHTML = `
          <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-url="${url}">
            ${isBookmarked ? '⭐' : '☆'}
          </button>
          <a href="${url}" target="_blank">${name}</a>
          <small>${url}</small>
          ${tags.length > 0 ? `
            <div class="tags">
              ${tags.map(tag => `<span class="tag ${tag}">${getTagLabel(tag)}</span>`).join('')}
            </div>
          ` : ''}
        `;

        listDiv.appendChild(item);
      });

      catDiv.appendChild(listDiv);
      container.appendChild(catDiv);
    });

    this.attachBookmarkListeners();
  }

  attachBookmarkListeners() {
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const url = btn.dataset.url;
        this.bookmarkManager.toggle(url);
        btn.classList.toggle('active');
        btn.textContent = this.bookmarkManager.isBookmarked(url) ? '⭐' : '☆';
      });
    });
  }

  filterData(keyword) {
    if (!keyword) {
      return NAV_DATA;
    }

    const kw = keyword.toLowerCase();
    return NAV_DATA.map(cat => ({
      ...cat,
      links: cat.links.filter(([name, url]) =>
        name.toLowerCase().includes(kw) || url.toLowerCase().includes(kw)
      )
    })).filter(cat => cat.links.length > 0);
  }
}