const Ge = () => Promise.resolve().then(() => Ue), { Fragment: Qe, jsx: e, jsxs: t } = globalThis.__GLOBALS__.ReactJSXRuntime;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
globalThis.__GLOBALS__.React.Children;
globalThis.__GLOBALS__.React.cloneElement;
({
  ...globalThis.__GLOBALS__.React
});
const { Component: We, createContext: Ze, createElement: _, createFactory: Xe, createRef: Je, forwardRef: R, Fragment: Ke, isValidElement: Ye, lazy: et, memo: tt, Profiler: at, PureComponent: rt, startTransition: st, StrictMode: lt, Suspense: ct, use: it, useCallback: dt, useContext: nt, useDebugValue: ot, useDeferredValue: ht, useEffect: mt, useId: xt, useImperativeHandle: pt, useInsertionEffect: yt, useLayoutEffect: gt, useMemo: bt, useReducer: ut, useRef: Nt, useState: x, useSyncExternalStore: ft, useTransition: vt, version: wt, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: kt } = globalThis.__GLOBALS__.React;
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z = (r) => r.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), H = (r) => r.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (i, s, a) => a ? a.toUpperCase() : s.toLowerCase()
), L = (r) => {
  const i = H(r);
  return i.charAt(0).toUpperCase() + i.slice(1);
}, V = (...r) => r.filter((i, s, a) => !!i && i.trim() !== "" && a.indexOf(i) === s).join(" ").trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var P = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U = R(
  ({
    color: r = "currentColor",
    size: i = 24,
    strokeWidth: s = 2,
    absoluteStrokeWidth: a,
    className: l = "",
    children: m,
    iconNode: h,
    ...c
  }, o) => _(
    "svg",
    {
      ref: o,
      ...P,
      width: i,
      height: i,
      stroke: r,
      strokeWidth: a ? Number(s) * 24 / Number(i) : s,
      className: V("lucide", l),
      ...c
    },
    [
      ...h.map(([d, p]) => _(d, p)),
      ...Array.isArray(m) ? m : [m]
    ]
  )
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n = (r, i) => {
  const s = R(
    ({ className: a, ...l }, m) => _(U, {
      ref: m,
      iconNode: i,
      className: V(
        `lucide-${z(L(r))}`,
        `lucide-${r}`,
        a
      ),
      ...l
    })
  );
  return s.displayName = L(r), s;
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
], C = n("archive", G);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
], O = n("arrow-down", Q);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W = [
  ["path", { d: "m16 3 4 4-4 4", key: "1x1c3m" }],
  ["path", { d: "M20 7H4", key: "zbl0bi" }],
  ["path", { d: "m8 21-4-4 4-4", key: "h9nckh" }],
  ["path", { d: "M4 17h16", key: "g4d7ey" }]
], j = n("arrow-right-left", W);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
], E = n("arrow-up", Z);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], J = n("bell", X);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], u = n("calendar", K);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
], ee = n("chart-column", Y);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const te = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], N = n("circle-alert", te);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ae = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], re = n("circle-check-big", ae);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const se = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m9 14 2 2 4-4", key: "df797q" }]
], S = n("clipboard-check", se);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const le = [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
], $ = n("download", le);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ce = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], b = n("file-text", ce);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ie = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
], v = n("flask-conical", ie);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const de = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], q = n("layout-dashboard", de);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ne = [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
], oe = n("log-out", ne);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const he = [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
], me = n("menu", he);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xe = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
], y = n("package", xe);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pe = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], M = n("plus", pe);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ye = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], f = n("search", ye);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ge = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], be = n("settings", ge);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ue = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
], F = n("square-pen", ue);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ne = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
], g = n("trash-2", Ne);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fe = [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
], w = n("trending-up", fe);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ve = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], A = n("triangle-alert", ve);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const we = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
], ke = n("user", we);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _e = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
], Ce = n("users", _e);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $e = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi"
    }
  ]
], Me = n("wrench", $e);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Le = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], je = n("x", Le);
function Se({ onAuthSuccess: r }) {
  const [i, s] = x(null), [a, l] = x(""), [m, h] = x(""), [c, o] = x(""), [d, p] = x(!1), [f, q] = x(""), [k, M] = x(!1), g = {
    irk: "Кладовщик ИРК",
    "tool-warehouse": "Кладовщик инструментального склада",
    laboratory: "Лаборант"
  }, F = async (u) => {
    u.preventDefault(), o(""), p(!0);
    try {
      const E = await fetch(k ? "/api/auth/register" : "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: i,
          login: a,
          password: m,
          fullName: k ? f : void 0
        })
      }), B = await E.json();
      if (!E.ok)
        throw new Error(B.error || "Ошибка входа");
      r(B.user), s(null), l(""), h(""), q(""), M(!1);
    } catch (E) {
      o(E.message || "Ошибка входа");
    } finally {
      p(!1);
    }
  };
  return /* @__PURE__ */ t("div", { className: "min-h-screen bg-white flex flex-col", children: [
    /* @__PURE__ */ e("header", { className: "bg-[#0d9488] border-b border-[#0f766e]", children: /* @__PURE__ */ e("div", { className: "max-w-7xl mx-auto px-6 py-6", children: /* @__PURE__ */ e("h1", { className: "text-white text-2xl", children: "Информационная система учета инструментов" }) }) }),
    /* @__PURE__ */ e("main", { className: "flex-1 flex items-center justify-center px-6 py-12", children: /* @__PURE__ */ t("div", { className: "w-full max-w-4xl", children: [
      /* @__PURE__ */ t("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ e("h2", { className: "text-3xl text-gray-900 mb-3", children: "Выберите профиль" }),
        /* @__PURE__ */ e("p", { className: "text-gray-600", children: "Выберите роль для работы с системой" })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        {
          id: "irk",
          title: "Кладовщик ИРК",
          description: "Учет измерительных и слесарно-монтажных инструментов",
          icon: y
        },
        {
          id: "tool-warehouse",
          title: "Кладовщик инструментального склада",
          description: "Управление общим инструментальным складом",
          icon: Me
        },
        {
          id: "laboratory",
          title: "Лаборант",
          description: "Работа с поверкой и калибровкой оборудования",
          icon: v
        }
      ].map((u) => {
        const E = u.icon;
        return /* @__PURE__ */ t(
          "button",
          {
            onClick: () => {
              s(u.id), l(""), h(""), o("");
            },
            className: "group bg-white border-2 border-gray-200 p-8 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all text-left",
            children: [
              /* @__PURE__ */ e("div", { className: "w-14 h-14 bg-[#f0fdfa] flex items-center justify-center mb-6 group-hover:bg-[#0d9488] transition-colors", children: /* @__PURE__ */ e(E, { className: "w-7 h-7 text-[#0d9488] group-hover:text-white" }) }),
              /* @__PURE__ */ e("h3", { className: "text-lg text-gray-900 mb-2", children: u.title }),
              /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: u.description })
            ]
          },
          u.id
        );
      }) })
    ] }) }),
    i && /* @__PURE__ */ e("div", { className: "fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50", children: /* @__PURE__ */ t("div", { className: "w-full max-w-md bg-white border border-gray-200 p-6", children: [
      /* @__PURE__ */ e("h3", { className: "text-xl text-gray-900 mb-2", children: k ? "Регистрация" : "Вход в систему" }),
      /* @__PURE__ */ t("p", { className: "text-sm text-gray-600 mb-5", children: [
        "Выбран профиль: ",
        g[i]
      ] }),
      /* @__PURE__ */ t("form", { onSubmit: F, className: "space-y-4", children: [
        k && /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-1", children: "ФИО" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: f,
              onChange: (u) => q(u.target.value),
              className: "w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/40",
              placeholder: "Введите ФИО",
              required: !0
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-1", children: "Логин" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: a,
              onChange: (u) => l(u.target.value),
              className: "w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/40",
              placeholder: "Введите логин",
              required: !0
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-1", children: "Пароль" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "password",
              value: m,
              onChange: (u) => h(u.target.value),
              className: "w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/40",
              placeholder: "Введите пароль",
              required: !0
            }
          )
        ] }),
        c && /* @__PURE__ */ e("p", { className: "text-sm text-red-600", children: c }),
        /* @__PURE__ */ e("button", { type: "button", onClick: () => {
          o(""), q(""), M(!k);
        }, className: "text-sm text-[#0d9488] hover:text-[#0f766e] underline underline-offset-2", children: k ? "У меня уже есть аккаунт" : "Зарегистрироваться" }),
        /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-3 pt-2", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => (s(null), o(""), q(""), M(!1)),
              className: "px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors",
              children: "Отмена"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "submit",
              disabled: d,
              className: "px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] disabled:opacity-70 transition-colors",
              children: d ? (k ? "Регистрируем..." : "Входим...") : k ? "Зарегистрироваться" : "Войти"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
function T() {
  const r = [
    { title: "Всего инструментов", value: "1,248", change: "+12%", icon: y, color: "bg-blue-500" },
    { title: "Выдано сегодня", value: "87", change: "+5%", icon: Ce, color: "bg-green-500" },
    { title: "На поверке", value: "23", change: "0%", icon: u, color: "bg-yellow-500" },
    { title: "Требует внимания", value: "8", change: "+2", icon: N, color: "bg-red-500" }
  ], i = [
    { id: 1, type: "Выдача", instrument: "Штангенциркуль ШЦ-I-150", employee: "Иванов И.И.", time: "10:30" },
    { id: 2, type: "Возврат", instrument: "Микрометр МК-25", employee: "Петров П.П.", time: "10:15" },
    { id: 3, type: "Выдача", instrument: "Ключ гаечный 17мм", employee: "Сидоров С.С.", time: "09:45" },
    { id: 4, type: "Поступление", instrument: "Отвертка шлицевая 5мм", employee: "Система", time: "09:30" }
  ], s = [
    { id: 1, instrument: "Штангенциркуль ШЦ-I-150", invNumber: "ИН-001234", dueDate: "15.04.2026", daysLeft: 13 },
    { id: 2, instrument: "Микрометр МК-25", invNumber: "ИН-001235", dueDate: "18.04.2026", daysLeft: 16 },
    { id: 3, instrument: "Калибр-пробка", invNumber: "ИН-001236", dueDate: "20.04.2026", daysLeft: 18 }
  ];
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl text-gray-900", children: "Панель управления" }),
      /* @__PURE__ */ e("p", { className: "text-gray-600 mt-1", children: "Обзор состояния инструментального хозяйства" })
    ] }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: r.map((a) => {
      const l = a.icon;
      return /* @__PURE__ */ e("div", { className: "bg-white border border-gray-200 p-6", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: a.title }),
          /* @__PURE__ */ e("p", { className: "text-3xl text-gray-900 mt-2", children: a.value }),
          /* @__PURE__ */ t("p", { className: "text-sm text-[#0d9488] mt-2", children: [
            a.change,
            " за месяц"
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "bg-[#f0fdfa] p-3", children: /* @__PURE__ */ e(l, { className: "w-6 h-6 text-[#0d9488]" }) })
      ] }) }, a.title);
    }) }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200", children: [
        /* @__PURE__ */ e("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ e("h3", { className: "text-lg text-gray-900", children: "Последние операции" }) }),
        /* @__PURE__ */ e("div", { className: "p-6", children: /* @__PURE__ */ e("div", { className: "space-y-4", children: i.map((a) => /* @__PURE__ */ t("div", { className: "flex items-center justify-between py-3 border-b border-gray-100 last:border-0", children: [
          /* @__PURE__ */ t("div", { className: "flex-1", children: [
            /* @__PURE__ */ e("p", { className: "text-gray-900", children: a.instrument }),
            /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: a.employee })
          ] }),
          /* @__PURE__ */ t("div", { className: "text-right", children: [
            /* @__PURE__ */ e("span", { className: `inline-block px-3 py-1 text-xs ${a.type === "Выдача" ? "bg-[#e0f2f1] text-[#0d9488]" : a.type === "Возврат" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-700"}`, children: a.type }),
            /* @__PURE__ */ e("p", { className: "text-sm text-gray-500 mt-1", children: a.time })
          ] })
        ] }, a.id)) }) })
      ] }),
      /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200", children: [
        /* @__PURE__ */ e("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ e("h3", { className: "text-lg text-gray-900", children: "Предстоящие поверки" }) }),
        /* @__PURE__ */ e("div", { className: "p-6", children: /* @__PURE__ */ e("div", { className: "space-y-4", children: s.map((a) => /* @__PURE__ */ t("div", { className: "flex items-center justify-between py-3 border-b border-gray-100 last:border-0", children: [
          /* @__PURE__ */ t("div", { className: "flex-1", children: [
            /* @__PURE__ */ e("p", { className: "text-gray-900", children: a.instrument }),
            /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: a.invNumber })
          ] }),
          /* @__PURE__ */ t("div", { className: "text-right", children: [
            /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: a.dueDate }),
            /* @__PURE__ */ t("p", { className: `text-sm mt-1 ${a.daysLeft < 7 ? "text-red-600" : a.daysLeft < 14 ? "text-yellow-600" : "text-gray-600"}`, children: [
              "Через ",
              a.daysLeft,
              " дней"
            ] })
          ] })
        ] }, a.id)) }) })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200 p-6", children: [
      /* @__PURE__ */ e("h3", { className: "text-lg text-gray-900 mb-4", children: "Быстрые действия" }),
      /* @__PURE__ */ t("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ t("button", { className: "p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all", children: [
          /* @__PURE__ */ e(y, { className: "w-8 h-8 text-[#0d9488] mx-auto mb-2" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Выдать инструмент" })
        ] }),
        /* @__PURE__ */ t("button", { className: "p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all", children: [
          /* @__PURE__ */ e(w, { className: "w-8 h-8 text-[#0d9488] mx-auto mb-2" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Принять возврат" })
        ] }),
        /* @__PURE__ */ t("button", { className: "p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all", children: [
          /* @__PURE__ */ e(u, { className: "w-8 h-8 text-[#0d9488] mx-auto mb-2" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Отправить на поверку" })
        ] }),
        /* @__PURE__ */ t("button", { className: "p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all", children: [
          /* @__PURE__ */ e(N, { className: "w-8 h-8 text-[#0d9488] mx-auto mb-2" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Списать инструмент" })
        ] })
      ] })
    ] })
  ] });
}
function qe() {
  const [r, i] = x(""), [s, a] = x("all"), [l, m] = x(!1), h = [
    {
      id: 1,
      name: "Штангенциркуль ШЦ-I-150",
      type: "measuring",
      category: "Измерительный",
      invNumber: "ИН-001234",
      status: "available",
      location: "ИРК Цех №1",
      nextVerification: "15.04.2026"
    },
    {
      id: 2,
      name: "Микрометр МК-25",
      type: "measuring",
      category: "Измерительный",
      invNumber: "ИН-001235",
      status: "issued",
      location: "У рабочего: Иванов И.И.",
      nextVerification: "18.04.2026"
    },
    {
      id: 3,
      name: "Ключ гаечный 17мм",
      type: "locksmith",
      category: "Слесарно-монтажный",
      quantity: 25,
      status: "available",
      location: "ИРК Цех №1"
    },
    {
      id: 4,
      name: "Отвертка шлицевая 5мм",
      type: "locksmith",
      category: "Слесарно-монтажный",
      quantity: 5,
      status: "low-stock",
      location: "ИРК Цех №1"
    },
    {
      id: 5,
      name: "Калибр-пробка",
      type: "measuring",
      category: "Измерительный",
      invNumber: "ИН-001236",
      status: "verification",
      location: "Метрологическая лаборатория",
      nextVerification: "20.04.2026"
    }
  ], c = (d) => ({
    available: { text: "В наличии", className: "bg-green-50 text-green-700" },
    issued: { text: "Выдан", className: "bg-[#e0f2f1] text-[#0d9488]" },
    verification: { text: "На поверке", className: "bg-yellow-50 text-yellow-700" },
    "low-stock": { text: "Мало остатков", className: "bg-red-50 text-red-700" }
  })[d], o = h.filter((d) => {
    const p = d.name.toLowerCase().includes(r.toLowerCase()), B = s === "all" || d.type === s;
    return p && B;
  });
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h2", { className: "text-2xl text-gray-900", children: "Инструменты" }),
        /* @__PURE__ */ e("p", { className: "text-gray-600 mt-1", children: "Управление каталогом инструментов" })
      ] }),
      /* @__PURE__ */ t(
        "button",
        {
          onClick: () => m(!0),
          className: "flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] transition-colors",
          children: [
            /* @__PURE__ */ e(M, { className: "w-5 h-5" }),
            "Добавить инструмент"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { className: "bg-white border border-gray-200 p-4", children: /* @__PURE__ */ t("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ t("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ e(f, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Поиск по наименованию...",
            value: r,
            onChange: (d) => i(d.target.value),
            className: "w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => a("all"),
            className: `px-4 py-2 border ${s === "all" ? "bg-[#0d9488] text-white border-[#0d9488]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`,
            children: "Все"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => a("measuring"),
            className: `px-4 py-2 border ${s === "measuring" ? "bg-[#0d9488] text-white border-[#0d9488]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`,
            children: "Измерительный"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => a("locksmith"),
            className: `px-4 py-2 border ${s === "locksmith" ? "bg-[#0d9488] text-white border-[#0d9488]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`,
            children: "Слесарный"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ e("div", { className: "bg-white border border-gray-200 overflow-hidden", children: /* @__PURE__ */ t("table", { className: "w-full", children: [
      /* @__PURE__ */ e("thead", { className: "bg-gray-50 border-b border-gray-200", children: /* @__PURE__ */ t("tr", { children: [
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Наименование" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Категория" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Инв. номер / Кол-во" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Статус" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Местонахождение" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Поверка" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider", children: "Действия" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { className: "bg-white divide-y divide-gray-200", children: o.map((d) => {
        const p = c(d.status);
        return /* @__PURE__ */ t("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ e("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-900", children: d.name }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: d.category }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-900", children: d.invNumber || `${d.quantity} шт.` }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ e("span", { className: `px-2 py-1 inline-flex text-xs ${p.className}`, children: p.text }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: d.location }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: d.nextVerification || "—" }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ e("button", { className: "text-[#0d9488] hover:text-[#0f766e]", children: /* @__PURE__ */ e(F, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ e("button", { className: "text-red-600 hover:text-red-700", children: /* @__PURE__ */ e(g, { className: "w-4 h-4" }) })
          ] }) })
        ] }, d.id);
      }) })
    ] }) }),
    /* @__PURE__ */ t("div", { className: "bg-[#f0fdfa] border border-[#0d9488] p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ e(N, { className: "w-5 h-5 text-[#0d9488] flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t("p", { className: "text-sm text-gray-900", children: [
          "Всего инструментов: ",
          h.length
        ] }),
        /* @__PURE__ */ t("p", { className: "text-sm text-gray-700 mt-1", children: [
          "В наличии: ",
          h.filter((d) => d.status === "available").length,
          " • Выдано: ",
          h.filter((d) => d.status === "issued").length,
          " • На поверке: ",
          h.filter((d) => d.status === "verification").length
        ] })
      ] })
    ] })
  ] });
}
function Ae() {
  const [r, i] = x("issue"), s = [
    { id: "issue", name: "Выдача инструмента", icon: O, color: "bg-blue-500" },
    { id: "return", name: "Возврат инструмента", icon: E, color: "bg-green-500" },
    { id: "receipt", name: "Поступление", icon: y, color: "bg-purple-500" },
    { id: "writeoff", name: "Списание", icon: g, color: "bg-red-500" }
  ], a = () => {
    switch (r) {
      case "issue":
        return /* @__PURE__ */ e(Te, {});
      case "return":
        return /* @__PURE__ */ e(Ie, {});
      case "receipt":
        return /* @__PURE__ */ e(De, {});
      case "writeoff":
        return /* @__PURE__ */ e(Re, {});
    }
  };
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl text-gray-900", children: "Операции" }),
      /* @__PURE__ */ e("p", { className: "text-gray-600 mt-1", children: "Управление движением инструментов" })
    ] }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: s.map((l) => {
      const m = l.icon, h = r === l.id;
      return /* @__PURE__ */ t(
        "button",
        {
          onClick: () => i(l.id),
          className: `p-6 border-2 transition-all ${h ? "border-[#0d9488] bg-[#f0fdfa]" : "border-gray-200 bg-white hover:border-gray-300"}`,
          children: [
            /* @__PURE__ */ e("div", { className: "bg-[#f0fdfa] w-12 h-12 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ e(m, { className: "w-6 h-6 text-[#0d9488]" }) }),
            /* @__PURE__ */ e("p", { className: `text-center ${h ? "text-[#0d9488]" : "text-gray-900"}`, children: l.name })
          ]
        },
        l.id
      );
    }) }),
    /* @__PURE__ */ e("div", { className: "bg-white border border-gray-200 p-6", children: a() })
  ] });
}
function Te() {
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ e("h3", { className: "text-xl text-gray-900", children: "Выдача инструмента" }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Работник" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Поиск по ФИО или табельному номеру...",
            className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          }
        ),
        /* @__PURE__ */ t("div", { className: "mt-2 p-3 bg-gray-50", children: [
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Иванов Иван Иванович" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: "Таб. №12345 • Участок №1 • Слесарь" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Инструмент" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Поиск инструмента...",
            className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "border-t border-gray-200 pt-4", children: [
      /* @__PURE__ */ e("h4", { className: "text-sm text-gray-900 mb-3", children: "Выбранные инструменты" }),
      /* @__PURE__ */ t("div", { className: "space-y-2", children: [
        /* @__PURE__ */ t("div", { className: "flex items-center justify-between p-3 bg-gray-50", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("p", { className: "text-gray-900", children: "Штангенциркуль ШЦ-I-150" }),
            /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: "Инв. номер: ИН-001234" })
          ] }),
          /* @__PURE__ */ e("button", { className: "text-red-600 hover:text-red-700", children: /* @__PURE__ */ e(g, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex items-center justify-between p-3 bg-gray-50", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("p", { className: "text-gray-900", children: "Ключ гаечный 17мм" }),
            /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: "Количество: 2 шт." })
          ] }),
          /* @__PURE__ */ e("button", { className: "text-red-600 hover:text-red-700", children: /* @__PURE__ */ e(g, { className: "w-5 h-5" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex gap-4 justify-end", children: [
      /* @__PURE__ */ e("button", { className: "px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors", children: "Отмена" }),
      /* @__PURE__ */ e("button", { className: "px-6 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] transition-colors", children: "Выдать инструменты" })
    ] })
  ] });
}
function Ie() {
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ e("h3", { className: "text-xl text-gray-900", children: "Возврат инструмента" }),
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Работник" }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          placeholder: "Поиск по ФИО или табельному номеру...",
          className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { className: "border-t border-gray-200 pt-4", children: [
      /* @__PURE__ */ e("h4", { className: "text-sm text-gray-900 mb-3", children: "Инструменты на руках" }),
      /* @__PURE__ */ t("div", { className: "space-y-2", children: [
        /* @__PURE__ */ t("div", { className: "flex items-center gap-3 p-3 bg-gray-50", children: [
          /* @__PURE__ */ e("input", { type: "checkbox", className: "w-4 h-4 text-[#0d9488]" }),
          /* @__PURE__ */ t("div", { className: "flex-1", children: [
            /* @__PURE__ */ e("p", { className: "text-gray-900", children: "Штангенциркуль ШЦ-I-150" }),
            /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: "Инв. номер: ИН-001234 • Выдан: 02.04.2026 10:30" })
          ] }),
          /* @__PURE__ */ t("select", { className: "px-3 py-1 border border-gray-300 text-sm", children: [
            /* @__PURE__ */ e("option", { children: "Исправен" }),
            /* @__PURE__ */ e("option", { children: "Поврежден" }),
            /* @__PURE__ */ e("option", { children: "Требует поверки" })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-3 p-3 bg-gray-50", children: [
          /* @__PURE__ */ e("input", { type: "checkbox", className: "w-4 h-4 text-[#0d9488]" }),
          /* @__PURE__ */ t("div", { className: "flex-1", children: [
            /* @__PURE__ */ e("p", { className: "text-gray-900", children: "Ключ гаечный 17мм" }),
            /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: "Количество: 2 шт. • Выдан: 02.04.2026 10:30" })
          ] }),
          /* @__PURE__ */ t("select", { className: "px-3 py-1 border border-gray-300 text-sm", children: [
            /* @__PURE__ */ e("option", { children: "Исправен" }),
            /* @__PURE__ */ e("option", { children: "Поврежден" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex gap-4 justify-end", children: [
      /* @__PURE__ */ e("button", { className: "px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors", children: "Отмена" }),
      /* @__PURE__ */ e("button", { className: "px-6 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] transition-colors", children: "Принять возврат" })
    ] })
  ] });
}
function De() {
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ e("h3", { className: "text-xl text-gray-900", children: "Поступление инструмента" }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Документ-основание" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Номер накладной...",
            className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Дата поступления" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "date",
            defaultValue: "2026-04-02",
            className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Инструменты" }),
      /* @__PURE__ */ e("div", { className: "space-y-3", children: /* @__PURE__ */ t("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Наименование",
            className: "flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          }
        ),
        /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            placeholder: "Кол-во",
            className: "w-24 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          }
        ),
        /* @__PURE__ */ e("button", { className: "px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e]", children: "Добавить" })
      ] }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "border-t border-gray-200 pt-4", children: [
      /* @__PURE__ */ e("h4", { className: "text-sm text-gray-900 mb-3", children: "Добавленные позиции" }),
      /* @__PURE__ */ e("div", { className: "space-y-2", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-between p-3 bg-gray-50", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("p", { className: "text-gray-900", children: "Отвертка шлицевая 5мм" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: "Количество: 10 шт." })
        ] }),
        /* @__PURE__ */ e("button", { className: "text-red-600 hover:text-red-700", children: /* @__PURE__ */ e(g, { className: "w-5 h-5" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex gap-4 justify-end", children: [
      /* @__PURE__ */ e("button", { className: "px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors", children: "Отмена" }),
      /* @__PURE__ */ e("button", { className: "px-6 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] transition-colors", children: "Оприходовать" })
    ] })
  ] });
}
function Re() {
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ e("h3", { className: "text-xl text-gray-900", children: "Списание инструмента" }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Инструмент" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Поиск инструмента...",
            className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Причина списания" }),
        /* @__PURE__ */ t("select", { className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]", children: [
          /* @__PURE__ */ e("option", { children: "Износ" }),
          /* @__PURE__ */ e("option", { children: "Поломка" }),
          /* @__PURE__ */ e("option", { children: "Утрата" }),
          /* @__PURE__ */ e("option", { children: "Непригоден после поверки" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Документ-основание" }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          placeholder: "Номер акта...",
          className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Комментарий" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          rows: 3,
          placeholder: "Дополнительная информация...",
          className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { className: "bg-yellow-50 border border-yellow-200 p-4", children: /* @__PURE__ */ t("p", { className: "text-sm text-yellow-900", children: [
      /* @__PURE__ */ e("strong", { children: "Внимание:" }),
      " После списания инструмент будет исключен из учета и не сможет быть восстановлен."
    ] }) }),
    /* @__PURE__ */ t("div", { className: "flex gap-4 justify-end", children: [
      /* @__PURE__ */ e("button", { className: "px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors", children: "Отмена" }),
      /* @__PURE__ */ e("button", { className: "px-6 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors", children: "Списать инструмент" })
    ] })
  ] });
}
function k() {
  const [r, i] = x("inventory"), s = [
    { id: "inventory", name: "Инвентаризация", icon: b, color: "bg-blue-500" },
    { id: "movements", name: "Движение инструментов", icon: w, color: "bg-green-500" },
    { id: "verification", name: "График поверок", icon: u, color: "bg-yellow-500" },
    { id: "analytics", name: "Аналитика", icon: ee, color: "bg-purple-500" }
  ], a = () => {
    switch (r) {
      case "inventory":
        return /* @__PURE__ */ e(Ve, {});
      case "movements":
        return /* @__PURE__ */ e(Oe, {});
      case "verification":
        return /* @__PURE__ */ e(Ee, {});
      case "analytics":
        return /* @__PURE__ */ e(Fe, {});
    }
  };
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl text-gray-900", children: "Отчеты" }),
      /* @__PURE__ */ e("p", { className: "text-gray-600 mt-1", children: "Формирование отчетности и аналитики" })
    ] }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: s.map((l) => {
      const m = l.icon, h = r === l.id;
      return /* @__PURE__ */ t(
        "button",
        {
          onClick: () => i(l.id),
          className: `p-6 border-2 transition-all ${h ? "border-[#0d9488] bg-[#f0fdfa]" : "border-gray-200 bg-white hover:border-gray-300"}`,
          children: [
            /* @__PURE__ */ e("div", { className: "bg-[#f0fdfa] w-12 h-12 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ e(m, { className: "w-6 h-6 text-[#0d9488]" }) }),
            /* @__PURE__ */ e("p", { className: `text-center ${h ? "text-[#0d9488]" : "text-gray-900"}`, children: l.name })
          ]
        },
        l.id
      );
    }) }),
    a()
  ] });
}
function Ve() {
  return /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200 p-6 space-y-6", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ e("h3", { className: "text-xl text-gray-900", children: "Отчет по инвентаризации" }),
      /* @__PURE__ */ t("button", { className: "flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e]", children: [
        /* @__PURE__ */ e($, { className: "w-4 h-4" }),
        "Экспорт в Excel"
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Дата начала" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "date",
            defaultValue: "2026-04-01",
            className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Дата окончания" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "date",
            defaultValue: "2026-04-02",
            className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Категория" }),
        /* @__PURE__ */ t("select", { className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]", children: [
          /* @__PURE__ */ e("option", { children: "Все категории" }),
          /* @__PURE__ */ e("option", { children: "Измерительный" }),
          /* @__PURE__ */ e("option", { children: "Слесарно-монтажный" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "border overflow-hidden", children: /* @__PURE__ */ t("table", { className: "w-full", children: [
      /* @__PURE__ */ e("thead", { className: "bg-gray-50", children: /* @__PURE__ */ t("tr", { children: [
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Наименование" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Категория" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Остаток на начало" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Поступило" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Списано" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Остаток на конец" })
      ] }) }),
      /* @__PURE__ */ t("tbody", { className: "divide-y divide-gray-200", children: [
        /* @__PURE__ */ t("tr", { children: [
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "Штангенциркуль ШЦ-I-150" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-600", children: "Измерительный" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "15" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-green-600", children: "+2" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-red-600", children: "-1" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "16" })
        ] }),
        /* @__PURE__ */ t("tr", { children: [
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "Ключ гаечный 17мм" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-600", children: "Слесарный" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "30" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-green-600", children: "+5" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-red-600", children: "-10" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "25" })
        ] }),
        /* @__PURE__ */ t("tr", { children: [
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "Микрометр МК-25" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-600", children: "Измерительный" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "10" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-green-600", children: "+0" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-red-600", children: "-0" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "10" })
        ] })
      ] })
    ] }) })
  ] });
}
function Oe() {
  return /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200 p-6 space-y-6", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ e("h3", { className: "text-xl text-gray-900", children: "Движение инструментов" }),
      /* @__PURE__ */ t("button", { className: "flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e]", children: [
        /* @__PURE__ */ e($, { className: "w-4 h-4" }),
        "Экспорт в Excel"
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Период" }),
        /* @__PURE__ */ t("select", { className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]", children: [
          /* @__PURE__ */ e("option", { children: "Сегодня" }),
          /* @__PURE__ */ e("option", { children: "Вчера" }),
          /* @__PURE__ */ e("option", { children: "Последние 7 дней" }),
          /* @__PURE__ */ e("option", { children: "Последние 30 дней" }),
          /* @__PURE__ */ e("option", { children: "Произвольный период" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Тип операции" }),
        /* @__PURE__ */ t("select", { className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]", children: [
          /* @__PURE__ */ e("option", { children: "Все операции" }),
          /* @__PURE__ */ e("option", { children: "Выдача" }),
          /* @__PURE__ */ e("option", { children: "Возврат" }),
          /* @__PURE__ */ e("option", { children: "Поступление" }),
          /* @__PURE__ */ e("option", { children: "Списание" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "border overflow-hidden", children: /* @__PURE__ */ t("table", { className: "w-full", children: [
      /* @__PURE__ */ e("thead", { className: "bg-gray-50", children: /* @__PURE__ */ t("tr", { children: [
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Дата и время" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Тип операции" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Инструмент" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Сотрудник" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Количество" })
      ] }) }),
      /* @__PURE__ */ t("tbody", { className: "divide-y divide-gray-200", children: [
        /* @__PURE__ */ t("tr", { children: [
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "02.04.2026 10:30" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("span", { className: "px-2 py-1 text-xs bg-[#e0f2f1] text-[#0d9488]", children: "Выдача" }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "Штангенциркуль ШЦ-I-150" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-600", children: "Иванов И.И." }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "1" })
        ] }),
        /* @__PURE__ */ t("tr", { children: [
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "02.04.2026 10:15" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("span", { className: "px-2 py-1 text-xs bg-blue-50 text-blue-700", children: "Возврат" }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "Микрометр МК-25" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-600", children: "Петров П.П." }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "1" })
        ] }),
        /* @__PURE__ */ t("tr", { children: [
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "02.04.2026 09:45" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("span", { className: "px-2 py-1 text-xs bg-[#e0f2f1] text-[#0d9488]", children: "Выдача" }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "Ключ гаечный 17мм" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-600", children: "Сидоров С.С." }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "2" })
        ] })
      ] })
    ] }) })
  ] });
}
function Ee() {
  return /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200 p-6 space-y-6", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ e("h3", { className: "text-xl text-gray-900", children: "График поверок мерительного инструмента" }),
      /* @__PURE__ */ t("button", { className: "flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e]", children: [
        /* @__PURE__ */ e($, { className: "w-4 h-4" }),
        "Экспорт в Excel"
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Период" }),
        /* @__PURE__ */ t("select", { className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]", children: [
          /* @__PURE__ */ e("option", { children: "Текущий месяц" }),
          /* @__PURE__ */ e("option", { children: "Следующий месяц" }),
          /* @__PURE__ */ e("option", { children: "Следующие 3 месяца" }),
          /* @__PURE__ */ e("option", { children: "Весь год" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-sm text-gray-700 mb-2", children: "Статус" }),
        /* @__PURE__ */ t("select", { className: "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]", children: [
          /* @__PURE__ */ e("option", { children: "Все" }),
          /* @__PURE__ */ e("option", { children: "Просрочено" }),
          /* @__PURE__ */ e("option", { children: "Предстоит в течение 7 дней" }),
          /* @__PURE__ */ e("option", { children: "Предстоит в течение 30 дней" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "border overflow-hidden", children: /* @__PURE__ */ t("table", { className: "w-full", children: [
      /* @__PURE__ */ e("thead", { className: "bg-gray-50", children: /* @__PURE__ */ t("tr", { children: [
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Инструмент" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Инв. номер" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Последняя поверка" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Следующая поверка" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase", children: "Статус" })
      ] }) }),
      /* @__PURE__ */ t("tbody", { className: "divide-y divide-gray-200", children: [
        /* @__PURE__ */ t("tr", { children: [
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "Штангенциркуль ШЦ-I-150" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-600", children: "ИН-001234" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "15.04.2025" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "15.04.2026" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("span", { className: "px-2 py-1 text-xs bg-yellow-50 text-yellow-700", children: "Через 13 дней" }) })
        ] }),
        /* @__PURE__ */ t("tr", { children: [
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "Микрометр МК-25" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-600", children: "ИН-001235" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "18.04.2025" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "18.04.2026" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("span", { className: "px-2 py-1 text-xs bg-green-50 text-green-700", children: "Через 16 дней" }) })
        ] }),
        /* @__PURE__ */ t("tr", { children: [
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "Калибр-пробка" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-600", children: "ИН-001236" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "28.03.2026" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-sm text-gray-900", children: "01.04.2026" }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("span", { className: "px-2 py-1 text-xs bg-red-50 text-red-700", children: "Просрочено на 1 день" }) })
        ] })
      ] })
    ] }) })
  ] });
}
function Fe() {
  return /* @__PURE__ */ e("div", { className: "space-y-6", children: /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200 p-6", children: [
    /* @__PURE__ */ e("h3", { className: "text-xl text-gray-900 mb-4", children: "Аналитика использования инструментов" }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [
      /* @__PURE__ */ t("div", { className: "p-4 bg-[#f0fdfa] border border-[#0d9488]", children: [
        /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: "Средняя частота выдачи" }),
        /* @__PURE__ */ e("p", { className: "text-2xl text-gray-900 mt-2", children: "47 шт/день" }),
        /* @__PURE__ */ e("p", { className: "text-sm text-[#0d9488] mt-1", children: "+12% к прошлому месяцу" })
      ] }),
      /* @__PURE__ */ t("div", { className: "p-4 bg-green-50 border border-green-200", children: [
        /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: "Коэффициент возврата" }),
        /* @__PURE__ */ e("p", { className: "text-2xl text-gray-900 mt-2", children: "98.5%" }),
        /* @__PURE__ */ e("p", { className: "text-sm text-green-600 mt-1", children: "Высокий показатель" })
      ] }),
      /* @__PURE__ */ t("div", { className: "p-4 bg-gray-50 border border-gray-200", children: [
        /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: "Среднее время использования" }),
        /* @__PURE__ */ e("p", { className: "text-2xl text-gray-900 mt-2", children: "6.2 часа" }),
        /* @__PURE__ */ e("p", { className: "text-sm text-gray-600 mt-1", children: "За смену" })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "border-t pt-4", children: [
      /* @__PURE__ */ e("h4", { className: "text-gray-900 mb-3", children: "Топ-5 наиболее используемых инструментов" }),
      /* @__PURE__ */ e("div", { className: "space-y-3", children: [
        { name: "Ключ гаечный 17мм", count: 156, percent: 85 },
        { name: "Отвертка шлицевая 5мм", count: 142, percent: 75 },
        { name: "Штангенциркуль ШЦ-I-150", count: 98, percent: 55 },
        { name: "Молоток слесарный", count: 87, percent: 45 },
        { name: "Пассатижи", count: 76, percent: 40 }
      ].map((r, i) => /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t("div", { className: "flex justify-between text-sm mb-1", children: [
          /* @__PURE__ */ e("span", { className: "text-gray-900", children: r.name }),
          /* @__PURE__ */ t("span", { className: "text-gray-600", children: [
            r.count,
            " выдач"
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "w-full bg-gray-200 h-2", children: /* @__PURE__ */ e(
          "div",
          {
            className: "bg-[#0d9488] h-2",
            style: { width: `${r.percent}%` }
          }
        ) })
      ] }, i)) })
    ] })
  ] }) });
}
function I() {
  const r = [
    { title: "Всего позиций", value: "2,847", change: "+18%", icon: y },
    { title: "Выдано сегодня", value: "142", change: "+8%", icon: w },
    { title: "Низкие остатки", value: "34", change: "+5", icon: A },
    { title: "На складе", value: "2,705", change: "+12%", icon: C }
  ], i = [
    { id: 1, type: "Выдача", item: "Набор ключей гаечных 6-32мм", quantity: 2, department: "Цех №3", time: "11:20" },
    { id: 2, type: "Возврат", item: "Дрель электрическая ДЭ-16", quantity: 1, department: "Цех №1", time: "11:05" },
    { id: 3, type: "Поступление", item: "Молоток слесарный 500г", quantity: 20, department: "Склад", time: "10:30" },
    { id: 4, type: "Выдача", item: "Угловая шлифмашина УШМ-125", quantity: 3, department: "Цех №2", time: "10:15" }
  ], s = [
    { id: 1, item: "Сверло по металлу 8мм", current: 3, minimum: 10, needed: 7 },
    { id: 2, item: "Диск отрезной 125мм", current: 5, minimum: 15, needed: 10 },
    { id: 3, item: "Электроды ОК-46", current: 2, minimum: 8, needed: 6 }
  ];
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl text-gray-900", children: "Панель управления складом" }),
      /* @__PURE__ */ e("p", { className: "text-gray-600 mt-1", children: "Общая статистика инструментального склада" })
    ] }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: r.map((a) => {
      const l = a.icon;
      return /* @__PURE__ */ e("div", { className: "bg-white border border-gray-200 p-6", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: a.title }),
          /* @__PURE__ */ e("p", { className: "text-3xl text-gray-900 mt-2", children: a.value }),
          /* @__PURE__ */ t("p", { className: "text-sm text-[#0d9488] mt-2", children: [
            a.change,
            " за месяц"
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "bg-[#f0fdfa] p-3", children: /* @__PURE__ */ e(l, { className: "w-6 h-6 text-[#0d9488]" }) })
      ] }) }, a.title);
    }) }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200", children: [
        /* @__PURE__ */ e("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ e("h3", { className: "text-lg text-gray-900", children: "Последние движения" }) }),
        /* @__PURE__ */ e("div", { className: "p-6", children: /* @__PURE__ */ e("div", { className: "space-y-4", children: i.map((a) => /* @__PURE__ */ t("div", { className: "flex items-center justify-between py-3 border-b border-gray-100 last:border-0", children: [
          /* @__PURE__ */ t("div", { className: "flex-1", children: [
            /* @__PURE__ */ e("p", { className: "text-gray-900", children: a.item }),
            /* @__PURE__ */ t("p", { className: "text-sm text-gray-600", children: [
              a.department,
              " • ",
              a.quantity,
              " шт."
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "text-right", children: [
            /* @__PURE__ */ e("span", { className: `inline-block px-3 py-1 text-xs ${a.type === "Выдача" ? "bg-[#e0f2f1] text-[#0d9488]" : a.type === "Возврат" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-700"}`, children: a.type }),
            /* @__PURE__ */ e("p", { className: "text-sm text-gray-500 mt-1", children: a.time })
          ] })
        ] }, a.id)) }) })
      ] }),
      /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200", children: [
        /* @__PURE__ */ e("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ e("h3", { className: "text-lg text-gray-900", children: "Требуется пополнение" }) }),
        /* @__PURE__ */ e("div", { className: "p-6", children: /* @__PURE__ */ e("div", { className: "space-y-4", children: s.map((a) => /* @__PURE__ */ t("div", { className: "py-3 border-b border-gray-100 last:border-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ e("p", { className: "text-gray-900", children: a.item }),
            /* @__PURE__ */ t("span", { className: "text-sm text-red-600", children: [
              "-",
              a.needed,
              " шт."
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e("div", { className: "flex-1 h-2 bg-gray-100", children: /* @__PURE__ */ e(
              "div",
              {
                className: "h-2 bg-red-500",
                style: { width: `${a.current / a.minimum * 100}%` }
              }
            ) }),
            /* @__PURE__ */ t("span", { className: "text-sm text-gray-600", children: [
              a.current,
              "/",
              a.minimum
            ] })
          ] })
        ] }, a.id)) }) })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200 p-6", children: [
      /* @__PURE__ */ e("h3", { className: "text-lg text-gray-900 mb-4", children: "Быстрые действия" }),
      /* @__PURE__ */ t("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ t("button", { className: "p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all", children: [
          /* @__PURE__ */ e(y, { className: "w-8 h-8 text-[#0d9488] mx-auto mb-2" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Выдать инструмент" })
        ] }),
        /* @__PURE__ */ t("button", { className: "p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all", children: [
          /* @__PURE__ */ e(w, { className: "w-8 h-8 text-[#0d9488] mx-auto mb-2" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Принять возврат" })
        ] }),
        /* @__PURE__ */ t("button", { className: "p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all", children: [
          /* @__PURE__ */ e(C, { className: "w-8 h-8 text-[#0d9488] mx-auto mb-2" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Оприходовать" })
        ] }),
        /* @__PURE__ */ t("button", { className: "p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all", children: [
          /* @__PURE__ */ e(A, { className: "w-8 h-8 text-[#0d9488] mx-auto mb-2" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Заказать инструмент" })
        ] })
      ] })
    ] })
  ] });
}
function Be() {
  const [r, i] = x(""), a = [
    { id: 1, name: "Набор ключей гаечных 6-32мм", category: "Слесарный инструмент", quantity: 45, minQuantity: 20, unit: "шт", location: "Стеллаж А-12", supplier: "ИнструментСнаб" },
    { id: 2, name: "Дрель электрическая ДЭ-16", category: "Электроинструмент", quantity: 12, minQuantity: 5, unit: "шт", location: "Стеллаж Б-3", supplier: "ТехноТорг" },
    { id: 3, name: "Сверло по металлу 8мм", category: "Режущий инструмент", quantity: 3, minQuantity: 10, unit: "шт", location: "Ячейка В-45", supplier: "МеталлИнструмент" },
    { id: 4, name: "Молоток слесарный 500г", category: "Слесарный инструмент", quantity: 28, minQuantity: 15, unit: "шт", location: "Стеллаж А-8", supplier: "ИнструментСнаб" },
    { id: 5, name: "Угловая шлифмашина УШМ-125", category: "Электроинструмент", quantity: 8, minQuantity: 4, unit: "шт", location: "Стеллаж Б-7", supplier: "ТехноТорг" }
  ].filter(
    (l) => l.name.toLowerCase().includes(r.toLowerCase())
  );
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h2", { className: "text-2xl text-gray-900", children: "Складской учет" }),
        /* @__PURE__ */ e("p", { className: "text-gray-600 mt-1", children: "Управление складскими запасами" })
      ] }),
      /* @__PURE__ */ t("button", { className: "flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] transition-colors", children: [
        /* @__PURE__ */ e(M, { className: "w-5 h-5" }),
        "Добавить позицию"
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "bg-white border border-gray-200 p-4", children: /* @__PURE__ */ t("div", { className: "relative", children: [
      /* @__PURE__ */ e(f, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          placeholder: "Поиск по наименованию...",
          value: r,
          onChange: (l) => i(l.target.value),
          className: "w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
        }
      )
    ] }) }),
    /* @__PURE__ */ e("div", { className: "bg-white border border-gray-200 overflow-hidden", children: /* @__PURE__ */ t("table", { className: "w-full", children: [
      /* @__PURE__ */ e("thead", { className: "bg-gray-50 border-b border-gray-200", children: /* @__PURE__ */ t("tr", { children: [
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Наименование" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Категория" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Количество" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Мин. остаток" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Местоположение" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Поставщик" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider", children: "Действия" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { className: "bg-white divide-y divide-gray-200", children: a.map((l) => /* @__PURE__ */ t("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-900", children: l.name }) }),
        /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: l.category }) }),
        /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ t("div", { className: `text-sm ${l.quantity < l.minQuantity ? "text-red-600" : "text-gray-900"}`, children: [
          l.quantity,
          " ",
          l.unit
        ] }) }),
        /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ t("div", { className: "text-sm text-gray-600", children: [
          l.minQuantity,
          " ",
          l.unit
        ] }) }),
        /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: l.location }) }),
        /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: l.supplier }) }),
        /* @__PURE__ */ e("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ e("button", { className: "text-[#0d9488] hover:text-[#0f766e]", children: /* @__PURE__ */ e(F, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ e("button", { className: "text-red-600 hover:text-red-700", children: /* @__PURE__ */ e(g, { className: "w-4 h-4" }) })
        ] }) })
      ] }, l.id)) })
    ] }) })
  ] });
}
function ze() {
  const [r, i] = x(""), [s, a] = x("all"), l = [
    { id: 1, date: "09.04.2026", time: "11:20", type: "issue", item: "Набор ключей гаечных 6-32мм", quantity: 2, department: "Цех №3", employee: "Сергеев А.П." },
    { id: 2, date: "09.04.2026", time: "11:05", type: "return", item: "Дрель электрическая ДЭ-16", quantity: 1, department: "Цех №1", employee: "Кузнецов В.И." },
    { id: 3, date: "09.04.2026", time: "10:30", type: "receipt", item: "Молоток слесарный 500г", quantity: 20, department: "Склад", employee: "Система" },
    { id: 4, date: "09.04.2026", time: "10:15", type: "issue", item: "Угловая шлифмашина УШМ-125", quantity: 3, department: "Цех №2", employee: "Николаев М.С." },
    { id: 5, date: "08.04.2026", time: "16:40", type: "return", item: "Молоток слесарный 500г", quantity: 2, department: "Цех №3", employee: "Сергеев А.П." }
  ], m = (c) => ({
    issue: { text: "Выдача", className: "bg-[#e0f2f1] text-[#0d9488]", icon: O },
    return: { text: "Возврат", className: "bg-blue-50 text-blue-700", icon: E },
    receipt: { text: "Поступление", className: "bg-gray-100 text-gray-700", icon: y }
  })[c], h = l.filter((c) => {
    const o = c.item.toLowerCase().includes(r.toLowerCase()) || c.employee.toLowerCase().includes(r.toLowerCase()), d = s === "all" || c.type === s;
    return o && d;
  });
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl text-gray-900", children: "Движения инструментов" }),
      /* @__PURE__ */ e("p", { className: "text-gray-600 mt-1", children: "История перемещений товарно-материальных ценностей" })
    ] }),
    /* @__PURE__ */ e("div", { className: "bg-white border border-gray-200 p-4", children: /* @__PURE__ */ t("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ t("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ e(f, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Поиск по наименованию или сотруднику...",
            value: r,
            onChange: (c) => i(c.target.value),
            className: "w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => a("all"),
            className: `px-4 py-2 border ${s === "all" ? "bg-[#0d9488] text-white border-[#0d9488]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`,
            children: "Все"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => a("issue"),
            className: `px-4 py-2 border ${s === "issue" ? "bg-[#0d9488] text-white border-[#0d9488]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`,
            children: "Выдача"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => a("return"),
            className: `px-4 py-2 border ${s === "return" ? "bg-[#0d9488] text-white border-[#0d9488]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`,
            children: "Возврат"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ e("div", { className: "bg-white border border-gray-200 overflow-hidden", children: /* @__PURE__ */ t("table", { className: "w-full", children: [
      /* @__PURE__ */ e("thead", { className: "bg-gray-50 border-b border-gray-200", children: /* @__PURE__ */ t("tr", { children: [
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Дата и время" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Тип операции" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Наименование" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Количество" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Подразделение" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Сотрудник" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { className: "bg-white divide-y divide-gray-200", children: h.map((c) => {
        const o = m(c.type), d = o.icon;
        return /* @__PURE__ */ t("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ t("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ e("div", { className: "text-sm text-gray-900", children: c.date }),
            /* @__PURE__ */ e("div", { className: "text-sm text-gray-500", children: c.time })
          ] }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ t("span", { className: `inline-flex items-center gap-1 px-2 py-1 text-xs ${o.className}`, children: [
            /* @__PURE__ */ e(d, { className: "w-3 h-3" }),
            o.text
          ] }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-900", children: c.item }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ t("div", { className: "text-sm text-gray-900", children: [
            c.quantity,
            " шт."
          ] }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: c.department }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: c.employee }) })
        ] }, c.id);
      }) })
    ] }) })
  ] });
}
function D() {
  const r = [
    { title: "На поверке", value: "47", change: "+3%", icon: v },
    { title: "Поверено сегодня", value: "12", change: "+2", icon: S },
    { title: "Просрочено", value: "5", change: "-1", icon: N },
    { title: "Запланировано", value: "28", change: "+7", icon: u }
  ], i = [
    { id: 1, instrument: "Штангенциркуль ШЦ-I-150", invNumber: "ИН-001234", startDate: "08.04.2026", estimatedEnd: "10.04.2026", status: "В процессе" },
    { id: 2, instrument: "Микрометр МК-25", invNumber: "ИН-001235", startDate: "09.04.2026", estimatedEnd: "11.04.2026", status: "В процессе" },
    { id: 3, instrument: "Калибр-пробка", invNumber: "ИН-001236", startDate: "09.04.2026", estimatedEnd: "09.04.2026", status: "Завершается" }
  ], s = [
    { id: 1, instrument: "Манометр МП-100", invNumber: "ИН-001240", scheduledDate: "10.04.2026", type: "Плановая" },
    { id: 2, instrument: "Термометр ТТ-150", invNumber: "ИН-001241", scheduledDate: "11.04.2026", type: "Плановая" },
    { id: 3, instrument: "Весы лабораторные ВЛ-200", invNumber: "ИН-001242", scheduledDate: "12.04.2026", type: "Внеплановая" }
  ];
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl text-gray-900", children: "Метрологическая лаборатория" }),
      /* @__PURE__ */ e("p", { className: "text-gray-600 mt-1", children: "Управление поверкой и калибровкой оборудования" })
    ] }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: r.map((a) => {
      const l = a.icon;
      return /* @__PURE__ */ e("div", { className: "bg-white border border-gray-200 p-6", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-600", children: a.title }),
          /* @__PURE__ */ e("p", { className: "text-3xl text-gray-900 mt-2", children: a.value }),
          /* @__PURE__ */ t("p", { className: "text-sm text-[#0d9488] mt-2", children: [
            a.change,
            " за неделю"
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "bg-[#f0fdfa] p-3", children: /* @__PURE__ */ e(l, { className: "w-6 h-6 text-[#0d9488]" }) })
      ] }) }, a.title);
    }) }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200", children: [
        /* @__PURE__ */ e("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ e("h3", { className: "text-lg text-gray-900", children: "Текущие поверки" }) }),
        /* @__PURE__ */ e("div", { className: "p-6", children: /* @__PURE__ */ e("div", { className: "space-y-4", children: i.map((a) => /* @__PURE__ */ t("div", { className: "py-3 border-b border-gray-100 last:border-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ e("p", { className: "text-gray-900", children: a.instrument }),
            /* @__PURE__ */ e("span", { className: `px-3 py-1 text-xs ${a.status === "В процессе" ? "bg-[#e0f2f1] text-[#0d9488]" : "bg-yellow-50 text-yellow-700"}`, children: a.status })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-600 mb-2", children: a.invNumber }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-4 text-sm text-gray-500", children: [
            /* @__PURE__ */ t("span", { children: [
              "Начало: ",
              a.startDate
            ] }),
            /* @__PURE__ */ e("span", { children: "•" }),
            /* @__PURE__ */ t("span", { children: [
              "Окончание: ",
              a.estimatedEnd
            ] })
          ] })
        ] }, a.id)) }) })
      ] }),
      /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200", children: [
        /* @__PURE__ */ e("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ e("h3", { className: "text-lg text-gray-900", children: "Расписание поверок" }) }),
        /* @__PURE__ */ e("div", { className: "p-6", children: /* @__PURE__ */ e("div", { className: "space-y-4", children: s.map((a) => /* @__PURE__ */ t("div", { className: "py-3 border-b border-gray-100 last:border-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ e("p", { className: "text-gray-900", children: a.instrument }),
            /* @__PURE__ */ e("span", { className: `px-3 py-1 text-xs ${a.type === "Плановая" ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"}`, children: a.type })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-600 mb-1", children: a.invNumber }),
          /* @__PURE__ */ t("p", { className: "text-sm text-gray-500", children: [
            "Дата: ",
            a.scheduledDate
          ] })
        ] }, a.id)) }) })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "bg-white border border-gray-200 p-6", children: [
      /* @__PURE__ */ e("h3", { className: "text-lg text-gray-900 mb-4", children: "Быстрые действия" }),
      /* @__PURE__ */ t("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ t("button", { className: "p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all", children: [
          /* @__PURE__ */ e(v, { className: "w-8 h-8 text-[#0d9488] mx-auto mb-2" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Начать поверку" })
        ] }),
        /* @__PURE__ */ t("button", { className: "p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all", children: [
          /* @__PURE__ */ e(S, { className: "w-8 h-8 text-[#0d9488] mx-auto mb-2" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Завершить поверку" })
        ] }),
        /* @__PURE__ */ t("button", { className: "p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all", children: [
          /* @__PURE__ */ e(u, { className: "w-8 h-8 text-[#0d9488] mx-auto mb-2" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Планировать поверку" })
        ] }),
        /* @__PURE__ */ t("button", { className: "p-4 border-2 border-gray-200 hover:border-[#0d9488] hover:bg-[#f0fdfa] transition-all", children: [
          /* @__PURE__ */ e(N, { className: "w-8 h-8 text-[#0d9488] mx-auto mb-2" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-900", children: "Просроченные" })
        ] })
      ] })
    ] })
  ] });
}
function He() {
  const [r, i] = x(""), [s, a] = x("all"), l = [
    { id: 1, instrument: "Штангенциркуль ШЦ-I-150", invNumber: "ИН-001234", type: "Плановая", status: "in-progress", startDate: "08.04.2026", technician: "Смирнов А.В." },
    { id: 2, instrument: "Микрометр МК-25", invNumber: "ИН-001235", type: "Плановая", status: "completed", startDate: "05.04.2026", endDate: "07.04.2026", result: "Годен", technician: "Петрова Е.И." },
    { id: 3, instrument: "Калибр-пробка", invNumber: "ИН-001236", type: "Внеплановая", status: "in-progress", startDate: "09.04.2026", technician: "Смирнов А.В." },
    { id: 4, instrument: "Манометр МП-100", invNumber: "ИН-001240", type: "Плановая", status: "scheduled", startDate: "10.04.2026", technician: "Петрова Е.И." },
    { id: 5, instrument: "Индикатор ИЧ-10", invNumber: "ИН-001237", type: "Плановая", status: "failed", startDate: "03.04.2026", endDate: "05.04.2026", result: "Не годен", technician: "Смирнов А.В." }
  ], m = (c) => ({
    scheduled: { text: "Запланирована", className: "bg-blue-50 text-blue-700" },
    "in-progress": { text: "В процессе", className: "bg-[#e0f2f1] text-[#0d9488]" },
    completed: { text: "Завершена", className: "bg-green-50 text-green-700" },
    failed: { text: "Не пройдена", className: "bg-red-50 text-red-700" }
  })[c], h = l.filter((c) => {
    const o = c.instrument.toLowerCase().includes(r.toLowerCase()) || c.invNumber.toLowerCase().includes(r.toLowerCase()), d = s === "all" || c.status === s;
    return o && d;
  });
  return /* @__PURE__ */ t("div", { className: "space-y-6", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h2", { className: "text-2xl text-gray-900", children: "Поверки" }),
        /* @__PURE__ */ e("p", { className: "text-gray-600 mt-1", children: "Управление процессом поверки приборов" })
      ] }),
      /* @__PURE__ */ t("button", { className: "flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white hover:bg-[#0f766e] transition-colors", children: [
        /* @__PURE__ */ e(M, { className: "w-5 h-5" }),
        "Запланировать поверку"
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "bg-white border border-gray-200 p-4", children: /* @__PURE__ */ t("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ t("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ e(f, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Поиск по прибору или инв. номеру...",
            value: r,
            onChange: (c) => i(c.target.value),
            className: "w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => a("all"),
            className: `px-4 py-2 border ${s === "all" ? "bg-[#0d9488] text-white border-[#0d9488]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`,
            children: "Все"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => a("in-progress"),
            className: `px-4 py-2 border ${s === "in-progress" ? "bg-[#0d9488] text-white border-[#0d9488]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`,
            children: "В процессе"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => a("scheduled"),
            className: `px-4 py-2 border ${s === "scheduled" ? "bg-[#0d9488] text-white border-[#0d9488]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`,
            children: "Запланированные"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ e("div", { className: "bg-white border border-gray-200 overflow-hidden", children: /* @__PURE__ */ t("table", { className: "w-full", children: [
      /* @__PURE__ */ e("thead", { className: "bg-gray-50 border-b border-gray-200", children: /* @__PURE__ */ t("tr", { children: [
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Прибор" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Инв. номер" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Тип" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Статус" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Дата начала" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Результат" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider", children: "Ответственный" }),
        /* @__PURE__ */ e("th", { className: "px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider", children: "Действия" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { className: "bg-white divide-y divide-gray-200", children: h.map((c) => {
        const o = m(c.status);
        return /* @__PURE__ */ t("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-900", children: c.instrument }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: c.invNumber }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: c.type }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("span", { className: `px-2 py-1 inline-flex text-xs ${o.className}`, children: o.text }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: c.startDate }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: c.result || "—" }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4", children: /* @__PURE__ */ e("div", { className: "text-sm text-gray-600", children: c.technician }) }),
          /* @__PURE__ */ e("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ e("button", { className: "text-[#0d9488] hover:text-[#0f766e]", children: /* @__PURE__ */ e(b, { className: "w-4 h-4" }) }),
            c.status === "in-progress" && /* @__PURE__ */ e("button", { className: "text-green-600 hover:text-green-700", children: /* @__PURE__ */ e(re, { className: "w-4 h-4" }) })
          ] }) })
        ] }, c.id);
      }) })
    ] }) })
  ] });
}
function Pe() {
  const [r, i] = x(null), [s, a] = x("dashboard"), [l, m] = x(!0), [h, c] = x(null);
  if (!r || !h)
    return /* @__PURE__ */ e(
      Se,
      {
        onAuthSuccess: (d) => {
          i(d.role), c(d), a("dashboard");
        }
      }
    );
  const o = () => {
    switch (r) {
      case "irk":
        return {
          title: "ИС Учета Инструментов ИРК",
          userName: "Кладовщик ИРК",
          tabs: [
            { id: "dashboard", name: "Панель управления", icon: q },
            { id: "instruments", name: "Инструменты", icon: y },
            { id: "operations", name: "Операции", icon: j },
            { id: "reports", name: "Отчеты", icon: b }
          ]
        };
      case "tool-warehouse":
        return {
          title: "Инструментальный склад",
          userName: "Кладовщик склада",
          tabs: [
            { id: "dashboard", name: "Обзор склада", icon: q },
            { id: "inventory", name: "Складской учет", icon: C },
            { id: "operations", name: "Движения", icon: j },
            { id: "reports", name: "Отчеты", icon: b }
          ]
        };
      case "laboratory":
        return {
          title: "Метрологическая лаборатория",
          userName: "Лаборант",
          tabs: [
            { id: "dashboard", name: "Обзор", icon: v },
            { id: "verifications", name: "Поверки", icon: y },
            { id: "reports", name: "Отчеты", icon: b }
          ]
        };
      default:
        return { title: "", userName: "", tabs: [] };
    }
  }, d = () => {
    if (r === "irk")
      switch (s) {
        case "dashboard":
          return /* @__PURE__ */ e(T, {});
        case "instruments":
          return /* @__PURE__ */ e(qe, {});
        case "operations":
          return /* @__PURE__ */ e(Ae, {});
        case "reports":
          return /* @__PURE__ */ e(k, {});
        default:
          return /* @__PURE__ */ e(T, {});
      }
    else if (r === "tool-warehouse")
      switch (s) {
        case "dashboard":
          return /* @__PURE__ */ e(I, {});
        case "inventory":
          return /* @__PURE__ */ e(Be, {});
        case "operations":
          return /* @__PURE__ */ e(ze, {});
        case "reports":
          return /* @__PURE__ */ e(k, {});
        default:
          return /* @__PURE__ */ e(I, {});
      }
    else if (r === "laboratory")
      switch (s) {
        case "dashboard":
          return /* @__PURE__ */ e(D, {});
        case "verifications":
          return /* @__PURE__ */ e(He, {});
        case "reports":
          return /* @__PURE__ */ e(k, {});
        default:
          return /* @__PURE__ */ e(D, {});
      }
  }, p = o();
  return /* @__PURE__ */ t("div", { className: "h-screen flex flex-col bg-white", children: [
    /* @__PURE__ */ t("header", { className: "bg-[#0d9488] border-b border-[#0f766e] px-6 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => m(!l),
            className: "p-2 hover:bg-[#0f766e] transition-colors text-white",
            children: l ? /* @__PURE__ */ e(je, { className: "w-5 h-5" }) : /* @__PURE__ */ e(me, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ e("h1", { className: "text-xl text-white", children: p.title })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ t("div", { className: "relative", children: [
          /* @__PURE__ */ e(f, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              placeholder: "Поиск...",
              className: "pl-10 pr-4 py-2 bg-[#0f766e] border border-[#14b8a6] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            }
          )
        ] }),
        /* @__PURE__ */ t("button", { className: "p-2 hover:bg-[#0f766e] transition-colors relative text-white", children: [
          /* @__PURE__ */ e(J, { className: "w-5 h-5" }),
          /* @__PURE__ */ e("span", { className: "absolute top-1 right-1 w-2 h-2 bg-red-500" })
        ] }),
        /* @__PURE__ */ t("button", { className: "flex items-center gap-2 px-3 py-2 hover:bg-[#0f766e] transition-colors text-white", children: [
          /* @__PURE__ */ e(ke, { className: "w-5 h-5" }),
          /* @__PURE__ */ e("span", { className: "text-sm", children: h.fullName || p.userName })
        ] }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              i(null), c(null);
            },
            className: "p-2 hover:bg-[#0f766e] transition-colors text-white",
            title: "Сменить профиль",
            children: /* @__PURE__ */ e(oe, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex flex-1 overflow-hidden", children: [
      l && /* @__PURE__ */ t("aside", { className: "w-64 bg-white border-r border-gray-200 p-4", children: [
        /* @__PURE__ */ e("nav", { className: "space-y-1", children: p.tabs.map((d) => {
          const p = d.icon;
          return /* @__PURE__ */ t(
            "button",
            {
              onClick: () => a(d.id),
              className: `w-full flex items-center gap-3 px-4 py-3 transition-colors ${s === d.id ? "bg-[#f0fdfa] text-[#0d9488] border-l-4 border-[#0d9488]" : "text-gray-700 hover:bg-gray-50 border-l-4 border-transparent"}`,
              children: [
                /* @__PURE__ */ e(p, { className: "w-5 h-5" }),
                /* @__PURE__ */ e("span", { children: d.name })
              ]
            },
            d.id
          );
        }) }),
        /* @__PURE__ */ e("div", { className: "mt-8 pt-8 border-t border-gray-200", children: /* @__PURE__ */ t("button", { className: "w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-l-4 border-transparent", children: [
          /* @__PURE__ */ e(be, { className: "w-5 h-5" }),
          /* @__PURE__ */ e("span", { children: "Настройки" })
        ] }) })
      ] }),
      /* @__PURE__ */ e("main", { className: "flex-1 overflow-auto p-6 bg-gray-50", children: d() })
    ] })
  ] });
}
const Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pe
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ge as Code0_8
};
