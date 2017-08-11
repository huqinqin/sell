<template>
     <div class="header">
         <div class="content-wrapper">
           <div class="avatar">
             <img  :src="seller.avatar" alt="" width="64" height="64" >
           </div>
           <div class="content">
             <div class="title">
               <span class="brand"></span>
               <span class="name">{{seller.name}}</span>
             </div>
             <div class="discription">
               {{seller.description}}/{{seller.deliveryTime}}分钟送达
             </div>
             <div v-if="seller.supports" class="support">
                <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                <span class="text">{{seller.supports[0].description}}</span>
             </div>
           </div>
           <div class="support-count" v-if="seller.supports" @click="showBox">
             <span class="count">{{seller.supports.length}}个</span>
             <i></i>
           </div>

         </div>
         <div class="bulletin-wrapper" @click="showBox">
            <span class="bulletin-icon"></span><span class="bulletin-content">{{seller.bulletin}}</span>
            <span class="icon-row-right"></span>
         </div>
         <div class="background">
           <img :src="seller.avatar" alt="" width="100%" height="100%">
         </div>
         <transition name="fade">
           <div class="showDetail" v-show="detailShow">
           <div class="detail-wrapper clearfix">
             <div class="detail-main">
               <h1 class="name">{{seller.name}}</h1>
               <div class="star-box">
                 <stars :size="36" :score="4"></stars>
               </div>
               <div class="detail-info">
                 <div class="line"></div>
                 <div class="word">优惠信息</div>
                 <div class="line"></div>
               </div>
               <ul class="detail-sail" v-if="seller.supports">
                 <li class="supports" v-for="(key, item) in  seller.supports">
                   <span class="icon" :class="classMap[seller.supports[item].type]"></span>
                   <span class="sell-word">{{seller.supports[item].description}}</span>
                 </li>
               </ul>
               <div class="detail-info">
                 <div class="line"></div>
                 <div class="word">商家公告</div>
                 <div class="line"></div>
               </div>
               <div class="tell">
                 <div class="tell-content">{{seller.bulletin}}</div>
               </div>
             </div>
           </div>
           <div class="detail-close" @click="delteBox">
             X
           </div>
         </div>
         </transition>

     </div>
</template>
<script type="text/ecmascript-6">
  import stars from '../stars/stars.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showBox() {
         this.detailShow = true;
      },
      delteBox() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
      stars
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/stylus/mixmin.styl";
  .header
    position:relative
    color:#fff
    background-color:rgba(7,17,27,0.5)
   .content-wrapper
      padding:24px 12px 18px 24px
     .avatar
        display:inline-block
        img
          border-radius:10px
     .content
         display:inline-block
         margin-left:14px
         font-size:14px
         .title
           margin:2px 0 8px 0
           .brand
             display:inline-block
             vertical-align: top
             width:30px
             height:18px
             background:url("./brand@2x.png")
             background-size: 30px 18px
           .name
               margin-left:6px
               font-size:16px
               line-height:18px
               font-weight:bold
               display:inline-block
         .discription
            margin-bottom:10px
            line-height:12px
            font-size:12px
         .support
            .icon
               display: inline-block
               width:12px
               height:12px
               margin-right:4px
               &.decrease
                background:url("./decrease_1@2x.png")
                background-size:12px 12px
               &.discount
                background:url("./discount_1@2x.png")
                background-size:12px 12px
               &.guarantee
                background:url("./guarantee_1@2x.png")
                background-size:12px 12px
              &.invoice
                background:url("./guarantee_1@2x.png")
                background-size:12px 12px
              &.special
                background:url("./guarantee_1@2x.png")
                background-size:12px 12px
     .support-count
        width:36px
        position:absolute
        right:35px
        top:68px
        padding:0 8px
        height:24px
        line-height:24px
        background-color:#ccc
        border:1px solid rgba(0,0,0,0.2)
        border-radius:10px
        text-align:center
        margin-left:10px
          .count
            font-size:10px
            color:rgb(255,255,255)
            vertical-align:top
   .bulletin-wrapper
     width:95%
     height:28px
     line-height:28px
     white-space:nowrap
     overflow:hidden
     text-overflow:ellipsis
     vertical-align:top
     .bulletin-content
        margin-left:4px
     .bulletin-icon
        display:inline-block
        width:25px
        height:20px
        line-height:20px
        background:url("./bulletin@2x.png");
        background-size:25px 20px
        vertical-align:top
        margin-left:24px
        margin-top:4px
   .background
      position:absolute
      width:100%
      height:100%
      left:0
      top:0
      filter:blur(10px)
      z-index:-1
  .fade-enter-active, .fade-leave-active
      transition: opacity 1s
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
      opacity: 0
   .showDetail
      position:fixed
      left:0
      top:0
      width:100%
      height:100%
      z-index:100
      background:rgba(7,17,27,0.8)
      overflow:auto
      backdrop-filter :blur(10px)
      .detail-wrapper
         min-height:100%
         width:100%
         .detail-main
            margin-top: 64px
            padding-bottom:64px
            .name
              font-size:16px
              font-weight:700px
              color:rgb(255,255,255)
              line-height:16px
              margin:0 auto
              text-align:center
             .detail-info
                width : 80%
                margin : 0 auto
                display : flex
                padding : 3% 0
               .line
                  flex : 1
                  height : 0
                  border : 1px solid rgba(255,255,255,0.2)
                  margin-top : 2%
               .word
                  line-height : 16px
                  margin : 0 3% 0 3%
             .detail-sail
                 width :80%
                 margin : 24px auto
                 .supports
                   font-size :0
                   margin-top : 3%
                   .icon
                     width : 16px
                     height :16px
                     display inline-block
                     margin-right :4%
                     vertical-align : top
                     &.decrease
                      background:url("./decrease_2@2x.png")
                      background-size:16px 16px
                     &.discount
                        background:url("./discount_2@2x.png")
                        background-size:16px 16px
                     &.guarantee
                        background:url("./guarantee_2@2x.png")
                        background-size:16px 16px
                     &.invoice
                        background:url("./guarantee_2@2x.png")
                        background-size:16px 16px
                     &.special
                        background:url("./guarantee_2@2x.png")
                        background-size:16px 16px
                   .sell-word
                      display:inline-block
                      font-size :12px
                      margin-right :4%
                      color:rgb(255,255,255)
             .tell
               width : 80%
               margin 0 auto
               .tell-content
                 font-size :12px
                 font-weight :200
                 color:rgb(255,255,255)
                 line-height :24px
                 padding :2% 0
      .detail-close
         position:relative
         width:32px
         height:32px
         margin:-64px auto 0px auto
        clear:both
        font-size:32px
        text-align:center
        line-height:32px
</style>
