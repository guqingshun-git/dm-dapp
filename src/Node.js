// /api/verify 接口实现
import { verifySiweMessage } from 'viem/siwe';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

export async function POST(req) {
  const { message, signature } = await req.json();
  
  // 1. 创建验证客户端（推荐使用ZAN等专业节点服务）
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http('https://api.zan.top/node/v1/eth/mainnet/YOUR_KEY') 
  });
  
  // 2. 解析消息中的地址
  const { address } = parseSiweMessage(message);
  
  // 3. 验证签名有效性
  const isValid = await publicClient.verifySiweMessage({
    message,
    signature,
    address
  });

  // 4. 返回验证结果
  return isValid 
    ? new Response(JSON.stringify({ success: true }), { status: 200 })
    : new Response(JSON.stringify({ error: "无效签名" }), { status: 401 });
}