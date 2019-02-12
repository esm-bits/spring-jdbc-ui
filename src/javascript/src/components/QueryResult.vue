<template>
  <v-container>
    <v-data-table
      :items="resultData"
      :headers="resultHeaders"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td v-for="(column, index) in resultColumns" :key="index">
          {{ props.item[column] }}
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("queryStore", {
      currentQuery: "getCurrentQuery"
    }),
    ...mapGetters("resultStore", {
      getResult: "getResult"
    }),
    currentQueryId() {
      return this.currentQuery.id;
    },
    currentQueryResult() {
      return this.getResult(this.currentQueryId);
    },
    resultColumns() {
      return this.currentQueryResult.columns;
    },
    resultData() {
      return this.currentQueryResult.data || [];
    },
    resultHeaders() {
      return this.resultColumns.map(columnName => ({
        text: columnName,
        value: columnName,
        sortable: true
      }));
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 100% !important;
  padding: 0px !important;
}
</style>
