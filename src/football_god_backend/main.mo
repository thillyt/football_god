import List "mo:base/List";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Types "types";

actor {

  let admins : [Principal] = [
    Principal.fromText("zzlzc-qp3hr-or44h-2ur67-umtpf-66ybr-megk3-qpqq3-icp2x-5c3vd-zqe")
  ];

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
  
  private var seasons = List.nil<Types.Season>();

  var nextId : Nat16 = 1;

  public shared ({caller}) func createSeason(name : Text, year : Nat16) : async Result.Result<(), Types.Error> {
    
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    let id = nextId;
    let newSeason : Types.Season = {
      id = id;
      name = name;
      year = year;
      active = false;
    };
    
    seasons := List.push(newSeason, seasons);
     
    nextId := nextId + 1;
    return #ok(());
  };

   public shared ({caller}) func updateSeason(id : Nat16, newName : Text, newYear : Nat16) : async Result.Result<(), Types.Error> {
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    seasons := List.map<Types.Season, Types.Season>(seasons,
      func (season: Types.Season): Types.Season {
        if (season.id == id) {
          { id = season.id; name = newName; year = newYear; active = season.active }
        } 
        else { season }
      });

    return #ok(());
    
  };

  public shared ({caller}) func deleteSeason(id : Nat16) : async Result.Result<(), Types.Error> {
    let isCallerAdmin = isAdminForCaller(caller);
    if(isCallerAdmin == false){
      return #err(#NotAuthorized);
    };

    seasons := List.filter(seasons, func(season: Types.Season): Bool { season.id != id });
    
    return #ok(());
  };

  public query func getSeasons() : async [Types.Season] {
    return List.toArray(seasons);
  };
  
}
