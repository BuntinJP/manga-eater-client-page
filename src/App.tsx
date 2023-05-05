import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import MainNav from './Components/MainNav';
import ChannelCard from './Components/ChannelCard';
import OperationCard from './Components/OperationCard';
import DirectoryCard from './Components/DirectoryCard';
import UrlCard from './Components/UrlCard';
import ErrorAlert from './Components/ErrorAlert';
import Loading from './Components/Loading';

const App: React.FC = () => {
  return (
    <div className="App">
      <ErrorAlert />
      <Loading />
      <MainNav version="1.0.0" />
      <Container>
        <br />
        <UrlCard />
        <Row>
          <Col>
            <DirectoryCard />
          </Col>
          <Col>
            <ChannelCard />
            <OperationCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
