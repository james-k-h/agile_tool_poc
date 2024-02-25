import React, { useState } from 'react';
import { Col, Button, Card, Form, Container, Modal } from 'react-bootstrap';
import { gql, useMutation, useQuery } from '@apollo/client';

const AllTasksQuery = gql`
  query {
    tasks {
      id
      title
      description
      status
    }
  }
`;

const AllUsersQuery = gql`
  query {
    users {
      id
      name
    }
  }
`;

const CreateTaskMutation = gql`
  mutation CreateTask(
    $id: String
    $title: String!
    $description: String!
    $status: String!
    $userId: String
  ) {
    createTask(
      id: $id
      title: $title
      description: $description
      status: $status
      userId: $userId
    ) {
      id
      title
      description
      status
    }
  }
`;

const AddTaskModal = ({
  showModal,
  handleClose,
  boardCategory,
}: {
  boardCategory: String;
  showModal: boolean;
  handleClose: () => void;
}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignTo, setAssignTo] = useState('');

  const [createTask, { data, loading, error }] = useMutation(
    CreateTaskMutation,
    {
      onCompleted: (data) => {
        setTaskTitle('');
        setTaskDescription('');
        setAssignTo('');
      },
    }
  );
  const { data: usersData, loading: usersLoading } = useQuery(AllUsersQuery);

  const handleTaskCreate = (e: any) => {
    e.preventDefault();
    createTask({
      variables: {
        title: taskTitle,
        description: taskDescription,
        status: boardCategory,
      },
    });
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleTaskCreate}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              style={{ height: '100px' }}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assign To</Form.Label>
            <Form.Select
              aria-label="Assign To"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
            >
              {usersData &&
                usersData.users.map((user: User) => {
                  return (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;
