(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Customer_CustomerTable_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Customer/CustomerTable.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Customer/CustomerTable.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var CustomerForm = function CustomerForm() {
  return __webpack_require__.e(/*! import() */ "resources_js_components_Customer_CustomerForm_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./CustomerForm */ "./resources/js/components/Customer/CustomerForm.vue"));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CustomerTable",
  components: {
    CustomerForm: CustomerForm
  },
  data: function data() {
    return {
      customer: {},
      customerFormVisible: false
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapState)({
    customers: function customers(state) {
      return state.customers.customers;
    },
    nextPage: function nextPage(state) {
      return state.customers.nextPage;
    },
    lastPage: function lastPage(state) {
      return state.customers.lastPage;
    },
    searchKey: function searchKey(state) {
      return state.customers.searchKey;
    }
  })), {}, {
    isSearchActive: function isSearchActive() {
      return !!this.searchKey;
    }
  }),
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapActions)({
    deleteCustomer: 'customers/deleteCustomer',
    editCustomer: 'customers/editCustomer',
    fetchCustomers: 'customers/fetchCustomers'
  })), {}, {
    formatValue: function formatValue(value) {
      return _.map(value, 'phone_number').join(', ');
    },
    formatNumbers: function formatNumbers(row, column, cellValue) {
      return this.formatValue(cellValue);
    },
    loadCustomers: function loadCustomers($state) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.fetchCustomers().then(function () {
                  if (_this.nextPage > _this.lastPage) {
                    $state.complete();
                  } else {
                    $state.loaded();
                  }
                })["catch"](function () {
                  return $state.complete();
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    edit: function edit(customer) {
      this.customer = _.cloneDeep(customer);
      this.customer.phone_numbers = customer.phone_numbers ? this.formatValue(customer.phone_numbers) : '';
      this.customerFormVisible = true;
    },
    removeCustomer: function removeCustomer(customerId) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.$confirm('Are you sure you want to delete the customer', 'Warning', {
                  confirmButtonText: 'OK',
                  cancelButtonText: 'Cancel',
                  type: 'warning'
                }).then(function () {
                  _this2.deleteCustomer(customerId).then(function () {
                    _this2.$message({
                      type: 'success',
                      message: 'Customer deleted successfully'
                    });
                  })["catch"](function () {
                    _this2.$message({
                      type: 'error',
                      message: 'Customer was not deleted'
                    });
                  });
                })["catch"](function () {//skip
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    updateCustomer: function updateCustomer(customer) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.editCustomer(customer).then(function () {
                  _this3.customerFormVisible = false;

                  _this3.$message({
                    type: 'success',
                    message: 'Customer updated successfully'
                  });
                })["catch"](function () {
                  _this3.$message({
                    type: 'error',
                    message: 'Customer was not updated'
                  });
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  })
});

/***/ }),

/***/ "./resources/js/components/Customer/CustomerTable.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/Customer/CustomerTable.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomerTable_vue_vue_type_template_id_111aaeaa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomerTable.vue?vue&type=template&id=111aaeaa& */ "./resources/js/components/Customer/CustomerTable.vue?vue&type=template&id=111aaeaa&");
/* harmony import */ var _CustomerTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomerTable.vue?vue&type=script&lang=js& */ "./resources/js/components/Customer/CustomerTable.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _CustomerTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _CustomerTable_vue_vue_type_template_id_111aaeaa___WEBPACK_IMPORTED_MODULE_0__.render,
  _CustomerTable_vue_vue_type_template_id_111aaeaa___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Customer/CustomerTable.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Customer/CustomerTable.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/Customer/CustomerTable.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomerTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomerTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Customer/CustomerTable.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomerTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/Customer/CustomerTable.vue?vue&type=template&id=111aaeaa&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/Customer/CustomerTable.vue?vue&type=template&id=111aaeaa& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomerTable_vue_vue_type_template_id_111aaeaa___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomerTable_vue_vue_type_template_id_111aaeaa___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomerTable_vue_vue_type_template_id_111aaeaa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomerTable.vue?vue&type=template&id=111aaeaa& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Customer/CustomerTable.vue?vue&type=template&id=111aaeaa&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Customer/CustomerTable.vue?vue&type=template&id=111aaeaa&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Customer/CustomerTable.vue?vue&type=template&id=111aaeaa& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
            data: _vm.customers,
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
                          return _vm.edit(scope.row)
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
                          return _vm.removeCustomer(scope.row.id)
                        }
                      }
                    })
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c(
            "infinite-loading",
            {
              attrs: {
                slot: "append",
                identifier: _vm.isSearchActive,
                spinner: "circles",
                "force-use-infinite-wrapper": ".el-table__body-wrapper"
              },
              on: { infinite: _vm.loadCustomers },
              slot: "append"
            },
            [
              _c("div", { attrs: { slot: "no-more" }, slot: "no-more" }),
              _vm._v(" "),
              _c("div", { attrs: { slot: "no-results" }, slot: "no-results" })
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("customer-form", {
        attrs: {
          customer: _vm.customer,
          "customer-form-visible": _vm.customerFormVisible
        },
        on: {
          "close-customer-form": function($event) {
            _vm.customerFormVisible = false
          },
          save: _vm.updateCustomer
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);