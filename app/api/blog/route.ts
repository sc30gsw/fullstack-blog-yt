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
      { message: 'get all posts', posts },
      { status: 200 },
    )
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
