<template>
    <div class="container">
        <!-- 标题部分 -->
        <h2>　欢迎加入 鱼香ROS　翻译组织　</h2>
        <el-row></el-row>
        <!-- 表单部分 -->
        <el-form ref="formRef" :model="form" label-width="120px">
            <el-row justify="center" align="center">
                <el-col :span="12">
                    <el-form-item label="昵称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="主页">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="原文内容：">
                <el-input v-model="form.originText" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="上一版本翻译内容：">
                <el-input v-model="form.latestText" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="新的翻译内容：">
                <el-input v-model="form.inputText" type="textarea"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'; 

export default defineComponent({
    name: 'Home',
    setup() {
        const form = reactive({
            name: '',
            url: '',
            originText: '',
            latestText: '',
            inputText: ''
        })
        return {
            form
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

</style>