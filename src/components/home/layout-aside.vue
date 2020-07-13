<template>
    <div class="layout-aside">
        <!-- 左侧导航组件  开启路由 :router="true" 或者 router-->
        <!-- <el-menu
            :collapse="collapse"
            router
            background-color="#353b4e"
            text-color="#adafb5"
            active-text-color="#ffd04b"
        > -->
        <el-menu
            :collapse="collapse"
            router
            background-color="#353b4e"
            text-color="#adafb5"
            active-text-color="#ffd04b"
            :default-openeds="menuDefaultList"
        >
            <template v-for="(item, index) in routes">
                <component
                    class="menu-item"
                    v-if="!item.hidden"
                    :key="index"
                    :index="item.index"
                    :is="item.children && item.children.length > 0 ? 'el-submenu' : 'el-menu-item'"
                >
                    <template v-if="item.children && item.children.length > 0">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template>
                            <el-menu-item class="menu-item" v-for="(v, i) in item.children" :key="i" :index="v.index">
                                <i :class="v.icon"></i>
                                <span slot="title">{{ v.title }}</span>
                            </el-menu-item>
                        </template>
                    </template>
                    <template v-else>
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </template>
                </component>
            </template>
        </el-menu>

        <!-- <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>企业信息</span>
                </template>
                <el-menu-item index="/home/account">账户信息</el-menu-item>
                <el-menu-item index="/home/userInfo">企业单位基本情况</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>申报</span>
                </template>
                <el-menu-item index="/home/declarationOperate">操作</el-menu-item>
                <el-menu-item index="/home/declarationSchedule">申报进度</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>账号管理</span>
                </template>
                <el-menu-item index="/home/user/userAudit">账号审核</el-menu-item>
                <el-menu-item index="/home/user/userManage">账号列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="/home/todoCenter">
                <i class="el-icon-edit-outline"></i>
                <span>待办</span>
            </el-menu-item>
        </el-menu> -->
    </div>
</template>

<script>
export default {
    name: 'layoutAside',
    props: ['collapse'],
    data() {
        return {
            menuDefaultList: ['1', '2', '3'],
            routes: [
                {
                    index: '/home',
                    title: '首页',
                    icon: 'el-icon-s-home',
                    hidden: false
                },
                {
                    index: '1',
                    title: '企业信息',
                    icon: 'el-icon-s-custom',
                    hidden: false,
                    children: [
                        {
                            index: '/home/account',
                            title: '账户信息'
                        },
                        {
                            index: '/home/userInfo',
                            title: '企业单位基本情况'
                        }
                    ]
                },
                {
                    index: '2',
                    title: '申报',
                    hidden: false,
                    icon: 'el-icon-document',
                    children: [
                        {
                            index: '/home/declarationOperate',
                            title: '操作'
                        },
                        {
                            index: '/home/declarationSchedule',
                            title: '申报进度'
                        }
                    ]
                },
                {
                    index: '3',
                    title: '账号管理',
                    icon: 'el-icon-user',
                    hidden: false,
                    children: [
                        {
                            index: '/home/user/userAudit',
                            title: '账号审核'
                        },
                        {
                            index: '/home/user/userManage',
                            title: '账号列表'
                        }
                    ]
                },
                {
                    index: '/home/todoCenter',
                    title: '待办',
                    icon: 'el-icon-edit-outline',
                    hidden: false
                }
            ]
        }
    },
    methods: {
        getLevel() {
            const level = window.localStorage.getItem('level')
            if (level === '1') {
                this.routes.forEach(item => {
                    if (item.title === '申报') {
                        item.hidden = true
                    }
                    if (item.title === '账号管理') {
                        item.hidden = true
                    }
                    if (item.title === '待办') {
                        item.hidden = true
                    }
                })
            } else if (level === '2') {
                this.routes.forEach(item => {
                    if (item.title === '申报') {
                        item.hidden = true
                    }
                    if (item.title === '账号管理') {
                        item.hidden = true
                    }
                })
            } else if (level === '3') {
                this.routes.forEach(item => {
                    if (item.title === '企业信息') {
                        item.hidden = true
                    }
                    if (item.title === '待办') {
                        item.hidden = true
                    }
                })
            }
        }
    },
    created() {
        this.getLevel()
    }
}
</script>

<style lang="less" scoped>
.layout-aside {
    //  width: 230px;
    .el-menu {
        border-right: none;
    }
    .title {
        background-color: #2e2f32;
        text-align: center;
        padding: 10px 0;
        img {
            height: 35px;
        }
    }
}
</style>
