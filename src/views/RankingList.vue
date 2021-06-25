<template>
    <div class="RankingList">
        <return-img :recommend='recommend'></return-img>
        <div class="topimg">
            <img :src="playlist.coverImgUrl" alt="">
        </div>
        <div class="pname">{{playlist.name}}</div>
        <div class="time">
            更新时间: {{playlist.trackUpdateTime|formatDate('m 月 d 日')}}
        </div>
        <div class="btn" @click="all">
            <img src="../assets/img/播放全部.png" alt="">
        </div>
         <!-- 歌曲列表 -->
        <ul>
            <!-- 歌曲列表公共组件 -->
            <song-list :playsong='playsong' @play="$emit('play',$event)" v-for="(i,index) in listInfo" :i='i' :key="i.id">
                 <template v-slot:sortnum>
                    <p class="p_index">{{((index+1) &lt; 10) ? '0'+(index+1):index+1}}</p>
                </template>
            </song-list>
        </ul>
        <loading v-if="isLoading"/>
        <div class="end">— — — — 到底了 — — — —</div>
    </div>
</template>
<script>
import ReturnImg from '../components/ReturnImg';
import Loading from '../components/Loading';
import SongList from '../components/SongList';
export default {
    props:['rname','playsong'],
    data(){
        return{
            recommend:'/top',
            playlist:{},
            listInfo:[],
            isLoading:true,
            page:0,//记录页码
            perpage:20,//每页显示20条
            hotList:[],
            i:true
        }
    },
    created(){
        // 歌单歌曲数据
        this.$axios.get('/playlist/detail?id='+this.rname).then(d=>{
            this.playlist=d.data.playlist;
            this.hotList=d.data.playlist.tracks;
            this.isLoading=false;
            this.listInfo=this.hotList.slice(0,20);
        });
        window.addEventListener('scroll',this.onScroll);
    },
    components:{
        ReturnImg,SongList,Loading
    },
    filters:{
        formatDate(value,fstr){
            let d=new Date(value);
            let formatO={
                'Y+':d.getFullYear(),
                'm+':d.getMonth()+1,
                'd+':d.getDate(),
                'h+':d.getHours(),
                'M+':d.getMinutes(),
                'S+':d.getSeconds
            }
            for(let k in formatO){
                let reg=new RegExp(k);
                let val=formatO[k];
                val=val<10?'0'+val:val;
                fstr=fstr.replace(reg,val);
            }
            return fstr;
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            window.addEventListener('scroll',vm.onScroll);
        })
    },
    beforeRouteLeave(to,from,next){
        window.removeEventListener('scroll',this.onScroll);
        next();
    },
    methods:{
        all(){
            this.$emit('allplay',this.hotList)
        },
        loadeMore(){
            this.isLoading=true;
            this.page++; 
            let start=(this.page)*this.perpage;
            let end=(this.page+1)*this.perpage;
            this.listInfo=this.listInfo.concat(this.hotList.slice(start,end));
            this.isLoading=false;
        },
        onScroll(){
            let h=document.documentElement.scrollHeight||document.body.scrollHeight;
            let top=document.documentElement.scrollTop||document.body.scrollTop;
            let ch=document.documentElement.clientHeight||document.body.clientHeight;
            if(h-top-ch<40){
                this.loadeMore();
            }
        },
    },
}
</script>
<style lang="less" scoped>
.RankingList{
    margin-top: -6rem;
    border: .1px solid rgb(255, 255, 255);
    .topimg{
        width: 10rem;
        margin: 1rem auto;
        img{
            box-shadow: 0 7px 13px rgba(82, 82, 82, 0.4);
            display: block;
            border-radius: 1rem;
            width: 100%;
        }
    }
    .pname,.time{
        font-size: 1.2rem;
        font-weight: 600;
        text-align: center;
        margin-bottom: 1rem;
        color: #333;
    }
    .time{
        font-size: .8rem;
        font-weight: 400;
        color: rgb(139, 139, 139);
    }
    .btn{
        width: 10rem;
        height: 2rem;
        border-radius: 5rem;
        box-shadow: 0 .3rem .8rem rgb(24,213,156,30%);
        background-color: #22d59c;
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: .8rem;
        img{
            width: 1.2rem;
            height: 1.2rem;
        }
    }
    .end{
        text-align: center;
        margin-top: 1rem;
        font-size: .6rem;
        color: rgb(154, 154, 154);
    }
    
}
</style>