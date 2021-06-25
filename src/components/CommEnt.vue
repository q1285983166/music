<template>
        <li>
            <loading v-if="i.length<=0"></loading>
            <div class="comments_img">
                <img :src="i.user.avatarUrl" alt="">
            </div>
            <div class="comments_img_text">
                <p>{{i.user.nickname}}</p>
                <p>{{i.time|time}}</p>
                <p>{{i.content}}</p>
            </div>
            <div class="likedCount">
                <span>{{i.likedCount}}</span><img src="../assets/img/点赞.png" alt="">
            </div>
        </li>
</template>
<script>
import Loading from '../components/Loading';
export default {
    components:{
        Loading
    },
    props:['i'],
     //过滤器(评论时间)
    filters:{
        time(value){
            // 判断是否小于一个小时
            if((Date.parse(new Date())-value)/1000/60 < 60){
                return Math.floor((Date.parse(new Date())-value)/1000/60)+'分前'
            }else{
                // return new Date(value).toLocaleTimeString()
                return new Date(value).getHours()+':'+ (new Date(value).getMinutes()>10?new Date(value).getMinutes():'0'+new Date(value).getMinutes())
            }
            
        }
    },
}
</script>
<style lang="less" scoped>
li{
        display: flex;
        padding: .5rem;
        position: relative;
        border-bottom: .1px solid rgb(210, 210, 210,.5);
            .comments_img{
                width: 1.4rem;
                height: 1.4rem;
                border-radius:50%;
                overflow:hidden;
                margin-right: .5rem;
                img{
                    width: 100%;
                }
            }
            .comments_img_text{
                width: 80%;
                font-size: .5rem;
                p{
                    &:nth-child(2){
                        color: rgb(140, 140, 140);
                    }
                    &:nth-child(3){
                        font-size: .5rem;
                        padding: .3rem 0 .4rem ;
                    }
                }
            }
            .likedCount{
                display: flex;
                align-items: center;
                position: absolute;
                line-height: 1rem;
                right: 1rem;
                top: .5rem;
                img{
                    width: .8rem;
                }
                span{
                    font-size: .5rem;
                    margin-right: .2rem;
                    color: rgb(162, 162, 162);
                }
            }
        }
</style>