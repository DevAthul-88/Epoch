import { db } from 'src/lib/db'

export const cmmts = ({id}) => {
  return db.cmmt.findMany({
    where: {
      parentId: id,
    }
  })
}

export const cmmt = ({ id }) => {
  return db.cmmt.findUnique({
    where: { id },
  })
}

export const createCmmt = ({ input }) => {
  return db.cmmt.create({
    data: input,
  })
}

export const updateCmmt = ({ id, input }) => {
  return db.cmmt.update({
    data: input,
    where: { id },
  })
}

export const deleteCmmt = ({ id }) => {
  return db.cmmt.delete({
    where: { id },
  })
}

export const Cmmt = {
  author: (_obj, { root }) => {
    return db.cmmt.findUnique({ where: { id: root?.id } }).author()
  },
  children: (_obj, { root }) => {
    return db.cmmt.findUnique({ where: { id: root?.id } }).children()
  },
  parent: (_obj, { root }) => {
    return db.cmmt.findUnique({ where: { id: root?.id } }).parent()
  },
}
