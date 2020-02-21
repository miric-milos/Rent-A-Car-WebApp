let lokacije;
let modal1="modalDodavanja";
//
$(document).ready(() => {
    ucitajSveLokacije();
    $("#sveLokacije").change(popuniPolja);
    $("#novaLokacija").click(novaLokacija);
    $("#izmeniLokaciju").click(izmeniLokaciju);
    $("#obrisiLokaciju").click(obrisiLokaciju);
})

function ucitajSveLokacije() {
    $("#sveLokacije").html('<option value="null">-- Odaberite lokaciju --</option>');
    $.post('ajax/prikazLokacija.php',
        data => {
            lokacije = JSON.parse(data);

            for (let l of lokacije) {
                $("#sveLokacije").append(`<option value='${l.id_lokacije}'>${l.adresa}</option>`);
            }
        });
}
function popuniPolja() {
    if ($("#sveLokacije").val() != 'null') {

        let lokacija = vratiLokaciju($("#sveLokacije").val());

        $("#adresa").val(lokacija.adresa);
        $("#brojTelefona").val(lokacija.telefon);
        $("#email").val(lokacija.email);

        $("#izmeniLokaciju").prop("disabled", false);
        $("#obrisiLokaciju").prop("disabled", false);
        return;
    }

    $("#adresa").val("");
    $("#brojTelefona").val("");
    $("#email").val("");

    $("#izmeniLokaciju").prop("disabled", true);
    $("#obrisiLokaciju").prop("disabled", true);
}

function novaLokacija() {
    if(proveraLokacija()){
        posaljiPostZahtev('novaLokacija.php');
    }

}
function izmeniLokaciju() {
    if(proveraLokacija()){
        posaljiPostZahtev('izmenaLokacije.php');
    }

}
function obrisiLokaciju() {
    if(!proveraLokacija())
        return;

    $.post('ajax/obrisiLokaciju.php', { id_lokacije: $("#sveLokacije").val() },
        data => {
            prikazPoruke("Brisanje lokacije",data,"myModal");
        }
    );

}
function vratiLokaciju(id_lokacije) {
    // Uzima lokaciju po ID-u
    for (let l of lokacije) {
        if (l.id_lokacije == id_lokacije) {
            return l;
        }
    }
}

function posaljiPostZahtev(stranica) {
    let json =
    {
        id_lokacije: $("#sveLokacije").val(),
        adresa: $("#adresa").val(),
        telefon: $("#brojTelefona").val(),
        email: $("#email").val()
    };

    $.post('ajax/' + stranica, { lokacija: JSON.stringify(json) },
        data => {
            prikazPoruke("Uspešno!", data,"myModal");
            slideNaGore();
        }
    );
}

function proveraLokacija() {
    let check=true;
    let niz=document.querySelectorAll(".form-lokacije");
    if(!proveraUnosa(niz))
        check=false;

    if (sadrziSlova($("#brojTelefona").val())){
        dobroIliNije(false,"#brojTelefona",$("#brojTelefona").attr("class"));
        check=false;
    }
    return check;
}