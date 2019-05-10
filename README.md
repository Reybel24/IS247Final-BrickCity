# IS247Final-BrickCity
A data visualization web app
<<<<<<< HEAD
Created by Reybel Candelaria, Tanivrul Islam, Nina LaMastra, D’Andre Williams
=======

<h1>Documentation<h1>

<h4>About the Data</h4>
<p>All of the data about the data (in other words, metadata) is stored in the nyc.json file in json format. All data sets that
are to be used in this project are defined in this file with various attributes including id, name, category, recource (api endpoint), and more.</p>

<h4>Adding a page<h4>
<p>All "pages" are contained inside the dataGroup.js file inside the <i>data</i> folder.
To add a "page" of related data:
<ol>
    <li>Add a new <i>dataGroup</i> object with corresponding parameters. Its parameters are:
        <ul>
            <li>groupID: Must be unique</li>
            <li>name: Name of the data group. Shown on page</li>
            <li>shortDesc: Short description of the group. Shown on page.</li>
            <li>isFeatured: If true, the data group will be shown on the <i>Featured</i> sidebar.</li>
        </ul>
     </li>
     <li>Add datasets to the group
        <ul>
            <li>Using the <i>addDataSet</i> method, add a dataset by ID and define the attributes you want. The ID points to the ID inside the <i>nyc.json</i> file.</li>
        </ul>
     </li>
</ol>