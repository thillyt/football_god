import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { football_god_backend as football_god_backend_actor } from '../../../../../declarations/football_god_backend';
import { Actor } from "@dfinity/agent";
import { AuthContext } from "../../../contexts/AuthContext";

const EditSeasonModal = ({ show, onHide, setIsLoading, editedSeason }) => {

  const { authClient } = useContext(AuthContext);
  const [seasonName, setSeasonName] = useState('');
  const [seasonYear, setSeasonYear] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const identity = authClient.getIdentity();
    Actor.agentOf(football_god_backend_actor).replaceIdentity(identity);
    await football_god_backend_actor.updateSeason(Number(editedSeason.id), seasonName, Number(seasonYear));
    
    onHide();
  };

  return (
    <Modal show={show} onShow={() => { setSeasonName(editedSeason.name); setSeasonYear(editedSeason.year);}} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Season</Modal.Title>
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
                    <Form.Label>Season Year</Form.Label>
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
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSeasonModal;
