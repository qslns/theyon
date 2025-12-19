/**
 * Clear all slot images - restore to empty state
 * Run with: npx tsx scripts/clear-slots.ts
 */

import * as dotenv from 'dotenv'
import { createClient } from '@sanity/client'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: '6qskaa98',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function main() {
  console.log('🗑️  Clearing all slot images...')

  // Get all slot documents
  const slots = await client.fetch(`*[_type == "slotImage"]`)
  console.log(`Found ${slots.length} slots`)

  let cleared = 0
  for (const slot of slots) {
    if (slot.image?.asset?._ref) {
      await client.patch(slot._id).unset(['image']).commit()
      console.log(`   ✅ Cleared: ${slot.slotId}`)
      cleared++
    }
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  console.log(`\n📈 Cleared ${cleared} slots`)
}

main()
  .then(() => {
    console.log('\n✨ Done! All slots are now empty.')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error:', err)
    process.exit(1)
  })
