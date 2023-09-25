export default function cleanStateObj(prevState){
    let result = {}
    for(let key in prevState){
      result[key] = ''
    }
    return result
}