/**
 * Background Slot Helper - Server compatible
 * Use this helper in server components to prepare props for BackgroundSlot
 */

export interface BackgroundSlotData {
  slotId: string
  src?: string
  alt?: string
  blurDataURL?: string
}

/**
 * Helper to get background slot props from slot images map
 * Can be used in both server and client components
 */
export function getBackgroundSlotProps(
  slotImages: Record<string, { imageUrl?: string; imageAlt?: string; imageLqip?: string }>,
  slotId: string
): BackgroundSlotData {
  const slot = slotImages[slotId]

  if (!slot) {
    return { slotId }
  }

  return {
    slotId,
    src: slot.imageUrl,
    alt: slot.imageAlt || 'Background',
    blurDataURL: slot.imageLqip,
  }
}
