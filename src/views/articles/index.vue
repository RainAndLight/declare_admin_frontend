<template>
    <div></div>
</template>

<script>
/******
 * author gaoly
 * created by 2019-12-21
 * modify  by liun
 * ********/
// import { getArticles, getChannels } from '../../actions/articles'
export default {
    data() {
        return {
            //   searchForm: {
            //     status: 5, // 默认应该选中全部
            //     channel_id: null, // 默认不选中任何一个分类
            //     dateRange: [] // 日期范围
            //   },
            //   channels: [], // 接收频道数据
            //   list: [],
            //   defaultImg: require('../../assets/img/default.jpg'), // 默认图片
            //   backImg: require('../../assets/img/wap-preview.png'),
            //   page: {
            //     currentPage: 1,
            //     pageSize: 10, // 黑马头条后端限制 最低10条 => 文章列表
            //     total: 0
            //   }
        }
    },
    watch: {
        // searchForm: {
        //     handler: function() {
        //         // 此时数据已经变成最新的了
        //         // this 指向组件实例
        //         this.changeCondition() // 直接调用条件改变的方法
        //     },
        //     deep: true
        // }
    },
    filters: {
        //   过滤器第一个参数 是value
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
        // },
        // filterType(value) {
        //     //  文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
        //     switch (value) {
        //         case 0:
        //             return 'warning'
        //         case 1:
        //             return 'info'
        //         case 2:
        //             return ''
        //         case 3:
        //             return 'danger'
        //         default:
        //             break
        //     }
        // }
    },
    methods: {
        // 预览
        // preview(obj) {
        //     this.previewObj = obj
        //     this.dialogPreview = true
        // },
        // // 去修改页面 => 实际上就是发布页面
        // toModify(id) {
        //     this.$router.push(`/home/publish/${id.toString()}`)
        // },
        // // 删除文章
        // async delMaterial(id) {
        //     await this.$confirm('是否要删除该文章?')
        //     // 调用删除接口
        //     await this.$axios({
        //         method: 'delete',
        //         url: `/articles/${id.toString()}`
        //     })
        //     // 提示
        //     this.$message({
        //         type: 'success',
        //         message: '删除成功'
        //     })
        //     // 重新拉取数据
        //     // this.page.currentPage = 1 // 根据业务 处理 如果删除了数据 是否回到第一页根据具体业务而定
        //     this.getConditionArticle()
        // },
        // //   改变页码方法
        // changePage(newPage) {
        //     this.page.currentPage = newPage // 最新页码
        //     this.getConditionArticle() // 调用获取文章数据
        // },
        // //   改变条件
        // changeCondition() {
        //     this.page.currentPage = 1 // 强制将页码重置第一页
        //     this.getConditionArticle() // 调用获取文章数据
        // },
        // getConditionArticle() {
        //     let params = {
        //         page: this.page.currentPage,
        //         per_page: this.page.pageSize,
        //         status: this.searchForm.status === 5 ? null : this.searchForm.status, // 因为5是前端定义的一个标识, 如果等于5 表示查全部, 全部应该什么都不传 直接传null
        //         channel_id: this.searchForm.channel_id,
        //         begin_pubdate:
        //             this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null, // 开始时间
        //         end_pubdate:
        //             this.searchForm.dateRange && this.searchForm.dateRange.length > 1
        //                 ? this.searchForm.dateRange[1]
        //                 : null // 截止时间
        //     }
        //     // 加上一个非空处理
        //     this.getArticles(params)
        // },
        // //   获取所有的频道
        // async getChannels() {
        //     let result = await getChannels()
        //     this.channels = result.data.channels
        // },
        // // 获取文章列表数据
        // async getArticles(params) {
        //     let result = await getArticles(params) // 调用获取文章模块
        //     this.list = result.data.results // 获取文章列表数据
        //     this.page.total = result.data.total_count // 总数
        // }
    },
    created() {
        // this.getChannels() // 获取文章数据
        // this.getArticles({ page: 1, per_page: 10 }) // 获取文章列表数据
    }
}
</script>

<style lang="less" scoped></style>
