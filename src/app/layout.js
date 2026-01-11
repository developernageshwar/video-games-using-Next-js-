import "../index.css";

export const metadata = {
    title: 'Video-game-task-Next.JS',
    description: 'Video-game-task-Next.JS',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
