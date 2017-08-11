<template>
  <div>
    <div class="ratingsType">
      <span class="descAll" :class="{active : mySelectRatings === 2}" @click="select(2,$event)">{{ratingsType.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="descPosition" :class="{active : mySelectRatings === 0}" @click="select(0,$event)">{{ratingsType.positive}}
        <span class="count">{{positive.length}}</span>
      </span>
      <span class="descNegtive" :class="{active : mySelectRatings === 1}" @click="select(1,$event)">{{ratingsType.negtive}}
        <span class="count">{{negtive.length}}</span>
      </span>
    </div>
    <div class="onlyContent">
      <input type="checkbox" checked="myContentOnly" @click="myContentOnly = !myContentOnly"><span class="contentText">只看有内容的评价</span>
    </div>
    <hr style="width: 200% ;margin-top:10px;margin-left:-36px; border: 1px solid #ccc">
    <ul v-show="ratings && ratings.length" class="contentRating">
      <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
        <div class="contentUp">
          <div class="time">{{rating.rateTime}}</div>
          <div class="user">
            <span class="userName">{{rating.username}}</span><img :src="rating.avatar" alt="" class="avater" width="12" height="12" dispaly="inline-block">
          </div>
        </div>
        <div class="txt"><span class="good" style="width: 12px;height:12px; border:1px solid #ccc" :class="{ 'up': rating.rateType === 0, 'down': rating.rateType === 1}"></span><span class="contentTxt">{{rating.text}}</span></div>
      </li>
    </ul>
    <div v-show="!ratings && !ratings.length"></div>
  </div>

</template>
<script type="text/ecmascript-6">
   const POSITIVE = 0;
   const NEGTIVE = 1;
   const ALL = 2;
   export default {
       props: {
          contentOnly: {
              type: Boolean,
              default: true
          },
         selectRatings: {
              type: Number,
              default: ALL
         },
         ratings: {
              type: Array,
              default() {
                  return [];
              }
         },
         ratingsType: {
              type: Object,
              default() {
                  return {
                     all: '全部',
                     positive: '满意',
                     negtive: '不满意'
                  };
              }
         }
       },
     data() {
          return {
            mySelectRatings: this.selectRatings,
            myContentOnly: this.contentOnly
          };
     },
       methods: {
           select: function(type, event) {
              if (!event._constructed) {
                  return;
              }
              this.mySelectRatings = type;
              this.$parent.$emit('select', type);
           },
         needShow: function (type, text) {
           if (this.myContentOnly && !text) {
             return false;
           }
           if (this.selectRatings === ALL && !this.myContentOnly) {
             return true;
           } else {
             return type === this.ratingsType;
           }
         }
       },
     computed: {
           positive: function () {
             return this.ratings.filter(function (rating) {
               return rating.rateType === POSITIVE;
             });
           },
       negtive: function () {
         return this.ratings.filter(function (rating) {
           return rating.rateType === NEGTIVE;
         });
       }
     }
   };
</script>
<style lang="stylus" rel="stylesheet/stylus">
 .ratingsType
   font-size 0
   border-bottom 1px solid #ccc
   padding 24px
  .descAll
     display inline-block
     width 25%
     height 32px
     line-height 32px
     font-size 15px
     background rgba(0,160,220,0.2)
     color #000
     text-align center
     border-radius 2px
     margin-right 16px
     &.active
      background rgb(0,160,220)
      color: #fff
  .descPosition
      display inline-block
      width 25%
      height 32px
      line-height 32px
      font-size 15px
      text-align center
      background rgb(0,160,220,0.2)
      color rgb(77,85,93)
      border-radius 2px
      margin-right 16px
      &.active
       background rgb(0,160,220)
       color: #fff
  .descNegtive
     display inline-block
     width 25%
     height 32px
     line-height 32px
     text-align center
     font-size 15px
     background rgb(77,85,93,0.2)
     color #000
     border-radius 2px
     margin-right 16px
     &.active
      background rgb(77,85,93)
      color: white
 .onlyContent
    width 100%
    margin-top 10px
    .contentText
      color rgb(147,153,159)
      font-size 15px
      line-height 24px
 .contentRating
   width 100%
   .rating-item
     border-bottom 1px solid #ccc
     padding 15px 0
     .contentUp
       display flex
       .time
         flex 1
         float left
         font-size 15px
         color rgb(147,153,159)
         vertical-align top
         height 24px
         line-height:24px
       .user
         flex 1
         vertical-align top
         text-align right
         .userName
           display inline-block
           color rgb(147,153,159)
           font-size 15px
           margin-right 12px
           height 24px
           line-height:24px

     .txt
       width:100%
       margin-top:12px
       .good
         display inline-block
         margin-right 12px
       .up
         background rgb(0,160,220)
       .down
         background rgb(147,153,159)
</style>
