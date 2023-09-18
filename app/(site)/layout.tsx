import '../globals.css'
import Link from "next/link"

export const metadata = {
  title: 'Blog',
  description: 'Blog for school work purposes',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="max-w-3xl mx-auto px-4 md:px-0 py-10">
        <div className='flex justify-between'>
          <Link href="/" className="text-lg text-black font-bold">Blogs</Link>
          <Link href="/editor" className="text-lg text-black font-bold px-3 py-1 rounded-full shadow-sm shadow-gray-500">+ New Blog</Link>
          </div>
        <main className="py-20">{children}</main>
      </body>
    </html>
  )
}
