<template>
    <!-- 放置一个大容器 -->
    <el-container>
        <!-- 左右布局 -->
        <el-aside
            :style="{ width: collapse ? '69px' : '230px' }"
            style="transition: all 0.5s;  min-height:100vh;background-color:#353b4e;"
        >
            <layout-aside :collapse="collapse"></layout-aside>
        </el-aside>
        <!-- 右侧容器 -->
        <el-container>
            <!-- 上下布局 -->
            <el-header>
                <!-- 头部组件 -->
                <layout-header></layout-header>
            </el-header>
            <el-main class="main">
                <!-- 二级路由容器 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
    data() {
        return {
            collapse: false // 默认是展开
        }
    },
    created() {
        // 开启监听
        eventBus.$on('changeCollapse', () => {
            // 头部组件告诉折叠相关的所有组件 要改变了
            this.collapse = !this.collapse
        })
        this.sound()
    },
    methods: {
        sound() {
            // setTimeout(() => {
            //     this.$axios({
            //         url: '/api/declaration_related_user/page',
            //         method: 'post',
            //         data: JSON.parse(window.localStorage.getItem('userInfo')).id
            //     }).then(data => {
            //         if(data.returnCode === 200){
            //                                         this.$message({
            //                     type: 'success',
            //                     message: '设定成功'
            //                 })
            //         }
            //     })
            // }, 60000);
        }
    }
}
</script>

<style scoped>
.el-main {
    padding-top: 0;
}
</style>
