import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";

export default function LineCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const processLineCallback = async () => {
      try {
        // 1. 驗證 state
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const savedState = sessionStorage.getItem('lineLoginState');
        
        if (!code) {
          throw new Error('未收到授權碼');
        }

        if (state !== savedState) {
          throw new Error('state 驗證失敗');
        }

        console.log('Starting LINE login process...');

        // 2. 取得 access token
        const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: `${window.location.origin}/login/line/callback`,
            client_id: import.meta.env.VITE_LINE_CLIENT_ID,
            client_secret: import.meta.env.VITE_LINE_CLIENT_SECRET,
          }),
        });

        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.json();
          console.error('Token Error:', errorData);
          throw new Error(errorData.error_description || '取得 access token 失敗');
        }

        const tokenData = await tokenResponse.json();
        console.log('Token data received:', tokenData);
        
        // 3. 使用 jwtDecode 來解析 ID Token
        let decodedIdToken;
        try {
          decodedIdToken = jwtDecode(tokenData.id_token);
          console.log('Decoded ID token:', decodedIdToken);
        } catch (error) {
          console.error('ID Token decode error:', error);
          throw new Error('無法解析 ID Token');
        }

        // 4. 獲取個人資料
        const profileResponse = await fetch('https://api.line.me/v2/profile', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
          },
        });

        if (!profileResponse.ok) {
          throw new Error('無法獲取個人資料');
        }

        const profileData = await profileResponse.json();
        console.log('Profile data received:', profileData);

        // 5. 發送到後端
        const backendData = {
          userId: profileData.userId,
          displayName: profileData.displayName,
          pictureUrl: profileData.pictureUrl || '',
          email: profileData.email || '',
          statusMessage: profileData.statusMessage || '',
          access_token: tokenData.access_token
        };

        console.log('Sending to backend:', backendData);

        const backendResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/social/line`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(backendData)
        });

        if (!backendResponse.ok) {
          const errorData = await backendResponse.json();
          console.error('Backend Error:', errorData);
          throw new Error(errorData.detail || '後端驗證失敗');
        }

        const authData = await backendResponse.json();
        console.log('Backend response:', authData);
        
        if (authData.user) {
          localStorage.setItem('userInfo', JSON.stringify(authData.user));
          
          toast({
            title: authData.is_new ? "註冊成功" : "登入成功",
            description: `歡迎${authData.is_new ? '' : '回來'}，${authData.user.primary_account.name}！`,
          });
          
          navigate('/');
        } else {
          throw new Error('無效的後端回應');
        }

      } catch (error) {
        console.error('LINE Login Error:', error);
        toast({
          variant: "destructive",
          title: "登入失敗",
          description: error instanceof Error ? error.message : "LINE 登入過程發生錯誤，請稍後再試。",
        });
        navigate('/login');
      } finally {
        sessionStorage.removeItem('lineLoginState');
      }
    };

    processLineCallback();
  }, [searchParams, navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg text-zinc-400">正在處理登入請求...</p>
      </div>
    </div>
  );
}