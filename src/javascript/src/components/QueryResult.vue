<template>
  <v-container>
    <v-alert
      :value="errorMessage"
      type="error"
    >
      {{ errorMessage }}
    </v-alert>
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
import { QueryResult} from "@/stores/resultStore";

const queryStore = namespace("queryStore");
const resultStore = namespace("resultStore");

@Component
export default class QueryResultComponent extends Vue {
  @queryStore.Getter("getCurrentQuery")
  currentQuery!: Query;

  @resultStore.Getter("getResult")
  getResult!: (queryId: string) => QueryResult;

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
  get errorMessage() {
    return this.currentQueryResult.error ? this.currentQueryResult.error.message : "";
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 100% !important;
  padding: 0px !important;
}
</style>
