'use client'

import { LoaderWrapper, Dot } from "./styles"

export function Loading() {
  return (
    <LoaderWrapper>
      <Dot />
      <Dot />
      <Dot />
    </LoaderWrapper>
  )
}
