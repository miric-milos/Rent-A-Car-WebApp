<?php

class Baza
{
    private static $konekcija;
    private function __construct()
    {}

    private static function dohv_dane_izmedju_datuma($od, $do)
    {
        $rez = [];
        while ($od <= $do) {
            $od += 24 * 60 * 60; // Jedan dan
            array_push($rez, $od);
        }
        return $rez;
    }

    public static function promeniLozinku($korIme, $stara, $nova)
    {
        try {
            self::$konekcija = self::napravi_konekciju();

            $query = "UPDATE nalozi
                    SET password = '$nova'
                    WHERE username = '$korIme' AND password = '$stara'";

            $sql = self::$konekcija->prepare($query);
            $sql->execute();

            self::$konekcija = null;

            if ($sql->rowCount() == 1) {
                return 1;
            } else {
                return -1;
            }

        } catch (Exception $ex) {
            self::$konekcija = null;
            return $ex->getMessage();
        } finally {
            self::$konekcija = null;
        }
    }

    public static function izvuci_slobodna_vozila($datumOd, $datumDo)
    {
        $datumOd = strtotime($datumOd);
        $datumDo = strtotime($datumDo);
        $rezervacije = self::dohvati_rezervacije();
        $automobili = self::izvuci_u_asoc("automobili", "marka");

        // Vozila koja se vracaju
        $rezVozila = [];

        foreach ($automobili as $auto) {
            // Ubaci odmah sva vozila koja nemaju ni jednu rezervaciju
            $brojac = 0;
            foreach ($rezervacije as $rez) {
                if ($rez['id_auto'] != $auto['id_auto']) {
                    $brojac++;
                }
            }
            if ($brojac == count($rezervacije)) {
                array_push($rezVozila, $auto);
            }
        }

        // Dani izmedju dva uneta datuma
        $unetiDani = self::dohv_dane_izmedju_datuma($datumOd, $datumDo);
        foreach ($rezervacije as $rez) {
            $rezDani = self::dohv_dane_izmedju_datuma(strtotime($rez['datum_od']), strtotime($rez['datum_do']));

            $dostupan = true;

            foreach ($unetiDani as $unet) {
                foreach ($rezDani as $rDani) {
                    // Unet datum je sadrzan u datumima rezervacije, auto nije dostupan
                    if ($unet == $rDani) {
                        $dostupan = false;
                    }

                }
            }

            if ($dostupan) {
                foreach ($automobili as $auto) {
                    if ($auto['id_auto'] == $rez['id_auto']) {
                        array_push($rezVozila, $auto);
                        break;
                    }
                }
            }
        }
        return $rezVozila;
    }

    public static function izvuci_u_asoc($klasa, $sort)
    {
        try {
            $konekcija = self::napravi_konekciju();
            $query = "SELECT * FROM $klasa WHERE obrisan = '0' ORDER BY $sort ASC ";
            $rez = $konekcija->query($query);

            $konekcija = null;
            return $rez->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public static function odabraniAuto($id)
    {
        try {
            $konekcija = self::napravi_konekciju();
            $query = "SELECT * FROM automobili WHERE id_auto=$id";
            $rez = $konekcija->query($query);

            $konekcija = null;
            return $rez->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public static function napravi_konekciju()
    {
        $db = new PDO("mysql:host=localhost;dbname=rentacar_final;", "root", "");
        $db->exec("set names utf8");
        return $db;
    }

    public static function unesi_auto($objekat)
    {
        try {
            $konekcija = self::napravi_konekciju();
            $query = "INSERT INTO automobili (model,marka,godiste,kubikaza,karoserija,gorivo,pogon,menjac,broj_vrata,putanja_slike, cena_po_danu) VALUES (:model, :marka, :godiste,:kubikaza,:karoserija,:gorivo,:pogon,:menjac,:broj_vrata,:putanja_slike, :cena_po_danu)";

            $sql = $konekcija->prepare($query);
            $sql->bindParam(":model", $objekat['model']);
            $sql->bindParam(":marka", $objekat['marka']);
            $sql->bindParam(":godiste", $objekat['godiste']);
            $sql->bindParam(":kubikaza", $objekat['kubikaza']);
            $sql->bindParam(":karoserija", $objekat['karoserija']);
            $sql->bindParam(":gorivo", $objekat['gorivo']);
            $sql->bindParam(":pogon", $objekat['pogon']);
            $sql->bindParam(":menjac", $objekat['menjac']);
            $sql->bindParam(":broj_vrata", $objekat['broj_vrata']);
            $sql->bindParam(":putanja_slike", $objekat['putanja_slike']);
            $sql->bindParam(":cena_po_danu", $objekat['cena_po_danu']);

            if (!$sql) {
                return -2;
            }

            $sql->execute();

            $konekcija = null;
            return "Uspešno ste dodali nov auto!";

        } catch (Exception $e) {
            return "Neuspešno dodavanje automobila";
        }
    }

    public static function izmeni_auto($auto)
    {

        try {
            self::$konekcija = self::napravi_konekciju();

            $query = "update automobili set marka = :marka, model = :model, godiste = :godiste, kubikaza = :kubikaza, karoserija = :karoserija, gorivo = :gorivo, pogon = :pogon, menjac = :menjac, broj_vrata = :broj_vrata, putanja_slike = :putanja_slike, cena_po_danu= :cena_po_danu where id_auto = :id_auto;";

            $sql = self::$konekcija->prepare($query);
            $sql->bindParam(":id_auto", $auto['id_auto']);
            $sql->bindParam(":model", $auto['model']);
            $sql->bindParam(":marka", $auto['marka']);
            $sql->bindParam(":godiste", $auto['godiste']);
            $sql->bindParam(":kubikaza", $auto['kubikaza']);
            $sql->bindParam(":karoserija", $auto['karoserija']);
            $sql->bindParam(":gorivo", $auto['gorivo']);
            $sql->bindParam(":pogon", $auto['pogon']);
            $sql->bindParam(":menjac", $auto['menjac']);
            $sql->bindParam(":broj_vrata", $auto['broj_vrata']);
            $sql->bindParam(":putanja_slike", $auto['putanja_slike']);
            $sql->bindParam(":cena_po_danu", $auto['cena_po_danu']);
            $sql->execute();

            self::$konekcija = null;
            return "Uspešno ste sačuvali izmene!";
        } catch (Exception $ex) {
            return "Došlo je do greške prilikom izmene.";
        }
    }

    public static function obrisi_auto($id)
    {

        try {
            self::$konekcija = self::napravi_konekciju();

            $query = "update automobili set obrisan = '1' where id_auto = :id;";

            $sql = self::$konekcija->prepare($query);
            $sql->bindParam(':id', $id);

            $sql->execute();
            self::$konekcija = null;
            return "Uspešno ste obrisali automobil iz sistema!";
        } catch (Exception $e) {
            return "Neuspešno brisanje automobila.";
        }
    }

    public static function unesi_nalog($nalog)
    {
        try {
            $db = self::napravi_konekciju();
            $br_voz = $nalog['br_vozacke'];
            $email = $nalog['email'];
            $ime = $nalog['ime'];
            $prezime = $nalog['prezime'];
            $dat_rodj = $nalog['dat_rodj'];
            $telefon = $nalog['telefon'];
            $korime = $nalog['username'];
            $lozinka = $nalog['password'];
            $sql = $db->prepare("INSERT INTO nalozi (username,password,email_ad,ime,prezime,br_voz_dozvole,dat_rodj,telefon) VALUES (:korime,:lozinka,:email,:ime,:prezime,:br_voz_dozvole,:datRodj,:brTel)");
            $sql->bindParam(":email", $email);
            $sql->bindParam(":ime", $ime);
            $sql->bindParam(":prezime", $prezime);
            $sql->bindParam(":br_voz_dozvole", $br_voz);
            $sql->bindParam(":datRodj", $dat_rodj);
            $sql->bindParam(":brTel", $telefon);
            $sql->bindParam(":korime", $korime);
            $sql->bindParam(":lozinka", $lozinka);
            $sql->execute();
            return $db->lastInsertId();
        } catch (Exception $e) {
            return false;
        } finally {
            $db = null;
        }

        $db = null;
    }

    public static function unesi_rezervacije($rezervacija)
    {
        try {
            $konekcija = self::napravi_konekciju();
            $query = "INSERT INTO rezervacija (id_auto, id_naloga, datum_od, datum_do, cena) VALUES (:id_auto, :id_naloga, :datum_od, :datum_do, :cena)";
            $sql = $konekcija->prepare($query);
            $sql->bindParam(":id_naloga", $rezervacija['id_naloga']);
            $sql->bindParam(":id_auto", $rezervacija['id_auto']);
            $sql->bindParam(":datum_od", $rezervacija['datum_od']);
            $sql->bindParam(":datum_do", $rezervacija['datum_do']);
            $sql->bindParam(":cena", $rezervacija['cena']);
            $sql->execute();
            return "Uspesno ste rezervisali automobil.";
        } catch (Exception $e) {
            $konekcija = null;
            return "Doslo je do greške" . $e->getMessage();
        }
    }

    public static function dohvati_datume_rezervacije_za_auto($idAuto)
    {
        try {
            $db = self::napravi_konekciju();
            $query = "SELECT datum_od, datum_do FROM rezervacija WHERE obrisan='0' AND id_auto= $idAuto";
            $rez = $db->query($query);
            return $rez->fetchAll(PDO::FETCH_ASSOC);

        } catch (Exception $e) {
            return $e->getMessage();
        } finally {$db = null;}

    }

    public static function dohvati_datume_rezervacije()
    {
        try {
            $db = self::napravi_konekciju();
            $query = "SELECT id_auto,datum_od, datum_do FROM rezervacija WHERE obrisan='0'";
            $rez = $db->query($query);
            return $rez->fetchAll(PDO::FETCH_ASSOC);

        } catch (Exception $e) {
            return $e->getMessage();
        } finally {$db = null;}
    }

    public static function dohvati_rezervacije()
    {
        try {
            $db = self::napravi_konekciju();
            $query = "SELECT * FROM rezervacija WHERE obrisan=0;";
            $rez = $db->query($query);
            return $rez->fetchAll(PDO::FETCH_ASSOC);

        } catch (Exception $e) {
            return $e->getMessage();
        } finally {$db = null;}

    }

    public static function dohvati_rezervacije_za_korisnika($idNaloga)
    {
        try {
            $db = self::napravi_konekciju();
            $query = "SELECT * FROM rezervacija WHERE obrisan='0' AND id_naloga=$idNaloga";
            $rez = $db->query($query);
            return $rez->fetchAll(PDO::FETCH_ASSOC);

        } catch (Exception $e) {
            return $e->getMessage();
        } finally {$db = null;}

    }

    public static function unesi_lokaciju($lokacija)
    {
        try
        {
            $konekcija = self::napravi_konekciju();
            $query = "INSERT INTO lokacije (adresa, email, telefon) VALUES (:adresa, :email, :telefon)";
            $sql = $konekcija->prepare($query);
            $sql->bindParam(':adresa', $lokacija['adresa']);
            $sql->bindParam(':email', $lokacija['email']);
            $sql->bindParam(':telefon', $lokacija['telefon']);
            $sql->execute();
            $konekcija = null;
            return "Uspesno ste uneli lokaciju!";
        } catch (Exception $e) {
            $konekcija = null;
            return "Doslo je do greske\r\n" . $e->getMessage();
        } finally {$konekcija = null;}

    }

    public static function izmeni_lokaciju($lokacija)
    {
        try {
            self::$konekcija = self::napravi_konekciju();
            $query = "UPDATE lokacije
                        SET adresa = :adresa, email = :email, telefon = :telefon
                        WHERE id_lokacije = :id";

            $sql = self::$konekcija->prepare($query);
            $sql->bindParam(':adresa', $lokacija['adresa']);
            $sql->bindParam(':email', $lokacija['email']);
            $sql->bindParam(':telefon', $lokacija['telefon']);
            $sql->bindParam(':id', $lokacija['id_lokacije']);
            $sql->execute();
            self::$konekcija = null;
            return "Uspesno izmenjena lokacija";
        } catch (Exception $e) {
            self::$konekcija = null;
            return "Doslo je do greske\r\n" . $e->getMessage();
        } finally {self::$konekcija = null;}
    }

    public static function obrisi_lokaciju($id)
    {
        try {
            self::$konekcija = self::napravi_konekciju();
            $query = "UPDATE lokacije SET obrisan = '1' WHERE id_lokacije = :id;";
            $sql = self::$konekcija->prepare($query);
            $sql->bindParam(':id', $id);
            $sql->execute();
            self::$konekcija = null;

            return "Uspesno obrisana lokacija";
        } catch (Exception $e) {
            self::$konekcija = null;
            return "Doslo je do greske\r\n" . $e->getMessage();
        } finally {self::$konekcija = null;}
    }

    public static function uloguj_korisnika($korime, $lozinka)
    {
        try {
            self::$konekcija = self::napravi_konekciju();
            $query = "SELECT * FROM nalozi WHERE obrisan='0' AND username = :username AND password = :password;";
            $sql = self::$konekcija->prepare($query);

            $sql->bindParam(':username', $korime);
            $sql->bindParam(':password', $lozinka);
            $sql->execute();

            if ($sql->rowCount() < 1) {
                return false;
            }

            return $sql->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            self::$konekcija = null;
            return false;
        } finally {self::$konekcija = null;}
    }

    public static function obradi_nalog($nalog, $akcija)
    {
        $query = "";
        switch ($akcija) {
            case "dodaj":{
                    $query = "INSERT INTO nalozi (status,username, password, ime, prezime, email_ad, dat_rodj, telefon) VALUES(:status, :username, :password, :ime, :prezime, :email_ad, :dat_rodj, :telefon)";
                    break;
                }

            case "izmeni":{
                    $query = "UPDATE nalozi SET status= :status, username = :username, password = :password, ime = :ime, prezime = :prezime, email_ad = :email_ad, dat_rodj = :dat_rodj, telefon = :telefon WHERE id_naloga = " . $nalog['id_naloga'] . ";";
                    break;
                }

            case "obrisi":{
                    $query = "UPDATE nalozi SET obrisan = '1' WHERE id_naloga = " . $nalog['id_naloga'] . ";";
                    break;
                }
        }

        try
        {
            self::$konekcija = self::napravi_konekciju();

            $sql = self::$konekcija->prepare($query);
            $admin = "administrator";
            $sql->bindParam(":status", $admin);
            $sql->bindParam(":username", $nalog['username']);
            $sql->bindParam(":password", $nalog['password']);
            $sql->bindParam(":ime", $nalog['ime']);
            $sql->bindParam(":prezime", $nalog['prezime']);
            $sql->bindParam(":email_ad", $nalog['email_ad']);
            $sql->bindParam(":dat_rodj", $nalog['dat_rodj']);
            $sql->bindParam(":telefon", $nalog['telefon']);

            $sql->execute();
            self::$konekcija = null;
            return $sql->rowCount() == 1 ? "Operacija uspesna" : "Doslo je do greske, operacija nije izvrsena";
        } catch (Exception $ex) {
            self::$konekcija = null;
            return $ex->getMessage();
        } finally {self::$konekcija = null;}
    }

    public static function otkazi_rezervaciju($id)
    {
        try {
            self::$konekcija = self::napravi_konekciju();
            $query = "UPDATE rezervacija SET obrisan = '1' WHERE id_rezervacije = :id";
            $sql = self::$konekcija->prepare($query);
            $sql->bindParam(':id', $id);
            $sql->execute();

            return "Uspešno ste otkazali rezervaciju";
        } catch (Exception $e) {
            return "Neuspešno otkazivanje";
        } finally {self::$konekcija = null;}
    }
}
