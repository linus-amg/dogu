import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
        entry: path.resolve(__dirname, 'src/index.js'),
        name: 'dogu',
        formats: ['es', 'umd'],
        fileName: (format) => `dogu.${format}.js`,
    },
    rollupOptions: {
        external: ['react', 'react-dom', 'mobx', 'mobx-react', '@chakra-ui/react'],
        output: {
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            },
        },
    },
},
})
