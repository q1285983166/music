<template>
    <div class="FullPlay" @click.stop="ifcomment=false">
    <div class="loadaa" v-show="ifcomment&&hotComments==''">评论加载中</div>
    <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
        <div v-show="ifshow" class="filter" :style="[{background:(ifshow==!false?`rgba(65, 65, 65,1) url(${playsong.al.picUrl}) no-repeat 0 0/100% 100%`:'')}]"></div>
    </transition>
        <div class="exitButton" @click.stop="$emit('exit')">
            <img src="../assets/img/下箭头.png" alt="">
        </div>
        <div class="songname">{{playsong.name}}</div>
        <div class="commentbtn" @click.stop="ifcomment=true">
            <img src="../assets/img/评论.png" alt="">
        </div>
        <!-- 歌曲评论 -->
        <div class="comment_box">
            <transition enter-active-class="animate__animated animate__slideInUp" leave-active-class="animate__animated animate__slideOutDown">
                <div class="comment" v-if="ifcomment&&hotComments!=''">
                <p>歌曲评论</p>
                    <comm-ent v-for="i in hotComments
                    " :key="i.id" :i='i'></comm-ent>
                </div>
            </transition>
        </div>
        <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
            <!-- 歌词 -->
            <div class="lyric" v-show="ifshow" @click="ifshow=false">
                <div :style="{transform:`translateY(-${lyricIndex*46}px)`,transition:`all 0.5s`}">
                    <p :class="{red:index==lyricIndex}" v-for="(i,index) in lyricArray" :key="index">
                        {{i.lyric}}
                    </p>
                </div>
            </div>
        </transition>
        <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
             <!-- 歌曲封面 -->
            <div class="picUrl" v-show="!ifshow" @click="ifshow=true">
                <img :src="playsong.al.picUrl" alt="">
            </div>
        </transition>
        <!-- 进度条 -->
        <div class="playrange">
            <input type="range" max="100" 
            :value="(currentTime/duration*100)" 
            @change="changeTime"/>
            <div>
                <span>{{currentTime|formatTime}}</span>
                <span>{{duration|formatTime}}</span>
            </div>
        </div>
        <!-- 底部功能键 -->
        <div class="btn">
            <div>
                <img @click="order" v-show="iforder==1" src="../assets/img/顺序播放.png" alt="">
                <img @click="random" v-show="iforder==2" src="../assets/img/随机播放.png" alt="">
            </div>
            <div @click="prev"><img src="../assets/img/上一首.png" alt=""></div>
            <div @click="ifplay=!ifplay">
                <img @click="$emit('playstopb')" v-show="playstate" src="../assets/img/全屏播放.png" alt="">
                <img @click="$emit('playstopb')" v-show="!playstate" src="../assets/img/全屏暂停.png" alt="">
            </div>
            <div @click="next"><img src="../assets/img/下一首.png" alt=""></div>
            <div @click="showList=!showList"><img src="../assets/img/歌单.png" alt=""></div>
            <!-- 歌单列表 -->
             <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
                <ul class="playList" v-show="showList" @click.stop="showList=!showList">
                    <li>
                        <p v-show="iforder==1">顺序播放</p>
                        <p v-show="iforder==2">随机播放</p>
                        <div v-for="song in playList" 
                            :key="song.id"
                            :class="{active:playsong.id==song.id}"
                            @click.stop="$emit('changePlayMusic',song)">{{song.name}} - <span v-for="s in song.ar" :key="s.id">{{s.name}} </span>
                        </div>
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>
<script>
import CommEnt from '../components/CommEnt';
export default {
    components:{
        CommEnt
    },
    name:"FullPage",
    props:['playsong','currentTime','duration','playstate','lyric',"playList",],
    data(){
        return{
            ifshow:true,
            iforder:1,
            ifplay:true,
            // 歌单
            showList:false,
            randomList:[],
            ifcomment:false,
            hotComments:[]
        }
    },
    methods:{
        // 点击顺序播放
        order(){
            this.iforder=2
            this.$emit('iforder',2)
        },
        // 点击随机播放
        random(){
            this.iforder=1
            this.$emit('iforder',1)
        },
        changeTime(e){
            let val=e.target.value
            this.$emit('changetime',val);
        },
        next(){
            let i=0;
            this.playList.map((d,index)=>{
                if(d.id==this.playsong.id){
                    i=index;
                }
            });
            if(i==this.playList.length-1){
                i=-1
            }
            if(this.iforder==1){
                i++;
            }else if(this.iforder==2){
                i = Math.floor(Math.random()*this.playList.length);
            }
            let pmusic=this.playList[i];
            this.$emit('changePlayMusic',pmusic);
        },
        prev(){
            let i=0;
            this.playList.map((d,index)=>{
                if(d.id==this.playsong.id){
                        i=index;
                }
            });
            if(i==0){
                i=this.playList.length
            }
            if(this.iforder==1){
                i--;
            }else if(this.iforder==2){
                i = Math.floor(Math.random()*this.playList.length);
            }
            let pmusic=this.playList[i];
            this.$emit('changePlayMusic',pmusic);
        }
    },
    // 获取歌词数据
    watch:{
        playsong(){
            this.$axios.get('/comment/music?id='+this.playsong.id).then(d=>{
                this.hotComments=d.data.hotComments
            });
        }
      
    },
    computed:{
        // 获取歌词
        lyricArray() {
            let lyric=this.lyric;
            if(!lyric) return [];//如果没有歌词返回空
            let arr=lyric.split('\n');
            arr.pop();
            let reg=/\[(\d+):(\d+\.\d+)\](.*)/;
            let lyricArr=arr.map(d=>{
                if(reg.test(d)){
                    let lyricObj={
                        time:parseInt(RegExp.$1)*60+parseFloat(RegExp.$2),
                        lyric:RegExp.$3
                    }
                    return lyricObj;
                }
            });
            return lyricArr;
        },
        // 歌词高亮
        lyricIndex(){
            //当前播放时间
            let ctime=this.currentTime;
            //歌词计算属性数组
            let lyric=this.lyricArray;
            let index=0;
            
            for(let i=0;i<lyric.length;i++){
                //最后一条歌词
                if(i>=lyric.length-1){
                    index=i;
                    break;
                }
                if(lyric[i].time>=ctime && ctime<lyric[i+1].time){
                    index=i;
                    break;
                }
            }
            return index-1;
        }
    },
    // 进度条时间过滤器
    filters:{
        formatTime(val){
            let minutes=parseInt(val/60);
                minutes=minutes<10?"0"+minutes:minutes;
            let sec=parseInt(val)-parseInt( minutes * 60);
                sec=sec<10?"0"+sec:sec;
            return minutes+":"+sec
        }
    }
}
</script>
<style lang="less" scoped>

.red{
   color: rgb(19, 136, 91);
    font-weight: bold;
}
.FullPlay{
    position: fixed;
    background-color: rgb(116, 116, 116);
    z-index:9999;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    .loadaa{
        z-index: 10000;
        text-align: center;
        position: absolute;
        width: 6rem;
        top: 50%;
        left: 50%;
        margin-left: -3.2rem;
        padding: .6rem .4rem;
        background-color: rgba(156, 156, 156, 0.3)
    }
    .comment_box{
        overflow: hidden;
        width: 100%;
            p{
                padding: 1rem;
                color: rgb(93, 93, 93);
            }
            .comment{
                overflow-x: hidden;
                height: 50%;
                overflow-y: auto;
                position: absolute;
                z-index: 99999;
                bottom: 0;
                background-color: rgb(213, 213, 213);
            }
    }
    
    .filter{
        width: 100%;
        height: 100%;
        filter: blur(50px);
    }
    .exitButton{
        position: fixed;
        top: 1rem;
        left: 1rem;
        width: 1.5rem;
        height: 1.5rem;
        z-index: 99;
        border-radius: 50%;
        img{position: absolute;
        top: 5%;
            width: 100%;
            height: 100%;
        }
    }
    .commentbtn{
        position: fixed;
        top: 1rem;
        right: 1rem;
        width: 1.5rem;
        height: 1.5rem;
        z-index: 99;
        border-radius: 50%;
        img{position: absolute;
        top: 5%;
            width: 100%;
            height: 100%;
        }
    }
    .songname{
        color: white;
        font-weight: 900;
        font-size: 1rem;
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }
    .lyric{
        width: 100%;
        height: 10rem;
        overflow: hidden;
        text-align: center;
        font-size: 20px;
        position: absolute;
        top: 50%;
        margin-top: -5rem;
        div{
            margin-top: 5rem;
            p{
                margin-bottom: 20px;
                // color: rgb(65, 65, 65);
                .red{
                    color: rgb(0, 198, 122);
                }
            }
        }
    }
    .picUrl{
        width: 100%;
        height: 10rem;
        position: absolute;
        top: 50%;
        margin-top: -5rem;
        img{
            border-radius: 1rem;
            display: block;
            height: 100%;
            margin: 0 auto;
        }
    }
    .playrange{
        width: 90%;
        position: absolute;
        top: 80%;
        left: 50%;
        margin-left: -45%;
        font-size: .6rem;
        color: rgb(152, 152, 152);
        input{
            width: 100%;
        }
        input[type="range"] {
        margin-top: 8px;
        outline: none;
        -webkit-appearance: none; /*清除系统默认样式*/
        background: -webkit-linear-gradient(#f12391, #23f161) no-repeat, rgb(155, 23, 23);
        background-size: 100%; /*设置左右宽度比例*/
        height: 3px; /*横条的高度*/
      }
      /*拖动块的样式*/
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; /*清除系统默认样式*/
        height: 16px; /*拖动块高度*/
        width: 16px; /*拖动块宽度*/
        background: #fff; /*拖动块背景*/
        border-radius: 50%; /*外观设置为圆形*/
        border: solid 1px #1cb963; /*设置边框*/
      }
        div{
            display: flex;
            justify-content: space-between;
        }
    }
    .btn{
        width: 100%;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        position: absolute;
        bottom: 0;
        z-index: 99;
        div{
            img{
                width: 1.5rem;
                height: 1.5rem;
            }
            &:nth-child(3){
                img{
                    width: 2rem;
                    height: 2rem;
                }
            }
        }
        .playList{
            position: fixed;
            width: 100%;
            height: 100%;
            bottom:0;
            background-color: rgba(67, 67, 67, 0.3);
            z-index:999;
            li{
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 60%;
                z-index:9999;
                overflow-x: auto;
                background-color: rgb(113, 113, 113);
                padding-bottom: 1rem;
                div{
                    padding-top: 1rem;
                    padding-left: 1.5rem;
                    font-size: .5rem;
                    font-weight: bold;
                    color:rgb(194, 194, 194);
                    &.active{
                        color:rgb(35, 199, 172);
                    }
                }
                p{
                    padding-top: .8rem;
                    padding-left: 1.2rem;
                    color: rgb(194, 194, 194);
                }
            }
        }
    }
}
</style>