import Image from 'next/image'
import { client } from '@/libs/client'
import moment from 'moment'
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
  blog: Blog
}
interface Params extends ParsedUrlQuery {
  blogId: Blog['id']
}

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
}) => {
  return (
    <Layout title="Blog">
      <div className="aspect-video relative mx-auto w-full h-[500px] md:w-4/5">
        <Image
          src={blog.eyecatch.url}
          width={blog.eyecatch.width}
          height={blog.eyecatch.height}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-5 pt-10 space-y-12">
        <h2 className="text-2xl font-bold">{blog.title}</h2>
        <div className="space-x-3 text-right">
          <span>更新日:{moment(blog.updatedAt).format('YYYY-MM-DD')}</span>
          <span>投稿日:{moment(blog.publishedAt).format('YYYY-MM-DD')}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.content}`,
          }}
        />
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get<Blogs>({ endpoint: 'blogs' })
  const paths = data.contents.map((content) => `/blog/${content.id}`)

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const id = context.params?.blogId
  const data = await client.get({ endpoint: 'blogs', contentId: id })

  return {
    props: {
      blog: data,
    },
  }
}

export default BlogId
