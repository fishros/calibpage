<template>
    <div class="container">
        <!-- 标题部分 -->
        <h2 class="title">　欢迎加入 鱼香ROS　翻译组织　</h2>
        <el-row></el-row>
        <!-- 表单部分 -->
        <el-form ref="formRef" :model="form" label-width="auto" :rules="rules">
            <el-row justify="center" align="center">
                <el-col :span="8">
                    <el-form-item label="昵称：" prop="username">
                        <el-input v-model="form.username" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="github主页：" prop="github">
                        <el-input v-model="form.github"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="邮箱：" prop="email">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="原文内容：" >
                <el-input v-model="form.originText" type="textarea" readonly autosize></el-input>
            </el-form-item>
            <el-form-item label="上一版本翻译内容：">
                <el-input v-model="form.latestText" type="textarea" autosize readonly></el-input>
            </el-form-item>
            <el-form-item label="新的翻译内容：" prop="newText">
                <el-input v-model="form.newText" type="textarea" autosize></el-input>
            </el-form-item>
            <el-form-item>
                <el-row justify="center">
                    <el-col :span="12">
                        <el-button type="primary" @click="submitForm">提交</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button type="primary" @click="getNextMsg">下一条</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, h } from 'vue'; 
import { http } from '../utils/http';
import { ElMessage, ElNotification } from 'element-plus'

export default defineComponent({
    name: 'Home',
    setup() {
        let url = "", query = '', data = undefined

        const formRef = ref()
        const form = reactive({
            username: '',
            github: '',
            originText: '',
            latestText: '',
            newText: '',
            email: ''
        })

        const rules = reactive({
            username: [{
                min: 3,
                max: 25,
                message: '昵称长度需要为3到25之间',
                trigger: 'blur',
            }],
            github: [{
                required: true,
                message: 'github 主页地址不能为空',
                trigger: 'blur',
            }],
            newText: [{
                required: true,
                message: '翻译内容不能为空',
                trigger: 'blur'
            }],
            email: [{
                required: true,
                message: '',
                trigger: 'blur'
            }]
        })

        const getNextMsg = async() => {
            await http('next_msg', {data: { "msgid": query }}).then(res => {
                console.log(res, 'getNextMsg')
                form.originText = res[0].msgen
                form.latestText = res[0].msgzh
                form.newText = res[0].msgzh
                query = res[0].msgid
            }        
            )
        }

        onBeforeMount(async() => {
            url = window.location.href
            query = url?.split('?')[1]?.split('=')[1]

            await http('get_msg', {data: { "msgid": query }, method: 'post'}).then(res => {
                form.originText = res[0].msgen
                form.latestText = res[0].msgzh
                form.newText = res[0].msgzh
            }        
            )
        })

        const submitForm = () => {
            formRef.value.validate((valid: boolean) => {
                if(valid) {
                    const calibmsg = form.newText
                    const data = {
                        calibmsg,
                        msgid: query,
                        name: form.username,
                        github: form.github,
                        email: form.email
                    }
                    http('calib_msg', {data, method: 'POST'}).then(res => {
                        console.log(res, 'submitForm')
                          ElMessage({
                            message: '提交成功，棒棒哒！',
                            type: 'success',
                        })
                    })
                } else{
                        ElNotification({
                            title: 'Error',
                            message: 'This is an error message',
                            type: 'error',
                        })
                }
            })
        }

        return {
            form,
            submitForm,
            data,
            rules,
            getNextMsg,
            formRef
        };
    }
});
</script>

<style lang='less'>
.container {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    padding-top: 20px;
}

.title {
    text-align: center;
    margin-bottom: 20px;
}
</style>