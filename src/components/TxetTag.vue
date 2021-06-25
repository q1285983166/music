<template>
    <div class="textimg">
        <div class="text">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="less" scoped>
.textimg{
    .text{
        display: flex;
        justify-content: space-between;
        padding:  .8rem .8rem;
        font-weight: bold;
        align-items: center;
        p{
            font-size: .6rem;
            font-weight: 100;
            color: rgb(178, 178, 178);
        }
    }
}

</style>