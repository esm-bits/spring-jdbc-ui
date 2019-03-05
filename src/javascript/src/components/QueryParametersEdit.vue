<template>
  <v-form>
    <v-container>
      <template v-if="currentQueryParameters.length > 0">
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md3
            v-for="(param, index) in currentQueryParameters"
            :key="index"
          >
            <v-text-field :label="param.name"></v-text-field>
          </v-flex>
        </v-layout>
      </template>
      <template v-else>
        <v-layout row justify-start>
          <v-flex class="no-parameters" xs12 sm12 md12>
            <span>No Parameters</span>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { Query } from "@/stores/queryStore";

export default class QueryParametersEdit extends Vue {
  @Getter("getCurrentQuery", { namespace: "queryStore" })
  currentQuery: Query | null = null;

  get currentQueryParameters() {
    return this.currentQuery ? this.currentQuery.parameters : [];
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 100% !important;
  padding: 0px !important;
}
.no-parameters {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
</style>
