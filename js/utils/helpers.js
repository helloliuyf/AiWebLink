function getTagLabel(tag) {
  const labels = {
    'free': '免费',
    'paid': '付费',
    'chinese': '中文',
    'english': '英文'
  };
  return labels[tag] || tag;
}

function calculateStats(navData, tutorials, prompts, news) {
  const totalLinks = navData.reduce((sum, cat) => sum + cat.links.length, 0);
  return totalLinks + tutorials.length + prompts.length + news.length;
}

function countVisibleItems() {
  return document.querySelectorAll('.link-item, .tutorial-card, .prompt-template, .news-item, .tool-card').length;
}

function updateStatsDisplay() {
  if (!window.NAV_DATA || !window.TUTORIALS || !window.PROMPT_TEMPLATES || !window.NEWS) {
    document.getElementById('total-count').textContent = '0';
    document.getElementById('stats').textContent = '加载中...';
    return;
  }
  
  const totalResources = calculateStats(NAV_DATA, TUTORIALS, PROMPT_TEMPLATES, NEWS);
  document.getElementById('total-count').textContent = totalResources;
  
  const visibleItems = countVisibleItems();
  document.getElementById('stats').textContent = `显示 ${visibleItems} 个资源`;
}