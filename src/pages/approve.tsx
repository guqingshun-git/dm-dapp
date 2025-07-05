import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { DM_CONTRACT } from '@/contracts/dmContract';
import { USDT_CONTRACT } from '@/contracts/usdtContract'; // 确保同时导入ABI

const FUND_WALLET = "0xb49402db40F6902530504FD386B2ac2a48aA53f3";

export default function ApprovePage() {
    // const { address: connectedAddress } = useAccount();
    // const isFundWallet = connectedAddress?.toLowerCase() === FUND_WALLET.toLowerCase();
    const MAX_UINT256 = 115792089237316195423570985008687907853269984665640564039457584007913129639935n;
  
    // 1️⃣ 无限授权操作
    const { 
        data: txHash, 
        writeContract, 
        isPending, 
        error: writeError 
    } = useWriteContract();

    // 2️⃣ 交易确认监控
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ 
        hash: txHash 
    });

    // ✅ 执行单次无限授权
    const approveUnlimited = () => {
        writeContract({
            address: USDT_CONTRACT.address,
            abi: USDT_CONTRACT.abi,
            functionName: 'approve',
            args: [
                DM_CONTRACT.address, 
               MAX_UINT256// uint256最大值
            ]
        });
    };
    const approveDM = () => {
        writeContract({
            address: DM_CONTRACT.address,
            abi: DM_CONTRACT.abi,
            functionName: 'approve',
            args: [
                DM_CONTRACT.address, 
               MAX_UINT256// uint256最大值
            ]
        });
    };

    // if (!isFundWallet) {
    //     return (
    //         <DefaultLayout>
    //             <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
    //                 <div className="p-4 border border-red-300 bg-red-50 rounded max-w-md">
    //                     🔑 请连接资金钱包地址 <strong>{FUND_WALLET}</strong>
    //                 </div>
    //             </section>
    //         </DefaultLayout>
    //     );
    // }

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>USDT 授权管理</h1>
                </div>
                
                <div className="p-6 bg-white shadow rounded-lg max-w-md w-full">
                    <h3 className="text-lg font-bold mb-4">无限授权操作</h3>
                    
                    {/* 操作按钮 */}
                    <button 
                        onClick={approveUnlimited}
                        disabled={isPending || isConfirming}
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg disabled:opacity-50 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md"
                    >
                        {isPending ? "交易发送中..." : "🔥 一键无限授权USDT"}
                    </button>
                    <button 
                        onClick={approveDM}
                        disabled={isPending || isConfirming}
                        className="w-full py-3 px-6 pt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg disabled:opacity-50 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md"
                    >
                        {isPending ? "交易发送中..." : "🔥 一键无限授权DM"}
                    </button>
                    {/* 状态反馈 */}
                    <div className="mt-6 space-y-3 text-sm">
                        {txHash && (
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="font-medium">📜 交易哈希:</p>
                                <a 
                                    href={`https://bscscan.com/tx/${txHash}`} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline break-all inline-block mt-1"
                                >
                                    {txHash.slice(0, 10)}...{txHash.slice(-8)}
                                </a>
                            </div>
                        )}
                        
                        {isConfirming && (
                            <div className="flex items-center text-yellow-600">
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                ⏳ 等待链上确认...
                            </div>
                        )}
                        
                        {isConfirmed && (
                            <div className="flex items-center text-green-600">
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                ✅ 授权成功！合约可无限操作USDT
                            </div>
                        )}
                        
                        {writeError && (
                            <div className="bg-red-50 p-3 rounded mt-3">
                                <p className="font-medium text-red-600">❌ 交易失败:</p>
                                <p className="text-red-500 mt-1">
                                    {writeError.message?.split('Details: ')[1] || writeError.message}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    {/* 授权状态概览 */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <h4 className="font-medium mb-2">当前配置</h4>
                        <ul className="text-sm space-y-1">
                            <li className="flex">
                                <span className="w-24 text-gray-500">资金钱包:</span>
                                <span className="font-mono">{FUND_WALLET.slice(0, 6)}...{FUND_WALLET.slice(-4)}</span>
                            </li>
                            <li className="flex">
                                <span className="w-24 text-gray-500">USDT合约:</span>
                                <span className="font-mono">{USDT_CONTRACT.address.slice(0, 6)}...{USDT_CONTRACT.address.slice(-4)}</span>
                            </li>
                            <li className="flex">
                                <span className="w-24 text-gray-500">DM合约:</span>
                                <span className="font-mono">{DM_CONTRACT.address.slice(0, 6)}...{DM_CONTRACT.address.slice(-4)}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
}