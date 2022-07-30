import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import mecss from '../../src/index';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    hmr:false,
    base:'./',
    plugins: [vue(), mecss({pathCss:'./src/assets/mess.css'})],
    server: {
        port: 8088,
        hmr: {
            host: 'localhost',
            port: 8088
        },
        proxy: {
            '/api': {
                target: 'your https address',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '')
            }
        }
    }
});
