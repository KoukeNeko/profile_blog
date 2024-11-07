import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TitleBar from "@/components/custom/ui/TitleBar"
import TypewriterText from "@/components/custom/effect/typewriter_gpt_style"

export default function TermsPage() {
  // 計算每個段落的延遲時間
  const getDelay = (sectionIndex: number, paragraphIndex: number = 0) => {
    // 每個段落的基礎延遲為300ms * section索引
    const baseDelay = sectionIndex * 300;
    // 同一段落內的不同項目額外延遲100ms
    return baseDelay + (paragraphIndex * 100);
  };

  return (
    <main className="flex justify-center w-full py-8 px-4">
      <div className="container max-w-4xl">
        <TitleBar 
          title="服務條款"
          subtitle="最後更新日期：2024 年 3 月 1 日"
        />
        
        <div className="space-y-4 mt-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="1. 接受條款" delay={getDelay(0)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText 
                  text="歡迎使用我們的服務。請仔細閱讀以下條款和條件。透過訪問或使用我們的服務，您同意受這些條款的約束。如果您不同意這些條款的任何部分，請不要使用我們的服務。"
                  delay={getDelay(0, 1)}
                />
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="2. 服務說明" delay={getDelay(1)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText text="我們提供的服務包括但不限於：" delay={getDelay(1, 1)} />
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <TypewriterText text="個人部落格文章的發布和閱讀" delay={getDelay(1, 2)} />
                </li>
                <li>
                  <TypewriterText text="專案展示和介紹" delay={getDelay(1, 3)} />
                </li>
                <li>
                  <TypewriterText text="使用者留言和互動功能" delay={getDelay(1, 4)} />
                </li>
              </ul>
              <p>
                <TypewriterText 
                  text="我們保留隨時修改、暫停或終止任何服務的權利，恕不另行通知。"
                  delay={getDelay(1, 5)}
                />
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="3. 使用者責任" delay={getDelay(2)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText text="使用我們的服務時，您同意：" delay={getDelay(2, 1)} />
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <TypewriterText text="提供準確和完整的個人資訊" delay={getDelay(2, 2)} />
                </li>
                <li>
                  <TypewriterText text="保護您的帳戶安全" delay={getDelay(2, 3)} />
                </li>
                <li>
                  <TypewriterText text="不進行任何非法或未經授權的活動" delay={getDelay(2, 4)} />
                </li>
                <li>
                  <TypewriterText text="遵守所有適用的法律和法規" delay={getDelay(2, 5)} />
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="4. 智慧財產權" delay={getDelay(3)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText 
                  text="網站上的所有內容，包括但不限於文字、圖片、程式碼、設計等，均受智慧財產權法保護。未經明確許可，不得複製、修改、分發或使用這些內容。"
                  delay={getDelay(3, 1)}
                />
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="5. 免責宣告" delay={getDelay(4)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText 
                  text="我們的服務按「現狀」提供，不提供任何明示或暗示的保證。我們不對服務的中斷、錯誤、病毒或其他有害元件負責。"
                  delay={getDelay(4, 1)}
                />
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-200">
                <TypewriterText text="6. 條款修改" delay={getDelay(5)} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-400">
              <p>
                <TypewriterText 
                  text="我們保留隨時修改這些條款的權利。修改後的條款將在網站上發布時立即生效。繼續使用我們的服務即表示您接受修改後的條款。"
                  delay={getDelay(5, 1)}
                />
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}