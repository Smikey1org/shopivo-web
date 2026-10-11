import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// export default defineConfig({ plugins: [react()], server: { port: 5173 } })
export default defineConfig({ 
    plugins: [react()], 
    server: { 
        host: "0.0.0.0", 
        port: 6500, 
        proxy: { 
            "/auth": { target: "http://shopivo.online:8080", changeOrigin: true, }, 
            "/user": { target: "http://shopivo.online:8080", changeOrigin: true, }, 
            "/products": { target: "http://shopivo.online:8080", changeOrigin: true, }, 
            "/orders": { target: "http://shopivo.online:8080", changeOrigin: true, }, 
        }, 
    }, 
    test: {
        environment: "jsdom",
    },
});