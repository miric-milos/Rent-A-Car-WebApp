function pretragaAutomobila(automobili,pretragaAuto) {
    let rezultati=[];

    for (let auto of automobili){
        let res=auto['marka']+" "+auto['model']+" "+auto['godiste'];
        if(pretragaAuto.length===1){
            console.log(res+" "+pretragaAuto);
            if(auto['marka'].toLowerCase().startsWith(pretragaAuto.toLowerCase()) || auto['marka'].toLowerCase().startsWith(pretragaAuto.toLowerCase()))
                rezultati.push(auto);
        }
        else
            if(res.toLowerCase().includes(pretragaAuto.toLowerCase())){
                rezultati.push(auto);
        }

    }
    return rezultati;
}