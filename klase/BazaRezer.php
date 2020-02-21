<?php


class Baza
{
    private static $konekcija;
    private function __construct() {}

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
        $db = new PDO("mysql:host=localhost;dbname=rentacar_db;", "root", "");
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
            return "Uspesno ste uneli lokaciju";
        }
        catch (Exception $e) 
        {
            $konekcija = null;
            return "Doslo je do greske\r\n". $e->getMessage();
        }
        finally {$konekcija = null;}

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
        }
        catch (Exception  $e) {
            self::$konekcija = null;
            return "Doslo je do greske\r\n".$e->getMessage();            
        }
        finally {self::$konekcija = null;}
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

            if($sql->rowCount() == 1)
            {
                return "Uspesno obrisana lokacija";
            }
        }
        catch (Exception $e)
        {
            self::$konekcija = null;
            return "Doslo je do greske\r\n" . $e->getMessage();
        } finally {self::$konekcija = null;}
    }

    public static function obradi_nalog($nalog, $akcija)
    {
        $query = "";
        switch ($akcija)
        {
            case "dodaj": {
                $query  = "INSERT INTO nalozi (username, password, ime, prezime, email_ad, dat_rodj, telefon, br_voz_dozvole) VALUES(:username, :password, :ime, :prezime, :email_ad, :dat_rodj, :telefon, :br_voz_dozvole)";
                break;
            }

            case "izmeni": {
                $query = "UPDATE nalozi SET username = :username, password = :password, ime = :ime, prezime = :prezime, email_ad = :email_ad, dat_rodj = :dat_rodj, telefon = :telefon, br_voz_dozvole = :br_voz_dozvole WHERE id_naloga = ". $nalog['id_naloga'] .";";
                break;
            }

            case "obrisi": {
                $query = "UPDATE nalozi SET obrisan = '1' WHERE id_naloga = ". $nalog['id_naloga'] .";";
                break;
            }
        }

        try
        {
            self::$konekcija = self::napravi_konekciju();

            $sql = self::$konekcija->prepare($query);
            $sql->bindParam(":username", $nalog['username']);
            $sql->bindParam(":username", $nalog['username']);
            $sql->bindParam(":password", $nalog['password']);
            $sql->bindParam(":ime", $nalog['ime']);
            $sql->bindParam(":prezime", $nalog['prezime']);
            $sql->bindParam(":email_ad", $nalog['email_ad']);
            $sql->bindParam(":dat_rodj", $nalog['dat_rodj']);
            $sql->bindParam(":telefon", $nalog['telefon']);
            $sql->bindParam(":br_voz_dozvole", $nalog['br_voz_dozvole']);

            $sql->execute();
            self::$konekcija = null;
            return $sql->rowCount()==1?"Operacija uspesna":"Doslo je do greske, operacija nije izvrsena";
        }
        catch (Exception $ex)
        {
            self::$konekcija = null;
            return $ex->getMessage();
        }
        finally {self::$konekcija = null;}
    }
}