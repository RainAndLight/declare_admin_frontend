<template>
    <div>
        <div class="header">物流企业经营状况表（季度）</div>
        <el-table
            :data="tableData.list"
            border
            height="100%"
            highlight-current-row
            size="mini"
            style="width: 100%;marginTop:10px"
        >
            <el-table-column align="center" type="index" width="36" label="#"></el-table-column>
            <el-table-column align="center" width="300" label="指标名称" prop="targetName"> </el-table-column>
            <el-table-column align="center" label="计量单位" prop="measureUnit"> </el-table-column>
            <el-table-column align="center" label="代码" prop="code"> </el-table-column>
            <el-table-column align="center" label="本期" prop="current">
                <template slot-scope="scoped">
                    <el-input required size="mini" v-model="scoped.row.current"></el-input>
                </template>
            </el-table-column>
            <el-table-column align="center" label="上年同期" prop="yoy">
                <template slot-scope="scoped">
                    <el-input required size="mini" v-model="scoped.row.yoy"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <div class="footerBtn">
            <!-- <el-button type="success" @click="webSave">暂存</el-button> -->
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'declaration-quarter',
    props: {},
    data() {
        return {
            returnData: null,
            flag: null,
            tableData: {
                list: [
                    {
                        targetName: '货运量',
                        measureUnit: '吨',
                        code: '01',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '周转量',
                        measureUnit: '吨公里',
                        code: '02',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '配送量',
                        measureUnit: '吨',
                        code: '03',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '流通加工量',
                        measureUnit: '吨',
                        code: '04',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '包装量',
                        measureUnit: '吨',
                        code: '05',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '装卸搬运量',
                        measureUnit: '吨',
                        code: '06',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '吞吐量',
                        measureUnit: '吨',
                        code: '07',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '货代业务量',
                        measureUnit: '票',
                        code: '08',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '一体化物流业务量',
                        measureUnit: '份',
                        code: '09',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '年末库存额',
                        measureUnit: '万元',
                        code: '10',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '自运货物平均运价',
                        measureUnit: '元/吨公里',
                        code: '11',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '委托代理货物平均运价',
                        measureUnit: '元/吨公里',
                        code: '12',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '平均货物配送费率',
                        measureUnit: '元/吨',
                        code: '13',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '平均货物流通加工费率',
                        measureUnit: '元/吨',
                        code: '14',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '平均货物包装费率',
                        measureUnit: '元/吨',
                        code: '15',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '平均货物仓储费率',
                        measureUnit: '元/吨',
                        code: '16',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '平均货物装卸搬运费率',
                        measureUnit: '元/吨',
                        code: '17',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '主营业务收入',
                        measureUnit: '万元',
                        code: '18',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中:保管收入',
                        measureUnit: '万元',
                        code: '19',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中:仓储收入',
                        measureUnit: '万元',
                        code: '20',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '保险收入',
                        measureUnit: '万元',
                        code: '21',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '信息及相关服务收入',
                        measureUnit: '万元',
                        code: '22',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '配送收入',
                        measureUnit: '万元',
                        code: '23',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '流通加工收入',
                        measureUnit: '万元',
                        code: '24',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '包装收入',
                        measureUnit: '万元',
                        code: '25',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其他保管收入',
                        measureUnit: '万元',
                        code: '26',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '运输收入',
                        measureUnit: '万元',
                        code: '27',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中：运输收入',
                        measureUnit: '万元',
                        code: '28',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '装卸搬运等辅助收入',
                        measureUnit: '万元',
                        code: '29',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '货运业务收入',
                        measureUnit: '万元',
                        code: '30',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '运输附加收入',
                        measureUnit: '万元',
                        code: '31',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其他收入',
                        measureUnit: '万元',
                        code: '32',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中：一体化物流业务收入',
                        measureUnit: '万元',
                        code: '33',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '主营业务成本',
                        measureUnit: '万元',
                        code: '34',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中：保管成本',
                        measureUnit: '万元',
                        code: '35',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中：利息成本',
                        measureUnit: '万元',
                        code: '36',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '仓储成本',
                        measureUnit: '万元',
                        code: '37',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '保险成本',
                        measureUnit: '万元',
                        code: '38',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '货物损耗成本',
                        measureUnit: '万元',
                        code: '39',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '信息及相关服务成本',
                        measureUnit: '万元',
                        code: '40',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '配送成本',
                        measureUnit: '万元',
                        code: '41',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '流通加工成本',
                        measureUnit: '万元',
                        code: '42',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '包装成本',
                        measureUnit: '万元',
                        code: '43',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其他保管成本',
                        measureUnit: '万元',
                        code: '44',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '管理成本',
                        measureUnit: '万元',
                        code: '45',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中：管理人员报酬',
                        measureUnit: '万元',
                        code: '46',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '办公成本',
                        measureUnit: '万元',
                        code: '47',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '教育培训成本',
                        measureUnit: '万元',
                        code: '48',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '劳动保险成本',
                        measureUnit: '万元',
                        code: '49',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '车船使用成本',
                        measureUnit: '万元',
                        code: '50',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '运输成本',
                        measureUnit: '万元',
                        code: '51',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中：运输成本',
                        measureUnit: '万元',
                        code: '52',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '装卸搬运等辅助成本',
                        measureUnit: '万元',
                        code: '53',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '货运业务成本',
                        measureUnit: '万元',
                        code: '54',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '运输附加费',
                        measureUnit: '万元',
                        code: '55',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其他成本',
                        measureUnit: '万元',
                        code: '56',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中：一体化物流业务成本',
                        measureUnit: '万元',
                        code: '57',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '主营业务利润额',
                        measureUnit: '万元',
                        code: '58',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '主营业务营业税金',
                        measureUnit: '万元',
                        code: '59',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '资产总计',
                        measureUnit: '万元',
                        code: '60',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '固定资产折旧',
                        measureUnit: '万元',
                        code: '61',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '固定资产投资完成额',
                        measureUnit: '万元',
                        code: '62',
                        current: '',
                        yoy: ''
                    }
                ]
            }
        }
    },
    created() {
        this.getData()
    },
    watch: {},
    methods: {
        submit() {
            if (this.flag) {
                this.returnData.declareDetailList = this.tableData.list
                this.$axios({
                    url: '/api/declaration_related_user/save',
                    method: 'post',
                    data: this.returnData
                }).then(data => {
                    if (data.returnCode === 200) {
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: data.returnMsg
                        })
                    }
                })
            } else {
                this.$axios({
                    url: '/api/declaration_related_user/save',
                    method: 'post',
                    data: {
                        declarationId: this.$route.query.declarationId,
                        userId: JSON.parse(window.localStorage.getItem('userInfo')).declarationId,
                        declareDetailList: this.tableData.list
                    }
                }).then(data => {
                    if (data.returnCode === 200) {
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: data.returnMsg
                        })
                    }
                })
            }
        },
        getData() {
            this.$axios({
                url:
                    '/api/declaration_related_user/fetch_declare_detail?declarationId=' +
                    this.$route.query.declarationId +
                    '&userId=' +
                    JSON.parse(window.localStorage.getItem('userInfo')).id
            }).then(data => {
                if (data.returnCode === 200) {
                    if (data.returnData) {
                        this.flag = true
                        this.returnData = data.returnData
                        this.tableData.list = data.returnData.declareDetailList
                        this.$message({
                            type: 'success',
                            message: '获取数据成功'
                        })
                    } else {
                        this.flag = false
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: data.returnMsg
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.header {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    width: 100%;
    height: 70px;
    line-height: 70px;
}
.footerBtn {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
</style>
