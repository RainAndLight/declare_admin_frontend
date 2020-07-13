<template>
    <div>
        <el-table
            :data="tableData.list"
            height="calc(89vh - 220px)"
            border
            size="mini"
            style="width:100% ;marginTop:10px"
        >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column
                v-for="(item, index) in tableData.columnList"
                :key="index"
                :align="item.center || 'center'"
                :width="item.width || '100'"
                :label="item.title"
                :prop="item.prop"
            >
                <template slot-scope="scope">
                    <template v-if="item.prop === 'declarationStatus'">
                        <el-tag v-if="scope.row.declarationStatus === 1" type="info">
                            {{ $util.tableRowFormat(scope.row, item) }}
                        </el-tag>
                        <el-tag v-if="scope.row.declarationStatus === 2">
                            {{ $util.tableRowFormat(scope.row, item) }}
                        </el-tag>
                        <el-tag v-if="scope.row.declarationStatus === 3" type="success">
                            {{ $util.tableRowFormat(scope.row, item) }}
                        </el-tag>
                    </template>
                    <template v-else>{{ $util.tableRowFormat(scope.row, item) }}</template>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="look(scope.row)" size="mini" type="primary">查看</el-button>
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
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
    name: 'declaration-schedule-table-modal',
    props: {},
    data() {
        return {
            selection: [],
            tableData: {
                pageNum: 1,
                pageSize: 10,
                total: 20,
                columnList: [
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
                        width: '200',
                        type: 'listDateTime'
                    },
                    {
                        title: '申报填写时间',
                        prop: 'declareDate',
                        width: '200',
                        type: 'listDateTime'
                    },
                    {
                        title: '申报状态',
                        prop: 'declarationStatus',
                        type: 'format',
                        width: '150',
                        format: {
                            '1': '申报未开始',
                            '2': '申报正在进行中',
                            '3': '申报已结束'
                        }
                    }
                ],
                list: [
                    // {
                    //     originPerson: 'admin',
                    //     orderNo: '001',
                    //     declarationType: 'quarter',
                    //     declarationDate: '2020-6-1 至 2020-9-1',
                    //     contentTime: '2020-1-1 至 2020-3-31',
                    //     declarationStatus: 0,
                    //     startTime: '2020-6-18 00:00:00'
                    // },
                    // {
                    //     originPerson: 'admin',
                    //     orderNo: '003',
                    //     declarationType: 'quarter',
                    //     declarationDate: '2020-6-1 至 2020-9-1',
                    //     contentTime: '2020-1-1 至 2020-3-31',
                    //     declarationStatus: 2,
                    //     startTime: '2020-6-18 00:00:00'
                    // }
                ]
            },
            page: {
                pageNum: 1,
                pageSize: 10
            }
        }
    },
    created() {
        this.getData()
    },
    methods: {
        look(row) {
            this.$emit('setWidth')
            eventBus.$emit('declarationId', row.id, row.declarationTypeCode)
        },
        handleSizeChange(value) {
            this.page.pageSize = value
            this.getData()
        },
        changePage(value) {
            this.page.pageNum = value
            this.getData()
        },
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
                    // this.tableData.list = data.returnData.list.find(item => item.declarationTypeCode === 'quarter')
                    let arr = []
                    data.returnData.list.forEach(item => {
                        if (item.declarationTypeCode === 'year') {
                            arr.push(item)
                        }
                    })
                    this.tableData.list = arr
                } else {
                    this.$message({
                        type: 'error',
                        message: data.returnMsg
                    })
                }
            })
        }
    },
    components: {}
}
</script>

<style scoped lang="less">
.btn {
    margin-right: 0px !important;
    margin-top: -20px;
    margin-bottom: 10px;
}
</style>
