import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from 'vuetify'
import QueryList from "@/components/QueryList.vue";
import { queryStore } from "@/stores/queryStore";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify, {
  iconfont: 'fa',
});

describe("QueryList.vue", () => {
  let actions: any;
  let store: any;
  let queries: any;
  let wrapper: any;

  beforeEach(() => {
    queries = [
      {
        id: "001",
        rawQuery: "SELECT * FROM test_table",
        parameters: [
          {
            name: "tableName"
          }
        ],
        description: "簡単なSELECTクエリ",
        lastUpdatedAt: "2018/08/01 15:00:00"
      },
      {
        id: "002",
        rawQuery: "INSERT INTO test_table ...",
        parameters: [],
        description: "動かないINSERTクエリ",
        lastUpdatedAt: "2018/01/01 15:00:00"
      }
    ];
    actions = {
      changeCurrentQuery: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        queryStore: {
          namespaced: true,
          state: {
            queries
          },
          actions,
          getters: queryStore.getters
        }
      }
    });

    wrapper = shallowMount(QueryList, {
      store,
      localVue,
      stubs: {
        "v-list-tile": '<div data-tile @click="$listeners.click"><slot/></div>',
        "v-list-tile-title": "<div data-tile-title></div>",
        "v-list-tile-sub-title": "<div data-tile-sub-title></div>"
      }
    });
  });

  it("renders state.getQueries in v-list-tile tag", () => {
    const tiles = wrapper.findAll("[data-tile]");
    expect(tiles.length).toBe(2);
    const tile1 = tiles.at(0);
    expect(tile1.find("[data-tile-title]").text()).toBe(queries[0].description);
    expect(tile1.find("[data-tile-sub-title]").text()).toBe(
      queries[0].lastUpdatedAt
    );
    const tile2 = tiles.at(1);
    expect(tile2.find("[data-tile-title]").text()).toBe(queries[1].description);
    expect(tile2.find("[data-tile-sub-title]").text()).toBe(
      queries[1].lastUpdatedAt
    );
  });

  it("click on v-list-tile tag calls changeCurrentQuery action in store with argument \"{id: '001'}\"", () => {
    const tile1 = wrapper.find("[data-tile]");
    tile1.trigger("click");
    expect(actions.changeCurrentQuery).toBeCalledWith(
      expect.anything(),
      { id: "001" },
      undefined
    );
  });
});
