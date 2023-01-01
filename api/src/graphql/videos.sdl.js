export const schema = gql`
  type Video {
    id: Int!
    title: String!
    description: String!
    author: User
    authorId: Int!
    url: String!
    thumbnail: String
    tags: String!
    published: String!
    views: Int
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type VideosPage {
    videos:[Video!]!
    count:Int!
  }
  type Query {
    videosPage(page: Int): VideosPage @skipAuth
    videosPaged(page: Int): VideosPage @skipAuth
    video(id: Int!): Video @skipAuth
    videoByUser(id: Int!): [Video!]! @skipAuth
    videostag(tag: String!): [Video!]! @skipAuth
    videostagSimilar(tag: String!): [Video!]! @skipAuth
    videostagd(tag: String!): [Video!]! @skipAuth
    videossearch(s: String!): [Video!]! @skipAuth
    videossearchd(s: String!): [Video!]! @skipAuth
    videosAll: [Video!]! @skipAuth
  }

  input CreateVideoInput {
    title: String!
    description: String!
    authorId: Int!
    url: String!
    thumbnail: String
    tags: String!
    published: String!
    views: Int
  }

  input UpdateVideoInput {
    title: String
    description: String
    authorId: Int
    url: String
    thumbnail: String
    tags: String
    published: String
    views: Int
  }

  type Mutation {
    createVideo(input: CreateVideoInput!): Video! @requireAuth
    updateVideo(id: Int!, input: UpdateVideoInput!): Video! @requireAuth
    deleteVideo(id: Int!): Video! @requireAuth
    updateVideoView(id: Int!): Video! @requireAuth
  }
`
