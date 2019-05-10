// This file contains the data visualizations to be generated

// Groups of related visualizations
var dataGroups = [];

// This method displays a specified group of data
function displayGroup(groupName)
{
    // Generate a visualization for each item in the group
    for (i=0; i<dataGroups.length; i++)
    {
        // Lets find the requested data group in our pool of data group objects
        if (dataGroups[i].groupID == groupName)
        {
            // Create a visualization for every data item inside this data group
            for (j=0; j<dataGroups[i].dataSetList.length; j++)
            {
                // Call the visualize function, pass in the data set name and its parameters
                visualize(dataGroups[i].dataSetList[j].id, dataGroups[i].dataSetList[j].attributes);
            }
            // Exit the loop
            break;
        }
        else
        {
            console.log("Sorry, data group not found.");
        }
    }
}

function DataGroup(id, name, shortDesc)
{

    // ID of data group
    this.groupID = id;

    // Name (this is what the user will see)
    this.name = name;

    // Short Description
    this.shortDesc = shortDesc;

    // Hold datasets wanted in this group
    this.dataSetList = [];
}
DataGroup.prototype.addDataSet = function(id, attributes)
{
    this.dataSetList.push({id, attributes});
}



// ----------------------------------------
// This is where we define the data groups
// along with any visualizations inside it
// ----------------------------------------

// Data Group: Student Performance
// This group serves to show student performance on SATs
// for several schools across multiple schools
let studentPerformanceSAT = new DataGroup(
    "studentPerformanceSAT",
    "Student Performance",
    "Compare SAT scores of multiple schools.");
studentPerformanceSAT.addDataSet("satScores_2012", ["school_name", "sat_math_avg_score"]);
studentPerformanceSAT.addDataSet("satScores_2010", ["school_name", "writing_mean"]);
//studentPerformanceSAT.addDataSet("satScores_2016", ["school_name", "sat_math_avg_score"]);
//studentPerformanceSAT.addDataSet("satScores_2017", ["school_name", "sat_math_avg_score"]);
dataGroups.push(studentPerformanceSAT);

// Create a new data group
let studentPerformanceACT = new DataGroup(
    "studentPerformanceACT",
    "Student Performance",
    "Compare ACT scores of multiple schools.");
studentPerformanceACT.addDataSet("satScores_2012", ["school_name", "sat_math_avg_score"]);
dataGroups.push(studentPerformanceACT);


