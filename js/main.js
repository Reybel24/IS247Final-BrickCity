// Holds JSON data
var data;

// Loads the JSON file containing metadata for the datasets
function loadJSON()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
        }
    };
    xmlhttp.open("GET", "data/nyc.json", true);
    xmlhttp.send();
}

// Load the data on page load
loadJSON();

// Will generate a visualization using the D3 library given a data set and vis type
function generateVisualization(dataSet, attributeNames, visType)
{
    console.log("Generating a " + visType + " with attributes: " + attributeNames);

    // Collect all the attributes into seperate lists such as
    // {schoolName1, schoolName2, schoolName3, schoolName4}
    // {schoolScore1, schoolScore2, schoolScore3, schoolScore4}

    // actually, its all already in an array of objects so just feed it into ChartJS
    // feed all atrribute 1
    // feed all atrribute 2


    // Decide what type of vis to create depending on the visType parameter for this dataset
    switch (visType) {
        case "bar":
            createBarChart(dataSet);
            break;
    }
}

// Loads a dataset (if it exists within the data JSON file) using its API
function visualize(dataSetID, dataSetAttributes)
{
    // Check if this resource exists
    for (k=0; k < data.nyc.length; k++)
    {
        var resourceLink = "";
        if (data.nyc[k].id == dataSetID)
        {
            // Found it
            // Metadata for the data
            var dataMeta = data.nyc[k];

            console.log("Found Dataset Name: " + dataMeta.id + ", Name: " + dataMeta.name);

            // Create the API request
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var dataSet = JSON.parse(this.responseText);

                    // Pass this response to the graph generator
                    generateVisualization(dataSet, dataSetAttributes, dataMeta.visualizationType)
                }
            };

            // Build the request to return only the fields/attributes I want
            var attributeFilter = "";
            for (a = 0; a < dataSetAttributes.length; a++)
            {
                // Do we need to add an 'AND'?
                attributeFilter = (a > 0) ? attributeFilter.concat("," + dataSetAttributes[a]) : attributeFilter.concat(dataSetAttributes[a]);
            }
            console.log("Filters: " + attributeFilter);

            // Request this dataset along with any attributes I want
            xmlhttp.open("GET", dataMeta.resource + "?$select=" + attributeFilter, true);
            xmlhttp.send();

            // End the loop once dataset is matched
            break;
        }
    }
}



// -------------------------------
// Visualizations and such below
// -------------------------------

// Basic bar chart
function createBarChart(dataSet)
{
    //console.log("generating a bar chart for you...");
    console.log(dataSet);
}