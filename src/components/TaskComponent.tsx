import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Draggable } from 'react-beautiful-dnd';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const UpdateTaskMutation = gql`
  mutation UpdateTaskMutation(
    $id: String!
    $title: String
    $description: String
    $userId: String
    $status: String
  ) {
    updateTask(
      description: $description
      id: $id
      title: $title
      userId: $userId
      status: $status
    ) {
      id
      title
      description
      status
    }
  }
`;

const DeleteTaskMutation = gql`
  mutation DeleteTaskMutation($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
const TaskComponent: React.FC<Task> = ({
  title,
  description,
  id,
  boardCategory,
  index,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [updateTask, { data, loading, error }] =
    useMutation(UpdateTaskMutation);
  const [deleteTask] = useMutation(DeleteTaskMutation);
  const { data: usersData, loading: usersLoading } = useQuery(AllUsersQuery);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleTaskUpdate = (e: any) => {
    e.preventDefault();
    updateTask({
      variables: {
        title: taskTitle,
        description: taskDescription,
        id: id,
        status: boardCategory,
      },
    });
    handleClose();
  };

  const handleTaskDelete = () => {
    deleteTask({
      variables: {
        id: id,
      },
    });
    handleClose();
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <Card
            className="task-container"
            onClick={() => handleShow()}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card.Body style={{ fontWeight: 'bold' }}>{title}</Card.Body>
            <Card.Body>{description}</Card.Body>
          </Card>
        )}
      </Draggable>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTaskUpdate}>
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
              <Form.Select aria-label="Assign To">
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
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Update
              </Button>
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ padding: '2px' }}
                size="lg"
                onClick={handleTaskDelete}
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskComponent;
