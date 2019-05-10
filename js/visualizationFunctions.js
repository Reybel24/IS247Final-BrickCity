// ----------------------------------------
// All visualizations
// ----------------------------------------

// Basic bar chart
function createBarChart(dataSetID, dataSet, attributeNames) {

    // Map attribute 1
    var attr = '[' + "attributeNames[0]" + ']';
    var labels = dataSet.map(function (e) {
        return eval('e' + attr);
    });

    // Map attribute 2
    attr = '[' + "attributeNames[1]" + ']';
    var attributes = dataSet.map(function (e) {
        return eval('e' + attr);
    });

    // Draw the chart
    var ctx = document.getElementById(dataSetID).getContext('2d');
    var config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: attributeNames[1],
                data: attributes,
                backgroundColor: 'rgba(0, 119, 204, 0.3)'
            }]
        },
        options:  {
            title: {
                display: true,
                text: getName(dataSetID)
            }
        }
    };
    var chart = new Chart(ctx, config);
}