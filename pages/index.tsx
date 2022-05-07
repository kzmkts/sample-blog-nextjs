import { client } from '@/libs/client'
import Layout from '@/components/Layout'
import Card from '@/components/Card'

import type { GetStaticProps, NextPage, InferGetStaticPropsType } from 'next'
import type { Blogs, Categories } from '@/types/blog'

interface Props {
  blogs: Blogs['contents']
  categories?: Categories['contents']
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
        <p className="text-center">投稿が見つかりません</p>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get<Blogs>({ endpoint: 'blogs' })

  return {
    props: {
      blogs: data.contents,
    },
  }
}

export default Home
