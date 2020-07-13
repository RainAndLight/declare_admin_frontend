<template>
    <div>
        <el-card>
            <bread-crumb slot="header">
                <template slot="title">申报 > 操作</template>
            </bread-crumb>
            <div style="height:calc(80vh - 50px);overflow:auto">
                <div class="header">
                    <el-button size="mini" type="primary" @click="setClick">设置申报起止时间</el-button>
                </div>
                <el-table
                    :data="tableData.list"
                    height="calc(89vh - 190px)"
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
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <!-- :disabled="scope.row.declarationStatus !== '0'" -->
                            <!-- :disabled="scope.row.declarationStatus !== '0'" -->
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                                >删除</el-button
                            >
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
        <el-dialog title="设置申报起止时间" :visible.sync="modalIsShow">
            <el-form ref="form" :model="form" label-width="120px" class="modal" :rules="rules">
                <el-form-item label="选择申报类型" prop="declarationTypeCode">
                    <el-select v-model="form.declarationTypeCode" placeholder="请选择申报类型" @change="setName">
                        <el-option label="季度" value="quarter"></el-option>
                        <el-option label="年度" value="year"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报表周期" prop="declarationDate">
                    <el-date-picker
                        v-model="form.declarationDate"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="申报填写时间" prop="declareDate">
                    <el-date-picker
                        v-model="form.declareDate"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="申报填写时间">
                    <el-date-picker v-model="form.declartionStartTime" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalIsShow = false">取 消</el-button>
                <el-button type="primary" @click="confirm" v-show="confirmShow">设 定</el-button>
                <el-button type="primary" @click="modification" v-show="!confirmShow">修 改</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="handleDeleteMoadl" width="30%">
            <span>您确定删除此条数据吗？一旦删除，数据不可恢复</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleDeleteMoadl = false">取 消</el-button>
                <el-button type="primary" @click="deleteData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'declartion-operate',
    props: {},
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择填写时间'))
            } else {
                let date = new Date()
                let data = value[0]
                if (data < date) {
                    return callback(new Error('填写时间需大于当前时间'))
                } else {
                    callback()
                }
                this.$refs.form.validateField('date')
            }
        }
        return {
            row: null,
            confirmShow: true,
            page: {
                pageNum: 1,
                pageSize: 10
            },
            delrow: null,
            handleDeleteMoadl: false,
            modalIsShow: false,
            form: {
                declarationTypeCode: '',
                declarationTypeName: '',
                declarationDate: [
                    // 'Fri Jun 05 2020 00:00:00 GMT+0800 (中国标准时间)',
                    // 'Fri Jun 12 2020 00:00:00 GMT+0800 (中国标准时间)'
                ],
                declareDate: [
                    // 'Fri Jun 05 2020 00:00:00 GMT+0800 (中国标准时间)',
                    // 'Fri Jun 12 2020 00:00:00 GMT+0800 (中国标准时间)'
                ]
            },
            rules: {
                declarationTypeCode: [{ required: true, message: '请选择申报类型', trigger: 'change' }],
                declarationDate: [{ required: true, message: '请选择报表周期', trigger: 'blur' }],
                declareDate: [{ validator: validatePass, trigger: 'blur' }],
                date: [{ required: true, message: '请选择申报填写时间', trigger: 'blur' }]
            },
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
                    // {
                    //     title: '申报发起时间',
                    //     prop: 'declartionStartTime'
                    // },
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
                list: []
            },
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近一年',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
                            picker.$emit('pick', [start, end])
                        }
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
        setClick() {
            this.form = {
                declarationTypeCode: 'quarter',
                declarationTypeName: '',
                declarationDate: [],
                declareDate: []
            }
            this.modalIsShow = true
            this.confirmShow = true
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
                    this.tableData.list = data.returnData.list
                } else {
                    this.$message({
                        type: 'error',
                        message: data.returnMsg
                    })
                }
            })
        },
        setName(value) {
            if (value === 'year') {
                this.form.declarationTypeName = '年度'
            } else if (value === 'quarter') {
                this.form.declarationTypeName = '季度'
            }
        },
        confirm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$axios({
                        url: '/api/declaration/save',
                        method: 'post',
                        data: this.form
                    }).then(data => {
                        if (data.returnCode === 200) {
                            this.getData()
                            this.$message({
                                type: 'success',
                                message: '设定成功'
                            })
                            this.modalIsShow = false
                        } else {
                            this.$message({
                                type: 'error',
                                message: data.returnMsg
                            })
                        }
                    })
                }
            })
        },
        modification() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.row.declarationTypeCode = this.form.declarationTypeCode
                    this.row.declarationTypeName = this.form.declarationTypeName
                    this.row.declarationDate = this.form.declarationDate
                    this.row.declareDate = this.form.declareDate
                    this.$axios({
                        url: '/api/declaration/save',
                        method: 'post',
                        data: this.row
                    }).then(data => {
                        if (data.returnCode === 200) {
                            this.getData()
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                            this.modalIsShow = false
                        } else {
                            this.$message({
                                type: 'error',
                                message: data.returnMsg
                            })
                        }
                    })
                }
            })
        },
        handleEdit(index, row) {
            // console.log(row, 'row')
            this.row = row
            this.confirmShow = false
            this.modalIsShow = true
            this.form.declarationTypeCode = row.declarationTypeCode
            this.form.declarationDate = row.declarationDate
            this.form.declareDate = row.declareDate
        },
        handleDelete(index, row) {
            this.delrow = row
            this.handleDeleteMoadl = true
        },
        deleteData() {
            this.$axios({
                url: '/api/declaration/delete',
                method: 'post',
                data: this.delrow
            }).then(data => {
                if (data.returnCode === 200) {
                    this.handleDeleteMoadl = false
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.getData()
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

<style scoped lang="less"></style>
