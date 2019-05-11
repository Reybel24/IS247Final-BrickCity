// This file contains the data visualizations to be generated

// Groups of related visualizations
var dataGroups = [];

// This method displays a specified group of data
function displayGroup(groupID)
{
    // Show graph view
    switchView("graph");

    // Clear any already displaying groups
    $('#graphContainer').empty();

    // Generate a visualization for each item in the group
    for (i=0; i<dataGroups.length; i++)
    {
        // Lets find the requested data group in our pool of data group objects
        if (dataGroups[i].groupID == groupID)
        {
            // Create a visualization for every data item inside this data group
            for (j=0; j<dataGroups[i].dataSetList.length; j++)
            {
                // Call the visualize function, pass in the data set name and its parameters
                visualize(dataGroups[i].dataSetList[j].id, dataGroups[i].dataSetList[j].attributes);
            }
            // Exit the loop
            return;
        }
    }
    console.log("Sorry, data group not found: " + groupID);
}

function DataGroup(id, name, shortDesc, isFeatured)
{
    // ID of data group
    this.groupID = id;

    // Name (this is what the user will see)
    this.name = name;

    // Short Description
    this.shortDesc = shortDesc;

    this.tags = [];

    // Should this show up on the Featured sidebar?
    this.isFeatured = isFeatured;

    // Hold datasets wanted in this group
    this.dataSetList = [];
}
DataGroup.prototype.addDataSet = function(id, attributes)
{
    this.dataSetList.push({id, attributes});
}
DataGroup.prototype.setTags = function(tags)
{
    this.tags = tags;
}