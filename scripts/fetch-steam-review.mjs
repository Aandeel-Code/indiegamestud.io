import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appId = '3803180'
const outputPath = path.resolve(__dirname, '../src/data/steamReview.json')

const fallbackReview = {
  appId,
  fetchedAt: null,
  review_score_desc: 'Steam Reviews',
  total_reviews: null,
  total_positive: null,
  total_negative: null,
}

async function readExistingReview() {
  try {
    const existingFile = await readFile(outputPath, 'utf8')
    return JSON.parse(existingFile)
  } catch {
    return fallbackReview
  }
}

async function fetchSteamReview() {
  const url = new URL(`https://store.steampowered.com/appreviews/${appId}`)
  url.searchParams.set('json', '1')
  url.searchParams.set('language', 'all')
  url.searchParams.set('purchase_type', 'steam')
  url.searchParams.set('review_type', 'all')
  url.searchParams.set('num_per_page', '20')
  url.searchParams.set('cursor', '*')

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Steam reviews request failed with ${response.status}`)
  }

  const data = await response.json()
  const summary = data?.query_summary

  if (!summary?.review_score_desc) {
    throw new Error('Steam review summary missing from response')
  }

  return {
    appId,
    fetchedAt: new Date().toISOString(),
    review_score_desc: summary.review_score_desc,
    total_reviews: summary.total_reviews ?? null,
    total_positive: summary.total_positive ?? null,
    total_negative: summary.total_negative ?? null,
  }
}

async function main() {
  await mkdir(path.dirname(outputPath), { recursive: true })

  let nextReview

  try {
    nextReview = await fetchSteamReview()
    console.log(`Fetched Steam review snapshot for app ${appId}.`)
  } catch (error) {
    nextReview = await readExistingReview()
    console.warn(`Using existing Steam review snapshot: ${error.message}`)
  }

  await writeFile(outputPath, `${JSON.stringify(nextReview, null, 2)}\n`, 'utf8')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
