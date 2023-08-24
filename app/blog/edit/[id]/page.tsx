import type { Post } from '@prisma/client'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

import EditForm from '../../../components/edit-form'
import Spinner from '../../../components/spinner'

const fetchPost = async (postId: number) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL_LOCAL as string}/blog/${postId}`,
    )

    if (response.status === 404) return notFound()

    const res = await response.json()

    return res.post
  } catch (err: any) {
    console.error(err.message)
    if (err.message === 'NEXT_NOT_FOUND') return notFound()
  }
}

export const generateStaticParams = async () => {
  const response = await fetch(
    `${process.env.API_BASE_URL_LOCAL as string}/blog`,
  )
  const res = await response.json()

  const posts: Post[] = await res.posts

  return posts.map((post) => ({
    id: post.id.toString(),
  }))
}

type PageProps = {
  params: {
    id: string
  }
}

const EditBlog = async ({ params }: PageProps) => {
  const post = await fetchPost(parseInt(params.id))
  return (
    <>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            ブログの編集 🚀
          </p>
          <Suspense fallback={<Spinner color="border-white" />}>
            <EditForm post={post} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default EditBlog
