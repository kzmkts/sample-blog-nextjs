import { client } from '@/libs/client'
import Layout from '@/components/Layout'
import Card from '@/components/Card'
import Pagination, { range, BLOGS_PER_PAGE } from '@/components/Pagination'

import type {
  GetStaticProps,
  NextPage,
  InferGetStaticPropsType,
  GetStaticPaths,
} from 'next'
import type { Blogs, Categories } from '@/types/blog'
import { ParsedUrlQuery } from 'node:querystring'

interface Props {
  blogs: Blogs['contents']
  totalCount: Blogs['totalCount']
  categories?: Categories['contents']
}
interface Params extends ParsedUrlQuery {
  pageId: string
}

const PageId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
  totalCount,
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
        <Pagination totalCount={totalCount} />
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get<Blogs>({ endpoint: 'blogs' })
  const totalCount = data.totalCount
  const paths = range(1, Math.ceil(totalCount / BLOGS_PER_PAGE)).map(
    (pageId) => `/blog/page/${pageId}`
  )

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const id = context.params?.pageId
  const data = await client.get<Blogs>({
    endpoint: 'blogs',
    queries: {
      offset: (Number(id) - 1) * BLOGS_PER_PAGE,
      limit: BLOGS_PER_PAGE,
    },
  })

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
  }
}

export default PageId
