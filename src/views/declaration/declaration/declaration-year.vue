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
            <el-table-column align="center" label="上年同期" prop="YOY">
                <template slot-scope="scoped">
                    <el-input required size="mini" v-model="scoped.row.YOY"></el-input>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'declaration-quarter',
    props: {},
    data() {
        return {
            tableData: {
                list: [
                    {
                        targetName: '货物购进总额',
                        measureUnit: '万元',
                        code: '01',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '货物销售总额',
                        measureUnit: '万元',
                        code: '02',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '货物运输量',
                        measureUnit: '吨',
                        code: '03',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '其中：自运货运量',
                        measureUnit: '吨',
                        code: '04',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '委托代理货运量',
                        measureUnit: '吨',
                        code: '05',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '自运货物周转量',
                        measureUnit: '吨公里',
                        code: '06',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '年末库存金额',
                        measureUnit: '万元',
                        code: '07',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '自运货物平均运价',
                        measureUnit: '元/吨公里',
                        code: '08',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '委托货物平均运价',
                        measureUnit: '元/吨公里',
                        code: '09',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '企业物流成本',
                        measureUnit: '万元',
                        code: '10',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '其中：保管成本',
                        measureUnit: '万元',
                        code: '11',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '其中：利息成本',
                        measureUnit: '万元',
                        code: '12',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '仓储成本',
                        measureUnit: '万元',
                        code: '13',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '保险成本',
                        measureUnit: '万元',
                        code: '14',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '货物损耗成本',
                        measureUnit: '万元',
                        code: '15',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '信息及相关服务成本',
                        measureUnit: '万元',
                        code: '16',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '配送成本',
                        measureUnit: '万元',
                        code: '17',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '流通加工成本',
                        measureUnit: '万元',
                        code: '18',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '包装成本',
                        measureUnit: '万元',
                        code: '19',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '其他保管成本',
                        measureUnit: '万元',
                        code: '20',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '管理成本',
                        measureUnit: '万元',
                        code: '21',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '其中：管理人员报酬',
                        measureUnit: '万元',
                        code: '22',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '办公成本',
                        measureUnit: '万元',
                        code: '23',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '教育培训成本',
                        measureUnit: '万元',
                        code: '24',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '劳动保险成本',
                        measureUnit: '万元',
                        code: '25',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '车船使用成本',
                        measureUnit: '万元',
                        code: '26',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '运输成本',
                        measureUnit: '万元',
                        code: '27',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '其中：运输成本',
                        measureUnit: '万元',
                        code: '28',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '装卸搬运等辅助成本',
                        measureUnit: '万元',
                        code: '29',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '货运业务成本',
                        measureUnit: '万元',
                        code: '30',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '运输附加费',
                        measureUnit: '万元',
                        code: '31',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '其他成本',
                        measureUnit: '万元',
                        code: '32',
                        current: '',
                        YOY: ''
                    },
                    {
                        targetName: '其中：一体化物流业务收入',
                        measureUnit: '万元',
                        code: '33',
                        current: '',
                        YOY: ''
                    }
                ]
            }
        }
    },
    created() {},
    watch: {},
    methods: {}
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
</style>
