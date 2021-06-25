<template>
        <!-- 返回箭头 -->
        <div @click="returnA" class="img_return"><img src="../assets/img/左箭头.png" alt=""></div>
</template>
<script>
export default {
    props:{
        recommend:String
    },
    // 事件函数
    methods:{
        returnA(){
            this.$router.replace(this.recommend)
        }
    },
}
</script>
<style lang="less" scoped>
    .img_return{
        position: fixed;
        top: 1rem;
        left: 1rem;
        overflow: hidden;
        border-radius: 50%;
        width: 1.5rem;
        display: flex;
        z-index: 3333;
        img{
            width: 100%;
            background-color: rgba(50, 50, 50, 0.4);
        }
    }
</style>