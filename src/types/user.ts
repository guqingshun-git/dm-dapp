export interface UserInfo {
  // 核心标识字段
  _id: string;
  walletAddress: string;  // 改为必填项
  
  // 账户状态
  isNode?: boolean;
  level?: number;
  
  // 邀请系统
  inviteCode?: string;
  directInviter?: string;
  inviterChain?: string[];  // 新增无限级邀请链
  
  // 时间戳
  registerTime?: number | Date;  // 新增注册时间
  updateTime?: number | Date;    // 新增更新时间
  lastSettleTime?: number | Date; // 新增结算时间
  
  // 账户体系 (统一使用字符串类型保证18位精度)
  usdtAccount?: {
    balance?: string;
    pending?: string;
    success?: string;
    used?: string;
    total?: string;
  };
  
  dmAccount?: {
    balance?: string;
    pending?: string;
    success?: string;
    used?: string;
    total?: string;
  };
  
  compAccount?: {
    balance?: string;
    pending?: string;
    success?: string;
    used?: string;
    total?: string;
    dailyRate?: number;    // 新增日复利率
    lastTime?: string | Date; // 新增最后结算时间
  };
  
  // 收益系统
  reward?: {
    total?: string;      // 改为字符串类型
    released?: string;   // 新增已释放收益
    pending?: string;    // 新增待释放收益
  };
  
  // 业务统计
  performance?: {
    payment?: string;    // 改为字符串类型
  };
  
  // 身份信息
  username?: string;
  email?: string;
  
  // 虚拟字段
  inviteLink?: string;   // 新增邀请链接
}