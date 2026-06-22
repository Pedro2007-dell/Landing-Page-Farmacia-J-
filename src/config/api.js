/**
 * API Base URL:
 * - Em desenvolvimento (Vite): usa /api-proxy, que é redirecionado pelo proxy do Vite
 * - Em produção (Vercel): usa /api-proxy, que é redirecionado pelo vercel.json
 * Em ambos os casos a requisição sai do servidor, sem CORS.
 */
const API_BASE_URL = '/api-proxy';

export default API_BASE_URL;
