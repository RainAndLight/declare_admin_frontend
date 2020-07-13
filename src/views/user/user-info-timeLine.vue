<template>
    <div>
        <el-dialog title="企业单位基本信息表" :visible.sync="dialogVisible" width="50%">
            <div class="block">
                <el-timeline>
                    <el-timeline-item timestamp="2018/4/12" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/12 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/3" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/3 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/2 20:46</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'user-info-timeLine',
    props: {},
    data() {
        return {
            dialogVisible: false
        }
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {
        modalIsShow() {
            this.dialogVisible = true
        }
    },
    components: {}
}
</script>

<style scoped lang="less">
.block {
    height: 55vh;
    overflow: auto;
}
</style>
