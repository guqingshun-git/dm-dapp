import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig, // 关键修改
  AxiosResponse,
  AxiosHeaders // 新增导入
} from 'axios';
import { API_BASE } from '../config/env';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: new AxiosHeaders({ // 使用专用类
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.dmapp.v1+json'
  })
});

// 修复请求拦截器
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => { // 类型修正
    const token = localStorage.getItem('jwt');
    if (token) {
      // 使用安全类型初始化 headers
      config.headers = config.headers || new AxiosHeaders();
      config.headers.set('Authorization', `Bearer ${token}`, true); // 安全设置
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// 响应拦截器保持不变
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers['x-refresh-token']) {
      localStorage.setItem('refreshToken', response.headers['x-refresh-token']);
    }
    return response.data;
  },
  (error: { response: { status: number } }) => {
    if (error.response?.status === 401) {
      console.log('过期token');
      localStorage.removeItem('jwt'); // 清除过期token
      // 直接刷新页面（触发AuthProvider）
      alert('认证中，请稍候...');
        setTimeout(() => window.location.reload(), 1500); // 延迟刷新确保提示可见
    }
    return Promise.reject(error);
  }
);

export default apiClient;