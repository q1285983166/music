<template>
    <div class="Mv">
        <!-- 返回键 -->
        <return-img :recommend='recommend'></return-img>
        <!-- 视频 -->
        <div class="videomv">
            <video width="100%" height='100%' controls autoplay :src="mvurl"></video>
        </div>
        <!-- 顶部 -->
        <div class="top">
            <div class="name">《{{datas.name}}》- {{datas.artistName}}</div>
            <div class="CountTime">
                <div class="count">{{datas.playCount}}次播放</div>
                <div class="time">{{datas.publishTime}}</div>
            </div>
            <div class="CountTime">
                <p>简介：{{datas.desc}}</p>
            </div>
        </div>
        <txet-tag>相似MV</txet-tag>
         <loading v-if="resultmv.length<=0" ></loading>
        <div class="box">
          <div class="box2">
            <ul class="box3" @click="rel">
              <song-mv v-for="res in resultmv" :key="res.id" :res="res" ></song-mv>
            </ul>
          </div>
        </div>
        <txet-tag>评论</txet-tag>
         <loading v-if="content.length<=0"></loading>
        <ul>
            <comm-ent v-for="i in content" :key="i.id" :i='i'></comm-ent>
        </ul>
    </div>
</template>

<script>
import ReturnImg from '../components/ReturnImg';
import TxetTag from '../components/TxetTag';
import SongMv from '../components/SongMv';
import CommEnt from '../components/CommEnt';
import Loading from '../components/Loading';
export default {
    inject:['reload'],  //注入依赖
    props:['sname','playsong'],
    components:{
        ReturnImg,TxetTag,SongMv,CommEnt,Loading
    },
    methods:{
        rel(){
            console.log('1');
            this.reload();
            // this.$router.go(0)
        }
    },
    beforeRouteLeave(to,from,next){
            this.$emit('playy')
        next()
    },
    data(){
        return{
            recommend:'/recommend',
            mvurl:null,
            datas:{},
            resultmv:[],
            content:[]
        }
    },
    created(){
        // 歌单歌曲数据
        this.$axios.get('/mv/detail?mvid='+this.sname).then(d=>{
            this.datas=d.data.data
        });
        this.$axios.get('/mv/url?id='+this.sname).then(a=>{
            this.mvurl=a.data.data.url
        });
        // 相似MV
        this.$axios.get('/simi/mv?mvid='+this.sname).then(c=>{
            // console.log(c);
            // this.resultmv=c.data.mvs
            this.resultmv = c.data.mvs.map((item) => {
              item.picUrl = item.cover
              return item
            });
        });
        // MV评论 /comment/mv?id=5436712
        this.$axios.get('/comment/mv?id='+this.sname).then(e=>{
            this.content=e.data.comments
            // this.resultmv=c.data.mvs
            // this.resultmv = c.data.mvs.map((item) => {
            //   item.picUrl = item.cover
            //   return item
            // });
        });
    },
}
</script>
<style lang="less" scoped>
.Mv{
    margin-top: -6rem;
    .videomv{
        height: 11.81rem;
        text-align: center;
        background-color: rgb(0, 0, 0);
    }
    .top{
        margin: .5rem .6rem;
            overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
        .name{
            font-size: .6rem;
            font-weight: 600;
            margin-bottom: .2rem;
        }
        .CountTime{
            font-size: .3rem;
            font-weight: 400;
            color: rgb(176, 176, 176);
            display: flex;
            .count{
               margin-right: .5rem;
            }
            p{
                margin-top: .5rem;
                font-size: .5rem;
                color: rgb(91, 91, 91);
            }
        }
    }
    .box{
        overflow: hidden;
            .box2{
            overflow-x: auto;
            overflow-y: hidden;
            .box3{
                white-space: nowrap;
            }
        }
    }
}
</style>