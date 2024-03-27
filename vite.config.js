import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    replace({
      preventAssignment: true,
      __myapp: JSON.stringify({
        env: {
          VITE_REACT_APP_OMDB_API_KEY: process.env.VITE_REACT_APP_OMDB_API_KEY
        }
      })
    })
  ],
  base:"/Movie-App/",
});
