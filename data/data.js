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
studentPerformanceSAT.setTags(["SAT", "Exam", "Queens", "Bronx", "2012", "2010", "2015"]);

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
studentPerformanceACT.addDataSet("satScores_2012","ACT Scores 2012 (Math)",["school_name", "sat_math_avg_score"]);
studentPerformanceACT.addDataSet("actScores_2013","ACT Scores 2013",["school_name", "critical_reading_mean"]);
studentPerformanceACT.addDataSet("satScores_2012","SAT Scores 2013 (Math)",["school_name", "mathematics_mean"]);
studentPerformanceACT.addDataSet("actScores_2013","ACT Scores 2012",["school_name", "writing_mean"]);

// Relevant tags
studentPerformanceACT.setTags(["ACT", "Exam", "2012", "2010", "2015"]);
studentPerformanceACT.longDesc = "Some long description about this data group blah blah blah."

// About
studentPerformanceACT.longDesc = "Some long description about this data group blah blah blah."

// Add
dataGroups.push(studentPerformanceACT);





// ----------------------------------------
// Data group
// ----------------------------------------
// Student AP Results
// This group serves to show student performance on AP Results
// for several schools across multiple schools
let studentApResults = new DataGroup(
    "studentApResults",
    "AP Results 2012",
    "Compare AP Results of multiple schools",
    true
);

// Data sets
studentApResults.addDataSet("apResults_2012","AP Results 2012",["school_name", "num_of_ap_test_takers"]);
studentApResults.addDataSet("apResults_2012","Number of Exams Taken",["num_of_ap_test_takers", "num_of_ap_total_exams_taken"]);
studentApResults.addDataSet("apResults_2012","Number of Test Takers",["school_name", "num_of_ap_exams_passed"]);
studentApResults.addDataSet("apResults_2012","Number of Test Takers",["school_name", "num_of_ap_test_takers"]);

// Relevant tags
studentApResults.setTags(["AP", "2012", "2010", "2015"]);
// studentApResults.longDesc = "Some long description about this data group blah blah blah."

// About
studentApResults.longDesc = "Some long description about this data group blah blah blah."

// Add
dataGroups.push(studentApResults);




// ----------------------------------------
// Data group
// ----------------------------------------
// Student AP Results
// This group serves to show student performance on AP Results
// for several schools across multiple schools
let classSize = new DataGroup(
    "classSize",
    "Class Size",
    "Compare Class Size of multiple schools",
    true
);

// Data sets
classSize.addDataSet("classSizeB_2015","Class Size Report - Borough Level 2014-2015",["boro", "average_class_size"]);
classSize.addDataSet("classSizeD_2015","Class Size - District Level- (class Size vs Grade Level)",["class_size", "grade_level"]);
classSize.addDataSet("classSizeB_2015","Class Size - Borough Level (Borough vs Grade Level)",["boro", "grade_level"]);
classSize.addDataSet("classSizeD_2015","Class Size - District Level- (# of students vs % of students)",["number_of_students", "percent_of_students_in"]);

// Relevant tags
classSize.setTags(["ClassSize", "2015", "borough", "school"]);
// studentApResults.longDesc = "Some long description about this data group blah blah blah."

// About
classSize.longDesc = "Some long description about this data group blah blah blah."

// Add
dataGroups.push(classSize);




// ----------------------------------------
// Data group
// ----------------------------------------
// Student AP Results
// This group serves to show student performance on AP Results
// for several schools across multiple schools
let schoolProgress = new DataGroup(
    "schoolProgress",
    "School Progress Report",
    "Compare School Progress of multiple schools",
    true
);

// Data sets
schoolProgress.addDataSet("schoolProgress_2008","School Progress 07-08",["_2010_2011_performance_grade", "_2010_2011_overall_score"]);
schoolProgress.addDataSet("schoolProgress_2011","School Progress Report 2010 - 2011",["_2010_2011_overall_grade", "_2010_2011_overall_score"]);

// Relevant tags
schoolProgress.setTags(["ClassSize", "2015", "borough", "school"]);
// studentApResults.longDesc = "Some long description about this data group blah blah blah."

// About
schoolProgress.longDesc = "Some long description about this data group blah blah blah."

// Add
dataGroups.push(schoolProgress);




// ----------------------------------------
// Data group
// ----------------------------------------
// Student Performance ACT
// This group serves to show student performance on ACTs
// for several schools across multiple schools
let studentGradOutcomes = new DataGroup(
    "gradOutcomes",
    "Student Graduate Outcomes",
    "Compare Graduate Outcomes of Demographic Area",
    true
);

// Data sets
studentGradOutcomes.addDataSet("gradOutcomes_2011","Graduation Outcomes 2005-2011",["borough", "demographic"]);
studentGradOutcomes.addDataSet("gradOutcomes_2015","Graduation Outcomes 2005 - 2015",["cohort_year", "demographic"]);
studentGradOutcomes.addDataSet("gradOutcomes_2015","DYCD after-school programs",["program_type", "program"]);

// Relevant tags
studentGradOutcomes.setTags(["gradOutcomes", "2012", "2010", "2015"]);
// studentGradOutcomes.longDesc = "Some long description about this data group blah blah blah."

// About
studentGradOutcomes.longDesc = "Some long description about this data group blah blah blah."

// Add
dataGroups.push(studentGradOutcomes);