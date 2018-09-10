<template>
    <div class = 'management'>
        <div class = 'topBar'>
            <el-select v-model="staffSearchDTO.status" placeholder="选择状态" @change='init'>
                <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.text"
                :value="item.value">
                </el-option>
            </el-select>
            <div class = 'right'>
                <div   @click="addNewForm" class="addBtn" style="display:inline-block;">新增人员</div>
                <div class = 'serBox'>
                    <input :class = "showSearch ? 'serActive':'search'" type="text" v-model="staffSearchDTO.multiCondition" :placeholder="showSearch ?  '请输入姓名或手机号' : '搜索'" @focus="searchAct" @blur="leave">
                </div>
            </div>
        </div>
        <div class = 'table'>
            <el-table
                :data="dataList"
                :row-class-name="tableRowClassName"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="140px">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="人员类型"
                    :formatter='formatType'                    
                    width="180px">
                </el-table-column>
                <el-table-column
                    prop="mobilePhone"
                    label="联系方式"
                    width="200px">
                </el-table-column>
                <el-table-column
                    prop="identityId"
                    label="身份证"
                    width="200px">
                </el-table-column>
                <el-table-column
                    v-if = 'type == 0 || type == 1'
                    prop="staffLevel"
                    label="作业许可级别"
                    width="160px">
                </el-table-column>
                <el-table-column
                    prop="timer"
                    label="作业证件到期时间"
                    width="240px">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    :formatter='formatState'
                    width="160px">
                    </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
                        <i class = 'icon detail'  @click = "handleDetail(scope.row.id)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="解除劳务关系" placement="top" v-if = 'scope.row.status != 1'>
                        <i class = 'icon delete' @click = "handleDelete(scope.row.id)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="恢复" placement="top" v-if = 'scope.row.status == 1'>
                        <i class = 'icon reback' @click = "handleBack(scope.row.id)"></i>
                    </el-tooltip>
                </template>
                </el-table-column>
            </el-table>
            <div style="text-align:center">
                <el-pagination
                    :page-size="size" @current-change = 'pageChange'
                    v-if = 'total > size'
                    layout="prev, pager, next"
                    :current-page="page"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="addNew" :before-close = 'close' :close-on-click-modal = "canClose" :close-on-press-escape = 'canClose'>
            <el-form :model="newForm" ref = "newForm" :rules="rules"  :disabled = 'isDetail' v-if = 'addNew'>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="人员姓名" label-width="80" prop='name'  :rules="[{ required: true, message: '人员姓名不能为空'}]">
                            <el-input v-model="newForm.name" @keyup.native="newForm.name = newForm.name.replace(/[^\u4e00-\u9fa5]/g,'')"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" label-width="80" prop='identityId'>
                            <el-input v-model="newForm.identityId" @keyup.native="newForm.identityId = newForm.identityId.replace(/[^0-9A-Za-z]/g,'')"></el-input>
                        </el-form-item>
                        <el-form-item label="办公电话" label-width="80" prop='phone'>
                            <el-input v-model="newForm.phone" @keyup.native="newForm.phone = newForm.phone.replace(/[^0-9-]/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="gender" :rules="[{ required: true, message: '性别不能为空'}]">
                            <el-radio-group v-model="newForm.gender">
                                <el-radio label="0" >男性</el-radio>
                                <el-radio label="1" >女性</el-radio>
                                <el-radio label="2" >保密</el-radio>
                            </el-radio-group>
                       </el-form-item>
                        <el-form-item label="手机号码" label-width="80" prop='mobilePhone' :rules="[{ required: true, message: '手机号码不能为空'}]">
                            <el-input v-model="newForm.mobilePhone" @keyup.native="newForm.mobilePhone = newForm.mobilePhone.replace(/\D/g,'')"></el-input>
                        </el-form-item>
                        <el-form-item label="户籍所在地" label-width="80" prop= 'homeAddress' :rules="[{ required: true, message: '户籍所在地不能为空'}]">
                            <el-input v-model="newForm.homeAddress" @keyup.native="newForm.homeAddress=newForm.homeAddress.replace(/[^\u4e00-\u9fa5]/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="现居地住址" label-width="80" prop = 'currAddress' :rules="[{ required: true, message: '现居地住址不能为空'}]">
                            <el-input v-model="newForm.currAddress" @keyup.native="newForm.currAddress=newForm.currAddress.replace(/[^\u4e00-\u9fa5]/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>    
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="警号：" label-width="80" prop = 'currAddress' :rules="[{ required: true, message: '警号不能为空'}]">
                            <el-input v-model="newForm.currAddress" @keyup.native="newForm.currAddress=newForm.currAddress.replace(/[^\u4e00-\u9fa5]/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>         
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleEdit(false)" v-if = 'isDetail'>编 辑</el-button>
                <el-button type="primary" @click="handleEdit(true)" v-if = 'isDetail'>修 正</el-button>
                <el-button type="primary" @click="save('newForm')" v-if = '!isDetail'>保 存</el-button>
                <el-button @click = "close">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import file from "./../components/upload";
    import Validator from "./../assets/js/filters";
    export default {
        components:{
            File:file
        },
        data (){
            return {
                auth:this.publics.global().auth,
                type:this.publics.global().auth.type,
                page:1,
                size:10,
                total:0,
                dataList:[],
                showSearch:false,//是否激活搜索
                personType:[],//人员类型下拉
                staffSearchDTO:{
                    multiCondition:'',//搜索框
                    type:'',//人员类型
                    status:'',//状态
                },
                copyForm:{},//copyform
                status:[
                    {value:-1,text:'全部'},
                    {value:0,text:'在职'},
                    {value:1,text:'离职'},
                    {value:2,text:'已锁定'},
                    {value:3,text:'账号冻结'}
                ],
                flag:true,//按钮开关
                dataList:[],
                mult:false,
                addNew:false,//新增人员
                newForm:{},
                isEdit:false,//编辑状态
                isDetail:false,//详情状态
                isCorrect:false,//是否修正
                upload:[
                    {type:0,dataurl:'',url:''},
                    {type:0,dataurl:'',url:''},
                    {type:0,dataurl:'',url:''},
                    {type:0,dataurl:'',url:''},
                    {type:0,dataurl:'',url:''},
                    {type:0,dataurl:'',url:''},
                ],
                canClose:false,
                rules:{
                    mobilePhone: [{ required: true, validator:Validator.tels,trigger: "blur"} ],
                    phone: [{ required: true, validator:Validator.phone,trigger: "blur"} ],
                    identityId:[{ required: true, validator:Validator.identityId,trigger: "blur"} ],
                    drivingLicence:[{ required: true, validator:Validator.drivingLicence,trigger: "blur"} ],
                    licenceNumber:[{ required: true, validator:Validator.licenceNumber,trigger: "blur"}]
                },
            }
        },
        computed:{
            title:function(){
                    if(this.isDetail){
                        return '查看详情'
                    }else if(this.isEdit){
                        return '修改人员信息'
                    }else{
                        return '新增人员'
                    }
                },
            
        },
        created(){
            let type = this.auth.type
            // type 2 运输公司
            if(type == 0 || type == 1){//爆破公司
                this.level = this.publics.Config.level; 
            }
            this.personType = ([{value:-1,text:'全部'}]).concat(this.publics.Filters.convert(this.type).person());
            // this.personType = ([{value:'',text:'全部'}]).concat(this.publics.Filters.convert(this.type).person())
            this.initNewForm();
            this.init();
        },
        mounted(){
          
        },
        methods:{
            initNewForm(){//表单初始
                if(this.$refs['newForm']!==undefined){
                    this.$refs['newForm'].clearValidate();
                }
            
            },
            addNewForm(){
                this.addNew = true;
                this.initNewForm();
            },
            init(){
                (this.staffSearchDTO.type == -1) && (this.staffSearchDTO.type = '');
                (this.staffSearchDTO.status == -1) && (this.staffSearchDTO.status = '');
                this.publics.AJAX.$POST({
                    url:"dept/user/" + this.auth.userId + '/staff/' + this.page + '/' + this.size,
                    data:this.staffSearchDTO,
                    success:(res)=>{
                        console.log(res)
                        this.total = res.count;
                        if(res.list && res.list.length == 0){
                            this.dataList = res.list
                            return false
                        }
                        res.list.map(v=>{
                           v.identityId = v.identityId.substring(0,10) + '****' + v.identityId.substring(14);
                           if(v.type == 4 || v.type == 8){
                                v.staffLevel = this.publics.Filters.convert(Number(v.staffLevel)).level();
                           }else{
                               v.staffLevel = '-'
                           }
                           if(v.status == 1){
                               v.timer = '-'
                           }else{
                               let now = new Date().getTime();
                               let day = (v.proximateIndate - now) / 1000 / 3600 / 24;
                               if(day <= 30 && day > 0){//少于三十天
                                   v.timer = v.proximateDes + '剩余' + Math.ceil(day) + '天'  
                               }else if(day > 30){
                                   v.timer = this.publics.Filters.timer(v.proximateIndate)
                               }else{
                                   v.timer = v.proximateDes + '已过期'
                               }
                           }
                            return v  
                        })
                        this.dataList = res.list
                    }
                }) 
            },
            searchAct(){
                this.showSearch = true;
            },
            leave(){//搜索blur
                if(this.staffSearchDTO.multiCondition == ''){
                    this.showSearch = false;
                }
                this.init();
            },
            formatState(row){//列表状态过滤器
                if(row.status == 0){
                    return '在职'
                }else if(row.status == 1){
                    return '离职'
                }else if(row.status == 2){
                    return '锁定'
                }else{
                    return '账号冻结'
                }
            },
            formatType(row){//列表状态过滤器
                    let data = this.personType.filter(v=>{
                        return v.value == row.type
                    })[0].text
                    return data
            },
            tableRowClassName(row) {
                if(this.type == 0){
                    if (row.row.status == 1) {
                    return 'warning-row';
                    } else if (row.row.status == 0) {
                    return 'success-row';
                    }
                    return '';
                }else{
                    if (row.row.status == 1) {
                    return 'warning-row1';
                    } else if (row.row.status == 0) {
                    return 'success-row1';
                    }
                    return '';
                }
            },
            save(formName){//新增 保存
            if(!this.flag){
                return
            }
            this.flag = false;
            this.$refs[formName].validate((valid) => {
                
                if (valid) {
                    let data = this.newForm;
                        if(data.drivingLicence && (data.drivingLicence != data.identityId)){
                            this.$message.error('驾驶证号应与身份证号一致');
                            return false
                        }
                        if(data.type == 6 ||data.type == 5){//运输公司
                            data.qualificationLicenceIndate && (data.qualificationLicenceIndate = new Date(data.qualificationLicenceIndate).getTime());//从业资格 
                            data.licenceNumberIndate = null;
                        }else{
                            data.licenceNumberIndate && (data.licenceNumberIndate = new Date(data.licenceNumberIndate).getTime()); //许可证
                            data.qualificationLicenceIndate = null;
                        }
                        if(data.type == 6){//驾驶员
                            data.drivingLicenceIndate && (data.drivingLicenceIndate = new Date(data.drivingLicenceIndate).getTime());//驾驶证到期时间
                        }else if(data.type == 5){
                            data.drivingLicenceIndate = null
                            data.imgs = data.imgs.slice(0,6)     
                        }
                        data.laborContractIndate = new Date(data.laborContractIndate).getTime(); 
                        data.responsibilityAgreementIndate = new Date(data.responsibilityAgreementIndate).getTime();
                    this.$confirm('确认人员信息无误？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                                if(this.isEdit){//编辑状态
                                    let copy = JSON.parse(JSON.stringify(this.copyForm));
                                    let change = false;
                                    for (let key in copy){
                                        if(key == 'imgs'){
                                            let imgs = [];
                                            copy[key].forEach((v,i)=>{
                                                if(v.photo){
                                                    (v.photo != data.imgs[i].photo ) && imgs.push(data.imgs[i])
                                                }else{
                                                    JSON.stringify(v.photoList) != JSON.stringify(data.imgs[i].photoList) && imgs.push(data.imgs[i])
                                                }
                                            })
                                            if(imgs.length == 0){
                                                copy.imgs = null
                                            }else{
                                                copy.imgs = imgs
                                                change == false && ( change = true ) 
                                            }
                                        }else{
                                                if(copy[key] == data[key]){
                                                    copy[key] = null;
                                                }else{
                                                    copy[key] = data[key]
                                                    change == false && ( change = true ) 
                                                }
                                        }
                                    }
                                    // console.log(copy)
                                    // return false;
                                    if(!change){
                                        this.$message({
                                            message: '您未修改任何数据',
                                        });
                                        this.close()
                                        return 
                                    }
                                    (copy.staffLevel == undefined) && (copy.staffLevel = data.staffLevel);
                                    copy.updateMan = this.auth.userId;//修改人
                                    copy.id = data.id;//被修改人
                                    if((copy.type != 4) && (copy.type != 8) && (copy.type != null && data.type != 4 && data.type != 8)){//清空
                                        copy.staffLevel = null
                                    }
                                    if(this.isCorrect){//修正
                                        this.publics.AJAX.$POST({
                                            url:"dept/staff/modify",
                                                data:copy,
                                                type:'patch',
                                                success:(res)=>{
                                                    this.init();
                                                    this.$message({
                                                        message: '人员修正成功',
                                                        type:'success'
                                                    });
                                                    this.close();
                                                },
                                                fail:()=>{
                                                    this.$refs['newForm'].clearValidate();
                                                }
                                        }) 
                                    }else{
                                        this.publics.AJAX.$POST({
                                            url:"dept/staff",
                                                data:copy,
                                                type:'patch',
                                                success:(res)=>{
                                                    this.init();
                                                    this.$message({
                                                        message: '人员更新成功',
                                                        type:'success'
                                                    });
                                                    this.close()
                                                },
                                                fail:()=>{
                                                    this.$refs['newForm'].clearValidate();
                                                }
                                        }) 

                                    }
                                }else{//新增
                                    data.inputMan = this.auth.userId;
                                    this.publics.AJAX.$POST({
                                        url:"dept/staff",//新增人员
                                            data:data,
                                            success:(res)=>{
                                                this.init();
                                                this.$message({
                                                    message: '新增人员成功',
                                                    type: 'success'
                                                });
                                                this.close();
                                            },
                                            fail:(err)=>{
                                                this.$refs['newForm'].clearValidate(); 
                                            }
                                    }) 

                                }
                        }).catch(() => {
                            // this.initNewForm()
                    });
                    
                } else {
                    return false;
                }
                });
            },
            pageChange(i){//分页
                this.page = i
                this.init();
            },
            handleDetail(id) {//查看

                    this.publics.AJAX.$POST({
                        url:"dept/user/" + this.auth.userId + '/staff/' + id,
                        type:'get',
                        success:(res)=>{
                            if(this.type == 2){   //运输公司
                                this.handleCommand(res.type)
                            }
                            this.addNew = true;
                            this.isDetail = true;
                            this.newForm = res;
                            this.newForm.gender = String(this.newForm.gender)
                            let imgs = this.newForm.imgs;
                            this.upload = this.upload.map((v,i)=>{
                                if(imgs[i]){
                                    imgs[i].photo ? (v.url = imgs[i].photo) : (v.url = imgs[i].photoList);
                                    imgs[i].photo ? (v.dataurl = imgs[i].photo) : (v.dataurl = imgs[i].photoList);
                                }else{
                                    v.url = '';
                                    v.dataurl = '';
                                }
                                return v
                            })
                        }
                    })                 
            },
            handleDelete(id) {//删除
                this.$confirm('确认解除劳务关系？', '提示', {
                    confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                                this.publics.AJAX.$POST({
                                    url:"dept/user/" + this.auth.userId + '/updateStaffStatus/' + id,
                                    type:'patch',
                                    success:(res)=>{
                                        this.init();
                                        this.$message({
                                            message: '解除劳务关系成功',
                                            type: 'success'
                                        });
                                    }
                                }) 
                        }).catch(() => {
                           
                    });
            },

            handleBack(id) {//恢复
                this.$confirm('确认恢复该人员？', '提示', {
                    confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                                this.publics.AJAX.$POST({
                                    url:"dept/user/" + this.auth.userId + '/restoreStaffStatus/' + id,
                                    type:'patch',
                                    success:(res)=>{
                                        this.init();
                                        this.$message({
                                            message: '人员恢复成功',
                                            type: 'success'
                                        });
                                    }
                                }) 
                        }).catch(() => {
                           
                    });
            },
            typeChange(data){//身份切换
                if(this.isEdit && this.type == 2){
                    if(data == 5){//押运员
                        this.upload = this.upload.slice(0,6);
                        this.newForm.imgs = this.newForm.imgs.slice(0,6);
                    }else if(data == 6){//驾驶员
                        this.upload = this.upload.slice(0,6).concat([{type:0,dataurl:'',url:''},{type:0,dataurl:'',url:''}]);
                        this.newForm.imgs = this.newForm.imgs.slice(0,6).concat([{photo: "",type: 5},{photo: "",type: 6}]);
                    }

                }

            },
            handleCommand(type){//运输公司
                this.addNew = true;
                this.initNewForm();
                this.newForm.type = Number(type);
                // this.newForm.qualificationLicence = '';
                if(type == 5){//押运员
                    this.newForm.imgs = [
                        {photo: "",type: 3},
                        {photo: "",type: 1},
                        {photo: "",type: 2},
                        {photo: "",type: 7},
                        {photoList: "",type: 9},
                        {photoList: "",type: 10},
                    ];
                }else{//驾驶员
                    this.newForm.drivingLicence = '';
                    this.newForm.imgs = [
                        {photo: "",type: 3},
                        {photo: "",type: 1},
                        {photo: "",type: 2},
                        {photo: "",type: 7},
                        {photoList:[],type: 9},
                        {photoList:[],type: 10},
                        {photo: "",type: 5},
                        {photo: "",type: 6},
                    ];
                    this.upload = [
                        {type:0,dataurl:'',url:''},
                        {type:0,dataurl:'',url:''},
                        {type:0,dataurl:'',url:''},
                        {type:0,dataurl:'',url:''},
                        {type:0,dataurl:'',url:''},
                        {type:0,dataurl:'',url:''},
                        {type:0,dataurl:'',url:''},
                        {type:0,dataurl:'',url:''},
                    ]
                }

            },
            handleEdit(flag){//切换为编辑状态
                this.isCorrect = flag;
                this.isEdit = true;
                this.isDetail = false;
                this.copyForm = JSON.parse(JSON.stringify(this.newForm));
                this.upload = this.upload.map((v,i)=>{
                    v.url = v.dataurl; 
                    return v
                })                
                this.$refs['newForm'].clearValidate();
            },
            close(){
                this.initNewForm();
                this.addNew = false;
                this.isEdit = false;
                this.isDetail = false;
                this.copyForm = {};
                this.$refs['newForm'].clearValidate()//清除验证
                this.$refs['newForm'].resetFields()//清除验证
                this.flag = true;
            }   
        }
    }
</script>
<style lang = 'scss'>
.management{
    background: #F5F6FA;
    .topBar{
        position: relative;
        background: #fff;
        height: 63px;
        padding:0 30px; 
        .el-select{
            display:inline-block;
            width:10%;
            margin:10px;
        }
        .serBox{
            display:inline-block;
            margin-left:20px;
            input{
                cursor: pointer;
                width: 80px;
                height: 32px;
                line-height: 32px;
                transition: width .5s;
            }
            .search{
                cursor: pointer;
                padding-left: 10px;
                text-align: center;
                border: 1px solid #4B74FF;
                background: url('../assets/img/ser.png') no-repeat 15% 50%;
                border-radius: 24px;
            }
            input::-webkit-input-placeholder{
                color:#4B74FF;
            }
            input::-moz-placeholder{  
                color:#4B74FF;
            }
            input:-moz-placeholder{   
                color:#4B74FF;
            }
            input:-ms-input-placeholder{  
                color:#4B74FF;
            }
            .serActive{
                width: 200px;
                padding: 0 10px;
                color: #999;
                border: 1px solid #4B74FF;
                border-radius: 5px;
            }
        }
        .right{
            position: absolute;
            top:15px;
            left: 75%;

        }
        .addBtn{
            cursor: pointer;
            background: #4B74FF;
            /* width: 88px; */
            padding:0 10px;
            height: 32px;
            border-radius: 24px;
            color: #fff;
            font-size: 14px;
            text-align: center;
            line-height: 32px;
        }
    }
    .table{
        margin: 21px 40px;
        background: #fff;
        .icon{
            display: inline-block;
            width: 17px;
            height: 17px;
            margin: 0 7px;
        }
        .detail{
            background: url('../assets/img/detail.png')
        }
        .delete{
            background: url('../assets/img/delete.png')
        }
        .reback{
            background: url('../assets/img/reback.png')
        }
    }
    .el-form-item__label{
        line-height: 40px;
        width: 100%;
        text-align: left;
    }
    .el-form-item{
        margin-bottom: 10px;
    }
    .el-dialog__body{
        box-sizing: border-box;
        padding:0 100px;
    }
    .el-select,.el-radio-group{
        width: 100%;
    }
    .uploadfile{
        width: 158px;
        height: 100px;
    }
    .dialog-footer{
        text-align: center;
    }
    .el-button+.el-button{
        margin-left: 28px;
    }
    .el-dialog{
        background: url('../assets/img/dialog_bg.png') no-repeat 0% 100%;
        background-size: 100% 40%;
        background-color: #fafafa;
    }
    .success-row td:nth-child(7) .cell{
        color: rgb(14, 155, 14);
    }
    .warning-row td:nth-child(7) .cell{
        color: #FF4B4B;
    }
    .success-row1 td:nth-child(6) .cell{
        color: rgb(14, 155, 14);
    }
    .warning-row1 td:nth-child(6) .cell{
        color: #FF4B4B;
    }
}
</style>
