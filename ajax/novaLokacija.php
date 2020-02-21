<?php
    require_once ('../klase/Baza.php');


    if(isset($_POST['lokacija']))
    {
        $lokacija = json_decode($_POST['lokacija'], true);

        echo Baza::unesi_lokaciju($lokacija);
    }
?>