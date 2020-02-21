<?php

require_once ("../klase/Baza.php");
if (isset($_POST['automobil'])){
    $automobil=json_decode($_POST['automobil'],true);

    echo Baza::unesi_auto($automobil);
}

?>