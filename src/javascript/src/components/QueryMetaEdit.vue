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
import { namespace } from "vuex-class";
import { Query } from "@/stores/queryStore";

const queryStore = namespace("queryStore");
const resultStore = namespace("resultStore");

@Component
export default class QueryMetaEdit extends Vue {
  @queryStore.Action("createNewQuery")
  createNewQuery!: any;

  @queryStore.Action("updateCurrentQueryDescription")
  updateCurrentQueryDescription!: any;

  @resultStore.Action("executeQuery")
  executeQuery!: any;

  onClickExecuteButton() {
    this.executeQuery({ query: this.currentQuery });
  }

  onClickSaveButton() {}

  onChangeQueryDescription(description: any) {
    this.updateCurrentQueryDescription({ description });
  }

  @queryStore.Getter("getCurrentQuery")
  currentQuery!: Query;
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 100% !important;
  padding: 0px !important;
}
</style>
