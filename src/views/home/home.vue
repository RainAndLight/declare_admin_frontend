<template>
    <div>
        <!-- <el-button @click="btn">测试导出年度</el-button>
        <el-button @click="btnQuarter">测试导出季度</el-button>
        <el-button @click="btn2">测试导出合并（季度）</el-button> -->
        <!-- <div class="content">
            <p>
                欢迎使用物流企业申报系统
            </p>
        </div> -->
        <el-calendar>
            <template slot="dateCell" slot-scope="{ date, data }">
                <p :class="data.isSelected ? 'is-selected' : ''">
                    {{
                        data.day
                            .split('-')
                            .slice(1)
                            .join('-')
                    }}
                    {{ data.isSelected ? '✔️' : '' }}
                </p>
            </template>
        </el-calendar>
    </div>
</template>

<script>
import _ from 'lodash'
import XLSX from 'xlsx'

export default {
    data() {
        return {
            // flag: true,
            value: new Date(),
            excelData: [
                {
                    targetName: '货物购进总额',
                    measureUnit: '万元',
                    code: '01',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '货物销售总额',
                    measureUnit: '万元',
                    code: '02',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '货物运输量',
                    measureUnit: '吨',
                    code: '03',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '其中：自运货运量',
                    measureUnit: '吨',
                    code: '04',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '委托代理货运量',
                    measureUnit: '吨',
                    code: '05',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '自运货物周转量',
                    measureUnit: '吨公里',
                    code: '06',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '年末库存金额',
                    measureUnit: '万元',
                    code: '07',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '自运货物平均运价',
                    measureUnit: '元/吨公里',
                    code: '08',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '委托货物平均运价',
                    measureUnit: '元/吨公里',
                    code: '09',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '企业物流成本',
                    measureUnit: '万元',
                    code: '10',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '其中：保管成本',
                    measureUnit: '万元',
                    code: '11',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '其中：利息成本',
                    measureUnit: '万元',
                    code: '12',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '仓储成本',
                    measureUnit: '万元',
                    code: '13',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '保险成本',
                    measureUnit: '万元',
                    code: '14',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '货物损耗成本',
                    measureUnit: '万元',
                    code: '15',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '信息及相关服务成本',
                    measureUnit: '万元',
                    code: '16',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '配送成本',
                    measureUnit: '万元',
                    code: '17',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '流通加工成本',
                    measureUnit: '万元',
                    code: '18',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '包装成本',
                    measureUnit: '万元',
                    code: '19',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '其他保管成本',
                    measureUnit: '万元',
                    code: '20',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '管理成本',
                    measureUnit: '万元',
                    code: '21',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '其中：管理人员报酬',
                    measureUnit: '万元',
                    code: '22',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '办公成本',
                    measureUnit: '万元',
                    code: '23',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '教育培训成本',
                    measureUnit: '万元',
                    code: '24',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '劳动保险成本',
                    measureUnit: '万元',
                    code: '25',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '车船使用成本',
                    measureUnit: '万元',
                    code: '26',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '运输成本',
                    measureUnit: '万元',
                    code: '27',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '其中：运输成本',
                    measureUnit: '万元',
                    code: '28',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '装卸搬运等辅助成本',
                    measureUnit: '万元',
                    code: '29',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '货运业务成本',
                    measureUnit: '万元',
                    code: '30',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '运输附加费',
                    measureUnit: '万元',
                    code: '31',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '其他成本',
                    measureUnit: '万元',
                    code: '32',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                },
                {
                    targetName: '其中：一体化物流业务收入',
                    measureUnit: '万元',
                    code: '33',
                    current: '10',
                    YOY: '5',
                    last: '50%'
                }
            ],
            quarterData: [
                {
                    targetName: '货运量',
                    measureUnit: '吨',
                    code: '01',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '周转量',
                    measureUnit: '吨公里',
                    code: '02',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '配送量',
                    measureUnit: '吨',
                    code: '03',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '流通加工量',
                    measureUnit: '吨',
                    code: '04',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '包装量',
                    measureUnit: '吨',
                    code: '05',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '装卸搬运量',
                    measureUnit: '吨',
                    code: '06',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '吞吐量',
                    measureUnit: '吨',
                    code: '07',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '货代业务量',
                    measureUnit: '票',
                    code: '08',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '一体化物流业务量',
                    measureUnit: '份',
                    code: '09',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '年末库存额',
                    measureUnit: '万元',
                    code: '10',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '自运货物平均运价',
                    measureUnit: '元/吨公里',
                    code: '11',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '委托代理货物平均运价',
                    measureUnit: '元/吨公里',
                    code: '12',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '平均货物配送费率',
                    measureUnit: '元/吨',
                    code: '13',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '平均货物流通加工费率',
                    measureUnit: '元/吨',
                    code: '14',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '平均货物包装费率',
                    measureUnit: '元/吨',
                    code: '15',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '平均货物仓储费率',
                    measureUnit: '元/吨',
                    code: '16',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '平均货物装卸搬运费率',
                    measureUnit: '元/吨',
                    code: '17',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '主营业务收入',
                    measureUnit: '万元',
                    code: '18',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '其中:保管收入',
                    measureUnit: '万元',
                    code: '19',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '其中:仓储收入',
                    measureUnit: '万元',
                    code: '20',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '保险收入',
                    measureUnit: '万元',
                    code: '21',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '信息及相关服务收入',
                    measureUnit: '万元',
                    code: '22',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '配送收入',
                    measureUnit: '万元',
                    code: '23',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '流通加工收入',
                    measureUnit: '万元',
                    code: '24',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '包装收入',
                    measureUnit: '万元',
                    code: '25',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '其他保管收入',
                    measureUnit: '万元',
                    code: '26',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '运输收入',
                    measureUnit: '万元',
                    code: '27',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '其中：运输收入',
                    measureUnit: '万元',
                    code: '28',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '装卸搬运等辅助收入',
                    measureUnit: '万元',
                    code: '29',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '货运业务收入',
                    measureUnit: '万元',
                    code: '30',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '运输附加收入',
                    measureUnit: '万元',
                    code: '31',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '其他收入',
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
                },
                {
                    targetName: '主营业务成本',
                    measureUnit: '万元',
                    code: '34',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '其中：保管成本',
                    measureUnit: '万元',
                    code: '35',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '其中：利息成本',
                    measureUnit: '万元',
                    code: '36',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '仓储成本',
                    measureUnit: '万元',
                    code: '37',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '保险成本',
                    measureUnit: '万元',
                    code: '38',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '货物损耗成本',
                    measureUnit: '万元',
                    code: '39',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '信息及相关服务成本',
                    measureUnit: '万元',
                    code: '40',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '配送成本',
                    measureUnit: '万元',
                    code: '41',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '流通加工成本',
                    measureUnit: '万元',
                    code: '42',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '包装成本',
                    measureUnit: '万元',
                    code: '43',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '其他保管成本',
                    measureUnit: '万元',
                    code: '44',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '管理成本',
                    measureUnit: '万元',
                    code: '45',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '其中：管理人员报酬',
                    measureUnit: '万元',
                    code: '46',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '办公成本',
                    measureUnit: '万元',
                    code: '47',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '教育培训成本',
                    measureUnit: '万元',
                    code: '48',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '劳动保险成本',
                    measureUnit: '万元',
                    code: '49',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '车船使用成本',
                    measureUnit: '万元',
                    code: '50',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '运输成本',
                    measureUnit: '万元',
                    code: '51',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '其中：运输成本',
                    measureUnit: '万元',
                    code: '52',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '装卸搬运等辅助成本',
                    measureUnit: '万元',
                    code: '53',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '货运业务成本',
                    measureUnit: '万元',
                    code: '54',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '运输附加费',
                    measureUnit: '万元',
                    code: '55',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '其他成本',
                    measureUnit: '万元',
                    code: '56',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '其中：一体化物流业务成本',
                    measureUnit: '万元',
                    code: '57',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '主营业务利润额',
                    measureUnit: '万元',
                    code: '58',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '主营业务营业税金',
                    measureUnit: '万元',
                    code: '59',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '资产总计',
                    measureUnit: '万元',
                    code: '60',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '固定资产折旧',
                    measureUnit: '万元',
                    code: '61',
                    current: '',
                    YOY: ''
                },
                {
                    targetName: '固定资产投资完成额',
                    measureUnit: '万元',
                    code: '62',
                    current: '',
                    YOY: ''
                }
            ],
            headline: '2020 1月~4月 季度',
            headlineCompany: '京东'
        }
    },
    methods: {
        btn() {
            // this.exportDefaultExcel()
            let aoa = [
                [`企业物流经营状况表`, null, null, null, null, null],
                ['指标名称', '计量单位', '代码', '本期', '上年同期', '同比']
            ]
            let data = _.cloneDeep(this.excelData)
            data.forEach(item => {
                aoa.push(Object.values(item))
            })
            let sheet = XLSX.utils.aoa_to_sheet(aoa)
            sheet['!merges'] = [
                // 设置A1-C1的单元格合并
                { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }
            ]
            sheet['!cols'] = [{ wch: 25 }, { wch: 20 }]
            console.log('sheet', sheet)

            this.$util.openDownloadDialog(
                this.$util.sheetblob(sheet),
                `${this.headlineCompany}物流经营状况表（${this.headline}）.xlsx`
            )
        },
        btnQuarter() {
            let aoa = [
                [`物流企业经营状况表`, null, null, null, null, null],
                ['指标名称', '计量单位', '代码', '本期', '上年同期', '上年同比']
            ]
            let data = _.cloneDeep(this.quarterData)
            data.forEach(item => {
                aoa.push(Object.values(item))
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
                `${this.headlineCompany}物流经营状况表（${this.headline}）.xlsx`
            )
        },
        btn2() {
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
                ],
                [
                    '2020-6-1',
                    '顺丰物流',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo'
                ],
                [
                    '2020-6-1',
                    '京东物流',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo',
                    'demo'
                ]
            ]
            let optionWidth = [
                { wch: 20 },
                { wch: 40 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 },
                { wch: 20 }
            ]
            // api.getSheetMergeData().then()
            let sheet = XLSX.utils.aoa_to_sheet(aoa)
            sheet['!cols'] = optionWidth
            this.$util.openDownloadDialog(this.$util.sheetblob(sheet), `物流101.xlsx`)
        }
    },
    created() {
        // const h = this.$createElement
        // if (this.flag) {
        //     this.flag = false
        //     this.$notify({
        //         title: '提示',
        //         // message: h('i', { style: 'color: teal' }, '欢迎使用物流企业申报系统'),
        //         message: '欢迎使用物流企业申报系统',
        //         showClose: false,
        //         type: 'success'
        //     })
        // }
    }
}
</script>

<style lang="less" scoped>
.main {
    width: 300px;
    height: 100px;
    /deep/ .el-calendar-day {
        height: auto;
    }
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
.content {
    display: flex;
    font-size: 24px;
    font-weight: 700;
    justify-content: center;
    // align-items: center;
    height: 80vh;
}
</style>
