
const  STORAGE_KEY='FOLLOW_LOCAL_DING'
const  followList=[]

export default{
    fetchFollow(){
        return  JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    },
    saveFollow(items){
        if(Array.isArray(items)){
            window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
        }else {
            followList.unshift(items);
            window.localStorage.setItem(STORAGE_KEY,JSON.stringify(followList))

        }
    }
}
