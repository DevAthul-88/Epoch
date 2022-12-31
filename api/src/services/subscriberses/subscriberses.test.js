import {
  subscriberses,
  subscribers,
  createSubscribers,
  updateSubscribers,
  deleteSubscribers,
} from './subscriberses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('subscriberses', () => {
  scenario('returns all subscriberses', async (scenario) => {
    const result = await subscriberses()

    expect(result.length).toEqual(Object.keys(scenario.subscribers).length)
  })

  scenario('returns a single subscribers', async (scenario) => {
    const result = await subscribers({ id: scenario.subscribers.one.id })

    expect(result).toEqual(scenario.subscribers.one)
  })

  scenario('creates a subscribers', async (scenario) => {
    const result = await createSubscribers({
      input: {
        authorId: scenario.subscribers.two.authorId,
        channel: 6803925,
        updatedAt: '2022-12-10T14:17:01.602Z',
      },
    })

    expect(result.authorId).toEqual(scenario.subscribers.two.authorId)
    expect(result.channel).toEqual(6803925)
    expect(result.updatedAt).toEqual(new Date('2022-12-10T14:17:01.602Z'))
  })

  scenario('updates a subscribers', async (scenario) => {
    const original = await subscribers({
      id: scenario.subscribers.one.id,
    })
    const result = await updateSubscribers({
      id: original.id,
      input: { channel: 7799494 },
    })

    expect(result.channel).toEqual(7799494)
  })

  scenario('deletes a subscribers', async (scenario) => {
    const original = await deleteSubscribers({
      id: scenario.subscribers.one.id,
    })
    const result = await subscribers({ id: original.id })

    expect(result).toEqual(null)
  })
})
