<?php

require('assets/database/connection.php');
require('assets/database/formhandler.php');

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/styles.css">
    <title>Web Game</title>
</head>
<body>
    <canvas width="1280" height="720" id="canvas">

    </canvas>
    <h2>
        <form method="post">
            <label>Username: </label>
            <input type="text" name="userName" min="1" max="25" required>
            <input type="submit" value="Submit username"> 
        </form>
    </h2>
    <script src="assets/js/index.js"></script>
</body>
</html>