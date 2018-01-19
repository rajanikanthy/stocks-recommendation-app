<template>
  <tr>
    <td>{{quote.symbol}}</td>
    <td v-if="editMode">
      <input type="text" v-model:value="quote.current_price" @keyup.enter="updateCurrentPrice">
    </td>
    <td v-else="editMode" @click="edit">{{quote.current_price}}</td>
    <td>{{quote.min_price}}</td>
    <td>{{quote.max_price}}</td>
    <td>{{quote.profit_zone}}</td>
    <td>{{quote.stop_zone}}</td>
    <td>{{quote.catalyst_date}}</td>
    <td>{{quote.created_date}}</td>
    <td v-if="canBuy">
      <i class="fa fa-check" aria-hidden="true"></i>
    </td>
    <td v-else="canBuy">
      <i class="fa fa-times" aria-hidden="true"></i>
    </td>
    <td v-if="inProfitZone">
      <i class="fa fa-check" aria-hidden="true"></i>
    </td>
    <td v-else="inProfitZone">
      <i class="fa fa-times" aria-hidden="true"></i>
    </td>
    <td v-if="inStopZone">
      <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
    </td>
    <td v-else="inStopZone">

    </td>
    <td><button class="'btn-primary" @click="remove"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
  </tr>
</template>
<script>
  export default {
    props: ['quote', 'quoteKey'],

    data () {
      return {
        editMode: false
      }
    },

    methods: {
      edit () {
        this.editMode = true
      },
      remove () {
        this.$store.dispatch('removeQuote', this.quoteKey)
      },
      updateCurrentPrice () {
        this.editMode = false
        let update = {
          'symbol': this.quote.symbol,
          'current_price': this.quote.current_price,
          'key': this.quoteKey
        }
        this.$store.dispatch('updateCurrentPrice', update)
      }
    },
    computed: {
      canBuy () {
        return (this.quote.current_price > this.quote.min_price && this.quote.current_price < this.quote.max_price)
      },
      filteredQuote () {
        return this.quote !== undefined ? this.quote : undefined
      },
      inProfitZone () {
        return this.quote.current_price > this.quote.profit_zone * 0.9
      },
      inStopZone () {
        return this.quote.current_price < this.quote.stop_zone
      }
    }
  }
</script>
<style>
  .symbol-header {
    font-weight: bolder;
  }
</style>
