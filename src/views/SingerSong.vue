<template>
    <div class="singersong">
        <div class="top">
            <return-img :recommend='recommend'></return-img>
            <p>{{singerartist.name}}</p>
        </div>
        <div class="img">
            <img :src="singerartist.picUrl" alt="">
        </div>
        <div class="song">
            <div class="dq">单曲({{hotSongs.length}})</div>
        </div>
         <ul class="song_v">
        <!-- 歌曲列表公共组件 -->
            <song-list :playsong='playsong' @play="$emit('play',$event)" v-for="i in hotSongs" :i='i' :key="i.id"></song-list>
        </ul>
        <div class="end">— — — — 到底了 — — — —</div>
    </div>
</template>
<script>
import ReturnImg from '../components/ReturnImg';
import SongList from '../components/SongList';
// /artist/desc?id=6452
export default {
    props:['iname','playsong'],
    components:{
        ReturnImg,SongList
    },
    data(){
        return{
            recommend:'/singer',
            singerartist:{},
            hotSongs:[]
        }
    },
    created(){
        this.$axios.get('/artists?id='+this.iname).then(d=>{
        this.singerartist=d.data.artist
        this.hotSongs=d.data.hotSongs
            console.log(this.hotSongs);
        });
    },
}
</script>
<style lang="less" scoped>
.singersong{
    margin-top: -6rem;
    width: 100%;
    background-color: rgb(255, 255, 255);
    top: 0;
    z-index: 9999;
    .top{
        p{
            position: absolute;
            top: 1rem;
            left: 3rem;
            color: rgb(255, 255, 255);
            font-weight: 600;
        }
    }
   
    .img{
        img{
            width: 100%;
        }
    }
    .song{
        .dq{
            margin-top: -0.4rem;
            font-size: .8rem;
            padding: 1rem 1.5rem;
            background-color: rgb(220, 220, 220);
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