import { cmmts, cmmt, createCmmt, updateCmmt, deleteCmmt } from './cmmts'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('cmmts', () => {
  scenario('returns all cmmts', async (scenario) => {
    const result = await cmmts()

    expect(result.length).toEqual(Object.keys(scenario.cmmt).length)
  })

  scenario('returns a single cmmt', async (scenario) => {
    const result = await cmmt({ id: scenario.cmmt.one.id })

    expect(result).toEqual(scenario.cmmt.one)
  })

  scenario('creates a cmmt', async (scenario) => {
    const result = await createCmmt({
      input: {
        content: 'String',
        authorId: scenario.cmmt.two.authorId,
        parentId: scenario.cmmt.two.parentId,
        updatedAt: '2022-12-27T05:44:06.223Z',
      },
    })

    expect(result.content).toEqual('String')
    expect(result.authorId).toEqual(scenario.cmmt.two.authorId)
    expect(result.parentId).toEqual(scenario.cmmt.two.parentId)
    expect(result.updatedAt).toEqual(new Date('2022-12-27T05:44:06.223Z'))
  })

  scenario('updates a cmmt', async (scenario) => {
    const original = await cmmt({ id: scenario.cmmt.one.id })
    const result = await updateCmmt({
      id: original.id,
      input: { content: 'String2' },
    })

    expect(result.content).toEqual('String2')
  })

  scenario('deletes a cmmt', async (scenario) => {
    const original = await deleteCmmt({ id: scenario.cmmt.one.id })
    const result = await cmmt({ id: original.id })

    expect(result).toEqual(null)
  })
})
