'use client'

import React from 'react'

import { Button } from '@/components/ui'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage = (props: ErrorPageProps) => {
  const { error, reset } = props

  return (
    <div className='h-content space-y-4 px-2 py-8'>
      <h1 className='text-2xl font-bold'>Something went wrong!</h1>
      <Button onClick={reset} type='button'>
        Try again
      </Button>
      <p className='break-words rounded-md bg-zinc-800 p-4'>{error.message}</p>
    </div>
  )
}

export default ErrorPage
