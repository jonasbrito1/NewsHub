// NewsHub Frontend JavaScript

class NewsHub {
    constructor() {
        this.apiUrl = 'http://localhost:3001/api';
        this.currentCategory = '';
        this.init();
    }

    async init() {
        console.log('🚀 Iniciando NewsHub...');
        await this.loadFeaturedNews();
        await this.loadNews();
        await this.loadTrendingNews();
        this.setupEventListeners();
        this.showNotification('✅ NewsHub carregado com sucesso!');
    }

    async loadFeaturedNews() {
        try {
            const response = await fetch(`${this.apiUrl}/news/featured`);
            const data = await response.json();
            
            if (data.success && data.data.length > 0) {
                this.renderFeaturedNews(data.data[0]);
            }
// NewsHub Frontend JavaScript

class NewsHub {
    constructor() {
        this.apiUrl = 'http://localhost:3001/api';
        this.currentCategory = '';
        this.init();
    }

    async init() {
        console.log('🚀 Iniciando NewsHub...');
        await this.loadFeaturedNews();
        await this.loadNews();
        await this.loadTrendingNews();
        this.setupEventListeners();
        this.showNotification('✅ NewsHub carregado com sucesso!');
    }

    async loadFeaturedNews() {
        try {
            const response = await fetch(`${this.apiUrl}/news/featured`);
            const data = await response.json();
            
            if (data.success && data.data.length > 0) {
                this.renderFeaturedNews(data.data[0]);
            }
        } catch (error) {
            console.error('Erro ao carregar notícia principal:', error);
            document.getElementById('featuredNews').innerHTML = '<div class="loading">❌ Erro ao carregar notícia principal</div>';
        }
    }

    async loadNews(category = '') {
        try {
            let url = `${this.apiUrl}/news?limit=6`;
            if (category) {
                url += `&category=${category}`;
            }
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.success) {
                this.renderNewsGrid(data.data);
            }
        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
            document.getElementById('newsGrid').innerHTML = '<div class="loading">❌ Erro ao carregar notícias</div>';
        }
    }

    async loadTrendingNews() {
        try {
            const response = await fetch(`${this.apiUrl}/news/trending`);
            const data = await response.json();
            
            if (data.success) {
                this.renderTrendingNews(data.data);
            }
        } catch (error) {
            console.error('Erro ao carregar trending:', error);
            document.getElementById('trendingList').innerHTML = '<li class="loading">❌ Erro ao carregar trending</li>';
        }
    }

    renderFeaturedNews(news) {
        const html = `
            <article class="featured-news">
                <img src="${news.imageUrl}" alt="${news.title}" class="featured-image" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuZW5odW1hPC90ZXh0Pjwvc3ZnPg=='">
                <div class="featured-content">
                    <span class="category-tag">${this.getCategoryIcon(news.category)} ${this.getCategoryName(news.category)}</span>
                    <h1 class="featured-title">${news.title}</h1>
                    <p class="featured-summary">${news.summary}</p>
                    <div class="meta">
                        <span>📅 ${this.formatDate(news.publishedAt)}</span>
                        <span>👤 ${news.author}</span>
                        <span>👁️ ${this.formatViews(news.views)} visualizações</span>
                    </div>
                </div>
            </article>
        `;
        
        document.getElementById('featuredNews').innerHTML = html;
    }

    renderNewsGrid(newsArray) {
        const html = newsArray.map(news => `
            <article class="news-card" onclick="newsHub.viewNews('${news.id}')">
                <img src="${news.imageUrl}" alt="${news.title}" class="news-image"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuZW5odW1hPC90ZXh0Pjwvc3ZnPg=='">
                <div class="news-content">
                    <span class="category-tag">${this.getCategoryIcon(news.category)} ${this.getCategoryName(news.category)}</span>
                    <h2 class="news-title">${news.title}</h2>
                    <p class="news-summary">${news.summary}</p>
                    <div class="meta">
                        <span>📅 ${this.formatDate(news.publishedAt)}</span>
                        <span>👤 ${news.author}</span>
                    </div>
                </div>
            </article>
        `).join('');
        
        document.getElementById('newsGrid').innerHTML = `<div class="news-grid">${html}</div>`;
    }

    renderTrendingNews(newsArray) {
        const html = newsArray.map((news, index) => `
            <li class="trending-item" onclick="newsHub.viewNews('${news.id}')">
                <span class="trending-number">${index + 1}</span>
                <div class="trending-title">${news.title}</div>
            </li>
        `).join('');
        
        document.getElementById('trendingList').innerHTML = html;
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active state
                document.querySelectorAll('.nav a').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Load category
                const category = link.getAttribute('data-category');
                this.currentCategory = category;
                this.loadNews(category);
            });
        });

        // Search
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchNews();
            }
        });
    }

    async searchNews() {
        const query = document.getElementById('searchInput').value.trim();
        
        if (query.length < 2) {
            this.showNotification('Digite pelo menos 2 caracteres para buscar', 'error');
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/news/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            
            if (data.success) {
                this.renderNewsGrid(data.data);
                this.showNotification(`🔍 ${data.data.length} resultados encontrados para "${query}"`);
            } else {
                this.showNotification('Nenhum resultado encontrado', 'error');
            }
        } catch (error) {
            console.error('Erro na busca:', error);
            this.showNotification('Erro ao realizar busca', 'error');
        }
    }

    async viewNews(newsId) {
        try {
            const response = await fetch(`${this.apiUrl}/news/${newsId}`);
            const data = await response.json();
            
            if (data.success) {
                this.showNewsModal(data.data);
            }
        } catch (error) {
            console.error('Erro ao visualizar notícia:', error);
            this.showNotification('Erro ao carregar notícia', 'error');
        }
    }

    showNewsModal(news) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;
        
        modal.innerHTML = `
            <div style="background: white; max-width: 800px; max-height: 90vh; overflow-y: auto; border-radius: 8px; padding: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <span class="category-tag">${this.getCategoryIcon(news.category)} ${this.getCategoryName(news.category)}</span>
                    <button onclick="this.closest('.modal').remove()" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #999;">×</button>
                </div>
                <h1 style="font-size: 24px; margin-bottom: 15px; line-height: 1.3;">${news.title}</h1>
                <div style="color: #666; margin-bottom: 20px; font-size: 14px;">
                    📅 ${this.formatDate(news.publishedAt)} • 👤 ${news.author} • 👁️ ${this.formatViews(news.views)} visualizações
                </div>
                <img src="${news.imageUrl}" alt="${news.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;" 
                     onerror="this.style.display='none'">
                <div style="line-height: 1.6; color: #333;">
                    <p style="font-size: 16px; margin-bottom: 15px; font-weight: 500; color: #555;">${news.summary}</p>
                    <div style="white-space: pre-line; font-size: 15px;">${news.content}</div>
                </div>
            </div>
        `;
        
        modal.className = 'modal';
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    }

    async subscribeNewsletter(event) {
        event.preventDefault();
        
        const form = event.target;
        const email = form.querySelector('input[type="email"]').value;
        
        try {
            const response = await fetch(`${this.apiUrl}/newsletter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.showNotification('✅ Inscrição realizada com sucesso!');
                form.reset();
            } else {
                this.showNotification(data.message || 'Erro na inscrição', 'error');
            }
        } catch (error) {
            console.error('Erro na inscrição:', error);
            this.showNotification('Erro ao realizar inscrição', 'error');
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification show ${type}`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Utility functions
    getCategoryIcon(category) {
        const icons = {
            'tecnologia': '💻',
            'meio-ambiente': '🌍',
            'saude': '🏥',
            'economia': '💼',
            'ciencia': '🔬',
            'esportes': '⚽'
        };
        return icons[category] || '📰';
    }

    getCategoryName(category) {
        const names = {
            'tecnologia': 'Tecnologia',
            'meio-ambiente': 'Meio Ambiente',
            'saude': 'Saúde',
            'economia': 'Economia',
            'ciencia': 'Ciência',
            'esportes': 'Esportes'
        };
        return names[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatViews(views) {
        if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'k';
        }
        return views.toString();
    }
}

// Global functions for HTML onclick events
function searchNews() {
    window.newsHub.searchNews();
}

function subscribeNewsletter(event) {
    window.newsHub.subscribeNewsletter(event);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.newsHub = new NewsHub();
});

console.log('📰 NewsHub Frontend carregado!');