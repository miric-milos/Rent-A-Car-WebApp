<?php require_once ("../klase/Baza.php");
    $lokacije = Baza::izvuci_u_asoc("lokacije", "adresa");
    $json = json_encode($lokacije);
    echo $json;
?>