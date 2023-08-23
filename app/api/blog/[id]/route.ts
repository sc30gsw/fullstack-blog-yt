import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

import { main } from '../route'

const prisma = new PrismaClient()

// 記事詳細の取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main()

    const id = parseInt(req.url.split('/blog/')[1])

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
