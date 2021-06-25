<template>
    <div class="song_list">
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
 .song_list{
        height: 1rem;
        min-height:20px;
        color: rgb(156, 156, 156);
        background-color: rgb(244, 244, 244);
        font-size: .4rem;
        line-height: 1rem;
        min-height:18px;
        padding-left: .5rem;
    }
</style>