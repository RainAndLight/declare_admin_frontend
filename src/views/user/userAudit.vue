<template>
    <div>
        <el-card>
            <bread-crumb slot="header">
                <template slot="title">账号审核</template>
            </bread-crumb>
            <div style="height:calc(80vh - 50px);overflow:auto">
                <el-table
                    :data="tableData.list"
                    border
                    height="calc(89vh - 150px)"
                    highlight-current-row
                    oncontextmenu="return false;"
                    ref="table"
                    size="mini"
                    sortable="custom"
                    style="width: 100%"
                >
                    <!-- <el-table-column type="selection" width="40" fixed></el-table-column> -->
                    <el-table-column align="center" type="index" width="50" label="序号" fixed> </el-table-column>
                    <el-table-column
                        v-for="item in tableData.columnList"
                        :align="item.align || 'center'"
                        :key="item.prop"
                        :label="item.title"
                        :prop="item.prop"
                        :width="item.width || '200'"
                    >
                        <template slot-scope="scope">
                            <!-- <template v-if="item.prop === 'declartionStatus'"></template> -->
                            <template>{{ $util.tableRowFormat(scope.row, item) }}</template>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="success" size="small" @click="confirm(scope.row)">同意</el-button>
                            <el-button type="danger" size="small" @click="refuse(scope.row)">拒绝</el-button>
                            <el-button type="primary" size="small" @click="lookInfo(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    style="position: relative;bottom: 5px;marginTop:10px"
                    @size-change="handleSizeChange"
                    :page-sizes="[10, 20, 50]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :current-page="page.currentPage"
                    :page-size="page.pageSize"
                    :total="tableData.total"
                    @current-change="changePage"
                >
                </el-pagination>
            </div>
        </el-card>
        <!-- <el-drawer size="80%" title="企业单位基本情况表" :visible.sync="drawer" direction="ltr"> -->
        <el-dialog title="企业单位基本情况表" :visible.sync="drawer" width="80%">
            <modalUserInfo ref="modalUserInfo" :id="id"></modalUserInfo>
            <span slot="footer">
                <el-button type="primary" @click="drawer = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- </el-drawer> -->
    </div>
</template>

<script>
import modalUserInfo from './modal-userInfo'
export default {
    name: 'userAudit',
    props: {},
    data() {
        return {
            drawer: false,
            id: '',
            page: {
                currentPage: 1, // 默认请求页码
                pageSize: 8,
                total: 100, // 总页码
                filterList: [
                    {
                        filterKey: 'accountFlag',
                        filterValue: '1'
                    }
                ]
            },
            tableData: {
                pageNum: 1,
                pageSize: 10,
                total: 20,
                columnList: [
                    {
                        title: '公司全称',
                        prop: 'company',
                        width: '250'
                    },
                    {
                        title: '用户申请账号',
                        prop: 'userName'
                    },
                    {
                        title: '申请时间',
                        prop: 'createdTime',
                        width: '200',
                        type: 'stampDateTime'
                    }
                ],
                list: [
                    {
                        company: '中创物流股份有限公司',
                        user: 'admin',
                        password: '123456',
                        applyTime: 'Fri Jun 05 2020 00:00:00 GMT+0800 (中国标准时间)',
                        passTime: 'Fri Jun 05 2020 00:00:00 GMT+0800 (中国标准时间)'
                    }
                ]
            }
        }
    },
    computed: {},
    created() {
        this.getData()
    },
    mounted() {},
    watch: {},
    methods: {
        getData() {
            this.$axios({
                url: '/api/user/page',
                method: 'post',
                data: this.page
            }).then(data => {
                if (data.returnCode === 200) {
                    this.tableData.total = data.returnData.total
                    this.tableData.pageNum = data.returnData.pageNum
                    this.tableData.pageSize = data.returnData.pageSize
                    this.tableData.list = data.returnData.list
                } else {
                    this.$message({
                        type: 'error',
                        message: data.returnMsg
                    })
                }
            })
        },
        changePage(value) {
            this.page.currentPage = value
            this.getData()
        },
        handleSizeChange(value) {
            this.page.pageSize = value
            this.getData()
        },
        tableSelectionChange(value) {
            this.selection = value
        },
        confirm(row) {
            this.$axios({
                url: '/api/user/verify',
                method: 'post',
                data: {
                    accountFlag: '2',
                    authority: 'A002',
                    id: row.id
                }
            }).then(data => {
                if (data.returnCode === 200) {
                    this.getData()
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: data.returnMsg
                    })
                }
            })
        },
        refuse(row) {
            this.$axios({
                url: '/api/user/verify',
                method: 'post',
                data: {
                    accountFlag: '3',
                    authority: 'A001',
                    id: row.id
                }
            }).then(data => {
                if (data.returnCode === 200) {
                    this.getData()
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: data.returnMsg
                    })
                }
            })
        },
        lookInfo(row) {
            this.id = row.id
            this.drawer = true
            setTimeout(() => {
                this.$refs.modalUserInfo.renderForm()
            }, 0)
        }
    },
    components: {
        modalUserInfo
    }
}
</script>

<style scoped lang="less"></style>
