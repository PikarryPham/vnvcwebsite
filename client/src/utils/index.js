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
        result.push({
            GiaVaccine: iterator,Gia,
            MaVaccine: iterator.MaVaccine,
            TenVaccine: iterator.Ten
        })
    }

    return result
}