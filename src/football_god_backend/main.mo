import List "mo:base/List";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Types "types";
import Seasons "seasons";
import Teams "teams";
import Predictions "predictions";

actor {
  
  let admins : [Principal] = [
    Principal.fromText("zzlzc-qp3hr-or44h-2ur67-umtpf-66ybr-megk3-qpqq3-icp2x-5c3vd-zqe")
  ];

  let seasonInstance = Seasons.Seasons();
  let teamInstance = Teams.Teams();
  let predictionsInstance = Predictions.Predictions();
  
  var homepageSeason : Nat16 = 0;
  var homepageGameweek : Nat8 = 0;


  //admin functions

  private func isAdminForCaller(caller: Principal): Bool {
    //Debug.print(debug_show(caller));
    switch (Array.find<Principal>(admins, func (admin) { admin == caller })) {
      case null { false };
      case _ { true };
    };
  };
  
  public shared query ({caller}) func isAdmin(): async Bool {
    return isAdminForCaller(caller);
  };

  //system state functions

  public shared ({caller}) func setHomepageSeason(seasonId : Nat16) : async Result.Result<(), Types.Error> {
    
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    homepageSeason := seasonId;
    return #ok(());
  };

  public shared ({caller}) func setHomepageGameweek(gameweekNumber : Nat8) : async Result.Result<(), Types.Error> {
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    homepageGameweek := gameweekNumber;
    return #ok(());
  };

  public query func getHomepageSeasonInfo() : async ?Types.Season {
    return seasonInstance.getSeasonInfo(homepageSeason);
  };

  public query func getHomepageGameweekInfo() : async ?Types.Gameweek {
    return seasonInstance.getGameweekInfo(homepageSeason, homepageGameweek);
  };

  //season functions

  public query func getSeasonsInfo() : async [Types.Season] {
    return seasonInstance.getSeasonsInfo();
  };

  public query func getSeasonInfo(seasonId : Nat16) : async ?Types.Season {
    return seasonInstance.getSeasonInfo(seasonId);
  };

  public query func getSeasonWithGameweeksInfo(seasonId : Nat16) : async ?Types.Season {
    return seasonInstance.getSeasonWithGameweeksInfo(seasonId);
  };
  
  public shared ({caller}) func createSeason(name : Text, year : Nat16) : async Result.Result<(), Types.Error> {
    
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    return seasonInstance.createSeason(name, year);
  };

  public shared ({caller}) func updateSeason(id : Nat16, newName : Text, newYear : Nat16) : async Result.Result<(), Types.Error> {
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    return seasonInstance.updateSeason(id, newName, newYear);
  };

  public shared ({caller}) func deleteSeason(id : Nat16) : async Result.Result<(), Types.Error> {
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    return seasonInstance.deleteSeason(id);
  };

  //gameweek functions
  
  public shared ({caller}) func updateGameweekStatus(seasonId : Nat16, gameweekNumber : Nat8, status: Nat8) : async Result.Result<(), Types.Error> {
    
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    return seasonInstance.updateGameweekStatus(seasonId, gameweekNumber, status);
  };

  //fixture functions

  public query func getFixtures(seasonId: Nat16, gameweekNumber: Nat8) : async [Types.Fixture] {
    return seasonInstance.getFixtures(seasonId, gameweekNumber);
  };

  public query func getFixture(seasonId : Nat16, gameweekNumber: Nat8, fixtureId: Nat32) : async ?Types.Fixture {
    return seasonInstance.getFixture(seasonId, gameweekNumber, fixtureId);
  };

  public shared ({caller}) func addFixtureToGameweek(seasonId: Nat16, gameweekNumber: Nat8, homeTeamId: Nat16, awayTeamId: Nat16) : async Result.Result<(), Types.Error> {
    
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    return seasonInstance.addFixtureToGameweek(seasonId, gameweekNumber, homeTeamId, awayTeamId);
  };

  public shared ({caller}) func updateFixture(seasonId: Nat16, gameweekNumber: Nat8, fixtureId: Nat32, homeTeamId: Nat16, awayTeamId: Nat16) : async Result.Result<(), Types.Error> {
    
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    return seasonInstance.updateFixture(seasonId, gameweekNumber, fixtureId, homeTeamId, awayTeamId);
  };

  public shared ({caller}) func deleteFixture(seasonId : Nat16, gameweekNumber: Nat8, fixtureId: Nat32) : async Result.Result<(), Types.Error> {
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    return seasonInstance.deleteFixture(seasonId, gameweekNumber, fixtureId);
  };

  //team functions

  public query func getTeams() : async [Types.Team] {
    return teamInstance.getTeams();
  };

  public shared ({caller}) func createTeam(name : Text) : async Result.Result<(), Types.Error> {
    
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    return teamInstance.createTeam(name);
  };

  public shared ({caller}) func updateTeam(id : Nat16, newName : Text) : async Result.Result<(), Types.Error> {
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    return teamInstance.updateTeam(id, newName);
  };

  public shared ({caller}) func deleteTeam(id : Nat16) : async Result.Result<(), Types.Error> {
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    return teamInstance.deleteTeam(id);
  };

  // ICP pot functions
  public query func getGameweekPot() : async Nat32 {

    //use the current week and season variable to get the pot

    let totalICP : Nat32 = 0;
    return totalICP;
  };

  public shared ({caller}) func submitPredictions(seasonId: Nat16, gameweekNumber: Nat8, predictions: [Types.Prediction]) : async Result.Result<(), Types.Error> {
    assert not Principal.isAnonymous(caller);

    let currentSeason = switch (await getHomepageSeasonInfo()) {  
        case null { return #err(#NotAllowed) };
        case (?season) { season }
    };

    let currentGameweek = switch (await getHomepageGameweekInfo()) {  
        case null { return #err(#NotAllowed) };
        case (?gameweek) { gameweek }
    };

    if(seasonId != currentSeason.id){
      return #err(#NotAllowed);
    };

    if(gameweekNumber != currentGameweek.number){
      return #err(#NotAllowed);
    };

    if(currentGameweek.status != 1){
      return #err(#NotAllowed);
    };

    let principalName = Principal.toText(caller); 
    return predictionsInstance.submitPredictions(principalName, seasonId, gameweekNumber, predictions);
  };
  
}
