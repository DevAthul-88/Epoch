import { db } from 'src/lib/db'
const PAGE = 5
export const videos = () => {
  return db.video.findMany({
    where: { published: 'public' },
  })
}
export const videosAll = () => {
  return db.video.findMany({
    where: { published: 'public' },
  })
}


export const videosPage = ({ page = 1 }) => {
  const offset = (page - 1) * PAGE
  return {
    videos: db.video.findMany({
      where: { published: 'public' },
      take: PAGE,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    count: db.video.count(),
  }
}
export const videosPaged = ({ page = 1 }) => {
  const offset = (page - 1) * PAGE
  return {
    videos: db.video.findMany({
      where: { published: 'public' },
      take: PAGE,
      skip: offset,
      orderBy: { createdAt: "asc" },
    }),
    count: db.video.count({
      where: { published: 'public' },
    }),
  }
}
export const videostag = ({ tag }) => {
  return db.video.findMany({
    where: { tags: tag },
    orderBy: { createdAt: "asc" },
  })
}
export const videostagSimilar = ({ tag }) => {
  return db.video.findMany({
    where: { tags: tag },
    take:5,
    orderBy: { createdAt: "asc" },
  })
}
export const videostagd = ({ tag }) => {
  return db.video.findMany({
    where: { tags: tag },
    orderBy: { createdAt: "desc" },
  })
}
export const videossearch = ({ s }) => {
  return db.video.findMany({
    where: {
      title: {
        contains: s,
      },
    },
    orderBy: { createdAt: "asc" },
  })
}
export const videossearchd = ({ s }) => {
  return db.video.findMany({
    where: {
      title: {
        contains: s,
      },
    },
    orderBy: { createdAt: "desc" },
  })
}
export const video = ({ id }) => {
  return db.video.findUnique({
    where: { id },
  })
}
export const videoByUser = ({ id }) => {
  return db.video.findMany({
    where: { authorId: id , published: 'public' },
  })
}
export const updateVideoView = ({ id }) => {
  return db.video.update({
    where: { id },
    data: { views: { increment: 1 } },
  })
}
export const createVideo = ({ input }) => {
  return db.video.create({
    data: input,
  })
}

export const updateVideo = ({ id, input }) => {
  return db.video.update({
    data: input,
    where: { id },
  })
}

export const deleteVideo = ({ id }) => {
  return db.video.delete({
    where: { id },
  })
}

export const Video = {
  author: (_obj, { root }) => {
    return db.video.findUnique({ where: { id: root?.id } }).author()
  },
}
