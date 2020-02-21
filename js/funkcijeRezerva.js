
var nasloviParametraAuto={
    marka : "Marka",
    model : "Model",
    godiste : "Godište",
    kubikaza : "Kubikaža",
    karoserija : "Karoserija",
    gorivo : "Gorivo",
    pogon : "Pogon",
    menjac : "Menjač",
    broj_vrata : "Broj vrata",
    cena_po_danu: "Cena po danu"

};


String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

function dobroIliNije(bool,val) {
    $(val).attr("class",$(val).attr("class").replace("is-invalid","").replace("is-valid",""));
    $(val).addClass(bool?"is-valid":"is-invalid");
}

function prikazPoruke(title,body,idModal) {
    $(".modal-title").html(title);
    $(".modal-body").html("<p>"+body+"</p>");
    $('#'+idModal).modal('show');
}

function sigurnosnaPoruka(poruka,idModal) {
    $(".modal-title").html("Sigurnosna poruka");
    $(".modal-body").html("<p>"+poruka+"?</p>");
    $('#'+idModal).modal('show');
}

function slideNaGore() {
    $("html, body").animate({scrollTop: 0}, 1000);
}

function proveraUnosa(niz) {
    let provera=true;

    for (let i of niz) {
        let klasa = $("#" + i.id).attr("class").replace("is-invalid","").replace("is-valid","");

        if (i.value === "" || i.value == "null") {
            dobroIliNije(false, "#" + i.id, klasa);
            provera = false;
        }
        else
            dobroIliNije(true, "#" + i.id, klasa);
    }
    return provera;
}

function getMetoda(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return false;
}
function dobavljanjeBezPonavljanja(niz,element) {
    let res=[];
    for (let i of niz){
        res.push(i[element]);
    }
    return [...new Set(res)];
}

function racunanjeRazlikeDatuma(date1, date2) {
    return new Date(date1-date2);
}