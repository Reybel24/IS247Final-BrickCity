// ----------------------------------------
// All visualizations
// ----------------------------------------

// Bar chart - vertical
function createBarChart(dataMeta, containerID, dataSet, dataSetParameters)
{
    // Maximum number of items represented on chart
    var maxItems = 50;
    var count = 0;

    // Create labels, attributes
    var attr0 = dataSetParameters.attributes[0];
    var attr1 = dataSetParameters.attributes[1];
    var labels = [];
    var attributes = [];
    for (let c = 0; c < dataSet.length; c++)
    {
        if (count < maxItems)
        {
            labels.push(dataSet[c][attr0]);
            attributes.push(dataSet[c][attr1]);
            count++;
        }
    }

    // Draw the chart
    var ctx = document.getElementById(containerID).getContext('2d');
    var config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: dataSetParameters.attributes[1],
                data: attributes,
                backgroundColor: 'rgba(0, 119, 204, 0.3)'
            }]
        },
        options:  {
            title: {
                display: true,
                text: dataSetParameters.title,
                fontSize: '19',
                fontColor: 'grey',
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: true
                    }
                }]
            }
        }
    };
    var chart = new Chart(ctx, config);
}

// Bar chart - horizontal
function createHorizontalBarChart(dataMeta, containerID, dataSet, dataSetParameters)
{
    // Maximum number of items represented on chart
    var maxItems = 50;
    var count = 0;

    // Create labels, attributes
    var attr0 = dataSetParameters.attributes[0];
    var attr1 = dataSetParameters.attributes[1];
    var labels = [];
    var attributes = [];
    for (let c = 0; c < dataSet.length; c++)
    {
        if (count < maxItems)
        {
            labels.push(dataSet[c][attr0]);
            attributes.push(dataSet[c][attr1]);
            count++;
        }
    }

    // Draw the chart
    var ctx = document.getElementById(containerID).getContext('2d');
    var config = {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: dataSetParameters.attributes[1],
                data: attributes,
                backgroundColor: 'rgba(0, 119, 204, 0.3)'
            }]
        },
        options:  {
            title: {
                display: true,
                text: dataSetParameters.title,
                fontSize: '19',
                fontColor: 'grey',
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: true
                    }
                }],
                yAxes: [{
                    barPercentage: 1,
                    gridLines: {
                        tickMarkLength: 8
                    }
                }],
            }
        }
    };
    var chart = new Chart(ctx, config);
}


// Line chart
function createLineChart(dataMeta, containerID, dataSet, dataSetParameters)
{
    // Maximum number of items represented on chart
    var maxItems = 50;
    var count = 0;

    // Create labels, attributes
    var attr0 = dataSetParameters.attributes[0];
    var attr1 = dataSetParameters.attributes[1];
    var labels = [];
    var attributes = [];
    for (let c = 0; c < dataSet.length; c++)
    {
        if (count < maxItems)
        {
            if (!labels.includes(dataSet[c][attr0]))
            {
                labels.push(dataSet[c][attr0]);
                attributes.push(dataSet[c][attr1]);
                count++;
            }
        }
    }

    // Draw the chart
    var ctx = document.getElementById(containerID).getContext('2d');
    var config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: dataSetParameters.attributes[1],
                data: attributes,
                backgroundColor: 'rgba(0, 119, 204, 0.3)'
            }]
        },
        options:  {
            title: {
                display: true,
                text: dataSetParameters.title,
                fontSize: '19',
                fontColor: 'grey',
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: true
                    }
                }]
            }
        }
    };
    var chart = new Chart(ctx, config);
}