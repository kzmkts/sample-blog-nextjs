import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

import type { Blog } from '@/types/blog'

interface Props {
  blog: Blog
}
const Card = ({ blog }: Props) => {
  return (
    <>
      <div className="text-white rounded-lg shadow-md">
        <div className="relative h-[210px]">
          <Image
            className=" rounded-t-lg"
            src={blog.eyecatch.url}
            width={blog.eyecatch.width}
            height={blog.eyecatch.height}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col justify-between p-5  h-[240px] bg-gray-800 rounded-b-lg">
          <div className="flex flex-col justify-between mb-5 space-y-3 h-full">
            <h3 className="text-lg font-bold tracking-tight line-clamp-2">
              {blog.title}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-1">
                  {moment(blog.publishedAt).format('YYYY-MM-DD')}
                </span>
              </div>
              <div className="text-sm font-semibold">
                {blog.category ? (
                  <Link href={`/category/${blog.category.id}`}>
                    <a className="inline-block py-2 px-3 bg-green-700 hover:bg-green-800 rounded">
                      {blog.category.name}
                    </a>
                  </Link>
                ) : (
                  <span className="inline-block p-2 px-3 bg-green-700 rounded">
                    Uncategorized
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="text-sm font-semibold text-right">
            <Link href={`/blog/${blog.id}`}>
              <a className="inline-block py-2 px-3 bg-blue-700 hover:bg-blue-800 rounded">
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
        </div>
      </div>
    </>
  )
}

export default Card
