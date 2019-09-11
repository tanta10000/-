import *as  type from './mutation-type'
// *as type 就是给 一个别名为 type
export  default {
    [type.UPDATE_IS_SHARE](state){
        state.isShare=!state.isShare;
    }
}