<?php

require_once "../klase/Baza.php";

if (isset($_POST['id_auto']) && isset($_POST['datumDo']) && isset($_POST['datumOd'])) {

    $id = $_POST['id_auto'];
    $datumOd = $_POST['datumOd'];
    $datumDo = $_POST['datumDo'];
    // objekat koji se vraca na front-end
    $rezultat=null;

    if ($id == "") {
        if ($datumOd != "" && $datumDo != "") {
            // Datumi postavljeni, trazi slobodna vozila
            $rezultat = Baza::izvuci_slobodna_vozila($datumOd, $datumDo);
        } else {
            // Ne postoji ni Id ni datumi, vrati sva vozila
            $rezultat = Baza::izvuci_u_asoc("automobili", "marka");
        }
    } else {
        // Id postoji, pronadji automobil
        $rezultat = Baza::odabraniAuto($id);
        // Ime ove metode nema smisla darkela
    }

    echo json_encode($rezultat, 256);
}
