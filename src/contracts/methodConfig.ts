// 1. 方法参数配置类型
export interface MethodParamConfig {
  type: string;  // 参数类型（如：'uint256'）
  name: string;  // 参数名称
}

// 2. 方法配置类型
export interface MethodConfig {
  args: MethodParamConfig[]; // 参数列表
  value?: string;            // 仅当需要发送ETH时使用（USDT转账不需要）
}

// 3. 合约方法映射表
export const CONTRACT_METHODS: Record<string, MethodConfig> = {
  // 余额查询方法
  balanceOf: {
    args: [
      { name: 'account', type: 'address' } // 查询账户地址
    ]
  },

  // 总供应量查询
  totalSupply: {
    args: [] // 无参数
  },
  // USDT转账方法配置（用户向您的合约转账）
  transfer: {
    args: [
      { name: 'to', type: 'address' },     // 接收地址（填您的合约地址）
      { name: 'amount', type: 'uint256' }  // USDT数量（单位：wei）
    ]
  },
  // 存款方法配置（您的业务逻辑）
  deposit: {
    args: [{ name: 'amount', type: 'uint256' }] // 存款金额
  },
  // 其他方法...
};