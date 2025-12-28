import { delay, HttpResponse } from "msw"
import type { ApiSchemas } from "../../schema"
import { http } from "../http"

const mockTags: ApiSchemas["Tag"][] = [
  // Artist-inspired Tags
  { id: 1, title: "Travis Scott" },
  { id: 2, title: "Drake" },
  { id: 3, title: "Juice WRLD" },
  { id: 4, title: "Lil Uzi Vert" },
  { id: 5, title: "Metro Boomin" },
  { id: 6, title: "Gunna" },

  // Genre & Mood Tags
  { id: 7, title: "Dark Trap" },
  { id: 8, title: "Melodic" },
  { id: 9, title: "Rage" },
  { id: 10, title: "Lo-fi" },
  { id: 11, title: "Ambient" },
  { id: 12, title: "Hard" },
]

const mockBeats: ApiSchemas["Beat"][] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Astro Thunder",
    bpm: 155,
    available: true,
    tags: [mockTags[0], mockTags[2]], // Travis Scott, Juice WRLD
    fileLink:
      "https://firebasestorage.googleapis.com/v0/b/am-beat-store.appspot.com/o/beats%2FEr6uOR7OANRII5uHziBIY?alt=media&token=a9b05ec5-068c-4d7b-9219-1fdccaeaf787",
  },
  {
    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    title: "God's Plan Vibe",
    bpm: 86,
    available: true,
    tags: [mockTags[1]], // Drake
    fileLink:
      "https://firebasestorage.googleapis.com/v0/b/am-beat-store.appspot.com/o/beats%2FIAd1eGwOEzX3UxI_InxxW?alt=media&token=8edbf0aa-a85a-4237-80ae-7bba937cbf03",
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    title: "Lucid Dreams",
    bpm: 84,
    available: true,
    tags: [mockTags[2]], // Juice WRLD
    fileLink:
      "https://firebasestorage.googleapis.com/v0/b/am-beat-store.appspot.com/o/beats%2F1Uniq3J2aRT0GY45x8cjn?alt=media&token=8bd2e905-707f-4d2c-8c6c-99b1a7c86336",
  },
  {
    id: "8e23409a-41d4-4b1e-8e23-446655440001",
    title: "Eternal Atake",
    bpm: 145,
    available: true,
    tags: [mockTags[3]], // Lil Uzi Vert
    fileLink:
      "https://firebasestorage.googleapis.com/v0/b/am-beat-store.appspot.com/o/beats%2F9rwE_LwGOOo5KVNvmkWOc?alt=media&token=1a12572f-d364-4244-b60c-3db8f0baada7",
  },
  {
    id: "d9b2a1c3-4d5e-6f7g-8h9i-0j1k2l3m4n5o",
    title: "Sicko Mode 2.0",
    bpm: 150,
    available: true,
    tags: [mockTags[0]], // Travis Scott
    fileLink: "https://storage.googleapis.com/beats/sicko-mode.wav",
  },
  {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    title: "Certified Lover",
    bpm: 92,
    available: true,
    tags: [mockTags[1]], // Drake
    fileLink: "https://storage.googleapis.com/beats/certified-lover.wav",
  },
  {
    id: "e5d4c3b2-a1f0-4e9d-8c7b-6a5b4c3d2e1f",
    title: "XO Tour Llif3",
    bpm: 135,
    available: false, // Sold Out
    tags: [mockTags[3]], // Lil Uzi Vert
    fileLink: "https://storage.googleapis.com/beats/xo-tour.wav",
  },
  {
    id: "b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e",
    title: "Legends Never Die",
    bpm: 160,
    available: true,
    tags: [mockTags[2]], // Juice WRLD
    fileLink: "https://storage.googleapis.com/beats/legends.wav",
  },
  {
    id: "c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f",
    title: "Rage in Paris",
    bpm: 142,
    available: true,
    tags: [mockTags[0], mockTags[3]], // Travis, Uzi
    fileLink: "https://storage.googleapis.com/beats/rage.wav",
  },
  {
    id: "d1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a",
    title: "Champagne Poetry",
    bpm: 88,
    available: true,
    tags: [mockTags[1]], // Drake
    fileLink: "https://storage.googleapis.com/beats/poetry.wav",
  },
]

function errorResponse(message: string, code: string, status: number) {
  return HttpResponse.json<ApiSchemas["Error"]>({ message, code }, { status })
}

export const beatsHandlers = [
  http.get("/beats", async ({ request }) => {
    const url = new URL(request.url)

    const page = Number(url.searchParams.get("page") || "1")
    const limit = Number(url.searchParams.get("limit") || "5")
    const search = url.searchParams.get("search")?.toLowerCase()

    await delay()

    let filteredBeats = [...mockBeats]
    if (search) {
      filteredBeats = filteredBeats.filter((beat) =>
        beat.title.toLowerCase().includes(search),
      )
    }

    const totalCount = filteredBeats.length
    const totalPages = Math.ceil(totalCount / limit)
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedList = filteredBeats.slice(start, end)

    return HttpResponse.json<ApiSchemas["BeatsResponse"]>(
      {
        list: paginatedList,
        totalPages: totalPages,
        totalCount: totalCount,
      },
      { status: 200 },
    )
  }),

  // GET /beats/{id} - Get single beat
  http.get("/beats/{id}", async ({ params }) => {
    const { id } = params
    await delay()

    const beat = mockBeats.find((b) => b.id === id)

    if (!beat) {
      return errorResponse("Beat not found", "BEAT_NOT_FOUND", 404)
    }

    return HttpResponse.json<ApiSchemas["Beat"]>(beat, { status: 200 })
  }),
]
