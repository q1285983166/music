<template>
  <div class="Song">
    <return-img :recommend='recommend'></return-img>
    <div class="img">
        <img class="img_a" :src="playlist.coverImgUrl" alt="">
        <p>{{playlist.name}}</p>
        <div class="img_tag">歌单</div>a
    </div>
    <!-- 歌单标签块公共组件 -->
    <song-box>歌曲列表</song-box>
    <!-- 歌曲列表 -->
    <ul class="song_v">
        <!-- 歌曲列表公共组件 -->
        <song-list :playsong='playsong' @play="$emit('play',$event)" v-for="i in tracks" :i='i' :key="i.id"></song-list>
    </ul>
    <!-- 歌单标签块公共组件 -->
    <song-box>最新评论({{comlangth}})</song-box>
    <ul class="song_comments">
        <comm-ent v-for="i in comments" :key="i.id" :i='i'></comm-ent>
    </ul>
  </div>
</template>
<script>
import SongBox from '../components/SongBox';
import CommEnt from '../components/CommEnt';
import ReturnImg from '../components/ReturnImg';
import SongList from '../components/SongList';
export default {
    name: 'Song',
    components: {
        SongBox,ReturnImg,SongList,CommEnt
    },
    props:['sname','playsong'],
    data(){
        return{
            playlist:'',
            tracks:[],
            comlangth:'',
            comments:[],
            recommend:'/recommend'
        }
    },
    // 事件函数
    methods:{
    },
    created(){
        // 歌单歌曲数据
        this.$axios.get('/playlist/detail?id='+this.sname).then(d=>{
            this.playlist=d.data.playlist
            this.tracks=d.data.playlist.tracks
        });
        // 歌单评论数据
        this.$axios.get('/comment/playlist?id='+this.sname).then(d=>{
            this.comlangth=d.data.comments.length
            this.comments=d.data.comments
        });
    },
}
</script>

<style lang="less" scoped>

.Song{
    margin-top: -6rem;
    .img{
        height: 10rem;
        overflow: hidden;
        position: relative;
        .img_a{
            width: 100%;
            margin-top: -5rem;
        }
        p{
            position: absolute;
            top: 0;
            right: 0;
            color: rgb(255, 255, 255);
            font-size: .6rem;
            background-color: rgba(127, 127, 127, 0.3);
            padding: .2rem;
            margin: .2rem;
            border-radius: 10px;
        }
        .img_tag{
            padding: .1rem .6rem;
            position: absolute;
            right: 0;
            bottom: 0;
            background-color: rgb(44,215,160);
            font-size: .6rem;
            border-radius: 15px 0 0 0 ;
            color: white;
        }
    }
   
    // .song_v{
    //     li{
    //         position: relative;
    //         padding: .4rem;
    //         .i_name{
    //             font-size: .8rem;
    //             .over
    //         }
    //         .i_al_name{
    //             font-size: .4rem;
    //             .over
    //         }
    //         img{
    //             width: .8rem;
    //             height: .8rem;
    //             position: absolute;
    //             top: 50%;
    //             margin-top: -.4rem;
    //             right: 1rem;
    //         }
    //     }
    // }

  
}
</style>
