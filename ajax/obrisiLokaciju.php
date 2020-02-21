<?php require_once ('../klase/Baza.php');


    if(isset($_POST['id_lokacije']))
    {
        echo Baza::obrisi_lokaciju($_POST['id_lokacije']);
    }


?>