import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from 'react-bootstrap';
import { useAppSelector } from '../store';
import { selectLoad } from './LoadSlice';

interface IMainNav {
  version: string;
}

const MainNav: React.FC<IMainNav> = ({ version }) => {
  const isLoading = useAppSelector(selectLoad);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          Manga Eater Client Page {version}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Stetas: {isLoading ? 'Loading...' : 'Idle'}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
