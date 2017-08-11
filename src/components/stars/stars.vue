<template>
    <div class="star" :class="starsType">
      <span :class="itemClass" class="star-item" v-for="itemClass in itemClasses" track-by="$index"></span>
    </div>
</template>
<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';
    export default{
       props: {
         score: {
           type: Number
         },
         size: {
           type: Number
         }
       },
      computed: {
        starsType: function() {
          return 'star-' + this.size;
        },
        itemClasses: function() {
          let result = [];
          let score = Math.floor(this.score * 2) / 2;
          let hasDecimal = score % 1 !== 0;
          let integer = Math.floor(score);
          for (let i = 0; i < integer; i++) {
            result.push(CLS_ON);
          }
          if (hasDecimal) {
            result.push(CLS_HALF);
          }
          while (result.length < LENGTH) {
            result.push(CLS_OFF);
          }
          return result;
        }

      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
     .star
        font-size:0
        margin : 4% 35% 4% 35%
        &.star-48
          .star-item
             width:20px
             height:20px
             margin-right:12px
             display:inline-block
             background-repeat:no-repeat
             &:last-child
                margin-right:0
             &.on
              background:url("./star48_on@2x.png")
              background-size:20px 20px
              background-repeat:no-repeat
             &.off
              background:url("./star48_off@2x.png")
              background-size:20px 20px
              background-repeat:no-repeat
             &.half
              background:url("./star48_half@2x.png")
              background-size:20px 20px
              background-repeat:no-repeat
        &.star-36
          .star-item
             width:15px
             height:15px
             margin-right:6px
             display:inline-block
             &:last-child
               margin-right:0
             &.on
              background:url("./star36_on@2x.png")
              background-size:15px 15px
              background-repeat:no-repeat
             &.off
              background:url("./star36_off@2x.png")
              background-size:15px 15px
              background-repeat:no-repeat
             &.half
              background:url("./star36_half@2x.png")
              background-size:15px 15px
              background-repeat:no-repeat
        &.star-24
          .star-item
            width:10px
            height:10px
            margin-right:3px
            display:inline-block
            &:last-child
              margin-right:0
            &.on
              background:url("./star36_on@2x.png")
              background-size:10px 10px
              background-repeat:no-repeat
            &.off
              background:url("./star36_off@2x.png")
              background-size:10px 10px
              background-repeat:no-repeat
            &.half
              background:url("./star36_half@2x.png")
              background-size:10px 10px
              background-repeat:no-repeat
</style>
