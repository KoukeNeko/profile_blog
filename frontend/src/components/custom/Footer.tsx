import React from 'react'

function Footer() {

    return (
        <footer className="p-4 text-center text-sm text-zinc-600">
            <div className="flex justify-center items-center space-x-2">
                <span>© {new Date().getFullYear()}</span>
                <span>|</span>
                <span>Copyright © 2024{new Date().getFullYear() > 2024 ? `-${new Date().getFullYear()}` : ''}</span>
                <span>|</span>
                <span>Inspired by Hello Friend NG </span>
                <span>|</span>
                <span className="flex items-center">
                    Made with <span className="text-red-500 mx-1">♥</span> by doeshing
                </span>
            </div>
        </footer>
    )
}

export default Footer