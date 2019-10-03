let request_url= "https://service-f5y4uhf0-1256882866.gz.apigw.tencentcs.com/release/skrmanweb";



UrlParm = function() { // url参数
    var data, index;
    (function init() {
        data = [];
        index = {};
        var u = window.location.search.substr(1);
        if (u != '') {
            var parms = decodeURIComponent(u).split('&');
            for (var i = 0, len = parms.length; i < len; i++) {
                if (parms[i] != '') {
                    var p = parms[i].split("=");
                    if (p.length == 1 || (p.length == 2 && p[1] == '')) {// p | p=
                        data.push(['']);
                        index[p[0]] = data.length - 1;
                    } else if (typeof(p[0]) == 'undefined' || p[0] == '') { // =c | =
                        data[0] = [p[1]];
                    } else if (typeof(index[p[0]]) == 'undefined') { // c=aaa
                        data.push([p[1]]);
                        index[p[0]] = data.length - 1;
                    } else {// c=aaa
                        data[index[p[0]]].push(p[1]);
                    }
                }
            }
        }
    })();
    return {
        // 获得参数,类似request.getParameter()
        parm : function(o) { // o: 参数名或者参数次序
            try {
                return (typeof(o) == 'number' ? data[o][0] : data[index[o]][0]);
            } catch (e) {
            }
        },
        //获得参数组, 类似request.getParameterValues()
        parmValues : function(o) { //  o: 参数名或者参数次序
            try {
                return (typeof(o) == 'number' ? data[o] : data[index[o]]);
            } catch (e) {}
        },
        //是否含有parmName参数
        hasParm : function(parmName) {
            return typeof(parmName) == 'string' ? typeof(index[parmName]) != 'undefined' : false;
        },
        // 获得参数Map ,类似request.getParameterMap()
        parmMap : function() {
            var map = {};
            try {
                for (var p in index) {  map[p] = data[index[p]];  }
            } catch (e) {}
            return map;
        }
    }
}();

GetUseridCookie = function() {
    return{
        // 获得userid Cookie值
        get : function(o) { // o: 参数名或者参数次序
            var strcookie = document.cookie;
            var arrcookie = strcookie.split("; ");
            var userid;
            for(var i=0;i<arrcookie.length;i++){
                var arr = arrcookie[i].split("=");
                if(o==arr[0]){
                    userid = arr[1];
                    break;
                }
            }
            return userid;
        },
    }
}

GetUsertypeCookie = function() {
    return{
        // usertype Cookie值
        get : function(o) { // o: 参数名或者参数次序
            var strcookie = document.cookie;
            var arrcookie = strcookie.split("; ");
            var usertype;
            for(var i=0;i<arrcookie.length;i++){
                var arr = arrcookie[i].split("=");
                if("usertype"==arr[0]){
                    usertype = arr[1];
                    break;
                }
            }
            return usertype;
        },
    }
}


function clearAllCookie(){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString();
    }
}


function updateCookie(name,value){
    var d = new Date();
    d.setTime(d.getTime()+60*300000);//过期时间300分钟
    document.cookie = name + "="+ escape (value) + ";expires=" + d.toGMTString();
}

function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function clearCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
