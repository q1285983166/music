<template>
    <li>
        <loading v-if="i.length<=0"></loading>
        <div class="slot">
            <slot name="sortnum"></slot>
        </div>
        <div>
            <div v-html="$options.filters.highLight(i.name,keywords)" class="i_name"></div>
            <div class="i_al_name">
                <span 
                    v-for="(a,index) in i.ar" 
                    :key="index" 
                    v-html="$options.filters.highLight(a.name,keywords)">
                </span>
                - {{i.al.name}} 
            </div>
        </div>
        <div @click.stop="$emit('play',i)">
            <img src="../assets/img/播放.png" alt="">
            <loading class="load" v-show="playsong&&i.id == playsong.id"></Loading>
        </div>
    </li>
</template>

<script>
import Loading from '../components/Loading';
export default {
    props:{
        i:Object,
        keywords:{
            type:String,
            default:''
        },
        playsong:{
            type:null,String
        }
    },
    data(){
        return{
            truea:true
        }
    },
    created(){
        // console.log(this.i);
    },
    methods:{
    },
    filters:{
        highLight(value,k){
            //把 关键词 替换成 <span style="color::red">关键词</span>
            return value.replace(k,'<span style="color:red;">'+k+'</span>')
        }
    },
    components:{
        Loading
    }
}
</script>

<style lang="less" scoped>
.over{
    width: 10rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
    font-weight: 100;
}
li{
    position: relative;
    padding: .4rem;
    height: 2rem;
    display: flex;
    .slot{
        padding-right: .5rem;
        font-size: .9rem;
        color: rgb(144, 144, 144);
    }
    &:first-child,&:nth-child(2),&:nth-child(3){
        div{
            &:first-child{
                p{
                    color:#df3436;
                }
            }
        }
    }
    .i_img{
    display: inline-block;
    width: 12px;
    height: 8px;
        background: url(../assets/img/index_icon_2x.png) no-repeat;
        background-size: 166px 97px
    }
    .i_name{
        font-size: .8rem;
        .over
    }
    .i_al_name{
        font-size: .4rem;
        .over
    }
    img,.load{
        width: .8rem;
        height: .8rem;
        position: absolute;
        top: 50%;
        margin-top: -.4rem;
        right: 1rem;
    }
}
</style>