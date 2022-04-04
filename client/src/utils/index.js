export const parseListOfVaccines = (ListVaccines) =>{
    let result = []
    for (const iterator of ListVaccines) {
        result.push( JSON.parse(iterator))
    }
    return result
}