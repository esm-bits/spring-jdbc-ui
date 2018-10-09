<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <query-list></query-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Sprint JDBC UI</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center column fill-height>
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

<script>
import QueryListComponent from '@/components/QueryList'
import QueryEditComponent from '@/components/QueryEdit'
import QueryParametersEditComponent from '@/components/QueryParametersEdit'
import QueryResultComponent from '@/components/QueryResult'

export default {
  components: {
    queryList: QueryListComponent,
    queryEdit: QueryEditComponent,
    queryParametersEdit: QueryParametersEditComponent,
    queryResult: QueryResultComponent
  },
  data () {
    return {
      drawer: null
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
