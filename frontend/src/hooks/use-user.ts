import { useState, useEffect } from 'react';
import type { UserInfo, SocialAccount } from '@/types/user';

export function useUser() {
  const [user, setUser] = useState<UserInfo | null>(null);

  // 載入用戶資訊
  useEffect(() => {
    const userStr = localStorage.getItem('userInfo');
    if (userStr) {
      try {
        const userInfo = JSON.parse(userStr);
        setUser(userInfo);
      } catch (error) {
        console.error('Failed to parse user info:', error);
        setUser(null);
      }
    }
  }, []);

  // 連結新的社交帳號
  const linkAccount = (account: SocialAccount) => {
    if (!user) return false;

    const newUser = { ...user };
    newUser.connectedAccounts[account.provider] = account;

    // 更新 localStorage
    localStorage.setItem('userInfo', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  // 解除連結社交帳號
  const unlinkAccount = (provider: 'google' | 'line') => {
    if (!user) return false;
    
    // 不能解除連結主要帳號
    if (user.primaryAccount.provider === provider) {
      return false;
    }

    const newUser = { ...user };
    delete newUser.connectedAccounts[provider];

    // 更新 localStorage
    localStorage.setItem('userInfo', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  // 切換主要帳號
  const switchPrimaryAccount = (provider: 'google' | 'line') => {
    if (!user || !user.connectedAccounts[provider]) return false;

    const newUser = { ...user };
    const oldPrimary = newUser.primaryAccount;
    newUser.primaryAccount = newUser.connectedAccounts[provider]!;
    newUser.connectedAccounts[oldPrimary.provider] = oldPrimary;

    // 更新 localStorage
    localStorage.setItem('userInfo', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  return {
    user,
    isLoggedIn: !!user,
    hasGoogleAccount: !!user?.connectedAccounts.google,
    hasLineAccount: !!user?.connectedAccounts.line,
    isGooglePrimary: user?.primaryAccount.provider === 'google',
    isLinePrimary: user?.primaryAccount.provider === 'line',
    linkAccount,
    unlinkAccount,
    switchPrimaryAccount,
  };
}