import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Spinner, Dropdown  } from 'react-bootstrap';
import { football_god_backend as football_god_backend_actor } from '../../../../declarations/football_god_backend';
import { Actor } from "@dfinity/agent";
import { AuthContext } from "../../contexts/AuthContext";
import "../../../assets/main.css"; 

const Seasons = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [seasonName, setSeasonName] = useState('');
  const [seasonYear, setSeasonYear] = useState('');
  const [seasonsData, setSeasonsData] = useState([]);

  const { authClient } = useContext(AuthContext);


  const deleteSeason = async (seasonId) => {
    setIsLoading(true);
    const identity = authClient.getIdentity();
    Actor.agentOf(football_god_backend_actor).replaceIdentity(identity);
    await football_god_backend_actor.deleteSeason(seasonId);
    fetchSeasons();
    setIsLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const identity = authClient.getIdentity();
    Actor.agentOf(football_god_backend_actor).replaceIdentity(identity);
    
    const parsedYear = parseInt(seasonYear, 10);
    await football_god_backend_actor.createSeason(seasonName, parsedYear);
    
    fetchSeasons();
    setSeasonName('');
    setSeasonYear('');
    handleClose();
    setIsLoading(false);
  };

  const fetchSeasons = async () => {
    const seasons = await football_god_backend_actor.getSeasons();
    setSeasonsData(seasons);
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

  return (
    <Container>
      {isLoading && (
        <div className="seasonOverlay">
          <Spinner animation="border" />
        </div>
      )}
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Card className="mt-4">
            <Card.Header className="text-center">
              <h2>Seasons</h2>
            </Card.Header>
            <Card.Body>
              <Button variant="primary" className="mb-3" onClick={handleShow}>
                Create New Season
              </Button>
              <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Status</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {seasonsData.map((season) => (
                    <tr key={season.id}>
                      <td>{season.id}</td>
                      <td>{season.name}</td>
                      <td>{season.year}</td>
                      <td>{season.status}</td>
                      <td>
                        <Dropdown alignRight>
                          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Options
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={() => {}}>Edit</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={() => deleteSeason(season.id)}>
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Season</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="seasonName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter season name"
              value={seasonName}
              onChange={(e) => setSeasonName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="seasonYear">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter season year"
              value={seasonYear}
              onChange={(e) => setSeasonYear(e.target.value)}
            />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Seasons;
