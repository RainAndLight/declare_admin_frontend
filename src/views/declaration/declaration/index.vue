<template>
    <div>
        <el-card>
            <bread-crumb slot="header">
                <template slot="title">物流企业经营状况表申报</template>
            </bread-crumb>
            <div class="header">
                <div class="select">
                    选择申报表类型
                    <el-select v-model="selectType" placeholder="请选择" size="mini" @change="selectChange">
                        <el-option label="季度" value="month"></el-option>
                        <el-option label="年度" value="year"></el-option>
                    </el-select>
                </div>
                <div class="btton">
                    <!-- <el-button type="success">暂存</el-button>
                <el-button type="primary">提交</el-button> -->
                </div>
            </div>
            <declarationQuarter v-if="selectType === 'month'"></declarationQuarter>
            <declarationYear v-if="selectType === 'year'"></declarationYear>
            <div class="footerBtn">
                <el-button type="success">暂存</el-button>
                <el-button type="primary">提交</el-button>
            </div>
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
            selectType: 'month'
        }
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {
        selectChange(value) {
            this.flag = value
        }
    },
    components: {
        declarationQuarter,
        declarationYear
    }
}
</script>

<style scoped lang="less">
.header {
    display: flex;
    justify-content: flex-end;
    .select {
        flex: 1;
    }
    // .button {
    //     flex: 1;
    // }
}
.footerBtn {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
</style>
