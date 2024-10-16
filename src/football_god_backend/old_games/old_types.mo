import List "mo:base/List";

module Types {

  public type Error = {
    #NotFound;
    #AlreadyExists;
    #NotAuthorized;
    #NotAllowed;
    #DecodeError;
  };

  public type DataCache = {
    category : Text;
    hash : Text;
  };

  //Original Data Types

  public type Season = {
    id : Nat16;
    name : Text;
    year : Nat16;
    gameweeks : List.List<Types.Gameweek>;
  };

  public type Team = {
    id : Nat16;
    name : Text;
  };

  public type Gameweek = {
    number : Nat8;
    status : Nat8; // 0 = Unopened, 1 = Open, 2 = Closed, 3 = Finalised
    fixtures : List.List<Types.Fixture>;
    fixtureCount : Nat8;
    totalPot : Nat64;
    winningShare : Nat64;
  };

  public type Fixture = {
    id : Nat32;
    homeTeamId : Nat16;
    awayTeamId : Nat16;
    homeGoals : Nat8;
    awayGoals : Nat8;
    status : Nat8; // 0 = Unplayed, 1 = Active, 2 = Finished
  };

  public type Profile = {
    principalName : Text;
    displayName : Text;
    wallet : Text;
    depositAddress : Blob;
    balance : Nat64;
  };

  public type UserGameweek = {
    seasonId : Nat16;
    gameweekNumber : Nat8;
    predictions : List.List<Types.Prediction>;
    enteredSweepstake : Bool;
    correctScores : Nat8;
    predictionCount : Nat8;
    winnings : Nat64;
  };

  public type GameweekSummary = {
    principalName : Text;
    displayName : Text;
  };

  public type Prediction = {
    fixtureId : Nat32;
    homeGoals : Nat8;
    awayGoals : Nat8;
  };

  public type PrincipalName = Text;

  //Types for new betting features

  public type EventId = Nat16;
  public type PlayerId = Nat16;
  public type TeamId = Nat16;
  public type FixtureId = Nat32;

  public type BettingMarket = {
    #CorrectResult;
    #CorrectScore;
    #FirstGoalScorer;
    #AnytimeGoalScorer;
    #Score2OrMore;
    #Score3OrMore;
    #ScoreFreekick;
    #MissPenalty;
    #YellowCard;
    #RedCard;
    #Scorecast;
  };

  //Euro 2024 types

  public type Euro2024Prediction = {
    principalId : PrincipalName;
    entryTime: Int;
    totalScore : Nat16;

    groupAPrediction : PredictionSet;
    groupBPrediction : PredictionSet;
    groupCPrediction : PredictionSet;
    groupDPrediction : PredictionSet;
    groupEPrediction : PredictionSet;
    groupFPrediction : PredictionSet;
    r16Prediction : PredictionSet;
    qfPrediction : PredictionSet;
    sfPrediction : PredictionSet;
    fPrediction : PredictionSet;
  };

  public type PredictionSet = {
    stage : TournamentStage;
    winner : TeamId;
    loser : TeamId;
    goalScorer : PlayerId;
    goalAssister : PlayerId;
    yellowCard : PlayerId;
    redCard : PlayerId;
  };

  public type TournamentStage = {
    #GroupA;
    #GroupB;
    #GroupC;
    #GroupD;
    #GroupE;
    #GroupF;
    #RoundOf16;
    #QuarterFinal;
    #SemiFinal;
    #Final;
  };

  public type InternationalTeam = {
    id : TeamId;
    players : [InternationalPlayer];
    name : Text;
    countryCode : Text;
  };

  public type InternationalPlayer = {
    id : PlayerId;
    firstName : Text;
    lastName : Text;
    position : Position;
    teamId : TeamId;
  };

  public type CountryId = Nat8;

  public type Position = {
    #Goalkeeper;
    #Defender;
    #Midfielder;
    #Forward;
  };

  public type Euro2024Fixture = {
    id : Nat8;
    homeTeamId : TeamId;
    awayTeamId : TeamId;
    homeGoals : Nat8;
    awayGoals : Nat8;
    status : FixtureStatus;
    stage : TournamentStage;
  };

  public type FixtureStatus = {
    #Unplayed;
    #Active;
    #Finished;
  };

  public type Bet = {
    betType : BetType;
    stake : Nat64;
    returns : Nat64;
    status : BetStatus;
  };

  public type BetStatus = {
    #Open;
    #Settled;
    #Void;
  };

  public type BetType = {
    #CorrectResult : CorrectResultOptions;
  };

  public type CorrectResultOptions = {
    #HomeWin;
    #Draw;
    #AwayWin;
  };

  public type EuroProfile = {
    principalName : Text;
    displayName : Text;
    wallet : Text;
    depositAddress : Blob;
    euroPrediction : Euro2024Prediction;
    ogGameweeks : [Types.UserGameweek];
    bets : [Bet];
    termsAccepted : Bool;
  };

  public type Leaderboard = {
    entries : List.List<LeaderboardEntry>;
    totalEntries : Nat;
  };

  public type LeaderboardEntry = {
    principalName : Text;
    position : Nat;
    positionText : Text;
    score: Nat;
  };

  public type Euro2024State = {
    prizePool : Nat64;
    totalManagers : Nat;
    stage : GameState;
  };

  public type Euro2024EventId = Nat;

  public type Euro2024Event = {
    eventId: Nat;
    stage: TournamentStage;
    fixtureId: FixtureId;
    eventType: EventType;
    playerId: PlayerId;
    teamId: TeamId;
  };

  public type GameState = {
    #Selecting;
    #Active;
    #Completed;
  };

  public type EventType = {
    #StageWon;
    #StageLost;
    #GoalScored;
    #GoalAssisted;
    #YellowCard;
    #RedCard;
  };


  //Original OpenFPL Manager Types

  public type SeasonId = Nat16;
  public type GameweekNumber = Nat8;

  public type OpenFPLInfo = {
    principalId: Text;
    username: Text;
  };


    public type OldProfile = {
        principalName: Text;
        displayName: Text;
        icpDepositAddress: Blob;
        fplDepositAddress: Blob;
        termsAccepted: Bool;
        profilePicture: Blob;
        favouriteTeamId: TeamId;
        membershipType: Nat8;
        createDate: Int;
        subscriptionDate: Int;
        reputation: Nat32;
    };

  public type UserFantasyTeam = {
    fantasyTeam : FantasyTeam;
    history : List.List<FantasyTeamSeason>;
  };

  public type FantasyTeamSeason = {
    seasonId : SeasonId;
    totalPoints : Int16;
    gameweeks : List.List<FantasyTeamSnapshot>;
  };

  public type FantasyTeam = {
    principalId : Text;
    teamName : Text;
    favouriteTeamId : TeamId;
    transfersAvailable : Nat8;
    bankBalance : Nat; //Value in £0.25m units
    playerIds : [PlayerId];
    captainId : PlayerId;
    goalGetterGameweek : GameweekNumber;
    goalGetterPlayerId : PlayerId;
    passMasterGameweek : GameweekNumber;
    passMasterPlayerId : PlayerId;
    noEntryGameweek : GameweekNumber;
    noEntryPlayerId : PlayerId;
    teamBoostGameweek : GameweekNumber;
    teamBoostTeamId : TeamId;
    safeHandsGameweek : GameweekNumber;
    safeHandsPlayerId : PlayerId;
    captainFantasticGameweek : GameweekNumber;
    captainFantasticPlayerId : PlayerId;
    braceBonusGameweek : GameweekNumber;
    hatTrickHeroGameweek : GameweekNumber;
  };

  public type FantasyTeamSnapshot = {
    principalId : Text;
    teamName : Text;
    favouriteTeamId : TeamId;
    transfersAvailable : Nat8;
    bankBalance : Nat; //Value in £0.25m units
    playerIds : [PlayerId];
    captainId : Nat16;
    gameweek : GameweekNumber;
    goalGetterGameweek : GameweekNumber;
    goalGetterPlayerId : PlayerId;
    passMasterGameweek : GameweekNumber;
    passMasterPlayerId : PlayerId;
    noEntryGameweek : GameweekNumber;
    noEntryPlayerId : PlayerId;
    teamBoostGameweek : GameweekNumber;
    teamBoostTeamId : TeamId;
    safeHandsGameweek : GameweekNumber;
    safeHandsPlayerId : PlayerId;
    captainFantasticGameweek : GameweekNumber;
    captainFantasticPlayerId : PlayerId;
    braceBonusGameweek : GameweekNumber;
    hatTrickHeroGameweek : GameweekNumber;
    points : Int16;
  };

};
