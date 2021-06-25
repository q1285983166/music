<template>
  <div id="app">
    <top-nav v-if="!$route.meta.hideNav"></top-nav>
    <div class="com">
      <play-song
        class="playbox"
        :playList="playList"
        :playsong="playsong"
        @changePlayMusic="changePlayMusic"
      ></play-song>
      <router-view  @playy='playy' :noplay='noplay' :playsong='playsong' v-if="isRouterAlive" class="router" @play="play" @allplay="allplay" />
    </div>
  </div>
</template>

<script>
import TopNav from "./components/TopNav";
import PlaySong from "./components/PlaySong";
export default {
  provide(){
    return{
      reload:this.reload
    }
  },
  data() {
    return {
      playsong: null,
      playList: [],
      a:[],
      isRouterAlive:true,
      noplay:true,
      iffa:true
    };
  },
  components: {
    TopNav,
    PlaySong,
  },
  
  methods:{
    playy(){
      this.noplay=false
      this.playsong=null
    },
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    changePlayMusic(event) {
      if (event) {
        this.playsong = event;
      }
    },
    play(event) {
      if (event) {
        this.playsong = event;
      }
      //加入歌单
      let isPush = true;
      this.playList.map((d) => {
        if (d.id == event.id) {
          isPush = false;
        }
      });
      if (isPush) this.playList.push(event);
    },
    // 播放歌单全部
    allplay(e) {
      // console.log(e);
      this.playsong = e[0];
      e.map((item) => {
        let isPush = true;
        this.playList.map((d) => {
          if (d.id == item.id) {
            //歌曲已经存在
            isPush = false;
          }
        });
        if (isPush) this.playList.push(item);
      });
    },
  },
};
</script>
<style lang="less" scoped>
#app {
  .com {
    margin-top: 6rem;
    padding-bottom: 3rem;
  }
}
</style>

