<?php

require_once("../klase/Baza.php");

$automobili = Baza::izvuci_u_asoc("Automobili", "marka");

$json = json_encode($automobili, 256);

echo $json;
