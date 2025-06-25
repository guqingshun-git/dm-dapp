// src/config/env.ts
const API_BASE = import.meta.env.VITE_API_BASE; // 使用 Vite 专用语法
const FUND_WALLET = import.meta.env.VITE_FUND_WALLET as string;
export { API_BASE, FUND_WALLET };