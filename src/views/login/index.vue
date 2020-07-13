<template>
    <div class="login">
        <el-card class="login-card" v-if="flag === 'login'">
            <div slot="header">
                <i class="el-icon-d-arrow-right"></i>
                <span class="title" style="marginLeft:10px">欢迎登录</span>
            </div>
            <el-form class="card-content" ref="form" :model="loginForm" :rules="loginRules">
                <el-form-item prop="user">
                    <el-input
                        placeholder="请输入用户名"
                        prefix-icon="el-icon-user-solid"
                        v-model="loginForm.user"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        prefix-icon="el-icon-lock"
                        v-model="loginForm.password"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-row :gutter="20">
                        <el-col :span="13">
                            <el-input
                                placeholder="请输入验证码"
                                prefix-icon="el-icon-message"
                                v-model="loginForm.code"
                                @keyup.enter.native="submitLogin"
                            >
                            </el-input>
                        </el-col>
                        <el-col :span="10" style="padding:0;height:40px">
                            <el-image style="width: 100%; height: 40px" :src="url" @click="getKey()"></el-image>
                        </el-col>
                    </el-row>
                </el-form-item>
                <div class="register_btn">
                    <el-link type="primary" @click="register_btn">还没有账号?点击注册</el-link>
                </div>
                <el-form-item>
                    <el-button @click="submitLogin" type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <register ref="register" v-if="flag === 'register'"></register>
    </div>
</template>

<script>
import md5 from 'md5'
import register from './register'
import eventBus from '@/utils/eventBus'
import routes from '@/router/index'
import Home from '@/views/home'
import Home2 from '@/views/home/home.vue'
export default {
    name: 'login',
    components: {
        register
    },
    data() {
        return {
            flag: 'login',
            url: '',
            loginForm: {
                user: 'sys_admin',
                password: '123456',
                code: ''
            },
            loginRules: {
                company: [{ required: true, message: '请输入公司名', trigger: 'change' }],
                user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            }
        }
    },
    methods: {
        getKey() {
            this.$axios({
                url: '/api/captcha/fetch_captcha'
            }).then(res => {
                this.url = res.code
            })
        },
        submitLogin() {
            let _this = this
            this.$refs.form.validate(isOK => {
                if (isOK) {
                    let passwordUpperCase = md5(_this.loginForm.password).toUpperCase()
                    let params = {
                        userName: _this.loginForm.user,
                        password: passwordUpperCase,
                        code: _this.loginForm.code,
                        captchaIdentity: _this.loginForm.captchaIdentity
                    }
                    this.$axios({
                        url: '/api/authenticate',
                        method: 'post',
                        // crossDomain: true,
                        // xhrFields: { withCredentials: true },
                        data: params
                    })
                        .then(data => {
                            if (data.returnCode === 200) {
                                window.localStorage.setItem('user-token', data.returnData.token)
                                if (data.returnData.userInfo.authority === 'A001') {
                                    window.localStorage.setItem('level', '1')
                                } else if (data.returnData.userInfo.authority === 'A002') {
                                    window.localStorage.setItem('level', '2')
                                } else if (data.returnData.userInfo.authority === 'A003') {
                                    window.localStorage.setItem('level', '3')
                                }
                                // eventBus.$emit('userInfo', data.returnData.userInfo)
                                window.localStorage.setItem('userInfo', JSON.stringify(data.returnData.userInfo))
                                // 后台返回账户对应权限的菜单列表
                                // let routerList = [
                                //     {
                                //         path: '/home',
                                //         component: Home,
                                //         children: [
                                //             {
                                //                 path: '', // 二级路由地址什么都不写  代表二级路由默认的组件
                                //                 component: Home2
                                //             },
                                //             {
                                //                 path: 'account',
                                //                 component: () => import('@/views/account')
                                //             },
                                //             {
                                //                 path: 'userInfo',
                                //                 component: () => import('@/views/userInfo/userInfo')
                                //             },
                                //             {
                                //                 path: 'declarationOperate',
                                //                 component: () => import('@/views/declaration/declarationOperate')
                                //             },
                                //             {
                                //                 path: 'declarationSchedule',
                                //                 component: () => import('@/views/declaration/declarationSchedule')
                                //             },
                                //             {
                                //                 path: 'declaration',
                                //                 component: () => import('@/views/declaration/declaration')
                                //             },
                                //             {
                                //                 path: 'todoCenter',
                                //                 component: () => import('@/views/todoCenter')
                                //             },
                                //             {
                                //                 path: 'todoCenter/declaration',
                                //                 component: () => import('@/views/todoCenter/declaration')
                                //             },
                                //             {
                                //                 path: 'user/userAudit',
                                //                 component: () => import('@/views/user/userAudit')
                                //             },
                                //             {
                                //                 path: 'user/userManage',
                                //                 component: () => import('@/views/user/userManage')
                                //             },
                                //             {
                                //                 path: 'user/userManage/userinfo',
                                //                 component: () => import('@/views/user/user-info')
                                //             }
                                //         ]
                                //     },
                                //     {
                                //         path: '*',
                                //         component: () => import('@/views/404')
                                //     }
                                // ]
                                // window.localStorage.setItem('routerList', JSON.stringify(routerList))
                                // this.$router.addRoutes(routerList)
                                // this.$router.options.routes.push(...routerList)
                                // this.$router.addRoutes(nothing)
                                // this.$router.options.routes.pop()
                                // this.$router.options.routes.push(...routerList)
                                // this.$router.options.routes.push(...nothing)
                                // console.log(this.$router)
                                this.$message({
                                    type: 'success',
                                    message: '登录成功'
                                })
                                this.$router.push('/home')
                            } else if (data.returnCode === 400) {
                                _this.loginForm.code = ''
                                _this.getKey()
                                this.$message({
                                    type: 'error',
                                    message: data.returnMsg
                                })
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: data.returnMsg
                                })
                            }
                        })
                        .catch(res => {
                            // console.log('res 66', res)
                        })
                }
            })
            // let _this = this
            // this.$refs.form.validate(isOK => {
            //     if (isOK) {
            //         let passwordUpperCase = md5(_this.loginForm.password).toUpperCase() //eslint-disable-line
            //         this.$axios({
            //             url: '/authorizations',
            //             method: 'post',
            //             data: {
            //                 mobile: '15110514010',
            //                 code: '246810'
            //             }
            //         }).then(result => {
            //             if (this.loginForm.company === 'admin') {
            //                 window.sessionStorage.setItem('level', '1')
            //             } else {
            //                 window.sessionStorage.setItem('level', '0')
            //             }
            //             // 后台返回账户对应权限的菜单列表
            //             let routerList = [
            //                 {
            //                     path: '/home',
            //                     component: Home,
            //                     children: [
            //                         {
            //                             path: '', // 二级路由地址什么都不写  代表二级路由默认的组件
            //                             component: Home2
            //                         },
            //                         {
            //                             path: 'account',
            //                             component: () => import('@/views/account')
            //                         },
            //                         {
            //                             path: 'userInfo',
            //                             component: () => import('@/views/userInfo/userInfo')
            //                         },
            //                         {
            //                             path: 'declarationOperate',
            //                             component: () => import('@/views/declaration/declarationOperate')
            //                         },
            //                         {
            //                             path: 'declarationSchedule',
            //                             component: () => import('@/views/declaration/declarationSchedule')
            //                         },
            //                         {
            //                             path: 'declaration',
            //                             component: () => import('@/views/declaration/declaration')
            //                         },
            //                         {
            //                             path: 'todoCenter',
            //                             component: () => import('@/views/todoCenter')
            //                         },
            //                         {
            //                             path: 'todoCenter/declaration',
            //                             component: () => import('@/views/todoCenter/declaration')
            //                         },
            //                         {
            //                             path: 'user/userAudit',
            //                             component: () => import('@/views/user/userAudit')
            //                         },
            //                         {
            //                             path: 'user/userManage',
            //                             component: () => import('@/views/user/userManage')
            //                         },
            //                         {
            //                             path: 'user/userManage/userinfo',
            //                             component: () => import('@/views/user/user-info')
            //                         }
            //                     ]
            //                 }
            //             ]
            //             console.log(this.$router)
            //             this.$router.addRoutes(routerList)

            //             // 前端缓存 登录成功返回给我们的令牌
            //             window.localStorage.setItem('user-token', result.data.token)
            //             this.$router.push('/home')
            //         })
            //     }
            // })
        },
        register_btn() {
            this.flag = 'register'
        }
    },
    created() {
        this.getKey()
    }
}
</script>

<style lang="less" scoped>
.login {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    &:before {
        background-image: url('../../assets/img/loginBG.jpg');
        background-size: cover;
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background-position: bottom;
    }
    .login-card {
        position: absolute;
        right: 100px;
        top: 20vh;
        width: 300px;
        height: 350px;
        z-index: 2;
        background-color: rgba(255, 255, 255, 0.7);
        .title {
            color: #1c2438;
            font-weight: 800;
        }
        .register_btn {
            width: 100%;
            height: 30px;
            text-align: center;
            font-size: 16px;
        }
    }
}
</style>
