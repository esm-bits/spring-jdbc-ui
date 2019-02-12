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

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions("queryStore", ["changeCurrentQuery"]),
    onClickListItem(event, item) {
      this.changeCurrentQuery({ id: item.id });
    }
  },
  computed: {
    ...mapGetters("queryStore", {
      queries: "getQueries"
    })
  }
};
</script>
