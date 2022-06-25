<?php

require('assets/database/connection.php');

session_set_cookie_params(0);
session_start();
$sessionid = session_id();

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
        <?php
        
        $query = "SELECT `playerName`, `sessionid` FROM `players` WHERE `sessionid` = '$sessionid'";
        $result = mysqli_query($SQL, $query);
        $playerstats = mysqli_fetch_array($result);

        if (!$playerstats['sessionid']) {
            echo '  
                <form method="POST">
                    <label>Username: </label>
                    <input type="text" name="userName" min="1" max="25" required>
                    <input type="submit" value="Submit username"> 
                </form>
            ';
        } else if ($playerstats['sessionid'] == $sessionid) {
            echo "Welkom " . $playerstats['playerName'] . " :)";
        }

        ?>
    </h2>
    <script src="assets/js/index.js"></script>
</body>
</html>

<?php

include('assets/database/formhandler.php');

$SQL->close();

?>