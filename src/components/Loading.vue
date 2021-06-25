<template>
    <ul class="loading">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</template>

<style lang="less" scoped>
.loading{
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    li{
        width: 20px;
        height: 3px;
        margin-bottom: 3px;
        transform-origin: left;
        background-color: rgb(44,215,160);
        animation: load 0.5s 0s infinite;
        &:first-child{
            animation-delay: 0s;
        }
        &:nth-child(2){
            animation-delay: .2s;
        }
        &:nth-child(3){
            animation-delay: .4s;
        }
        &:nth-child(4){
            animation-delay: .6s;
        }
    }
}
@keyframes load{
    from{
        transform: scaleX(0.1);
    }
    to{
        transform: scaleX(1);
    }
}
</style>