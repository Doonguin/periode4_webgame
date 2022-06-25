<?php

require('connection.php');

if ($_POST) {
    $userName = $_POST['userName'];
    $sessionid = session_id();

    $query = "INSERT INTO `players` (playerName, sessionid) VALUES ('$userName', '$sessionid')";
    $SQL->query($query);

    header("Location: {$_SERVER['PHP_SELF']}", true, 303);
    exit();
}
