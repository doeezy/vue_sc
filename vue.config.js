const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:9090/api",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
        onProxyReq(proxyReq, req, res) {
          console.log("Proxy Request:", req.url);
        },
        onProxyRes(proxyRes, req, res) {
          console.log("Proxy Response:", req.url);
        },
      },
      // "^/keycloak": {
      //   target: "http://127.0.0.1:5010/realms/chat_demo_vue",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/keycloak": "",
      //   },
      //   onProxyReq(proxyReq, req, res) {
      //     console.log("Proxy Request:", req.url);
      //   },
      //   onProxyRes(proxyRes, req, res) {
      //     console.log("Proxy Response:", req.url);
      //   },
      // },
    },
  },
});
