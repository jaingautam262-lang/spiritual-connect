import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Types "../types/life_reports";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

module {
  // ── ID generation ────────────────────────────────────────────────────────

  /// Generate a unique report ID from timestamp + counter.
  public func generateId(now : Int, counter : Nat) : Text {
    "LR-" # now.toText() # "-" # counter.toText()
  };

  // ── Storage helpers ───────────────────────────────────────────────────────

  /// Store a new life report.
  public func storeReport(
    reports : Map.Map<Text, Types.LifeReport>,
    report : Types.LifeReport
  ) {
    reports.add(report.id, report);
  };

  /// Retrieve a report only if it belongs to the caller.
  public func getReportForCaller(
    reports : Map.Map<Text, Types.LifeReport>,
    reportId : Text,
    caller : Principal
  ) : ?Types.LifeReportPublic {
    switch (reports.get(reportId)) {
      case (null) { null };
      case (?r) {
        if (Principal.equal(r.userId, caller)) {
          ?{
            reportType = r.reportType;
            name = r.name;
            status = r.status;
            content = r.content;
          }
        } else {
          null
        };
      };
    };
  };

  /// Return all reports for a given user.
  public func getReportsByUser(
    reports : Map.Map<Text, Types.LifeReport>,
    userId : Principal
  ) : [Types.LifeReport] {
    let result = List.empty<Types.LifeReport>();
    for ((_, r) in reports.entries()) {
      if (Principal.equal(r.userId, userId)) { result.add(r) };
    };
    result.toArray();
  };

  // ── Validation ────────────────────────────────────────────────────────────

  /// Validate that reportType is one of the 10 supported types.
  public func isValidReportType(reportType : Text) : Bool {
    let validTypes = [
      "daily-horoscope",
      "love-compatibility",
      "career",
      "financial",
      "marriage",
      "health",
      "childbirth",
      "job-vs-business",
      "personality",
      "transit-impact"
    ];
    validTypes.any(func(t) { t == reportType });
  };
};
