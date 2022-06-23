<?php

require('connection.php');

$userName = $_GET['userName'];

$query = "INSERT INTO `players` (playerName) VALUES ('$userName')";
$SQL->query($query);

unset($userName);

$SQL->close();
