<?php
require_once ("../klase/Baza.php");

    if(isset($_POST['podaci']) && isset($_POST['akcija']))
    {
        $nalog = json_decode($_POST['podaci'], true);
        echo Baza::obradi_nalog($nalog, $_POST['akcija']);
    }

?>