<template>
    <div>
        <el-card>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/home/user/userManage' }">账号管理</el-breadcrumb-item>
                <el-breadcrumb-item>企业单位基本情况表</el-breadcrumb-item>
                <!-- <template slot="title">待办</template> -->
            </el-breadcrumb>
            <el-form class="form" ref="form" :model="Form" size="mini" label-width="auto" :inline="true">
                <p>基本信息</p>
                <hr class="hr" />
                <el-form-item label="统一社会信用代码">
                    <el-input v-model="Form.uscCode" clearable :maxlength="18"></el-input>
                </el-form-item>
                <el-form-item label="组织机构代码">
                    <el-input v-model="Form.ifCode" clearable :maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="法定代表人（负责人）">
                    <el-input v-model="Form.principalName" clearable></el-input>
                </el-form-item>
                <el-form-item label="法人单位名称">
                    <el-input v-model="Form.company" clearable></el-input>
                </el-form-item>
                <el-form-item label="电话号码（传真号码）">
                    <el-input v-model="Form.companyTel" clearable></el-input>
                </el-form-item>
                <p>通讯地址</p>
                <hr class="hr" />
                <el-form-item label="详细地址">
                    <el-input v-model="Form.address" clearable type="textarea" :rows="2" style="width:193px"></el-input>
                </el-form-item>
                <el-form-item label="电子信箱（或网址）">
                    <el-input v-model="Form.email" clearable></el-input>
                </el-form-item>
                <el-form-item label="邮政编码，行政区划">
                    <el-input v-model="Form.postalCode" clearable></el-input>
                </el-form-item>
                <p>行业类别</p>
                <hr class="hr" />
                <el-form-item label="主要业务活动">
                    <el-input v-model="Form.operational" type="textarea" :rows="2" style="width:193px"></el-input>
                </el-form-item>
                <el-form-item label="行业代码">
                    <el-input v-model="Form.industryCode" clearable :maxlength="4"></el-input>
                </el-form-item>
                <p>开业时间</p>
                <hr class="hr" />
                <el-form-item label="开业时间">
                    <el-date-picker
                        clearable
                        v-model="Form.openingTime"
                        type="month"
                        placeholder="选择时间"
                        style="width:193px"
                    >
                    </el-date-picker>
                </el-form-item>
                <p>企业登记注册类型</p>
                <hr class="hr" />
                <el-form-item label="企业登记注册类型">
                    <el-select
                        clearable
                        v-model="Form.companyLoginType"
                        placeholder="请选择"
                        filterable
                        style="width:193px"
                    >
                        <el-option
                            clearable
                            v-for="item in enrollOptions"
                            :key="item.value"
                            :label="item.value + ' - ' + item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 企业登记注册资本 -->
                <p>企业登记注册资本</p>
                <hr class="hr" />
                <el-form-item label="登记注册资本合计">
                    <el-input v-model="Form.login_total">
                        <template slot="append">万元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="国家资本">
                    <el-input v-model="Form.county_total">
                        <template slot="append">万元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="集体资本">
                    <el-input v-model="Form.collective_total">
                        <template slot="append">万元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="法人资本">
                    <el-input v-model="Form.legalPerson_total">
                        <template slot="append">万元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="个人资本">
                    <el-input v-model="Form.self_total">
                        <template slot="append">万元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="港澳台资本">
                    <el-input v-model="Form.HMT_total">
                        <template slot="append">万元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="外商资本">
                    <el-input v-model="Form.foreign_total">
                        <template slot="append">万元</template>
                    </el-input>
                </el-form-item>
                <!-- 从业人员情况 -->
                <p>从业人员情况</p>
                <hr class="hr" />
                <el-table :data="tableData.list" border size="mini" style="width: 460px;marginTop:10px">
                    <el-table-column align="center" width="250" label="指标名称" prop="targets"> </el-table-column>
                    <el-table-column align="center" width="100" label="共计" prop="total">
                        <template slot-scope="scoped">
                            <el-input required size="mini" v-model="scoped.row.total"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="其中：女性">
                        <template slot-scope="scoped">
                            <el-input required size="mini" v-model="scoped.row.womanTotal"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 基础设施 -->
                <p>基础设施</p>
                <hr class="hr" />
                <div class="infrastructure">
                    <el-form-item>
                        <div class="infrastructureItem">
                            <div>1.自有仓储面积</div>
                            <el-input v-model="Form.theirOwn"> </el-input>
                            <div>（平方米）</div>
                        </div>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <div class="infrastructureItem">
                            <div>2.租用仓储面积</div>
                            <el-input v-model="Form.rent"> </el-input>
                            <div>（平方米）</div>
                        </div>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <div class="infrastructureItem">
                            <div>3.装卸设备</div>
                            <el-input v-model="Form.handlingEquipment"> </el-input>
                            <div>（台）</div>
                        </div>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <div class="infrastructureItem">
                            <div>4.铁路专用线</div>
                            <el-input v-model="Form.railway"> </el-input>
                            <div>（条）</div>
                        </div>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <div class="infrastructureItem">
                            <div>5.物流计算机信息管理系统</div>
                            <el-input v-model="Form.logisticsSystem"> </el-input>
                            <div>（套）</div>
                        </div>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <div class="infrastructureItem">
                            <div>6.运输车辆</div>
                            <el-input v-model="Form.transportVehicle"> </el-input>
                            <div>（辆）&nbsp;&nbsp;</div>
                            <div>其中：普通货车</div>
                            <el-input v-model="Form.trucksCar"> </el-input>
                            <div>（辆）</div>
                        </div>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <div class="infrastructureItem">
                            <div>7.专用货车</div>
                            <el-input v-model="Form.selfTrucksCar"> </el-input>
                            <div>（辆）&nbsp;&nbsp;</div>
                            <div>其中：冷藏车</div>
                            <el-input v-model="Form.chillCar"> </el-input>
                            <div>（辆）&nbsp;&nbsp;</div>
                            <div>危险品专用车辆</div>
                            <el-input v-model="Form.dangerCar"> </el-input>
                            <div>（辆）</div>
                        </div>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <div class="infrastructureItem">
                            <div>8.集装箱专用车</div>
                            <el-input v-model="Form.containerCar"> </el-input>
                            <div>（辆）</div>
                        </div>
                    </el-form-item>
                </div>

                <div class="footer">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <!-- <el-form-item label="单位负责人">
                                <el-input size="mini" v-model="Form.uscCode"></el-input>
                            </el-form-item> -->
                            <span style="width: 100px">单位负责人</span
                            ><el-input
                                size="mini"
                                v-model="Form.companyPrincipal"
                                style="width: 100px"
                                clearable
                            ></el-input>
                        </el-col>
                        <el-col :span="6"
                            ><span style="width: 60px">填表人</span
                            ><el-input size="mini" v-model="Form.preparer" style="width: 100px" clearable> </el-input
                        ></el-col>
                        <el-col :span="6"
                            ><span style="width: 100px">联系电话</span
                            ><el-input size="mini" v-model="Form.phone" style="width: 120px" clearable> </el-input
                        ></el-col>
                        <el-col :span="6"
                            ><span style="width: 100px">报出日期</span>
                            <el-date-picker
                                v-model="Form.returnTime"
                                size="mini"
                                type="date"
                                clearable
                                style="width: 150px"
                            >
                            </el-date-picker
                        ></el-col>
                    </el-row>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'user-userInfo',
    props: {},
    data() {
        return {
            Form: {
                uscCode: '', // 统一社会信用代码
                ifCode: '', // 组织机构代码
                principalName: '', // 负责人
                company: '', // 公司名
                companyTel: '', // 公司名传真
                address: '', // 详细地址
                email: '', // 电子信箱
                postalCode: '', // 邮政编码
                operational: '', // 主要业务活动
                industryCode: '', // 行业代码
                openingTime: '', // 开业时间
                companyLoginType: '', // 企业登记注册类型
                login_total: '', // 登记注册资本合计
                county_total: '', // 国家合计
                collective_total: '', // 集体合计
                legalPerson_total: '', // 法人合计
                self_total: '', // 个人合计
                HMT_total: '', // 港澳台合计
                foreign_total: '', // 外商资本合计
                // 基础设施
                theirOwn: '', // 自有仓储面积
                rent: '', // 租用仓储面积
                handlingEquipment: '', // 装卸设备
                railway: '', // 铁路专用线
                logisticsSystem: '', // 物流计算机信息管理系统
                transportVehicle: '', // 运输车辆
                trucksCar: '', // 货车
                selfTrucksCar: '', // 专用货车
                chillCar: '', // 冷藏车
                containerCar: '', // 集装箱专用车
                dangerCar: '', // 危险品专用车辆
                returnTime: '', // 报出日期
                companyPrincipal: '', // 单位负责人
                preparer: '', // 填表人
                phone: '' // 电话
            },
            enrollOptions: [
                {
                    value: '110',
                    label: '国有企业'
                },
                {
                    value: '120',
                    label: '集体企业'
                },
                {
                    value: '130',
                    label: '股份合作企业'
                },
                {
                    value: '140',
                    label: '联营企业'
                },
                {
                    value: '150',
                    label: '有限责任公司'
                },
                {
                    value: '160',
                    label: '股份有限公司'
                },
                {
                    value: '170',
                    label: '私营企业'
                },
                {
                    value: '200',
                    label: '港、澳、台商投资企业'
                },
                {
                    value: '230',
                    label: '港、澳、台商独资经营企业'
                },
                {
                    value: '300',
                    label: '外商投资企业'
                },
                {
                    value: '310',
                    label: '中外合资企业'
                },
                {
                    value: '330',
                    label: '外资企业'
                }
            ],
            tableData: {
                list: [
                    {
                        targets: '1.年末从业人员合计（人）',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '  #物流从业人员合计',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '2.从业人员劳动报酬（万元）',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '#管理人员劳动报酬（万元）',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '3.从业人员文化程序（人）',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '#研究生及以上学历人员',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '大学本科学历人员',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '大学专科学历',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '高中及以下',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '4.专业技术职称（人）',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '#高级技术职称人员',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '中级技术职称人员',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '初级技术职称人员',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '5.专业技术等级（人）',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '#高级技师',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '技师',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '高级工',
                        womanTotal: '',
                        total: ''
                    },
                    {
                        targets: '中级工',
                        womanTotal: '',
                        total: ''
                    }
                ]
            }
        }
    },
    computed: {},
    created() {
        this.renderForm()
    },
    mounted() {},
    watch: {},
    methods: {
        renderForm() {
            // console.log(this.$route.query.id)
            // let id = JSON.parse(window.localStorage.getItem('userInfo')).id
            this.$axios({
                url: '/api/company/get?id=' + this.$route.query.id
            }).then(data => {
                if (data.returnCode === 200) {
                    if (data.returnData) {
                        this.Form = data.returnData
                        this.tableData.list = data.returnData.companyPersonList
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: data.returnMsg
                    })
                }
            })
            let data = window.localStorage.getItem('company-information')
            if (data) {
                this.Form = JSON.parse(data).Form
                this.tableData = JSON.parse(data).tableData
            }
        }
    },
    components: {}
}
</script>

<style scoped lang="less">
.form {
    margin-top: 40px;
}
.hr {
    margin-bottom: 20px;
}
.constitution {
    width: 100%;
    height: 100px;
    font-weight: 800;
    padding-bottom: 20px;
}
.infrastructureItem {
    white-space: pre;
    display: flex;
    & /deep/ .el-input__inner {
        border-radius: 0;
        width: 50px;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
    }
}

.footer {
    margin-top: 30px;
    padding-top: 20px;
    width: 100%;
    border-top: 1px solid #ccc;
    & /deep/ .el-input__inner {
        border-radius: 0;
        // width: 100px;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
    }
    & /deep/ .el-col {
        display: flex;
    }
}
.footerBtn {
    margin-top: 100px;
    display: flex;
    justify-content: flex-end;
}
.infrastructure {
    padding-left: 4em;
    & /deep/ .el-input__inner {
        width: 75px;
    }
}
</style>
