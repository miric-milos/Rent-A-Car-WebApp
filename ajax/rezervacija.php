<?php
require_once ("../klase/Baza.php");
if (isset($_POST['rezervacija']) && isset($_POST['user']) && isset($_POST['auto'])){
    try{
        $nalog=json_decode($_POST['user'],true);
        $auto=json_decode($_POST['auto'],true);

        $idNaloga=Baza::unesi_nalog($nalog);
        $rezervacija=array_merge(json_decode($_POST['rezervacija'],true),array("id_naloga"=>$idNaloga));
        $idRezerv=Baza::unesi_rezervacije($rezervacija);

        $datoteka=fopen("C:\\xampp\htdocs\PVA\\rezervacije\\idRez_".$idRezerv."_".$nalog['ime']."_".$nalog['prezime']."_".$nalog['dat_rodj'].".txt","a");

        $upis="Rezervacija ( ";
        foreach ($rezervacija as $k => $v){
            $upis.=$k.": ".$v."; ";;
        }
        $upis.=") \nNalog ( ";
        foreach ($nalog as $v){
            $upis.=$k.": ".$v."; ";
        }
        $upis.=")\nAutomobil ( ";
        foreach ($auto as $v){
            $upis.=$k.": ".$v."; ";;
        }
        $upis.=" )\n";


        fwrite($datoteka, $upis);
        fclose($datoteka);

        echo "<h4>Podaci o rezervaciji će biti poslati na:<br><strong>".$nalog['email']."</strong></h4>";
    }
    catch (Exception $e){
        echo $e->getMessage();
    }



}