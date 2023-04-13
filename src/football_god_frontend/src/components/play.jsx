import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { football_god_backend as football_god_backend_actor } from '../../../declarations/football_god_backend';
import { Actor } from "@dfinity/agent";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

const Play = () => {
  
  const { authClient } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading Play');
  const [viewData, setViewData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchViewData();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const fetchViewData = async () => {
    const data = await football_god_backend_actor.getPlayDTO();
    setViewData(data);
  };

  const handleChange = (event, fixtureId, team) => {
    setViewData((prevViewData) => {
      const updatedFixtures = prevViewData.fixtures.map((fixture) =>
        fixture.fixtureId === fixtureId
          ? {
              ...fixture,
              [team === "home" ? "homeTeamPrediction" : "awayTeamPrediction"]: parseInt(
                event.target.value
              ),
            }
          : fixture
      );
      return { ...prevViewData, fixtures: updatedFixtures };
    });
  };
  
  
  const incrementScore = (fixtureId, team) => {
    setViewData((prevViewData) => {
      const updatedFixtures = prevViewData.fixtures.map((fixture) =>
        fixture.fixtureId === fixtureId
          ? {
              ...fixture,
              [team === "home" ? "homeTeamPrediction" : "awayTeamPrediction"]:
                fixture[team === "home" ? "homeTeamPrediction" : "awayTeamPrediction"] + 1,
            }
          : fixture
      );
      return { ...prevViewData, fixtures: updatedFixtures };
    });
  };
  
  const decrementScore = (fixtureId, team) => {
    setViewData((prevViewData) => {
      const updatedFixtures = prevViewData.fixtures.map((fixture) =>
        fixture.fixtureId === fixtureId
          ? {
              ...fixture,
              [team === "home" ? "homeTeamPrediction" : "awayTeamPrediction"]:
                Math.max(
                  0,
                  fixture[team === "home" ? "homeTeamPrediction" : "awayTeamPrediction"] - 1
                ),
            }
          : fixture
      );
      return { ...prevViewData, fixtures: updatedFixtures };
    });
  };
  

  const submitScores = async (enterSweepstake) => {
    setLoadingText("Submitting");
    setIsLoading(true);
    const submitPlayDTO = {
      fixtures: viewData.fixtures,
      enterSweepstake,
    };
  
    const identity = authClient.getIdentity();
    Actor.agentOf(football_god_backend_actor).replaceIdentity(identity);
  
    await football_god_backend_actor.submitPlayDTO(submitPlayDTO);
  
    setIsLoading(false);
    navigate(`/view-prediction/${viewData.userId}/${viewData.activeSeasonId}/${viewData.activeGameweekNumber}`);
  };

  return (
    <Container>
      {isLoading ? (
        <div className="customOverlay d-flex flex-column align-items-center justify-content-center">
          <Spinner animation="border" />
          <p className='text-center mt-1'>{loadingText}</p>
        </div>
      ) : (
        <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="mt-4">
            <Card.Header className="text-center">
              <h2>Play</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={(e) => { e.preventDefault(); submitScores(false); }}>
                <Form.Row className="mb-2">
                  <Col xs={4} className="text-center font-weight-bold">
                    Home Score
                  </Col>
                  <Col xs={4} className="text-center font-weight-bold">
                    Fixture
                  </Col>
                  <Col xs={4} className="text-center font-weight-bold">
                    Away Score
                  </Col>
                </Form.Row>
                {viewData.fixtures.map((fixture) => (
                   <Form.Group key={fixture.fixtureId} as={Row} className="mb-3 fixture-row">
                   <Col xs={4} className="text-center button-column">
                     <Form.Group className="w-100 d-flex flex-column">
                       <Button onClick={() => incrementScore(fixture.fixtureId, 'home')} style={{width: '100%', padding: '0', height: '3rem'}}>+</Button>
                       <Form.Control
                         style={{height: '3rem', textAlign: 'center'}}
                         type="number"
                         min="0"
                         placeholder=""
                         value={fixture.homeTeamPrediction}
                         onChange={(event) => handleChange(event, fixture.fixtureId, 'home')}
                         className="d-block mx-auto custom-number-input w-100"
                       />
                       <Button onClick={() => decrementScore(fixture.fixtureId, 'home')} style={{width: '100%', padding: '0', height: '3rem'}}>-</Button>
                     </Form.Group>
                   </Col>
                   <Col xs={4} className="text-center d-flex align-items-center justify-content-center flex-column column-border">
                     <span>{fixture.homeTeamName}</span>
                     <span>vs</span>
                     <span>{fixture.awayTeamName}</span>
                   </Col>
                   <Col xs={4} className="text-center button-column">
                     <Form.Group className="w-100 d-flex flex-column">
                       <Button onClick={() => incrementScore(fixture.fixtureId, 'away')} style={{width: '100%', padding: '0', height: '3rem'}}>+</Button>
                       <Form.Control
                         style={{height: '3rem', textAlign: 'center'}}
                         type="number"
                         min="0"
                         placeholder=""
                         value={fixture.awayTeamPrediction}
                         onChange={(event) => handleChange(event, fixture.fixtureId, 'away')}
                         className="d-block mx-auto custom-number-input w-100"
                       />
                       <Button onClick={() => decrementScore(fixture.fixtureId, 'away')} style={{width: '100%', padding: '0', height: '3rem'}}>-</Button>
                     </Form.Group>
                   </Col>
                 </Form.Group>
                 
                ))}
                <div className="text-center">
                  <Button type="submit" variant="primary">Save Scores</Button>
                  {viewData.sweepstakePaid ? (
                    <p className="mt-2">You have already paid for the sweepstake.</p>
                    ) : (
                    <div className="mt-2">
                      { (Number(viewData.accountBalance) / 1e8) >= 1 ? (
                        <Button variant="success" onClick={() => submitScores(true)}>Save & Enter Sweepstake</Button>
                      ) : (
                        <p>You do not have enough ICP to enter the sweepstake.</p>
                      )}
                      </div>
                    )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        </Row>
      )}

    </Container>
  );
};

export default Play;
