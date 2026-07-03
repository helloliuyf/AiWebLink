class UtilsRenderer {
  render() {
    const container = document.getElementById('section-utils');
    container.innerHTML = `
      <div class="tool-grid">
        <div class="tool-card">
          <h3>💰 Token 计算器</h3>
          <textarea id="token-input" placeholder="输入文本..." rows="4" style="width: 100%; padding: 8px; border: 2px solid var(--border); border-radius: 6px; margin: 8px 0; background: var(--card-bg); color: var(--text);"></textarea>
          <button onclick="app.calculateTokens()">计算 Token 数量</button>
          <div id="token-result" class="result-box" style="display: none;"></div>
        </div>

        <div class="tool-card">
          <h3>💵 API 成本估算</h3>
          <select id="api-model">
            <option value="0.03">GPT-3.5 ($0.03/1K tokens)</option>
            <option value="0.06">GPT-4 ($0.06/1K tokens)</option>
            <option value="0.01">Claude ($0.01/1K tokens)</option>
          </select>
          <input type="number" id="api-tokens" placeholder="Token 数量" />
          <button onclick="app.calculateCost()">计算成本</button>
          <div id="cost-result" class="result-box" style="display: none;"></div>
        </div>

        <div class="tool-card">
          <h3>📊 模型对比表</h3>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr style="background: var(--hover);">
                  <th style="padding: 8px; border: 1px solid var(--border);">模型</th>
                  <th style="padding: 8px; border: 1px solid var(--border);">上下文</th>
                  <th style="padding: 8px; border: 1px solid var(--border);">价格</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 8px; border: 1px solid var(--border);">GPT-4</td>
                  <td style="padding: 8px; border: 1px solid var(--border);">128K</td>
                  <td style="padding: 8px; border: 1px solid var(--border);">$0.06/1K</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid var(--border);">Claude 3</td>
                  <td style="padding: 8px; border: 1px solid var(--border);">200K</td>
                  <td style="padding: 8px; border: 1px solid var(--border);">$0.01/1K</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid var(--border);">Gemini Pro</td>
                  <td style="padding: 8px; border: 1px solid var(--border);">32K</td>
                  <td style="padding: 8px; border: 1px solid var(--border);">免费</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  calculateTokens() {
    const text = document.getElementById('token-input').value;
    const tokens = Math.ceil(text.length / 4);
    const resultBox = document.getElementById('token-result');
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <strong>估算结果：</strong><br>
      字符数：${text.length}<br>
      估算 Token 数：~${tokens}<br>
      <small style="color: var(--text-secondary);">* 基于平均4字符/token估算</small>
    `;
  }

  calculateCost() {
    const price = parseFloat(document.getElementById('api-model').value);
    const tokens = parseInt(document.getElementById('api-tokens').value) || 0;
    const cost = (tokens / 1000 * price).toFixed(4);
    const resultBox = document.getElementById('cost-result');
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <strong>成本估算：</strong><br>
      Token 数量：${tokens.toLocaleString()}<br>
      预估费用：$${cost}<br>
      <small style="color: var(--text-secondary);">约合 ¥${(cost * 7.2).toFixed(2)}</small>
    `;
  }
}