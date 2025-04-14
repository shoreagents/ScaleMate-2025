/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./src/components/layout/Header.tsx":
/*!******************************************!*\
  !*** ./src/components/layout/Header.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"(pages-dir-node)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst HeaderContainer = styled_components__WEBPACK_IMPORTED_MODULE_2___default().header.withConfig({\n    displayName: \"Header__HeaderContainer\",\n    componentId: \"sc-f5c96b2c-0\"\n})([\n    `position:fixed;width:100%;background-color:rgba(255,255,255,0.9);backdrop-filter:blur(4px);z-index:50;border-bottom:1px solid #E5E7EB;`\n]);\nconst Container = styled_components__WEBPACK_IMPORTED_MODULE_2___default().div.withConfig({\n    displayName: \"Header__Container\",\n    componentId: \"sc-f5c96b2c-1\"\n})([\n    `max-width:72rem;margin:0 auto;padding:0 1rem;`\n]);\nconst HeaderContent = styled_components__WEBPACK_IMPORTED_MODULE_2___default().div.withConfig({\n    displayName: \"Header__HeaderContent\",\n    componentId: \"sc-f5c96b2c-2\"\n})([\n    `display:flex;align-items:center;justify-content:space-between;height:4rem;`\n]);\nconst Logo = styled_components__WEBPACK_IMPORTED_MODULE_2___default()((next_link__WEBPACK_IMPORTED_MODULE_3___default())).withConfig({\n    displayName: \"Header__Logo\",\n    componentId: \"sc-f5c96b2c-3\"\n})([\n    `font-size:1.5rem;font-weight:700;color:#0F172A;text-decoration:none;`\n]);\nconst Nav = styled_components__WEBPACK_IMPORTED_MODULE_2___default().nav.withConfig({\n    displayName: \"Header__Nav\",\n    componentId: \"sc-f5c96b2c-4\"\n})([\n    `display:none;gap:2rem;@media (min-width:768px){display:flex;}`\n]);\nconst NavItem = styled_components__WEBPACK_IMPORTED_MODULE_2___default().span.withConfig({\n    displayName: \"Header__NavItem\",\n    componentId: \"sc-f5c96b2c-5\"\n})([\n    `color:#0F172A;cursor:pointer;transition:color 0.2s;&:hover{color:#3B82F6;}`\n]);\nconst AuthSection = styled_components__WEBPACK_IMPORTED_MODULE_2___default().div.withConfig({\n    displayName: \"Header__AuthSection\",\n    componentId: \"sc-f5c96b2c-6\"\n})([\n    `display:flex;align-items:center;gap:1rem;`\n]);\nconst LoginButton = styled_components__WEBPACK_IMPORTED_MODULE_2___default().span.withConfig({\n    displayName: \"Header__LoginButton\",\n    componentId: \"sc-f5c96b2c-7\"\n})([\n    `color:#0F172A;cursor:pointer;transition:color 0.2s;&:hover{color:#3B82F6;}`\n]);\nconst SignUpButton = styled_components__WEBPACK_IMPORTED_MODULE_2___default().span.withConfig({\n    displayName: \"Header__SignUpButton\",\n    componentId: \"sc-f5c96b2c-8\"\n})([\n    `background-color:#3B82F6;color:white;padding:0.5rem 1rem;border-radius:0.5rem;cursor:pointer;transition:background-color 0.2s;&:hover{background-color:#2563EB;}`\n]);\nconst Header = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(HeaderContainer, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Container, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(HeaderContent, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Logo, {\n                        href: \"/\",\n                        children: \"ScaleMate\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\components\\\\layout\\\\Header.tsx\",\n                        lineNumber: 87,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Nav, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(NavItem, {\n                                children: \"Solutions\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\components\\\\layout\\\\Header.tsx\",\n                                lineNumber: 89,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(NavItem, {\n                                children: \"Tools\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\components\\\\layout\\\\Header.tsx\",\n                                lineNumber: 90,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(NavItem, {\n                                children: \"Pricing\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\components\\\\layout\\\\Header.tsx\",\n                                lineNumber: 91,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(NavItem, {\n                                children: \"Resources\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\components\\\\layout\\\\Header.tsx\",\n                                lineNumber: 92,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\components\\\\layout\\\\Header.tsx\",\n                        lineNumber: 88,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthSection, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LoginButton, {\n                                children: \"Login\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\components\\\\layout\\\\Header.tsx\",\n                                lineNumber: 95,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SignUpButton, {\n                                children: \"Sign Up Free\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\components\\\\layout\\\\Header.tsx\",\n                                lineNumber: 96,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\components\\\\layout\\\\Header.tsx\",\n                        lineNumber: 94,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\components\\\\layout\\\\Header.tsx\",\n                lineNumber: 86,\n                columnNumber: 9\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\components\\\\layout\\\\Header.tsx\",\n            lineNumber: 85,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\components\\\\layout\\\\Header.tsx\",\n        lineNumber: 84,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9jb21wb25lbnRzL2xheW91dC9IZWFkZXIudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDYTtBQUNWO0FBRTdCLE1BQU1HLGtCQUFrQkYsK0RBQWE7Ozs7OztBQVNyQyxNQUFNSSxZQUFZSiw0REFBVTs7Ozs7O0FBTTVCLE1BQU1NLGdCQUFnQk4sNERBQVU7Ozs7OztBQU9oQyxNQUFNTyxPQUFPUCx3REFBTUEsQ0FBQ0Msa0RBQUlBOzs7Ozs7QUFPeEIsTUFBTU8sTUFBTVIsNERBQVU7Ozs7OztBQVN0QixNQUFNVSxVQUFVViw2REFBVzs7Ozs7O0FBVTNCLE1BQU1ZLGNBQWNaLDREQUFVOzs7Ozs7QUFNOUIsTUFBTWEsY0FBY2IsNkRBQVc7Ozs7OztBQVUvQixNQUFNYyxlQUFlZCw2REFBVzs7Ozs7O0FBYWhDLE1BQU1lLFNBQVM7SUFDYixxQkFDRSw4REFBQ2I7a0JBQ0MsNEVBQUNFO3NCQUNDLDRFQUFDRTs7a0NBQ0MsOERBQUNDO3dCQUFLUyxNQUFLO2tDQUFJOzs7Ozs7a0NBQ2YsOERBQUNSOzswQ0FDQyw4REFBQ0U7MENBQVE7Ozs7OzswQ0FDVCw4REFBQ0E7MENBQVE7Ozs7OzswQ0FDVCw4REFBQ0E7MENBQVE7Ozs7OzswQ0FDVCw4REFBQ0E7MENBQVE7Ozs7Ozs7Ozs7OztrQ0FFWCw4REFBQ0U7OzBDQUNDLDhEQUFDQzswQ0FBWTs7Ozs7OzBDQUNiLDhEQUFDQzswQ0FBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU0xQjtBQUVBLGlFQUFlQyxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJEOlxcU2NhbGVNYXRlLTIwMjVcXHNyY1xcY29tcG9uZW50c1xcbGF5b3V0XFxIZWFkZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xyXG5cclxuY29uc3QgSGVhZGVyQ29udGFpbmVyID0gc3R5bGVkLmhlYWRlcmBcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpO1xyXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig0cHgpO1xyXG4gIHotaW5kZXg6IDUwO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTVFN0VCO1xyXG5gO1xyXG5cclxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcclxuICBtYXgtd2lkdGg6IDcycmVtO1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIHBhZGRpbmc6IDAgMXJlbTtcclxuYDtcclxuXHJcbmNvbnN0IEhlYWRlckNvbnRlbnQgPSBzdHlsZWQuZGl2YFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgaGVpZ2h0OiA0cmVtO1xyXG5gO1xyXG5cclxuY29uc3QgTG9nbyA9IHN0eWxlZChMaW5rKWBcclxuICBmb250LXNpemU6IDEuNXJlbTtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIGNvbG9yOiAjMEYxNzJBO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuYDtcclxuXHJcbmNvbnN0IE5hdiA9IHN0eWxlZC5uYXZgXHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBnYXA6IDJyZW07XHJcblxyXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICB9XHJcbmA7XHJcblxyXG5jb25zdCBOYXZJdGVtID0gc3R5bGVkLnNwYW5gXHJcbiAgY29sb3I6ICMwRjE3MkE7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnM7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgY29sb3I6ICMzQjgyRjY7XHJcbiAgfVxyXG5gO1xyXG5cclxuY29uc3QgQXV0aFNlY3Rpb24gPSBzdHlsZWQuZGl2YFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDFyZW07XHJcbmA7XHJcblxyXG5jb25zdCBMb2dpbkJ1dHRvbiA9IHN0eWxlZC5zcGFuYFxyXG4gIGNvbG9yOiAjMEYxNzJBO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGNvbG9yOiAjM0I4MkY2O1xyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IFNpZ25VcEJ1dHRvbiA9IHN0eWxlZC5zcGFuYFxyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzQjgyRjY7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjJzO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyNTYzRUI7XHJcbiAgfVxyXG5gO1xyXG5cclxuY29uc3QgSGVhZGVyID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8SGVhZGVyQ29udGFpbmVyPlxyXG4gICAgICA8Q29udGFpbmVyPlxyXG4gICAgICAgIDxIZWFkZXJDb250ZW50PlxyXG4gICAgICAgICAgPExvZ28gaHJlZj1cIi9cIj5TY2FsZU1hdGU8L0xvZ28+XHJcbiAgICAgICAgICA8TmF2PlxyXG4gICAgICAgICAgICA8TmF2SXRlbT5Tb2x1dGlvbnM8L05hdkl0ZW0+XHJcbiAgICAgICAgICAgIDxOYXZJdGVtPlRvb2xzPC9OYXZJdGVtPlxyXG4gICAgICAgICAgICA8TmF2SXRlbT5QcmljaW5nPC9OYXZJdGVtPlxyXG4gICAgICAgICAgICA8TmF2SXRlbT5SZXNvdXJjZXM8L05hdkl0ZW0+XHJcbiAgICAgICAgICA8L05hdj5cclxuICAgICAgICAgIDxBdXRoU2VjdGlvbj5cclxuICAgICAgICAgICAgPExvZ2luQnV0dG9uPkxvZ2luPC9Mb2dpbkJ1dHRvbj5cclxuICAgICAgICAgICAgPFNpZ25VcEJ1dHRvbj5TaWduIFVwIEZyZWU8L1NpZ25VcEJ1dHRvbj5cclxuICAgICAgICAgIDwvQXV0aFNlY3Rpb24+XHJcbiAgICAgICAgPC9IZWFkZXJDb250ZW50PlxyXG4gICAgICA8L0NvbnRhaW5lcj5cclxuICAgIDwvSGVhZGVyQ29udGFpbmVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7ICJdLCJuYW1lcyI6WyJSZWFjdCIsInN0eWxlZCIsIkxpbmsiLCJIZWFkZXJDb250YWluZXIiLCJoZWFkZXIiLCJDb250YWluZXIiLCJkaXYiLCJIZWFkZXJDb250ZW50IiwiTG9nbyIsIk5hdiIsIm5hdiIsIk5hdkl0ZW0iLCJzcGFuIiwiQXV0aFNlY3Rpb24iLCJMb2dpbkJ1dHRvbiIsIlNpZ25VcEJ1dHRvbiIsIkhlYWRlciIsImhyZWYiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/components/layout/Header.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"(pages-dir-node)/./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core/styles.css */ \"(pages-dir-node)/./node_modules/@fortawesome/fontawesome-svg-core/styles.css\");\n/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ \"@fortawesome/fontawesome-svg-core\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _styles_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/styles/theme */ \"(pages-dir-node)/./src/styles/theme.ts\");\n/* harmony import */ var _components_layout_Header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/layout/Header */ \"(pages-dir-node)/./src/components/layout/Header.tsx\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_3__]);\n_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\n\n// Prevent Font Awesome from adding its CSS since we did it manually above\n_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_3__.config.autoAddCss = false;\nfunction App({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();\n    const showHeader = !router.pathname.startsWith('/admin');\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(styled_components__WEBPACK_IMPORTED_MODULE_4__.ThemeProvider, {\n        theme: _styles_theme__WEBPACK_IMPORTED_MODULE_5__.theme,\n        children: [\n            showHeader && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_layout_Header__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 19,\n                columnNumber: 22\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 20,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\ScaleMate-2025\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 18,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7QUFDd0I7QUFDSztBQUVUO0FBQ1g7QUFDUztBQUNSO0FBRXhDLDBFQUEwRTtBQUMxRUEscUVBQU1BLENBQUNLLFVBQVUsR0FBRztBQUVMLFNBQVNDLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDNUQsTUFBTUMsU0FBU0wsc0RBQVNBO0lBQ3hCLE1BQU1NLGFBQWEsQ0FBQ0QsT0FBT0UsUUFBUSxDQUFDQyxVQUFVLENBQUM7SUFFL0MscUJBQ0UsOERBQUNYLDREQUFhQTtRQUFDQyxPQUFPQSxnREFBS0E7O1lBQ3hCUSw0QkFBYyw4REFBQ1AsaUVBQU1BOzs7OzswQkFDdEIsOERBQUNJO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7OztBQUc5QiIsInNvdXJjZXMiOlsiRDpcXFNjYWxlTWF0ZS0yMDI1XFxzcmNcXHBhZ2VzXFxfYXBwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ0Avc3R5bGVzL2dsb2JhbHMuY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUvc3R5bGVzLmNzcyc7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XHJcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQC9zdHlsZXMvdGhlbWUnO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gJ0AvY29tcG9uZW50cy9sYXlvdXQvSGVhZGVyJztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5cclxuLy8gUHJldmVudCBGb250IEF3ZXNvbWUgZnJvbSBhZGRpbmcgaXRzIENTUyBzaW5jZSB3ZSBkaWQgaXQgbWFudWFsbHkgYWJvdmVcclxuY29uZmlnLmF1dG9BZGRDc3MgPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3Qgc2hvd0hlYWRlciA9ICFyb3V0ZXIucGF0aG5hbWUuc3RhcnRzV2l0aCgnL2FkbWluJyk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8VGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxyXG4gICAgICB7c2hvd0hlYWRlciAmJiA8SGVhZGVyIC8+fVxyXG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICA8L1RoZW1lUHJvdmlkZXI+XHJcbiAgKTtcclxufSAiXSwibmFtZXMiOlsiY29uZmlnIiwiVGhlbWVQcm92aWRlciIsInRoZW1lIiwiSGVhZGVyIiwidXNlUm91dGVyIiwiYXV0b0FkZENzcyIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInJvdXRlciIsInNob3dIZWFkZXIiLCJwYXRobmFtZSIsInN0YXJ0c1dpdGgiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/./src/styles/theme.ts":
/*!*****************************!*\
  !*** ./src/styles/theme.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   theme: () => (/* binding */ theme)\n/* harmony export */ });\nconst theme = {\n    colors: {\n        primary: '#3B82F6',\n        primaryDark: '#2563EB',\n        secondary: '#6B7280',\n        background: {\n            primary: '#FFFFFF',\n            secondary: '#F9FAFB'\n        },\n        text: {\n            primary: '#1F2937',\n            secondary: '#6B7280'\n        },\n        border: '#E5E7EB',\n        error: '#EF4444',\n        success: '#10B981',\n        disabled: '#9CA3AF'\n    },\n    spacing: {\n        xs: '0.25rem',\n        sm: '0.5rem',\n        md: '1rem',\n        lg: '1.5rem',\n        xl: '2rem'\n    },\n    shadows: {\n        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',\n        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',\n        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'\n    },\n    transitions: {\n        fast: '150ms ease',\n        normal: '300ms ease',\n        slow: '500ms ease'\n    },\n    fonts: {\n        sans: 'Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif'\n    },\n    breakpoints: {\n        sm: '640px',\n        md: '768px',\n        lg: '1024px',\n        xl: '1280px'\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9zdHlsZXMvdGhlbWUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFTyxNQUFNQSxRQUFzQjtJQUNqQ0MsUUFBUTtRQUNOQyxTQUFTO1FBQ1RDLGFBQWE7UUFDYkMsV0FBVztRQUNYQyxZQUFZO1lBQ1ZILFNBQVM7WUFDVEUsV0FBVztRQUNiO1FBQ0FFLE1BQU07WUFDSkosU0FBUztZQUNURSxXQUFXO1FBQ2I7UUFDQUcsUUFBUTtRQUNSQyxPQUFPO1FBQ1BDLFNBQVM7UUFDVEMsVUFBVTtJQUNaO0lBQ0FDLFNBQVM7UUFDUEMsSUFBSTtRQUNKQyxJQUFJO1FBQ0pDLElBQUk7UUFDSkMsSUFBSTtRQUNKQyxJQUFJO0lBQ047SUFDQUMsU0FBUztRQUNQSixJQUFJO1FBQ0pDLElBQUk7UUFDSkMsSUFBSTtJQUNOO0lBQ0FHLGFBQWE7UUFDWEMsTUFBTTtRQUNOQyxRQUFRO1FBQ1JDLE1BQU07SUFDUjtJQUNBQyxPQUFPO1FBQ0xDLE1BQU07SUFDUjtJQUNBQyxhQUFhO1FBQ1hYLElBQUk7UUFDSkMsSUFBSTtRQUNKQyxJQUFJO1FBQ0pDLElBQUk7SUFDTjtBQUNGLEVBQUU7QUFFRixpRUFBZWhCLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIkQ6XFxTY2FsZU1hdGUtMjAyNVxcc3JjXFxzdHlsZXNcXHRoZW1lLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlZmF1bHRUaGVtZSB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCB0aGVtZTogRGVmYXVsdFRoZW1lID0ge1xyXG4gIGNvbG9yczoge1xyXG4gICAgcHJpbWFyeTogJyMzQjgyRjYnLFxyXG4gICAgcHJpbWFyeURhcms6ICcjMjU2M0VCJyxcclxuICAgIHNlY29uZGFyeTogJyM2QjcyODAnLFxyXG4gICAgYmFja2dyb3VuZDoge1xyXG4gICAgICBwcmltYXJ5OiAnI0ZGRkZGRicsXHJcbiAgICAgIHNlY29uZGFyeTogJyNGOUZBRkInXHJcbiAgICB9LFxyXG4gICAgdGV4dDoge1xyXG4gICAgICBwcmltYXJ5OiAnIzFGMjkzNycsXHJcbiAgICAgIHNlY29uZGFyeTogJyM2QjcyODAnXHJcbiAgICB9LFxyXG4gICAgYm9yZGVyOiAnI0U1RTdFQicsXHJcbiAgICBlcnJvcjogJyNFRjQ0NDQnLFxyXG4gICAgc3VjY2VzczogJyMxMEI5ODEnLFxyXG4gICAgZGlzYWJsZWQ6ICcjOUNBM0FGJ1xyXG4gIH0sXHJcbiAgc3BhY2luZzoge1xyXG4gICAgeHM6ICcwLjI1cmVtJyxcclxuICAgIHNtOiAnMC41cmVtJyxcclxuICAgIG1kOiAnMXJlbScsXHJcbiAgICBsZzogJzEuNXJlbScsXHJcbiAgICB4bDogJzJyZW0nXHJcbiAgfSxcclxuICBzaGFkb3dzOiB7XHJcbiAgICBzbTogJzAgMXB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4wNSknLFxyXG4gICAgbWQ6ICcwIDRweCA2cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMSknLFxyXG4gICAgbGc6ICcwIDEwcHggMTVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4xKSdcclxuICB9LFxyXG4gIHRyYW5zaXRpb25zOiB7XHJcbiAgICBmYXN0OiAnMTUwbXMgZWFzZScsXHJcbiAgICBub3JtYWw6ICczMDBtcyBlYXNlJyxcclxuICAgIHNsb3c6ICc1MDBtcyBlYXNlJ1xyXG4gIH0sXHJcbiAgZm9udHM6IHtcclxuICAgIHNhbnM6ICdJbnRlciwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgXCJPcGVuIFNhbnNcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmJ1xyXG4gIH0sXHJcbiAgYnJlYWtwb2ludHM6IHtcclxuICAgIHNtOiAnNjQwcHgnLFxyXG4gICAgbWQ6ICc3NjhweCcsXHJcbiAgICBsZzogJzEwMjRweCcsXHJcbiAgICB4bDogJzEyODBweCcsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRoZW1lOyAiXSwibmFtZXMiOlsidGhlbWUiLCJjb2xvcnMiLCJwcmltYXJ5IiwicHJpbWFyeURhcmsiLCJzZWNvbmRhcnkiLCJiYWNrZ3JvdW5kIiwidGV4dCIsImJvcmRlciIsImVycm9yIiwic3VjY2VzcyIsImRpc2FibGVkIiwic3BhY2luZyIsInhzIiwic20iLCJtZCIsImxnIiwieGwiLCJzaGFkb3dzIiwidHJhbnNpdGlvbnMiLCJmYXN0Iiwibm9ybWFsIiwic2xvdyIsImZvbnRzIiwic2FucyIsImJyZWFrcG9pbnRzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/styles/theme.ts\n");

/***/ }),

/***/ "@fortawesome/fontawesome-svg-core":
/*!****************************************************!*\
  !*** external "@fortawesome/fontawesome-svg-core" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@fortawesome/fontawesome-svg-core");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("styled-components");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/@fortawesome"], () => (__webpack_exec__("(pages-dir-node)/./src/pages/_app.tsx")));
module.exports = __webpack_exports__;

})();