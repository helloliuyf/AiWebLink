// 数据加载器 - 从 JSON 文件加载配置
class DataLoader {
  constructor() {
    this.data = {
      nav: [],
      tutorials: [],
      prompts: [],
      news: [],
      glossary: []
    };
    this.loaded = false;
  }

  async loadAll() {
    try {
      const [nav, tutorials, prompts, news, glossary] = await Promise.all([
        this.loadJSON('data/nav.json'),
        this.loadJSON('data/tutorials.json'),
        this.loadJSON('data/prompts.json'),
        this.loadJSON('data/news.json'),
        this.loadJSON('data/glossary.json')
      ]);

      this.data.nav = nav;
      this.data.tutorials = tutorials;
      this.data.prompts = prompts;
      this.data.news = news;
      this.data.glossary = glossary;
      this.loaded = true;

      // 将数据挂载到全局，供其他模块使用
      window.NAV_DATA = nav;
      window.TUTORIALS = tutorials;
      window.PROMPT_TEMPLATES = prompts;
      window.NEWS = news;
      window.AI_TERMS = glossary;

      console.log('✅ 所有数据加载成功');
      return this.data;
    } catch (error) {
      console.error('❌ 数据加载失败:', error);
      throw error;
    }
  }

  async loadJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status}`);
    }
    return await response.json();
  }

  isLoaded() {
    return this.loaded;
  }
}

// 创建全局数据加载器实例
const dataLoader = new DataLoader();