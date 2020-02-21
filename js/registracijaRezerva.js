var klasa="form-control";
var modal="myModal";
$(document).ready(function () {
    let prolaz=prikaziOdabraniAutomobil();
    $("#btnRezervisi").click(function () {
        if(prolaz){
            $(".poruka").html("");
            var ime=$("#inputIme").val();
            var prezime=$("#inputPrezime").val();
            var datRodj=$("#inputDatumRodj").val();
            var brojTel="0"+$("#inputTelefon").val();
            var eMail=$("#inputEmail").val();
            var br_vozacke=$("#inputBrVozacke").val();
            var datum1=$("#datumOd").val().split("/");
            var datum2=$("#datumDo").val().split("/");
            var datumOd=datum1[2]+"-"+datum1[1]+"-"+datum1[0];
            var datumDo=datum2[2]+"-"+datum2[1]+"-"+datum2[0];

            var niz={"inputIme":ime,"inputPrezime":prezime,"inputDatumRodj":datRodj,"inputTelefon":brojTel,"inputEmail":eMail, "inputBrVozacke":br_vozacke, "datumOd":datumOd, "datumDo":datumDo};

            let bool=provera(niz);

            if(bool){
                let nalog={
                    ime:ime,
                    prezime:prezime,
                    dat_rodj:datRodj,
                    telefon:brojTel,
                    email:eMail,
                    br_vozacke:br_vozacke
                };
                let rezervacija={
                    id_auto: auto['id_auto'],
                    datum_od: datumOd,
                    datum_do: datumDo,
                    cena: $("#cena").html()
                };
                let jsonUser=JSON.stringify(nalog);
                let jsonRez=JSON.stringify(rezervacija);
                let jsonAuto=JSON.stringify(auto);
                $.post("ajax/rezervacija.php",{user:jsonUser, rezervacija:jsonRez, auto: jsonAuto},function (response) {
                    if(response){
                        prikazPoruke("Uspešno ste popunili rezervaciju",response,modal);
                    }
                })
            }
            else{
                $(".poruka").html("Nevalidan format unetih podataka, pokušajte ponovo.");
            }
        }


    });

    $("#inputEmail").change(proveraEmaila);

    $("#btnClose").click(function () {
        window.location.href = "index.php";
    });

});

function provera(niz) {
    let check=true;

    for(let i in niz){
        let val=niz[i];
        if(val==="" || val==0){
            dobroIliNije(false,"#"+i,klasa);
            check=false;
        }
        else{
            dobroIliNije(true,"#"+i, klasa);
        }
    }

    /*PROVERA IMENA,PREZIMENA*/
    var hasNumber=/\d/;
    var imePrezime=["inputIme","inputPrezime"];
    for (let i = 0; i < imePrezime.length; i++) {
        if(hasNumber.test(niz[imePrezime[i]])){
            dobroIliNije(false,"#"+imePrezime[i],klasa);
            check=false;
        }
    }
    /************************/

    /*Datum rodjenja check*/
    var today=new Date().getTime();
    var unetDatum=new Date($("#inputDatumRodj").val()).getTime();
    var razlika=racunanjeRazlikeDatuma(today,unetDatum).getUTCFullYear()-1970;

    if(razlika>17 && razlika<95){
        dobroIliNije(true,"#inputDatumRodj",klasa);
        $(".proveraDatuma").html("");
    }
    else {
        dobroIliNije(false,"#inputDatumRodj",klasa);
        $(".proveraDatuma").html("Morate biti stariji od 17 godina");
        check=false;
    }
    /*************************/

    /**** PROVERA BROJA TELEFONA*/
    if(isNaN(niz['inputTelefon'])){
        dobroIliNije(false,"#inputTelefon",klasa);
        check=false;
    }
    /*****************************/

    /***********PROVERA EMAILA************************/

    if(!proveraEmaila()){
        check=false;
    }
    /************************************/

    /************PROVERA VOZACKE**************/
    console.log()
    if(isNaN(niz['inputBrVozacke']) || niz['inputBrVozacke'].length!=8){
        dobroIliNije(false,"#inputBrVozacke",klasa);
        check=false;
    }
    /**************************************/

    if(!racunanjeCene())
        check=false;

    return check;


}
function proveraEmaila(){
    $("#inputEmail").html("");
    let eMail=$("#inputEmail").val();
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


    if(eMail!="") {
        if(!re.test(String(eMail).toLowerCase())){
            $("#proveraEmaila").html("<p class='text-danger'>Nevalidan format</p>");
            dobroIliNije(false,"#inputEmail");
            return false;
        }

        $.post("ajax/proveraEmaila.php", {email: eMail}, function (response) {
        let poruka = "";
        if (!response){
            poruka = "<p class='text-danger'>Nalog postoji pod datim e-mailom</p>";
            return false;
        }

        else
            poruka = response;
        dobroIliNije(true,"#inputEmail");
        $("#proveraEmaila").html(poruka);

    });
    }
    return true;
}
