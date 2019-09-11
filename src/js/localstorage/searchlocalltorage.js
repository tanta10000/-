
const  STORAGE_KEY='SEARCH_HISTORICAL_RECORDS'
const  list=[]
export default{
    fetch(){
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    },
    save(items){
        list.unshift(items);
        window.localStorage.setItem(STORAGE_KEY,JSON.stringify(list))
    }
}
