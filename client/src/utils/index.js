export const parseListOfVaccines = (ListVaccines) =>{
    let result = []
    for (const iterator of ListVaccines) {
        result.push( JSON.parse(iterator))
    }
    return result
}

export const giaVaccine = (ListVaccines) =>{
    let s=0;

    for (const iterator of ListVaccines) {
        s= s+iterator.GiaVaccine
    }

    return s;
}

export const tongTien = (customers) =>{
    try{
        let s= 0;
        for (const iterator1 of customers) {
            for (const iterator2 of iterator1.vaccine) {
                s=s+iterator2.GiaVaccine
            }
        }
    
        return s
    }catch(err){
        return 0
    }
}


export const makeInitialVaccineSelect = (ListVaccines)=>{
    let result = []

    for (const iterator of ListVaccines) {
        result.push(JSON.stringify({
            MaVaccine: iterator.MaVaccine,
            TenVaccine: iterator.Ten,
            GiaVaccine: iterator.Gia
        }))
    }

    return result
}

export const CheckPhoneNumberContainLetter = (chuoi)=>{
    let giatri = true;
    if(chuoi.length > 13 || chuoi.length < 9){
        giatri = false ;
        return giatri
    }
    for (let i = 0; i < chuoi.length; i++) {
        if(chuoi[i].toLowerCase() != chuoi[i].toUpperCase()) {
        //see more details here: https://coderrocketfuel.com/article/how-to-check-if-a-character-is-a-letter-using-javascript
            giatri = false
        }
    }
    return giatri
}

export const CheckNotContainNumber = (chuoi)=>{
    let giatri = true;
    if(chuoi.length < 3){
        giatri = false ;
        return giatri
    }
    for (let i = 0; i < chuoi.length; i++) {
        if(chuoi[i] == ' ')
        {
            continue
        }
        if(chuoi[i].toLowerCase() === chuoi[i].toUpperCase()) {
            giatri = false
        }
    }
    return giatri
}

export const OnlyContainNumber = (chuoi)=>{
    let giatri = true;
    if(chuoi.length > 12 || chuoi.length < 9){
        giatri = false ;
        return giatri
    }
    for (let i = 0; i < chuoi.length; i++) {
        if(chuoi[i].toLowerCase() != chuoi[i].toUpperCase()) {
        //see more details here: https://coderrocketfuel.com/article/how-to-check-if-a-character-is-a-letter-using-javascript
            giatri = false
        }
    }
    return giatri
}