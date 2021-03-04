/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateClaim = /* GraphQL */ `
  subscription OnCreateClaim($owner: String) {
    onCreateClaim(owner: $owner) {
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
export const onUpdateClaim = /* GraphQL */ `
  subscription OnUpdateClaim($owner: String) {
    onUpdateClaim(owner: $owner) {
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
export const onDeleteClaim = /* GraphQL */ `
  subscription OnDeleteClaim($owner: String) {
    onDeleteClaim(owner: $owner) {
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
