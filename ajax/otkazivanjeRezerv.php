<?php
require_once("../klase/Baza.php");

if(isset($_POST['id'])){
    $id=$_POST['id'];
    $rezultat=Baza::otkazi_rezervaciju($id);
    echo $rezultat;
}