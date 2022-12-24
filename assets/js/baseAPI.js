// ajaxprefilter函数 可以拦截到每一次ajax请求
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 统一为有权限的接口设置header请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局同意挂载complete回调函数
    options.complete = function (res) {
        // res.responseJSON 拿到服务器响应回来的数据
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token')
            //强制跳转到登录页
            location.href = 'http://127.0.0.1:5500/bigdeal/login.html'
        }
    }

})