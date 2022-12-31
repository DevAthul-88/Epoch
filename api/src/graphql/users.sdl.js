export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String
    verified: Boolean!
    about: String
    website: String
    other: String
    avatar: String
    cover: String
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    Video: [Video]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type UsersPage {
    users:[User!]!
    count:Int!
  }

  type Query {
    usersPage(page:Int): UsersPage @skipAuth
    usersPaged(page:Int): UsersPage @skipAuth
    user(id: Int!): User @skipAuth
    usersAll: [User!]! @skipAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    verified: Boolean!
    about: String
    website: String
    other: String
    avatar: String
    cover: String
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    email: String
    name: String
    verified: Boolean
    about: String
    website: String
    other: String
    avatar: String
    cover: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id:Int! , email:String!): User! @requireAuth
    verifyUser(id: Int!): User! @requireAuth
    promoteUser(id: Int!): User! @requireAuth
  }
`
