<template>
    <div>
        <el-card>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/home/todoCenter' }">待办</el-breadcrumb-item>
                <el-breadcrumb-item>物流企业经营状况表申报</el-breadcrumb-item>
                <!-- <template slot="title">待办</template> -->
            </el-breadcrumb>
            <declarationQuarter v-if="selectType === 'quarter'" ref="declarationQuarter"></declarationQuarter>
            <declarationYear v-if="selectType === 'year'" ref="declarationYear"></declarationYear>
        </el-card>
    </div>
</template>

<script>
import declarationQuarter from './declaration-quarter'
import declarationYear from './declaration-year'
export default {
    name: 'declaration',
    props: {},
    data() {
        return {
            selectType: this.$route.query.declarationType
        }
    },
    computed: {},
    activated() {},
    created() {},
    mounted() {
        // console.log(this.$route.query.declarationType, '$route')
        let data = window.localStorage.getItem(`${this.$route.query.id}`)
        if (data) {
            this.$route.query.declarationType === 'quarter'
                ? (this.$refs.declarationQuarter.tableData.list = JSON.parse(data))
                : (this.$refs.declarationYear.tableData.list = JSON.parse(data))
        }
    },
    watch: {},
    methods: {
        selectChange(value) {
            this.flag = value
        },
        submit() {
            this.$message({
                type: 'success',
                message: '提交成功，在审核完成之前您可以随时在待办列表中修改申报'
            })
            this.$router.push({
                path: '/home/todoCenter',
                query: {},
                params: { op: 'refresh' }
            })
        },
        webSave() {
            let declarationType = this.$route.query.declarationType
            let id = this.$route.query.id
            if (declarationType === 'quarter') {
                let data = this.$refs.declarationQuarter.tableData.list
                window.localStorage.setItem(`${id}`, JSON.stringify(data))
                this.$message.success('暂存成功')
            } else if (declarationType === 'year') {
                let data = this.$refs.declarationYear.tableData.list
                window.localStorage.setItem(`${id}`, JSON.stringify(data))
                this.$message.success('暂存成功')
            }
        }
    },
    components: {
        declarationQuarter,
        declarationYear
    }
}
</script>

<style scoped lang="less"></style>
