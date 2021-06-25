<template>
    <router-link tag="li" :to="`/songMv/${res.id}`" class="box_x">
        <div class="box_imgtext">
            <div class="box_picUrl">
                <img :src="res.picUrl" alt="">
                <div class="playCount">{{res.playCount|num}}</div>
            </div>
            <div class="box_name">
                <p>{{res.name}}</p>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props:['res'],
    data(){
        return{
        }
    },
    filters:{
        num(value){
            return (parseInt(value)/10000).toFixed(1)+'万'
        }
    }
}
</script>
<style lang="less" scoped>
    .box_x{
        vertical-align: top;
        display: inline-block;
        font-size: .12rem;
        margin-left: 15px;
        .box_imgtext{
             width:  10rem;
                .box_picUrl{
                    position: relative;
                    border-radius: 10px;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    .playCount{
                        position: absolute;
                        bottom: .3rem;
                        right: .2rem;
                        color: white;
                        font-size: .2rem;
                        padding: .1rem .3rem;
                        border-radius: 25px;
                        background-color: rgba(108, 108, 108, 0.3);
                    }
                }
                .box_name{
                        p{
                            color: rgb(98, 98, 98);
                            font-size: .5rem;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            white-space: normal;
                            word-wrap: break-word;
                            word-break: normal;
                        }
                }
        }
    }
</style>