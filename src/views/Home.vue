<template>
    <div class="container">
        <!-- 标题部分 -->
        <h2 class="title">　欢迎加入 鱼香ROS　翻译组织　</h2>
        <el-row></el-row>
        <!-- 表单部分 -->
        <el-form ref="formRef" :model="form" label-width="auto">
            <el-row justify="center" align="center">
                <el-col :span="12">
                    <el-form-item label="昵称">
                        <el-input v-model="form.name" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="主页">
                        <el-input v-model="form.url"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="原文内容：">
                <el-input v-model="form.originText" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="上一版本翻译内容：">
                <el-input v-model="form.latestText" type="textarea" autosize></el-input>
            </el-form-item>
            <el-form-item label="新的翻译内容：">
                <el-input v-model="form.inputText" type="textarea" autosize></el-input>
            </el-form-item>
            <el-form-item>
                <el-row justify="center">
                    <el-col :span="12">
                        <el-button type="primary" @click="submitForm">提交</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button type="primary">下一条</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from 'vue'; 
import { http } from '../utils/http';
export default defineComponent({
    name: 'Home',
    setup() {
        let url = "", query = '', data = undefined
        const form = reactive({
            name: '',
            url: '',
            originText: '',
            latestText: '',
            inputText: ''
        })
        onBeforeMount(async() => {
            url = window.location.href
            query = url?.split('?')[1]?.split('=')[1]

            await http('get_msg', {data: { "msgid": query }, method: 'post'}).then(res => {
                console.log(res, 'rrrrrrrr')
                form.originText = res[0].msgen
                form.latestText = res[0].msgzh
                form.inputText = res[0].msgzh
            }        
            )
        })
        
        const submitForm = () => {
            console.log('aaaaaaaaaaaaaaaaaa', form)
        }

        return {
            form,
            submitForm,
            data
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