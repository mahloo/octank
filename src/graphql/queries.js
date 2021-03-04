/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstname
      lastname
      mobil
      claims {
        items {
          id
          name
          description
          date
          oneCar
          driver2
          image
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        mobil
        claims {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getClaim = /* GraphQL */ `
  query GetClaim($id: ID!) {
    getClaim(id: $id) {
      id
      name
      description
      date
      oneCar
      driver2
      image
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listClaims = /* GraphQL */ `
  query ListClaims(
    $filter: ModelClaimFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClaims(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        date
        oneCar
        driver2
        image
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
