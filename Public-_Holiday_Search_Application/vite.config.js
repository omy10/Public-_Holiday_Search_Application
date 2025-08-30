import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Import the plugin

export default defineConfig({
  plugins: [react()], // Add the plugin to the plugins array
});