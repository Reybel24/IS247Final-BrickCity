$( document ).ready(function() {

    // Button
    $("#testButton").click(function(){
        displayGroup('studentPerformanceSAT');
    });
});

    // Holds JSON data
    var data;

    // Loads the JSON file containing metadata for the datasets
    function loadJSON() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
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
    function generateVisualization(dataSetID, dataSet, attributeNames, visType) {
        //console.log("Generating a " + visType + " with attributes: " + attributeNames);

        // Create container for this chart
        $("#main-container").append("<div class=\"chart-container\"><canvas id=" + dataSetID + "\></canvas></div>");

        // Decide what type of vis to create depending on the visType parameter for this dataset
        switch (visType) {
            case "bar":
                createBarChart(dataSetID, dataSet, attributeNames);
                break;
        }
    }

    // Loads a dataset (if it exists within the data JSON file) using its API
    function visualize(dataSetID, dataSetAttributes) {
        // Check if this resource exists
        for (k = 0; k < data.nyc.length; k++) {
            var resourceLink = "";
            if (data.nyc[k].id == dataSetID) {
                // Found it
                // Metadata for this data
                var dataMeta = data.nyc[k];

                // Create the API request
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var dataSet = JSON.parse(this.responseText);

                        // Pass this response to the graph generator
                        generateVisualization(dataSetID, dataSet, dataSetAttributes, dataMeta.visualizationType)
                    }
                };

                // Build the request to return only the fields/attributes I want
                var attributeFilter = "";
                for (a = 0; a < dataSetAttributes.length; a++) {
                    // Do we need to add AND them'?
                    attributeFilter = (a > 0) ? attributeFilter.concat("," + dataSetAttributes[a]) : attributeFilter.concat(dataSetAttributes[a]);
                }

                // Request this dataset along with any attributes I want
                xmlhttp.open("GET", dataMeta.resource + "?$select=" + attributeFilter, true);
                xmlhttp.send();

                // End the loop once dataset is matched
                break;
            }
        }
    }



// ----------------------------------------
// Getters
// ----------------------------------------
function getName(id)
{
    for (m=0; m<data.nyc.length; m++)
    {
        if (data.nyc[m].id == id)
        {
            return data.nyc[m].name;
        }
    }
    return "DATA NOT FOUND";
}