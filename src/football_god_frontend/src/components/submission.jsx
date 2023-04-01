import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { football_god_backend as football_god_backend_actor } from '../../../declarations/football_god_backend';

const Submission = () => {
  const { userId, seasonId, gameweekNumber } = useParams();
  const [playerName, setDisplayName] = useState('');
  const [season, setSeason] = useState('');
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalFixtures, setTotalFixtures] = useState(0);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetchDisplayName();
    fetchSeason();
  }, []);

  useEffect(() => {
    fetchPredictions();
  }, [season]);

  const fetchDisplayName = async () => {
    const profile = await football_god_backend_actor.getProfile();
    setDisplayName(profile.displayName);
  };

  const fetchSeason = async () => {
    const seasonData = await football_god_backend_actor.getSeasons();
    setSeason(seasonData);
  };
  
  const fetchPredictions = async () => {
    const predictionsData = await football_god_backend_actor.getPredictions(userId, seasonId, gameweekNumber);
    setPredictions(predictionsData);
  };


  const getPredictionStatus = (prediction) => {
    if (!prediction.played) {
      return 'unplayed';
    } else if (prediction.correct) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="mt-4">
            <Card.Header className="text-center">
              <h2>{playerName}'s Submission</h2>
            </Card.Header>
            <Card.Body>
              <p>Season: {season}</p>
              <p>Gameweek: {gameweekNumber}</p>
              <p>
                Total Correct: {totalCorrect} / {totalFixtures}
              </p>
              <ListGroup>
                {predictions.map((prediction) => (
                  <ListGroup.Item key={prediction.id} className={`prediction-${getPredictionStatus(prediction)}`}>
                    <div>{prediction.homeTeam} vs {prediction.awayTeam}</div>
                    <div>Prediction: {prediction.homeGoals} - {prediction.awayGoals}</div>
                    {prediction.played && <div>Actual Score: {prediction.actualHomeGoals} - {prediction.actualAwayGoals}</div>}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Submission;
