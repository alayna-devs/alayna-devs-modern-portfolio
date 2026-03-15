import { defineConfig } from 'vite'

export default defineConfig({
    base: '/',
    server: {
        historyApiFallback: true
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['@supabase/supabase-js'],
                    icons: ['@fortawesome/fontawesome-free', 'devicon']
                }
            }
        },
        cssCodeSplit: true,
        minify: 'esbuild',
        sourcemap: false
    }
})
