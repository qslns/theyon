/**
 * Image Upload Script for ASKEW
 *
 * Uploads images to Sanity CMS and assigns them to slots
 * Run with: npx tsx scripts/upload-images.ts
 *
 * RULES:
 * - NO duplicate images
 * - NO profile photos
 * - MINIMAL work process photos
 * - sakiyama ONLY for backgrounds
 * - Fashion photos (사진 베스트픽 + 전시포카) for content
 */

import * as dotenv from 'dotenv'
import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: '6qskaa98',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

const BASE_PATH = 'C:/Users/t9140/OneDrive/바탕 화면/askew/홈페이지 제작 사진'

// Sakiyama images for backgrounds (22 needed)
const SAKIYAMA = `${BASE_PATH}/sakiyama`
const sakiyamaFiles = [
  'qslna_A_solitary_androgynous_figure_standing_beneath_massive__9e82c8ee-6570-4709-8036-58e93c085769_0.png',
  'qslna_A_solitary_androgynous_figure_standing_beneath_massive__9e82c8ee-6570-4709-8036-58e93c085769_1.png',
  'qslna_A_solitary_figure_seen_from_behind_wearing_an_oversized_629b855e-f552-4c75-b1e9-27e54f68af9e_0.png',
  'qslna_A_solitary_figure_seen_from_behind_wearing_an_oversized_629b855e-f552-4c75-b1e9-27e54f68af9e_1.png',
  'qslna_Japanese_manga_illustration_sakiyama8ma_style_2D_digita_415365b7-953e-4475-806d-47749671dca9_0.png',
  'qslna_Japanese_manga_illustration_sakiyama8ma_style_2D_digita_3611a78d-89e3-4f30-b3b0-f98a1fd1dfc5_1.png',
  'qslna_A_figure_walking_along_abandoned_railway_tracks_that_di_f6bdd054-ac70-49e3-987a-0bc61aa6ad11_3.png',
  'qslna_A_figure_sitting_on_exposed_steel_beams_of_an_unfinishe_32267868-4093-48bd-8133-851004838028_1.png',
  'qslna_A_figure_standing_at_the_edge_of_a_vast_observation_pla_cb62003d-973c-4fad-ab07-f125ca6f58e3_0.png',
  'qslna_A_figure_standing_inside_an_old_phone_booth_on_a_rainy__64e5b91d-08fe-4602-bd4c-0737a1f0cd33_3.png',
  'qslna_A_figure_standing_on_a_crumbling_balcony_of_a_high-dens_9fa5c815-b3c3-47f1-99ca-0d7ce26d1b01_2.png',
  'qslna_A_figure_standing_with_palm_pressed_against_a_massive_e_521157c1-8768-466f-8696-acdff6b52d67_0.png',
  'qslna_A_figure_walking_along_the_top_of_a_massive_concrete_ts_fea35b61-d176-464b-adcf-345a86b7ac7f_3.png',
  'qslna_A_figure_walking_through_overgrown_fields_of_an_abandon_06c5b31a-76f8-48b5-b37a-6cfe1c395cfa_3.png',
  'qslna_A_mysterious_slender_figure_standing_beneath_massive_el_3e5a22ca-da90-4c43-87a7-9b3733c566f8_0.png',
  'qslna_Black_and_white_ink_illustration_a_figure_standing_with_e77963f2-d18b-40b3-9d8c-4632e9966beb_1.png',
  'qslna_Black_and_white_ink_illustration_in_detailed_pen_sketch_09b00e03-f972-4d5c-9fe0-a32d2541abbc_0.png',
  'qslna_Hand-drawn_digital_illustration_in_Japanese_manga_art_s_f62f88d4-4012-4078-8926-66d673a3fa42_1.png',
  'qslna_Japanese_digital_illustration_sakiyama8ma_art_style_2D__7e6344d6-19d0-404b-bf6e-c13466d61808_1.png',
  'qslna_2D_Japanese_illustration_in_sakiyama8ma_style_flat_colo_3dc18d09-7958-4abb-a5c5-f83f88e38ebc_1.png',
  'qslna_2D_Japanese_illustration_in_sakiyama8ma_style_flat_colo_940abe2f-8307-4021-8b1f-0ef05266827a_1.png',
  'qslna_2D_Japanese_illustration_in_sakiyama8ma_style_flat_colo_daf01d51-833c-489f-9f2b-960015efee71_2.png',
]

// Exhibition photos (9 total) - Best quality for hero main slots
const EXHIBITION = `${BASE_PATH}/전시포카`
const exhibitionFiles = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg',
  '6.jpg', '7(A3).jpg', '8(A3).jpg', '9(A3).jpg'
]

// Best pick fashion photos (68 total)
const BEST_PICK = `${BASE_PATH}/사진 베스트픽`
const bestPickFiles = [
  // Brown draped dress series (2100s)
  '2188.jpg', '2198.jpg', '2199.jpg', '2201.jpg', '2202.jpg', '2205.jpg',
  '2206.jpg', '2208.jpg', '2215.jpg', '2221.jpg', '2222.jpg', '2223.jpg',
  '2233.jpg', '2235.jpg', '2241.jpg', '2252.jpg', '2266.jpg', '2267.jpg',
  '2307.jpg', '2319.jpg', '2340.jpg', '2343.jpg', '2344.jpg', '2349.jpg',
  '2379.jpg', '2380.jpg', '2383.jpg',
  // Blue geometric menswear series (3900-4200s)
  '3964.jpg', '3965.jpg', '3969.jpg', '3970.jpg', '3971.jpg', '3972.jpg',
  '3973.jpg', '3974.jpg', '3982.jpg', '3993.jpg', '4006.jpg', '4012.jpg',
  '4017.jpg', '4023.jpg', '4027.jpg', '4033.jpg', '4039.jpg', '4049.jpg',
  '4051.jpg', '4053.jpg', '4067.jpg', '4068.jpg', '4070.jpg', '4071.jpg',
  '4076.jpg', '4078.jpg', '4079.jpg', '4080.jpg', '4082.jpg', '4104.jpg',
  '4196.jpg', '4216.jpg', '4225.jpg', '4228.jpg', '4230.jpg', '4232.jpg',
  '4233.jpg', '4235.jpg', '4237.jpg', '4241.jpg', '4268.jpg'
]

// Illustrated versions (7 total) - for philosophy/artistic slots
const ILLUSTRATED = `${BASE_PATH}/졸작s1`
const illustratedFiles = [
  'unnamed (1).jpg', 'unnamed (2).jpg', 'unnamed (3).jpg', 'unnamed (4).jpg',
  'unnamed (5).jpg', 'unnamed (6).jpg', 'unnamed (7).jpg'
]

// Additional photos for fabric/detail (only using a few)
const ADDITIONAL = `${BASE_PATH}/추가사진`
const additionalFiles = [
  'IMG_8165.JPG', 'IMG_8166.JPG', 'IMG_8167.JPG', 'IMG_8168.JPG', 'IMG_8169.JPG',
  'IMG_8170.JPG', 'IMG_8171.JPG', 'IMG_8172.JPG', 'IMG_8173.JPG', 'IMG_8174.JPG',
  'IMG_8175.JPG', 'IMG_8176.JPG', 'IMG_8177.JPG', 'IMG_8178.JPG', 'IMG_8179.JPG',
  'IMG_8180.JPG', 'IMG_8181.JPG', 'IMG_8182.JPG', 'IMG_8183.JPG', 'IMG_8184.JPG',
]

// Track used images to prevent duplicates
const usedImages = new Set<string>()

function getImage(folder: string, file: string): string {
  const path = `${folder}/${file}`
  if (usedImages.has(path)) {
    throw new Error(`DUPLICATE IMAGE: ${path}`)
  }
  usedImages.add(path)
  return path
}

// Image to Slot Mapping - NO DUPLICATES
const IMAGE_SLOT_MAPPING: Array<{
  slotId: string
  imagePath: string
  altText: string
}> = [
  // ==========================================
  // HOME PAGE (16 slots)
  // ==========================================
  // Backgrounds - Sakiyama
  { slotId: 'home-background-001', imagePath: getImage(SAKIYAMA, sakiyamaFiles[0]), altText: 'ASKEW atmospheric background' },
  { slotId: 'home-background-002', imagePath: getImage(SAKIYAMA, sakiyamaFiles[1]), altText: 'ASKEW scrolling background' },
  // Hero - Best photos
  { slotId: 'home-hero-001', imagePath: getImage(EXHIBITION, exhibitionFiles[0]), altText: 'ASKEW main hero' },
  { slotId: 'home-hero-002', imagePath: getImage(BEST_PICK, bestPickFiles[0]), altText: 'ASKEW hero detail' },
  { slotId: 'home-hero-003', imagePath: getImage(BEST_PICK, bestPickFiles[27]), altText: 'ASKEW hero blue' },
  { slotId: 'home-hero-004', imagePath: getImage(BEST_PICK, bestPickFiles[1]), altText: 'ASKEW hero brown' },
  // Philosophy
  { slotId: 'home-philosophy-001', imagePath: getImage(ILLUSTRATED, illustratedFiles[0]), altText: 'ASKEW philosophy' },
  { slotId: 'home-philosophy-002', imagePath: getImage(ILLUSTRATED, illustratedFiles[1]), altText: 'ASKEW philosophy 2' },
  // Collections preview
  { slotId: 'home-collections-001', imagePath: getImage(EXHIBITION, exhibitionFiles[2]), altText: 'ASKEW collection 1' },
  { slotId: 'home-collections-002', imagePath: getImage(BEST_PICK, bestPickFiles[28]), altText: 'ASKEW collection 2' },
  { slotId: 'home-collections-003', imagePath: getImage(BEST_PICK, bestPickFiles[2]), altText: 'ASKEW collection 3' },
  { slotId: 'home-collections-004', imagePath: getImage(BEST_PICK, bestPickFiles[29]), altText: 'ASKEW collection 4' },
  // Process
  { slotId: 'home-process-001', imagePath: getImage(BEST_PICK, bestPickFiles[3]), altText: 'ASKEW process 1' },
  { slotId: 'home-process-002', imagePath: getImage(BEST_PICK, bestPickFiles[30]), altText: 'ASKEW process 2' },
  { slotId: 'home-process-003', imagePath: getImage(BEST_PICK, bestPickFiles[4]), altText: 'ASKEW process 3' },
  // Contact
  { slotId: 'home-contact-001', imagePath: getImage(EXHIBITION, exhibitionFiles[1]), altText: 'ASKEW contact' },

  // ==========================================
  // ABOUT PAGE (14 slots)
  // ==========================================
  { slotId: 'about-background-001', imagePath: getImage(SAKIYAMA, sakiyamaFiles[2]), altText: 'About background' },
  { slotId: 'about-background-002', imagePath: getImage(SAKIYAMA, sakiyamaFiles[3]), altText: 'About scrolling background' },
  { slotId: 'about-hero-001', imagePath: getImage(EXHIBITION, exhibitionFiles[3]), altText: 'About hero main' },
  { slotId: 'about-hero-002', imagePath: getImage(BEST_PICK, bestPickFiles[5]), altText: 'About hero 2' },
  { slotId: 'about-hero-003', imagePath: getImage(BEST_PICK, bestPickFiles[31]), altText: 'About hero 3' },
  { slotId: 'about-philosophy-001', imagePath: getImage(ILLUSTRATED, illustratedFiles[2]), altText: 'About philosophy' },
  { slotId: 'about-philosophy-002', imagePath: getImage(ILLUSTRATED, illustratedFiles[3]), altText: 'About philosophy 2' },
  { slotId: 'about-education-001', imagePath: getImage(BEST_PICK, bestPickFiles[6]), altText: 'Education 1' },
  { slotId: 'about-education-002', imagePath: getImage(BEST_PICK, bestPickFiles[32]), altText: 'Education 2' },
  { slotId: 'about-education-003', imagePath: getImage(BEST_PICK, bestPickFiles[7]), altText: 'Education 3' },
  { slotId: 'about-process-001', imagePath: getImage(BEST_PICK, bestPickFiles[8]), altText: 'About process 1' },
  { slotId: 'about-process-002', imagePath: getImage(BEST_PICK, bestPickFiles[33]), altText: 'About process 2' },
  { slotId: 'about-process-003', imagePath: getImage(BEST_PICK, bestPickFiles[9]), altText: 'About process 3' },
  { slotId: 'about-contact-001', imagePath: getImage(EXHIBITION, exhibitionFiles[4]), altText: 'About contact' },

  // ==========================================
  // COLLECTIONS PAGE (8 slots)
  // ==========================================
  { slotId: 'collections-background-001', imagePath: getImage(SAKIYAMA, sakiyamaFiles[4]), altText: 'Collections background' },
  { slotId: 'collections-background-002', imagePath: getImage(SAKIYAMA, sakiyamaFiles[5]), altText: 'Collections scrolling bg' },
  { slotId: 'collections-header-001', imagePath: getImage(EXHIBITION, exhibitionFiles[5]), altText: 'Collections header main' },
  { slotId: 'collections-header-002', imagePath: getImage(BEST_PICK, bestPickFiles[10]), altText: 'Collections header 2' },
  { slotId: 'collections-header-003', imagePath: getImage(BEST_PICK, bestPickFiles[34]), altText: 'Collections header 3' },
  { slotId: 'collections-header-004', imagePath: getImage(BEST_PICK, bestPickFiles[11]), altText: 'Collections header 4' },
  { slotId: 'collections-archive-001', imagePath: getImage(BEST_PICK, bestPickFiles[35]), altText: 'Collections archive 1' },
  { slotId: 'collections-archive-002', imagePath: getImage(BEST_PICK, bestPickFiles[12]), altText: 'Collections archive 2' },

  // ==========================================
  // ARCHIVE PAGE (8 slots)
  // ==========================================
  { slotId: 'archive-background-001', imagePath: getImage(SAKIYAMA, sakiyamaFiles[6]), altText: 'Archive background' },
  { slotId: 'archive-background-002', imagePath: getImage(SAKIYAMA, sakiyamaFiles[7]), altText: 'Archive scrolling bg' },
  { slotId: 'archive-header-001', imagePath: getImage(BEST_PICK, bestPickFiles[13]), altText: 'Archive header main' },
  { slotId: 'archive-header-002', imagePath: getImage(BEST_PICK, bestPickFiles[36]), altText: 'Archive header 2' },
  { slotId: 'archive-header-003', imagePath: getImage(BEST_PICK, bestPickFiles[14]), altText: 'Archive header 3' },
  { slotId: 'archive-header-004', imagePath: getImage(BEST_PICK, bestPickFiles[37]), altText: 'Archive header 4' },
  { slotId: 'archive-cta-001', imagePath: getImage(ILLUSTRATED, illustratedFiles[4]), altText: 'Archive CTA 1' },
  { slotId: 'archive-cta-002', imagePath: getImage(ILLUSTRATED, illustratedFiles[5]), altText: 'Archive CTA 2' },

  // ==========================================
  // PROCESS PAGE (8 slots)
  // ==========================================
  { slotId: 'process-background-001', imagePath: getImage(SAKIYAMA, sakiyamaFiles[8]), altText: 'Process background' },
  { slotId: 'process-background-002', imagePath: getImage(SAKIYAMA, sakiyamaFiles[9]), altText: 'Process scrolling bg' },
  { slotId: 'process-hero-001', imagePath: getImage(BEST_PICK, bestPickFiles[15]), altText: 'Process sketch' },
  { slotId: 'process-hero-002', imagePath: getImage(BEST_PICK, bestPickFiles[38]), altText: 'Process toile' },
  { slotId: 'process-hero-003', imagePath: getImage(BEST_PICK, bestPickFiles[16]), altText: 'Process fabric' },
  { slotId: 'process-hero-004', imagePath: getImage(BEST_PICK, bestPickFiles[39]), altText: 'Process mood' },
  { slotId: 'process-cta-001', imagePath: getImage(EXHIBITION, exhibitionFiles[6]), altText: 'Process CTA 1' },
  { slotId: 'process-cta-002', imagePath: getImage(BEST_PICK, bestPickFiles[17]), altText: 'Process CTA 2' },

  // ==========================================
  // CONTACT PAGE (8 slots)
  // ==========================================
  { slotId: 'contact-background-001', imagePath: getImage(SAKIYAMA, sakiyamaFiles[10]), altText: 'Contact background' },
  { slotId: 'contact-background-002', imagePath: getImage(SAKIYAMA, sakiyamaFiles[11]), altText: 'Contact scrolling bg' },
  { slotId: 'contact-hero-001', imagePath: getImage(BEST_PICK, bestPickFiles[18]), altText: 'Contact hero main' },
  { slotId: 'contact-hero-002', imagePath: getImage(BEST_PICK, bestPickFiles[40]), altText: 'Contact hero 2' },
  { slotId: 'contact-hero-003', imagePath: getImage(BEST_PICK, bestPickFiles[19]), altText: 'Contact hero 3' },
  { slotId: 'contact-hero-004', imagePath: getImage(BEST_PICK, bestPickFiles[41]), altText: 'Contact hero 4' },
  { slotId: 'contact-location-001', imagePath: getImage(BEST_PICK, bestPickFiles[20]), altText: 'Contact location 1' },
  { slotId: 'contact-location-002', imagePath: getImage(BEST_PICK, bestPickFiles[42]), altText: 'Contact location 2' },

  // ==========================================
  // LAB PAGE (13 slots)
  // ==========================================
  { slotId: 'lab-background-001', imagePath: getImage(SAKIYAMA, sakiyamaFiles[12]), altText: 'Lab background' },
  { slotId: 'lab-background-002', imagePath: getImage(SAKIYAMA, sakiyamaFiles[13]), altText: 'Lab scrolling bg' },
  { slotId: 'lab-hero-001', imagePath: getImage(EXHIBITION, exhibitionFiles[7]), altText: 'Lab hero main' },
  { slotId: 'lab-hero-002', imagePath: getImage(BEST_PICK, bestPickFiles[21]), altText: 'Lab hero 2' },
  { slotId: 'lab-hero-003', imagePath: getImage(BEST_PICK, bestPickFiles[43]), altText: 'Lab hero 3' },
  { slotId: 'lab-hero-004', imagePath: getImage(BEST_PICK, bestPickFiles[22]), altText: 'Lab hero 4' },
  { slotId: 'lab-failures-001', imagePath: getImage(BEST_PICK, bestPickFiles[44]), altText: 'Lab failures 1' },
  { slotId: 'lab-failures-002', imagePath: getImage(BEST_PICK, bestPickFiles[23]), altText: 'Lab failures 2' },
  { slotId: 'lab-failures-003', imagePath: getImage(BEST_PICK, bestPickFiles[45]), altText: 'Lab failures 3' },
  { slotId: 'lab-failures-004', imagePath: getImage(BEST_PICK, bestPickFiles[24]), altText: 'Lab failures 4' },
  { slotId: 'lab-method-001', imagePath: getImage(BEST_PICK, bestPickFiles[46]), altText: 'Lab method observe' },
  { slotId: 'lab-method-002', imagePath: getImage(BEST_PICK, bestPickFiles[25]), altText: 'Lab method experiment' },
  { slotId: 'lab-method-003', imagePath: getImage(BEST_PICK, bestPickFiles[47]), altText: 'Lab method refine' },

  // ==========================================
  // COLLECTION: DECONSTRUCTION (8 slots)
  // Brown draped dress collection
  // ==========================================
  { slotId: 'collection-deconstruction-background-001', imagePath: getImage(SAKIYAMA, sakiyamaFiles[14]), altText: 'Deconstruction background' },
  { slotId: 'collection-deconstruction-background-002', imagePath: getImage(SAKIYAMA, sakiyamaFiles[15]), altText: 'Deconstruction scrolling bg' },
  { slotId: 'collection-deconstruction-hero-001', imagePath: getImage(EXHIBITION, exhibitionFiles[8]), altText: 'Deconstruction main' },
  { slotId: 'collection-deconstruction-hero-002', imagePath: getImage(BEST_PICK, bestPickFiles[26]), altText: 'Deconstruction detail' },
  { slotId: 'collection-deconstruction-hero-003', imagePath: getImage(ADDITIONAL, additionalFiles[0]), altText: 'Deconstruction process' },
  { slotId: 'collection-deconstruction-hero-004', imagePath: getImage(ADDITIONAL, additionalFiles[1]), altText: 'Deconstruction material' },
  { slotId: 'collection-deconstruction-gallery-001', imagePath: getImage(ADDITIONAL, additionalFiles[2]), altText: 'Deconstruction gallery 1' },
  { slotId: 'collection-deconstruction-gallery-002', imagePath: getImage(ADDITIONAL, additionalFiles[3]), altText: 'Deconstruction gallery 2' },

  // ==========================================
  // COLLECTION: FRAGMENTS (8 slots)
  // Blue geometric pattern collection
  // ==========================================
  { slotId: 'collection-fragments-background-001', imagePath: getImage(SAKIYAMA, sakiyamaFiles[16]), altText: 'Fragments background' },
  { slotId: 'collection-fragments-background-002', imagePath: getImage(SAKIYAMA, sakiyamaFiles[17]), altText: 'Fragments scrolling bg' },
  { slotId: 'collection-fragments-hero-001', imagePath: getImage(BEST_PICK, bestPickFiles[48]), altText: 'Fragments main' },
  { slotId: 'collection-fragments-hero-002', imagePath: getImage(BEST_PICK, bestPickFiles[49]), altText: 'Fragments detail' },
  { slotId: 'collection-fragments-hero-003', imagePath: getImage(BEST_PICK, bestPickFiles[50]), altText: 'Fragments process' },
  { slotId: 'collection-fragments-hero-004', imagePath: getImage(ADDITIONAL, additionalFiles[4]), altText: 'Fragments material' },
  { slotId: 'collection-fragments-gallery-001', imagePath: getImage(BEST_PICK, bestPickFiles[51]), altText: 'Fragments gallery 1' },
  { slotId: 'collection-fragments-gallery-002', imagePath: getImage(BEST_PICK, bestPickFiles[52]), altText: 'Fragments gallery 2' },

  // ==========================================
  // COLLECTION: VOID (8 slots)
  // ==========================================
  { slotId: 'collection-void-background-001', imagePath: getImage(SAKIYAMA, sakiyamaFiles[18]), altText: 'Void background' },
  { slotId: 'collection-void-background-002', imagePath: getImage(SAKIYAMA, sakiyamaFiles[19]), altText: 'Void scrolling bg' },
  { slotId: 'collection-void-hero-001', imagePath: getImage(BEST_PICK, bestPickFiles[53]), altText: 'Void main' },
  { slotId: 'collection-void-hero-002', imagePath: getImage(BEST_PICK, bestPickFiles[54]), altText: 'Void detail' },
  { slotId: 'collection-void-hero-003', imagePath: getImage(BEST_PICK, bestPickFiles[55]), altText: 'Void process' },
  { slotId: 'collection-void-hero-004', imagePath: getImage(ADDITIONAL, additionalFiles[5]), altText: 'Void material' },
  { slotId: 'collection-void-gallery-001', imagePath: getImage(BEST_PICK, bestPickFiles[56]), altText: 'Void gallery 1' },
  { slotId: 'collection-void-gallery-002', imagePath: getImage(BEST_PICK, bestPickFiles[57]), altText: 'Void gallery 2' },

  // ==========================================
  // COLLECTION: ORIGIN (8 slots)
  // ==========================================
  { slotId: 'collection-origin-background-001', imagePath: getImage(SAKIYAMA, sakiyamaFiles[20]), altText: 'Origin background' },
  { slotId: 'collection-origin-background-002', imagePath: getImage(SAKIYAMA, sakiyamaFiles[21]), altText: 'Origin scrolling bg' },
  { slotId: 'collection-origin-hero-001', imagePath: getImage(BEST_PICK, bestPickFiles[58]), altText: 'Origin main' },
  { slotId: 'collection-origin-hero-002', imagePath: getImage(BEST_PICK, bestPickFiles[59]), altText: 'Origin detail' },
  { slotId: 'collection-origin-hero-003', imagePath: getImage(ILLUSTRATED, illustratedFiles[6]), altText: 'Origin illustration' },
  { slotId: 'collection-origin-hero-004', imagePath: getImage(ADDITIONAL, additionalFiles[6]), altText: 'Origin material' },
  { slotId: 'collection-origin-gallery-001', imagePath: getImage(BEST_PICK, bestPickFiles[60]), altText: 'Origin gallery 1' },
  { slotId: 'collection-origin-gallery-002', imagePath: getImage(BEST_PICK, bestPickFiles[61]), altText: 'Origin gallery 2' },
]

console.log(`📊 Total unique images: ${usedImages.size}`)
console.log(`📊 Total slots to fill: ${IMAGE_SLOT_MAPPING.length}`)

async function uploadImageToSlot(
  slotId: string,
  imagePath: string,
  altText: string,
  forceReplace: boolean = true
): Promise<boolean | 'skipped'> {
  try {
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      console.log(`   ⚠️  File not found: ${imagePath}`)
      return false
    }

    // Find the slot document
    const slot = await client.fetch(
      `*[_type == "slotImage" && slotId == $slotId][0]`,
      { slotId }
    )

    if (!slot) {
      console.log(`   ⚠️  Slot not found: ${slotId}`)
      return false
    }

    // Check if slot already has an image
    if (slot.image?.asset?._ref && !forceReplace) {
      console.log(`   ⏭️  Already has image: ${slotId}`)
      return 'skipped'
    }

    // Read and upload the image
    const imageBuffer = fs.readFileSync(imagePath)
    const fileName = path.basename(imagePath)

    const imageAsset = await client.assets.upload('image', imageBuffer, {
      filename: fileName,
    })

    // Update the slot with the image reference
    await client.patch(slot._id).set({
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
        alt: altText,
      },
    }).commit()

    console.log(`   ✅ Uploaded: ${slotId}`)
    return true
  } catch (error) {
    console.error(`   ❌ Error uploading to ${slotId}:`, error)
    return false
  }
}

async function main() {
  console.log('🖼️  Starting image upload to ASKEW CMS...')
  console.log(`📊 Total slots: ${IMAGE_SLOT_MAPPING.length}`)
  console.log('✅ Mode: Fill empty slots only (preserve existing images)')
  console.log('')

  let uploaded = 0
  let skipped = 0
  let errors = 0

  for (const mapping of IMAGE_SLOT_MAPPING) {
    const result = await uploadImageToSlot(
      mapping.slotId,
      mapping.imagePath,
      mapping.altText,
      false // DO NOT replace existing images
    )

    if (result === true) {
      uploaded++
    } else if (result === 'skipped') {
      skipped++
    } else {
      errors++
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  console.log('')
  console.log('📈 Upload Summary:')
  console.log(`   ✅ Uploaded (empty slots filled): ${uploaded}`)
  console.log(`   ⏭️  Skipped (already have image): ${skipped}`)
  console.log(`   ❌ Errors: ${errors}`)
}

main()
  .then(() => {
    console.log('\n✨ Upload complete!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error:', err)
    process.exit(1)
  })
