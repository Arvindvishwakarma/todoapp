import React from 'react'
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import { GET_TODO } from '../graphql/Query'
import { DELETE_TODO, COMPLETE_TODO } from '../graphql/Mutation'
import { useQuery, useMutation } from '@apollo/client';

export default function ShowTask() {

  const { data } = useQuery(GET_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [
      GET_TODO
    ]
  });
  const [completeTodo] = useMutation(COMPLETE_TODO, {
    refetchQueries: [
      GET_TODO
    ]
  });

  function deleteTodoHandel(tId) {
    deleteTodo({
      variables: {
        "todoId": `${tId}`
      }
    })
  }

  function completeHandel(tId) {
    completeTodo({
      variables: {
        "todoId": `${tId}`
      }
    })
  }
  return (
    <Container style={{ marginTop: 20 }}>
      <Row>
        <Col>
          {
            data && data.getTodo.slice().reverse().map(data =>
              <>
                <br />
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    {data.task}
                    <br />
                    <Row>
                      <Col>
                        {
                          data.isComplete === 'pending' ?
                            <Button size="sm" onClick={() => completeHandel(data.id)}>Completed</Button>
                            :
                            <h1 style={{ fontSize: 12, color: '#2ecc71' }}>Completed</h1>
                        }
                      </Col>
                      <Col>
                        <Button size="sm" variant='danger' onClick={() => deleteTodoHandel(data.id)}>Delete</Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </>
            )
          }
        </Col>
      </Row>
    </Container>
  )
}
