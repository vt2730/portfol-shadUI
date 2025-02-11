'use client'

import { type BlogPost } from 'contentlayer/generated'
import { motion, useScroll } from 'framer-motion'
import React from 'react'

import Mdx from '@/components/mdx'
import getHeadings from '@/utils/get-headings'

import LikeButton from './like-button'
import TableOfContents from './table-of-contents'

type ContentProps = {
  post: BlogPost
  slug: string
}

const Content = (props: ContentProps) => {
  const { post, slug } = props
  const headings = getHeadings(post.body.raw)
  const { scrollYProgress } = useScroll()

  return (
    <>
      <div className='mt-8 flex flex-col justify-between lg:flex-row'>
        <article className='w-full lg:w-[670px]'>
          <Mdx code={post.body.code} />
        </article>
        <aside className='lg:min-w-[270px] lg:max-w-[270px]'>
          <div className='sticky top-24 will-change-[transform,opacity]'>
            {headings && headings.length > 0 && (
              <TableOfContents headings={headings} />
            )}
            <LikeButton slug={slug} />
          </div>
        </aside>
      </div>
      <motion.div
        className='fixed inset-x-0 top-0 h-0.5 origin-[0%] bg-white'
        style={{
          scaleX: scrollYProgress
        }}
      />
    </>
  )
}

export default Content
