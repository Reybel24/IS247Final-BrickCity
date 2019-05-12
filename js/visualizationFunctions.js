// ----------------------------------------
// All visualizations
// ----------------------------------------

// Basic bar chart
function createBarChart(dataMeta, containerID, dataSet, dataSetParameters) {

    // Maximum number of items represented on chart
    var maxItems = 50;

    // Map attribute 1
    var attr = '[' + "dataSetParameters.attributes[0]" + ']';
    var labels = dataSet.map(function (e) {
        return eval('e' + attr);
    });

    // Map attribute 2
    attr = '[' + "dataSetParameters.attributes[1]" + ']';
    var attributes = dataSet.map(function (e) {
        return eval('e' + attr);
    });

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