<template>
<div :class="['PlaySong',{parse:playstate}]" >
    <audio  
        ref="audio" 
        @timeupdate='timeupdate' 
        autoplay
        @ended='end'
        v-if="!$route.meta.hideNavMv&&playsong" 
        :src="`https://music.163.com/song/media/outer/url?id=${playsong.id}.mp3`"
    ></audio>
    <transition enter-active-class="animate__animated animate__slideInUp" leave-active-class="animate__animated animate__slideOutDown">
        <div class="playbox" v-if="playsong" v-show="!$route.meta.hideNavMv">
            <!-- 封面 -->
            <div>
                <img :src="`${playsong.al.picUrl}`" alt="">
            </div>
            <!-- 歌名-歌手 -->
            <div  @click="isFulla">
                <p class="iname">{{playsong.name}}</p>
                <p class="arname"><span v-for="(p,i) in playsong.ar" :key="i">{{p.name}} </span></p>
            </div>
            <!-- 播放暂停键 -->
            <div class="playstop" @click.stop="playstopb">
                <img :src="playstopa" alt="">
                <canvas class="canvas" width="50" height="50" ref="playround"></canvas>
            </div>
        </div>
    </transition>
     <transition enter-active-class="animate__animated animate__backInUp" leave-active-class="animate__animated animate__backOutDown">
        <full-play
            ref='fullplay'
            v-if="playsong"
            v-show="isFull"
            @playstopb='playstopb'
            @exit='isFull=false'
            @changetime="changeTime"
            @changePlayMusic="$emit('changePlayMusic',$event)"
            @iforder='iforder'
            :lyric='lyric'
            :playsong='playsong'
            :playList="playList"
            :duration='duration'
            :playstate='playstate'
            :noplay='noplay'
            :currentTime='currentTime'>
        </full-play>
     </transition>
</div>
</template>

<script>
import imgstop from '../assets/img/play暂停.png';
import imgplay from '../assets/img/play播放.png';
import FullPlay from '../components/FullPlay';
export default {
    props:['playsong','playList'],
    data(){
        return{
            duration:0,
            currentTime:0,
            playstate:false,
            playstopa:imgstop,
            isFull:false,
            lyric:null,
            PlayMode:1
        }
    },
    created(){
    },
    watch:{
        playsong(newMusic){
            this.playstopa=imgstop
            this.playstate=false
            //侦听playMusic当前播放的音乐.获取歌词
            this.axios.get('/lyric',{
                params:{
                    id:newMusic.id
                }
            }).then(d=>{
                if(d.data&&d.data.lrc&&d.data.lrc.lyric){
                    this.lyric=d.data.lrc.lyric;
                }
            });
        },
        
    },
    components:{
        FullPlay
    },
    methods:{
        noplay(){
            if(this.noplay==false){
                this.$refs.audio.pause()
            }
        },
        iforder(e){
            this.PlayMode=e
        },
        end(){
            this.$refs.fullplay.next()
        },
        isFulla(){
            this.isFull=true
        },
         //改变播放的时间
        changeTime(val){
            let t=val/100 * this.duration;//得到播放时间
            console.log(t);
            this.$refs.audio.currentTime=t;//改变播放时间
        },
        // 播放暂停
        playstopb(){
            if(this.playstate==true){
                this.$refs.audio.play()
                this.playstate=false
                this.playstopa=imgstop
            }else if(this.playstate==false&&this.$refs.audio!='undefined'){
                this.$refs.audio.pause()
                this.playstate=true
                this.playstopa=imgplay
            }
        },
        // 画布
        timeupdate(event){
            this.duration=event.target.duration
            this.currentTime=event.target.currentTime
            this.drawCircle(this.duration,this.currentTime)
        },
        // 画布 部分时间
        drawCircle(total,current){
            let canvas=this.$refs.playround;
            let cxt=canvas.getContext('2d');
                cxt.clearRect(0,0,50,50);

                cxt.beginPath();
                cxt.strokeStyle="#2cbe90";
                cxt.lineWidth=4;
                cxt.arc(25,25,20,0,Math.PI*2);
                cxt.stroke();
                cxt.closePath();

                cxt.beginPath();
                cxt.strokeStyle="#c1c1c1";
                cxt.lineWidth=4;
                cxt.arc(25,25,20,Math.PI*-0.5,((2*(current/total))-0.5)*Math.PI,true);
                cxt.stroke();
                cxt.closePath();
        }
    },
}
</script>

<style lang="less" scoped>
.PlaySong{
    .playbox{
        width: 100%;
        height: 3rem;
        background-color: rgb(232, 232, 232);
        // background-color: #c1c1c1;
        color: #dcdcdcbe;
        position: fixed;
        bottom: 0;
        z-index:99;
        display: flex;
        align-items: center;
        div{
                margin: 0 .5rem;
            &:first-child{
                width: 2rem;
                height: 2rem;
                background-color: rgb(35, 96, 76);
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    animation: round 6s 0s linear infinite;
                }
            }
            &:nth-child(2){
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: normal;
                p{
                    &:first-child{
                        font-size: .8rem;
                        color: #333;
                    }
                    &:last-child{
                        font-size: .4rem;
                        color: rgb(176, 176, 176);
                    }
                }
            }
            &:last-child{
                width: 2rem;
                height: 2rem;
                position: relative;
                .canvas{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                img{
                    width: 1rem;
                    height: 1rem;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-top: -0.5rem;
                    margin-left: -0.5rem;
                }
            }
        }
    }
}
.parse{
    .playbox{
        div{
            &:first-child{
                img{
                    animation-play-state: paused;
                }
            }
        }
    }
}
@keyframes round {
    form{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}

</style>