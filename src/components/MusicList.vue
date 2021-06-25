<template>
    <router-link tag="div" :to="`/rankinglist/${d.id}`" class="box" @click="a">
        <div class="left">
            <p>{{d.name}}</p>
            <p v-for="i in 3" :key="i">{{i}}.<span>{{d.tracks[i-1].first}}-{{d.tracks[i-1].second}}</span></p>
        </div>
        <div class="right">
            <img :src="d.coverImgUrl" alt="">
            <p>{{d.updateFrequency}}</p>
        </div>
    </router-link>
</template>
<script>
export default {
    props:[
        'd'
    ],
    data(){
        return{
            ifshow:false
        }
    },
    created(){
    },
    methods:{
        a(){
            console.log(this.d);
            this.ifshow=true
        }
    },
    components:{
    }
}
</script>

<style lang="less" scoped>
.box{
    width: 90%;    
    height: 6rem;
    background-color: rgb(255, 255, 255);
    margin: 0 auto;
    margin-top: 1rem;
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    .left{
        width: 12rem;
        margin-left: .8rem;
        font-weight: 900;
        width: 66%;
        p{
            font-size: .8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: normal;
            &:first-child{
                font-size: 1rem;
            }
            span{
                font-weight: 100;
            }
        }
    }
    .right{
        width: 6rem;
        position: absolute;
        right: 0;
        top: 0;
        img{
            width: 100%;
        }
        p{
            position: absolute;
            font-size: .2rem;
            padding: .1rem  .4rem;
            background-color: rgba(212, 212, 212, 0.5);
            color: rgb(255, 255, 255);
            top: .4rem;
            left: 0;
            border-radius: 0 .4rem .4rem 0;
       
        }
    }
}
</style>