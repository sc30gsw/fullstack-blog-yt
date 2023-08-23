import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// DB接続
export const main = async () => {
  try {
    await prisma.$connect()
  } catch (err) {
    return Error('DB接続に失敗しました')
  }
}

// 記事一覧取得API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main()

    const posts = await prisma.post.findMany()
    return NextResponse.json(
      { message: 'Succeeded in getting the post list', posts },
      { status: 200 },
    )
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// 記事投稿用API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    await main()

    const { title, description } = await req.json()

    const newPost = await prisma.post.create({ data: { title, description } })

    return NextResponse.json(
      { message: 'Posted successfully', newPost },
      { status: 201 },
    )
  } catch (err: any) {
    return NextResponse.json({ message: err.message })
  } finally {
    await prisma.$disconnect()
  }
}
