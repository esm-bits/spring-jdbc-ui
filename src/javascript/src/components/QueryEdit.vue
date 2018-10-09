<template>
  <div>{{ currentQuery.rawQuery }}</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('queryStore', {
      currentQuery: 'getCurrentQuery'
    })
  }
}
</script>

