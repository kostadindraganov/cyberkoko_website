import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'

export async function getSiteConfig() {
  const config = await fetchSanityLive({
    query: groq`*[_type == "site"][0]`
  })

  // Return default values if no site document exists
  return config || {
    title: 'Your Default Site Title',
    // ... other default values
  }
} 