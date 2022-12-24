$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '新密码两次输入不一致'
            }
        }  
    })

    $('.layui-form').on('submit' , function(e){
        e.preventDefault()

        $.ajax({
            method :'POST',
            url:'/my/updatepwd',
            // 向服务器提交两个参数请求
            data :$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('重置密码失败')
                }
                return layer.msg('重置密码成功')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})