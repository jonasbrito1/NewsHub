import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true
}));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample news data
const newsData = [
  {
    id: '1',
    title: 'Nova Tecnologia Revoluciona Setor de Energia Renovável',
    summary: 'Cientistas desenvolvem nova forma de armazenamento de energia solar que promete revolucionar o mercado.',
    content: 'Uma descoberta revolucionária no campo da energia renovável promete transformar a forma como armazenamos e utilizamos energia solar. Pesquisadores desenvolveram uma nova tecnologia de bateria que pode armazenar energia solar por períodos muito mais longos, tornando as fontes renováveis mais viáveis economicamente.',
    category: 'tecnologia',
    author: 'Dr. Ana Silva',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date('2025-06-12T10:00:00Z'),
    views: 1250,
    featured: true,
    trending: true
  },
  {
    id: '2',
    title: 'Acordo Climático Global Estabelece Novas Metas para 2030',
    summary: 'Países se comprometem com redução de 50% nas emissões de carbono nos próximos 6 anos.',
    content: 'Em uma reunião histórica, 195 países assinaram um novo acordo climático que estabelece metas ambiciosas para a redução de emissões de gases do efeito estufa. O acordo prevê uma redução de 50% nas emissões até 2030 e investimentos massivos em energias renováveis.',
    category: 'meio-ambiente',
    author: 'Carlos Mendes',
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date('2025-06-12T08:30:00Z'),
    views: 2100,
    featured: false,
    trending: true
  },
  {
    id: '3',
    title: 'Inteligência Artificial Acelera Descoberta de Novos Medicamentos',
    summary: 'IA reduz tempo de desenvolvimento de medicamentos de 10 anos para 2 anos.',
    content: 'Uma nova plataforma de inteligência artificial está revolucionando a descoberta de medicamentos, reduzindo drasticamente o tempo necessário para desenvolver novos tratamentos. A tecnologia pode identificar compostos promissores em questão de semanas, acelerando significativamente o processo de desenvolvimento farmacêutico.',
    category: 'saude',
    author: 'Dra. Marina Costa',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date('2025-06-12T06:15:00Z'),
    views: 890,
    featured: false,
    trending: true
  },
  {
    id: '4',
    title: 'Economia Global Mostra Sinais de Recuperação Robusta',
    summary: 'FMI revisa projeções de crescimento para cima após dados econômicos positivos.',
    content: 'O Fundo Monetário Internacional (FMI) revisou suas projeções de crescimento econômico global para cima, citando dados econômicos mais fortes do que o esperado em várias economias importantes. A recuperação está sendo impulsionada por investimentos em infraestrutura e tecnologia.',
    category: 'economia',
    author: 'Roberto Lima',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date('2025-06-11T20:45:00Z'),
    views: 1560,
    featured: true,
    trending: false
  },
  {
    id: '5',
    title: 'Missão Espacial Descobre Evidências de Água em Exoplaneta',
    summary: 'Telescópio espacial detecta vapor d\'água na atmosfera de planeta distante.',
    content: 'Uma missão espacial internacional fez uma descoberta extraordinária ao detectar evidências claras de vapor d\'água na atmosfera de um exoplaneta localizado a 120 anos-luz da Terra. Esta descoberta aumenta significativamente as possibilidades de encontrar vida fora do nosso sistema solar.',
    category: 'ciencia',
    author: 'Prof. João Santos',
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date('2025-06-11T18:20:00Z'),
    views: 3200,
    featured: false,
    trending: true
  },
  {
    id: '6',
    title: 'Copa do Mundo 2026: Preparativos Avançam nos Três Países-Sede',
    summary: 'EUA, Canadá e México aceleram obras de infraestrutura para o mundial.',
    content: 'Os preparativos para a Copa do Mundo de 2026 estão em pleno andamento nos três países-sede. Estádios estão sendo reformados, infraestrutura de transporte expandida e sistemas de segurança modernizados para receber o maior evento esportivo do mundo.',
    category: 'esportes',
    author: 'Fernanda Oliveira',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date('2025-06-11T16:00:00Z'),
    views: 980,
    featured: false,
    trending: false
  }
];

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'NewsHub API',
    version: '1.0.0'
  });
});

// Get all news
app.get('/api/news', (req, res) => {
  const { category, limit = 10 } = req.query;
  
  let filteredNews = newsData;
  
  if (category) {
    filteredNews = newsData.filter(news => news.category === category);
  }
  
  const limitedNews = filteredNews.slice(0, Number(limit));
  
  res.json({
    success: true,
    data: limitedNews,
    total: filteredNews.length
  });
});

// Get featured news
app.get('/api/news/featured', (req, res) => {
  const featuredNews = newsData.filter(news => news.featured);
  res.json({
    success: true,
    data: featuredNews
  });
});

// Get trending news
app.get('/api/news/trending', (req, res) => {
  const trendingNews = newsData
    .filter(news => news.trending)
    .sort((a, b) => b.views - a.views);
  
  res.json({
    success: true,
    data: trendingNews
  });
});

// Get single news by ID
app.get('/api/news/:id', (req, res) => {
  const { id } = req.params;
  const news = newsData.find(item => item.id === id);
  
  if (!news) {
    return res.status(404).json({
      success: false,
      message: 'Notícia não encontrada'
    });
  }
  
  // Increment views
  news.views += 1;
  
  res.json({
    success: true,
    data: news
  });
});

// Search news
app.get('/api/news/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Query de busca é obrigatória'
    });
  }
  
  const searchResults = newsData.filter(news =>
    news.title.toLowerCase().includes(String(q).toLowerCase()) ||
    news.summary.toLowerCase().includes(String(q).toLowerCase()) ||
    news.content.toLowerCase().includes(String(q).toLowerCase())
  );
  
  res.json({
    success: true,
    data: searchResults,
    query: q
  });
});

// Get categories
app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 'tecnologia', name: 'Tecnologia', icon: '💻' },
    { id: 'meio-ambiente', name: 'Meio Ambiente', icon: '🌍' },
    { id: 'saude', name: 'Saúde', icon: '🏥' },
    { id: 'economia', name: 'Economia', icon: '💼' },
    { id: 'ciencia', name: 'Ciência', icon: '🔬' },
    { id: 'esportes', name: 'Esportes', icon: '⚽' }
  ];
  
  res.json({
    success: true,
    data: categories
  });
});

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Email válido é obrigatório'
    });
  }
  
  console.log(`📧 Nova inscrição na newsletter: ${email}`);
  
  res.json({
    success: true,
    message: 'Inscrição realizada com sucesso!'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 NewsHub API está funcionando!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      news: '/api/news',
      featured: '/api/news/featured',
      trending: '/api/news/trending',
      categories: '/api/categories',
      newsletter: '/api/newsletter'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint não encontrado'
  });
});

// Error handler
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Erro:', error);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NewsHub Backend rodando na porta ${PORT}`);
  console.log(`📚 API disponível em: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📰 Notícias carregadas: ${newsData.length}`);
});

export default app;