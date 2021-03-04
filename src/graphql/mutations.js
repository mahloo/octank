/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createClaim = /* GraphQL */ `
  mutation CreateClaim(
    $input: CreateClaimInput!
    $condition: ModelClaimConditionInput
  ) {
    createClaim(input: $input, condition: $condition) {
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
export const updateClaim = /* GraphQL */ `
  mutation UpdateClaim(
    $input: UpdateClaimInput!
    $condition: ModelClaimConditionInput
  ) {
    updateClaim(input: $input, condition: $condition) {
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
export const deleteClaim = /* GraphQL */ `
  mutation DeleteClaim(
    $input: DeleteClaimInput!
    $condition: ModelClaimConditionInput
  ) {
    deleteClaim(input: $input, condition: $condition) {
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
