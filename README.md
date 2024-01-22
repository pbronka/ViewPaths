ViewPaths is a data viewer created to assist with longitudinal validation of microsimulation output. 

The project is at a very early stage and not fully functional yet. 

To run ViewPaths:

1. Clone the repository
2. Ensure that you have Python environment set up on your local machine
3. Launch [Dataserver.py](https://github.com/pbronka/phaseD3Visualization/blob/main/dataserver.py)
4. The data viewer can now be accessed through the browser and will visualize data provided in CSV files "Data" subfolder (not on GitHub)

Explanations:
1. dataserver.py sets up a simple application using Flask, which is focused on serving data in JSON format to a front-end that handles the visualization and plotting of graphs.
2. [Index.html](https://github.com/pbronka/phaseD3Visualization/blob/main/templates/index.html) page can be modified to change the elements included in the data viewer, as well as the look and feel of the application.
3. Functionality of various graphs etc. can be changed by modifying files in the js subfolder. 
