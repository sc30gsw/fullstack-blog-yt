import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

import { main } from '../route'

const prisma = new PrismaClient()

// 記事詳細取得API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = parseInt(req.url.split('/blog/')[1])

    await main()

    const post = await prisma.post.findUnique({ where: { id } })

    if (!post)
      return NextResponse.json({ message: 'Not Found post' }, { status: 404 })

    return NextResponse.json(
      { message: 'Succeeded in getting the post', post },
      { status: 200 },
    )
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// 記事更新用API
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id = parseInt(req.url.split('/blog/')[1])
    const { title, description } = await req.json()

    await main()

    const post = await prisma.post.findUnique({ where: { id } })

    if (!post)
      return NextResponse.json({ message: 'Not Found post' }, { status: 404 })

    const updatedPost = await prisma.post.update({
      data: { title, description },
      where: { id },
    })

    return NextResponse.json(
      { message: 'Updated post successfully', updatedPost },
      { status: 200 },
    )
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// 記事削除用API
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id = parseInt(req.url.split('/blog/')[1])

    await main()

    const post = await prisma.post.findUnique({ where: { id } })

    if (!post)
      return NextResponse.json({ message: 'Not Found post' }, { status: 404 })

    const deletedPost = await prisma.post.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Deleted post successfully', deletedPost },
      { status: 200 },
    )
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
