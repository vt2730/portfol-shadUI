'use server'

import { revalidatePath } from 'next/cache'

import { env } from '@/env'
import { getCurrentUser } from '@/lib/auth'
import prisma from '@/lib/prisma'

import { privateAction } from './private-action'

export const deleteMessage = async (id: number) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const email = user.email

  const message = await prisma.guestbook.findUnique({
    where: {
      id
    },
    select: {
      email: true
    }
  })

  if (!message) {
    throw new Error('Message not found')
  }

  if (message.email !== email) {
    throw new Error('Unauthorized')
  }

  await prisma.guestbook.delete({
    where: {
      id
    }
  })

  revalidatePath('/guestbook')
}

export const createMessage = (message: string) =>
  privateAction(async (user) => {
    const email = user.email as string
    const name = user.name as string
    const image = user.image as string

    if (!message) {
      throw new Error('Message cannot be empty')
    }

    await prisma.guestbook.create({
      data: {
        email,
        body: message,
        image,
        created_by: name
      }
    })

    if (process.env.NODE_ENV === 'production') {
      await fetch(env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: null,
          embeds: [
            {
              title: 'New comment!',
              description: message,
              url: 'https://honghong.me/guestbook',
              color: '6609519',
              author: {
                name,
                icon_url: image
              },
              timestamp: new Date().toISOString()
            }
          ],
          username: 'Blog',
          avatar_url: 'https://honghong.me/images/projects/blog/logo.png',
          attachments: []
        })
      })
    }

    revalidatePath('/guestbook')
  })

export const getMessages = async () => {
  return await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc'
    }
  })
}
