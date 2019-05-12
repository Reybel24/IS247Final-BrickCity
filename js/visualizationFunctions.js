// ----------------------------------------
// All visualizations
// ----------------------------------------

// Basic bar chart
function createBarChart(dataMeta, containerID, dataSet, dataSetParameters)
{
    // Maximum number of items represented on chart
    var maxItems = 100;
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
                        display: false
                    }
                }]
            }
        }
    };
    var chart = new Chart(ctx, config);
}