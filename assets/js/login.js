$(function () {

    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 表单验证 导入
    let form = layui.form
    // 表单验证
    form.verify({
        // 自定义一个叫pwd的校验
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位,且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //使用layer提示消息 注册成功
    let layer = layui.layer

    // 发起注册用户的ajax请求(表单提交事件)
    $('#form_reg').on('submit', function (e) {
        //阻止默认提交行为 
        e.preventDefault()
        // 发起ajax的post请求
        let data = {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val()
        }

        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录!')
            // 给一个点击行为页面跳转
            $('#link_login').click()
        })
    })

    // 发起登录的Ajax请求(表单提交事件)
    $('#form_login').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data : $(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功')

                // 将登录成功的token字符串 保存到localstorage
                localStorage.setItem('token', res.token)
                // 跳转到后台
                location.href = 'http://127.0.0.1:5500/bigdeal/index.html'
            }
        })
    })




})

