import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Col, Button, Card, Container } from 'react-bootstrap';
import TaskComponent from './TaskComponent';

interface BoardSectionProps {
  title: String;
  tasks: Array<Task>;
}

const BoardSection: React.FC<BoardSectionProps> = ({ title, tasks }) => {
  return (
    <>
      <Col md={3} className="d-flex flex-column p-2">
        <div className="board-section-header d-flex flex-row align-items-center">
          <h3 className="me-auto">{title}</h3>
          <FontAwesomeIcon icon={faPlus} style={{ color: '#6f7782' }} />
        </div>
        <Container className="p-0 d-flex flex-column h-100">
          {tasks &&
            tasks.map((task: Task, index: number) => {
              return (
                <TaskComponent
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  id={task.id}
                />
              );
            })}
        </Container>
      </Col>
    </>
  );
};
export default BoardSection;
