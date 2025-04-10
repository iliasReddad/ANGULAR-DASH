export default {
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    // Allow all hosts to access the development server
    // This will bypass the host check that's causing the 403 error
    hmr: {
      clientPort: 443
    }
  }
};