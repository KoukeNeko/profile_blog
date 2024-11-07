import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  UserCircle,
  LogOut,
  Mail,
  IdCard,
  Calendar,
  Clock,
  Link as LinkIcon,
  AlertCircle
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import TitleBar from "@/components/custom/ui/TitleBar";
import { ProfileCard, ProfileItem } from "@/components/custom/card/ProfileCard";
import { ProfileHeader } from "@/components/custom/card/ProfileHeader";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<any>(null);
  
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    toast({
      title: "登出成功",
      description: "期待您的再次光臨！",
    });
    navigate('/login');
  };

  // 檢查是否已連結特定平台
  const isConnected = (provider: string) => {
    return userInfo?.connected_accounts?.[provider] !== undefined;
  };

  // 取得主要帳號的圖示和顏色
  const getPrimaryAccountInfo = () => {
    const provider = userInfo?.primary_account?.provider;
    switch (provider) {
      case 'google':
        return {
          icon: "/google.svg",
          name: "Google 帳號",
          color: "text-blue-500"
        };
      case 'line':
        return {
          icon: "/line.svg",
          name: "LINE 帳號",
          color: "text-green-500"
        };
      default:
        return {
          icon: "/user.svg",
          name: "未知帳號",
          color: "text-gray-500"
        };
    }
  };

  if (!userInfo) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-lg text-zinc-400">載入中...</p>
        </div>
      </div>
    );
  }

  const primaryAccountInfo = getPrimaryAccountInfo();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <TitleBar 
        title="使用者中心"
        subtitle="管理您的個人資料與連結帳號"
      />

      <ProfileHeader
        avatar={userInfo.picture}
        name={userInfo.name}
        role={primaryAccountInfo.name}
        location={userInfo.email} connections={""}      />

      {/* 基本資料 */}
      <ProfileCard icon={UserCircle} title="基本資料">
        <ProfileItem
          icon={Mail}
          title="電子郵件"
          subtitle={userInfo.email || '尚未設定'}
        />
        <ProfileItem
          icon={IdCard}
          title="帳號 ID"
          subtitle={userInfo.id}
        />
        <ProfileItem
          icon={Calendar}
          title="註冊時間"
          subtitle={new Date(userInfo.created_at).toLocaleString('zh-TW')}
        />
        <ProfileItem
          icon={Clock}
          title="上次登入"
          subtitle={new Date(userInfo.last_login).toLocaleString('zh-TW')}
        />
      </ProfileCard>

      {/* 連結帳號 */}
      <ProfileCard icon={LinkIcon} title="連結帳號">
        {/* Google 帳號 */}
        <ProfileItem
          icon={UserCircle} // Replace with a valid LucideIcon component
          title="Google 帳號"
          subtitle={isConnected('google') ? '已連結' : '未連結'}
          extra={
            isConnected('google') ? (
              <Button variant="outline" size="sm" className="bg-zinc-800 hover:bg-zinc-700" disabled>
                已連結
              </Button>
            ) : (
              <Button size="sm">連結帳號</Button>
            )
          }
        />

        {/* LINE 帳號 */}
        <ProfileItem
          icon={UserCircle} // Replace with a valid LucideIcon component
          title="LINE 帳號"
          subtitle={isConnected('line') ? '已連結' : '未連結'}
          extra={
            isConnected('line') ? (
              <Button variant="outline" size="sm" className="bg-zinc-800 hover:bg-zinc-700" disabled>
                已連結
              </Button>
            ) : (
              <Button size="sm">連結帳號</Button>
            )
          }
        />
      </ProfileCard>

      {/* 帳號安全 */}
      <ProfileCard icon={AlertCircle} title="帳號安全">
        <ProfileItem
          icon={LogOut}
          title="登出帳號"
          subtitle="登出後需要重新登入才能使用完整功能"
          extra={
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  登出
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                <AlertDialogHeader>
                  <AlertDialogTitle>確定要登出嗎？</AlertDialogTitle>
                  <AlertDialogDescription>
                    登出後需要重新登入才能使用完整功能。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-zinc-800 hover:bg-zinc-700">取消</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
                    確定登出
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          }
        />
      </ProfileCard>
    </div>
  );
}