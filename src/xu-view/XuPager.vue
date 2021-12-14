<template>
  <div class="wrapper">
    <ul>
      <li class="show-border mr5" @click="previousPage">上一页</li>
      <li
        v-for="(page,index) in pageNumberList"
        :class="{'show-border':page !== '...','active':page===pageNow}"
        @click="choosePage(page)"
        :key="index"
      >{{ page }}</li>
      <li class="show-border ml5" @click="nextPage">下一页</li>
      <li>共{{ pageNum }}页</li>
      <li>
        <span>跳到第</span>
        <input type="number" min="1" :max="pageNum" v-model.number="pageGo" />
        <span>页</span>
      </li>
      <li>
        <button class="nav-page-btn" @click="choosePage(pageGo)">确定</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    //页码数目
    pageNum: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      pageNow: 1,
      pageNumberList: [],
      pageGo: ""
    };
  },
  methods: {
    //给定一个范围产生一个序列（包括首尾）
    getArray: function(min, max) {
      let array = [];
      let range = max - min;
      if (range < 0) {
        return [1];
      } else {
        for (let i = 0; i <= range; i++) {
          array[i] = min + i;
        }
        return array;
      }
    },
    //初始化页码列表，最多显示5个数字
    initPageNumberList: function() {
      if (this.pageNum <= 6) {
        this.pageNumberList = this.getArray(1, this.pageNum);
      } else {
        this.pageNumberList = [1, 2, 3, 4, 5, "...", this.pageNum];
      }
    },
    //根据选择的页码调整显示的页码
    adjustPageNumberList: function(pageNow) {
      if (this.pageNum >= 7) {
        //只有最大页码大于等于7才会出现这种情况
        if (pageNow === 1 || pageNow === 2 || pageNow === 3) {
          this.pageNumberList = [1, 2, 3, 4, 5, "...", this.pageNum];
        } else if (
          pageNow === this.pageNum - 2 ||
          pageNow === this.pageNum - 1 ||
          pageNow === this.pageNum
        ) {
          this.pageNumberList = [
            1,
            "...",
            this.pageNum - 4,
            this.pageNum - 3,
            this.pageNum - 2,
            this.pageNum - 1,
            this.pageNum
          ];
        } else {
          this.pageNumberList = [
            1,
            "...",
            pageNow - 1,
            pageNow,
            pageNow + 1,
            "...",
            this.pageNum
          ];
        }
      }
    },
    //选择页码
    choosePage: function(page) {
      if (page <= this.pageNum && this.pageNow !== page) {
        this.pageNow = page;
        this.$emit("hasSelectedPage", page);
        this.adjustPageNumberList(page);
      }
    },
    previousPage: function() {
      if (this.pageNow !== 1) {
        this.pageNow--;
        this.adjustPageNumberList(this.pageNow);
        this.$emit("hasSelectedPage", this.pageNow);
      }
    },
    nextPage: function() {
      if (this.pageNow !== this.pageNum) {
        this.pageNow++;
        this.adjustPageNumberList(this.pageNow);
        this.$emit("hasSelectedPage", this.pageNow);
      }
    }
  },
  watch: {
    pageNum: {
      handler: function() {
        this.initPageNumberList();
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
ul,
li {
  margin: 0;
  padding: 0;
}
.ml5 {
  margin-left: 5px;
}
.mr5 {
  margin-right: 5px;
}
.wrapper {
  font-size: 12px;
  color: #e0e3e9;
}
.wrapper > ul > li {
  display: inline-block;
  padding: 4px 8px;
}
.show-border {
  border: 1px solid #325893;
  border-radius: 3px;
}
.show-border:hover {
  cursor: pointer;
  background-color: #304981;
}
.active {
  background-color: #325893;
}
li > input {
  width: 35px;
  border: 1px solid #325893;
  border-radius: 3px;
  padding: 2px 2px;
}
.nav-page-btn {
  height: 25px;
  margin-left: 10px;
  background-color: #3869aa;
  width: 50px;
  color: #f7f7f7;
  border-radius: 3px;
}
.nav-page-btn:hover {
  background-color: #33629e;
}
</style>