class BookmarkManager {
  constructor() {
    this.bookmarks = StorageManager.getBookmarks();
  }

  toggle(url) {
    this.bookmarks = StorageManager.toggleBookmark(url);
  }

  isBookmarked(url) {
    return StorageManager.isBookmarked(url);
  }

  getBookmarkedData() {
    return NAV_DATA.map(cat => ({
      ...cat,
      links: cat.links.filter(([name, url]) => this.isBookmarked(url))
    })).filter(cat => cat.links.length > 0);
  }
}

class AINavigationApp {
  constructor() {
    this.bookmarkManager = new BookmarkManager();
    this.toolsRenderer = new ToolsRenderer(this.bookmarkManager);
    this.tutorialsRenderer = new TutorialsRenderer();
    this.utilsRenderer = new UtilsRenderer();
    this.promptsRenderer = new PromptsRenderer();
    this.newsRenderer = new NewsRenderer();
    this.glossaryRenderer = new GlossaryComponent();

    this.showingBookmarks = false;
    this.currentSection = 'tools';

    this.init();
  }

  async init() {
    this.showLoading();

    try {
      await dataLoader.loadAll();
      this.hideLoading();
      this.renderAll();
      this.bindEvents();
      this.restoreTheme();
      this.updateStats();
    } catch (error) {
      this.showError(error);
    }
  }

  showLoading() {
    const app = document.getElementById('app');
    const loader = document.createElement('div');
    loader.id = 'app-loader';
    loader.className = 'no-results';
    loader.textContent = '⏳ 正在加载数据...';
    app.appendChild(loader);
  }

  hideLoading() {
    // 数据加载完成后，渲染所有内容
    // 数据加载完成后，移除加载提示
    const loader = document.getElementById('app-loader');
    if (loader) {
      loader.remove();
    }
    // 确保首个 section 显示出来
    const firstSection = document.getElementById('section-tools');
    if (firstSection) {
      firstSection.style.display = '';
    }
  }

  showError(error) {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="no-results">
        ❌ 数据加载失败<br>
        <small>${error.message}</small><br>
        <button onclick="location.reload()" style="margin-top: 16px; padding: 8px 16px; cursor: pointer;">
          🔄 重新加载
        </button>
      </div>
    `;
  }

  renderAll() {
    try {
      this.toolsRenderer.render(NAV_DATA);
      this.tutorialsRenderer.render();
      this.utilsRenderer.render();
      this.promptsRenderer.render();
      this.newsRenderer.render();
      this.glossaryRenderer.render(AI_TERMS);
    } catch (renderError) {
      console.error('渲染模块时出错:', renderError);
      // 即使渲染出错，也不应覆盖整个 app 显示"数据加载失败"，因为数据其实已经拿到了
    }
  }


  updateStats() {
    updateStatsDisplay();
  }

  bindEvents() {
    document.getElementById('search').addEventListener('input', e => {
      const keyword = e.target.value;

      if (this.currentSection === 'tools') {
        const filtered = this.toolsRenderer.filterData(keyword);
        this.toolsRenderer.render(filtered);
      } else if (this.currentSection === 'glossary') {
        const filtered = this.glossaryRenderer.searchTerms(keyword, AI_TERMS);
        this.glossaryRenderer.render(filtered);
      } else if (this.currentSection === 'tutorials') {
        this.tutorialsRenderer.render(keyword);
      } else if (this.currentSection === 'prompts') {
        this.promptsRenderer.render(keyword);
      } else if (this.currentSection === 'news') {
        this.newsRenderer.render(keyword);
      }

      this.updateStats();
    });

    document.getElementById('theme-toggle').addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      StorageManager.saveTheme(theme);
    });

    document.getElementById('show-bookmarks').addEventListener('click', () => {
      this.showingBookmarks = !this.showingBookmarks;
      const btn = document.getElementById('show-bookmarks');
      btn.style.background = this.showingBookmarks ? 'var(--primary)' : 'var(--card-bg)';
      btn.style.color = this.showingBookmarks ? 'white' : 'var(--text)';

      if (this.showingBookmarks) {
        this.toolsRenderer.render(this.bookmarkManager.getBookmarkedData());
      } else {
        this.toolsRenderer.render(NAV_DATA);
      }
      this.updateStats();
    });

    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));

        tab.classList.add('active');
        this.currentSection = tab.dataset.section;
        document.getElementById(`section-${tab.dataset.section}`).classList.add('active');

        if (this.currentSection !== 'tools') {
          document.getElementById('show-bookmarks').style.display = 'none';
        } else {
          document.getElementById('show-bookmarks').style.display = 'flex';
        }

        this.updateStats();
      });
    });
  }

  restoreTheme() {
    if (StorageManager.getTheme() === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }

  calculateTokens() {
    this.utilsRenderer.calculateTokens();
  }

  calculateCost() {
    this.utilsRenderer.calculateCost();
  }

  copyPrompt(index) {
    this.promptsRenderer.copyPrompt(index);
  }
}

// 等待 DOM 加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AINavigationApp();
});