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

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Query } from "@/stores/queryStore";

const queryStore = namespace("queryStore");
const resultStore = namespace("resultStore");

@Component
export default class QueryResult extends Vue {
  @queryStore.Getter("getCurrentQuery")
  currentQuery!: Query;

  @resultStore.Getter("getResult")
  getResult!: any;

  get currentQueryId() {
    return this.currentQuery ? this.currentQuery.id : "";
  }
  get currentQueryResult() {
    return this.getResult(this.currentQueryId);
  }
  get resultColumns() {
    return this.currentQueryResult.columns;
  }
  get resultData() {
    return this.currentQueryResult.data || [];
  }
  get resultHeaders() {
    return this.resultColumns.map((columnName: string) => ({
      text: columnName,
      value: columnName,
      sortable: true
    }));
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 100% !important;
  padding: 0px !important;
}
</style>
