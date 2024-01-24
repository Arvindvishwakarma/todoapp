import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { CREATE_TODO } from '../graphql/Mutation'
import { GET_TODO } from '../graphql/Query'

export default function AddTodo() {

    const [createTodo] = useMutation(CREATE_TODO, {
        refetchQueries: [
            GET_TODO
        ]
    })
    const [validated, setValidated] = useState(false);

    const [task, setTask] = useState('')
    const [desc, setDesc] = useState('')

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(false);
            event.preventDefault();
            createTodo({
                variables: {
                    "todoInput": {
                        "task": `${task}`,
                        "desc": `${desc}`,
                        "isComplete": "pending"
                    }
                }
            }).then(() => {
                alert('Task Added!!!')
            })
        }
    };

    return (
        <>
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Task</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                onChange={e => setTask(e.target.value)}
                                value={task}
                            />
                        </Form.Group>
                        {/* <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Decription</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            onChange={e => setDesc(e.target.value)}
                            value={desc}
                        />
                    </Form.Group> */}
                    </Row>
                    <Button type="submit">Add</Button>
                </Form>
            </Container>
        </>
    )
}
