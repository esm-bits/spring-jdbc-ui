<template>
  <div>
    <v-list>
      <template v-for="item in queries">
        <v-list-tile :key="item.id" @click="onClickListItem($event, item)">
          <v-list-tile-content>
            <v-list-tile-title v-html="item.description"></v-list-tile-title>
            <v-list-tile-sub-title
              v-html="item.lastUpdatedAt"
            ></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { Query } from "@/stores/queryStore";

export default class QueryEdit extends Vue {
  @Getter("getQueries", { namespace: "queryStore" })
  queries: Query[] = [];

  @Action("changeCurrentQuery", { namespace: "queryStore" })
  changeCurrentQuery: any;

  onClickListItem(event: any, item: any) {
    this.changeCurrentQuery({ id: item.id });
  }
}
</script>
