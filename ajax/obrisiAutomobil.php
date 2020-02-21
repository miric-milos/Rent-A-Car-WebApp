<?php

require_once("..\klase\Baza.php");

if (isset($_POST['id_auto'])) {


    echo Baza::obrisi_auto($_POST['id_auto']);
}