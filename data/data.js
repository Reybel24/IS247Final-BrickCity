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
studentPerformanceSAT.addDataSet("satScores_2012", "SAT Scores 2012 (Math)",["school_name", "sat_math_avg_score"]);
studentPerformanceSAT.addDataSet("satScores_2010", "SAT Scores 2010 (Writing)",["school_name", "writing_mean"]);
studentPerformanceSAT.addDataSet("satScores_2015", "SAT Scores 2015 (Writing)",["school_name", "writing_mean"]);
studentPerformanceSAT.addDataSet("satScores_2012", "Number of Test Takers (2012)",["school_name", "num_of_sat_test_takers"]);

// Relevant tags
studentPerformanceSAT.setTags(["SAT", "Queens", "Bronx", "2012", "2010", "2015"]);

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
studentPerformanceACT.addDataSet("satScores_2012","SAT Scores 2012 (Math)",["school_name", "sat_math_avg_score"]);

// Relevant tags
studentPerformanceACT.setTags(["SAT", "2012", "2010", "2015"]);
studentPerformanceACT.longDesc = "Some long description about this data group blah blah blah."

// About
studentPerformanceACT.longDesc = "Some long description about this data group blah blah blah."

// Add
dataGroups.push(studentPerformanceACT);




// ----------------------------------------
// Data group
// ----------------------------------------
// Student Performance SAT
// This group serves to show student performance on SATs
// for several schools across multiple schools
let testGroup = new DataGroup(
    "testGroup",
    "Test Group",
    "Compare SAT scores of multiple schools",
    false
);

// Data sets
testGroup.addDataSet("satScores_2012", "SAT Scores 2012 (Math)", ["school_name", "sat_math_avg_score"]);
testGroup.addDataSet("satScores_2010", "SAT Scores 2012 (Writing)",["school_name", "writing_mean"]);
testGroup.addDataSet("satScores_2015", "SAT Scores 2012 (Writing)",["school_name", "writing_mean"]);

// Relevant tags
testGroup.setTags(["SAT", "Queens", "Bronx", "2012", "2010", "2015"]);

// About
testGroup.longDesc = "Some long description about this data group blah blah blah."

// Add
dataGroups.push(testGroup);
