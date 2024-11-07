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
  AlertCircle,
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
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import TitleBar from "@/components/custom/ui/TitleBar";
import { ProfileCard, ProfileItem } from "@/components/custom/card/ProfileCard";

interface UserInfo {
  id: string;
  name: string;
  picture?: string;
  email: string;
  primary_account: "Google" | "LINE";
  connected_accounts: {
    google?: {
      id: string;
      name: string;
      picture?: string;
      email: string;
      access_token: string;
    };
    line?: {
      id: string;
      name: string;
      picture?: string;
      status_message?: string;
      access_token: string;
    };
  };
  last_login: string;
  created_at: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    toast({
      title: "登出成功",
      description: "期待您的再次光臨！",
    });
    navigate("/login");
  };

  const isConnected = (provider: "google" | "line") => {
    return userInfo?.connected_accounts?.[provider] !== undefined;
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

  const SocialAccountButton = ({
    provider,
  }: {
    provider: "google" | "line";
  }) => {
    const connected = isConnected(provider);
    const displayName = provider === "google" ? "Google 帳號" : "LINE 帳號";
    // 修正圖示路徑，從 public 目錄引用
    const accountIcon =
      provider === "google"
        ? "https://ph.cleanpng.com/downloadpng/ca505a01b2198afd5f969ae8f05d4703/L4Dxd6FrigIwbqJzR9RtZDBnSYPphfEyQGNre6hrZUe5Qra9Wcc6amhnfNQ6NES3QHB3jvc=.png"
        : "https://line.me/static/b83de682148ca1092750bd59456ca0d9/c0a13/329473e988bb3cab682a5b5bd46b47dc.png";

    return (
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center">
            <img
              src={accountIcon}
              alt={displayName}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-medium text-zinc-400">{displayName}</div>
            <div className="text-sm text-zinc-500">
              {connected ? "已連結" : "未連結"}
            </div>
          </div>
        </div>
        {connected ? (
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-zinc-700"
            disabled
          >
            已連結
          </Button>
        ) : (
          <Button size="sm" className="bg-zinc-700 hover:bg-zinc-600">
            連結帳號
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <TitleBar title="使用者中心" subtitle="管理您的個人資料與連結帳號" />
      <div className="h-6"></div>
      {/* 基本資料 */}
      <ProfileCard icon={UserCircle} title="基本資料">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center gap-6">
            <img
              src={userInfo.picture}
              alt={userInfo.name}
              className="w-32 h-32 rounded-full"
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-zinc-200">
                {userInfo.name}
              </h1>
              <p className="text-zinc-400">
                {userInfo.primary_account === "Google"
                  ? "Google 帳號"
                  : "LINE 帳號"}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <ProfileItem
              icon={Mail}
              title="電子郵件"
              subtitle={userInfo.email || "尚未設定"}
            />
            <ProfileItem icon={IdCard} title="帳號 ID" subtitle={userInfo.id} />
            <ProfileItem
              icon={Calendar}
              title="註冊時間"
              subtitle={new Date(userInfo.created_at).toLocaleString("zh-TW")}
            />
            <ProfileItem
              icon={Clock}
              title="上次登入"
              subtitle={new Date(userInfo.last_login).toLocaleString("zh-TW")}
            />
          </div>
        </div>
      </ProfileCard>

      {/* 連結帳號 */}
      <ProfileCard icon={LinkIcon} title="連結帳號">
        <div className="space-y-4">
          <SocialAccountButton provider="google" />
          <SocialAccountButton provider="line" />
        </div>
      </ProfileCard>

      {/* 帳號安全 */}
      <ProfileCard icon={AlertCircle} title="帳號安全">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-zinc-400" />
            <div>
              <div className="font-medium text-zinc-400">登出帳號</div>
              <div className="text-sm text-zinc-500">
                登出後需要重新登入才能使用完整功能
              </div>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                登出
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-900 border-zinc-800">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-zinc-400">
                  確定要登出嗎？
                </AlertDialogTitle>
                <AlertDialogDescription>
                  登出後需要重新登入才能使用完整功能。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400">
                  取消
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600"
                >
                  確定登出
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ProfileCard>
    </div>
  );
}
