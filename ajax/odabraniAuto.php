<?php

require_once("../klase/Baza.php");

$automobili = Baza::odabraniAuto($_POST['id_auto']);

$json = json_encode($automobili, 256);

echo $json;