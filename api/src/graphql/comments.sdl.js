export const schema = gql`
  type Comment {
    id: Int!
    author: User!
    authorId: Int!
    content: String!
    videoId: Int!
    rating: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type CommentsPage {
    comments:[Comment!]!
    count:Int!
  }

  type Query {
    commentsPage(page: Int , id:Int!): CommentsPage @skipAuth
    comment(id: Int!): Comment @skipAuth
    all(id: Int!): [Comment!]! @skipAuth
    commentsPageAsc(page: Int , id:Int!): CommentsPage @skipAuth
  }

  input CreateCommentInput {
    authorId: Int!
    content: String!
    videoId: Int!
    rating: Int!
  }

  input UpdateCommentInput {
    authorId: Int
    content: String
    videoId: Int
    rating: Int
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: Int!, input: UpdateCommentInput!): Comment! @requireAuth
    deleteComment(id: Int!): Comment! @requireAuth
  }
`
