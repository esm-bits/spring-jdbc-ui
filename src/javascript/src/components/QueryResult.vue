<template>
  <v-container>
    <v-data-table :items="data">
      <template slot="items" slot-scope="props">
        <td v-for="column in columns">
          {{ props.item[column] }}
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      columns: ['id', 'name'],
      data: [
        { id: 0, name: 'test0' },
        { id: 1, name: 'test1' }
      ]
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
