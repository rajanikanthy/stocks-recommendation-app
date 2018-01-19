<template>
  <div id="app" class="container">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <div class="card">
        <div class="card-title">
          <h2>Kyle Picks</h2>
        </div>
        <div class="card-body">
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
            <tr>
              <th>Symbol</th>
              <th>Current Price</th>
              <th>Min Price</th>
              <th>Max Price</th>
              <th>Profit Zone</th>
              <th>Stop Zone</th>
              <th>Catalyst Date</th>
              <th>Created On</th>
              <th>Buy Range</th>
              <th>In Profit Zone</th>
              <th>In Stop Zone</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <stock-quote :quote="quote" :quoteKey="index" v-for="(quote, index) in quotes" :key="index"></stock-quote>
            <tr v-if="showDoneBtn">
              <td><input type="text" v-model:value="quote.symbol"/></td>
              <td><input type="text" v-model:value="quote.current_price"/></td>
              <td><input type="text" v-model:value="quote.min_price"/></td>
              <td><input type="text" v-model:value="quote.max_price"/></td>
              <td><input type="text" v-model:value="quote.profit_zone"/></td>
              <td><input type="text" v-model:value="quote.stop_zone"/></td>
              <td><input type="text" v-model:value="quote.catalyst_date"/></td>
              <td><input type="text" v-model:value="quote.created_on"/></td>
            </tr>
            </tbody>
          </table>
          <div class="card-footer">
            <button class="btn-primary" @click="showDoneBtn = !showDoneBtn" v-if="!showDoneBtn">Add New</button>
            <button class="btn-primary" @click="submit" v-if="showDoneBtn">Done</button>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
  import Quote from './components/quotes/Quote.vue'

  export default {
    name: 'app',
    components: {
      'stock-quote': Quote
    },
    computed: {
      quotes () {
        return this.$store.getters.quotes
      }
    },
    data () {
      return {
        quote: {
          symbol: '',
          current_price: '',
          max_price: '',
          profit_zone: '',
          stop_zone: '',
          catalyst_date: '',
          created_on: ''
        },
        showDoneBtn: false
      }
    },

    methods: {
      submit () {
        this.showDoneBtn = !this.showDoneBtn
        this.$store.dispatch('addQuote', this.quote)
      }
    },

    created () {
      this.$store.dispatch('initializeDatabase')
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
