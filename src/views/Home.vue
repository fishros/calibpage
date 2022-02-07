<template>
    <div class="container">
        <!-- 标题部分 -->
        <h2 class="title"> 开源互助 共同进步 感谢您的校正 </h2>
        <!-- 表单部分 -->
        <el-form ref="formRef" :model="form" label-width="auto" :rules="rules">
            <el-row justify="center" align="center">
                <el-col :span="8">
                    <el-form-item label="昵称：" prop="username">
                        <el-input v-model="form.username" placeholder="请输入您的昵称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="github主页：" prop="github">
                        <el-input v-model="form.github" placeholder="请输入您的github主页地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="邮箱：" prop="email">
                        <el-input v-model="form.email" placeholder="请输入您的邮箱地址"></el-input>
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
                <el-input v-model="form.newText" type="textarea" autosize placeholder="请输入您校准之后的内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-row justify="center">
                    <el-col :span="8">
                        <el-button type="primary" @click="submitForm">提交</el-button>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary" @click="getNextMsg">下一条</el-button>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary" @click="submitFormTitle">标记标题并提交</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref} from 'vue'; 
import { http } from '../utils/http';
import { ElMessage, ElNotification } from 'element-plus'
import { setLocalStorage, getLocalStorage, getQueryUrl} from '../utils/utils'

export default defineComponent({
    name: 'Home',
    setup() {
        let data = undefined
        let query = getQueryUrl()
        const formRef = ref()
        const form = reactive({
            username: '',
            github: '',
            originText: '',
            latestText: '',
            newText: '',
            email: ''
        })

        const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        const regGithub = /^https:\/\/github.com.*$/

        const validEmail = (rule: any, value: any, callback: any) => {
            if (value === '') {
                callback(new Error('请输入您的邮箱地址'))
            } else if(!regEmail.test(form.email)) {
                callback(new Error('邮箱格式不正确'))
            }
            callback() 
        }

        const validateNewText = (rule: any, value: any, callback: any) => {
            if (value === '') {
                callback(new Error('请输入您校准之后的内容'))
            } else {
                if(form.newText === form.latestText) {
                    callback(new Error('请输入您校准之后的内容'))
                }
                callback()
            }
        }

        const validateGithub = (rule: any, value: any, callback: any) => {
            if(value === '') {
                callback(new Error('请输入您的github主页地址'))
            } else if(!regGithub.test(form.github)) {
                callback(new Error('github主页地址不正确，请以https://github.com开头'))
            }
            callback()
        }

        const rules = reactive({
            username: [{
                min: 2,
                max: 25,
                message: '昵称长度需要为2到25之间',
                trigger: 'blur',
            }],
            github: [{
                validator: validateGithub,
                required: true,
                trigger: 'blur',
            }],
            newText: [{
                validator: validateNewText,
                required: true,
                trigger: 'blur'
            }],
            email: [{
                validator: validEmail,
                required: true,
                trigger: 'blur'
            }]
        })

        const getNextMsg = async() => {
            if(query){
            const userinfo = getLocalStorage('tw')
                await http('next_msg', {data: { "msgid": query }}).then(res => {
                    form.originText = res[0].msgen
                    form.latestText = res[0].msgzh
                    form.newText = res[0].msgzh
                    query = res[0].msgid
                    if(userinfo) {
                        const {name, github, email} = userinfo
                        form.username = name
                        form.github = github
                        form.email = email
                    }
                }        
            )
            }
        }

        onBeforeMount(async() => {
            const userinfo = getLocalStorage('tw')
            if(query) {
                await http('get_msg', {data: { "msgid": query }, method: 'post'}).then(res => {
                form.originText = res[0].msgen
                form.latestText = res[0].msgzh
                form.newText = res[0].msgzh
                if(userinfo) {
                    const {name, github, email} = userinfo
                    form.username = name
                    form.github = github
                    form.email = email
                }
            })
            }else {
                ElNotification.info('请从 Nav2 中文网页面进入')
            }
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
                        const {calibmsg, msgid, ...userinfo} = data
                    setLocalStorage('tw', userinfo)
                    }).catch(e => {
                        ElMessage.error(e)
                    })
                    
                } else{
                        ElNotification({
                            title: 'Error',
                            message: '输入有误，请检查您输入的内容',
                            type: 'error',
                        })
                }
            })
        }

        const submitFormTitle = () => {
            formRef.value.validate((valid: boolean) => {
                if(valid) {
                    const calibmsg = form.newText
                    const data = {
                        calibmsg,
                        msgid: query,
                        name: form.username,
                        github: form.github,
                        email: form.email,
                        status: 200
                    }
                    http('calib_msg', {data, method: 'POST'}).then(res => {
                        console.log(res, 'submitForm')
                          ElMessage({
                            message: '提交成功，棒棒哒！',
                            type: 'success',
                        })
                        const {calibmsg, msgid, ...userinfo} = data
                    setLocalStorage('tw', userinfo)
                    }).catch(e => {
                        ElMessage.error(e)
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
            submitFormTitle,
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