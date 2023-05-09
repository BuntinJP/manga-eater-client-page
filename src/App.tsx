import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import MainNav from './Components/MainNav';
import ChannelCard from './Components/ChannelCard';
import ServerStateCard from './Components/ServerStateCard';
import DirectoryCard from './Components/DirectoryCard';
import RemoveWarn from './Components/RemoveWarn';
import UrlCard from './Components/UrlCard';
import Loading from './Components/Loading';

const App: React.FC = () => {
  return (
    <div className="App">
      <Loading />
      <RemoveWarn />
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
            <ServerStateCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
