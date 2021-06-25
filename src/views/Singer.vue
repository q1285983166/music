<template>
    <div class="Singer">
        <div class="topnav">
            <p>热门歌手</p>
            <ul>
                <router-link tag="li" :to="`/singersong/${s.id}`" @click="singera" v-for="s in Singerlist" :key="s.id">
                    <img :src="s.img1v1Url" alt="">
                    <loading v-if="load"></loading>
                    <div class="namev">
                        {{s.name}}
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import Loading from '../components/Loading';
export default {
    data(){
        return{
            Singerlist:[],
            load:true,
            ifshow:false,
            singer:'/singer'
        }
    },
    components:{
        Loading
    },
    created(){
        this.$axios.get('artist/list?cat=1002').then(d=>{
        this.Singerlist=d.data.artists
        this.load=false
        });
    },
    filters:{
        num(value){
            if(value < 10){
                return '0'+value
            }else{
                return value
            }
        }
    },
    methods:{
        singera(){
            this.ifshow=!this.ifshow,
            console.log(this.s.id);
        }
    }
}
</script>

<style lang="less" scoped>
.Singer{
    .topnav{
        margin: .6rem .4rem;
        border: .1px solid #fff;
        &>p{
            font-size: 1.5rem;
            margin: 1rem .5rem;
        }
        ul{
            li{
                width: 100%;
                height: 3rem;
                margin: .6rem 0;
                background-color: rgb(255, 255, 255);
                display: flex;
                align-items: center;
                img{
                    width: 2rem;
                    border-radius: 5rem;
                }
                .namev{
                    font-size: 1rem;
                    line-height: 3rem;
                    color: rgb(169, 169, 169);
                    margin-left: 1rem;
                }
            }
        }
    }
}
</style>