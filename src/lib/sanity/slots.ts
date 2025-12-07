/**
 * Slot Image Utilities
 * Fetch and manage CMS-controlled slot images
 */

import { cachedFetch } from '../../../sanity/lib/client'
import {
  slotImagesByPageQuery,
  slotImageByIdQuery,
  slotImagesBySectionQuery,
  slotImagesByIdsQuery,
} from './queries'

// Type definitions
export interface SlotImage {
  slotId: string
  page: string
  section: string
  description?: string
  label?: string
  order?: number
  imageUrl?: string
  imageAlt?: string
  imageLqip?: string
  imageWidth?: number
  imageHeight?: number
  imageHotspot?: {
    x: number
    y: number
    width: number
    height: number
  }
}

export type SlotImageMap = Record<string, SlotImage>

/**
 * Get all slot images for a page
 * Returns a map of slotId -> SlotImage for easy lookup
 */
export async function getSlotImages(page: string): Promise<SlotImageMap> {
  try {
    const images = await cachedFetch<SlotImage[]>(
      slotImagesByPageQuery,
      { page },
      60 * 1000 // 60 second cache
    )

    // Convert array to map for O(1) lookup
    return images.reduce((acc, img) => {
      acc[img.slotId] = img
      return acc
    }, {} as SlotImageMap)
  } catch (error) {
    console.error(`Failed to fetch slot images for page: ${page}`, error)
    return {}
  }
}

/**
 * Get a single slot image by ID
 */
export async function getSlotImage(slotId: string): Promise<SlotImage | null> {
  try {
    const image = await cachedFetch<SlotImage | null>(
      slotImageByIdQuery,
      { slotId },
      60 * 1000
    )
    return image
  } catch (error) {
    console.error(`Failed to fetch slot image: ${slotId}`, error)
    return null
  }
}

/**
 * Get slot images for a specific section
 */
export async function getSlotImagesBySection(
  page: string,
  section: string
): Promise<SlotImage[]> {
  try {
    const images = await cachedFetch<SlotImage[]>(
      slotImagesBySectionQuery,
      { page, section },
      60 * 1000
    )
    return images
  } catch (error) {
    console.error(`Failed to fetch slot images for section: ${page}/${section}`, error)
    return []
  }
}

/**
 * Batch fetch slot images by IDs
 * Useful when you need specific slots
 */
export async function getSlotImagesByIds(slotIds: string[]): Promise<SlotImageMap> {
  try {
    const images = await cachedFetch<SlotImage[]>(
      slotImagesByIdsQuery,
      { slotIds },
      60 * 1000
    )

    return images.reduce((acc, img) => {
      acc[img.slotId] = img
      return acc
    }, {} as SlotImageMap)
  } catch (error) {
    console.error('Failed to fetch slot images by IDs', error)
    return {}
  }
}

/**
 * Helper to get image props from a slot
 * Falls back gracefully when no image is set
 */
export function getSlotProps(
  slotImages: SlotImageMap,
  slotId: string,
  defaultLabel?: string
): {
  slotId: string
  src?: string
  alt?: string
  label?: string
  blurDataURL?: string
} {
  const slot = slotImages[slotId]

  if (!slot) {
    return { slotId, label: defaultLabel }
  }

  return {
    slotId,
    src: slot.imageUrl,
    alt: slot.imageAlt || slot.description || defaultLabel,
    label: slot.label || defaultLabel,
    blurDataURL: slot.imageLqip,
  }
}

/**
 * Create a slot helper for a specific page
 * Returns a function to easily get slot props
 */
export function createSlotHelper(slotImages: SlotImageMap) {
  return function getSlot(slotId: string, defaultLabel?: string) {
    return getSlotProps(slotImages, slotId, defaultLabel)
  }
}
