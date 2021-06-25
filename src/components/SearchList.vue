<template>
    <ul class="HotSearch">
        <song-list 
            @play="$emit('play',$event)" 
            tag='li' v-for="i in songs" 
            :keywords="keywords"
            :playsong='playsong'
            :i='i' :key="i.id">
        </song-list>
    </ul>
</template>
<script>
import SongList from '../components/SongList';
export default {
    data(){
        return{
            songs:[]
        }
    },
    components:{
        SongList
    },
    props:['keywords','playsong'],
    created(){
        this.$axios.get('/search?keywords='+this.keywords).then(d=>{
        this.songs=d.data.result.songs.map((item)=>{
            item.al=item.album,
            item.ar=item.artists
            return item
        })
    });
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>
.HotSearch{
}
</style>