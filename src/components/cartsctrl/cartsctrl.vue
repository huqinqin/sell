<template>
    <div class="cartsctrl">
      <transition name="fade">
        <div class="decrease glyphicon glyphicon-minus-sign" v-show=" food.count > 0" @click.stop.prevent="decreaseItem"></div>
      </transition>
      <div class="cartscounts" v-show=" food.count > 0">{{food.count}}</div>
      <div class="crease glyphicon glyphicon-plus-sign" @click.stop.prevent="creaseItem"></div>
    </div>
</template>
<script type="text/ecmascript-6">
  import vue from 'vue';
    export default{
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            creaseItem: function (event) {
                if (!event._constructed) {
                    return;
                }
               if (!this.food.count) {
                   vue.set(this.food, 'count', 1);
               } else {
                     this.food.count++;
               }
            },
            decreaseItem: function (event) {
            if (!event._constructed) {
              return;
            }
            if (this.food.count) {
              this.food.count--;
            }
          }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartsctrl
     height 100%
     font-size 0
   .decrease
     padding 6px
     font-size:12px
     display inline-block
     vertical-align top
     transform rotateY(360deg)
     transform translate3d(-20%,0,0 )
    .fade-enter-active, .fade-leave-active
        transition all  0.5s
    .fade-enter,.fade-leave-active
        opacity 0
        transform rotateY(0deg)
        transform translate3d(20%,0,0 )
     .cartscounts
       font-size:12px
       line-height 24px
       display inline-block
       vertical-align top
       color rgb(147,153,159)
       font-weight 700
     .crease
         padding 6px
         font-size:12px
         display inline-block
         vertical-align  top
</style>
