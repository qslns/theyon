/**
 * Sanity Slot Cleanup Script
 *
 * Removes all unused slots from Sanity CMS
 * Run with: npx tsx scripts/cleanup-slots.ts
 */

import * as dotenv from 'dotenv'
import { createClient } from '@sanity/client'

// Load .env.local file
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: '6qskaa98',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// ONLY these slots are actually used in the codebase
const USED_SLOTS = [
  // HOME (16 slots)
  'home-background-001',
  'home-background-002',
  'home-hero-001',
  'home-hero-002',
  'home-hero-003',
  'home-hero-004',
  'home-philosophy-001',
  'home-philosophy-002',
  'home-collections-001',
  'home-collections-002',
  'home-collections-003',
  'home-collections-004',
  'home-process-001',
  'home-process-002',
  'home-process-003',
  'home-contact-001',

  // ABOUT (15 slots)
  'about-background-001',
  'about-background-002',
  'about-hero-001',
  'about-hero-002',
  'about-hero-003',
  'about-philosophy-001',
  'about-philosophy-002',
  'about-education-001',
  'about-education-002',
  'about-education-003',
  'about-process-001',
  'about-process-002',
  'about-process-003',
  'about-contact-001',

  // COLLECTIONS (10 slots)
  'collections-background-001',
  'collections-background-002',
  'collections-header-001',
  'collections-header-002',
  'collections-header-003',
  'collections-header-004',
  'collections-archive-001',
  'collections-archive-002',

  // ARCHIVE (8 slots)
  'archive-background-001',
  'archive-background-002',
  'archive-header-001',
  'archive-header-002',
  'archive-header-003',
  'archive-header-004',
  'archive-cta-001',
  'archive-cta-002',

  // PROCESS (8 slots)
  'process-background-001',
  'process-background-002',
  'process-hero-001',
  'process-hero-002',
  'process-hero-003',
  'process-hero-004',
  'process-cta-001',
  'process-cta-002',

  // CONTACT (8 slots)
  'contact-background-001',
  'contact-background-002',
  'contact-hero-001',
  'contact-hero-002',
  'contact-hero-003',
  'contact-hero-004',
  'contact-location-001',
  'contact-location-002',

  // LAB (15 slots)
  'lab-background-001',
  'lab-background-002',
  'lab-hero-001',
  'lab-hero-002',
  'lab-hero-003',
  'lab-hero-004',
  'lab-failures-001',
  'lab-failures-002',
  'lab-failures-003',
  'lab-failures-004',
  'lab-method-001',
  'lab-method-002',
  'lab-method-003',
]

async function cleanupSlots() {
  console.log('🧹 Starting slot cleanup...')
  console.log(`📊 Used slots count: ${USED_SLOTS.length}`)

  // Get all existing slots from Sanity
  const allSlots = await client.fetch<Array<{ _id: string; slotId: string }>>(
    `*[_type == "slotImage"]{ _id, slotId }`
  )

  console.log(`📦 Total slots in CMS: ${allSlots.length}`)

  // Find slots to delete
  const slotsToDelete = allSlots.filter(
    (slot) => !USED_SLOTS.includes(slot.slotId)
  )

  console.log(`🗑️  Slots to delete: ${slotsToDelete.length}`)

  if (slotsToDelete.length === 0) {
    console.log('✅ No unused slots found!')
    return
  }

  // Delete unused slots
  let deleted = 0
  let errors = 0

  for (const slot of slotsToDelete) {
    try {
      await client.delete(slot._id)
      console.log(`🗑️  Deleted: ${slot.slotId}`)
      deleted++
    } catch (error) {
      console.error(`❌ Error deleting ${slot.slotId}:`, error)
      errors++
    }
  }

  console.log('\n📈 Cleanup Summary:')
  console.log(`   Deleted: ${deleted}`)
  console.log(`   Errors: ${errors}`)
  console.log(`   Remaining: ${allSlots.length - deleted}`)
}

// Run the cleanup
cleanupSlots()
  .then(() => {
    console.log('\n✨ Cleanup complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Cleanup failed:', error)
    process.exit(1)
  })
