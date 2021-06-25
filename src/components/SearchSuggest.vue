<template>
    <div class="HotSearch">
        <ul class="songs">
            <div @click="$emit('son',keywords)" class="green">搜索：{{keywords}}</div>
            <li @click="$emit('son',s.name)" v-for="s in songs" :key="s.id">
                {{s.name}} 
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            songs:[]
        }
    },
    props:{
        keywords:String
    },
    created(){
        this.suggest(this.keywords)
    },
    watch:{
        keywords(newVal){
            this.suggest(newVal)
        }
    },
    methods:{
        suggest(k){
            this.$axios.get('/search/suggest?keywords='+k).then(d=>{
                this.songs=d.data.result.songs
            });
        }
    }
}
</script>

<style lang="less" scoped>
.HotSearch{
    width: 100%;
    height: 100vh;
    background-color: rgb(249,249,249);
    .songs{
        padding: .5rem .6rem;
        font-size: .8rem;
        li{
            padding: .5rem 0;
            border-bottom: 1px solid rgba(224, 224, 224, 0.2);
            color: #333;
        }
    }
    .green{
        font-size: 1rem;
        padding: .2rem 0;
        color: rgb(50, 206, 130);
    }
}
</style>