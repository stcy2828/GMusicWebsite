import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    // 【關鍵修正】
    // 如果你用自定義網域，請設為 '/'
    // 如果你用 github.io/GMusicWebsite/，請設為 '/GMusicWebsite/'
    base: '/GMusicWebsite/', 

    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // 建議改用 import.meta.env，但在這裡定義 process 也可以
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        // 因為你的檔案現在都在根目錄，這裡設定為 '.' 是正確的
        '@': path.resolve(__dirname, '.'),
      }
    },
    // 確保打包時不會因為 TypeScript 警告而停止
    build: {
      outDir: 'dist',
    }
  };
});
