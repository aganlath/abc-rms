(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Table_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Table.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/CustomerTable.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Table",
  props: {
    data: {
      required: true,
      type: Array
    }
  },
  methods: {
    formatNumbers: function formatNumbers(row, column, cellValue) {
      return _.map(cellValue, 'phone_number').join(', ');
    }
  }
});

/***/ }),

/***/ "./resources/js/components/Table.vue":
/*!*******************************************!*\
  !*** ./resources/js/components/CustomerTable.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Table_vue_vue_type_template_id_5bd01d73_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomerTable.vue?vue&type=template&id=5bd01d73&scoped=true& */ "./resources/js/components/Table.vue?vue&type=template&id=5bd01d73&scoped=true&");
/* harmony import */ var _Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomerTable.vue?vue&type=script&lang=js& */ "./resources/js/components/Table.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Table_vue_vue_type_template_id_5bd01d73_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Table_vue_vue_type_template_id_5bd01d73_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5bd01d73",
  null

)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/CustomerTable.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Table.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/components/CustomerTable.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomerTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Table.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default);

/***/ }),

/***/ "./resources/js/components/Table.vue?vue&type=template&id=5bd01d73&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/CustomerTable.vue?vue&type=template&id=5bd01d73&scoped=true& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_template_id_5bd01d73_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_template_id_5bd01d73_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Table_vue_vue_type_template_id_5bd01d73_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomerTable.vue?vue&type=template&id=5bd01d73&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Table.vue?vue&type=template&id=5bd01d73&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Table.vue?vue&type=template&id=5bd01d73&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/CustomerTable.vue?vue&type=template&id=5bd01d73&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-card",
    { staticClass: "box-card mt-10" },
    [
      _c(
        "el-table",
        {
          attrs: {
            "empty-text": "No customers",
            size: "mini",
            stripe: true,
            data: _vm.data,
            height: "500"
          }
        },
        [
          _c("el-table-column", {
            attrs: { fixed: "", prop: "first_name", label: "First name" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "last_name", label: "Last name" }
          }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "email", label: "Email" } }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              prop: "phone_numbers",
              formatter: _vm.formatNumbers,
              label: "Phone numbers"
            }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { fixed: "right", label: "", width: "120" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c("el-button", {
                      staticClass: "border-0",
                      attrs: {
                        type: "text",
                        size: "medium",
                        icon: "el-icon-edit"
                      },
                      nativeOn: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.$emit("edit", scope.row.id)
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("el-button", {
                      staticClass: "border-0",
                      attrs: {
                        type: "text",
                        size: "medium",
                        icon: "el-icon-delete"
                      },
                      nativeOn: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.$emit("remove", scope.row.id)
                        }
                      }
                    })
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("infinite-loading", {
            attrs: {
              slot: "append",
              "force-use-infinite-wrapper": ".el-table__body-wrapper"
            },
            on: {
              infinite: function($event) {
                return _vm.$emit("load-more")
              }
            },
            slot: "append"
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
