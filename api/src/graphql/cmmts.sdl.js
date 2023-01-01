export const schema = gql`
  type Cmmt {
    id: Int!
    content: String!
    author: User
    authorId: Int!
    parentId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    cmmts(id: Int!): [Cmmt!]! @skipAuth
    cmmt(id: Int!): Cmmt @skipAuth
  }

  input CreateCmmtInput {
    content: String!
    authorId: Int!
    parentId: Int!
  }

  input UpdateCmmtInput {
    content: String
    authorId: Int
    parentId: Int
  }

  type Mutation {
    createCmmt(input: CreateCmmtInput!): Cmmt! @requireAuth
    updateCmmt(id: Int!, input: UpdateCmmtInput!): Cmmt! @requireAuth
    deleteCmmt(id: Int!): Cmmt! @requireAuth
  }
`
