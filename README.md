<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>

  <h1>CRUD Operation with Node.js and Vue.js</h1>

  <p>This project implements CRUD (Create, Read, Update, Delete) operations using Node.js for the backend and Vue.js for the frontend. Additionally, it utilizes Socket.IO for real-time data extraction.</p>

  <h2>Setup Instructions</h2>

  <h3>Backend Setup</h3>

  <ol>
    <li>Install dependencies by running:</li>
  </ol>

  <pre><code>npm install</code></pre>

  <ol start="2">
    <li>To run the backend server, execute the following command:</li>
  </ol>

  <pre><code>npm run dev</code></pre>

  <ol start="3">
    <li>In the <code>config/config.json</code> file, change the database name:</li>
  </ol>

  <pre><code>{
  "development": {
    "username": "root",
    "password": "root",
    "database": "your_database_name_here",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}</code></pre>

  <p>Replace <code>your_database_name_here</code> with the name of your database.</p>

  <h3>Frontend Setup</h3>

  <ol>
    <li>Install dependencies for Vue.js by running:</li>
  </ol>

  <pre><code>npm install</code></pre>

  <ol start="2">
    <li>To start the Vue.js server, run:</li>
  </ol>

  <pre><code>npm run server</code></pre>

  <h2>Real-Time Data Extraction</h2>

  <p>This project incorporates Socket.IO for real-time data extraction, providing a seamless experience for users interacting with the application.</p>

</body>

</html>
