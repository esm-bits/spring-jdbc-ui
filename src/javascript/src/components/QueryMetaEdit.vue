<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md6>
          <v-text-field label="Query Description" :value="currentQuery.description" @change="onChangeQueryDescription"></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
        </v-flex>
        <v-flex xs12 sm2 md2>
          <v-btn color="info" @click="onClickSaveButton">save</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions('queryStore', [
      'createNewQuery',
      'updateCurrentQueryDescription'
    ]),
    onClickSaveButton() {
    },
    onChangeQueryDescription(description) {
      this.updateCurrentQueryDescription({ description  })
    }
  },
  computed: {
    ...mapGetters('queryStore', {
      'currentQuery': 'getCurrentQuery'
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 100% !important;
  padding: 0px !important;
}
</style>
