import { client } from '@/libs/client'
import Card from '@/components/Card'
import Layout from '@/components/Layout'

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import type { ParsedUrlQuery } from 'node:querystring'
import type { Blog, Blogs } from '@/types/blog'

interface Props {
  blogs: Blogs['contents']
}
interface Params extends ParsedUrlQuery {
  id: Blog['id']
}

const CategoryId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
}) => {
  return (
    <Layout title={`hoge`}>
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

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get<Blogs>({ endpoint: 'categories' })
  const paths = data.contents.map((content) => `/category/${content.id}`)

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const id = context.params?.categoryId
  const data = await client.get<Blogs>({
    endpoint: 'blogs',
    queries: { filters: `category[equals]${id}` },
  })

  return {
    props: {
      blogs: data.contents,
    },
  }
}

export default CategoryId
