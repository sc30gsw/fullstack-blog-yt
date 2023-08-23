'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const PostBlog = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.loading('投稿中です・・・')

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL}/blog`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ title, description }),
      })

      toast.success('投稿に成功しました！')
      router.push('/')
      router.refresh()

      setTitle('')
      setDescription('')
    } catch (err: any) {
      console.error(err.message)
    }
  }
  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            ブログ新規作成 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
              required
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <textarea
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
              required
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              投稿
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PostBlog
