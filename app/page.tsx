import type { Post } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

const fetchAllBlogs = async (): Promise<Post[]> => {
  const response = await fetch(
    `${process.env.API_BASE_URL_LOCAL as string}/blog`,
    { cache: 'no-store' },
  )
  const res = await response.json()

  return res.posts
}

const Home = async () => {
  const posts = await fetchAllBlogs()

  return (
    <main className="w-full h-full">
      <div className="flex my-5">
        <Link
          href={'/blog/add'}
          className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-300 font-semibold hover:bg-gray-400 transition-all duration-300"
        >
          ブログ新規作成
        </Link>
      </div>
      {posts.map((post: Post) => (
        <div
          key={post.id}
          className="w-full flex flex-col justify-center items-center"
        >
          <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-300 flex flex-col justify-center">
            <div className="flex items-center my-3">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold">{post.title}</h2>
              </div>
              <Link
                href={`/blog/edit/${post.id}`}
                className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
              >
                編集
              </Link>
            </div>

            <div className="mr-auto my-1">
              <blockquote className="font-bold text-slate-700">
                {new Date(post.cratedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </blockquote>
            </div>

            <div className="mr-auto my-1">
              <h2>{post.description}</h2>
            </div>
          </div>
        </div>
      ))}
    </main>
  )
}

export default Home
