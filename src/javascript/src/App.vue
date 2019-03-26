<template>
  <v-app>
    <v-btn
      @click="onClickCreateNewQueryButton"
      class="new-query-button"
      color="pink"
      dark
      fixed
      bottom
      left
      fab
    >
      <v-icon>+</v-icon>
    </v-btn>
    <v-navigation-drawer v-model="drawer" fixed app>
      <query-list> </query-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Spring JDBC UI</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout
          justify-space-around
          align-space-around
          column
          fill-height
          fill-width
        >
          <query-meta-edit></query-meta-edit>
          <query-edit></query-edit>
          <query-parameters-edit></query-parameters-edit>
          <query-result></query-result>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      SPRING JDBC UI
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import QueryListComponent from "@/components/QueryList.vue";
import QueryEditComponent from "@/components/QueryEdit.vue";
import QueryMetaEditComponent from "@/components/QueryMetaEdit.vue";
import QueryParametersEditComponent from "@/components/QueryParametersEdit.vue";
import QueryResultComponent from "@/components/QueryResult.vue";

const queryStore = namespace("queryStore");

@Component({
  components: {
    queryList: QueryListComponent,
    queryEdit: QueryEditComponent,
    queryMetaEdit: QueryMetaEditComponent,
    queryParametersEdit: QueryParametersEditComponent,
    queryResult: QueryResultComponent
  }
})
export default class App extends Vue {
  drawer: any = null;

  @queryStore.Action("createNewQuery")
  createNewQuery!: any;

  onClickCreateNewQueryButton() {
    this.createNewQuery();
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.v-content {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.new-query-button {
  bottom: 70px !important;
}
</style>
