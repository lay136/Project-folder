function getLength(str){
        return str.replace(/[\u4e00-\u9fa5]/g,"aa").length;
    }
function setError(oMsg,sMsg,oInput){
        console.log('aaaa')
        oMsg.className = 'err';
        oMsg.innerHTML = sMsg;
        oInput.className = 'input-err';
    }
function setOk(oMsg,oInput){
        oMsg.className = 'ok';
        oMsg.innerHTML = '';
        oInput.className = '';
    }
	var oForm = document.forms[0];
	var oUsername = oForm.username;
    var oPhone = oForm.phone;
    var oPwd = oForm.password;
    var oVerify = oForm.verify;
    var oAgree = oForm.isAgree;
	var aMsg = document.querySelectorAll('.msg');
	var aCancel = document.querySelectorAll('.cancel');
    var oPwdChecklist = document.getElementById('pwdChecklist');
    var aPwdCheckli = oPwdChecklist.querySelectorAll('li');
    var oSmsBtn = document.getElementById('smsBtn');
    var oSubBtn = document.getElementById('subBtn');
    //定义全局判断变量

    
    var bUsername = false,bPhone = false,bPwd = false,bVerify = false;



    init();
    checkUsername();
    checkPhone();
    checkPwd();
    checkVerify();
    checkSubmit();

	//初始化页面
function init(){
    oUsername.focus();
    aMsg[0].className = 'tiptext';
    aMsg[0].innerHTML = '设置后不可更改<br>中英文均可，最长14个英文或7个汉字';
    //所有输入框输入时(运用了事件代理)
    oForm.oninput = function(ev){
        var sVal = ev.target.value;
        var oCancel = ev.target.nextElementSibling;
        if(sVal.length > 0){
            oCancel.style.display = 'block';
        }else{
            oCancel.style.display = 'none';
        }
    }
    //给所有的取消按钮绑定点击事件(运用了事件代理)
    oForm.onclick = function(ev){
        var oCancel = ev.target;
        var oInput = oCancel.previousElementSibling;
        /*
        if(oCancel.className == 'cancel'){
            oInput.value = '';
            oCancel.style.display = 'none';
            oInput.focus();
        }
        */
        if(oCancel.className == 'cancel'){
            if(oInput.name){
                switch(oInput.name){
                    case 'username':
                    case 'phone':
                    case 'password':
                    case 'verify':
                    oInput.value = '';
                    oCancel.style.display = 'none';
                    oInput.focus();
                    break;
                } 
            }
        }     
    }
}
	

//验证用户名
function checkUsername(){
    oUsername.onblur = function(){
        var sVal = oUsername.value;
        //全空正则
        var reg1 = /^\s+$/;
        //用户名仅支持中英文、数字和下划线
        var reg2 = /[^\u4e00-\u9fa50-9a-z_]/ig;
        //不能时纯数字
        var reg3 = /^[0-9]+$/;
        if(sVal == ''){
            aMsg[0].className = 'msg';
            bUsername = false;
        }else if(reg1.test(sVal)){
            oUsername.value = '';
            aMsg[0].className = 'msg';
            aCancel[0].style.display = 'none';
            bUsername = false;
        }else if(getLength(sVal) > 14){
            setError(aMsg[0],'用户名不能超过7个汉字或14个字符',oUsername);
            bUsername = false;
        }else if(reg2.test(sVal) || reg3.test(sVal)){
            setError(aMsg[0],'用户名仅支持中英文、数字和下划线,且不能为纯数字',oUsername);
            bUsername = false;
        }else{
            setOk(aMsg[0],oUsername);
            bUsername = true;
        }
    }
    oUsername.onfocus = function(){
        aMsg[0].className = 'tiptext';
        aMsg[0].innerHTML = '设置后不可更改<br>中英文均可，最长14个英文或7个汉字';
    }
}


//验证手机号
function checkPhone(){
    oPhone.onblur = function(){
        var sVal = oPhone.value;
        //全空正则
        var reg1 = /^\s+$/;
        //正确的手机号格式
        var reg2 = /^1[35789]\d{9}$/;
        if(sVal == ''){
            aMsg[1].className = 'msg';
            bPhone = false;
        }else if(reg1.test(sVal)){
            oPhone.value = '';
            aMsg[1].className = 'msg';
            aCancel[1].style.display = 'none';
            bPhone = false;
        }else if(!reg2.test(sVal)){
            setError(aMsg[1],'手机号码格式不正确',oPhone);
            bPhone = false;
        }else{
            setOk(aMsg[1],oPhone);
            bPhone = true;
        }
    }
    oPhone.onfocus = function(){
        aMsg[1].className = 'tiptext';
        aMsg[1].innerHTML = '请输入中国大陆手机号,其他用户不可见';
    }
    oPhone.onkeydown = function(ev){
        var sVal = oPhone.value;
        console.log(ev.keyCode)
        if((ev.keyCode <48 || ev.keyCode >57 || sVal.length > 10) && ev.keyCode != 8 && ev.keyCode != 37 && ev.keyCode != 39){
            return false;
        }
    }
}
 
//验证密码
function checkPwd(){
    var bPwd1 = false,bPwd1 = false,bPwd2 = false,bPwd3 = false;
    oPwd.oninput = function(){
        var sVal = oPwd.value;
        //长度为8~14个字符
        var reg1 = /^.{8,14}$/;
        //支持数字，大小写字母和标点符号
        var reg2 = /[^0-9_a-z\.\!\@\s]/i;
        //不允许有空格
        var reg3 = /\s/g;
        //当输入内容长度为零时，让后面面板内容重置
        if(sVal.length == 0){
            aPwdCheckli[0].className = 'pwd-checklist-item';
            aPwdCheckli[1].className = 'pwd-checklist-item';
            aPwdCheckli[2].className = 'pwd-checklist-item';
        //当输入内容长度大于1时，再进行判断
        }else{
             if(!reg1.test(sVal)){
                aPwdCheckli[0].className = 'pwd-checklist-item pwd-checklist-item-error';
                bPwd1 = false;
            }else{
                aPwdCheckli[0].className = 'pwd-checklist-item pwd-checklist-item-success';
                bPwd1 = true;
            }
            if(reg2.test(sVal)){
                aPwdCheckli[1].className = 'pwd-checklist-item pwd-checklist-item-error';
                bPwd2 = false;
            }else{
                aPwdCheckli[1].className = 'pwd-checklist-item pwd-checklist-item-success';
                bPwd2 = true;
            }
            if(reg3.test(sVal)){
                aPwdCheckli[2].className = 'pwd-checklist-item pwd-checklist-item-error';
                bPwd3 = false;
            }else{
                aPwdCheckli[2].className = 'pwd-checklist-item pwd-checklist-item-success';
                bPwd3 = true;
            }
        }
    }
    //当点击密码的取消按钮时，需要将后面面板重置
    aCancel[2].onclick = function(){
        aPwdCheckli[0].className = 'pwd-checklist-item';
        aPwdCheckli[1].className = 'pwd-checklist-item';
        aPwdCheckli[2].className = 'pwd-checklist-item';
    }
    oPwd.onblur = function(){
        var sVal = oPwd.value;
        var reg = /^\s+$/;
        if(sVal == ''){
            oPwdChecklist.style.display = 'none'
            bPwd = false;
        }else if(reg.test(sVal)){
            oPwd.value = '';
            oPwdChecklist.style.display = 'none'
            aCancel[2].style.display = 'none';
            bPwd = false;
        //代表密码验证全部成功
        }else if(bPwd1 && bPwd2 && bPwd3){
            oPwdChecklist.style.display = 'none';
            aMsg[2].className = 'ok';
            bPwd = true;
        }
    }
    oPwd.onfocus = function(){
        oPwdChecklist.style.display = 'block';
        aMsg[2].className = 'msg';
    }
}
 

//验证验证码
function checkVerify(){
    oSmsBtn.onclick = function(){
        if(oPhone.value == ''){
            setError(aMsg[1],'请您输入手机号',oPhone)
            return false;
        }
        if(!bPhone){
            return false;
        }
        alert('发送短信');
    }
    oVerify.onblur = function(){
        var sVal = oVerify.value;
        var reg1 = /^\s+$/;
        var reg2 = /[a-z0-9]{6}/i;
        if(sVal == ''){
            aMsg[3].className = 'msg';
            bVerify = false;
        }else if(reg1.test(sVal)){
            oVerify.value = '';
            aMsg[3].className = 'msg';
            aCancel[3].style.display = 'none';
            bVerify = false;
        }else if(!reg2.test(sVal)){
            setError(aMsg[3],'请输入正确的验证码',oVerify)
            bVerify = false;
        }else{
            setOk(aMsg[3],oVerify);
            bVerify = true;
        }
    }
    oVerify.onkeydown = function(ev){
        var sVal = oVerify.value;
        var oEvent = ev || event;
        if(sVal.length > 5 && ev.keyCode != 8 && ev.keyCode != 37 && ev.keyCode != 39 ){
            return false;
        }

    }
    oVerify.onfocus = function(){
        aMsg[3].className = 'msg';
    }
}


//检测提交
function checkSubmit(){
    oSubBtn.onclick = function(){
        //输入值为空时的处理
        if(oUsername.value == ''){
            setError(aMsg[0],'请您输入用户名',oUsername);
        }
        if(oPhone.value == ''){
            setError(aMsg[1],'请您输入手机号',oPhone);
        }
        if(oPwd.value == ''){
            console.log('chucuo')
            setError(aMsg[2],'请您输入密码',oPwd);
        }else{
            setOk(aMsg[2],oPwd);
        }
        if(oVerify.value == ''){
            setError(aMsg[3],'请您输入验证码',oVerify);
        }
        if(!oAgree.checked){
            aMsg[4].style.display = 'inline';
        }
        if(bUsername && bPhone && bPwd && bVerify && oAgree.checked){
            oForm.submit();
        }
    }
}