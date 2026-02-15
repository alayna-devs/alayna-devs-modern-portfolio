import { defineConfig } from 'vite'

export default defineConfig({
    base: '/',
    server: {
        historyApiFallback: true
    }
})
