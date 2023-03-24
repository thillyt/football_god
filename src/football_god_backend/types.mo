import List "mo:base/List";
import Map "mo:base/HashMap";
import Principal "mo:base/Principal";

module Types {
    
    public type Error = {
        #NotFound;
        #AlreadyExists;
        #NotAuthorized;
        #NotAllowed;
    };

    public type Season = {
        id : Nat16;
        name : Text;
        year : Nat16;
        gameweeks: List.List<Types.Gameweek>;
    };

    public type Team = {
        id: Nat16;
        name: Text;
    };

    public type Gameweek = {
        id: Nat8;
        number: Nat8;
        status: Nat8; // 0 = Unopened, 1 = Open, 2 = Closed, 3 = Finalised
        fixtures: List.List<Types.Fixture>;
    };

    public type Fixture = {
        id: Nat32;
        seasonId: Nat16;
        gameweekId: Nat8;
        homeTeamId: Nat16;
        awayTeamId: Nat16;
        homeGoals: Nat8;
        awayGoals: Nat8;
        status: Nat8; // 0 = Unplayed, 1 = Active, 2 = Finished
    };

    public type UserPredictions = {
        userId: Principal;
        predictions: List.List<Prediction>;
    };

    public type Prediction = {
        id: Nat32;
        seasonId: Nat16;
        gameWeekId: Nat8;
        fixtureId: Nat16;
        homeGoals: Nat8;
        awayGoals: Nat8;
    };

}
