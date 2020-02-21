$(document).ready(function () {
    $("#datumOd").change(racunanjeCene);
    $("#datumDo").change(racunanjeCene);
    $("#btnRezervisi").click(rezervacija)

});

function racunanjeCene(){
    let cenaPoDanu=parseInt($("#cena_po_danu").text());
    if($("#datumOd").val()=="" || $("#datumDo").val()==""){
        dobroIliNije(false,"#datumOd");
        dobroIliNije(false,"#datumDo");
        return false;
    }


    let datum1=$("#datumOd").val().split("/");
    let datum2=$("#datumDo").val().split("/");
    let datumOd=new Date(datum1[2]+"-"+datum1[1]+"-"+datum1[0]);
    let datumDo=new Date(datum2[2]+"-"+datum2[1]+"-"+datum2[0]);

    let razlikaDatuma=racunanjeRazlikeDatuma(datumDo,datumOd) / (1000 * 3600 * 24);


    let bool=(razlikaDatuma<0 || razlikaDatuma>15)?false:true;

    dobroIliNije(bool, "#datumOd");
    dobroIliNije(bool, "#datumDo");

    let cena=(razlikaDatuma===0?1:razlikaDatuma+1)*cenaPoDanu;
    let ukupnaCena=bool?(cena==0?auto['cena_po_danu']:cena):0;

    $("#ukupnaCena").val(ukupnaCena+"€");

    return bool;
}

function rezervacija() {
    if(!racunanjeCene())
        return false;

    let datum1=$("#datumOd").val().split("/");
    let datum2=$("#datumDo").val().split("/");
    $("#datumOd").val(datum1[2]+"-"+datum1[1]+"-"+datum1[0]);
    $("#datumDo").val(datum2[2]+"-"+datum2[1]+"-"+datum2[0]);

    $("#formaRezervacija").submit();
}
