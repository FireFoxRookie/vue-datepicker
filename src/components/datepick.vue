<template>
  <div class="datepicker" :style="{width: width}">
    <div class="monthpicker relative">
      <span class="preMonth fa fa-angle-left block absolute pointer" @click="preMonth"></span>
      <div class="monthContent">
        <span>{{year}}</span>
        <span>年</span>
        <span>{{month}}</span>
        <span>月</span>
      </div>
      <span class="nextMonth fa fa-angle-right absolute block pointer" @click="nextMonth"></span>
    </div>
    <div class="daypicker">
      <table cellpadding="0" cellspacing="0" class="daytable">
        <tr class="week">
          <th v-for="w in weekArr" :key="w" class="daycell">{{w}}</th>
        </tr>
        <tr class="day" v-for="(wk, index) in dayArr" :key="index + 1">
          <td class="daycell pointer" v-for="(day, _index) in wk" :key="(index + 1) * day.value">
            <span class="dayCellSpan block" :key="(index + 2) * day.value" :class="{unableCell: !day.enable, ableCell: day.enable, isselected: _index === chooseColIndex && index === chooseRowIndex, istoday: Number(day.value) === date}" @click="datepick(day, index, _index)">{{day.value}}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
let date = new Date()
let year = date.getFullYear()
export default {
  name: 'datepicker',
  data () {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      weekArr: ['日', '一', '二', '三', '四', '五', '六'],
      dayCountArr: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      dayCount: 30,
      dayArr: [],
      date: date.getDate(),
      chooseRowIndex: null,
      chooseColIndex: null
    }
  },
  props: {
    width: {
      type: String,
      default: '230px'
    },
    maxYear: {
      type: Number,
      default: year
    },
    minYear: {
      type: Number,
      default: 1970
    }
  },
  created () {
    this.getDay()
  },
  watch: {
    month (newVal, oldVal) {
      this.chooseRowIndex = null
      this.chooseColIndex = null
      this.dayArr = []
      this.getDay()
    }
  },
  methods: {
    preMonth () {
      this.month--
      if (this.month === 0) {
        this.year--
        if (this.year === this.minYear) {
          return false
        }
        this.month = 12
      }
    },
    nextMonth () {
      this.month++
      if (this.month === 13) {
        this.year++
        this.month = 1
      }
    },
    getMonthCount (month, year) {
      let count = this.dayCountArr[month - 1]
      if (month === 2) {
        if (year % 4 === 0 && ((year % 100 === 0) || (year % 400 === 0))) {
          count++
        }
      }
      return count
    },
    getWeekDay (day) {
      var w = new Date(this.year, this.month - 1, day)
      return w.getDay()
    },
    getDay () {
      this.dayCount = this.getMonthCount(this.month, this.year)
      let arr = []
      for (let i = 1; i <= this.dayCount; i++) {
        let obj = {
          enable: true,
          value: i
        }
        if (this.getWeekDay(i) < 6) {
          arr.push(obj)
        } else {
          arr.push(obj)
          this.dayArr.push(arr)
          arr = []
        }
      }
      this.dayArr.push(arr)
      let weekDay = this.getWeekDay(1)
      let weekEndDay = this.getWeekDay(this.dayCount)
      let preCount
      if (this.month === 1) {
        preCount = 31
      } else {
        preCount = this.getMonthCount(this.month - 1, this.year)
      }
      if (weekDay === 0) {
        let arr = []
        for (let i = 0; i < 7; i++) {
          let obj = {
            enable: false,
            value: preCount - i
          }
          arr.unshift(obj)
        }
        this.dayArr.unshift(arr)
      } else {
        for (let i = 0; i < weekDay; i++) {
          let obj = {
            enable: false,
            value: preCount - i
          }
          this.dayArr[0].unshift(obj)
        }
      }
      if (weekEndDay === 6) {
        weekEndDay = -1
      }
      for (let i = 1; i < 7 - weekEndDay; i++) {
        let obj = {
          enable: false,
          value: i
        }
        this.dayArr[this.dayArr.length - 1].push(obj)
      }
      if (this.dayArr.length < 6) {
        let arr = []
        for (let i = 0; i < 7; i++) {
          let obj = {
            enable: false,
            value: 7 - weekEndDay + i
          }
          arr.push(obj)
        }
        this.dayArr.push(arr)
      }
    },
    datepick (day, index, _index) {
      this.chooseRowIndex = index
      this.chooseColIndex = _index
      this.date = day
      this.$emit('datepicker', {
        year: this.year,
        month: this.month,
        day: this.date
      })
    }
  }
}
</script>
<style scoped>
  .relative {
    position: relative;
  }
  .absolute {
    position: absolute;
  }
  .pointer {
    cursor: pointer;
  }
  .block {
    display: block;
  }
  .datepicker {
    background-color: rgba(32, 58, 128, 1);
  }
  .monthpicker {
    height: 20px;
     margin-bottom: 10px;
  }

  .monthContent {
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
  }

  .monthContent>span {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }

  .preMonth, .nextMonth {
    height: 20px;
    color: #bbb;
    top: 0;
    font-size: 24px;
    line-height: 20px;
  }

  .preMonth {
    left: 1px;
  }

  .nextMonth {
    right: 1px;
  }

  .daytable {
    width: 100%
  }

  .week {
    height: 20px;
    background-color: rgba(255,255,255, 0.4);
  }

  .day {
    background-color: rgba(255,255,255, 0.2);
  }

  .daycell {
    height: 25px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    font-weight: 200;
  }

  .dayCellSpan {
    width: 20px;
    height: 20px;
    margin: 0 auto;
    line-height: 21px;
    border-radius: 3px;
  }

  .unableCell {
    color: #888;
  }

  .ableCell:hover {
    background-color: rgba(75, 167, 254, 1);
  }

  .isselected {
    background-color: rgba(75, 167, 254, 1);
  }

  .istoday {
    background-color: rgba(253, 230, 154, 1);
  }
</style>
