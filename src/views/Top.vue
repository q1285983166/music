<template>
  <div class="top">
    <music-list class="muli" v-for="d in datax" :key="d.id" :d='d'></music-list>
  </div>
</template>
<script>
import MusicList from '../components/MusicList';
export default {
  data(){
    return{
      datax:[]
    }
  },
  name: 'Top',
  components: {
    MusicList
  },
  methods:{
   
  },
  created(){
    this.$nextTick(()=>{
          this.$axios.get('/toplist/detail').then(d=>{
          this.datax=d.data.list.slice(0,4)
          });
      })
  }
}
</script>

<style lang="less" scoped>
.top{
  border: .1px solid rgb(255, 255, 255);
  height: 100%;
  background-color: rgb(249, 249, 249);

}
</style>
