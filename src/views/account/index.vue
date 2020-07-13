<template>
    <el-card v-loading="loading" style="height:85vh">
        <bread-crumb slot="header">
            <template slot="title">账户信息</template>
        </bread-crumb>
        <!-- 表单 => 表单容器 -->
        <div style="height:calc(80vh - 50px);overflow:auto">
            <el-form ref="myForm" :model="formData" :rules="rules" style="margin-left:100px" label-width="100px">
                <el-form-item prop="companyName" label="公司名称">
                    <el-input v-model="formData.companyName" style="width:40%" readonly></el-input>
                </el-form-item>
                <el-form-item prop="companyAccount" label="企业账号">
                    <el-input v-model="formData.companyAccount" style="width:40%" readonly></el-input>
                </el-form-item>
                <!-- <el-form-item prop="companyPassword" label="密码">
                    <el-input v-model="formData.companyPassword" show-password style="width:40%"></el-input>
                </el-form-item> -->
                <el-form-item prop="audit" label="账号审核">
                    <!-- <el-checkbox v-model="formData.audit" disabled>已通过</el-checkbox>
                    <el-checkbox v-model="formData.audit1" disabled>未通过</el-checkbox> -->
                    <el-switch
                        inactive-text="暂未通过"
                        active-text="已通过"
                        disabled
                        v-model="formData.audit"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    >
                    </el-switch>
                </el-form-item>
            </el-form>
            <!-- 上传组件 -->
            <!-- <el-upload :http-request="uploadImg" class="head-upload" action="" :show-file-list="false">
                <img :src="formData.photo ? formData.photo : defaultImg" alt="" />
            </el-upload> -->
            <!-- <el-upload
                class="avatar-uploader head-upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
        </div>
    </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
    data() {
        return {
            // imageUrl: '',
            loading: false,
            formData: {
                companyName: '',
                companyAccount: '',
                audit: false
            },
            // defaultImg: require('../../assets/img/saber.jpg'),
            rules: {
                //   用户名 邮箱
                // name: [
                //     { required: true, message: '用户名不能为空' },
                //     {
                //         min: 1,
                //         max: 7,
                //         message: '用户名长度在1到7个字符'
                //     }
                // ],
                // email: [
                //     { required: true, message: '邮箱不能为空' },
                //     {
                //         pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                //         message: '邮箱格式不正确'
                //     }
                // ]
            }
        }
    },
    methods: {
        uploadImg(params) {
            this.loading = true // 打开弹层
            let data = new FormData()
            data.append('photo', params.file)
            this.$axios({
                url: '/user/photo',
                method: 'patch',
                data
            }).then(result => {
                this.loading = false // 关闭弹层
                if (result.status === 200) {
                    this.formData.photo = result.data.photo // 给当前的头像赋值
                    // 认为保存成功 => 通知header组件 更新信息
                    eventBus.$emit('updateUserInfo')
                }
            })
        },
        //   获取用户个人信息
        getUserInfo() {
            this.loading = true // 打开弹层
            this.$axios({
                url: '/user/profile'
            }).then(result => {
                this.loading = false // 关闭弹层
                this.formData = result.data
            })
        },
        saveUserInfo() {
            this.$refs.myForm.validate().then(result => {
                //  调用保存接口
                this.$axios({
                    url: '/user/profile',
                    method: 'patch',
                    data: this.formData
                }).then(result => {
                    this.$message({
                        type: 'success',
                        message: '保存用户信息成功'
                    })
                    // 认为保存成功 => 通知header组件 更新信息
                    eventBus.$emit('updateUserInfo')
                })
            })
        },
        // handleAvatarSuccess(res, file) {
        //     this.imageUrl = URL.createObjectURL(file.raw)
        // },
        // beforeAvatarUpload(file) {
        //     const isJPG = file.type === 'image/jpeg'
        //     const isLt2M = file.size / 1024 / 1024 < 2

        //     if (!isJPG) {
        //         this.$message.error('上传头像图片只能是 JPG 格式!')
        //     }
        //     if (!isLt2M) {
        //         this.$message.error('上传头像图片大小不能超过 2MB!')
        //     }
        //     return isJPG && isLt2M
        // },
        watchRes() {}
    },
    created() {
        if (window.localStorage.getItem('userInfo')) {
            let obj = JSON.parse(window.localStorage.getItem('userInfo'))
            this.formData = {
                companyName: obj.company,
                companyAccount: obj.userName
            }
            if (obj.accountFlag === 2) {
                this.formData.audit = true
            } else {
                this.formData.audit = false
            }
        }
        // this.watchRes()
    }
}
</script>

<style lang="less" scoped>
.head-upload {
    position: absolute;
    right: 250px;
    top: 125px;
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
