import { gql } from "graphql-request";

export const TOKEN_TRANSFERS_QUERY = gql`
  query tokenTransfers(
    $skip: Int
    $first: Int
    $orderBy: Transfer_orderBy
    $orderDirection: OrderDirection
    $where: Transfer_filter
  ) {
    transfers(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      txHash
      value
      timestamp
      token
      from {
        id
      }
      to {
        id
      }
    }
  }
`;

export const USERS_QUERY = gql`
  query users(
    $skip: Int
    $first: Int
    $orderBy: User_orderBy
    $orderDirection: OrderDirection
    $where: User_filter
    $transfersIn_skip: Int
    $transfersIn_first: Int
    $transfersIn_orderBy: Transfer_orderBy
    $transfersIn_orderDirection: OrderDirection
    $transfersIn_where: Transfer_filter
  ) {
    users(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      address
      createdAt
      transfersIn(
        skip: $transfersIn_skip
        first: $transfersIn_first
        orderBy: $transfersIn_orderBy
        orderDirection: $transfersIn_orderDirection
        where: $transfersIn_where
      ) {
        id
        txHash
        value
        timestamp
        token
        from {
          id
        }
        to {
          id
        }
      }
    }
  }
`;
