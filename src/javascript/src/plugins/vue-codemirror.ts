import Vue from "vue";
import VueCodemirror from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/sql/sql.js";
import "codemirror/theme/base16-light.css";

Vue.use(VueCodemirror, {
  options: { theme: "base16-light" }
});
