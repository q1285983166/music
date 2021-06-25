<template>
  <div class="recommend">
    <router-link tag="div" class="top_search" to="/search">
      <input type="text" name="" id="" placeholder="搜索">
    </router-link>
    <txet-tag>官方歌单</txet-tag>
    <loading v-if="result.length<=0"></loading>
      <div class="box">
        <div class="box2">
          <ul class="box3">
            <song-menu v-for="res in result" :key="res.id" :res="res"></song-menu>
          </ul>
        </div>
      </div>
    <txet-tag>网友歌单</txet-tag>
    <loading v-if="playlists.length<=0"></loading>
      <div class="box">
        <div class="box2">
          <ul class="box3">
            <song-menu v-for="res in playlists" :key="res.id" :res="res"></song-menu>
          </ul>
        </div>
      </div>
      <txet-tag>MV</txet-tag>
      <loading v-if="resultmv.length<=0"></loading>
        <div class="box">
          <div class="box2">
            <ul class="box3">
              <song-mv v-for="res in resultmv" :key="res.id" :res="res"></song-mv>
            </ul>
          </div>
        </div>
      <p>五月音乐</p>
  </div>
</template>

<script>
import TxetTag from '../components/TxetTag';
import SongMenu from '../components/SongMenu';
import SongMv from '../components/SongMv';
import Loading from '../components/Loading';
export default {
  name: 'Recommend',
  components: {
    TxetTag,SongMenu,SongMv,Loading
  },
  data(){
    return{
      result:[],
      playlists:[],
      resultmv:[]
    }
  },
  methods:{
   
  },
  created(){
    this.$axios.get('/personalized').then(d=>{
      this.result=d.data.result
    });
    this.$axios.get('/top/playlist?limit=10&order=new').then(d=>{
      this.playlists = d.data.playlists.map((item) => {
        item.picUrl = item.coverImgUrl
        return item
      });
    });
    this.$axios.get('/personalized/mv').then(d=>{
      this.resultmv=d.data.result
      // this.playlists = d.data.playlists.map((item) => {
      //   item.picUrl = item.coverImgUrl
      //   return item
      // });
    });
  },
}
</script>

<style lang="less" scoped>
  .recommend{
    background-color: rgb(249, 249, 249);
    margin-top: .6rem;
    border: .1px solid rgb(249, 249, 249);
    .top_search{
      width: 18rem;
      border-radius: 20px;
      text-align: center;
      margin: 0 auto;
      margin-top: 16px;
      height: 1.5rem;
      overflow: hidden;
      input{
        width: 100%;
        height: 100%;
        border: none;
        text-indent: 1em;
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
    p{
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      margin-top: 3rem  ;
      margin-bottom: 2rem ;
    }
  }
</style>
