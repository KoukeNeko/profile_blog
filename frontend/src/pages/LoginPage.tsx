import { GoogleLogin } from '@react-oauth/google';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/sonner"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log('Google response:', credentialResponse);
      
      const response = await fetch('http://localhost:8000/api/auth/social/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
          clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Backend authentication failed');
      }
  
      const authData = await response.json();
      console.log('Auth response:', authData);
      
      if (authData.user) {
        localStorage.setItem('userInfo', JSON.stringify(authData.user));
        sessionStorage.setItem('justLoggedIn', 'true');
        
        toast({
          title: authData.is_new ? "註冊成功" : "登入成功",
          description: `歡迎${authData.is_new ? '' : '回來'}，${authData.user.primary_account.name}！`,
        });
        
        navigate('/');
      } else {
        throw new Error('Invalid response from backend');
      }
      
    } catch (error) {
      console.error('Error processing login:', error);
      toast({
        variant: "destructive",
        title: "登入失敗",
        description: error instanceof Error ? error.message : "處理登入資訊時發生錯誤，請稍後再試。",
      });
    }
  };

  const handleGoogleError = () => {
    console.error('Login Failed');
    toast({
      variant: "destructive",
      title: "登入失敗",
      description: "Google 登入過程發生錯誤，請確認您的網路連線並重新嘗試。",
    });
  };

  const handleLineLogin = () => {
    const LINE_CLIENT_ID = import.meta.env.VITE_LINE_CLIENT_ID;
    const LINE_REDIRECT_URI = `${window.location.origin}/login/line/callback`;
    const LINE_STATE = uuidv4();
    
    // 保存 state 到 sessionStorage
    sessionStorage.setItem('lineLoginState', LINE_STATE);
    
    // 確保所有參數都正確編碼
    const params = {
      response_type: 'code',
      client_id: LINE_CLIENT_ID,
      redirect_uri: LINE_REDIRECT_URI,
      state: LINE_STATE,
      scope: 'profile openid email',
      // 添加 nonce 參數來增加安全性
      nonce: uuidv4()
    };
  
    // 使用 URLSearchParams 來正確編碼參數
    const queryString = new URLSearchParams(params).toString();
    const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?${queryString}`;
    
    // 使用 window.location.href 進行跳轉
    window.location.href = lineLoginUrl;
  };

  return (
    <Card className="w-full max-w-xl p-8 bg-zinc-900 border-zinc-800">
      <CardHeader className="text-center space-y-3 pb-8">
        <CardTitle className="text-3xl font-bold text-zinc-200">歡迎回來</CardTitle>
        <CardDescription className="text-lg">
          使用以下方式快速登入
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-8">
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              type="standard"
              text="signin_with"
              shape="rectangular"
              locale="zh_TW"
              width={200}
              useOneTap={false}
            />
          </div>

          <div className="flex justify-center w-12 items-center gap-4">
            <Separator className="flex-grow bg-zinc-800" />
            <span className="text-sm text-zinc-500">或</span>
            <Separator className="flex-grow bg-zinc-800" />
          </div>

          <Button
            onClick={handleLineLogin}
            className="w-[200px] bg-[#06C755] hover:bg-[#06C755]/90 text-white flex items-center gap-2"
          >
            <img
              src="/line_88.png"
              alt="LINE"
              className="w-5 h-5"
            />
            與LINE連動
          </Button>
        </div>

        <div className="text-center text-zinc-500">
          <p className="text-sm mb-2">登入即表示您同意我們的</p>
          <div className="space-x-1">
            <Button
              onClick={() => navigate("/terms")}
              variant="link"
              className="p-0 text-sm text-zinc-500 hover:text-zinc-400"
            >
              服務條款
            </Button>
            <span>和</span>
            <Button
              onClick={() => navigate("/privacy")}
              variant="link"
              className="p-0 text-sm text-zinc-500 hover:text-zinc-400"
            >
              隱私權政策
            </Button>
          </div>
        </div>
      </CardContent>
      <Toaster />
    </Card>
  );
}