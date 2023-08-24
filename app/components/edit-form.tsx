'use client'

import type { Post } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type EditFromProps = {
  post: Post
}

const EditForm = ({ post }: EditFromProps) => {
  const [editTitle, setEditTitle] = useState(post.title)
  const [editDescription, setEditDescription] = useState(post.description)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL}/blog/${post.id}`,
        {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            title: editTitle,
            description: editDescription,
          }),
        },
      )

      const res = await response.json()

      router.push('/')
      router.refresh()

      setEditTitle(res.updatedPost.title)
      setEditDescription(res.updatedPost.description)
    } catch (err: any) {
      console.error(err.message)
    }
  }

  const handleClick = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL}/blog/${post.id}`,
        {
          method: 'DELETE',
        },
      )

      router.push('/')
      router.refresh()
    } catch (err: any) {
      console.error(err.message)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="タイトルを入力"
        type="text"
        className="rounded-md px-4 w-full py-2 my-2"
        required
        value={editTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEditTitle(e.target.value)
        }
      />
      <textarea
        placeholder="記事詳細を入力"
        className="rounded-md px-4 py-2 w-full my-2"
        required
        value={editDescription}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setEditDescription(e.target.value)
        }
      ></textarea>
      <button
        type="submit"
        className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"
      >
        更新
      </button>
      <button
        onClick={handleClick}
        className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100"
      >
        削除
      </button>
    </form>
  )
}

export default EditForm
