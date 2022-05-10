import { useRouter } from 'next/router'
import Link from 'next/link'

export const BLOGS_PER_PAGE = 12
export const range = (start: number, size: number) =>
  [...Array(size - start + 1)].map((_, i) => start + i)

interface Props {
  totalCount: number
}

const Pagination = ({ totalCount }: Props) => {
  const router = useRouter()
  const currentPageNum = Number(router.query.pageId) || 1
  const maxPageNum = Math.ceil(totalCount / BLOGS_PER_PAGE)

  return (
    <>
      <nav className="inline-flex rounded-md shadow" aria-label="Pagination">
        <Link href={`/blog/page/${Math.max(currentPageNum - 1, 1)}`}>
          <a className="inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 rounded-l-md border border-gray-300">
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </a>
        </Link>
        {range(1, maxPageNum).map((pageId, index) => (
          <Link href={`/blog/page/${pageId}`} key={index}>
            <a
              aria-current="page"
              className={`${
                pageId === currentPageNum
                  ? 'text-indigo-600 bg-indigo-50  border-indigo-500 cursor-default'
                  : 'text-gray-500 bg-white  border-gray-300'
              } inline-flex items-center p-2 text-sm font-medium hover:bg-gray-50 border`}
            >
              {pageId}
            </a>
          </Link>
        ))}
        <Link href={`/blog/page/${Math.min(currentPageNum + 1, maxPageNum)}`}>
          <a className="inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 rounded-r-md border border-gray-300">
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </Link>
      </nav>
    </>
  )
}

export default Pagination
