$(document).ready(function () {
    var minDate=new Date();
    var datumi;

    let idAuto=getMetoda("id_auto");

    $.post("ajax/dohvatiDatumeZaAuto.php",{id_auto:idAuto},function (data) {
        datumi=nizDatuma(JSON.parse(data));
    });


    $("#datumOd").datepicker({
        showAnimation: 'drop',
        numberOfMonth: 1,
        changeYear: true,
        changeMonth: true,
        showWeek: true,
        weekHeader: "",
        minDate: minDate,
        showOtherMonths: true,
        dateFormat: 'dd/mm/yy',
        beforeShowDay: function(dt){
            var string=jQuery.datepicker.formatDate('yy-mm-dd',dt);
            if(dt > new Date() && $.inArray(string,datumi) == -1)
                return [true,"markiranoZeleno"];
            else
                return [false, "markiranoCrveno"];
        },
        onClose: function (izabranDatum) {
            $("#datumDo").datepicker("option","minDate",izabranDatum);
        }
    });

    $("#datumDo").datepicker({
        showAnimation: 'drop',
        numberOfMonth: 1,
        minDate: minDate,
        showOtherMonths: true,
        dateFormat: 'dd/mm/yy',
        changeYear: true,
        changeMonth: true,
        showWeek: true,
        weekHeader: "",
        beforeShowDay: function(dt){
            var string=jQuery.datepicker.formatDate('yy-mm-dd',dt);
            if(dt > new Date() && $.inArray(string,datumi) == -1)
                return [true,"markiranoZeleno"];
            else
                return [false, "markiranoCrveno"];
        },
    });

    $("#datumOdPocetna").datepicker({
        showAnimation: 'drop',
        numberOfMonth: 1,
        changeYear: true,
        changeMonth: true,
        showWeek: true,
        weekHeader: "",
        minDate: minDate,
        showOtherMonths: true,
        dateFormat: 'dd/mm/yy',
        onClose: function (izabranDatum) {
            $("#datumDoPocetna").datepicker("option","minDate",izabranDatum);
        }
    });

    $("#datumDoPocetna").datepicker({
        showAnimation: 'drop',
        numberOfMonth: 1,
        minDate: minDate,
        showOtherMonths: true,
        dateFormat: 'dd/mm/yy',
        changeYear: true,
        changeMonth: true,
        showWeek: true,
        weekHeader: "",
    });
})

