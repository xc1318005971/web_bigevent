$(function() {
    $('#link-login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd != value) {
                return '两次输入密码不一致'
            }
        }
    })

    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            // data: {
            //     username: $('#form_reg [name=username]').val(),
            //     password: $('#form_reg [name=password]').val()
            // },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功', function() {
                    $('#link-login').click();
                })
            },


        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('登陆失败');
                }
                layer.msg('登陆成功', function() {
                    localStorage.setItem('token', res.token);
                    window.location.href = 'index.html'
                })
            },
        })
    })
})