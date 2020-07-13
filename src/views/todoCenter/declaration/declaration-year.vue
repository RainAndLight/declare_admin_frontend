<template>
    <div>
        <div class="header">物流企业经营状况表（年度）</div>
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
                        targetName: '货物购进总额',
                        measureUnit: '万元',
                        code: '01',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '货物销售总额',
                        measureUnit: '万元',
                        code: '02',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '货物运输量',
                        measureUnit: '吨',
                        code: '03',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中：自运货运量',
                        measureUnit: '吨',
                        code: '04',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '委托代理货运量',
                        measureUnit: '吨',
                        code: '05',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '自运货物周转量',
                        measureUnit: '吨公里',
                        code: '06',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '年末库存金额',
                        measureUnit: '万元',
                        code: '07',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '自运货物平均运价',
                        measureUnit: '元/吨公里',
                        code: '08',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '委托货物平均运价',
                        measureUnit: '元/吨公里',
                        code: '09',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '企业物流成本',
                        measureUnit: '万元',
                        code: '10',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中：保管成本',
                        measureUnit: '万元',
                        code: '11',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中：利息成本',
                        measureUnit: '万元',
                        code: '12',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '仓储成本',
                        measureUnit: '万元',
                        code: '13',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '保险成本',
                        measureUnit: '万元',
                        code: '14',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '货物损耗成本',
                        measureUnit: '万元',
                        code: '15',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '信息及相关服务成本',
                        measureUnit: '万元',
                        code: '16',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '配送成本',
                        measureUnit: '万元',
                        code: '17',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '流通加工成本',
                        measureUnit: '万元',
                        code: '18',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '包装成本',
                        measureUnit: '万元',
                        code: '19',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其他保管成本',
                        measureUnit: '万元',
                        code: '20',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '管理成本',
                        measureUnit: '万元',
                        code: '21',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中：管理人员报酬',
                        measureUnit: '万元',
                        code: '22',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '办公成本',
                        measureUnit: '万元',
                        code: '23',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '教育培训成本',
                        measureUnit: '万元',
                        code: '24',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '劳动保险成本',
                        measureUnit: '万元',
                        code: '25',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '车船使用成本',
                        measureUnit: '万元',
                        code: '26',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '运输成本',
                        measureUnit: '万元',
                        code: '27',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其中：运输成本',
                        measureUnit: '万元',
                        code: '28',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '装卸搬运等辅助成本',
                        measureUnit: '万元',
                        code: '29',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '货运业务成本',
                        measureUnit: '万元',
                        code: '30',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '运输附加费',
                        measureUnit: '万元',
                        code: '31',
                        current: '',
                        yoy: ''
                    },
                    {
                        targetName: '其他成本',
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
        },
        submit() {
            if (this.flag) {
                this.returnData.declareDetailList = this.tableData.list
                this.$axios({
                    url: '/api/declaration_related_user/save',
                    method: 'post',
                    data: this.returnData
                    // data: {
                    //     declarationId: this.$route.query.declarationId,
                    //     userId: JSON.parse(window.localStorage.getItem('userInfo')).declarationId,
                    //     declareDetailList: this.tableData.list
                    // }
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
