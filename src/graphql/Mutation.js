import { gql } from '@apollo/client'

export const CREATE_TODO = gql`
  mutation Mutation($todoInput: todoInput) {
  createTodo(TodoInput: $todoInput) {
    id
  }
}
`
export const DELETE_TODO = gql`
 mutation Mutation($todoId: ID) {
  deleteTodo(todoId: $todoId) {
    id
  }
}
`
export const COMPLETE_TODO = gql`
mutation MarkComplete($todoId: ID) {
  markComplete(todoId: $todoId) {
    id
  }
}
`
