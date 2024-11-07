export interface SocialAccount {
    id: string;
    provider: 'google' | 'line';
    email?: string;
    name: string;
    picture?: string;
    accessToken?: string;
    // LINE 特有欄位
    statusMessage?: string;
    // Google 特有欄位
    googleId?: string;
  }
  
  export interface UserInfo {
    primaryAccount: SocialAccount;  // 主要帳號資訊，註冊時使用的服務(LINE或Google)
    connectedAccounts: {           // 已連結的社交帳號
      google?: SocialAccount;
      line?: SocialAccount;
    };
    // 其他用戶相關資訊
    lastLogin: string;             // 最後登入時間
    createdAt: string;            // 帳號建立時間
  }