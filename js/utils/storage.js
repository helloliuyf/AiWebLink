class StorageManager {
  static getBookmarks() {
    return JSON.parse(localStorage.getItem('ai-bookmarks') || '[]');
  }

  static saveBookmarks(bookmarks) {
    localStorage.setItem('ai-bookmarks', JSON.stringify(bookmarks));
  }

  static toggleBookmark(url) {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(url);
    
    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(url);
    }
    
    this.saveBookmarks(bookmarks);
    return bookmarks;
  }

  static isBookmarked(url) {
    return this.getBookmarks().includes(url);
  }

  static getTheme() {
    return localStorage.getItem('theme');
  }

  static saveTheme(theme) {
    localStorage.setItem('theme', theme);
  }
}