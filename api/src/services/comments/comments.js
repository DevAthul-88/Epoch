import { db } from 'src/lib/db'
const PAGE = 5
export const comments = () => {
  return db.comment.findMany()
}
export const commentsPage = ({ page = 1, id }) => {
  const offset = (page - 1) * PAGE
  return {
    comments: db.comment.findMany({
      where: { videoId: id },
      take: PAGE,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    count: db.comment.count({
      where: { videoId: id },
    }),
  }
}
export const commentsPageAsc = ({ page = 1, id }) => {
  const offset = (page - 1) * PAGE
  return {
    comments: db.comment.findMany({
      where: { videoId: id },
      take: PAGE,
      skip: offset,
      orderBy: { createdAt: "asc"},
    }),
    count: db.comment.count({
      where: { videoId: id },
    }),
  }
}
export const comment = () => {
  return db.comment.findUnique({
    where: { videoId: id },
  })
}

export const all = ({ id }) => {
  return db.comment.findMany({
    where: { videoId: id },
  })
}

export const createComment = ({ input }) => {
  return db.comment.create({
    data: input,
  })
}

export const updateComment = ({ id, input }) => {
  return db.comment.update({
    data: input,
    where: { id },
  })
}

export const deleteComment = ({ id }) => {
  return db.comment.delete({
    where: { id },
  })
}

export const Comment = {
  author: (_obj, { root }) => {
    return db.comment.findUnique({ where: { id: root?.id } }).author()
  },
}
