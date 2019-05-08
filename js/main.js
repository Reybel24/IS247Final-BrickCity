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

    // Create container for this chart
    $("#main-container").append("<div class=\"chart-container\"><canvas id=\"myChart\"></canvas></div>");


    // Map attribute 1
    var attr = '[' + "attributeNames[0]" + ']';
    var labels = dataSet.map(function(e)
    {
        //return e.attributeNames[0];
        return eval('e' + attr);
    });
    //console.log("Labels: " + labels);

    // Map attribute 1
    attr = '[' + "attributeNames[1]" + ']';
    var attributes = dataSet.map(function(e)
    {
        //return e.attributeNames[0];
        return eval('e' + attr);
    });

    // Draw the chart
    var ctx = myChart.getContext('2d');
    var config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Graph Line',
                data: attributes,
                backgroundColor: 'rgba(0, 119, 204, 0.3)'
            }]
        }
    };
    var chart = new Chart(ctx, config);

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
            // Metadata for this data
            var dataMeta = data.nyc[k];

            //console.log("Found Dataset Name: " + dataMeta.id + ", Name: " + dataMeta.name);

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
                // Do we need to add AND them'?
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






// ----------------------------------------
// Visualizations and such below
// ----------------------------------------

// Basic bar chart
function createBarChart(dataSet)
{
    //console.log("generating a bar chart for you...");
    //console.log(dataSet);
}