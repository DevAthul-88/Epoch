import { videos, video, createVideo, updateVideo, deleteVideo } from './videos'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('videos', () => {
  scenario('returns all videos', async (scenario) => {
    const result = await videos()

    expect(result.length).toEqual(Object.keys(scenario.video).length)
  })

  scenario('returns a single video', async (scenario) => {
    const result = await video({ id: scenario.video.one.id })

    expect(result).toEqual(scenario.video.one)
  })

  scenario('creates a video', async (scenario) => {
    const result = await createVideo({
      input: {
        title: 'String',
        description: 'String',
        authorId: scenario.video.two.authorId,
        url: 'String',
        tags: 'String',
        published: 'String',
        updatedAt: '2022-12-13T14:44:05.847Z',
      },
    })

    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.authorId).toEqual(scenario.video.two.authorId)
    expect(result.url).toEqual('String')
    expect(result.tags).toEqual('String')
    expect(result.published).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2022-12-13T14:44:05.847Z'))
  })

  scenario('updates a video', async (scenario) => {
    const original = await video({ id: scenario.video.one.id })
    const result = await updateVideo({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a video', async (scenario) => {
    const original = await deleteVideo({ id: scenario.video.one.id })
    const result = await video({ id: original.id })

    expect(result).toEqual(null)
  })
})
