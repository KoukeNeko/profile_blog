import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TitleBar from "@/components/custom/ui/TitleBar"
import TypewriterText from "@/components/custom/effect/typewriter_gpt_style"

export default function PrivacyPage() {
  // 計算每個段落的延遲時間
  const getDelay = (sectionIndex: number, paragraphIndex: number = 0) => {
    const baseDelay = sectionIndex * 300;
    return baseDelay + (paragraphIndex * 100);
  };

  return (
    <main className="flex justify-center w-full py-8 px-4">
      <div className="container max-w-4xl">
        <TitleBar 
          title="隱私權政策"
          subtitle="最後更新日期：2024 年 3 月 1 日"
        />
        
        <div className="space-y-4 mt-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="1. 資料收集" delay={getDelay(0)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText text="我們收集的個人資料型別包括：" delay={getDelay(0, 1)} />
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <TypewriterText text="基本資料（如：姓名、電子郵件地址）" delay={getDelay(0, 2)} />
                </li>
                <li>
                  <TypewriterText text="Google 帳戶相關資訊" delay={getDelay(0, 3)} />
                </li>
                <li>
                  <TypewriterText text="使用我們服務時的活動記錄" delay={getDelay(0, 4)} />
                </li>
                <li>
                  <TypewriterText text="系統自動收集的技術資料（如：IP 位址、瀏覽器型別）" delay={getDelay(0, 5)} />
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="2. 資料使用" delay={getDelay(1)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText text="我們使用收集的資料來：" delay={getDelay(1, 1)} />
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <TypewriterText text="提供和維護我們的服務" delay={getDelay(1, 2)} />
                </li>
                <li>
                  <TypewriterText text="改善使用者體驗" delay={getDelay(1, 3)} />
                </li>
                <li>
                  <TypewriterText text="傳送服務相關通知" delay={getDelay(1, 4)} />
                </li>
                <li>
                  <TypewriterText text="防止濫用和欺詐行為" delay={getDelay(1, 5)} />
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="3. 資料保護" delay={getDelay(2)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText 
                  text="我們採取適當的技術和組織措施來保護您的個人資料，防止未經授權的訪問、使用或洩露。這些措施包括加密、安全儲存和訪問控制。"
                  delay={getDelay(2, 1)}
                />
              </p>
              <p>
                <TypewriterText 
                  text="然而，請注意網際網路傳輸無法保證 100% 的安全性。我們會盡最大努力保護您的資料，但無法保證絕對的安全。"
                  delay={getDelay(2, 2)}
                />
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="4. 第三方服務" delay={getDelay(3)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText 
                  text="我們的服務使用 Google 登入功能。當您使用 Google 帳戶登入時，我們會根據您的授權獲取某些資訊。請檢視 Google 的隱私權政策以瞭解他們如何處理您的資料。"
                  delay={getDelay(3, 1)}
                />
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="5. Cookie 使用" delay={getDelay(4)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText 
                  text="我們使用 Cookie 和類似技術來改善使用者體驗、分析使用情況並提供個性化服務。您可以透過瀏覽器設定控制 Cookie，但這可能影響某些功能的使用。"
                  delay={getDelay(4, 1)}
                />
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="6. 使用者權利" delay={getDelay(5)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText text="您對您的個人資料擁有以下權利：" delay={getDelay(5, 1)} />
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <TypewriterText text="訪問和檢視您的個人資料" delay={getDelay(5, 2)} />
                </li>
                <li>
                  <TypewriterText text="更正不準確的資料" delay={getDelay(5, 3)} />
                </li>
                <li>
                  <TypewriterText text="要求刪除您的資料" delay={getDelay(5, 4)} />
                </li>
                <li>
                  <TypewriterText text="限制或反對資料處理" delay={getDelay(5, 5)} />
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="7. 政策更新" delay={getDelay(6)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText 
                  text="我們可能會不時更新此隱私權政策。重大變更時，我們會透過網站通知或電子郵件通知您。繼續使用我們的服務即表示您同意更新後的政策。"
                  delay={getDelay(6, 1)}
                />
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}