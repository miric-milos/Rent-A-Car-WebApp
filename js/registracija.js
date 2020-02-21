$(document).ready(function () {
    $("#datRodj").datepicker({
        showAnimation: 'drop',
        numberOfMonth: 1,
        showOtherMonths: true,
        maxDate: new Date(new Date().getFullYear()-18,new Date().getMonth(),new Date().getDate()),
        dateFormat: 'dd/mm/yy',
        changeYear: true,
        changeMonth: true,
        showWeek: true,
        weekHeader: "",
    });

    $("#korisnickoIme").keyup(function () {
        $.post("ajax/proveraUsername.php",{username: $("#korisnickoIme").val()},function (response) {
            $("#proveraUsername").html(response);
            dobroIliNije(response.includes("Validan"),"#korisnickoIme")
        })
    })
    $("#email1").keyup(function () {
        if(validanEmail($("#email1").val())){
            $.post("ajax/proveraEmaila.php",{email: $("#email1").val()},function (response) {
                $("#proveraEmaila").html(response);
                dobroIliNije(response.includes("Validan"),"#email1")
            })
        }
        else{
            $("#proveraEmaila").html("<p class='text-danger'>Nevalidan email</p>");
            dobroIliNije(false,"#email1")
        }

    });

    $("#lozinkaRegister").keyup(function () {
        if(proveriSifru(this.value)){
            $("#proveraSifre").html(`<p class=\"${this.value.length>7?"text-success":"text-warning"}\">${this.value.length>7?"Jaka lozinka":"Solidna lozinka"}</p>`)
        }
        else{
            $("#proveraSifre").html(`<p class='text-danger'>Sifra mora sadrzati minimum 5 karaktera, 2 velika slova, i može sadržati simbol '_'</p>`)
        }

    });

    $("#btnRegister").click(function () {
        let niz=document.querySelectorAll(".registracija");
        let nizBool={"#brTel":proveraBrTel(),"#brVoz":proveraBrVoz(),"#email1":$("#email1").attr("class").includes("valid"),"#korisnickoIme":$("#korisnickoIme").attr("class").includes("valid"),"#lozinkaRegister":proveriSifru($("#lozinkaRegister").val()),"#relozinka":proveraPodudarnosti()};
        let provera=true;

        if(proveraUnosa(niz)){
            for (let i in nizBool) {
                if(!nizBool[i]) {
                    console.log(i+"2");
                    provera=false;
                }
            }
            if(provera){
                $("#lozinkaRegister").val($("#lozinkaRegister").val().hashCode());
                let dat=$("#datRodj").val().split("/");
                $("#datRodj").val(dat[2]+"-"+dat[1]+"-"+dat[0]);

                $("#formaRegister").submit();
            }

            else
                $("#porukaRegister").html("<h1 class='text-center text-danger display-4'>Nevalidan unos podataka</h1>")

        }
        else{
            for (let i in nizBool)
                dobroIliNije(nizBool[i],i);
            $("#porukaRegister").html("<h1 class='text-center text-danger display-4'>Nevalidan unos podataka</h1>")
        }


    });

    $("#relozinka").keyup(function () {
        dobroIliNije(proveraPodudarnosti(),"#relozinka");
        $("#proveraPodudarnosti").html(proveraPodudarnosti()?"<p class='text-success'>Podudaraju se</p>":"<p class='text-danger'>Šifre se ne podudaraju</p>");
    });

});

function proveraPodudarnosti() {
    return ($("#lozinkaRegister").val()===$("#relozinka").val() && $("#relozinka").val()!=="");
}
function proveraBrVoz() {
    return (!sadrziSlova($("#brVoz").val()) && $("#brVoz").val().length>7 && $("#brVoz").val()!=="");
}
function proveraBrTel() {
    return (!sadrziSlova($("#brTel").val()) && $("#brTel").val().length>4 && $("#brTel").val()!=="");
}