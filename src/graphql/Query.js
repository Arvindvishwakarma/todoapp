import { gql } from '@apollo/client';

export const GET_TODO = gql`
query Query {
  getTodo {
    id
    task
    desc
    isComplete
    createDateTime
  }
}
`
