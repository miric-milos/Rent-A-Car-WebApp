<?php
require_once("../klase/Baza.php");

$rez=Baza::dohvati_rezervacije();
echo json_encode($rez,256);
