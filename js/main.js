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
    $('#arrowContainer').on('click', function()
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
    function generateVisualization(dataSetID, dataSet, attributeNames, visType) {
        //console.log("Generating a " + visType + " with attributes: " + attributeNames);

        // Create container for this chart
        $("#graphContainer").append("<div class=\"chartContainer\"><canvas id=" + dataSetID + "\></canvas></div>");

        // Decide what type of vis to create depending on the visType parameter for this dataset
        switch (visType) {
            case "bar":
                createBarChart(dataSetID, dataSet, attributeNames);
                break;
        }
    }

    // Loads a dataset (if it exists within the data JSON file) using its API
    function visualize(dataSetID, dataSetAttributes)
    {
        // Check if this resource exists
        for (k = 0; k < data.nyc.length; k++)
        {
            var resourceLink = "";
            if (data.nyc[k].id == dataSetID)
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
                        generateVisualization(dataSetID, dataSet, dataSetAttributes, dataMeta.visualizationType)
                    }
                };

                // Build the request to return only the fields/attributes I want
                var attributeFilter = "";
                for (a = 0; a < dataSetAttributes.length; a++)
                {
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
        var select = '<select class="filterOptions" id="' + filterItem.id + '">' + filterItem.options.map(function(option) {
            var option = '<option class="filterOption" value="' + option.id + '">' + option.name + '</option>';
            return option;
        });

        // Show label text
        $('#filtersContainer').append('<div class="filterNodeContainer">' +
            '<h5>' + filterItem.text + '</h5>' +
            '<div>' + select + '</div>' +
            '</div>');

        // Update the filter when something changes
        $('.filterNodeContainer').on('change', '.filterOptions#' + filterItem.id, function(e) {
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
            {id: "queens", name: "Queens"},
            {id: "bronx", name: "Bronx"},
            {id: "Test", name: "2018"},
            {id: "Test2", name: "2018"},
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
        $('#results').empty();

        // Show results
        results.map(function(group) {
            if (group != null)
            {
                $('#results').append('<div class="filterItem" id="' + group.groupID + '">' + group.groupID + '</div>');

                // Add event handler for clicking and displaying group
                $('.filterItem#' + group.groupID).on('click', function()
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