// Use the D3 library to read in samples.json from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Promise Pending
const dataPromise = d3.json(url);
    console.log('Data Promise:', dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Display default plot 
function init() {

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Use D3 to get names and enter into dropdown
  d3.json(url).then((data) => {

    // Create variable for names
    let sample = data.samples;
    let meta_d = data.metadata;

    // Iterate through names and add as an option in the dropdown menu
    data.names.forEach((name) => {
      console.log(name);
      dropdownMenu.append("option").text(name).property("value",name);
    });

    metaData(meta_d[0]);
    barGraph(sample[0]);
    bubbleChart(sample[0]);
    
  });

};

// Function to run data when a selection is chosed
function Change(subjectID) {
  const changedID = sample.find((item) => item.id == subjectID);
  const mDataInfo = meta_d.find((item) => item.id == subjectID)

  metaData(mDataInfo);
  barGraph(changedID);
  bubbleChart(changedID)
}

// Function to bring in metadata information
function metaData(mDataInfo) {

  // Use D3 to retriever all of the Data & filter based on the sample
    metaSelect = d3.select("#sample-metadata").html("");

    // Use Object.entries
    metaSelect.html(
      `id: ${mDataInfo.id} <br>
      ethnicity: ${mDataInfo.ethnicity} <br>
      gender: ${mDataInfo.gender} <br> 
      age: ${mDataInfo.age} <br>
      location: ${mDataInfo.location} <br>
      type: ${mDataInfo.ethnicity} <br>
      freq: ${mDataInfo.wfreq} <br>`
    );
};

// Adding in the function that would display only 10 OTU IDs in the bar chart at a time and creating all the variables needed in the chart

function barGraph(changedID) {
  let x_values = changedID.sample_values.slice(0, 10).reverse();
  let y_values = changedID.otu_ids
      .slice(0, 10)
      .reverse()
      .map((item) => `OTU ${item}`);
  let text = changedID.otu_labels.slice(0,10).reverse();

  // Checking to make sure that everything worked

  console.log(x_values);
  console.log(y_values);
  console.log(text);    

// Assigning all the variables and attributes to the bar chart

  barchart = {
      x: x_values,
      y: y_values,
      text: text,
      type: 'bar',
      orientation: 'h',
  };

// Assiging the bar chart to a variable to reference in the newPlot function

  let chart = [barchart];

// Formatting the bar chart to match references

  let layout = {
      margin: {
          l: 100,
          r: 100,
          t: 0,
          b: 100,
      },
      height: 500,
      width: 600
  };

// Using the Plotly library to create the chart 

  Plotly.newPlot('bar', chart, layout)
}

// Adding in the function that would display the bubble chart and creating all the variables needed in the bubble chart

function bubbleChart(changedID) {
  let x_values2 = changedID.otu_ids;
  let y_values2 = changedID.sample_values;
  let marker_size = changedID.sample_values;
  let color = changedID.otu_ids;
  let text = changedID.otu_labels;

// Assigning all the variables and attributes to the bubble chart

  bubble = {
      x: x_values2,
      y: y_values2,
      text: text,
      mode: 'markers',
      marker: {
          color: color,
          colorscale: 'RdBu',
          size: marker_size
      },
      type: 'Scatter',
  };

// Making sure everything works

  console.log(x_values2);
  console.log(y_values2);
  console.log(marker_size);
  console.log(color);
  console.log(text);

// Assiging the bubble chart to a variable to reference in the newPlot function

  let chart = [bubble];

// Formatting the bubble chart to match references

  let layout = {
      xaxis: {
          title: {text: 'OTU Bubble'},
      },
  };

// Using the Plotly library to create the bubble chart

  Plotly.newPlot('bubble', chart, layout);
}

init();