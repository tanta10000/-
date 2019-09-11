const getTemplateDate = time => {
    /*
    * 分钟除以 60在取余
    * */
    let m = Math.floor(time/60)%60;
    let s =time%60
   // console.log(m,s);
    // 给月日十分加零 1 -> 01  10 -> 10
  //  h = prefixIntrger(h)
    m = prefixIntrger(m)
    s=prefixIntrger(s)
    return `${m}:${s}`
}

const  publishTime = timestamp =>{
    let newTime=new Date();
    let newTimeTamp=Date.parse(newTime);
    let timeNumber =newTimeTamp-(timestamp*1000);
    let date = new Date(timeNumber);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let h = date.getHours() ;
    let m = date.getMinutes() ;
    let s = date.getSeconds();
    if(h>0&&h<=24){
        return h+'小时前';
    }
    if(m>0&&m<=59){
        return m+'分前'
    }
    if(s>0&&s<=59){
        return '刚刚'
    }
}

const readNumber= (num) =>{
    let  result=0;
       if(num>=10000){
           result =Math.floor(num/10000);
           return result+'万阅读'
       }
        return num+'阅读'
}

const  commentTime =(time)=>{
    let date = new Date(time*1000);
    let y = date.getFullYear()
    let M = date.getMonth()
    let d = date.getDate()
    let h = date.getHours()
    let m = date.getMinutes()

    // 给月日十分加零 1 -> 01  10 -> 10
    M = prefixIntrger(M)
    d = prefixIntrger(d)
    h = prefixIntrger(h)
    m = prefixIntrger(m)

    return `${y}-${M}-${d} ${h}:${m}`

}


const prefixIntrger = (n) => { //向月日前面添 0
    n = n + ''
    // 1 -> 1        12 -> 2
    // 01 -> 2      012 -> 3
    // 0             1
    n = (0 + n).substr(n.length - 1)
    return n
}

export {getTemplateDate,publishTime,readNumber,commentTime}