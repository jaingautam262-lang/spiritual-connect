import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Types "../types/life_reports";
import LifeReportsLib "../lib/life_reports";

/// Public Life Reports mixin.
/// Receives injected state: lifeReports, lifeReportCounter, isAdminFn.
mixin (
  lifeReports : Map.Map<Text, Types.LifeReport>,
  lifeReportCounter : { var value : Nat },
  isAdminFn : (Principal) -> Bool
) {

  /// Create a life report request for the caller.
  /// Validates reportType against the 10 supported types.
  /// Returns the new report ID.
  /// Requires authenticated (non-anonymous) caller.
  public shared ({ caller }) func createLifeReport(
    reportType : Text,
    name : Text,
    dob : Text,
    details : Text
  ) : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Please log in to create a life report");
    };
    if (not LifeReportsLib.isValidReportType(reportType)) {
      Runtime.trap("Invalid report type: " # reportType);
    };
    let now = Time.now();
    lifeReportCounter.value += 1;
    let reportId = LifeReportsLib.generateId(now, lifeReportCounter.value);
    let report : Types.LifeReport = {
      id = reportId;
      userId = caller;
      reportType;
      name;
      dob;
      details;
      status = "pending";
      content = "";
      createdAt = now;
    };
    LifeReportsLib.storeReport(lifeReports, report);
    reportId;
  };

  /// Retrieve a life report by ID, only if it belongs to the caller.
  /// Returns null if not found or not owned by caller.
  /// Requires authenticated (non-anonymous) caller.
  public query ({ caller }) func getLifeReport(
    reportId : Text
  ) : async ?Types.LifeReportPublic {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Please log in to view your life report");
    };
    LifeReportsLib.getReportForCaller(lifeReports, reportId, caller);
  };

  /// Admin-only: update the status and content of a life report.
  public shared ({ caller }) func updateLifeReport(
    reportId : Text,
    status : Text,
    content : Text
  ) : async () {
    if (not isAdminFn(caller)) {
      Runtime.trap("Unauthorized: Only admins can update life reports");
    };
    switch (lifeReports.get(reportId)) {
      case (null) { Runtime.trap("Life report not found: " # reportId) };
      case (?existing) {
        lifeReports.add(reportId, { existing with status; content });
      };
    };
  };

  /// Admin-only: list all life reports.
  public query ({ caller }) func getAllLifeReports() : async [Types.LifeReport] {
    if (not isAdminFn(caller)) {
      Runtime.trap("Unauthorized: Only admins can list all life reports");
    };
    lifeReports.values().toArray();
  };

};
