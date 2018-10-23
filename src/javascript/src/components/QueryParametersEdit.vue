<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md3 v-for="(param, index) in currentQueryParameters" :key="index">
          <v-text-field :label="param.name"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('queryStore', {
      'currentQuery': 'getCurrentQuery'
    }),
    currentQueryParameters () {
      return this.currentQuery.parameters
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 100% !important;
  padding: 0px !important;
}
</style>
