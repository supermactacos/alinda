import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MLS Search | Linda R. Olsson Inc., Realtor',
  description: 'Search Palm Beach MLS listings',
}

export default function MLSSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 