// src/hooks/useUserInfo.ts
import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '@/api/api'; // 统一API入口

export const useUserInfo = (address: string | undefined) => {
  return useQuery({
    queryKey: ['userInfo', address],
    queryFn: () => address ? fetchUserInfo(address) : null,
    enabled: !!address, // 地址存在时才触发
    staleTime: 5 * 60 * 1000 // 5分钟缓存
  });
};