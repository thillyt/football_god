import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { football_god_backend as football_god_backend_actor } from '../../../declarations/football_god_backend';
import { Actor } from "@dfinity/agent";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Play = () => {
  
  const { authClient } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [activeSeason, setActiveSeason] = useState(null);
  const [activeGameweek, setActiveGameweek] = useState(null);
  const [teams, setTeamsData] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [scores, setScores] = useState({});
  const [hasPaid, setHasPaid] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
      const fetchData = async () => {
        await checkProfile();
        await fetchActiveSeason();
        await fetchActiveGameweek();
      };
      fetchData();
  }, []);

  useEffect(() => {
    if(!activeSeason || !activeGameweek){
      return;
    }
    
    const fetchData = async () => {
      await fetchTeams();
      await fetchFixtures();
      await fetchExistingPredictions();
      setIsLoading(false);
    };
    fetchData();
  }, [activeSeason, activeGameweek]);

  const checkProfile = async () => {
    if(authClient == null){
      return;
    }
    const identity = authClient.getIdentity();
    Actor.agentOf(football_god_backend_actor).replaceIdentity(identity);
    const profile = await football_god_backend_actor.getProfile();
    if(profile == null){
      navigate('/');
    }
  };

  const fetchActiveSeason = async () => {
    const season = await football_god_backend_actor.getActiveSeason();
    setActiveSeason(season[0]);
  };

  const fetchActiveGameweek = async () => {
    const gameweek = await football_god_backend_actor.getActiveGameweek();
    setActiveGameweek(gameweek[0]);
  };
  
  const fetchTeams = async () => {
    const teamsData = await football_god_backend_actor.getTeams();
    setTeamsData(teamsData);
  };

  const fetchFixtures = async () => {
    if (activeSeason && activeGameweek) {
      const fetchedFixtures = await football_god_backend_actor.getFixtures(activeSeason.id, activeGameweek.number);
      setFixtures(fetchedFixtures);
    }
  };

  const fetchExistingPredictions = async () => {
    const identity = authClient.getIdentity();
    Actor.agentOf(football_god_backend_actor).replaceIdentity(identity);
    const fetchedPredictions = await football_god_backend_actor.getPredictions(activeSeason.id, activeGameweek.number);
    const existingScores = fetchedPredictions.reduce((acc, prediction) => {
      acc[prediction.fixtureId] = { home: prediction.homeGoals, away: prediction.awayGoals };
      return acc;
    }, {});
    setScores(existingScores);
    if(existingScores){  
      await checkSweepstakePaid();
    }
  };

  const checkSweepstakePaid = async () => {
    const identity = authClient.getIdentity();
    Actor.agentOf(football_god_backend_actor).replaceIdentity(identity);
    const paid = await football_god_backend_actor.checkSweepstakePaid(Number(activeSeason.id), Number(activeGameweek.number));
    setHasPaid(paid);
    if(!paid){
      await fetchBalance();
    }
  };
  
  const fetchBalance = async () => {
    const identity = authClient.getIdentity();
    Actor.agentOf(football_god_backend_actor).replaceIdentity(identity);
    const userBalance = await football_god_backend_actor.getUserAccountBalance();
    setBalance(userBalance);
  };

  const handleChange = (event, fixtureId, team) => {
    const updatedScores = { ...scores };
    if (!updatedScores[fixtureId]) {
      updatedScores[fixtureId] = {};
    }
    updatedScores[fixtureId][team] = parseInt(event.target.value);
    setScores(updatedScores);
  };
  
  const handlePlayForFreeSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const predictions = Object.entries(scores).map(([fixtureId, score]) => ({
      fixtureId: Number(fixtureId),
      homeGoals: Number(score.home),
      awayGoals: Number(score.away)
    }));

    const identity = authClient.getIdentity();
    Actor.agentOf(football_god_backend_actor).replaceIdentity(identity);
    await football_god_backend_actor.submitPredictions(
      Number(activeSeason.id),
      Number(activeGameweek.number),
      predictions
    );
    setIsLoading(false);
    navigate(`/view-submission/${activeSeason}/${activeGameweek}`);
    
  };

  const handleSweepstakeSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const predictions = Object.entries(scores).map(([fixtureId, score]) => ({
      fixtureId: Number(fixtureId),
      homeGoals: Number(score.home),
      awayGoals: Number(score.away)
    }));

    const identity = authClient.getIdentity();
    Actor.agentOf(football_god_backend_actor).replaceIdentity(identity);
    await football_god_backend_actor.submitPredictions(
      Number(activeSeason.id),
      Number(activeGameweek.number),
      predictions
    );

    await football_god_backend_actor.enterSweepstake(Number(activeSeason.id), Number(activeGameweek.number));
    setIsLoading(false);
    navigate(`/view-submission/${activeSeason}/${activeGameweek}`);
  };

  const getTeamNameById = (teamId) => {
    const team = teams.find((team) => team.id === teamId);
    return team ? team.name : '';
  };
  


  return (
    <Container>
      {isLoading ? (
        <div className="customOverlay">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="mt-4">
            <Card.Header className="text-center">
              <h2>Play</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handlePlayForFreeSubmit}>
                {fixtures.map((fixture) => (
                  <Form.Group key={fixture.id} as={Row} className="mb-3">
                    <Col xs={3}>
                      <Form.Control
                        className="w-100"
                        type="number"
                        min="0"
                        placeholder="Home"
                        value={scores[fixture.id]?.homeGoals}
                        onChange={(event) => handleChange(event, fixture.id, 'home')}
                      />
                    </Col>
                    <Col xs={6} className="text-center">
                      {getTeamNameById(fixture.homeTeamId)} vs {getTeamNameById(fixture.awayTeamId)}
                    </Col>
                    <Col xs={3}>
                      <Form.Control 
                        className="w-100"
                        type="number"
                        min="0"
                        placeholder="Away"
                        value={scores[fixture.id]?.awayGoals}
                        onChange={(event) => handleChange(event, fixture.id, 'away')}
                      />
                    </Col>
                  </Form.Group>
                ))}
                <div className="text-center">
                  <Button type="submit" variant="primary">Save Scores</Button>
                  {hasPaid ? (
                    <p className="mt-2">You have already paid for the sweepstake.</p>
                    ) : (
                    <div className="mt-2">
                      {balance >= 1 ? (
                        <Button variant="success" onClick={handleSweepstakeSubmit}>Save & Enter Sweepstake</Button>
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
