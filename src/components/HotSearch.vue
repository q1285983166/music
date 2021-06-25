<template>
    <div class="HotSearch">
        <div class="ls" v-show="keya.length>0">
            <p>历史记录</p>
                <ul class="keyword">
                <li  v-for="(h,index) in keya" :key="index" @click="$emit('son',h)">
                    {{h}}
                    <img @click.stop="$emit('keyc',h)" src="../assets/img/删除关闭.png" alt="">
                </li>
            </ul>
            <div class="qk" @click="$emit('keyb')">清空</div> 
        </div>
        <p>
            热门搜索
        </p>
        <ul class="keyword">
            <li v-for="(h,index) in hots" :key="index" @click="$emit('son',h.first)">
               <div @click="keya.push(h.first)">{{h.first}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:['keya'],
    data(){
        return{
            hots:[],
        }
    },
     // 获取热门搜索数据
    created(){
        this.$axios.get('/search/hot').then(d=>{
            this.hots=d.data.result.hots
        });
    },
    watch:{
        keywords(e){
            console.log(e);
            console.log(this.keywords);
            this.key.push(e)
            this.key.push(this.keywords)
            console.log(this.key);
        }
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>
.HotSearch{
    background-color: rgb(250,250,250);
    height: 100vh;
    .ls{
        position: relative;
        .qk{
            position: absolute;
            top: 0;
            right: 0;
            color: rgb(164, 164, 164);
            font-size: .8rem;
            margin: .5rem .6rem;
        }
    }
    p{
        font-size: .8rem;
        font-weight: bold;
        padding:  .6rem;
    }
    .keyword{
        padding: 0 .8rem;
        display: flex;
        flex-wrap: wrap;
        li{
            font-size: .8rem;
            padding: .2rem .4rem;
            margin-bottom: .5rem;
            margin-right: .3rem;
            background-color: white;
            color: rgb(86, 86, 86);
            border-radius: 30px;
            position: relative;
            img{
                position: absolute;
                width: .5rem;
                height: .5rem;
                top: 0;
                right: 0;
            }
        }
    }
}
</style>