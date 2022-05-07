export type Blog = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  eyecatch: {
    url: string
    height: number
    width: number
  }
  category: Category
}

export type Blogs = {
  contents: Blog[]
  totalCount: number
  offset: number
  limit: number
}

export type Category = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

export type Categories = {
  contents: Category[]
  totalCount: number
  offset: number
  limit: number
}
