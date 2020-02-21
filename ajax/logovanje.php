<?php
session_start();
require_once ('../klase/Baza.php');

if(isset($_POST['podaci']))
{
    $podaci = json_decode($_POST['podaci'], true);

    $korime = $podaci['korime'];
    $lozinka = $podaci['lozinka'];

    $ulogovan = Baza::uloguj_korisnika($korime, $lozinka);

    if(!$ulogovan)
        echo "false";
    else
        $_SESSION["korisnik"]=serialize($ulogovan);
}