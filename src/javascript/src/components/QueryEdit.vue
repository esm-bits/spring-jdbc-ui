<template>
  <div class="codemirror-wrapper">
    <codemirror
      :options="cmOptions"
      :value="currentQuery.rawQuery"
      @ready="onCmReady"
      @focus="onCmFocus"
      @input="onCmInput"
    ></codemirror>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/x-sql",
        theme: "base16-light",
        lineNumbers: true,
        line: true
      }
    };
  },
  computed: {
    ...mapGetters("queryStore", {
      currentQuery: "getCurrentQuery"
    })
  },
  methods: {
    ...mapActions("queryStore", ["updateCurrentQuery"]),
    onCmReady() {},
    onCmFocus() {},
    onCmInput(newCode) {
      this.updateCurrentQuery({ rawQuery: newCode });
    }
  }
};
</script>

<style lang="scss" scoped>
.codemirror-wrapper {
  z-index: 0;
  text-align: left;
}
</style>
