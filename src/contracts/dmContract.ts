import { Address } from 'viem';

// 1. 合约配置类型定义
export interface ContractConfig {
  address: Address;  // 符合viem标准的地址类型
  abi: any[];        // 合约ABI接口定义
}

// 2. 主存款合约配置（DM代币合约）
export const DM_CONTRACT: ContractConfig = {
  address: '0xBc5bBE5De61C8a2d2D7A1896E4686f62068Fe69c' as Address,
  abi: [
    // ====================== 构造函数 ======================
    {
      name: 'constructor',
      type: 'constructor',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'creator_', type: 'address' },   // 合约创建者地址
        { name: 'name_', type: 'string' },       // 代币名称
        { name: 'symbol_', type: 'string' },     // 代币符号
        { name: 'decimals_', type: 'uint8' },    // 代币精度
        { name: 'tokenSupply_', type: 'uint256' } // 初始代币供应量
      ]
    },

    // ====================== 事件 ======================
    {
      name: 'Approval',
      type: 'event',
      anonymous: false,
      inputs: [
        { indexed: true, name: 'owner', type: 'address' },
        { indexed: true, name: 'spender', type: 'address' },
        { indexed: false, name: 'value', type: 'uint256' }
      ]
    },
    {
      name: 'OwnershipTransferred',
      type: 'event',
      anonymous: false,
      inputs: [
        { indexed: true, name: 'previousOwner', type: 'address' },
        { indexed: true, name: 'newOwner', type: 'address' }
      ]
    },
    {
      name: 'Transfer',
      type: 'event',
      anonymous: false,
      inputs: [
        { indexed: true, name: 'from', type: 'address' },
        { indexed: true, name: 'to', type: 'address' },
        { indexed: false, name: 'value', type: 'uint256' }
      ]
    },

    // ====================== ERC20标准方法 ======================
    {
      name: 'allowance',
      type: 'function',
      stateMutability: 'view',
      inputs: [
        { name: 'owner', type: 'address' },    // 代币持有者
        { name: 'spender', type: 'address' }   // 被授权地址
      ],
      outputs: [{ name: '', type: 'uint256' }]  // 返回授权额度
    },
    {
      name: 'approve',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'spender', type: 'address' },   // 被授权地址
        { name: 'amount', type: 'uint256' }     // 授权金额
      ],
      outputs: [{ name: '', type: 'bool' }]     // 操作是否成功
    },
    {
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }],  // 查询地址
      outputs: [{ name: '', type: 'uint256' }]         // 返回余额
    },
    {
      name: 'decimals',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'uint8' }]  // 返回代币精度
    },
    {
      name: 'name',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'string' }]  // 返回代币名称
    },
    {
      name: 'symbol',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'string' }]  // 返回代币符号
    },
    {
      name: 'totalSupply',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'uint256' }]  // 返回总供应量
    },
    {
      name: 'transfer',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'recipient', type: 'address' },  // 接收地址
        { name: 'amount', type: 'uint256' }      // 转账金额
      ],
      outputs: [{ name: '', type: 'bool' }]      // 操作是否成功
    },
    {
      name: 'transferFrom',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'sender', type: 'address' },     // 发送地址
        { name: 'recipient', type: 'address' },   // 接收地址
        { name: 'amount', type: 'uint256' }       // 转账金额
      ],
      outputs: [{ name: '', type: 'bool' }]       // 操作是否成功
    },

    // ====================== 授权管理方法 ======================
    {
      name: 'decreaseAllowance',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'spender', type: 'address' },      // 被授权地址
        { name: 'subtractedValue', type: 'uint256' } // 减少的授权金额
      ],
      outputs: [{ name: '', type: 'bool' }]         // 操作是否成功
    },
    {
      name: 'increaseAllowance',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'spender', type: 'address' },   // 被授权地址
        { name: 'addedValue', type: 'uint256' }  // 增加的授权金额
      ],
      outputs: [{ name: '', type: 'bool' }]      // 操作是否成功
    },

    // ====================== 所有权管理 ======================
    {
      name: 'owner',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'address' }]  // 返回当前所有者
    },
    {
      name: 'renounceOwnership',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [],
      outputs: []  // 放弃所有权（无返回值）
    },
    {
      name: 'transferOwnership',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'newOwner', type: 'address' }],  // 新所有者地址
      outputs: []  // 无返回值
    },

    // ====================== 特殊功能 ======================
    {
      name: 'mintedByDxsale',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'bool' }]  // 是否通过DxSale铸造
    },
    {
      name: 'mintingFinishedPermanent',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'bool' }]  // 是否永久停止铸造
    },
    {
      name: '_creator',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'address' }]  // 返回合约创建者地址
    }
  ] as const,  // as const 确保类型精确匹配
};

// 3. USDT代币合约配置（标准ERC20实现）
export const USDT_CONTRACT: ContractConfig = {
  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as Address,
  abi: [
    // 转账方法（用户向合约转账）
    {
      name: 'transfer',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'to', type: 'address' },     // 接收地址（您的合约地址）
        { name: 'amount', type: 'uint256' }  // USDT数量（单位：wei）
      ],
      outputs: [{ name: '', type: 'bool' }], // 返回操作状态
    },
    // 余额查询
    {
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }], // 查询地址
      outputs: [{ name: '', type: 'uint256' }]         // 返回余额
    }
  ] as const,
};