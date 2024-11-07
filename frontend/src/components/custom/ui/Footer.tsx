function Footer() {
    return (
        <footer className="w-full h-16 text-xs sm:text-sm text-zinc-600 border-t border-zinc-800/50 bg-zinc-900">
            {/* 使用 flex 和 h-full 來實現完整高度的垂直置中 */}
            <div className="h-full flex items-center justify-center">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-2">
                        <span>© {new Date().getFullYear()}</span>
                        <span className="hidden sm:inline">|</span>
                        <span>Copyright © 2024{new Date().getFullYear() > 2024 ? `-${new Date().getFullYear()}` : ''}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <span className="hidden sm:inline">|</span>
                        <span>Inspired by Hello Friend NG</span>
                        <span className="hidden sm:inline">|</span>
                    </div>

                    <div className="flex items-center">
                        <span className="whitespace-nowrap">
                            Made with <span className="text-red-500 mx-1">♥</span> by doeshing
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer