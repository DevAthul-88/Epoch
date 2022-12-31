import { db } from 'src/lib/db'

export const subscriberses = () => {
  return db.subscribers.findMany()
}

export const subscribersCheck = ({ authorId , channel }) => {
  return db.subscribers.findMany({
    where: { authorId: authorId, channel: channel},
  })
}
export const subscribersCount = ({ channel }) => {
  return db.subscribers.findMany({
    where: { channel: channel},
  })
}
export const createSubscribers = ({ input }) => {
  return db.subscribers.create({
    data: input,
  })
}

export const updateSubscribers = ({ id, input }) => {
  return db.subscribers.update({
    data: input,
    where: { authorId: authorId, channel: channel },
  })
}

export const deleteSubscribers = ({id }) => {
  return db.subscribers.delete({
    where: { id },
  })
}

export const Subscribers = {
  author: (_obj, { root }) => {
    return db.subscribers.findUnique({ where: { id: root?.id } }).author()
  },
}
