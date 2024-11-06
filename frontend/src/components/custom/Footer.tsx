function Footer() {
    return (
        <footer className="p-4 text-center text-xs sm:text-sm text-zinc-600">
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
        </footer>
    )
}

export default Footer