var auto;
function prikaziOdabraniAutomobil() {
    let rez=getMetoda("id_auto");
    if(!rez){
        $("#prikazAuto").html("<p class='display-4 text-danger text-center pt-3 pb-5'><b>Nema izabranog automobila</b></p>");
        $("#btnRezervisi").addClass('disabled');
        return false;
    }


    $.post("ajax/odabraniAuto.php",{id_auto : rez},function (data) {
        let dobavljeno=JSON.parse(data);
        auto=dobavljeno[0];
        for (let i in nasloviParametraAuto){
            $("#prikaz").append(`<div class="col-4 mt-1">
                                    <b>${nasloviParametraAuto[i]}</b>: ${auto[i]} ${i=="cena_po_danu"?"€":""}
                                 </div>`);
        }
        $("#prikaz").append("<div class='col-12 mt-3 text-center text-lg-left text-warning'><h5>*Automobil možete rezervisati najduže na 15 dana!</h5></div>")
        $("#slikaAutomobila").attr("src",`img/automobili/${auto['putanja_slike']}`);
    });
    return true;
}
