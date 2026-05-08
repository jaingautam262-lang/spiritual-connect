import Principal "mo:core/Principal";

module {
  /// Valid report types:
  /// "daily-horoscope" | "love-compatibility" | "career" | "financial" |
  /// "marriage" | "health" | "childbirth" | "job-vs-business" |
  /// "personality" | "transit-impact"
  public type ReportType = Text;

  /// A life report request / record.
  public type LifeReport = {
    id : Text;
    userId : Principal;
    reportType : ReportType;
    name : Text;
    dob : Text;
    details : Text;
    status : Text;    // "pending" | "completed"
    content : Text;   // filled by admin when completed
    createdAt : Int;
  };

  /// Public-facing shape returned to callers (no userId leak).
  public type LifeReportPublic = {
    reportType : ReportType;
    name : Text;
    status : Text;
    content : Text;
  };
};
