import { db } from 'src/lib/db'


const PAGE = 5
export const users = () => {
  return db.user.findMany()
}
export const usersAll = () => {
  return db.user.findMany()
}
export const usersPage = ({ page = 1 }) => {
  const offset = (page - 1) * PAGE
  return {
    users: db.user.findMany({
      take: PAGE,
      skip: offset,
      orderBy: { createdAt: 'asc' },
    }),
    count: db.user.count(),
  }
}
export const usersPaged = ({ page = 1 }) => {
  const offset = (page - 1) * PAGE
  return {
    users: db.user.findMany({
      take: PAGE,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    count: db.user.count(),
  }
}


export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}
export const verifyUser = ({ id }) => {
  return db.user.update({
    data: { verified: true },
    where: { id },
  })
}
export const promoteUser = ({ id }) => {
  return db.user.update({
    data: { role:"admin" },
    where: { id },
  })
}
export const deleteUser = async ({ id, email }) => {
  await db.user.delete({
    where: { email: email },
  })

  await db.comment.deleteMany({
    where: { authorId: id },
  })

  return db.video.deleteMany({
    where: { authorId: id },
  })
}


export const User = {
  Video: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Video()
  },
}
