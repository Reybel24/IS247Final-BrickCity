// ----------------------------------------
// This is where we define the data groups
// along with any visualizations inside it
// ----------------------------------------
// The parameters for the data objects are: id, display name, short description, and is featured

// ----------------------------------------
// Data group
// ----------------------------------------
// Student Performance SAT
// This group serves to show student performance on SATs
// for several schools across multiple schools
let studentPerformanceSAT = new DataGroup(
    "studentPerformanceSAT",
    "Student Performance SAT",
    "Compare SAT scores of multiple schools",
    true
);

// Data sets
studentPerformanceSAT.addDataSet("satScores_2012", ["school_name", "sat_math_avg_score"]);
studentPerformanceSAT.addDataSet("satScores_2010", ["school_name", "writing_mean"]);
studentPerformanceSAT.addDataSet("satScores_2015", ["school_name", "writing_mean"]);

// Relevant tags
studentPerformanceSAT.setTags(["SAT", "2012", "2010", "2015"]);

// About
studentPerformanceSAT.longDesc = "Some long description about this data group blah blah blah."

// Add
dataGroups.push(studentPerformanceSAT);



// ----------------------------------------
// Data group
// ----------------------------------------
// Student Performance ACT
// This group serves to show student performance on ACTs
// for several schools across multiple schools
let studentPerformanceACT = new DataGroup(
    "studentPerformanceACT",
    "Student Performance ACT",
    "Compare ACT scores of multiple schools",
    true
);

// Data sets
studentPerformanceACT.addDataSet("satScores_2012", ["school_name", "sat_math_avg_score"]);

// Relevant tags
studentPerformanceSAT.setTags(["SAT", "2012", "2010", "2015"]);
studentPerformanceSAT.longDesc = "Some long description about this data group blah blah blah."

// About
studentPerformanceSAT.longDesc = "Some long description about this data group blah blah blah."

// Add
dataGroups.push(studentPerformanceACT);