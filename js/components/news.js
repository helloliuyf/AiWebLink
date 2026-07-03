class NewsRenderer {
  render(keyword = '') {
    const container = document.getElementById('section-news');
    container.innerHTML = '';

    let newsToRender = NEWS;
    
    if (keyword) {
      const kw = keyword.toLowerCase();
      newsToRender = NEWS.filter(news => 
        news.title.toLowerCase().includes(kw) ||
        news.summary.toLowerCase().includes(kw) ||
        news.source.toLowerCase().includes(kw)
      );
    }

    if (newsToRender.length === 0) {
      container.innerHTML = '<div class="no-results">😕 没有找到相关新闻</div>';
      return;
    }

    newsToRender.forEach(news => {
      const item = document.createElement('div');
      item.className = 'news-item';
      item.innerHTML = `
        <h3><a href="${news.url}" target="_blank">${news.title}</a></h3>
        <p>${news.summary}</p>
        <div class="news-meta">
          <span>📰 ${news.source}</span>
          <span>📅 ${news.date}</span>
        </div>
      `;
      container.appendChild(item);
    });
  }
}