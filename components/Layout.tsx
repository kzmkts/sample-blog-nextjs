import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
  title: string
}

const Layout = ({ children, title = 'Sample-Title' }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-center items-center h-24 border-b">
        <Link href="/">
          <a>HOME</a>
        </Link>
      </header>

      <main className="flex flex-col flex-1 justify-center items-center">
        <div className="container p-5">{children}</div>
      </main>

      <footer className="flex justify-center items-center h-24 border-t">
        <a
          className="flex justify-center items-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={72}
            height={16}
            className="ml-2 h-4"
          />
        </a>
      </footer>
    </div>
  )
}

export default Layout
