/**
 * Image Upload Script for ASKEW
 *
 * Uploads images to Sanity CMS and assigns them to slots
 * Run with: npx tsx scripts/upload-images.ts
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

// Image to Slot Mapping
// Carefully curated based on image analysis
const IMAGE_SLOT_MAPPING: Array<{
  slotId: string
  imagePath: string
  altText: string
}> = [
  // ==========================================
  // HOME PAGE (16 slots)
  // ==========================================
  // Backgrounds - Sakiyama atmospheric illustrations
  {
    slotId: 'home-background-001',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_solitary_androgynous_figure_standing_beneath_massive__9e82c8ee-6570-4709-8036-58e93c085769_0.png`,
    altText: 'ASKEW atmospheric background',
  },
  {
    slotId: 'home-background-002',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_figure_walking_along_abandoned_railway_tracks_that_di_f6bdd054-ac70-49e3-987a-0bc61aa6ad11_3.png`,
    altText: 'ASKEW scrolling background',
  },
  // Hero - Best fashion shots
  {
    slotId: 'home-hero-001',
    imagePath: `${BASE_PATH}/전시포카/1.jpg`,
    altText: 'ASKEW main hero - Brown draped dress',
  },
  {
    slotId: 'home-hero-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/2221.jpg`,
    altText: 'ASKEW hero detail shot',
  },
  {
    slotId: 'home-hero-003',
    imagePath: `${BASE_PATH}/사진 베스트픽/2233.jpg`,
    altText: 'ASKEW hero close-up',
  },
  {
    slotId: 'home-hero-004',
    imagePath: `${BASE_PATH}/추가사진/IMG_8175.JPG`,
    altText: 'ASKEW fabric swatch',
  },
  // Philosophy - Illustrated versions
  {
    slotId: 'home-philosophy-001',
    imagePath: `${BASE_PATH}/졸작s1/unnamed (1).jpg`,
    altText: 'ASKEW philosophy illustration',
  },
  {
    slotId: 'home-philosophy-002',
    imagePath: `${BASE_PATH}/졸작s1/unnamed (2).jpg`,
    altText: 'ASKEW philosophy illustration 2',
  },
  // Collections preview - Mix of both collections
  {
    slotId: 'home-collections-001',
    imagePath: `${BASE_PATH}/전시포카/3.jpg`,
    altText: 'ASKEW collection - Blue geometric',
  },
  {
    slotId: 'home-collections-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/3970.jpg`,
    altText: 'ASKEW collection look',
  },
  {
    slotId: 'home-collections-003',
    imagePath: `${BASE_PATH}/사진 베스트픽/2266.jpg`,
    altText: 'ASKEW collection detail',
  },
  {
    slotId: 'home-collections-004',
    imagePath: `${BASE_PATH}/사진 베스트픽/2205.jpg`,
    altText: 'ASKEW collection small',
  },
  // Process
  {
    slotId: 'home-process-001',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7744.JPG`,
    altText: 'ASKEW pattern making',
  },
  {
    slotId: 'home-process-002',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7809.JPG`,
    altText: 'ASKEW pattern pieces',
  },
  {
    slotId: 'home-process-003',
    imagePath: `${BASE_PATH}/포플 작업사진/2/IMG_7766.JPG`,
    altText: 'ASKEW cutting process',
  },
  // Contact
  {
    slotId: 'home-contact-001',
    imagePath: `${BASE_PATH}/전시포카/2.jpg`,
    altText: 'ASKEW contact image',
  },

  // ==========================================
  // ABOUT PAGE (14 slots)
  // ==========================================
  {
    slotId: 'about-background-001',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_solitary_figure_seen_from_behind_wearing_an_oversized_629b855e-f552-4c75-b1e9-27e54f68af9e_0.png`,
    altText: 'About page background',
  },
  {
    slotId: 'about-background-002',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_solitary_figure_seen_from_behind_wearing_an_oversized_629b855e-f552-4c75-b1e9-27e54f68af9e_1.png`,
    altText: 'About page scrolling background',
  },
  {
    slotId: 'about-hero-001',
    imagePath: `${BASE_PATH}/전시포카/5.jpg`,
    altText: 'About hero main',
  },
  {
    slotId: 'about-hero-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/2198.jpg`,
    altText: 'About hero secondary',
  },
  {
    slotId: 'about-hero-003',
    imagePath: `${BASE_PATH}/사진 베스트픽/2199.jpg`,
    altText: 'About hero detail',
  },
  {
    slotId: 'about-philosophy-001',
    imagePath: `${BASE_PATH}/졸작s1/unnamed (3).jpg`,
    altText: 'About philosophy',
  },
  {
    slotId: 'about-philosophy-002',
    imagePath: `${BASE_PATH}/졸작s1/unnamed (4).jpg`,
    altText: 'About philosophy 2',
  },
  {
    slotId: 'about-education-001',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7847.JPG`,
    altText: 'Education image 1',
  },
  {
    slotId: 'about-education-002',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7848.JPG`,
    altText: 'Education image 2',
  },
  {
    slotId: 'about-education-003',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7849.JPG`,
    altText: 'Education image 3',
  },
  {
    slotId: 'about-process-001',
    imagePath: `${BASE_PATH}/포플 작업사진/2/IMG_7970.JPG`,
    altText: 'About process 1',
  },
  {
    slotId: 'about-process-002',
    imagePath: `${BASE_PATH}/포플 작업사진/2/IMG_7971.JPG`,
    altText: 'About process 2',
  },
  {
    slotId: 'about-process-003',
    imagePath: `${BASE_PATH}/포플 작업사진/2/IMG_7972.JPG`,
    altText: 'About process 3',
  },
  {
    slotId: 'about-contact-001',
    imagePath: `${BASE_PATH}/전시포카/6.jpg`,
    altText: 'About contact',
  },

  // ==========================================
  // COLLECTIONS PAGE (8 slots)
  // ==========================================
  {
    slotId: 'collections-background-001',
    imagePath: `${BASE_PATH}/sakiyama/qslna_Japanese_manga_illustration_sakiyama8ma_style_2D_digita_415365b7-953e-4475-806d-47749671dca9_0.png`,
    altText: 'Collections background',
  },
  {
    slotId: 'collections-background-002',
    imagePath: `${BASE_PATH}/sakiyama/qslna_Japanese_manga_illustration_sakiyama8ma_style_2D_digita_3611a78d-89e3-4f30-b3b0-f98a1fd1dfc5_1.png`,
    altText: 'Collections scrolling background',
  },
  {
    slotId: 'collections-header-001',
    imagePath: `${BASE_PATH}/사진 베스트픽/4006.jpg`,
    altText: 'Collections header main',
  },
  {
    slotId: 'collections-header-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/2188.jpg`,
    altText: 'Collections header 2',
  },
  {
    slotId: 'collections-header-003',
    imagePath: `${BASE_PATH}/사진 베스트픽/3964.jpg`,
    altText: 'Collections header 3',
  },
  {
    slotId: 'collections-header-004',
    imagePath: `${BASE_PATH}/추가사진/IMG_8165.JPG`,
    altText: 'Collections header 4',
  },
  {
    slotId: 'collections-archive-001',
    imagePath: `${BASE_PATH}/사진 베스트픽/2201.jpg`,
    altText: 'Collections archive 1',
  },
  {
    slotId: 'collections-archive-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/4017.jpg`,
    altText: 'Collections archive 2',
  },

  // ==========================================
  // ARCHIVE PAGE (8 slots)
  // ==========================================
  {
    slotId: 'archive-background-001',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_solitary_androgynous_figure_standing_beneath_massive__9e82c8ee-6570-4709-8036-58e93c085769_1.png`,
    altText: 'Archive background',
  },
  {
    slotId: 'archive-background-002',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_solitary_androgynous_figure_standing_beneath_massive__9e82c8ee-6570-4709-8036-58e93c085769_3.png`,
    altText: 'Archive scrolling background',
  },
  {
    slotId: 'archive-header-001',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7850.JPG`,
    altText: 'Archive header main',
  },
  {
    slotId: 'archive-header-002',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7853.JPG`,
    altText: 'Archive header 2',
  },
  {
    slotId: 'archive-header-003',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7854.JPG`,
    altText: 'Archive header 3',
  },
  {
    slotId: 'archive-header-004',
    imagePath: `${BASE_PATH}/추가사진/IMG_8180.JPG`,
    altText: 'Archive header 4',
  },
  {
    slotId: 'archive-cta-001',
    imagePath: `${BASE_PATH}/졸작s1/unnamed (5).jpg`,
    altText: 'Archive CTA 1',
  },
  {
    slotId: 'archive-cta-002',
    imagePath: `${BASE_PATH}/졸작s1/unnamed (6).jpg`,
    altText: 'Archive CTA 2',
  },

  // ==========================================
  // PROCESS PAGE (8 slots)
  // ==========================================
  {
    slotId: 'process-background-001',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_figure_sitting_on_exposed_steel_beams_of_an_unfinishe_32267868-4093-48bd-8133-851004838028_1.png`,
    altText: 'Process background',
  },
  {
    slotId: 'process-background-002',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_figure_standing_at_the_edge_of_a_vast_observation_pla_cb62003d-973c-4fad-ab07-f125ca6f58e3_0.png`,
    altText: 'Process scrolling background',
  },
  {
    slotId: 'process-hero-001',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7855.JPG`,
    altText: 'Process sketch',
  },
  {
    slotId: 'process-hero-002',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7856.JPG`,
    altText: 'Process toile',
  },
  {
    slotId: 'process-hero-003',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7857.JPG`,
    altText: 'Process fabric',
  },
  {
    slotId: 'process-hero-004',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7858.JPG`,
    altText: 'Process mood',
  },
  {
    slotId: 'process-cta-001',
    imagePath: `${BASE_PATH}/전시포카/4.jpg`,
    altText: 'Process CTA 1',
  },
  {
    slotId: 'process-cta-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/3970.jpg`,
    altText: 'Process CTA 2',
  },

  // ==========================================
  // CONTACT PAGE (8 slots)
  // ==========================================
  {
    slotId: 'contact-background-001',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_figure_standing_inside_an_old_phone_booth_on_a_rainy__64e5b91d-08fe-4602-bd4c-0737a1f0cd33_3.png`,
    altText: 'Contact background',
  },
  {
    slotId: 'contact-background-002',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_figure_standing_on_a_crumbling_balcony_of_a_high-dens_9fa5c815-b3c3-47f1-99ca-0d7ce26d1b01_2.png`,
    altText: 'Contact scrolling background',
  },
  {
    slotId: 'contact-hero-001',
    imagePath: `${BASE_PATH}/프로필/IMG_5377.JPG`,
    altText: 'Contact hero - Designer profile',
  },
  {
    slotId: 'contact-hero-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/2198.jpg`,
    altText: 'Contact hero 2',
  },
  {
    slotId: 'contact-hero-003',
    imagePath: `${BASE_PATH}/사진 베스트픽/2199.jpg`,
    altText: 'Contact hero 3',
  },
  {
    slotId: 'contact-hero-004',
    imagePath: `${BASE_PATH}/추가사진/IMG_8175.JPG`,
    altText: 'Contact hero 4',
  },
  {
    slotId: 'contact-location-001',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7859.JPG`,
    altText: 'Contact location 1',
  },
  {
    slotId: 'contact-location-002',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7860.JPG`,
    altText: 'Contact location 2',
  },

  // ==========================================
  // LAB PAGE (13 slots)
  // ==========================================
  {
    slotId: 'lab-background-001',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_figure_standing_with_palm_pressed_against_a_massive_e_521157c1-8768-466f-8696-acdff6b52d67_0.png`,
    altText: 'Lab background',
  },
  {
    slotId: 'lab-background-002',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_figure_walking_along_the_top_of_a_massive_concrete_ts_fea35b61-d176-464b-adcf-345a86b7ac7f_3.png`,
    altText: 'Lab scrolling background',
  },
  {
    slotId: 'lab-hero-001',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7861.JPG`,
    altText: 'Lab hero main',
  },
  {
    slotId: 'lab-hero-002',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7862.JPG`,
    altText: 'Lab hero 2',
  },
  {
    slotId: 'lab-hero-003',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7863.JPG`,
    altText: 'Lab hero 3',
  },
  {
    slotId: 'lab-hero-004',
    imagePath: `${BASE_PATH}/포플 작업사진/1/IMG_7864.JPG`,
    altText: 'Lab hero 4',
  },
  {
    slotId: 'lab-failures-001',
    imagePath: `${BASE_PATH}/포플 작업사진/2/IMG_7922.JPG`,
    altText: 'Lab failures 1',
  },
  {
    slotId: 'lab-failures-002',
    imagePath: `${BASE_PATH}/포플 작업사진/2/IMG_7923.JPG`,
    altText: 'Lab failures 2',
  },
  {
    slotId: 'lab-failures-003',
    imagePath: `${BASE_PATH}/포플 작업사진/2/IMG_7924.JPG`,
    altText: 'Lab failures 3',
  },
  {
    slotId: 'lab-failures-004',
    imagePath: `${BASE_PATH}/포플 작업사진/2/IMG_7925.JPG`,
    altText: 'Lab failures 4',
  },
  {
    slotId: 'lab-method-001',
    imagePath: `${BASE_PATH}/포플 작업사진/2/IMG_7926.JPG`,
    altText: 'Lab method observe',
  },
  {
    slotId: 'lab-method-002',
    imagePath: `${BASE_PATH}/포플 작업사진/2/IMG_7928.JPG`,
    altText: 'Lab method experiment',
  },
  {
    slotId: 'lab-method-003',
    imagePath: `${BASE_PATH}/포플 작업사진/2/IMG_7929.JPG`,
    altText: 'Lab method refine',
  },

  // ==========================================
  // COLLECTION: DECONSTRUCTION (8 slots)
  // Brown draped dress collection
  // ==========================================
  {
    slotId: 'collection-deconstruction-background-001',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_figure_walking_through_overgrown_fields_of_an_abandon_06c5b31a-76f8-48b5-b37a-6cfe1c395cfa_3.png`,
    altText: 'Deconstruction background',
  },
  {
    slotId: 'collection-deconstruction-background-002',
    imagePath: `${BASE_PATH}/sakiyama/qslna_A_mysterious_slender_figure_standing_beneath_massive_el_3e5a22ca-da90-4c43-87a7-9b3733c566f8_0.png`,
    altText: 'Deconstruction scrolling background',
  },
  {
    slotId: 'collection-deconstruction-hero-001',
    imagePath: `${BASE_PATH}/전시포카/1.jpg`,
    altText: 'Deconstruction main look',
  },
  {
    slotId: 'collection-deconstruction-hero-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/2188.jpg`,
    altText: 'Deconstruction detail',
  },
  {
    slotId: 'collection-deconstruction-hero-003',
    imagePath: `${BASE_PATH}/사진 베스트픽/2198.jpg`,
    altText: 'Deconstruction process',
  },
  {
    slotId: 'collection-deconstruction-hero-004',
    imagePath: `${BASE_PATH}/추가사진/IMG_8175.JPG`,
    altText: 'Deconstruction fabric',
  },
  {
    slotId: 'collection-deconstruction-gallery-001',
    imagePath: `${BASE_PATH}/사진 베스트픽/2199.jpg`,
    altText: 'Deconstruction gallery 1',
  },
  {
    slotId: 'collection-deconstruction-gallery-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/2201.jpg`,
    altText: 'Deconstruction gallery 2',
  },

  // ==========================================
  // COLLECTION: FRAGMENTS (8 slots)
  // Blue geometric pattern collection
  // ==========================================
  {
    slotId: 'collection-fragments-background-001',
    imagePath: `${BASE_PATH}/sakiyama/qslna_2D_Japanese_illustration_in_sakiyama8ma_style_flat_colo_3dc18d09-7958-4abb-a5c5-f83f88e38ebc_1.png`,
    altText: 'Fragments background',
  },
  {
    slotId: 'collection-fragments-background-002',
    imagePath: `${BASE_PATH}/sakiyama/qslna_2D_Japanese_illustration_in_sakiyama8ma_style_flat_colo_940abe2f-8307-4021-8b1f-0ef05266827a_1.png`,
    altText: 'Fragments scrolling background',
  },
  {
    slotId: 'collection-fragments-hero-001',
    imagePath: `${BASE_PATH}/전시포카/3.jpg`,
    altText: 'Fragments main look',
  },
  {
    slotId: 'collection-fragments-hero-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/3964.jpg`,
    altText: 'Fragments detail',
  },
  {
    slotId: 'collection-fragments-hero-003',
    imagePath: `${BASE_PATH}/사진 베스트픽/3970.jpg`,
    altText: 'Fragments process',
  },
  {
    slotId: 'collection-fragments-hero-004',
    imagePath: `${BASE_PATH}/추가사진/IMG_8165.JPG`,
    altText: 'Fragments fabric',
  },
  {
    slotId: 'collection-fragments-gallery-001',
    imagePath: `${BASE_PATH}/사진 베스트픽/4006.jpg`,
    altText: 'Fragments gallery 1',
  },
  {
    slotId: 'collection-fragments-gallery-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/4017.jpg`,
    altText: 'Fragments gallery 2',
  },

  // ==========================================
  // COLLECTION: VOID (8 slots)
  // Denim/blue minimal collection
  // ==========================================
  {
    slotId: 'collection-void-background-001',
    imagePath: `${BASE_PATH}/sakiyama/qslna_Black_and_white_ink_illustration_a_figure_standing_with_e77963f2-d18b-40b3-9d8c-4632e9966beb_1.png`,
    altText: 'Void background',
  },
  {
    slotId: 'collection-void-background-002',
    imagePath: `${BASE_PATH}/sakiyama/qslna_Black_and_white_ink_illustration_in_detailed_pen_sketch_09b00e03-f972-4d5c-9fe0-a32d2541abbc_0.png`,
    altText: 'Void scrolling background',
  },
  {
    slotId: 'collection-void-hero-001',
    imagePath: `${BASE_PATH}/전시포카/2.jpg`,
    altText: 'Void main look',
  },
  {
    slotId: 'collection-void-hero-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/2205.jpg`,
    altText: 'Void detail',
  },
  {
    slotId: 'collection-void-hero-003',
    imagePath: `${BASE_PATH}/사진 베스트픽/2221.jpg`,
    altText: 'Void process',
  },
  {
    slotId: 'collection-void-hero-004',
    imagePath: `${BASE_PATH}/추가사진/IMG_8180.JPG`,
    altText: 'Void fabric',
  },
  {
    slotId: 'collection-void-gallery-001',
    imagePath: `${BASE_PATH}/사진 베스트픽/2233.jpg`,
    altText: 'Void gallery 1',
  },
  {
    slotId: 'collection-void-gallery-002',
    imagePath: `${BASE_PATH}/사진 베스트픽/2266.jpg`,
    altText: 'Void gallery 2',
  },

  // ==========================================
  // COLLECTION: ORIGIN (8 slots)
  // White/light deconstructed pieces
  // ==========================================
  {
    slotId: 'collection-origin-background-001',
    imagePath: `${BASE_PATH}/sakiyama/qslna_Hand-drawn_digital_illustration_in_Japanese_manga_art_s_f62f88d4-4012-4078-8926-66d673a3fa42_1.png`,
    altText: 'Origin background',
  },
  {
    slotId: 'collection-origin-background-002',
    imagePath: `${BASE_PATH}/sakiyama/qslna_Japanese_digital_illustration_sakiyama8ma_art_style_2D__7e6344d6-19d0-404b-bf6e-c13466d61808_1.png`,
    altText: 'Origin scrolling background',
  },
  {
    slotId: 'collection-origin-hero-001',
    imagePath: `${BASE_PATH}/전시포카/4.jpg`,
    altText: 'Origin main look',
  },
  {
    slotId: 'collection-origin-hero-002',
    imagePath: `${BASE_PATH}/졸작s1/unnamed (3).jpg`,
    altText: 'Origin detail illustration',
  },
  {
    slotId: 'collection-origin-hero-003',
    imagePath: `${BASE_PATH}/졸작s1/unnamed (4).jpg`,
    altText: 'Origin process illustration',
  },
  {
    slotId: 'collection-origin-hero-004',
    imagePath: `${BASE_PATH}/포플 작업사진/2/IMG_7970.JPG`,
    altText: 'Origin materials',
  },
  {
    slotId: 'collection-origin-gallery-001',
    imagePath: `${BASE_PATH}/전시포카/5.jpg`,
    altText: 'Origin gallery 1',
  },
  {
    slotId: 'collection-origin-gallery-002',
    imagePath: `${BASE_PATH}/전시포카/6.jpg`,
    altText: 'Origin gallery 2',
  },
]

async function uploadImageToSlot(
  slotId: string,
  imagePath: string,
  altText: string
): Promise<boolean> {
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
    if (slot.image?.asset?._ref) {
      console.log(`   ⏭️  Slot already has image: ${slotId}`)
      return false
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
  console.log(`📊 Total images to upload: ${IMAGE_SLOT_MAPPING.length}`)
  console.log('')

  let uploaded = 0
  let skipped = 0
  let errors = 0

  for (const mapping of IMAGE_SLOT_MAPPING) {
    const result = await uploadImageToSlot(
      mapping.slotId,
      mapping.imagePath,
      mapping.altText
    )

    if (result) {
      uploaded++
    } else {
      // Check if it was skipped or errored
      const slot = await client.fetch(
        `*[_type == "slotImage" && slotId == $slotId][0]`,
        { slotId: mapping.slotId }
      )
      if (slot?.image?.asset?._ref) {
        skipped++
      } else {
        errors++
      }
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  console.log('')
  console.log('📈 Upload Summary:')
  console.log(`   ✅ Uploaded: ${uploaded}`)
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
