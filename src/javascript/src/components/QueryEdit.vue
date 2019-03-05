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

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { Query } from "@/stores/queryStore";

export default class QueryEdit extends Vue {
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
  }

  @Getter("getCurrentQuery", { namespace: "queryStore" })
  currentQuery: any;

  @Action("updateCurrentQuery", { namespace: "queryStore" })
  updateCurrentQuery: any;

  onCmReady() {}
  onCmFocus() {}
  onCmInput(newCode: string) {
    this.updateCurrentQuery({ rawQuery: newCode });
  }
}
</script>

<style lang="scss" scoped>
.codemirror-wrapper {
  z-index: 0;
  text-align: left;
}
</style>
