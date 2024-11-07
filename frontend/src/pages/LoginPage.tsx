import { GoogleLogin } from '@react-oauth/google';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import * as jwtDecode from 'jwt-decode';
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"


export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode.jwtDecode(credentialResponse.credential);
      console.log('Decoded credential:', decoded);
      
      const userInfo = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      };
      
      console.log('User Info:', userInfo);
      
      // 添加一個登入狀態標記
      sessionStorage.setItem('justLoggedIn', 'true');
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      await Promise.resolve();
      navigate('/');
      
    } catch (error) {
      console.error('Error processing login:', error);
      toast({
        variant: "destructive",
        title: "登入失敗",
        description: "處理登入資訊時發生錯誤，請稍後再試。",
      });
    }
  };

  const handleGoogleError = () => {
    console.error('Login Failed');
    // 顯示登入錯誤訊息
    toast({
      variant: "destructive",
      title: "登入失敗",
      description: "Google 登入過程發生錯誤，請確認您的網路連線並重新嘗試。",
    });
  };

  return (
    <Card className="w-full max-w-xl p-8">
      <CardHeader className="text-center space-y-3 pb-8">
        <CardTitle className="text-3xl font-bold">歡迎回來</CardTitle>
        <CardDescription className="text-lg">
          使用 Google 帳號快速登入
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-8">
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_black"
            size="large"
            type="standard"
            text="signin_with"
            shape="rectangular"
            locale="zh_TW"
            useOneTap={false}
          />
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