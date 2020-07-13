<template>
    <div>
        <el-dialog title="企业单位基本情况表" :visible.sync="dialogShow" width="80%">
            <div class="header">物流企业经营状况表（季度）</div>
            <el-table
                :data="tableData.list"
                border
                height="40vh"
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
            <span slot="footer">
                <el-button type="primary" @click="drawer = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: '',
    props: ['declarationId', 'userId'],
    data() {
        return {
            dialogShow: false,
            tableData: {
                list: []
            }
        }
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {
        getData() {
            this.$axios({
                url:
                    '/api/declaration_related_user/fetch_declare_detail?declarationId=' +
                    this.declarationId +
                    '&userId=' +
                    this.userId
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
        dialogIsShow() {
            this.dialogShow = true
            setTimeout(() => {
                this.getData()
            }, 0)
        }
    },
    components: {}
}
</script>

<style scoped lang="less"></style>
