import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import MainNav from './Components/MainNav';
import ChannelCard from './Components/ChannelCard';
import OperationCard from './Components/OperationCard';
import DirectoryCard from './Components/DirectoryCard';
const App: React.FC = () => {
  return (
    <div className="App">
      <MainNav version="1.0.0" />
      <Container>
        <Row>
          <Col>
            <DirectoryCard />
          </Col>
          <Col>
            <ChannelCard />
            <br />
            <OperationCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
