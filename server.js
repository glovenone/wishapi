const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const targetUrl = 'https://wishapi.understars.top';

// 打印所有请求
app.use((req, res, next) => {
	console.log(`Request: ${new Date().toISOString()} - [${req.method}] ${req.originalUrl}`);
	next(); // 确保请求可以继续进行到下一个中间件或路由
});

// 代理配置
const options = {
	target: targetUrl, // 目标主机
	changeOrigin: true, // 需要虚拟托管站点
	pathRewrite: {
		'^/': '',
	},
	onProxyReq: (proxyReq, req, res) => {
		console.log(`[Proxy] ${req.method} ${req.path}`);
	},
};

// 使用中间件
app.use('/', createProxyMiddleware(options));

// 监听端口
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

