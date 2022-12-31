export const schema = gql`
  type Subscribers {
    id: Int!
    author: User
    authorId: Int!
    channel: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    subscriberses: [Subscribers!]! @skipAuth
    subscribers(authorId: Int! , channel: Int!): Subscribers @requireAuth
    subscribersCheck(authorId: Int! , channel: Int!): [Subscribers!]! @skipAuth
    subscribersCount(channel: Int!): [Subscribers!]! @skipAuth
  }

  input CreateSubscribersInput {
    authorId: Int!
    channel: Int!
  }

  input UpdateSubscribersInput {
    authorId: Int
    channel: Int
  }

  type Mutation {
    createSubscribers(input: CreateSubscribersInput!): Subscribers! @requireAuth
    updateSubscribers(id: Int!, input: UpdateSubscribersInput!): Subscribers!
      @requireAuth
    deleteSubscribers(id:Int!): Subscribers! @requireAuth
  }
`
