import '../globals.css'
import Link from "next/link"
import { getPages } from '@/sanity/sanity-utils';

export const metadata = {
  title: 'Blog',
  description: 'Blog for school work purposes',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pages = await getPages();

  return (
    <html lang="en">
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="max-w-3xl mx-auto px-4 md:px-0 py-10">
          <Link href="/" className="text-lg font-bold">Blogs</Link>
        <main className="py-20">{children}</main>
      </body>
    </html>
  )
}
