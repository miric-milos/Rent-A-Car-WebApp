let sviNalozi;
const akcije = 
{
    dodaj:"dodaj",
    izmeni:"izmeni",
    obrisi:"obrisi"
};

$(document).ready(() => {
    $.post('ajax/prikazNaloga.php',
        response => {
            sviNalozi = JSON.parse(response);
            popuniSelectSvimNalozima(sviNalozi);
        }
    )
    $("#listaNaloga").change(popuniPoljaNaPromenu);
    $("#dodajNovNalog").click(dodajNalog);
    $("#sacuvajNalog").click(sacuvajIzmeneUNalogu);
    $("#obrisiNalog").click(obrisiNalog);
    $("#email_ad").keydown(function () {

        if(validanEmail($("#email_ad").val())){
            dobroIliNije(false,"#email");
        }
    })
});

function popuniSelectSvimNalozima(nalozi) {
    let rezultat = "<option value='null'>-- Odaberite nalog --</option>";

    for (let nalog of nalozi) {
        if(nalog['status']!="administrator")
            continue;
        let nalogtoString = `${nalog.ime} ${nalog.prezime} [${nalog.username}]`;
        rezultat += `<option value="${nalog.id_naloga}">${nalogtoString}</option>`;
    }

    $("#listaNaloga").html(rezultat);
}
function popuniPoljaNaPromenu() {

    if ($("#listaNaloga").val() == "null") {
        let polja = $("#nalozi input");
        for (let polje of polja) {
            polje.value = "";
        }
        $("#sacuvajNalog").prop('disabled', true);
        $("#obrisiNalog").prop('disabled', true);

        return;
    }

    let nalog = sviNalozi.filter(n => n.id_naloga == $("#listaNaloga").val())[0];

    $("#username").val(nalog.username);
    $("#password").val(nalog.password);
    $("#ime").val(nalog.ime);
    $("#prezime").val(nalog.prezime);
    $("#email_ad").val(nalog.email_ad);
    $("#dat_rodj").val(nalog.dat_rodj);
    $("#telefon").val(nalog.telefon);

    $("#sacuvajNalog").prop('disabled', false);
    $("#obrisiNalog").prop('disabled', false);
}
function dodajNalog() {
    obradiNaloge(akcije.dodaj);
}
function sacuvajIzmeneUNalogu()
{
    obradiNaloge(akcije.izmeni);
}
function obrisiNalog()
{
    obradiNaloge(akcije.obrisi);
}



function obradiNaloge(akcijaObrade)
{
    if (!validanUnos() ||
        // sadrziBrojeve($("#ime").val()) ||
        sadrziSlova($("#telefon").val())) {
        dobroIliNije(false,"#telefon");
        return;
    }


    let json =
    {
        id_naloga: $("#listaNaloga").val(),
        username: $("#username").val(),
        password: $("#password").val().hashCode(),
        ime: $("#ime").val(),
        prezime: $("#prezime").val(),
        email_ad: $("#email_ad").val(),
        dat_rodj: $("#dat_rodj").val(),
        telefon: $("#telefon").val(),
    };

    $.post('ajax/obradaNaloga.php', { podaci: JSON.stringify(json),  akcija:akcijaObrade},
        response => {
            switch (akcijaObrade) {
                case "dodaj":
                    poruka="Uspešno ste dodali nalog";
                    break;
                case "obrisi":
                    poruka="Uspešno ste obrisali nalog";
                    break;
                case "izmeni":
                    poruka="Uspešno ste izmenili nalog";
                    break;
            }
            prikazPoruke("Uspesno!",poruka,"myModal");
        }
    )

    let poruka;


}

function validanUnos()
{
    let polja = $("#nalozi input");
    let errorCount = 0;

    for (let polje of polja) {
        if (polje.value == "") {
            polje.className += " is-invalid";
            errorCount++;
        }
    }

    if (errorCount > 0) {
        return false;
    }

    return true;
}