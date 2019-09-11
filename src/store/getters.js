export default {
        getShareInfoArr:(state) =>{
                return state.shareInfoArr;
        },
        getIsShare: (state) =>{
                console.log('getter');
                return state.isShare;
        }
}