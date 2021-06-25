<template>
  <div class="search">
    <!-- 顶部搜索框/取消键 -->
    <div class="inp_btn">
        <!-- 搜索框 -->
        <div class="inp">
            <input v-model="keywords" @input="inputa" @keyup.enter="keyenter" type="text"  placeholder="搜索">
            <img v-show="keywords!=''" @click.stop="a" src="../assets/img/删除关闭.png" alt="">
        </div>
        <!-- 取消键 -->
        <button @click="returnA">取消</button>
    </div>
    <!-- 动态组件 -->
    <components @keyc='keyc' @keyb='keya=[]' :playsong='playsong' :keya='keya' @play="$emit('play',$event)" :is="search" :keywords='keywords' @son="father"></components>
  </div>
</template>
<script>
// 热门搜索
import HotSearch from '../components/HotSearch';
// 搜索建议
import SearchSuggest from '../components/SearchSuggest';
// 搜索列表
import SearchList from '../components/SearchList';
export default {
  props:['playsong'],
  name: 'Search',
  components: {

  },
  data(){
    return{
      // 热门搜索数据
      hots:[],
      // 搜索结果数据
      songs:[],
      search_result:'',
      deletea: false,
      search:HotSearch,
      keywords:'',
      keya:[]
    }
  },
  // 事件函数
  methods:{
    keyc(e){
      this.keya.map((item,index) => {
          if(item==e){
            console.log(item);
            console.log(e);
            this.keya.splice(index,1)
          }
      });
    },

    a(){
      this.keywords=''
      this.search = HotSearch
    },
    father(e){
      this.keywords=e
      this.search = SearchList
    },
    // 输入框事件
    inputa(){
      if(this.keywords==''||this.keywords.length<=0){
        this.search = HotSearch
        console.log('aaa');
      }else{
        this.search=SearchSuggest
      }
      if(this.keywords!=''){
        this.keya.push(this.keywords)
      }
    },
    // 点击取消跳转首页
    returnA(){
      this.$router.replace("/recommend")
    },
    // 关键字点击事件
    first(first){
      this.$axios.get('/search?keywords='+first+'&limit=30').then(d=>{
        this.songs = d.data.result.songs.map((item) => {
          // 重新赋名
          item.ar = item.artists
          item.al = item.album
          return item
        });
      });
    },
    // 获取搜索结果数据 
    keyenter(event){
      if(this.keywords==''){
        return
      }else{
      this.search=SearchList
      // 调用关键字点击事件
      this.first(event.target.value);
      }
    }
  },
  // 获取热门搜索数据
  created(){
    this.$axios.get('/search/hot').then(d=>{
      this.hots=d.data.result.hots
    });
  }
}
</script>

<style lang="less" scoped>
 .search{
    background-color: rgb(249, 249, 249);
    margin-top: .6rem;
    border: .1px solid rgb(249, 249, 249);
    height: 100%;
    .inp_btn{
        width: 100%;
        display: flex;
        margin-top: 16px;
        .inp{
          border-radius: 50px;
          text-align: center;
          height: 1.5rem;
          line-height: 1.5rem;
          overflow: hidden;
          width: 70%;
          margin: 0 1rem;
          position: relative;
          img{
            width: .8rem;
            height: .8rem;
            position: absolute;
            right: .4rem;
            top: 50%;
            margin-top: -.4rem;
          }
          input{
              width: 100%;
              height: 100%;
              border: none;
              text-indent: 1em;
          }
          .delete{
            position: absolute;
            right: 1rem;
            top: 0;
            color: rgb(126, 126, 126);
          }
        }
       
        button{
            background-color: rgb(249, 249, 249);
            border: none;
            font-size: .8rem;
            color: rgb(159, 159, 159);
        }
    }

    .text{
      font-size: 1rem;
      font-weight: bold;
      padding: .5rem 1rem;
    }

    .hots{
      display: flex;
      flex-wrap: wrap;
      padding: .6rem 1rem;
      li{
        margin-right: .5rem;
        margin-bottom: .5rem;
        color: rgb(120, 120, 120);
        height: 100%;
        font-size: .5rem;
        background-color: rgb(255, 255, 255);
        border-radius: 50px;
        padding: .1rem .4rem;
      }
    }
    
}
</style>
