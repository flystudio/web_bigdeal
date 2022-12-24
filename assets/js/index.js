$(function () {
    // 调用函数 获取用户基本信息
    getUserInfo()

    let layer = layui.layer

    // 实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 重新跳转
            window.location.href = 'http://127.0.0.1:5500/bigdeal/login.html'
            layer.close(index)
        })
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // 请求头配置对象(baseAPI优化)
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败 最终都会调用complete
        // complete :function(res){
        //     // res.responseJSON 拿到服务器响应回来的数据
        //     console.log(res);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         //强制跳转到登录页
        //         location.href = 'http://127.0.0.1:5500/bigdeal/login.html'
        //     }
        // }
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}

