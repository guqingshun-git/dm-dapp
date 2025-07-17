/**
 * Gas 费用工具函数
 */

// BSC Gas 价格等级（根据实际网络情况优化）
export const BSC_GAS_LEVELS = {
  slow: 1_000_000_000n,     // 1 gwei - 便宜，适合非紧急交易
  standard: 1_200_000_000n, // 1.2 gwei - 推荐标准（费用约 $0.01-0.02）
  fast: 1_500_000_000n,     // 1.5 gwei - 快速确认（费用约 $0.02-0.03）
  urgent: 2_000_000_000n    // 2 gwei - 网络拥堵时（费用约 $0.03-0.05）
} as const;

// 不同合约方法的预估 Gas 限制（根据实际 BSC 交易优化）
export const GAS_ESTIMATES = {
  createOrder: 100000n,  // 10万 Gas - createOrder 实际消耗约 6-8万
  approve: 50000n,       // 5万 Gas - approve 实际消耗约 3-4万  
  transfer: 100000n,      // 3万 Gas - transfer 实际消耗约 2-3万
  withdraw: 100000n,      // 8万 Gas - withdraw 实际消耗约 5-7万
  stake: 60000n          // 6万 Gas - stake 实际消耗约 4-6万
} as const;

/**
 * 获取推荐的 Gas 设置
 */
export function getRecommendedGasConfig(
  method: keyof typeof GAS_ESTIMATES,
  priority: keyof typeof BSC_GAS_LEVELS = 'standard'
) {
  return {
    gas: GAS_ESTIMATES[method],
    gasPrice: BSC_GAS_LEVELS[priority]
  };
}

/**
 * 计算预估费用（BNB）
 */
export function estimateFeeBNB(gas: bigint, gasPrice: bigint): string {
  const feeWei = gas * gasPrice;
  const feeBNB = Number(feeWei) / 1e18;
  return feeBNB.toFixed(6);
}

/**
 * 计算预估费用（USD）
 */
export function estimateFeeUSD(gas: bigint, gasPrice: bigint, bnbPrice: number): string {
  const feeBNB = parseFloat(estimateFeeBNB(gas, gasPrice));
  const feeUSD = feeBNB * bnbPrice;
  return feeUSD.toFixed(2);
}

/**
 * 获取所有优先级的费用预览
 */
export function getGasFeePreview(method: keyof typeof GAS_ESTIMATES, bnbPrice: number = 600) {
  const gas = GAS_ESTIMATES[method];
  
  return {
    slow: {
      gasPrice: BSC_GAS_LEVELS.slow,
      bnb: estimateFeeBNB(gas, BSC_GAS_LEVELS.slow),
      usd: estimateFeeUSD(gas, BSC_GAS_LEVELS.slow, bnbPrice),
      description: "经济实惠，3-5分钟确认"
    },
    standard: {
      gasPrice: BSC_GAS_LEVELS.standard,
      bnb: estimateFeeBNB(gas, BSC_GAS_LEVELS.standard),
      usd: estimateFeeUSD(gas, BSC_GAS_LEVELS.standard, bnbPrice),
      description: "推荐选择，1-2分钟确认"
    },
    fast: {
      gasPrice: BSC_GAS_LEVELS.fast,
      bnb: estimateFeeBNB(gas, BSC_GAS_LEVELS.fast),
      usd: estimateFeeUSD(gas, BSC_GAS_LEVELS.fast, bnbPrice),
      description: "快速确认，30-60秒"
    },
    urgent: {
      gasPrice: BSC_GAS_LEVELS.urgent,
      bnb: estimateFeeBNB(gas, BSC_GAS_LEVELS.urgent),
      usd: estimateFeeUSD(gas, BSC_GAS_LEVELS.urgent, bnbPrice),
      description: "紧急处理，网络拥堵时使用"
    }
  };
}

/**
 * 根据当前网络状况智能推荐 Gas 价格
 */
export function getSmartGasRecommendation(): keyof typeof BSC_GAS_LEVELS {
  // 简单的时间段逻辑（实际应用中可以接入 Gas 价格 API）
  const hour = new Date().getHours();
  
  // BSC 网络相对稳定，大多数时候使用 standard 即可
  if (hour >= 8 && hour <= 10) return 'fast';     // 早高峰
  if (hour >= 18 && hour <= 20) return 'fast';    // 晚高峰
  return 'standard';                               // 其他时间
}

/**
 * 显示实际 BSC 费用示例
 */
export function showBSCFeeExamples() {
  console.log("=== BSC 实际交易费用示例 ===");
  
  const examples = [
    { method: 'createOrder' as const, realGas: 70000n },
    { method: 'approve' as const, realGas: 35000n },
    { method: 'transfer' as const, realGas: 25000n }
  ];
  
  examples.forEach(({ method, realGas }) => {
    const config = getRecommendedGasConfig(method, 'standard');
    const realFee = estimateFeeBNB(realGas, config.gasPrice);
    const maxFee = estimateFeeBNB(config.gas, config.gasPrice);
    
    console.log(`${method}:`);
    console.log(`  实际消耗: ${realGas.toString()} Gas = $${(parseFloat(realFee) * 600).toFixed(3)}`);
    console.log(`  最大限制: ${config.gas.toString()} Gas = $${(parseFloat(maxFee) * 600).toFixed(3)}`);
    console.log('---');
  });
}
