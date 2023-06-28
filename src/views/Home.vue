<template>
    <el-tabs v-model="activeName"  @tab-click="handleClickTab" value>
        <el-tab-pane label="校准页" name="calibpage">
        <div class="container">
        <!-- 标题部分 -->
        <h2 class="title">开源互助，共同提高</h2>
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
                <div class="btns">
                    <div>
                        <el-button type="primary" @click="submitFormWithStatus(200)">标记标题</el-button>
                        <el-button type="primary" @click="submitFormWithStatus(201)">标记无需翻译</el-button>
                    </div>
                    <div>
                        <el-button type="primary" @click="submitForm">提交</el-button>
                        <el-button type="primary" @click="getNextMsg">下一条</el-button>
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <!-- 翻译记录部分 -->
        <h3 class="logTitle">校准更新记录：</h3>
        <el-timeline v-if="changeLog?.length > 0">
            <el-timeline-item
            placement="top"
            v-for="(item, index) in changeLog"
            :key="index"
            :timestamp="formatGMT(item?.update_time)"
            >
                <el-card>
                    <h4 class="calibmsg-title">
                        <a :href="item?.github" target="_blank">
                            {{item?.contributor}}
                        </a>
                        更新于 {{formatGMT(item?.update_time)}}
                    </h4>
                    <p>
                        {{ item?.calibmsg }}
                    </p>    
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <p v-else>当前暂无校准内容，快来校准吧~</p>
    </div>
        </el-tab-pane>
        <el-tab-pane label="排行榜" name="rank">
            <el-table :data="rankData" style="width: 70%"
            :header-cell-style="{'text-align': 'center', 'color': '#333'}"
            border
            >
                <el-table-column type="index" label="排名" align="center" width='180'/>
                <el-table-column prop="name" label="贡献者名称"  align="center">
                    <template #default="scope">
                        <a :href="scope.row.github">{{scope.row.name}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="p_count" label="校准段落总计" align="center"/>
                <!-- <el-table-column prop="word_count" label="校准词汇总计" /> -->
            </el-table>
        </el-tab-pane>
    </el-tabs>

</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, reactive, ref} from 'vue'; 
import { http } from '../utils/http';
import { formatGMT } from '../utils/utils';
import { ElMessage, ElNotification } from 'element-plus'
import { setLocalStorage, getLocalStorage, getQueryUrl} from '../utils/utils'

export default defineComponent({
    name: 'Home',
    setup() {
        let data = undefined
        let rankData = ref()
        const changeLog = ref()
        const activeName = ref('calibpage')
        let params = getQueryUrl()
        // @ts-ignore
        let apiHost = params?.apihost
        
        // @ts-ignore
        let request_msgid = params?.msgid
        let haveParam = Object.keys(params).length !== 0
        console.log(params,apiHost,request_msgid,haveParam)
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
                if(form.newText.trim() === form.latestText) {
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
            if(haveParam){
            const userinfo = getLocalStorage('tw')
                await http(apiHost,'next_msg', {data: { "msgid": parseInt(request_msgid, 10)+1 }}).then(res => {
                    form.originText = res?.msgen
                    form.latestText = res?.msgzh
                    form.newText = res?.msgzh
                    request_msgid = res?.msgid
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

        const updateForm = async() => {
            const userinfo = getLocalStorage('tw')
            await http(apiHost,'get_msg', {data: { "msgid": request_msgid }, method: 'post'}).then(res => {
                form.originText = res.msgen
                form.latestText = res.msgzh
                form.newText = res.msgzh
                changeLog.value = res.change_log
                if(userinfo) {
                    const {name, github, email} = userinfo
                    form.username = name
                    form.github = github
                    form.email = email
                }
            })
        }

        onBeforeMount(async() => {
            if (haveParam){
                await updateForm()
                await getRankData()
            }else{
                ElNotification.info('请从中文网页面进入')
            }
        })

        onMounted(async() => {
            if (haveParam){
                await getRankData()
                ElNotification.success('已更新排行榜')
            }
        })

        // 提交
        const submitForm = () => {
            formRef.value.validate( (valid: boolean) => {
                if(valid) {
                    const calibmsg = form.newText.trim()
                    const data = {
                        calibmsg,
                        msgid: request_msgid,
                        name: form.username,
                        github: form.github,
                        email: form.email
                    }
                    http(apiHost,'calib_msg', {data, method: 'POST'}).then(async res => {
                          ElMessage({
                            message: `提交成功，棒棒哒！恭喜您已累计校准${res.calibcount}词汇`,
                            type: 'success',
                            duration: 6000
                        })
                        const {calibmsg, msgid, ...userinfo} = data
                        setLocalStorage('tw', userinfo)
                        await updateForm()
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

        // 标记无需翻译
        const submitFormWithStatus = (status: number) => {
                const calibmsg = form.newText.trim()
                const data = {
                    calibmsg,
                    msgid: request_msgid,
                    name: form.username,
                    github: form.github,
                    email: form.email,
                    status: status
                }
                http(apiHost,'calib_msg', {data, method: 'POST'}).then(res => {
                        ElMessage({
                        message: `提交成功，棒棒哒！恭喜您已累计校准${res.calibcount}词汇`,
                        type: 'success',
                        duration: 6000
                    })
                    const {calibmsg, msgid, ...userinfo} = data
                setLocalStorage('tw', userinfo)
                }).catch(e => {
                    ElMessage.error(e)
                })
        }

        const handleClickTab = (tab: string, event: Event) => {
            console.log(tab, event)
        }

        // 获取排行榜数据
        const getRankData = () => {
            http(apiHost,'calib_rank').then(res => {
                console.log(res, 'rankres')
                rankData.value = res
                console.log(rankData.value, 'rankData')
            })
        }

        return {
            form,
            submitForm,
            // submitFormTitle,
            submitFormWithStatus,
            data,
            rules,
            getNextMsg,
            formRef,
            changeLog, 
            formatGMT, 
            handleClickTab,
            rankData,
            activeName
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
    text-align: left;
    font-size: 20px;
    margin-bottom: 20px;
    margin-left: 100px;
}

.btns{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.el-timeline{
    min-height: 500px;
}

.logTitle {
    margin-bottom: 10px;
}

.calibmsg-title {
    margin-bottom: 10px;
    font-size: 16px;
}

.el-tabs__nav-scroll{
    display: flex;
    justify-content: center;
}

.el-tabs__nav-wrap::after{
    height: 1px !important;
}

.el-form-item__label-wrap, .el-form-item .el-form-item--default {
    text-align: justify !important;
}

.el-table{
    margin: 0 auto;
}

</style>