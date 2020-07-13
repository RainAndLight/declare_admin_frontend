<template>
    <div>
        <el-card class="card">
            <bread-crumb slot="header">
                <template slot="title">待办</template>
            </bread-crumb>
            <div style="height:calc(80vh - 50px);overflow:auto">
                <div class="header">
                    <el-button type="primary" size="mini" @click="submit">申报</el-button>
                    <!-- <el-button type="primary" size="mini" @click="look">查看</el-button> -->
                </div>
                <el-table
                    @selection-change="tableSelectionChange"
                    :data="tableData.list"
                    height="calc(89vh - 190px)"
                    border
                    size="mini"
                    style="width:100% ;marginTop:10px"
                >
                    <el-table-column type="selection" width="55"> </el-table-column>
                    <el-table-column type="index" width="50"> </el-table-column>
                    <el-table-column
                        v-for="(item, index) in tableData.columnList"
                        :key="index"
                        :align="item.center || 'center'"
                        :width="item.width"
                        :label="item.title"
                        :prop="item.prop"
                    >
                        <template slot-scope="scope">
                            <template v-if="item.prop === 'declarationUserStatus'">
                                <el-tag v-if="scope.row.declarationUserStatus === 1" type="info">
                                    {{ $util.tableRowFormat(scope.row, item) }}
                                </el-tag>
                                <el-tag v-if="scope.row.declarationUserStatus === 2" type="success">
                                    {{ $util.tableRowFormat(scope.row, item) }}
                                </el-tag>
                            </template>
                            <template v-else>{{ $util.tableRowFormat(scope.row, item) }}</template>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    style="position: relative;bottom: 5px;marginTop:10px"
                    @size-change="handleSizeChange"
                    :page-sizes="[5, 10, 20]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :current-page="page.pageNum"
                    :page-size="page.pageSize"
                    :total="tableData.total"
                    @current-change="changePage"
                >
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'todoCenter',
    props: {},
    data() {
        return {
            page: {
                pageNum: 1,
                pageSize: 10
            },
            selection: [],
            tableData: {
                pageNum: 1,
                pageSize: 10,
                total: 20,
                columnList: [
                    {
                        title: '发起申报人',
                        prop: 'createdBy'
                    },
                    {
                        title: '申报类型',
                        prop: 'declarationTypeCode',
                        type: 'format',
                        format: {
                            quarter: '季度',
                            year: '年度'
                        }
                    },
                    {
                        title: '报表周期',
                        prop: 'declarationDate',
                        width: '250',
                        type: 'listDateTime'
                    },
                    {
                        title: '申报填写时间',
                        prop: 'declareDate',
                        width: '250',
                        type: 'listDateTime'
                    },
                    {
                        title: '申报状态',
                        prop: 'declarationUserStatus',
                        type: 'format',
                        width: '200',
                        format: {
                            '1': '未申报',
                            '2': '已提交'
                        }
                    }
                ],
                list: []
            }
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            this.$axios({
                url: '/api/declaration/page',
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
            this.page.pageNum = value
            this.getData()
        },
        handleSizeChange(value) {
            this.page.pageSize = value
            this.getData()
        },
        tableSelectionChange(value) {
            this.selection = value
            // this.getData()
        },
        submit() {
            if (this.selection.length > 0 && this.selection.length < 2) {
                let now = new Date()
                let time = new Date(this.selection[0].declareEndDate)
                // if (now > time) {
                //     this.$message({
                //         message: '提交申报时间已截止，不可再申报',
                //         type: 'warning'
                //     })
                //     return
                // } else if (now < time) {
                //     this.$message({
                //         message: '申报暂未开始',
                //         type: 'warning'
                //     })
                //     return
                // }
                this.$router.push({
                    path: '/home/todoCenter/declaration',
                    query: {
                        declarationId: this.selection[0].id,
                        // userID: JSON.parse(window.localStorage.getItem('userInfo')).id,
                        declarationType: this.selection[0].declarationTypeCode
                        // entrance: 'declaration'
                    },
                    params: { op: 'refresh' }
                })
            } else {
                this.$message({
                    message: '请选择一条数据数据申报',
                    type: 'warning'
                })
            }
        },
        look() {
            if (this.selection.length > 0 && this.selection.length < 2) {
                this.$router.push({
                    path: '/home/todoCenter/declaration',
                    query: {
                        id: this.selection[0].id,
                        declarationType: this.selection[0].declarationType,
                        entrance: 'look'
                    },
                    params: { op: 'refresh' }
                })
            } else {
                this.$message({
                    message: '请选择一条数据数据查看',
                    type: 'warning'
                })
            }
        }
        // declarationTypeFormatter(row) {
        //     if (row.declarationType === 'quarter') {
        //         return '季度'
        //     } else {
        //         return '年度'
        //     }
        // }
    },
    components: {}
}
</script>

<style scoped lang="less">
.card {
    // height: 85vh;
    position: relative;
    .header {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
