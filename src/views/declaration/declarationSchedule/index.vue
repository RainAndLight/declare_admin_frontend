<template>
    <div>
        <el-card v-loading="loading">
            <bread-crumb slot="header">
                <template slot="title">申报 <span style="color:#C0C4CC;margin:0 5px">></span> 申报进度</template>
            </bread-crumb>
            <div style="height:calc(80vh - 50px);over:hidden">
                <split-pane @resize="resize" :min-percent="0" :default-percent="80" split="vertical" ref="splitPane">
                    <template slot="paneL">
                        <el-card>
                            <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                                <el-tab-pane label="季度" name="quarter">
                                    <tableModalQuarter ref="tableModal" @setWidth="setWidth"></tableModalQuarter>
                                </el-tab-pane>
                                <el-tab-pane label="年度" name="year">
                                    <tableModalYear ref="tableModal" @setWidth="setWidth"></tableModalYear>
                                </el-tab-pane>
                            </el-tabs>
                        </el-card>
                    </template>
                    <template slot="paneR">
                        <el-card>
                            <div :style="{ height: '40px' }">
                                <el-select
                                    @change="statusSelectChange"
                                    clearable
                                    size="mini"
                                    v-model="form.status"
                                    placeholder="状态筛选"
                                    filterable
                                    style="width:193px"
                                >
                                    <el-option clearable value="2" label="未申报"></el-option>
                                    <el-option clearable value="1" label="已提交"></el-option>
                                </el-select>
                                <el-button
                                    style="margin-left:10px"
                                    v-show="exportAllExcelShow"
                                    type="primary"
                                    size="mini"
                                    @click="exportAllExcel"
                                    >合并导出为Excel</el-button
                                >
                            </div>
                            <el-table
                                height="57vh"
                                @selection-change="tableSelectionChange"
                                :data="tableData.list"
                                border
                                size="mini"
                                style="width:100%;margin-top:14px"
                            >
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
                                        <template v-if="item.prop === 'declarationStatus'">
                                            <el-tag v-if="scope.row.declarationStatus === 1" type="info">
                                                {{ $util.tableRowFormat(scope.row, item) }}
                                            </el-tag>
                                            <el-tag v-if="scope.row.declarationStatus === 2" type="success">
                                                {{ $util.tableRowFormat(scope.row, item) }}
                                            </el-tag>
                                        </template>
                                        <template v-else-if="item.prop === 'returnExcel'">
                                            <el-button type="primary" size="mini" @click="exportExcel(scope.row)"
                                                >导出为Excel</el-button
                                            >
                                        </template>
                                        <template v-else>{{ $util.tableRowFormat(scope.row, item) }}</template>
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
                                :total="page.total"
                                @current-change="changePage"
                            >
                            </el-pagination>
                        </el-card>
                    </template>
                </split-pane>
            </div>
        </el-card>
    </div>
</template>

<script>
import XLSX from 'xlsx'
import eventBus from '@/utils/eventBus'
import tableModalQuarter from './table-modal-quarter'
import tableModalYear from './table-modal-year'
import splitPane from 'vue-splitpane'
// import api from '@/api/declartion'

export default {
    name: '',
    props: {},
    data() {
        return {
            exportAllExcelShow: false,
            activeName: 'quarter',
            loading: false, // 默认不打开进度条
            page: {
                pageNum: 1,
                pageSize: 10,
                filterList: [
                    {
                        filterKey: 'declarationId',
                        filterValue: ''
                    }
                ]
            },
            form: {
                type: '',
                status: ''
            },
            tableData: {
                columnList: [
                    {
                        title: '企业单位',
                        prop: 'company'
                    },
                    // {
                    //     title: '申报类型',
                    //     prop: 'declartionType'
                    // },
                    {
                        title: '申报状态',
                        prop: 'declarationStatus',
                        type: 'format',
                        format: {
                            1: '未申报',
                            2: '已提交'
                        }
                    },
                    // {
                    //     title: '报表周期',
                    //     prop: 'declartionStartEndTime',
                    //     width: '200',
                    //     type: 'listDateTime'
                    // },
                    // {
                    //     title: '申报起止日期',
                    //     prop: 'declartionWriteTime',
                    //     width: '200',
                    //     type: 'dateTime'
                    // },
                    {
                        title: '操作',
                        prop: 'returnExcel',
                        width: '150'
                    }
                ],
                list: []
            }
        }
    },
    computed: {},
    created() {
        eventBus.$on('declarationId', (declarationId, declarationTypeCode) => {
            if (declarationId) {
                this.page.filterList[0].filterValue = declarationId
                this.getData()
            }
            if (declarationTypeCode) {
                declarationTypeCode === 'quarter' ? (this.exportAllExcelShow = true) : (this.exportAllExcelShow = false)
            }
        })
    },
    mounted() {},
    watch: {},
    methods: {
        getData() {
            this.$axios({
                url: '/api/declaration_related_user/page',
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
        getResidueData() {
            this.$axios({
                url: '/api/declaration_related_user/page_no_declaration',
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
        getScheduleData() {
            // api.getScheduleDeclartion()
        },
        setWidth() {
            this.$refs.splitPane.percent = 20
        },
        resize() {
            console.log('resize')
        },
        // tableRowFormat(row, item) {
        //     if (item.type === 'format') {
        //         return item.format[row[item.prop]]
        //     } else {
        //         return row[item.prop]
        //     }
        // },
        handleSizeChange(value) {
            this.page.pageSize = value
            if (this.form.status === '1') {
                this.getData()
            } else if (this.form.status === '2') {
                this.getResidueData()
            }
        },
        //   async getData () {
        //   this.loading = true // 打开进度条
        //   let result = await this.$axios({
        //     url: '/articles',
        //     params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
        //   })
        //   this.list = result.data.results
        //   this.page.total = result.data.total_count // 总条数
        //   this.loading = false
        // },
        changePage(value) {
            this.page.currentPage = value
            if (this.form.status === '1') {
                this.getData()
            } else if (this.form.status === '2') {
                this.getResidueData()
            } else {
                this.getData()
            }
        },
        look() {
            this.$refs.tableModal.modalIsShow()
        },
        exportExcel(row) {
            this.$axios({
                url:
                    '/api/declaration_related_user/fetch_declare_detail?declarationId=' +
                    row.declarationId +
                    '&userId=' +
                    row.createdBy
            }).then(data => {
                if (data.returnCode === 200) {
                    let aoa = [
                        [`物流企业经营状况表`, null, null, null, null, null],
                        ['指标名称', '计量单位', '代码', '本期', '上年同期']
                    ]
                    data.returnData.declareDetailList.forEach(item => {
                        let declareDetailArr = [5]
                        declareDetailArr[0] = item.targetName
                        declareDetailArr[1] = item.measureUnit
                        declareDetailArr[2] = item.code
                        declareDetailArr[3] = item.current
                        declareDetailArr[4] = item.yoy
                        aoa.push(declareDetailArr)
                    })
                    let sheet = XLSX.utils.aoa_to_sheet(aoa)
                    sheet['!merges'] = [
                        // 设置A1-C1的单元格合并
                        { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }
                    ]
                    sheet['!cols'] = [{ wch: 25 }, { wch: 20 }]
                    // console.log('sheet', sheet)

                    this.$util.openDownloadDialog(
                        this.$util.sheetblob(sheet),
                        `${data.returnData.company}物流经营状况表.xlsx`
                    )
                } else if (data.returnCode === 400) {
                    this.$message({
                        type: 'error',
                        message: '暂无数据'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: data.returnMsg
                    })
                }
            })
        },
        exportAllExcel() {
            this.$axios({
                url: '/api/declaration/merge_declare_detail'
            }).then(data => {
                let aoa = [
                    [
                        '报告日期',
                        '单位名称',
                        '运货量 （本期）',
                        '运货量 （同期）',
                        '同比',
                        '周转量 （本期）',
                        '周转量 （同期）',
                        '同比',
                        '配送量 （本期）',
                        '配送量 （同期）',
                        '同比',
                        '流通加工量 （本期）',
                        '流通加工量 （同期）',
                        '同比',
                        '包装量 （本期）',
                        '包装量 （同期）',
                        '同比',
                        '装卸搬运量 （本期）',
                        '装卸搬运量 （同期）',
                        '同比',
                        '吞吐量 （本期）',
                        '吞吐量 （同期）',
                        '同比',
                        '货代业务量 （本期）',
                        '货代业务量 （同期）',
                        '同比',
                        '一体化物流业务量 （本期）',
                        '一体化物流业务量 （同期）',
                        '同比',
                        '年末库存额 （本期）',
                        '年末库存额 （同期）',
                        '同比',
                        '自运货物平均运价 （本期）',
                        '自运货物平均运价 （同期）',
                        '同比',
                        '委托代理货物平均运价 （本期）',
                        '委托代理货物平均运价 （同期）',
                        '同比',
                        '平均货物配送费率 （本期）',
                        '平均货物配送费率 （同期）',
                        '同比',
                        '平均货物流通加工费率 （本期）',
                        '平均货物流通加工费率 （同期）',
                        '同比',
                        '平均货物包装费率 （本期）',
                        '平均货物包装费率 （同期）',
                        '同比',
                        '平均货物仓储费率 （本期）',
                        '平均货物仓储费率 （同期）',
                        '同比',
                        '平均货物装卸搬运费率 （本期）',
                        '平均货物装卸搬运费率 （同期）',
                        '同比',
                        '主营业务收入 （本期）',
                        '主营业务收入 （同期）',
                        '同比',
                        '其中:保管收入 （本期）',
                        '其中:保管收入 （同期）',
                        '同比',
                        '其中:仓储收入 （本期）',
                        '其中:仓储收入 （同期）',
                        '同比',
                        '保险收入 （本期）',
                        '保险收入 （同期）',
                        '同比',
                        '信息及相关服务收入 （本期）',
                        '信息及相关服务收入 （同期）',
                        '同比',
                        '配送收入 （本期）',
                        '配送收入 （同期）',
                        '同比',
                        '流通加工收入 （本期）',
                        '流通加工收入 （同期）',
                        '同比',
                        '包装收入 （本期）',
                        '包装收入 （同期）',
                        '同比',
                        '其他保管收入 （本期）',
                        '其他保管收入 （同期）',
                        '同比',
                        '运输收入 （本期）',
                        '运输收入 （同期）',
                        '同比',
                        '其中：运输收入 （本期）',
                        '其中：运输收入 （同期）',
                        '同比',
                        '装卸搬运等辅助收入 （本期）',
                        '装卸搬运等辅助收入 （同期）',
                        '同比',
                        '货运业务收入 （本期）',
                        '货运业务收入 （同期）',
                        '同比',
                        '运输附加收入 （本期）',
                        '运输附加收入 （同期）',
                        '同比',
                        '其他收入 （本期）',
                        '其他收入 （同期）',
                        '同比',
                        '其中：一体化物流业务收入 （本期）',
                        '其中：一体化物流业务收入 （同期）',
                        '同比',
                        '主营业务成本 （本期）',
                        '主营业务成本 （同期）',
                        '同比',
                        '其中：保管成本 （本期）',
                        '其中：保管成本 （同期）',
                        '同比',
                        '其中：利息成本 （本期）',
                        '其中：利息成本 （同期）',
                        '同比',
                        '仓储成本 （本期）',
                        '仓储成本 （同期）',
                        '同比',
                        '保险成本 （本期）',
                        '保险成本 （同期）',
                        '同比',
                        '货物损耗成本 （本期）',
                        '货物损耗成本 （同期）',
                        '同比',
                        '信息及相关服务成本 （本期）',
                        '信息及相关服务成本 （同期）',
                        '同比',
                        '配送成本 （本期）',
                        '配送成本 （同期）',
                        '同比',
                        '流通加工成本 （本期）',
                        '流通加工成本 （同期）',
                        '同比',
                        '包装成本 （本期）',
                        '包装成本 （同期）',
                        '同比',
                        '其他保管成本 （本期）',
                        '其他保管成本 （同期）',
                        '同比',
                        '管理成本 （本期）',
                        '管理成本 （同期）',
                        '同比',
                        '其中：管理人员报酬 （本期）',
                        '其中：管理人员报酬 （同期）',
                        '同比',
                        '办公成本 （本期）',
                        '办公成本 （同期）',
                        '同比',
                        '教育培训成本 （本期）',
                        '教育培训成本 （同期）',
                        '同比',
                        '劳动保险成本 （本期）',
                        '劳动保险成本 （同期）',
                        '同比',
                        '车船使用成本 （本期）',
                        '车船使用成本 （同期）',
                        '同比',
                        '运输成本 （本期）',
                        '运输成本 （同期）',
                        '同比',
                        '其中：运输成本 （本期）',
                        '其中：运输成本 （同期）',
                        '同比',
                        '装卸搬运等辅助成本 （本期）',
                        '装卸搬运等辅助成本 （同期）',
                        '同比',
                        '货运业务成本 （本期）',
                        '货运业务成本 （同期）',
                        '同比',
                        '运输附加费 （本期）',
                        '运输附加费 （同期）',
                        '同比',
                        '其他成本 （本期）',
                        '其他成本 （同期）',
                        '同比',
                        '其中：一体化物流业务成本 （本期）',
                        '其中：一体化物流业务成本 （同期）',
                        '同比',
                        '主营业务利润额 （本期）',
                        '主营业务利润额 （同期）',
                        '同比',
                        '主营业务营业税金 （本期）',
                        '主营业务营业税金 （同期）',
                        '同比',
                        '资产总计 （本期）',
                        '资产总计 （同期）',
                        '同比',
                        '固定资产折旧 （本期）',
                        '固定资产折旧 （同期）',
                        '同比',
                        '固定资产投资完成额 （本期）',
                        '固定资产投资完成额 （同期）',
                        '同比'
                    ]
                ]
                let optionWidth = []
                for (let i = 0; i < 191; i++) {
                    optionWidth.push({ wch: 20 })
                }
                data.returnData.forEach(item => {
                    let arr = []
                    let date = this.$util.timestampToDateTime(item.createdTime)
                    let company = item.company
                    arr.push(date)
                    arr.push(company)
                    item.declareDetailList.forEach(i => {
                        arr.push(i.current)
                        arr.push(i.yoy)
                        arr.push(i.last)
                    })
                    aoa.push(arr)
                })
                let sheet = XLSX.utils.aoa_to_sheet(aoa)
                sheet['!cols'] = optionWidth
                this.$util.openDownloadDialog(this.$util.sheetblob(sheet), `物流101.xlsx`)
            })
        },
        timeSelectChange() {},
        statusSelectChange(value) {
            if (value === '1') {
                this.getData()
            } else if (value === '2') {
                this.getResidueData()
            }
        },
        tableSelectionChange() {},
        handleClick() {}
    },
    components: { tableModalQuarter, tableModalYear, splitPane },
    filters: {
        // filterStatus(value) {
        //     //  文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
        //     switch (value) {
        //         case 0:
        //             return '草稿'
        //         case 1:
        //             return '待审核'
        //         case 2:
        //             return '已发表'
        //         case 3:
        //             return '审核失败'
        //         default:
        //             break
        //     }
        // }
    }
}
</script>

<style scoped lang="less">
.middle {
    width: 1px;
    height: calc(80vh - 50px);
    border-left: 1px solid #ccc;
    margin: 0 auto;
}
</style>
