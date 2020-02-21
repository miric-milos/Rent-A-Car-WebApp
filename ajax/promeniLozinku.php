<?php

require_once "../klase/Baza.php";

if(isset($_POST['stara']) && isset($_POST['nova']) && isset($_POST['korIme'])) {
    $stara = $_POST['stara'];
    $nova = $_POST['nova'];
    $korIme = $_POST['korIme'];

    $rezultat = Baza::promeniLozinku($korIme, $stara, $nova);
    if($rezultat === 1) {
        echo "Lozinka promenjena";
    } else {
        echo "Doslo je do greske, trenutna lozinka nije ispravna";
    }
}