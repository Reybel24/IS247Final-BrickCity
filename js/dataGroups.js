// This file contains the data visualizations to be generated

// Groups of related visualizations
var dataGroups = [];

// This method displays a specified group of data
function displayGroup(group)
{
    // Show graph view
    switchView("graph");

    // Clear any already displaying groups
    $('#graphContainer').empty();

    // Subtitle / short description
    $('#pageSubtitle').text("test");

    // Generate a visualization for each item in the group
    for (let i=0; i<group.dataSetList.length; i++)
    {
        // Call the visualize function, pass in the data set name and its parameters
        visualize(group.dataSetList[i].id, group.dataSetList[i].attributes);
    }
    //console.log("Sorry, data group not found: " + group.groupID);
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