class TutorialsRenderer {
  render(keyword = '') {
    const container = document.getElementById('section-tutorials');
    container.innerHTML = '';

    let tutorialsToRender = TUTORIALS;
    
    if (keyword) {
      const kw = keyword.toLowerCase();
      tutorialsToRender = TUTORIALS.filter(tutorial => 
        tutorial.title.toLowerCase().includes(kw) ||
        tutorial.description.toLowerCase().includes(kw) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(kw))
      );
    }

    if (tutorialsToRender.length === 0) {
      container.innerHTML = '<div class="no-results">😕 没有找到相关教程</div>';
      return;
    }

    tutorialsToRender.forEach(tutorial => {
      const card = document.createElement('div');
      card.className = 'tutorial-card';
      card.innerHTML = `
        <h3>${tutorial.title}</h3>
        <p>${tutorial.description}</p>
        <div class="tutorial-meta">
          <span>📊 ${tutorial.difficulty}</span>
          <span>⏱️ ${tutorial.time}</span>
          <span>🏷️ ${tutorial.tags.join(', ')}</span>
        </div>
        <div style="margin-top: 16px; display: none;" class="tutorial-content">
          ${tutorial.content}
        </div>
      `;
      
      card.addEventListener('click', () => {
        const content = card.querySelector('.tutorial-content');
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
      });
      
      container.appendChild(card);
    });
  }
}