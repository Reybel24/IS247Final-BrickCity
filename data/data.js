// ----------------------------------------
// This is where we define the data groups
// along with any visualizations inside it
// ----------------------------------------

// Data Group: Student Performance
// This group serves to show student performance on SATs
// for several schools across multiple schools
let studentPerformanceSAT = new DataGroup(
    "studentPerformanceSAT",
    "Student Performance SAT",
    "Compare SAT scores of multiple schools.",
    true
);
studentPerformanceSAT.addDataSet("satScores_2012", ["school_name", "sat_math_avg_score"]);
studentPerformanceSAT.addDataSet("satScores_2010", ["school_name", "writing_mean"]);
studentPerformanceSAT.addDataSet("satScores_2015", ["school_name", "writing_mean"]);
//studentPerformanceSAT.addDataSet("satScores_2016", ["school_name", "sat_math_avg_score"]);
//studentPerformanceSAT.addDataSet("satScores_2017", ["school_name", "sat_math_avg_score"]);
studentPerformanceSAT.setTags(["SAT", "2012", "2010", "2015"]);
dataGroups.push(studentPerformanceSAT);

// Create a new data group
let studentPerformanceACT = new DataGroup(
    "studentPerformanceACT",
    "Student Performance ACT",
    "Compare ACT scores of multiple schools.",
    true
);
studentPerformanceACT.addDataSet("satScores_2012", ["school_name", "sat_math_avg_score"]);
dataGroups.push(studentPerformanceACT);