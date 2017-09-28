/**
 * Created by Administrator on 2017/6/24 0024.
 */
import createHistory from 'history/createBrowserHistory'
import qs from 'qs';
const history = createHistory();

export function pushGo(path) {
    history.go(path)
}

const Utils = {
/**
 * 设置bowserHistory页面跳转
 * @param path 路径
 * @param params 查询参数
 */
    pushLink(path, params) {
        const querystring = qs.stringify(params);
        history.push(path + (querystring ? '?' + querystring : ''));
    },

    pushHistory(params){
        history.pushState(null, params);
    },

    goBack(){
        setTimeout(function timer() {
            window.history.back();
        },1000);

    },

    /*
    * 处理对象，根据对象的数值，正序排列
    *
    * */
    fgwCompare(property){
        return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2;
        }

    },

    /*
     * 处理对象，根据对象的数值，正序排列
     *
     * */
    fgwReverseCompare(property){
        return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return -(value1 - value2);
        }

    }

};


export default Utils;