import React from 'react';
import '../App.css';

/* Components */
import FilterDirTree from './FilterDirTree';

/* Bootstrap */
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DirectoryCard: React.FC = () => {
  return (
    <>
      <br />
      <Card bg="dark" key="directory-card" text="light">
        <Card.Header>
          <h5>Scraped Directory</h5>
        </Card.Header>
        <Card.Body>
          <FilterDirTree />
        </Card.Body>
        <Card.Footer />
      </Card>
      <br />
    </>
  );
};

export default DirectoryCard;
