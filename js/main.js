//  Runs after page elements are loaded
var filters = [];
var appliedFilters;
$(document).ready(function()
{
    // Hide graph container and intro
    $('#graph').hide();
    $('#welcome').hide();

    // Create filters
    filters = createFilters();

    // Kick off questions about what the user wants to see
    showIntro();

    // Back arrow
    $('#arrow').on('click', function()
    {
        switchView("welcome");
    });

});

    // Holds JSON data
    var data;

    // Load the data on page load
    loadJSON();

    // Loads the JSON file containing metadata for the datasets
    function loadJSON() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);

                // Featured
                populateFeatured();
            }
        };
        xmlhttp.open("GET", "data/nyc.json", true);
        xmlhttp.send();
    }

    // Will generate a visualization using the ChartJS library given a data set and vis type
    function generateVisualization(dataMeta, dataSet, dataSetParameters) {
        //console.log("Generating a " + visType + " with attributes: " + attributeNames);

        // Create container for this chart
        var containerID = dataMeta.id + getRandomNumber();
        $("#graphContainer").append("<div class=\"chartContainer\"><canvas id=" + containerID + "\></canvas></div>");

        // Decide what type of vis to create depending on the visType parameter for this dataset
        switch (dataMeta.visualizationType) {
            case "bar":
                createBarChart(dataMeta, containerID, dataSet, dataSetParameters);
                break;
        }
    }

    // Loads a dataset (if it exists within the data JSON file) using its API
    function visualize(dataSetParameters)
    {
        // Check if this resource exists
        for (k = 0; k < data.nyc.length; k++)
        {
            var resourceLink = "";
            if (data.nyc[k].id == dataSetParameters.id)
            {
                // Found it
                // Metadata for this data
                var dataMeta = data.nyc[k];

                // Create the API request
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200)
                    {
                        var dataSet = JSON.parse(this.responseText);

                        // Pass this response to the graph generator
                        generateVisualization(dataMeta, dataSet, dataSetParameters)
                    }
                };

                // Build the request to return only the fields/attributes I want
                var attributeFilter = "";
                for (a = 0; a < dataSetParameters.attributes.length; a++)
                {
                    // Do we need to add AND them'?
                    attributeFilter = (a > 0) ? attributeFilter.concat("," + dataSetParameters.attributes[a]) : attributeFilter.concat(dataSetParameters.attributes[a]);
                }

                // Request this dataset along with any attributes I want
                xmlhttp.open("GET", dataMeta.resource + "?$select=" + attributeFilter, true);
                xmlhttp.send();

                // End the loop once dataset is matched
                break;
            }
        }
    }

    // Load the featured section
    function populateFeatured()
    {
        dataGroups.map(function(group)
        {
            if (group.isFeatured)
            {
                // Create and add featured item
                addFeatured(group);
            }
        });
    }

    function addFeatured(group)
    {
        var featuredItem = "<button class='featuredItem' id='" + group.groupID + "'>" + group.name + "</button>";
        $('#featured').append(featuredItem);

        // Add event handler for clicking and displaying group
        $('.featuredItem#' + group.groupID).on('click', function()
        {
            displayGroup(group)
        });
    }

    // First thing shown when user visits apge
    // Ask user what they want to see
    function showIntro()
    {
        // Show welcome screen
        switchView("welcome");

        // Create first filter node
        createFilterNode(filters[0]);
    }

    function createFilterNode(filterItem)
    {
        // Create filter dropdown
        var select = '<select class="filterSelect" id="' + filterItem.id + '"><option value="" selected disabled hidden>Choose</option>' + filterItem.options.map(function(option)
        {
            var option = '<option class="filterOption" value="' + option.id + '">' + option.name + '</option>';
            return option;
        });

        // Show label text
        $('#filtersContainer').append('<div class="filterNodeContainer">' +
            '<h5 class="filterLabel title">' + filterItem.text + '</h5>' +
                select +
            '</div>');

        // Update the filter when something changes
        $('.filterNodeContainer').on('change', '.filterSelect#' + filterItem.id, function(e) {
            updateFilter($(this).attr('id'), this.value);
            var filterItem = getFilterItem($(this).attr('id'));
            showNextFilterNode(filterItem);
        });

    }

    // Object: Filter
    function Filter(id, text)
    {
        this.id = id;
        this.text = text;
        this.nextFilter;
    }
    Filter.prototype.addOptionGroup = function(label, options)
    {
        this.options = options;
    }

    function createFilters()
    {
        // List of filters
        var filters = [];
        appliedFilters = {};

        // Main filter
        let filter_general = new Filter("general", "I want to see");
        filter_general.addOptionGroup("Standardized Tests", [
            {id: "SAT", name: "Scholastic Assessment Test (SAT)"},
            {id: "ACT", name: "American College Test (ACT)"},
            {id: "Test", name: "American College Test (ACT)"},
        ]);
        filter_general.nextFilter = "year";
        filters.push(filter_general); // add to list

        // Year filter
        let filter_year = new Filter("year", "for");

        // Build years list
        var currentYear = new Date().getFullYear();
        var years = [];
        startYear = 2000;
        while (startYear <= currentYear)
        {
            years.push({id: startYear, name: startYear});
            startYear++;
        }
        filter_year.addOptionGroup("Year", years);
        filter_year.nextFilter = "area";
        filters.push(filter_year); // add to list

        // Year filter
        let filter_area = new Filter("area", "in");
        filter_area.addOptionGroup("Year", [
            {id: "Queens", name: "Queens"},
            {id: "Bronx", name: "Bronx"},
            {id: "Staten Island", name: "Staten Island"},
        ]);
        //filter_area.nextFilter = "area";
        filters.push(filter_area); // add to list

        // Return this list
        return filters;

    }

    function updateFilter(filterName, newValue)
    {
        // Update/insert value
        appliedFilters[filterName] = newValue;

        // Update items in results section
        var results = filterResults();

        // Clear div
        $('#resultsContainer').empty();

        // Show results
        results.map(function(group) {
            if (group != null)
            {
                $('#resultsContainer').append('<div class="resultsItem" id="' + group.groupID + '"><h5 class="subtitle">' + group.name + '</h5></div>');

                // Add event handler for clicking and displaying group
                $('.resultsItem#' + group.groupID).on('click', function()
                {
                    displayGroup(group);
                });
            }
        });
    }

    function filterResults()
    {
        var results = dataGroups.map(function(group) {
            var meetsCriteria = true;
            // Check if it matches all categories
            Object.entries(appliedFilters).map(function(filter) {
                if (!group.tags.includes(filter[1]))
                {
                    meetsCriteria = false;
                }
            });
            if (meetsCriteria)
            {
                return group;
            }
        });
        return results;
    }

    function showNextFilterNode(filterItem)
    {
        var nextFilterID = filterItem.nextFilter;
        // Check if next filter exists
        for (p = 0; p < filters.length; p++)
        {
            if (filters[p].id == nextFilterID)
            {
                // Is it already being shown?
                if (!$('#' + nextFilterID).length)
                {
                    // Create and show it
                    createFilterNode(filters[p]);
                    return;
                }
                else
                {
                    //console.log("already exists on page");
                    return;
                }
            }
        }
        //console.log("No next filter or next filter not found...");
    }

    // Find and show related data groups
    function showRelated()
    {
        // Just look at the first 2 tags
        relatedTags = [getActiveDataGroup().tags[0], getActiveDataGroup().tags[1], getActiveDataGroup().tags[2]]
        var related = dataGroups.map(function(group) {
            var meetsCriteria = true;
            relatedTags.map(function(tag)
            {
                if (!group.tags.includes(tag))
                {
                    meetsCriteria = false;
                }
            });
            if (meetsCriteria && !(group === getActiveDataGroup()))
            {
                return group;
            }
        });

        // Show related
        related.map(function(group) {
            if (group != null)
            {
                $('#relatedContainer').append('<div class="relatedItem" id="' + group.groupID + '"><h5 class="subtitle">' + group.name + '</h5></div>');

                // Add event handler for clicking and displaying group
                $('.relatedItem#' + group.groupID).on('click', function()
                {
                    displayGroup(group);
                });
            }
        });
    }


    function switchView(view)
    {
        if (view == "graph")
        {
            $('#welcome').hide();
            $('#graph').show();
        }
        else
        {
            $('#graph').hide();
            $('#welcome').show();
        }
    }


// ----------------------------------------
// Utility methods
// ----------------------------------------
function getRandomNumber()
{
    return Math.floor(Math.random()*(999-100+1)+100);
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

function getFilterItem(itemID)
{
    // Check if next filter exists
    for (i = 0; i < filters.length; i++)
    {
        if (filters[i].id == itemID)
        {
            return filters[i];
        }
    }
}