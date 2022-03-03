Final Project - Interactive Data Visualization  
===

The following is the link to our visualization which is hosted using git gh-pages: https://juniorjedi490.github.io/final/. 

The video for our presentation is in our Git repository in the videos folder (csfinal-Large 540p.mov). It is also available on YouTube at this link: https://youtu.be/RBVVKYBsrto. 

Our data is available in our Git repository. ssv_data.csv is the original data we collected, and data.json is this data in json format. 

Our code is index.html, script.js, style.js, and tojson.R. csv_data.csv, data.json, and data2.json are our data. We use data.json in script.js to create the visualization which appears in/on index.html via the link at the top of the readme. 

In script.js we create arrays using data from data.json that are similar to the json format that the example (https://observablehq.com/@mbostock/hello-cola) that we based on visualization off of uses. A nodes and a links array. We than use d3 to create our visualization.

Our visualization features a node/link graph where each node is a species of generation 1 Pokemon. Each node is colored based on the species’ type, and if the Pokémon has two types, the second type informs the color of the node’s outline stroke color. The size of each node’s radius is scaled based on the sum of the following statistics: base HP, base Attack, base Defense, base Speed, and base Special. Each node has a link to any other node that shares one (or both) of its type(s). This leads to the nodes clustering based on shared types in the visual, making it clear how the original game’s Pokémon selection spreads across the different types.

We have a legend on the right of the visualization which shows what color is associated with each type of Pokemon. 
