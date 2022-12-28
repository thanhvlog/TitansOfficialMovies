var isVN = $('#selLang').val() && $('#selLang').val() == 'en' ? false : true;
$.validator.addMethod("customemail", 
    function(value, element) {
        return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
    }, 
    "Email không đúng định dạng"
);

$(function() {
    $('#formNewsLetter').submit(function() {
        return false;
    });
    $("#formNewsLetter").validate({
        onfocusout: false,
        invalidHandler: function(form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {               
                if($(validator.errorList[0].element).is(":visible")){
                    $('html, body').animate({
                        scrollTop: $(validator.errorList[0].element).offset().top
                    });
                } else{
                    $('html, body').animate({
                        scrollTop: $(validator.errorList[0].element.closest('.form-group')).offset().top
                    });
                }
            }
        },
        rules: {
            newsletter: {
                required: true,
                email: true,
                customemail: true
            }
        },
        messages: {
            newsletter: {
                required: isVN ? "Vui lòng nhập email" : "Please input Email",
                email: isVN ? "Email không đúng định dạng" : "Email incorrect format"
            }
        }
    });
    
    $(document).on('click','#formNewsLetter .newsletter-btn',function(){
        if($('#formNewsLetter').valid()){
            $this = $(this);
            var data = {};
            $("#formNewsLetter").serializeArray().forEach((field) => {
                data[field.name] = field.value;
            });
            // console.log('data: ',data);
            $this.button('loading');
            let params = {method: "POST", url: "/send-email-subscribe", data: data}
    
            commonFunc.callAjax(params,function(err, result){
                if(err){
                    $this.button('reset');
                    if(isVN){
                        commonFunc.showNotify({title: 'Lỗi!',message: "Không thể gửi email đăng ký. Lỗi server!"},{type: 'danger'}); 
                    } else{
                        commonFunc.showNotify({title: 'Error!',message: "Can not send email. Server error!"},{type: 'danger'}); 
                    }
                } else{
                    $this.button('reset');
                    if(result.err){
                        if(result.err == 1002){
                            if(isVN){
                                commonFunc.showNotify({title: 'Lưu ý!',message: `${result.messageErr}`},{type: 'warning'}); 
                            } else{
                                commonFunc.showNotify({title: 'Warning!',message: `${result.messageErr}`},{type: 'warning'}); 
                            }
                        } else{
                            if(isVN){
                                commonFunc.showNotify({title: 'Lỗi!',message: `Không thể gửi email đăng ký. ${result.messageErr}`},{type: 'danger'}); 
                            } else{
                                commonFunc.showNotify({title: 'Error!',message: `Can not send email. ${result.messageErr}`},{type: 'danger'}); 
                            }
                        }
                    } else{
                        if(isVN){
                            commonFunc.showNotify({title: 'Thành công!',message: `Email ${result.newsletter} đã đăng ký thành công`},{type: 'success'}); 
                        } else{
                            commonFunc.showNotify({title: 'Success!',message: `Email ${result.newsletter} success sign up`},{type: 'success'}); 
                        }
                    }
                }
            })
        }
    })

    $("#formSignUpAccount").validate({
        onfocusout: false,
        rules: {
            usernameAcc: "required",
            emailAcc: {
                required: true,
                email: true,
                customemail: true
            },
            passwordAcc: "required"
        },
        messages: {
            usernameAcc: isVN ? "Vui lòng nhập username" : "Please input username",
            emailAcc: {
                required: isVN ? "Vui lòng nhập email" : "Please input your email",
                email: isVN ? "Email không đúng định dạng" : "Email incorrect format"
            },
            passwordAcc: isVN ? "Vui lòng nhập password" : "Please input your password"
        }
    });

    $(document).on('click','#popupAccount .signUp',function(){
        if($('#formSignUpAccount').valid()){
            $this = $(this);
            var data = {};
            $("#formSignUpAccount").serializeArray().forEach((field) => {
                data[field.name] = field.value;
            });
            // console.log('data: ',data);
            $this.button('loading');
            let params = {method: "POST", url: "/signup-account", data: data}

            commonFunc.callAjax(params,function(err, result){
                if(err){
                    $this.button('reset');
                    if(isVN){
                        commonFunc.showNotify({title: 'Lỗi!',message: "Không thể tạo tài khoản. Lỗi server!"},{type: 'danger'}); 
                    } else{
                        commonFunc.showNotify({title: 'Error!',message: "Can not sign up account. Server error!"},{type: 'danger'}); 
                    }
                } else{
                    $this.button('reset');
                    if(result.err){
                        if(isVN){
                            commonFunc.showNotify({title: 'Lỗi!',message: `Không thể tạo tài khoản. ${result.messageErr}`},{type: 'danger'}); 
                        } else{
                            commonFunc.showNotify({title: 'Lỗi!',message: `Can not sign up account. ${result.messageErr}`},{type: 'danger'}); 
                        }
                    } else{
                        if(isVN){
                            commonFunc.showNotify({title: 'Thành công!',message: `Tạo tài khoản thành công. Vui lòng ghi nhớ thông tin tài khoản để đăng nhập`},{type: 'success'}); 
                        } else{
                            commonFunc.showNotify({title: 'Success!',message: `Account successfully created. Please remember your account information to log in.`},{type: 'success'}); 
                        }
                        $('#popupAccount').modal('hide');
                    }
                }
            })
        }
    })

    $(document).on('change','#selLang',function(){
        let urlOrigin = document.location.origin;
        let pathName = document.location.pathname;
        let queryString = window.location.search;
        let href = document.location.href;
        if(pathName.length <= 1){
            urlOrigin += '?lang=' + $(this).val();
        } else{
            if(queryString.length && queryString.indexOf('lang') == -1){
                urlOrigin = href + '&lang=' + $(this).val();
            } else{
                urlOrigin += pathName + '?lang=' + $(this).val();
            }
        }
        window.location.replace(urlOrigin);
    })

    if(!Cookies.get('showPopupGame')){
        let pathName = document.location.pathname;
        let show = pathName.indexOf('/emulator-nes/') == -1 && pathName.indexOf('/emulator-gba/') == -1 && pathName.indexOf('/emulator-snes/') == -1;
        if(show){
            window.setTimeout(function() {
                $('#popupGameModal').modal('show');
                Cookies.set('showPopupGame', 1, { expires: 7 })
            }, 10000);
        }
    }
});