import { client } from '@/libs/client'
import Layout from '@/components/Layout'
import Card from '@/components/Card'

import type { GetStaticProps, NextPage, InferGetStaticPropsType } from 'next'
import type { Blogs } from '@/types/blog'
import Link from 'next/link'

interface Props {
  blogs: Blogs['contents']
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
}) => {
  return (
    <Layout title="Home">
      {blogs.length ? (
        <ul className="grid grid-cols-1 gap-5 justify-items-stretch sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <li key={index}>
              <Card blog={blog} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Post not found</p>
      )}
      <div className="mt-10 text-right">
        <Link href="/blog/page/1">
          <a className="inline-block py-2 px-3 text-white bg-blue-700 hover:bg-blue-800 rounded">
            Read more
            <svg
              className="inline-block ml-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get<Blogs>({
    endpoint: 'blogs',
    queries: { limit: 6 },
  })

  return {
    props: {
      blogs: data.contents,
    },
  }
}

export default Home
