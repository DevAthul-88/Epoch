export const schema = gql`
  type Cmmt {
    id: Int!
    content: String!
    author: User
    authorId: Int!
    children: [Cmmt]!
    parent: Cmmt
    parentId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    cmmtId: Int
  }

  type Query {
    cmmts(id: Int!): [Cmmt!]! @skipAuth
    cmmt(id: Int!): Cmmt @skipAuth
  }

  input CreateCmmtInput {
    content: String!
    authorId: Int!
    parentId: Int!
    cmmtId: Int
  }

  input UpdateCmmtInput {
    content: String
    authorId: Int
    parentId: Int
    cmmtId: Int
  }

  type Mutation {
    createCmmt(input: CreateCmmtInput!): Cmmt! @requireAuth
    updateCmmt(id: Int!, input: UpdateCmmtInput!): Cmmt! @requireAuth
    deleteCmmt(id: Int!): Cmmt! @requireAuth
  }
`
