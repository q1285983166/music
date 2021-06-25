<template>
    <div id="nav">
        <div class="navtop">
            五月音乐
        </div>
        <div class="navbtm">
            <router-link to="/recommend">推荐</router-link>
            <router-link to="/top">排行</router-link>
            <router-link to="/singer">歌手</router-link>
        </div>
    </div>
</template>
<script>

export default {
    
}
</script>

<style lang="less" scoped>
 #nav{
     height: 6rem;
     background-color: rgb(250,250,250);
     display: flex;
     flex-direction: column;
     box-shadow: 0 3px 25px rgba(224, 224, 224, 0.8);
     position: fixed;
     top: 0;
     width: 100%;
     z-index: 8888;
     div{
         flex: 1;
         line-height: 3rem;
     }
     .navtop{
        padding-left: 20px;
     }
     .navbtm{
        display: flex;
        a{
            flex: 1;
            text-align: center;
            color: rgb(169, 169, 169);
            position: relative;
                &.router-link-exact-active{
                color: rgb(44,215,160);
                    &::after{
                        content: "";
                        position: relative;
                        border-bottom: 2px solid rgb(44,215,160);
                        height: .03rem;
                        display: block;                        
                        width: 1.5rem;
                        position: absolute;
                        left: 50%;
                        transform: translate3d(-50%,0,0);
                    }
                }
        }
     }
 }
</style>