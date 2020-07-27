<template>
    <div class="header">
        <div class="header-left">
            <div class="iconfont back-icon">&#xe743;</div>
        </div>
        <div class="header-input">
            <div class="iconfont">&#xe7b3;</div>
                输入城市/景点/游玩主题
            </div>
        <div class="header-right">
            城市
            <div class="iconfont arrow-icon">&#xe6aa;</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeHeader'
    
}
</script>

<style lang="stylus" scoped>
// @代表src目录，引入css前面要加~
@import '~@/assets/styles/varibies.styl';
.header
    display: flex;
    line-height: .86rem;
    height :.86rem;
    background: $bgColor;
    color: #fff
    .header-left
        width: .64rem;
        float: left;
        .back-icon
            text-align: center
            font-size: .4rem
    .header-input
        flex: 1
        height: .64rem
        line-height: .64rem
        margin-top: .12rem
        margin-left: .2rem
        padding-left: .2rem
        background: #fff
        border-radius: .1rem;
        color: #ccc
        .icon-font
            display: inline-block
    .header-right
        width: 1.24rem
        float: right
        text-align: center
        .arrow-icon
            display: inline-block
            margin-left: -0.04rem
            font-size: .24rem
</style>