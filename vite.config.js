import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar las variables de entorno según el modo
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      host: env.VITE_HOST || 'localhost',
      port: parseInt(env.VITE_PORT, 10) || 5173,
    },
  };
});
