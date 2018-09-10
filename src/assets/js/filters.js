const Validator = {
  tels(rule, value, callback){//手机号
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
            if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value))) {
              callback(new Error('请输入正确的手机号'));
            } else {
              callback();
            }
        }, 1000);
  },
  phone(rule, value, callback){//办公电话
        if (!value) {
          return callback(new Error('办公电话不能为空'));
        }
        setTimeout(() => {
            if (!(/^([0-9]|[-])+$/g.test(value))) {
              callback(new Error('请输入正确的办公电话'));
            } else {
              callback();
            }
        }, 1000);
  },
  email(rule, value, callback){
    if (!value) {
      return callback(new Error('邮箱不能为空'));
    }
    setTimeout(() => {
        if (!(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))) {
          callback(new Error('请输入正确的公司邮箱'));
        } else {
          callback();
        }
    }, 1000);
   },
   txm(rule, value, callback){
    if (!value) {
      return callback(new Error('营业执照代码不能为空'));
    }
    setTimeout(() => {
        if (value.length<18 || value.length>20) {
          callback(new Error('请输入正确的营业执照代码'));
        } else {
          callback();
        }
    }, 1000);
   },
   licenceNumber(rule, value, callback){
    if (!value) {
      return callback(new Error('许可证编号不能为空'));
    }
    setTimeout(() => {
        if (value.length!=13) {
          callback(new Error('请输入正确的许可证编号'));
        } else {
          callback();
        }
    }, 1000);
   },
   frameNumber(rule, value, callback){
    if (!value) {
      return callback(new Error('车架号不能为空'));
    }
    setTimeout(() => {
        if (value.length!=17) {
          callback(new Error('请输入正确的车架号'));
        } else {
          callback();
        }
    }, 1000);
   },
   identityId(rule,value,callback){
    if(!value){
      return callback(new Error('身份证号不能为空'))
    }
    setTimeout(()=>{
      if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))){
        callback(new Error('请输入正确的身份证号'))
      }else{
        callback()
      }
    })
   },
   drivingLicence(rule,value,callback){
    if(!value){
      return callback(new Error('驾驶证号不能为空'))
    }
    setTimeout(()=>{
      if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))){
        callback(new Error('请输入正确的驾驶证号'))
      }else{
        callback()
      }
    })
   },
   carNumber(rule, value, callback){
    if (!value) {
      return callback(new Error('车牌号不能为空'));
    }
    setTimeout(() => {
        if (!(/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(value))) {
          callback(new Error('请输入正确的车牌号'));
        } else {
          callback();
        }
    }, 1000);
   }
}
export default Validator;
