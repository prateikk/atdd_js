module.exports = {

    url: function () {
        return this.api.launch_url;
    },
    elements: {
        body: 'body',
        userName: '#user_email',
        password: '#user_password',
        btnLogin: 'input.btn.btn-primary',
        loginError: '.alert.alert-danger',
        forgotPwd: 'a[href="/password/new"]'
    },

};
