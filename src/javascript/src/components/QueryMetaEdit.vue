<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md6>
          <v-text-field
            label="Query Description"
            :value="currentQuery.description"
            @change="onChangeQueryDescription"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-layout row wrap>
            <v-flex xs12 sm6 md6> </v-flex>
            <v-flex xs12 sm3 md3>
              <v-btn
                class="meta-edit-buttons"
                color="info"
                @click="onClickSaveButton"
                >save</v-btn
              >
            </v-flex>
            <v-flex xs12 sm3 md3>
              <v-btn
                class="meta-edit-buttons"
                color="warning"
                @click="onClickExecuteButton"
                >execute</v-btn
              >
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { Query } from "@/stores/queryStore";

export default class QueryMetaEdit extends Vue {
  @Action("createNewQuery", { namespace: "queryStore" })
  createNewQuery: any;

  @Action("updateCurrentQueryDescription", { namespace: "queryStore" })
  updateCurrentQueryDescription: any;

  @Action("executeQuery", { namespace: "resultStore" })
  executeQuery: any;

  onClickExecuteButton() {
    this.executeQuery({ query: this.currentQuery });
  }

  onClickSaveButton() {}

  onChangeQueryDescription(description: any) {
    this.updateCurrentQueryDescription({ description });
  }

  @Getter("getCurrentQuery", { namespace: "queryStore" })
  currentQuery: Query | null = null;
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 100% !important;
  padding: 0px !important;
}
</style>
