<?php
require_once("../klase/Baza.php");

if(isset($_POST['id_auto'])){
    $rez=Baza::dohvati_datume_rezervacije_za_auto($_POST['id_auto']);
    echo json_encode($rez,256);
}
