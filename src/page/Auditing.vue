<template>
    <div class="auditing">
        <div class = 'topBar'>
            <el-select v-model="staffSearchDTO.seachid" placeholder="选择状态" @change='seach'>
                <el-option
                v-for="item in staffSearchDTO.list"
                :key="item.value"
                :label="item.text"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class = 'table'>
            <el-table
                :data="dataList"
                style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="name" label="审批类型" width="200px" :formatter='type'></el-table-column>
                <el-table-column prop="projectName" label="项目" width="240px"> </el-table-column>
                <el-table-column prop="trustorName" label="申请单位" width="280px"></el-table-column>
                <el-table-column prop="createTime" label="申请时间" width="280px" :formatter='timer'></el-table-column>
                <el-table-column prop="status"  label="状态" :formatter='formatState' width="160px"></el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleDetails(scope.row.id,scope.row.type,scope.row.status)">查看</el-button>
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
        <el-dialog :title="diaglog.title" :visible.sync="diaglog.show"  :before-close="disClose" id="node" class="diaglog" :close-on-click-modal = "false" :close-on-press-escape = 'false'>
                <div class="putbox" v-if="diaglog.type==4">  <!--购买审批-->
                    <table  border="1" class="table" width="100%">
                        <tr>
                            <td width='100'>项目：</td>
                            <td width="200"> 
                                <span>{{details.projectName}}</span>
                            </td>
                            <td width="100">项目级别：</td>
                            <td width="150">{{publics.Filters.convert(details.projectLevel).projectLevel()}} ,第   {{details.order}}   次购买</td>
                            <td width="100">仓库：</td>
                            <td width="150">{{details.warehouseName}}</td>
                        </tr>
                    </table>
                    <table  border="1" class="table" width="100%">
                        <thead>
                            <td colspan="9">项目物品信息</td>
                        </thead>
                        <tbody>
                            <tr v-for="(i,index) in details.projectPurchaseNumberList">
                                <td width='100'>
                                <span v-if="i.type==1">审批总量</span>  
                                <span v-if="i.type==2">可购买量</span>  
                                <span v-if="i.type==3">项目库余量</span>  
                                </td>
                                <td width='100'>炸药</td>
                                <td width='150'>{{i.zaYao}}千克</td>
                                <td>雷管</td>
                                <td width='100'>{{i.leiGuan}}发</td>
                                <td>导爆管</td>
                                <td width='100'>{{i.daoBaoGuan}}米</td>
                                <td>导爆索</td>
                                <td width='100'>{{i.daoBaoSuo}}米</td>
                            </tr>
                        </tbody>
                    </table>
                    <table  border="1" class="table" width="100%"  v-if="details.blastlist">
                            <thead>
                                <td colspan="6">购买物品信息</td>
                            </thead>
                            <tbody>
                                <tr>
                                    <td :rowspan="details.blastlist.zy.length+1" colspan="2" width="140">炸药</td>
                                    <td width="240">品名</td>
                                    <td width="240">型号</td>
                                    <td width="240">数量（kg）</td>
                                </tr>
                                <tr v-for="(i,index) in details.blastlist.zy">
                                    <td>{{i.pyrotechnicsName}}</td>
                                    <td>{{i.pyrotechnicsModel}}</td>
                                    <td>{{i.pyrotechnicsNumber}}</td>
                                </tr>
                                <tr>
                                    <td :rowspan="details.blastlist.lg.length+1" colspan="2" width="60">雷管</td>
                                    <td>类型</td>
                                    <td>段别</td>
                                    <td>数量（发)</td>
                                </tr>
                                <tr  v-for="(i,index) in details.blastlist.lg" >
                                    <td>{{i.pyrotechnicsName}}</td>
                                    <td>
                                        <div  class="lgsml">
                                            <el-input v-model="i.pyrotechnicsModel.d" :disabled="true">
                                                <template slot="append">段</template>
                                            </el-input>
                                            <el-input v-model="i.pyrotechnicsModel.m" :disabled="true">
                                                <template slot="append">米</template>
                                            </el-input>
                                        </div>
                                    </td>
                                    <td>{{i.pyrotechnicsNumber}}</td>
                                </tr>
                                <tr>
                                    <td width="100" colspan="2" rowspan="2">工业索类</td>
                                    <td width="140">导爆索</td>
                                    <td width="100">
                                        <el-input v-model="details.blastlist.dbg.pyrotechnicsNumber || 0" :disabled="true" >
                                            <template slot="append">米</template>
                                        </el-input>
                                    </td>
                                    <td>/</td>
                                </tr>
                                <tr>
                                    <td width="50">导爆管</td>
                                    <td width="100">
                                        <el-input v-model="details.blastlist.dbs.pyrotechnicsNumber || 0" :disabled="true ">
                                            <template slot="append">米</template>
                                        </el-input>
                                    </td>
                                    <td>/</td>
                                </tr>
                         </tbody>
                    </table>
                    <div class="jgarea" v-if="details.projectSecurityApprovalDTOList">
                        <img src="../assets/img/oky.png" v-if="details.spstatus==4">
                        <img src="../assets/img/err.png" v-if="details.spstatus==3">
                        <dl>
                            <dt>审核信息</dt>
                            <dd v-for="(i,index) in details.projectSecurityApprovalDTOList">
                                <font color="#39ad00" v-if="i.status==0" >[申请]</font>
                                <font color="#f00" v-if="i.status==3 || i.status==1" >[驳回]</font>
                                <font color="#39ad00" v-if="i.status==4 || i.status==2">[同意]</font>
                                <span>{{i.opinion}}</span>
                                (<span>{{i.deptName}}</span>,<span>{{i.approvalManName}}</span>,<span>{{publics.Filters.timer(i.approvalTime)}}</span>)
                            </dd>
                        </dl>
                    </div>
                    <div class="area" v-if='diaglog.status==0'>
                        <textarea v-model="textarea" placeholder="审批意见"></textarea>
                        <div class="btn">
                            <el-button @click="handleEdit(3)">驳回</el-button>
                            <el-button type="primary" @click="handleEdit(4)" >通过</el-button>
                        </div>
                    </div>
                   
                </div>
                <div class="putbox">

                </div>
        </el-dialog>
    </div>
</template>
<script>
    import toast from "../components/toast";
    export default {
        data (){
            return {
                 diaglog:{       // 弹出框  
                     show:false, //是否现实
                     type:0,    // 弹出状态
                     title:"购买申请审批",      
                     data:[],   //存储数据
                     status:'',
                     id:''  //审批的id
                },
                staffSearchDTO:{
                    seachid:4,
                    list:[
                        {value:0,text:'一爆一批审批'},
                        {value:1,text:'一爆一批变更审批'},
                        {value:2,text:'变更审批'},
                        {value:3,text:'总项目审批'},
                        {value:4,text:'购买审批'},
                        {value:5,text:'行政中心出证'},
                    ],
                },
                auth:this.publics.global().auth,
                page:1,
                size:10,
                total:0,
                dataList:[],
                textarea:null
            }
        },
        created(){
            this.init();
        },
        methods:{
            disClose(){ //关闭
                this.diaglog.show=false;
            },
            init(){
                this.publics.AJAX.$POST({
                    url:"police/user/"+this.auth.userId+"/projectSecurity/"+this.page+"/"+this.size,
                    data:{
                        type:this.staffSearchDTO.seachid,
                    },
                    success:(e)=>{
                       console.log(e)
                       this.dataList=e.list;
                       this.total=e.count
                    }
                })
            },
            handleEdit(type){//审批
                if(this.diaglog.type==4){      
                     if(!this.textarea && type==2){
                         this.$message({
                            type:"error",
                            message:"请输入驳回意见！"
                         })
                         return false;
                     }
                     this.publics.AJAX.$POST({
                            url:"police/projectSecurity",
                            data:{
                                approvalManId:this.auth.userId,
                                id:this.diaglog.id,
                                opinion:this.textarea,
                                status:type
                            },
                            success:(e)=>{
                               this.$message({
                                   type:"success",
                                   message:"审批完成！"
                               })
                               setTimeout(e=>{
                                   window.history.go(0)
                               },1000)
                            }
                    })     
                  
                
                }
            },
            handleDetails(id,type,status){  //查看详情
                this.diaglog.type=type;
                this.diaglog.status=status;
                this.diaglog.id=id;
                this.publics.AJAX.$POST({
                    url:"police/projectSecurity/"+id,
                    type:"get",
                    success:(e)=>{
                        console.log(e)
                        let details=e.projectPurchaseRegDTO;
                        if(e.projectSecurityApprovalDTOList){
                            details.projectSecurityApprovalDTOList=e.projectSecurityApprovalDTOList;
                            details.spstatus=e.projectSecurityApprovalDTOList[e.projectSecurityApprovalDTOList.length-1].status;
                        }
                        details.blastlist={zy:[],lg:[],dbs:{},dbg:{}}
                        
                        for(let val of details.pyrotechnics){
                            if(val.pyrotechnicsType==1){
                                 details.blastlist.zy.push(val)
                            }
                            else if(val.pyrotechnicsType==2){
                                val.pyrotechnicsModel={
                                    d:val.pyrotechnicsModel.split("-")[0],
                                    m:val.pyrotechnicsModel.split("-")[1]
                                }
                                details.blastlist.lg.push(val)
                            }
                            else{
                                if(val.pyrotechnicsModel==1){
                                    details.blastlist.dbg=val
                                }else{
                                    details.blastlist.dbs=val
                                }
                            }
                        }
                        if(details.blastlist.zy.length==0){
                            details.blastlist.zy=[{           
                                pyrotechnicsModel:"/",          
                                pyrotechnicsName:"/",           
                                pyrotechnicsNumber:"/",          
                                pyrotechnicsType:1,            
                                pyrotechnicsUnit:"千克",      
                            }]
                        }
                        if(details.blastlist.lg.length==0){
                            details.blastlist.lg=[ {
                                pyrotechnicsModel:{d:"/",m:"/"},  
                                pyrotechnicsName:"/",           
                                pyrotechnicsNumber:"/",         
                                pyrotechnicsType:2,             
                                pyrotechnicsUnit:"发",        
                            }]
                        }
                        if(details.blastlist.dbg==null){
                            details.blastlist.dbg={           
                                pyrotechnicsModel:"1",          
                                pyrotechnicsName:"导爆物",      
                                pyrotechnicsNumber:"/",        
                                pyrotechnicsType:3,            
                                pyrotechnicsUnit:"米",         
                            }
                                    
                        }
                        if(details.blastlist.dbs==null){
                            details.blastlist.dbs={
                                pyrotechnicsModel:"2",        
                                pyrotechnicsName:"导爆物",   
                                pyrotechnicsNumber:"/",      
                                pyrotechnicsType:3,         
                                pyrotechnicsUnit:"米",     
                            }
                        }
                        this.show=1;
                        this.diaglog.show=true;
                        this.details=details;
                    }
                })
            },
            type(e){
                for(let val of this.staffSearchDTO.list){
                    if(val.value==e.type){
                        this.diaglog.title=val.text;
                        return val.text
                    }
                }
            },
            timer(e){
                return this.publics.Filters.timer(e.createTime); 
            },
            formatState(e){
                let status=["待审批","通过","驳回"];
                return status[e.status];
            },
            pageChange(i){
                this.page=i;
                this.init();
            },
            tableRowClassName(row){
                if (row.row.status == 0) {
                    return 'blue';
                } else if (row.row.status == 2) {
                    return 'red';
                } else if (row.row.status == 1 || row.row.status == 3) {
                    return 'green';
                }else
                    return ''
            }
        }
    }
</script>
<style lang="scss">
  .auditing{
    background: #F5F6FA;
    .red td:nth-child(5){
                color:#f00;
            }
            .blue td:nth-child(5){
                color:#03A9F4;
            }
             .green td:nth-child(5){
                color:#0e9b0e;
          }
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
    .diaglog{
         .table{
            border-collapse: collapse;
            text-align: center;
            border:solid thin #979797;
            td,tr,th{
                border-color: #979797;   
                height:40px;
                font-size: 14px;
                color:#333;
                overflow: hidden;
                .el-form-item{
                    margin:0;
                    .el-input__inner {
                        border-radius:0;
                        border-color:#fff;
                        text-align: center;
                    }
                   
                }
                .el-select{
                     .el-input__inner {
                         text-align: center;
                     }
                }
               
                i{
                    cursor: pointer;
                    margin:0 5px;
                }
                i:hover{
                    color:#03A9F4;
                }
                .el-icon-minus:hover{
                    color:#f00;
                }
                .find{
                    display: block;
                    line-height: 40px;
                    width: 20%;
                    text-align: center;
                    float:right;
                    text-align: center;
                }
                .find:hover{
                    color:#03A9F4;
                }
                .el-input__inner {
                    border:0 none;
                }
                .selectcity{
                    width:100%;
                }
                .sml{
                    width:80%;
                    float:left;
                }
                 .lgsml{
                    width:100%;
                    .el-input{
                        float:left;
                        width:45%;
                        .el-input__inner{
                            padding:0;
                            text-align: center;
                        }
                        .el-input-group__append{
                            padding:0 10px 0 0;
                        }
                    }
                }
                
            }
            .el-range-editor.is-disabled{
                background: none!important;
            }
            .el-date-editor{
                width:100%;
            }
            .is-disabled input,.is-disabled .el-cascader__label{
                background: none!important;
                color:#333!important;
                text-align: center;
            }
            .pgtable_add{
                color:#979797;
                font-size: 20px;
                cursor: pointer;
                height:20px;
            }
            .pgtable_add:hover{
                color:steelblue;
            }
            thead{
                font-weight: bold;
                td,tr,th{
                    height:38px;
                }
            }
            margin-bottom: 10px;
            .el-input-group__append, .el-input-group__prepend{
                background: none;
                border:0 none;
            }
        }
        .subbtn{
            margin-top:30px;
            text-align: center;
        }
        .area{
            textarea{
                width:100%;
                height:60px;
                border:1px solid #ccc;
                border-radius:2px;
                padding:8px;
                font-size: 14px;
            }
            .btn{
                margin-top:10px;
                text-align: right;
            }
        }
        .jgarea{
            position: relative;
            margin-bottom: 20px;
            img{
                width:150px;
                right:40px;
                position: absolute;
                top:-30px;
            }
            dt{
                line-height: 30px;
                font-size: 16px;
                color:#333;
            }
            dd{
                line-height: 24px;
            }
            span{
                display: inline-block;
                padding:0 4px;
            }
        }
    }
}
</style>
