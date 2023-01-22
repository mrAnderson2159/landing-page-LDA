(function() { const t = document.createElement("link").relList; if (t && t.supports && t.supports("modulepreload")) return; for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
    new MutationObserver(r => { for (const i of r)
            if (i.type === "childList")
                for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && s(o) }).observe(document, { childList: !0, subtree: !0 });

    function n(r) { const i = {}; return r.integrity && (i.integrity = r.integrity), r.referrerpolicy && (i.referrerPolicy = r.referrerpolicy), r.crossorigin === "use-credentials" ? i.credentials = "include" : r.crossorigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i }

    function s(r) { if (r.ep) return;
        r.ep = !0; const i = n(r);
        fetch(r.href, i) } })();

function Ds(e, t) { const n = Object.create(null),
        s = e.split(","); for (let r = 0; r < s.length; r++) n[s[r]] = !0; return t ? r => !!n[r.toLowerCase()] : r => !!n[r] }

function vt(e) { if (B(e)) { const t = {}; for (let n = 0; n < e.length; n++) { const s = e[n],
                r = le(s) ? El(s) : vt(s); if (r)
                for (const i in r) t[i] = r[i] } return t } else { if (le(e)) return e; if (re(e)) return e } }
const bl = /;(?![^(]*\))/g,
    wl = /:([^]+)/,
    yl = /\/\*.*?\*\//gs;

function El(e) { const t = {}; return e.replace(yl, "").split(bl).forEach(n => { if (n) { const s = n.split(wl);
            s.length > 1 && (t[s[0].trim()] = s[1].trim()) } }), t }

function Tt(e) { let t = ""; if (le(e)) t = e;
    else if (B(e))
        for (let n = 0; n < e.length; n++) { const s = Tt(e[n]);
            s && (t += s + " ") } else if (re(e))
            for (const n in e) e[n] && (t += n + " "); return t.trim() }

function it(e) { if (!e) return null; let { class: t, style: n } = e; return t && !le(t) && (e.class = Tt(t)), n && (e.style = vt(n)), e }
const Al = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    xl = Ds(Al);

function Ui(e) { return !!e || e === "" }
const se = e => le(e) ? e : e == null ? "" : B(e) || re(e) && (e.toString === ji || !$(e.toString)) ? JSON.stringify(e, Bi, 2) : String(e),
    Bi = (e, t) => t && t.__v_isRef ? Bi(e, t.value) : Pt(t) ? {
        [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r]) => (n[`${s} =>`] = r, n), {}) } : Di(t) ? {
        [`Set(${t.size})`]: [...t.values()] } : re(t) && !B(t) && !Ki(t) ? String(t) : t,
    Z = {},
    Ot = [],
    Pe = () => {},
    vl = () => !1,
    Cl = /^on[^a-z]/,
    Dn = e => Cl.test(e),
    $s = e => e.startsWith("onUpdate:"),
    ge = Object.assign,
    js = (e, t) => { const n = e.indexOf(t);
        n > -1 && e.splice(n, 1) },
    Tl = Object.prototype.hasOwnProperty,
    q = (e, t) => Tl.call(e, t),
    B = Array.isArray,
    Pt = e => $n(e) === "[object Map]",
    Di = e => $n(e) === "[object Set]",
    $ = e => typeof e == "function",
    le = e => typeof e == "string",
    Ks = e => typeof e == "symbol",
    re = e => e !== null && typeof e == "object",
    $i = e => re(e) && $(e.then) && $(e.catch),
    ji = Object.prototype.toString,
    $n = e => ji.call(e),
    Il = e => $n(e).slice(8, -1),
    Ki = e => $n(e) === "[object Object]",
    qs = e => le(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    vn = Ds(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    jn = e => { const t = Object.create(null); return n => t[n] || (t[n] = e(n)) },
    Nl = /-(\w)/g,
    qe = jn(e => e.replace(Nl, (t, n) => n ? n.toUpperCase() : "")),
    Sl = /\B([A-Z])/g,
    Ut = jn(e => e.replace(Sl, "-$1").toLowerCase()),
    Kn = jn(e => e.charAt(0).toUpperCase() + e.slice(1)),
    os = jn(e => e ? `on${Kn(e)}` : ""),
    Fn = (e, t) => !Object.is(e, t),
    Cn = (e, t) => { for (let n = 0; n < e.length; n++) e[n](t) },
    Ln = (e, t, n) => { Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n }) },
    Mn = e => { const t = parseFloat(e); return isNaN(t) ? e : t };
let Rr;
const Rl = () => Rr || (Rr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let He;
class Ol { constructor(t = !1) { this.detached = t, this.active = !0, this.effects = [], this.cleanups = [], this.parent = He, !t && He && (this.index = (He.scopes || (He.scopes = [])).push(this) - 1) } run(t) { if (this.active) { const n = He; try { return He = this, t() } finally { He = n } } } on() { He = this } off() { He = this.parent } stop(t) { if (this.active) { let n, s; for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop(); for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n](); if (this.scopes)
                for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0); if (!this.detached && this.parent && !t) { const r = this.parent.scopes.pop();
                r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index) } this.parent = void 0, this.active = !1 } } }

function Pl(e, t = He) { t && t.active && t.effects.push(e) }
const Vs = e => { const t = new Set(e); return t.w = 0, t.n = 0, t },
    qi = e => (e.w & ut) > 0,
    Vi = e => (e.n & ut) > 0,
    Fl = ({ deps: e }) => { if (e.length)
            for (let t = 0; t < e.length; t++) e[t].w |= ut },
    Ll = e => { const { deps: t } = e; if (t.length) { let n = 0; for (let s = 0; s < t.length; s++) { const r = t[s];
                qi(r) && !Vi(r) ? r.delete(e) : t[n++] = r, r.w &= ~ut, r.n &= ~ut } t.length = n } },
    gs = new WeakMap;
let Qt = 0,
    ut = 1;
const _s = 30;
let Re;
const At = Symbol(""),
    bs = Symbol("");
class zs { constructor(t, n = null, s) { this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Pl(this, s) } run() { if (!this.active) return this.fn(); let t = Re,
            n = ct; for (; t;) { if (t === this) return;
            t = t.parent } try { return this.parent = Re, Re = this, ct = !0, ut = 1 << ++Qt, Qt <= _s ? Fl(this) : Or(this), this.fn() } finally { Qt <= _s && Ll(this), ut = 1 << --Qt, Re = this.parent, ct = n, this.parent = void 0, this.deferStop && this.stop() } } stop() { Re === this ? this.deferStop = !0 : this.active && (Or(this), this.onStop && this.onStop(), this.active = !1) } }

function Or(e) { const { deps: t } = e; if (t.length) { for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0 } }
let ct = !0;
const zi = [];

function Bt() { zi.push(ct), ct = !1 }

function Dt() { const e = zi.pop();
    ct = e === void 0 ? !0 : e }

function ve(e, t, n) { if (ct && Re) { let s = gs.get(e);
        s || gs.set(e, s = new Map); let r = s.get(n);
        r || s.set(n, r = Vs()), Wi(r) } }

function Wi(e, t) { let n = !1;
    Qt <= _s ? Vi(e) || (e.n |= ut, n = !qi(e)) : n = !e.has(Re), n && (e.add(Re), Re.deps.push(e)) }

function et(e, t, n, s, r, i) { const o = gs.get(e); if (!o) return; let l = []; if (t === "clear") l = [...o.values()];
    else if (n === "length" && B(e)) { const c = Mn(s);
        o.forEach((a, u) => {
            (u === "length" || u >= c) && l.push(a) }) } else switch (n !== void 0 && l.push(o.get(n)), t) {
        case "add":
            B(e) ? qs(n) && l.push(o.get("length")) : (l.push(o.get(At)), Pt(e) && l.push(o.get(bs))); break;
        case "delete":
            B(e) || (l.push(o.get(At)), Pt(e) && l.push(o.get(bs))); break;
        case "set":
            Pt(e) && l.push(o.get(At)); break }
    if (l.length === 1) l[0] && ws(l[0]);
    else { const c = []; for (const a of l) a && c.push(...a);
        ws(Vs(c)) } }

function ws(e, t) { const n = B(e) ? e : [...e]; for (const s of n) s.computed && Pr(s); for (const s of n) s.computed || Pr(s) }

function Pr(e, t) {
    (e !== Re || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run()) }
const Ml = Ds("__proto__,__v_isRef,__isVue"),
    Ji = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Ks)),
    kl = Ws(),
    Hl = Ws(!1, !0),
    Ul = Ws(!0),
    Fr = Bl();

function Bl() { const e = {}; return ["includes", "indexOf", "lastIndexOf"].forEach(t => { e[t] = function(...n) { const s = J(this); for (let i = 0, o = this.length; i < o; i++) ve(s, "get", i + ""); const r = s[t](...n); return r === -1 || r === !1 ? s[t](...n.map(J)) : r } }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => { e[t] = function(...n) { Bt(); const s = J(this)[t].apply(this, n); return Dt(), s } }), e }

function Ws(e = !1, t = !1) { return function(s, r, i) { if (r === "__v_isReactive") return !e; if (r === "__v_isReadonly") return e; if (r === "__v_isShallow") return t; if (r === "__v_raw" && i === (e ? t ? tc : Zi : t ? Gi : Qi).get(s)) return s; const o = B(s); if (!e && o && q(Fr, r)) return Reflect.get(Fr, r, i); const l = Reflect.get(s, r, i); return (Ks(r) ? Ji.has(r) : Ml(r)) || (e || ve(s, "get", r), t) ? l : ye(l) ? o && qs(r) ? l : l.value : re(l) ? e ? eo(l) : Xs(l) : l } }
const Dl = Yi(),
    $l = Yi(!0);

function Yi(e = !1) { return function(n, s, r, i) { let o = n[s]; if (rn(o) && ye(o) && !ye(r)) return !1; if (!e && (!ys(r) && !rn(r) && (o = J(o), r = J(r)), !B(n) && ye(o) && !ye(r))) return o.value = r, !0; const l = B(n) && qs(s) ? Number(s) < n.length : q(n, s),
            c = Reflect.set(n, s, r, i); return n === J(i) && (l ? Fn(r, o) && et(n, "set", s, r) : et(n, "add", s, r)), c } }

function jl(e, t) { const n = q(e, t);
    e[t]; const s = Reflect.deleteProperty(e, t); return s && n && et(e, "delete", t, void 0), s }

function Kl(e, t) { const n = Reflect.has(e, t); return (!Ks(t) || !Ji.has(t)) && ve(e, "has", t), n }

function ql(e) { return ve(e, "iterate", B(e) ? "length" : At), Reflect.ownKeys(e) }
const Xi = { get: kl, set: Dl, deleteProperty: jl, has: Kl, ownKeys: ql },
    Vl = { get: Ul, set(e, t) { return !0 }, deleteProperty(e, t) { return !0 } },
    zl = ge({}, Xi, { get: Hl, set: $l }),
    Js = e => e,
    qn = e => Reflect.getPrototypeOf(e);

function gn(e, t, n = !1, s = !1) { e = e.__v_raw; const r = J(e),
        i = J(t);
    n || (t !== i && ve(r, "get", t), ve(r, "get", i)); const { has: o } = qn(r), l = s ? Js : n ? Zs : Gs; if (o.call(r, t)) return l(e.get(t)); if (o.call(r, i)) return l(e.get(i));
    e !== r && e.get(t) }

function _n(e, t = !1) { const n = this.__v_raw,
        s = J(n),
        r = J(e); return t || (e !== r && ve(s, "has", e), ve(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r) }

function bn(e, t = !1) { return e = e.__v_raw, !t && ve(J(e), "iterate", At), Reflect.get(e, "size", e) }

function Lr(e) { e = J(e); const t = J(this); return qn(t).has.call(t, e) || (t.add(e), et(t, "add", e, e)), this }

function Mr(e, t) { t = J(t); const n = J(this),
        { has: s, get: r } = qn(n); let i = s.call(n, e);
    i || (e = J(e), i = s.call(n, e)); const o = r.call(n, e); return n.set(e, t), i ? Fn(t, o) && et(n, "set", e, t) : et(n, "add", e, t), this }

function kr(e) { const t = J(this),
        { has: n, get: s } = qn(t); let r = n.call(t, e);
    r || (e = J(e), r = n.call(t, e)), s && s.call(t, e); const i = t.delete(e); return r && et(t, "delete", e, void 0), i }

function Hr() { const e = J(this),
        t = e.size !== 0,
        n = e.clear(); return t && et(e, "clear", void 0, void 0), n }

function wn(e, t) { return function(s, r) { const i = this,
            o = i.__v_raw,
            l = J(o),
            c = t ? Js : e ? Zs : Gs; return !e && ve(l, "iterate", At), o.forEach((a, u) => s.call(r, c(a), c(u), i)) } }

function yn(e, t, n) { return function(...s) { const r = this.__v_raw,
            i = J(r),
            o = Pt(i),
            l = e === "entries" || e === Symbol.iterator && o,
            c = e === "keys" && o,
            a = r[e](...s),
            u = n ? Js : t ? Zs : Gs; return !t && ve(i, "iterate", c ? bs : At), { next() { const { value: h, done: f } = a.next(); return f ? { value: h, done: f } : { value: l ? [u(h[0]), u(h[1])] : u(h), done: f } }, [Symbol.iterator]() { return this } } } }

function st(e) { return function(...t) { return e === "delete" ? !1 : this } }

function Wl() { const e = { get(i) { return gn(this, i) }, get size() { return bn(this) }, has: _n, add: Lr, set: Mr, delete: kr, clear: Hr, forEach: wn(!1, !1) },
        t = { get(i) { return gn(this, i, !1, !0) }, get size() { return bn(this) }, has: _n, add: Lr, set: Mr, delete: kr, clear: Hr, forEach: wn(!1, !0) },
        n = { get(i) { return gn(this, i, !0) }, get size() { return bn(this, !0) }, has(i) { return _n.call(this, i, !0) }, add: st("add"), set: st("set"), delete: st("delete"), clear: st("clear"), forEach: wn(!0, !1) },
        s = { get(i) { return gn(this, i, !0, !0) }, get size() { return bn(this, !0) }, has(i) { return _n.call(this, i, !0) }, add: st("add"), set: st("set"), delete: st("delete"), clear: st("clear"), forEach: wn(!0, !0) }; return ["keys", "values", "entries", Symbol.iterator].forEach(i => { e[i] = yn(i, !1, !1), n[i] = yn(i, !0, !1), t[i] = yn(i, !1, !0), s[i] = yn(i, !0, !0) }), [e, n, t, s] }
const [Jl, Yl, Xl, Ql] = Wl();

function Ys(e, t) { const n = t ? e ? Ql : Xl : e ? Yl : Jl; return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(q(n, r) && r in s ? n : s, r, i) }
const Gl = { get: Ys(!1, !1) },
    Zl = { get: Ys(!1, !0) },
    ec = { get: Ys(!0, !1) },
    Qi = new WeakMap,
    Gi = new WeakMap,
    Zi = new WeakMap,
    tc = new WeakMap;

function nc(e) { switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0 } }

function sc(e) { return e.__v_skip || !Object.isExtensible(e) ? 0 : nc(Il(e)) }

function Xs(e) { return rn(e) ? e : Qs(e, !1, Xi, Gl, Qi) }

function rc(e) { return Qs(e, !1, zl, Zl, Gi) }

function eo(e) { return Qs(e, !0, Vl, ec, Zi) }

function Qs(e, t, n, s, r) { if (!re(e) || e.__v_raw && !(t && e.__v_isReactive)) return e; const i = r.get(e); if (i) return i; const o = sc(e); if (o === 0) return e; const l = new Proxy(e, o === 2 ? s : n); return r.set(e, l), l }

function Ft(e) { return rn(e) ? Ft(e.__v_raw) : !!(e && e.__v_isReactive) }

function rn(e) { return !!(e && e.__v_isReadonly) }

function ys(e) { return !!(e && e.__v_isShallow) }

function to(e) { return Ft(e) || rn(e) }

function J(e) { const t = e && e.__v_raw; return t ? J(t) : e }

function no(e) { return Ln(e, "__v_skip", !0), e }
const Gs = e => re(e) ? Xs(e) : e,
    Zs = e => re(e) ? eo(e) : e;

function ic(e) { ct && Re && (e = J(e), Wi(e.dep || (e.dep = Vs()))) }

function oc(e, t) { e = J(e), e.dep && ws(e.dep) }

function ye(e) { return !!(e && e.__v_isRef === !0) }

function lc(e) { return ye(e) ? e.value : e }
const cc = { get: (e, t, n) => lc(Reflect.get(e, t, n)), set: (e, t, n, s) => { const r = e[t]; return ye(r) && !ye(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s) } };

function so(e) { return Ft(e) ? e : new Proxy(e, cc) }
var ro;
class ac { constructor(t, n, s, r) { this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[ro] = !1, this._dirty = !0, this.effect = new zs(t, () => { this._dirty || (this._dirty = !0, oc(this)) }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s } get value() { const t = J(this); return ic(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value } set value(t) { this._setter(t) } } ro = "__v_isReadonly";

function uc(e, t, n = !1) { let s, r; const i = $(e); return i ? (s = e, r = Pe) : (s = e.get, r = e.set), new ac(s, r, i || !r, n) }

function at(e, t, n, s) { let r; try { r = s ? e(...s) : e() } catch (i) { Vn(i, t, n) } return r }

function Te(e, t, n, s) { if ($(e)) { const i = at(e, t, n, s); return i && $i(i) && i.catch(o => { Vn(o, t, n) }), i } const r = []; for (let i = 0; i < e.length; i++) r.push(Te(e[i], t, n, s)); return r }

function Vn(e, t, n, s = !0) { const r = t ? t.vnode : null; if (t) { let i = t.parent; const o = t.proxy,
            l = n; for (; i;) { const a = i.ec; if (a) { for (let u = 0; u < a.length; u++)
                    if (a[u](e, o, l) === !1) return } i = i.parent } const c = t.appContext.config.errorHandler; if (c) { at(c, null, 10, [e, o, l]); return } } fc(e, n, r, s) }

function fc(e, t, n, s = !0) { console.error(e) }
let on = !1,
    Es = !1;
const me = [];
let Be = 0;
const Lt = [];
let Ye = null,
    bt = 0;
const io = Promise.resolve();
let er = null;

function dc(e) { const t = er || io; return e ? t.then(this ? e.bind(this) : e) : t }

function hc(e) { let t = Be + 1,
        n = me.length; for (; t < n;) { const s = t + n >>> 1;
        ln(me[s]) < e ? t = s + 1 : n = s } return t }

function tr(e) {
    (!me.length || !me.includes(e, on && e.allowRecurse ? Be + 1 : Be)) && (e.id == null ? me.push(e) : me.splice(hc(e.id), 0, e), oo()) }

function oo() {!on && !Es && (Es = !0, er = io.then(co)) }

function pc(e) { const t = me.indexOf(e);
    t > Be && me.splice(t, 1) }

function mc(e) { B(e) ? Lt.push(...e) : (!Ye || !Ye.includes(e, e.allowRecurse ? bt + 1 : bt)) && Lt.push(e), oo() }

function Ur(e, t = on ? Be + 1 : 0) { for (; t < me.length; t++) { const n = me[t];
        n && n.pre && (me.splice(t, 1), t--, n()) } }

function lo(e) { if (Lt.length) { const t = [...new Set(Lt)]; if (Lt.length = 0, Ye) { Ye.push(...t); return } for (Ye = t, Ye.sort((n, s) => ln(n) - ln(s)), bt = 0; bt < Ye.length; bt++) Ye[bt]();
        Ye = null, bt = 0 } }
const ln = e => e.id == null ? 1 / 0 : e.id,
    gc = (e, t) => { const n = ln(e) - ln(t); if (n === 0) { if (e.pre && !t.pre) return -1; if (t.pre && !e.pre) return 1 } return n };

function co(e) { Es = !1, on = !0, me.sort(gc); const t = Pe; try { for (Be = 0; Be < me.length; Be++) { const n = me[Be];
            n && n.active !== !1 && at(n, null, 14) } } finally { Be = 0, me.length = 0, lo(), on = !1, er = null, (me.length || Lt.length) && co() } }

function _c(e, t, ...n) { if (e.isUnmounted) return; const s = e.vnode.props || Z; let r = n; const i = t.startsWith("update:"),
        o = i && t.slice(7); if (o && o in s) { const u = `${o==="modelValue"?"model":o}Modifiers`,
            { number: h, trim: f } = s[u] || Z;
        f && (r = n.map(_ => le(_) ? _.trim() : _)), h && (r = n.map(Mn)) } let l, c = s[l = os(t)] || s[l = os(qe(t))];!c && i && (c = s[l = os(Ut(t))]), c && Te(c, e, 6, r); const a = s[l + "Once"]; if (a) { if (!e.emitted) e.emitted = {};
        else if (e.emitted[l]) return;
        e.emitted[l] = !0, Te(a, e, 6, r) } }

function ao(e, t, n = !1) { const s = t.emitsCache,
        r = s.get(e); if (r !== void 0) return r; const i = e.emits; let o = {},
        l = !1; if (!$(e)) { const c = a => { const u = ao(a, t, !0);
            u && (l = !0, ge(o, u)) };!n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c) } return !i && !l ? (re(e) && s.set(e, null), null) : (B(i) ? i.forEach(c => o[c] = null) : ge(o, i), re(e) && s.set(e, o), o) }

function zn(e, t) { return !e || !Dn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), q(e, t[0].toLowerCase() + t.slice(1)) || q(e, Ut(t)) || q(e, t)) }
let he = null,
    Wn = null;

function kn(e) { const t = he; return he = e, Wn = e && e.type.__scopeId || null, t }

function bc(e) { Wn = e }

function wc() { Wn = null }

function nr(e, t = he, n) { if (!t || e._n) return e; const s = (...r) => { s._d && Yr(-1); const i = kn(t); let o; try { o = e(...r) } finally { kn(i), s._d && Yr(1) } return o }; return s._n = !0, s._c = !0, s._d = !0, s }

function ls(e) { const { type: t, vnode: n, proxy: s, withProxy: r, props: i, propsOptions: [o], slots: l, attrs: c, emit: a, render: u, renderCache: h, data: f, setupState: _, ctx: g, inheritAttrs: b } = e; let S, P; const W = kn(e); try { if (n.shapeFlag & 4) { const D = r || s;
            S = Ue(u.call(D, D, h, i, _, f, g)), P = c } else { const D = t;
            S = Ue(D.length > 1 ? D(i, { attrs: c, slots: l, emit: a }) : D(i, null)), P = t.props ? c : yc(c) } } catch (D) { sn.length = 0, Vn(D, e, 1), S = ee(Ie) } let O = S; if (P && b !== !1) { const D = Object.keys(P),
            { shapeFlag: K } = O;
        D.length && K & 7 && (o && D.some($s) && (P = Ec(P, o)), O = ft(O, P)) } return n.dirs && (O = ft(O), O.dirs = O.dirs ? O.dirs.concat(n.dirs) : n.dirs), n.transition && (O.transition = n.transition), S = O, kn(W), S }
const yc = e => { let t; for (const n in e)(n === "class" || n === "style" || Dn(n)) && ((t || (t = {}))[n] = e[n]); return t },
    Ec = (e, t) => { const n = {}; for (const s in e)(!$s(s) || !(s.slice(9) in t)) && (n[s] = e[s]); return n };

function Ac(e, t, n) { const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: c } = t, a = i.emitsOptions; if (t.dirs || t.transition) return !0; if (n && c >= 0) { if (c & 1024) return !0; if (c & 16) return s ? Br(s, o, a) : !!o; if (c & 8) { const u = t.dynamicProps; for (let h = 0; h < u.length; h++) { const f = u[h]; if (o[f] !== s[f] && !zn(a, f)) return !0 } } } else return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? Br(s, o, a) : !0 : !!o; return !1 }

function Br(e, t, n) { const s = Object.keys(t); if (s.length !== Object.keys(e).length) return !0; for (let r = 0; r < s.length; r++) { const i = s[r]; if (t[i] !== e[i] && !zn(n, i)) return !0 } return !1 }

function xc({ vnode: e, parent: t }, n) { for (; t && t.subTree === e;)(e = t.vnode).el = n, t = t.parent }
const vc = e => e.__isSuspense;

function Cc(e, t) { t && t.pendingBranch ? B(e) ? t.effects.push(...e) : t.effects.push(e) : mc(e) }

function Tc(e, t) { if (de) { let n = de.provides; const s = de.parent && de.parent.provides;
        s === n && (n = de.provides = Object.create(s)), n[e] = t } }

function Tn(e, t, n = !1) { const s = de || he; if (s) { const r = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides; if (r && e in r) return r[e]; if (arguments.length > 1) return n && $(t) ? t.call(s.proxy) : t } }

function Ic(e, t) { return sr(e, null, { flush: "post" }) }
const En = {};

function cs(e, t, n) { return sr(e, t, n) }

function sr(e, t, { immediate: n, deep: s, flush: r, onTrack: i, onTrigger: o } = Z) { const l = de; let c, a = !1,
        u = !1; if (ye(e) ? (c = () => e.value, a = ys(e)) : Ft(e) ? (c = () => e, s = !0) : B(e) ? (u = !0, a = e.some(O => Ft(O) || ys(O)), c = () => e.map(O => { if (ye(O)) return O.value; if (Ft(O)) return Et(O); if ($(O)) return at(O, l, 2) })) : $(e) ? t ? c = () => at(e, l, 2) : c = () => { if (!(l && l.isUnmounted)) return h && h(), Te(e, l, 3, [f]) } : c = Pe, t && s) { const O = c;
        c = () => Et(O()) } let h, f = O => { h = P.onStop = () => { at(O, l, 4) } },
        _; if (an)
        if (f = Pe, t ? n && Te(t, l, 3, [c(), u ? [] : void 0, f]) : c(), r === "sync") { const O = Aa();
            _ = O.__watcherHandles || (O.__watcherHandles = []) } else return Pe; let g = u ? new Array(e.length).fill(En) : En; const b = () => { if (!!P.active)
            if (t) { const O = P.run();
                (s || a || (u ? O.some((D, K) => Fn(D, g[K])) : Fn(O, g))) && (h && h(), Te(t, l, 3, [O, g === En ? void 0 : u && g[0] === En ? [] : g, f]), g = O) } else P.run() };
    b.allowRecurse = !!t; let S;
    r === "sync" ? S = b : r === "post" ? S = () => Ae(b, l && l.suspense) : (b.pre = !0, l && (b.id = l.uid), S = () => tr(b)); const P = new zs(c, S);
    t ? n ? b() : g = P.run() : r === "post" ? Ae(P.run.bind(P), l && l.suspense) : P.run(); const W = () => { P.stop(), l && l.scope && js(l.scope.effects, P) }; return _ && _.push(W), W }

function Nc(e, t, n) { const s = this.proxy,
        r = le(e) ? e.includes(".") ? uo(s, e) : () => s[e] : e.bind(s, s); let i;
    $(t) ? i = t : (i = t.handler, n = t); const o = de;
    kt(this); const l = sr(r, i.bind(s), n); return o ? kt(o) : xt(), l }

function uo(e, t) { const n = t.split("."); return () => { let s = e; for (let r = 0; r < n.length && s; r++) s = s[n[r]]; return s } }

function Et(e, t) { if (!re(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e; if (t.add(e), ye(e)) Et(e.value, t);
    else if (B(e))
        for (let n = 0; n < e.length; n++) Et(e[n], t);
    else if (Di(e) || Pt(e)) e.forEach(n => { Et(n, t) });
    else if (Ki(e))
        for (const n in e) Et(e[n], t); return e }

function Sc() { const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map }; return rr(() => { e.isMounted = !0 }), mo(() => { e.isUnmounting = !0 }), e }
const Ce = [Function, Array],
    Rc = { name: "BaseTransition", props: { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: Ce, onEnter: Ce, onAfterEnter: Ce, onEnterCancelled: Ce, onBeforeLeave: Ce, onLeave: Ce, onAfterLeave: Ce, onLeaveCancelled: Ce, onBeforeAppear: Ce, onAppear: Ce, onAfterAppear: Ce, onAppearCancelled: Ce }, setup(e, { slots: t }) { const n = Lo(),
                s = Sc(); let r; return () => { const i = t.default && ho(t.default(), !0); if (!i || !i.length) return; let o = i[0]; if (i.length > 1) { for (const b of i)
                        if (b.type !== Ie) { o = b; break } } const l = J(e),
                    { mode: c } = l; if (s.isLeaving) return as(o); const a = Dr(o); if (!a) return as(o); const u = As(a, l, s, n);
                xs(a, u); const h = n.subTree,
                    f = h && Dr(h); let _ = !1; const { getTransitionKey: g } = a.type; if (g) { const b = g();
                    r === void 0 ? r = b : b !== r && (r = b, _ = !0) } if (f && f.type !== Ie && (!wt(a, f) || _)) { const b = As(f, l, s, n); if (xs(f, b), c === "out-in") return s.isLeaving = !0, b.afterLeave = () => { s.isLeaving = !1, n.update.active !== !1 && n.update() }, as(o);
                    c === "in-out" && a.type !== Ie && (b.delayLeave = (S, P, W) => { const O = fo(s, f);
                        O[String(f.key)] = f, S._leaveCb = () => { P(), S._leaveCb = void 0, delete u.delayedLeave }, u.delayedLeave = W }) } return o } } },
    Oc = Rc;

function fo(e, t) { const { leavingVNodes: n } = e; let s = n.get(t.type); return s || (s = Object.create(null), n.set(t.type, s)), s }

function As(e, t, n, s) { const { appear: r, mode: i, persisted: o = !1, onBeforeEnter: l, onEnter: c, onAfterEnter: a, onEnterCancelled: u, onBeforeLeave: h, onLeave: f, onAfterLeave: _, onLeaveCancelled: g, onBeforeAppear: b, onAppear: S, onAfterAppear: P, onAppearCancelled: W } = t, O = String(e.key), D = fo(n, e), K = (k, ne) => { k && Te(k, s, 9, ne) }, ae = (k, ne) => { const X = ne[1];
        K(k, ne), B(k) ? k.every(fe => fe.length <= 1) && X() : k.length <= 1 && X() }, ie = { mode: i, persisted: o, beforeEnter(k) { let ne = l; if (!n.isMounted)
                if (r) ne = b || l;
                else return;
            k._leaveCb && k._leaveCb(!0); const X = D[O];
            X && wt(e, X) && X.el._leaveCb && X.el._leaveCb(), K(ne, [k]) }, enter(k) { let ne = c,
                X = a,
                fe = u; if (!n.isMounted)
                if (r) ne = S || c, X = P || a, fe = W || u;
                else return; let Fe = !1; const Ve = k._enterCb = qt => { Fe || (Fe = !0, qt ? K(fe, [k]) : K(X, [k]), ie.delayedLeave && ie.delayedLeave(), k._enterCb = void 0) };
            ne ? ae(ne, [k, Ve]) : Ve() }, leave(k, ne) { const X = String(e.key); if (k._enterCb && k._enterCb(!0), n.isUnmounting) return ne();
            K(h, [k]); let fe = !1; const Fe = k._leaveCb = Ve => { fe || (fe = !0, ne(), Ve ? K(g, [k]) : K(_, [k]), k._leaveCb = void 0, D[X] === e && delete D[X]) };
            D[X] = e, f ? ae(f, [k, Fe]) : Fe() }, clone(k) { return As(k, t, n, s) } }; return ie }

function as(e) { if (Jn(e)) return e = ft(e), e.children = null, e }

function Dr(e) { return Jn(e) ? e.children ? e.children[0] : void 0 : e }

function xs(e, t) { e.shapeFlag & 6 && e.component ? xs(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t }

function ho(e, t = !1, n) { let s = [],
        r = 0; for (let i = 0; i < e.length; i++) { let o = e[i]; const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
        o.type === te ? (o.patchFlag & 128 && r++, s = s.concat(ho(o.children, t, l))) : (t || o.type !== Ie) && s.push(l != null ? ft(o, { key: l }) : o) } if (r > 1)
        for (let i = 0; i < s.length; i++) s[i].patchFlag = -2; return s }
const Zt = e => !!e.type.__asyncLoader,
    Jn = e => e.type.__isKeepAlive;

function Pc(e, t) { po(e, "a", t) }

function Fc(e, t) { po(e, "da", t) }

function po(e, t, n = de) { const s = e.__wdc || (e.__wdc = () => { let r = n; for (; r;) { if (r.isDeactivated) return;
            r = r.parent } return e() }); if (Yn(t, s, n), n) { let r = n.parent; for (; r && r.parent;) Jn(r.parent.vnode) && Lc(s, t, n, r), r = r.parent } }

function Lc(e, t, n, s) { const r = Yn(t, e, s, !0);
    ir(() => { js(s[t], r) }, n) }

function Yn(e, t, n = de, s = !1) { if (n) { const r = n[e] || (n[e] = []),
            i = t.__weh || (t.__weh = (...o) => { if (n.isUnmounted) return;
                Bt(), kt(n); const l = Te(t, n, e, o); return xt(), Dt(), l }); return s ? r.unshift(i) : r.push(i), i } }
const tt = e => (t, n = de) => (!an || e === "sp") && Yn(e, (...s) => t(...s), n),
    Mc = tt("bm"),
    rr = tt("m"),
    kc = tt("bu"),
    Hc = tt("u"),
    mo = tt("bum"),
    ir = tt("um"),
    Uc = tt("sp"),
    Bc = tt("rtg"),
    Dc = tt("rtc");

function $c(e, t = de) { Yn("ec", e, t) }

function zt(e, t) { const n = he; if (n === null) return e; const s = Gn(n) || n.proxy,
        r = e.dirs || (e.dirs = []); for (let i = 0; i < t.length; i++) { let [o, l, c, a = Z] = t[i];
        o && ($(o) && (o = { mounted: o, updated: o }), o.deep && Et(l), r.push({ dir: o, instance: s, value: l, oldValue: void 0, arg: c, modifiers: a })) } return e }

function mt(e, t, n, s) { const r = e.dirs,
        i = t && t.dirs; for (let o = 0; o < r.length; o++) { const l = r[o];
        i && (l.oldValue = i[o].value); let c = l.dir[s];
        c && (Bt(), Te(c, n, 8, [e.el, l, e, t]), Dt()) } }
const or = "components";

function Ee(e, t) { return _o(or, e, !0, t) || e }
const go = Symbol();

function jc(e) { return le(e) ? _o(or, e, !1) || e : e || go }

function _o(e, t, n = !0, s = !1) { const r = he || de; if (r) { const i = r.type; if (e === or) { const l = ba(i, !1); if (l && (l === t || l === qe(t) || l === Kn(qe(t)))) return i } const o = $r(r[e] || i[e], t) || $r(r.appContext[e], t); return !o && s ? i : o } }

function $r(e, t) { return e && (e[t] || e[qe(t)] || e[Kn(qe(t))]) }

function Mt(e, t, n, s) { let r; const i = n && n[s]; if (B(e) || le(e)) { r = new Array(e.length); for (let o = 0, l = e.length; o < l; o++) r[o] = t(e[o], o, void 0, i && i[o]) } else if (typeof e == "number") { r = new Array(e); for (let o = 0; o < e; o++) r[o] = t(o + 1, o, void 0, i && i[o]) } else if (re(e))
        if (e[Symbol.iterator]) r = Array.from(e, (o, l) => t(o, l, void 0, i && i[l]));
        else { const o = Object.keys(e);
            r = new Array(o.length); for (let l = 0, c = o.length; l < c; l++) { const a = o[l];
                r[l] = t(e[a], a, l, i && i[l]) } } else r = []; return n && (n[s] = r), r }

function bo(e, t, n = {}, s, r) { if (he.isCE || he.parent && Zt(he.parent) && he.parent.isCE) return t !== "default" && (n.name = t), ee("slot", n, s && s()); let i = e[t];
    i && i._c && (i._d = !1), U(); const o = i && wo(i(n)),
        l = $e(te, { key: n.key || o && o.key || `_${t}` }, o || (s ? s() : []), o && e._ === 1 ? 64 : -2); return !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), i && i._c && (i._d = !0), l }

function wo(e) { return e.some(t => So(t) ? !(t.type === Ie || t.type === te && !wo(t.children)) : !0) ? e : null }
const vs = e => e ? Mo(e) ? Gn(e) || e.proxy : vs(e.parent) : null,
    en = ge(Object.create(null), { $: e => e, $el: e => e.vnode.el, $data: e => e.data, $props: e => e.props, $attrs: e => e.attrs, $slots: e => e.slots, $refs: e => e.refs, $parent: e => vs(e.parent), $root: e => vs(e.root), $emit: e => e.emit, $options: e => lr(e), $forceUpdate: e => e.f || (e.f = () => tr(e.update)), $nextTick: e => e.n || (e.n = dc.bind(e.proxy)), $watch: e => Nc.bind(e) }),
    us = (e, t) => e !== Z && !e.__isScriptSetup && q(e, t),
    Kc = { get({ _: e }, t) { const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: c } = e; let a; if (t[0] !== "$") { const _ = o[t]; if (_ !== void 0) switch (_) {
                    case 1:
                        return s[t];
                    case 2:
                        return r[t];
                    case 4:
                        return n[t];
                    case 3:
                        return i[t] } else { if (us(s, t)) return o[t] = 1, s[t]; if (r !== Z && q(r, t)) return o[t] = 2, r[t]; if ((a = e.propsOptions[0]) && q(a, t)) return o[t] = 3, i[t]; if (n !== Z && q(n, t)) return o[t] = 4, n[t];
                    Cs && (o[t] = 0) } } const u = en[t]; let h, f; if (u) return t === "$attrs" && ve(e, "get", t), u(e); if ((h = l.__cssModules) && (h = h[t])) return h; if (n !== Z && q(n, t)) return o[t] = 4, n[t]; if (f = c.config.globalProperties, q(f, t)) return f[t] }, set({ _: e }, t, n) { const { data: s, setupState: r, ctx: i } = e; return us(r, t) ? (r[t] = n, !0) : s !== Z && q(s, t) ? (s[t] = n, !0) : q(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0) }, has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i } }, o) { let l; return !!n[o] || e !== Z && q(e, o) || us(t, o) || (l = i[0]) && q(l, o) || q(s, o) || q(en, o) || q(r.config.globalProperties, o) }, defineProperty(e, t, n) { return n.get != null ? e._.accessCache[t] = 0 : q(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n) } };
let Cs = !0;

function qc(e) { const t = lr(e),
        n = e.proxy,
        s = e.ctx;
    Cs = !1, t.beforeCreate && jr(t.beforeCreate, e, "bc"); const { data: r, computed: i, methods: o, watch: l, provide: c, inject: a, created: u, beforeMount: h, mounted: f, beforeUpdate: _, updated: g, activated: b, deactivated: S, beforeDestroy: P, beforeUnmount: W, destroyed: O, unmounted: D, render: K, renderTracked: ae, renderTriggered: ie, errorCaptured: k, serverPrefetch: ne, expose: X, inheritAttrs: fe, components: Fe, directives: Ve, filters: qt } = t; if (a && Vc(a, s, null, e.appContext.config.unwrapInjectedRef), o)
        for (const oe in o) { const Q = o[oe];
            $(Q) && (s[oe] = Q.bind(n)) }
    if (r) { const oe = r.call(n, n);
        re(oe) && (e.data = Xs(oe)) } if (Cs = !0, i)
        for (const oe in i) { const Q = i[oe],
                ht = $(Q) ? Q.bind(n, n) : $(Q.get) ? Q.get.bind(n, n) : Pe,
                pn = !$(Q) && $(Q.set) ? Q.set.bind(n) : Pe,
                pt = ya({ get: ht, set: pn });
            Object.defineProperty(s, oe, { enumerable: !0, configurable: !0, get: () => pt.value, set: Le => pt.value = Le }) }
    if (l)
        for (const oe in l) yo(l[oe], s, n, oe); if (c) { const oe = $(c) ? c.call(n) : c;
        Reflect.ownKeys(oe).forEach(Q => { Tc(Q, oe[Q]) }) } u && jr(u, e, "c");

    function be(oe, Q) { B(Q) ? Q.forEach(ht => oe(ht.bind(n))) : Q && oe(Q.bind(n)) } if (be(Mc, h), be(rr, f), be(kc, _), be(Hc, g), be(Pc, b), be(Fc, S), be($c, k), be(Dc, ae), be(Bc, ie), be(mo, W), be(ir, D), be(Uc, ne), B(X))
        if (X.length) { const oe = e.exposed || (e.exposed = {});
            X.forEach(Q => { Object.defineProperty(oe, Q, { get: () => n[Q], set: ht => n[Q] = ht }) }) } else e.exposed || (e.exposed = {});
    K && e.render === Pe && (e.render = K), fe != null && (e.inheritAttrs = fe), Fe && (e.components = Fe), Ve && (e.directives = Ve) }

function Vc(e, t, n = Pe, s = !1) { B(e) && (e = Ts(e)); for (const r in e) { const i = e[r]; let o;
        re(i) ? "default" in i ? o = Tn(i.from || r, i.default, !0) : o = Tn(i.from || r) : o = Tn(i), ye(o) && s ? Object.defineProperty(t, r, { enumerable: !0, configurable: !0, get: () => o.value, set: l => o.value = l }) : t[r] = o } }

function jr(e, t, n) { Te(B(e) ? e.map(s => s.bind(t.proxy)) : e.bind(t.proxy), t, n) }

function yo(e, t, n, s) { const r = s.includes(".") ? uo(n, s) : () => n[s]; if (le(e)) { const i = t[e];
        $(i) && cs(r, i) } else if ($(e)) cs(r, e.bind(n));
    else if (re(e))
        if (B(e)) e.forEach(i => yo(i, t, n, s));
        else { const i = $(e.handler) ? e.handler.bind(n) : t[e.handler];
            $(i) && cs(r, i, e) } }

function lr(e) { const t = e.type,
        { mixins: n, extends: s } = t,
        { mixins: r, optionsCache: i, config: { optionMergeStrategies: o } } = e.appContext,
        l = i.get(t); let c; return l ? c = l : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(a => Hn(c, a, o, !0)), Hn(c, t, o)), re(t) && i.set(t, c), c }

function Hn(e, t, n, s = !1) { const { mixins: r, extends: i } = t;
    i && Hn(e, i, n, !0), r && r.forEach(o => Hn(e, o, n, !0)); for (const o in t)
        if (!(s && o === "expose")) { const l = zc[o] || n && n[o];
            e[o] = l ? l(e[o], t[o]) : t[o] } return e }
const zc = { data: Kr, props: _t, emits: _t, methods: _t, computed: _t, beforeCreate: we, created: we, beforeMount: we, mounted: we, beforeUpdate: we, updated: we, beforeDestroy: we, beforeUnmount: we, destroyed: we, unmounted: we, activated: we, deactivated: we, errorCaptured: we, serverPrefetch: we, components: _t, directives: _t, watch: Jc, provide: Kr, inject: Wc };

function Kr(e, t) { return t ? e ? function() { return ge($(e) ? e.call(this, this) : e, $(t) ? t.call(this, this) : t) } : t : e }

function Wc(e, t) { return _t(Ts(e), Ts(t)) }

function Ts(e) { if (B(e)) { const t = {}; for (let n = 0; n < e.length; n++) t[e[n]] = e[n]; return t } return e }

function we(e, t) { return e ? [...new Set([].concat(e, t))] : t }

function _t(e, t) { return e ? ge(ge(Object.create(null), e), t) : t }

function Jc(e, t) { if (!e) return t; if (!t) return e; const n = ge(Object.create(null), e); for (const s in t) n[s] = we(e[s], t[s]); return n }

function Yc(e, t, n, s = !1) { const r = {},
        i = {};
    Ln(i, Qn, 1), e.propsDefaults = Object.create(null), Eo(e, t, r, i); for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
    n ? e.props = s ? r : rc(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i }

function Xc(e, t, n, s) { const { props: r, attrs: i, vnode: { patchFlag: o } } = e, l = J(r), [c] = e.propsOptions; let a = !1; if ((s || o > 0) && !(o & 16)) { if (o & 8) { const u = e.vnode.dynamicProps; for (let h = 0; h < u.length; h++) { let f = u[h]; if (zn(e.emitsOptions, f)) continue; const _ = t[f]; if (c)
                    if (q(i, f)) _ !== i[f] && (i[f] = _, a = !0);
                    else { const g = qe(f);
                        r[g] = Is(c, l, g, _, e, !1) } else _ !== i[f] && (i[f] = _, a = !0) } } } else { Eo(e, t, r, i) && (a = !0); let u; for (const h in l)(!t || !q(t, h) && ((u = Ut(h)) === h || !q(t, u))) && (c ? n && (n[h] !== void 0 || n[u] !== void 0) && (r[h] = Is(c, l, h, void 0, e, !0)) : delete r[h]); if (i !== l)
            for (const h in i)(!t || !q(t, h) && !0) && (delete i[h], a = !0) } a && et(e, "set", "$attrs") }

function Eo(e, t, n, s) { const [r, i] = e.propsOptions; let o = !1,
        l; if (t)
        for (let c in t) { if (vn(c)) continue; const a = t[c]; let u;
            r && q(r, u = qe(c)) ? !i || !i.includes(u) ? n[u] = a : (l || (l = {}))[u] = a : zn(e.emitsOptions, c) || (!(c in s) || a !== s[c]) && (s[c] = a, o = !0) }
    if (i) { const c = J(n),
            a = l || Z; for (let u = 0; u < i.length; u++) { const h = i[u];
            n[h] = Is(r, c, h, a[h], e, !q(a, h)) } } return o }

function Is(e, t, n, s, r, i) { const o = e[n]; if (o != null) { const l = q(o, "default"); if (l && s === void 0) { const c = o.default; if (o.type !== Function && $(c)) { const { propsDefaults: a } = r;
                n in a ? s = a[n] : (kt(r), s = a[n] = c.call(null, t), xt()) } else s = c } o[0] && (i && !l ? s = !1 : o[1] && (s === "" || s === Ut(n)) && (s = !0)) } return s }

function Ao(e, t, n = !1) { const s = t.propsCache,
        r = s.get(e); if (r) return r; const i = e.props,
        o = {},
        l = []; let c = !1; if (!$(e)) { const u = h => { c = !0; const [f, _] = Ao(h, t, !0);
            ge(o, f), _ && l.push(..._) };!n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u) } if (!i && !c) return re(e) && s.set(e, Ot), Ot; if (B(i))
        for (let u = 0; u < i.length; u++) { const h = qe(i[u]);
            qr(h) && (o[h] = Z) } else if (i)
            for (const u in i) { const h = qe(u); if (qr(h)) { const f = i[u],
                        _ = o[h] = B(f) || $(f) ? { type: f } : Object.assign({}, f); if (_) { const g = Wr(Boolean, _.type),
                            b = Wr(String, _.type);
                        _[0] = g > -1, _[1] = b < 0 || g < b, (g > -1 || q(_, "default")) && l.push(h) } } }
    const a = [o, l]; return re(e) && s.set(e, a), a }

function qr(e) { return e[0] !== "$" }

function Vr(e) { const t = e && e.toString().match(/^\s*function (\w+)/); return t ? t[1] : e === null ? "null" : "" }

function zr(e, t) { return Vr(e) === Vr(t) }

function Wr(e, t) { return B(t) ? t.findIndex(n => zr(n, e)) : $(t) && zr(t, e) ? 0 : -1 }
const xo = e => e[0] === "_" || e === "$stable",
    cr = e => B(e) ? e.map(Ue) : [Ue(e)],
    Qc = (e, t, n) => { if (t._n) return t; const s = nr((...r) => cr(t(...r)), n); return s._c = !1, s },
    vo = (e, t, n) => { const s = e._ctx; for (const r in e) { if (xo(r)) continue; const i = e[r]; if ($(i)) t[r] = Qc(r, i, s);
            else if (i != null) { const o = cr(i);
                t[r] = () => o } } },
    Co = (e, t) => { const n = cr(t);
        e.slots.default = () => n },
    Gc = (e, t) => { if (e.vnode.shapeFlag & 32) { const n = t._;
            n ? (e.slots = J(t), Ln(t, "_", n)) : vo(t, e.slots = {}) } else e.slots = {}, t && Co(e, t);
        Ln(e.slots, Qn, 1) },
    Zc = (e, t, n) => { const { vnode: s, slots: r } = e; let i = !0,
            o = Z; if (s.shapeFlag & 32) { const l = t._;
            l ? n && l === 1 ? i = !1 : (ge(r, t), !n && l === 1 && delete r._) : (i = !t.$stable, vo(t, r)), o = t } else t && (Co(e, t), o = { default: 1 }); if (i)
            for (const l in r) !xo(l) && !(l in o) && delete r[l] };

function To() { return { app: null, config: { isNativeTag: vl, performance: !1, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: Object.create(null), optionsCache: new WeakMap, propsCache: new WeakMap, emitsCache: new WeakMap } }
let ea = 0;

function ta(e, t) { return function(s, r = null) { $(s) || (s = Object.assign({}, s)), r != null && !re(r) && (r = null); const i = To(),
            o = new Set; let l = !1; const c = i.app = { _uid: ea++, _component: s, _props: r, _container: null, _context: i, _instance: null, version: xa, get config() { return i.config }, set config(a) {}, use(a, ...u) { return o.has(a) || (a && $(a.install) ? (o.add(a), a.install(c, ...u)) : $(a) && (o.add(a), a(c, ...u))), c }, mixin(a) { return i.mixins.includes(a) || i.mixins.push(a), c }, component(a, u) { return u ? (i.components[a] = u, c) : i.components[a] }, directive(a, u) { return u ? (i.directives[a] = u, c) : i.directives[a] }, mount(a, u, h) { if (!l) { const f = ee(s, r); return f.appContext = i, u && t ? t(f, a) : e(f, a, h), l = !0, c._container = a, a.__vue_app__ = c, Gn(f.component) || f.component.proxy } }, unmount() { l && (e(null, c._container), delete c._container.__vue_app__) }, provide(a, u) { return i.provides[a] = u, c } }; return c } }

function Ns(e, t, n, s, r = !1) { if (B(e)) { e.forEach((f, _) => Ns(f, t && (B(t) ? t[_] : t), n, s, r)); return } if (Zt(s) && !r) return; const i = s.shapeFlag & 4 ? Gn(s.component) || s.component.proxy : s.el,
        o = r ? null : i,
        { i: l, r: c } = e,
        a = t && t.r,
        u = l.refs === Z ? l.refs = {} : l.refs,
        h = l.setupState; if (a != null && a !== c && (le(a) ? (u[a] = null, q(h, a) && (h[a] = null)) : ye(a) && (a.value = null)), $(c)) at(c, l, 12, [o, u]);
    else { const f = le(c),
            _ = ye(c); if (f || _) { const g = () => { if (e.f) { const b = f ? q(h, c) ? h[c] : u[c] : c.value;
                    r ? B(b) && js(b, i) : B(b) ? b.includes(i) || b.push(i) : f ? (u[c] = [i], q(h, c) && (h[c] = u[c])) : (c.value = [i], e.k && (u[e.k] = c.value)) } else f ? (u[c] = o, q(h, c) && (h[c] = o)) : _ && (c.value = o, e.k && (u[e.k] = o)) };
            o ? (g.id = -1, Ae(g, n)) : g() } } }
const Ae = Cc;

function na(e) { return sa(e) }

function sa(e, t) { const n = Rl();
    n.__VUE__ = !0; const { insert: s, remove: r, patchProp: i, createElement: o, createText: l, createComment: c, setText: a, setElementText: u, parentNode: h, nextSibling: f, setScopeId: _ = Pe, insertStaticContent: g } = e, b = (d, p, w, A = null, E = null, C = null, N = !1, v = null, T = !!p.dynamicChildren) => { if (d === p) return;
        d && !wt(d, p) && (A = mn(d), Le(d, E, C, !0), d = null), p.patchFlag === -2 && (T = !1, p.dynamicChildren = null); const { type: x, ref: L, shapeFlag: F } = p; switch (x) {
            case Xn:
                S(d, p, w, A); break;
            case Ie:
                P(d, p, w, A); break;
            case nn:
                d == null && W(p, w, A, N); break;
            case te:
                Fe(d, p, w, A, E, C, N, v, T); break;
            default:
                F & 1 ? K(d, p, w, A, E, C, N, v, T) : F & 6 ? Ve(d, p, w, A, E, C, N, v, T) : (F & 64 || F & 128) && x.process(d, p, w, A, E, C, N, v, T, It) } L != null && E && Ns(L, d && d.ref, C, p || d, !p) }, S = (d, p, w, A) => { if (d == null) s(p.el = l(p.children), w, A);
        else { const E = p.el = d.el;
            p.children !== d.children && a(E, p.children) } }, P = (d, p, w, A) => { d == null ? s(p.el = c(p.children || ""), w, A) : p.el = d.el }, W = (d, p, w, A) => {
        [d.el, d.anchor] = g(d.children, p, w, A, d.el, d.anchor) }, O = ({ el: d, anchor: p }, w, A) => { let E; for (; d && d !== p;) E = f(d), s(d, w, A), d = E;
        s(p, w, A) }, D = ({ el: d, anchor: p }) => { let w; for (; d && d !== p;) w = f(d), r(d), d = w;
        r(p) }, K = (d, p, w, A, E, C, N, v, T) => { N = N || p.type === "svg", d == null ? ae(p, w, A, E, C, N, v, T) : ne(d, p, E, C, N, v, T) }, ae = (d, p, w, A, E, C, N, v) => { let T, x; const { type: L, props: F, shapeFlag: M, transition: H, dirs: j } = d; if (T = d.el = o(d.type, C, F && F.is, F), M & 8 ? u(T, d.children) : M & 16 && k(d.children, T, null, A, E, C && L !== "foreignObject", N, v), j && mt(d, null, A, "created"), F) { for (const Y in F) Y !== "value" && !vn(Y) && i(T, Y, null, F[Y], C, d.children, A, E, ze); "value" in F && i(T, "value", null, F.value), (x = F.onVnodeBeforeMount) && ke(x, A, d) } ie(T, d, d.scopeId, N, A), j && mt(d, null, A, "beforeMount"); const G = (!E || E && !E.pendingBranch) && H && !H.persisted;
        G && H.beforeEnter(T), s(T, p, w), ((x = F && F.onVnodeMounted) || G || j) && Ae(() => { x && ke(x, A, d), G && H.enter(T), j && mt(d, null, A, "mounted") }, E) }, ie = (d, p, w, A, E) => { if (w && _(d, w), A)
            for (let C = 0; C < A.length; C++) _(d, A[C]); if (E) { let C = E.subTree; if (p === C) { const N = E.vnode;
                ie(d, N, N.scopeId, N.slotScopeIds, E.parent) } } }, k = (d, p, w, A, E, C, N, v, T = 0) => { for (let x = T; x < d.length; x++) { const L = d[x] = v ? ot(d[x]) : Ue(d[x]);
            b(null, L, p, w, A, E, C, N, v) } }, ne = (d, p, w, A, E, C, N) => { const v = p.el = d.el; let { patchFlag: T, dynamicChildren: x, dirs: L } = p;
        T |= d.patchFlag & 16; const F = d.props || Z,
            M = p.props || Z; let H;
        w && gt(w, !1), (H = M.onVnodeBeforeUpdate) && ke(H, w, p, d), L && mt(p, d, w, "beforeUpdate"), w && gt(w, !0); const j = E && p.type !== "foreignObject"; if (x ? X(d.dynamicChildren, x, v, w, A, j, C) : N || Q(d, p, v, null, w, A, j, C, !1), T > 0) { if (T & 16) fe(v, p, F, M, w, A, E);
            else if (T & 2 && F.class !== M.class && i(v, "class", null, M.class, E), T & 4 && i(v, "style", F.style, M.style, E), T & 8) { const G = p.dynamicProps; for (let Y = 0; Y < G.length; Y++) { const ce = G[Y],
                        Ne = F[ce],
                        Nt = M[ce];
                    (Nt !== Ne || ce === "value") && i(v, ce, Ne, Nt, E, d.children, w, A, ze) } } T & 1 && d.children !== p.children && u(v, p.children) } else !N && x == null && fe(v, p, F, M, w, A, E);
        ((H = M.onVnodeUpdated) || L) && Ae(() => { H && ke(H, w, p, d), L && mt(p, d, w, "updated") }, A) }, X = (d, p, w, A, E, C, N) => { for (let v = 0; v < p.length; v++) { const T = d[v],
                x = p[v],
                L = T.el && (T.type === te || !wt(T, x) || T.shapeFlag & 70) ? h(T.el) : w;
            b(T, x, L, null, A, E, C, N, !0) } }, fe = (d, p, w, A, E, C, N) => { if (w !== A) { if (w !== Z)
                for (const v in w) !vn(v) && !(v in A) && i(d, v, w[v], null, N, p.children, E, C, ze); for (const v in A) { if (vn(v)) continue; const T = A[v],
                    x = w[v];
                T !== x && v !== "value" && i(d, v, x, T, N, p.children, E, C, ze) } "value" in A && i(d, "value", w.value, A.value) } }, Fe = (d, p, w, A, E, C, N, v, T) => { const x = p.el = d ? d.el : l(""),
            L = p.anchor = d ? d.anchor : l(""); let { patchFlag: F, dynamicChildren: M, slotScopeIds: H } = p;
        H && (v = v ? v.concat(H) : H), d == null ? (s(x, w, A), s(L, w, A), k(p.children, w, L, E, C, N, v, T)) : F > 0 && F & 64 && M && d.dynamicChildren ? (X(d.dynamicChildren, M, w, E, C, N, v), (p.key != null || E && p === E.subTree) && ar(d, p, !0)) : Q(d, p, w, L, E, C, N, v, T) }, Ve = (d, p, w, A, E, C, N, v, T) => { p.slotScopeIds = v, d == null ? p.shapeFlag & 512 ? E.ctx.activate(p, w, A, N, T) : qt(p, w, A, E, C, N, T) : vr(d, p, T) }, qt = (d, p, w, A, E, C, N) => { const v = d.component = ha(d, A, E); if (Jn(d) && (v.ctx.renderer = It), pa(v), v.asyncDep) { if (E && E.registerDep(v, be), !d.el) { const T = v.subTree = ee(Ie);
                P(null, T, p, w) } return } be(v, d, p, w, E, C, N) }, vr = (d, p, w) => { const A = p.component = d.component; if (Ac(d, p, w))
            if (A.asyncDep && !A.asyncResolved) { oe(A, p, w); return } else A.next = p, pc(A.update), A.update();
        else p.el = d.el, A.vnode = p }, be = (d, p, w, A, E, C, N) => { const v = () => { if (d.isMounted) { let { next: L, bu: F, u: M, parent: H, vnode: j } = d, G = L, Y;
                    gt(d, !1), L ? (L.el = j.el, oe(d, L, N)) : L = j, F && Cn(F), (Y = L.props && L.props.onVnodeBeforeUpdate) && ke(Y, H, L, j), gt(d, !0); const ce = ls(d),
                        Ne = d.subTree;
                    d.subTree = ce, b(Ne, ce, h(Ne.el), mn(Ne), d, E, C), L.el = ce.el, G === null && xc(d, ce.el), M && Ae(M, E), (Y = L.props && L.props.onVnodeUpdated) && Ae(() => ke(Y, H, L, j), E) } else { let L; const { el: F, props: M } = p, { bm: H, m: j, parent: G } = d, Y = Zt(p); if (gt(d, !1), H && Cn(H), !Y && (L = M && M.onVnodeBeforeMount) && ke(L, G, p), gt(d, !0), F && is) { const ce = () => { d.subTree = ls(d), is(F, d.subTree, d, E, null) };
                        Y ? p.type.__asyncLoader().then(() => !d.isUnmounted && ce()) : ce() } else { const ce = d.subTree = ls(d);
                        b(null, ce, w, A, d, E, C), p.el = ce.el } if (j && Ae(j, E), !Y && (L = M && M.onVnodeMounted)) { const ce = p;
                        Ae(() => ke(L, G, ce), E) }(p.shapeFlag & 256 || G && Zt(G.vnode) && G.vnode.shapeFlag & 256) && d.a && Ae(d.a, E), d.isMounted = !0, p = w = A = null } },
            T = d.effect = new zs(v, () => tr(x), d.scope),
            x = d.update = () => T.run();
        x.id = d.uid, gt(d, !0), x() }, oe = (d, p, w) => { p.component = d; const A = d.vnode.props;
        d.vnode = p, d.next = null, Xc(d, p.props, A, w), Zc(d, p.children, w), Bt(), Ur(), Dt() }, Q = (d, p, w, A, E, C, N, v, T = !1) => { const x = d && d.children,
            L = d ? d.shapeFlag : 0,
            F = p.children,
            { patchFlag: M, shapeFlag: H } = p; if (M > 0) { if (M & 128) { pn(x, F, w, A, E, C, N, v, T); return } else if (M & 256) { ht(x, F, w, A, E, C, N, v, T); return } } H & 8 ? (L & 16 && ze(x, E, C), F !== x && u(w, F)) : L & 16 ? H & 16 ? pn(x, F, w, A, E, C, N, v, T) : ze(x, E, C, !0) : (L & 8 && u(w, ""), H & 16 && k(F, w, A, E, C, N, v, T)) }, ht = (d, p, w, A, E, C, N, v, T) => { d = d || Ot, p = p || Ot; const x = d.length,
            L = p.length,
            F = Math.min(x, L); let M; for (M = 0; M < F; M++) { const H = p[M] = T ? ot(p[M]) : Ue(p[M]);
            b(d[M], H, w, null, E, C, N, v, T) } x > L ? ze(d, E, C, !0, !1, F) : k(p, w, A, E, C, N, v, T, F) }, pn = (d, p, w, A, E, C, N, v, T) => { let x = 0; const L = p.length; let F = d.length - 1,
            M = L - 1; for (; x <= F && x <= M;) { const H = d[x],
                j = p[x] = T ? ot(p[x]) : Ue(p[x]); if (wt(H, j)) b(H, j, w, null, E, C, N, v, T);
            else break;
            x++ } for (; x <= F && x <= M;) { const H = d[F],
                j = p[M] = T ? ot(p[M]) : Ue(p[M]); if (wt(H, j)) b(H, j, w, null, E, C, N, v, T);
            else break;
            F--, M-- } if (x > F) { if (x <= M) { const H = M + 1,
                    j = H < L ? p[H].el : A; for (; x <= M;) b(null, p[x] = T ? ot(p[x]) : Ue(p[x]), w, j, E, C, N, v, T), x++ } } else if (x > M)
            for (; x <= F;) Le(d[x], E, C, !0), x++;
        else { const H = x,
                j = x,
                G = new Map; for (x = j; x <= M; x++) { const xe = p[x] = T ? ot(p[x]) : Ue(p[x]);
                xe.key != null && G.set(xe.key, x) } let Y, ce = 0; const Ne = M - j + 1; let Nt = !1,
                Ir = 0; const Vt = new Array(Ne); for (x = 0; x < Ne; x++) Vt[x] = 0; for (x = H; x <= F; x++) { const xe = d[x]; if (ce >= Ne) { Le(xe, E, C, !0); continue } let Me; if (xe.key != null) Me = G.get(xe.key);
                else
                    for (Y = j; Y <= M; Y++)
                        if (Vt[Y - j] === 0 && wt(xe, p[Y])) { Me = Y; break } Me === void 0 ? Le(xe, E, C, !0) : (Vt[Me - j] = x + 1, Me >= Ir ? Ir = Me : Nt = !0, b(xe, p[Me], w, null, E, C, N, v, T), ce++) } const Nr = Nt ? ra(Vt) : Ot; for (Y = Nr.length - 1, x = Ne - 1; x >= 0; x--) { const xe = j + x,
                    Me = p[xe],
                    Sr = xe + 1 < L ? p[xe + 1].el : A;
                Vt[x] === 0 ? b(null, Me, w, Sr, E, C, N, v, T) : Nt && (Y < 0 || x !== Nr[Y] ? pt(Me, w, Sr, 2) : Y--) } } }, pt = (d, p, w, A, E = null) => { const { el: C, type: N, transition: v, children: T, shapeFlag: x } = d; if (x & 6) { pt(d.component.subTree, p, w, A); return } if (x & 128) { d.suspense.move(p, w, A); return } if (x & 64) { N.move(d, p, w, It); return } if (N === te) { s(C, p, w); for (let F = 0; F < T.length; F++) pt(T[F], p, w, A);
            s(d.anchor, p, w); return } if (N === nn) { O(d, p, w); return } if (A !== 2 && x & 1 && v)
            if (A === 0) v.beforeEnter(C), s(C, p, w), Ae(() => v.enter(C), E);
            else { const { leave: F, delayLeave: M, afterLeave: H } = v, j = () => s(C, p, w), G = () => { F(C, () => { j(), H && H() }) };
                M ? M(C, j, G) : G() } else s(C, p, w) }, Le = (d, p, w, A = !1, E = !1) => { const { type: C, props: N, ref: v, children: T, dynamicChildren: x, shapeFlag: L, patchFlag: F, dirs: M } = d; if (v != null && Ns(v, null, w, d, !0), L & 256) { p.ctx.deactivate(d); return } const H = L & 1 && M,
            j = !Zt(d); let G; if (j && (G = N && N.onVnodeBeforeUnmount) && ke(G, p, d), L & 6) _l(d.component, w, A);
        else { if (L & 128) { d.suspense.unmount(w, A); return } H && mt(d, null, p, "beforeUnmount"), L & 64 ? d.type.remove(d, p, w, E, It, A) : x && (C !== te || F > 0 && F & 64) ? ze(x, p, w, !1, !0) : (C === te && F & 384 || !E && L & 16) && ze(T, p, w), A && Cr(d) }(j && (G = N && N.onVnodeUnmounted) || H) && Ae(() => { G && ke(G, p, d), H && mt(d, null, p, "unmounted") }, w) }, Cr = d => { const { type: p, el: w, anchor: A, transition: E } = d; if (p === te) { gl(w, A); return } if (p === nn) { D(d); return } const C = () => { r(w), E && !E.persisted && E.afterLeave && E.afterLeave() }; if (d.shapeFlag & 1 && E && !E.persisted) { const { leave: N, delayLeave: v } = E, T = () => N(w, C);
            v ? v(d.el, C, T) : T() } else C() }, gl = (d, p) => { let w; for (; d !== p;) w = f(d), r(d), d = w;
        r(p) }, _l = (d, p, w) => { const { bum: A, scope: E, update: C, subTree: N, um: v } = d;
        A && Cn(A), E.stop(), C && (C.active = !1, Le(N, d, p, w)), v && Ae(v, p), Ae(() => { d.isUnmounted = !0 }, p), p && p.pendingBranch && !p.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === p.pendingId && (p.deps--, p.deps === 0 && p.resolve()) }, ze = (d, p, w, A = !1, E = !1, C = 0) => { for (let N = C; N < d.length; N++) Le(d[N], p, w, A, E) }, mn = d => d.shapeFlag & 6 ? mn(d.component.subTree) : d.shapeFlag & 128 ? d.suspense.next() : f(d.anchor || d.el), Tr = (d, p, w) => { d == null ? p._vnode && Le(p._vnode, null, null, !0) : b(p._vnode || null, d, p, null, null, null, w), Ur(), lo(), p._vnode = d }, It = { p: b, um: Le, m: pt, r: Cr, mt: qt, mc: k, pc: Q, pbc: X, n: mn, o: e }; let rs, is; return t && ([rs, is] = t(It)), { render: Tr, hydrate: rs, createApp: ta(Tr, rs) } }

function gt({ effect: e, update: t }, n) { e.allowRecurse = t.allowRecurse = n }

function ar(e, t, n = !1) { const s = e.children,
        r = t.children; if (B(s) && B(r))
        for (let i = 0; i < s.length; i++) { const o = s[i]; let l = r[i];
            l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = ot(r[i]), l.el = o.el), n || ar(o, l)), l.type === Xn && (l.el = o.el) } }

function ra(e) { const t = e.slice(),
        n = [0]; let s, r, i, o, l; const c = e.length; for (s = 0; s < c; s++) { const a = e[s]; if (a !== 0) { if (r = n[n.length - 1], e[r] < a) { t[s] = r, n.push(s); continue } for (i = 0, o = n.length - 1; i < o;) l = i + o >> 1, e[n[l]] < a ? i = l + 1 : o = l;
            a < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s) } } for (i = n.length, o = n[i - 1]; i-- > 0;) n[i] = o, o = t[o]; return n }
const ia = e => e.__isTeleport,
    tn = e => e && (e.disabled || e.disabled === ""),
    Jr = e => typeof SVGElement < "u" && e instanceof SVGElement,
    Ss = (e, t) => { const n = e && e.to; return le(n) ? t ? t(n) : null : n },
    oa = { __isTeleport: !0, process(e, t, n, s, r, i, o, l, c, a) { const { mc: u, pc: h, pbc: f, o: { insert: _, querySelector: g, createText: b, createComment: S } } = a, P = tn(t.props); let { shapeFlag: W, children: O, dynamicChildren: D } = t; if (e == null) { const K = t.el = b(""),
                    ae = t.anchor = b("");
                _(K, n, s), _(ae, n, s); const ie = t.target = Ss(t.props, g),
                    k = t.targetAnchor = b("");
                ie && (_(k, ie), o = o || Jr(ie)); const ne = (X, fe) => { W & 16 && u(O, X, fe, r, i, o, l, c) };
                P ? ne(n, ae) : ie && ne(ie, k) } else { t.el = e.el; const K = t.anchor = e.anchor,
                    ae = t.target = e.target,
                    ie = t.targetAnchor = e.targetAnchor,
                    k = tn(e.props),
                    ne = k ? n : ae,
                    X = k ? K : ie; if (o = o || Jr(ae), D ? (f(e.dynamicChildren, D, ne, r, i, o, l), ar(e, t, !0)) : c || h(e, t, ne, X, r, i, o, l, !1), P) k || An(t, n, K, a, 1);
                else if ((t.props && t.props.to) !== (e.props && e.props.to)) { const fe = t.target = Ss(t.props, g);
                    fe && An(t, fe, null, a, 0) } else k && An(t, ae, ie, a, 1) } Io(t) }, remove(e, t, n, s, { um: r, o: { remove: i } }, o) { const { shapeFlag: l, children: c, anchor: a, targetAnchor: u, target: h, props: f } = e; if (h && i(u), (o || !tn(f)) && (i(a), l & 16))
                for (let _ = 0; _ < c.length; _++) { const g = c[_];
                    r(g, t, n, !0, !!g.dynamicChildren) } }, move: An, hydrate: la };

function An(e, t, n, { o: { insert: s }, m: r }, i = 2) { i === 0 && s(e.targetAnchor, t, n); const { el: o, anchor: l, shapeFlag: c, children: a, props: u } = e, h = i === 2; if (h && s(o, t, n), (!h || tn(u)) && c & 16)
        for (let f = 0; f < a.length; f++) r(a[f], t, n, 2);
    h && s(l, t, n) }

function la(e, t, n, s, r, i, { o: { nextSibling: o, parentNode: l, querySelector: c } }, a) { const u = t.target = Ss(t.props, c); if (u) { const h = u._lpa || u.firstChild; if (t.shapeFlag & 16)
            if (tn(t.props)) t.anchor = a(o(e), t, l(e), n, s, r, i), t.targetAnchor = h;
            else { t.anchor = o(e); let f = h; for (; f;)
                    if (f = o(f), f && f.nodeType === 8 && f.data === "teleport anchor") { t.targetAnchor = f, u._lpa = t.targetAnchor && o(t.targetAnchor); break } a(h, t, u, n, s, r, i) } Io(t) } return t.anchor && o(t.anchor) }
const ca = oa;

function Io(e) { const t = e.ctx; if (t && t.ut) { let n = e.children[0].el; for (; n !== e.targetAnchor;) n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
        t.ut() } }
const te = Symbol(void 0),
    Xn = Symbol(void 0),
    Ie = Symbol(void 0),
    nn = Symbol(void 0),
    sn = [];
let Oe = null;

function U(e = !1) { sn.push(Oe = e ? null : []) }

function aa() { sn.pop(), Oe = sn[sn.length - 1] || null }
let cn = 1;

function Yr(e) { cn += e }

function No(e) { return e.dynamicChildren = cn > 0 ? Oe || Ot : null, aa(), cn > 0 && Oe && Oe.push(e), e }

function z(e, t, n, s, r, i) { return No(I(e, t, n, s, r, i, !0)) }

function $e(e, t, n, s, r) { return No(ee(e, t, n, s, r, !0)) }

function So(e) { return e ? e.__v_isVNode === !0 : !1 }

function wt(e, t) { return e.type === t.type && e.key === t.key }
const Qn = "__vInternal",
    Ro = ({ key: e }) => e ? ? null,
    In = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? le(e) || ye(e) || $(e) ? { i: he, r: e, k: t, f: !!n } : e : null;

function I(e, t = null, n = null, s = 0, r = null, i = e === te ? 0 : 1, o = !1, l = !1) { const c = { __v_isVNode: !0, __v_skip: !0, type: e, props: t, key: t && Ro(t), ref: t && In(t), scopeId: Wn, slotScopeIds: null, children: n, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetAnchor: null, staticCount: 0, shapeFlag: i, patchFlag: s, dynamicProps: r, dynamicChildren: null, appContext: null, ctx: he }; return l ? (ur(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= le(n) ? 8 : 16), cn > 0 && !o && Oe && (c.patchFlag > 0 || i & 6) && c.patchFlag !== 32 && Oe.push(c), c }
const ee = ua;

function ua(e, t = null, n = null, s = 0, r = null, i = !1) { if ((!e || e === go) && (e = Ie), So(e)) { const l = ft(e, t, !0); return n && ur(l, n), cn > 0 && !i && Oe && (l.shapeFlag & 6 ? Oe[Oe.indexOf(e)] = l : Oe.push(l)), l.patchFlag |= -2, l } if (wa(e) && (e = e.__vccOpts), t) { t = Xe(t); let { class: l, style: c } = t;
        l && !le(l) && (t.class = Tt(l)), re(c) && (to(c) && !B(c) && (c = ge({}, c)), t.style = vt(c)) } const o = le(e) ? 1 : vc(e) ? 128 : ia(e) ? 64 : re(e) ? 4 : $(e) ? 2 : 0; return I(e, t, n, s, r, o, i, !0) }

function Xe(e) { return e ? to(e) || Qn in e ? ge({}, e) : e : null }

function ft(e, t, n = !1) { const { props: s, ref: r, patchFlag: i, children: o } = e, l = t ? Fo(s || {}, t) : s; return { __v_isVNode: !0, __v_skip: !0, type: e.type, props: l, key: l && Ro(l), ref: t && t.ref ? n && r ? B(r) ? r.concat(In(t)) : [r, In(t)] : In(t) : r, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: o, target: e.target, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== te ? i === -1 ? 16 : i | 16 : i, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: e.transition, component: e.component, suspense: e.suspense, ssContent: e.ssContent && ft(e.ssContent), ssFallback: e.ssFallback && ft(e.ssFallback), el: e.el, anchor: e.anchor, ctx: e.ctx } }

function Oo(e = " ", t = 0) { return ee(Xn, null, e, t) }

function Po(e, t) { const n = ee(nn, null, e); return n.staticCount = t, n }

function $t(e = "", t = !1) { return t ? (U(), $e(Ie, null, e)) : ee(Ie, null, e) }

function Ue(e) { return e == null || typeof e == "boolean" ? ee(Ie) : B(e) ? ee(te, null, e.slice()) : typeof e == "object" ? ot(e) : ee(Xn, null, String(e)) }

function ot(e) { return e.el === null && e.patchFlag !== -1 || e.memo ? e : ft(e) }

function ur(e, t) { let n = 0; const { shapeFlag: s } = e; if (t == null) t = null;
    else if (B(t)) n = 16;
    else if (typeof t == "object")
        if (s & 65) { const r = t.default;
            r && (r._c && (r._d = !1), ur(e, r()), r._c && (r._d = !0)); return } else { n = 32; const r = t._;!r && !(Qn in t) ? t._ctx = he : r === 3 && he && (he.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) } else $(t) ? (t = { default: t, _ctx: he }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Oo(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n }

function Fo(...e) { const t = {}; for (let n = 0; n < e.length; n++) { const s = e[n]; for (const r in s)
            if (r === "class") t.class !== s.class && (t.class = Tt([t.class, s.class]));
            else if (r === "style") t.style = vt([t.style, s.style]);
        else if (Dn(r)) { const i = t[r],
                o = s[r];
            o && i !== o && !(B(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o) } else r !== "" && (t[r] = s[r]) } return t }

function ke(e, t, n, s = null) { Te(e, t, 7, [n, s]) }
const fa = To();
let da = 0;

function ha(e, t, n) { const s = e.type,
        r = (t ? t.appContext : e.appContext) || fa,
        i = { uid: da++, vnode: e, type: s, parent: t, appContext: r, root: null, next: null, subTree: null, effect: null, update: null, scope: new Ol(!0), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(r.provides), accessCache: null, renderCache: [], components: null, directives: null, propsOptions: Ao(s, r), emitsOptions: ao(s, r), emit: null, emitted: null, propsDefaults: Z, inheritAttrs: s.inheritAttrs, ctx: Z, data: Z, props: Z, attrs: Z, slots: Z, refs: Z, setupState: Z, setupContext: null, suspense: n, suspenseId: n ? n.pendingId : 0, asyncDep: null, asyncResolved: !1, isMounted: !1, isUnmounted: !1, isDeactivated: !1, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null }; return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = _c.bind(null, i), e.ce && e.ce(i), i }
let de = null;
const Lo = () => de || he,
    kt = e => { de = e, e.scope.on() },
    xt = () => { de && de.scope.off(), de = null };

function Mo(e) { return e.vnode.shapeFlag & 4 }
let an = !1;

function pa(e, t = !1) { an = t; const { props: n, children: s } = e.vnode, r = Mo(e);
    Yc(e, n, r, t), Gc(e, s); const i = r ? ma(e, t) : void 0; return an = !1, i }

function ma(e, t) { const n = e.type;
    e.accessCache = Object.create(null), e.proxy = no(new Proxy(e.ctx, Kc)); const { setup: s } = n; if (s) { const r = e.setupContext = s.length > 1 ? _a(e) : null;
        kt(e), Bt(); const i = at(s, e, 0, [e.props, r]); if (Dt(), xt(), $i(i)) { if (i.then(xt, xt), t) return i.then(o => { Xr(e, o, t) }).catch(o => { Vn(o, e, 0) });
            e.asyncDep = i } else Xr(e, i, t) } else ko(e, t) }

function Xr(e, t, n) { $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : re(t) && (e.setupState = so(t)), ko(e, n) }
let Qr;

function ko(e, t, n) { const s = e.type; if (!e.render) { if (!t && Qr && !s.render) { const r = s.template || lr(e).template; if (r) { const { isCustomElement: i, compilerOptions: o } = e.appContext.config, { delimiters: l, compilerOptions: c } = s, a = ge(ge({ isCustomElement: i, delimiters: l }, o), c);
                s.render = Qr(r, a) } } e.render = s.render || Pe } kt(e), Bt(), qc(e), Dt(), xt() }

function ga(e) { return new Proxy(e.attrs, { get(t, n) { return ve(e, "get", "$attrs"), t[n] } }) }

function _a(e) { const t = s => { e.exposed = s || {} }; let n; return { get attrs() { return n || (n = ga(e)) }, slots: e.slots, emit: e.emit, expose: t } }

function Gn(e) { if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(so(no(e.exposed)), { get(t, n) { if (n in t) return t[n]; if (n in en) return en[n](e) }, has(t, n) { return n in t || n in en } })) }

function ba(e, t = !0) { return $(e) ? e.displayName || e.name : e.name || t && e.__name }

function wa(e) { return $(e) && "__vccOpts" in e }
const ya = (e, t) => uc(e, t, an),
    Ea = Symbol(""),
    Aa = () => Tn(Ea),
    xa = "3.2.45",
    va = "http://www.w3.org/2000/svg",
    yt = typeof document < "u" ? document : null,
    Gr = yt && yt.createElement("template"),
    Ca = { insert: (e, t, n) => { t.insertBefore(e, n || null) }, remove: e => { const t = e.parentNode;
            t && t.removeChild(e) }, createElement: (e, t, n, s) => { const r = t ? yt.createElementNS(va, e) : yt.createElement(e, n ? { is: n } : void 0); return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r }, createText: e => yt.createTextNode(e), createComment: e => yt.createComment(e), setText: (e, t) => { e.nodeValue = t }, setElementText: (e, t) => { e.textContent = t }, parentNode: e => e.parentNode, nextSibling: e => e.nextSibling, querySelector: e => yt.querySelector(e), setScopeId(e, t) { e.setAttribute(t, "") }, insertStaticContent(e, t, n, s, r, i) { const o = n ? n.previousSibling : t.lastChild; if (r && (r === i || r.nextSibling))
                for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)););
            else { Gr.innerHTML = s ? `<svg>${e}</svg>` : e; const l = Gr.content; if (s) { const c = l.firstChild; for (; c.firstChild;) l.appendChild(c.firstChild);
                    l.removeChild(c) } t.insertBefore(l, n) } return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild] } };

function Ta(e, t, n) { const s = e._vtc;
    s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t }

function Ia(e, t, n) { const s = e.style,
        r = le(n); if (n && !r) { for (const i in n) Rs(s, i, n[i]); if (t && !le(t))
            for (const i in t) n[i] == null && Rs(s, i, "") } else { const i = s.display;
        r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = i) } }
const Zr = /\s*!important$/;

function Rs(e, t, n) { if (B(n)) n.forEach(s => Rs(e, t, s));
    else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
    else { const s = Na(e, t);
        Zr.test(n) ? e.setProperty(Ut(s), n.replace(Zr, ""), "important") : e[s] = n } }
const ei = ["Webkit", "Moz", "ms"],
    fs = {};

function Na(e, t) { const n = fs[t]; if (n) return n; let s = qe(t); if (s !== "filter" && s in e) return fs[t] = s;
    s = Kn(s); for (let r = 0; r < ei.length; r++) { const i = ei[r] + s; if (i in e) return fs[t] = i } return t }
const ti = "http://www.w3.org/1999/xlink";

function Sa(e, t, n, s, r) { if (s && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(ti, t.slice(6, t.length)) : e.setAttributeNS(ti, t, n);
    else { const i = xl(t);
        n == null || i && !Ui(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n) } }

function Ra(e, t, n, s, r, i, o) { if (t === "innerHTML" || t === "textContent") { s && o(s, r, i), e[t] = n ? ? ""; return } if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) { e._value = n; const c = n ? ? "";
        (e.value !== c || e.tagName === "OPTION") && (e.value = c), n == null && e.removeAttribute(t); return } let l = !1; if (n === "" || n == null) { const c = typeof e[t];
        c === "boolean" ? n = Ui(n) : n == null && c === "string" ? (n = "", l = !0) : c === "number" && (n = 0, l = !0) } try { e[t] = n } catch {} l && e.removeAttribute(t) }

function Rt(e, t, n, s) { e.addEventListener(t, n, s) }

function Oa(e, t, n, s) { e.removeEventListener(t, n, s) }

function Pa(e, t, n, s, r = null) { const i = e._vei || (e._vei = {}),
        o = i[t]; if (s && o) o.value = s;
    else { const [l, c] = Fa(t); if (s) { const a = i[t] = ka(s, r);
            Rt(e, l, a, c) } else o && (Oa(e, l, o, c), i[t] = void 0) } }
const ni = /(?:Once|Passive|Capture)$/;

function Fa(e) { let t; if (ni.test(e)) { t = {}; let s; for (; s = e.match(ni);) e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0 } return [e[2] === ":" ? e.slice(3) : Ut(e.slice(2)), t] }
let ds = 0;
const La = Promise.resolve(),
    Ma = () => ds || (La.then(() => ds = 0), ds = Date.now());

function ka(e, t) { const n = s => { if (!s._vts) s._vts = Date.now();
        else if (s._vts <= n.attached) return;
        Te(Ha(s, n.value), t, 5, [s]) }; return n.value = e, n.attached = Ma(), n }

function Ha(e, t) { if (B(t)) { const n = e.stopImmediatePropagation; return e.stopImmediatePropagation = () => { n.call(e), e._stopped = !0 }, t.map(s => r => !r._stopped && s && s(r)) } else return t }
const si = /^on[a-z]/,
    Ua = (e, t, n, s, r = !1, i, o, l, c) => { t === "class" ? Ta(e, s, r) : t === "style" ? Ia(e, n, s) : Dn(t) ? $s(t) || Pa(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ba(e, t, s, r)) ? Ra(e, t, s, i, o, l, c) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Sa(e, t, s, r)) };

function Ba(e, t, n, s) { return s ? !!(t === "innerHTML" || t === "textContent" || t in e && si.test(t) && $(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || si.test(t) && le(n) ? !1 : t in e }

function fr(e) { const t = Lo(); if (!t) return; const n = t.ut = (r = e(t.proxy)) => { Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(i => Ps(i, r)) },
        s = () => { const r = e(t.proxy);
            Os(t.subTree, r), n(r) };
    Ic(s), rr(() => { const r = new MutationObserver(s);
        r.observe(t.subTree.el.parentNode, { childList: !0 }), ir(() => r.disconnect()) }) }

function Os(e, t) { if (e.shapeFlag & 128) { const n = e.suspense;
        e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => { Os(n.activeBranch, t) }) } for (; e.component;) e = e.component.subTree; if (e.shapeFlag & 1 && e.el) Ps(e.el, t);
    else if (e.type === te) e.children.forEach(n => Os(n, t));
    else if (e.type === nn) { let { el: n, anchor: s } = e; for (; n && (Ps(n, t), n !== s);) n = n.nextSibling } }

function Ps(e, t) { if (e.nodeType === 1) { const n = e.style; for (const s in t) n.setProperty(`--${s}`, t[s]) } }
const Da = { name: String, type: String, css: { type: Boolean, default: !0 }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String };
Oc.props;
const ri = e => { const t = e.props["onUpdate:modelValue"] || !1; return B(t) ? n => Cn(t, n) : t };

function $a(e) { e.target.composing = !0 }

function ii(e) { const t = e.target;
    t.composing && (t.composing = !1, t.dispatchEvent(new Event("input"))) }
const Wt = { created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) { e._assign = ri(r); const i = s || r.props && r.props.type === "number";
            Rt(e, t ? "change" : "input", o => { if (o.target.composing) return; let l = e.value;
                n && (l = l.trim()), i && (l = Mn(l)), e._assign(l) }), n && Rt(e, "change", () => { e.value = e.value.trim() }), t || (Rt(e, "compositionstart", $a), Rt(e, "compositionend", ii), Rt(e, "change", ii)) }, mounted(e, { value: t }) { e.value = t ? ? "" }, beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: s, number: r } }, i) { if (e._assign = ri(i), e.composing || document.activeElement === e && e.type !== "range" && (n || s && e.value.trim() === t || (r || e.type === "number") && Mn(e.value) === t)) return; const o = t ? ? "";
            e.value !== o && (e.value = o) } },
    ja = ["ctrl", "shift", "alt", "meta"],
    Ka = { stop: e => e.stopPropagation(), prevent: e => e.preventDefault(), self: e => e.target !== e.currentTarget, ctrl: e => !e.ctrlKey, shift: e => !e.shiftKey, alt: e => !e.altKey, meta: e => !e.metaKey, left: e => "button" in e && e.button !== 0, middle: e => "button" in e && e.button !== 1, right: e => "button" in e && e.button !== 2, exact: (e, t) => ja.some(n => e[`${n}Key`] && !t.includes(n)) },
    qa = (e, t) => (n, ...s) => { for (let r = 0; r < t.length; r++) { const i = Ka[t[r]]; if (i && i(n, t)) return } return e(n, ...s) },
    Va = { beforeMount(e, { value: t }, { transition: n }) { e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Jt(e, t) }, mounted(e, { value: t }, { transition: n }) { n && t && n.enter(e) }, updated(e, { value: t, oldValue: n }, { transition: s }) {!t != !n && (s ? t ? (s.beforeEnter(e), Jt(e, !0), s.enter(e)) : s.leave(e, () => { Jt(e, !1) }) : Jt(e, t)) }, beforeUnmount(e, { value: t }) { Jt(e, t) } };

function Jt(e, t) { e.style.display = t ? e._vod : "none" }
const za = ge({ patchProp: Ua }, Ca);
let oi;

function Wa() { return oi || (oi = na(za)) }
const Ja = (...e) => { const t = Wa().createApp(...e),
        { mount: n } = t; return t.mount = s => { const r = Ya(s); if (!r) return; const i = t._component;!$(i) && !i.render && !i.template && (i.template = r.innerHTML), r.innerHTML = ""; const o = n(r, !1, r instanceof SVGElement); return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o }, t };

function Ya(e) { return le(e) ? document.querySelector(e) : e }

function Ho(e) { return /^-?[\d.]+(px|em|vh|%|deg|vw)$/.test(e) }

function Xa(e) { const t = (n => typeof n == "string" ? s => typeof s === n : s => s instanceof n)(e); return function(n) { return n.every(t) } }

function li(e) { return e >= 0 && e <= 1 }
const Qe = { type: String, required: !0 },
    Ge = { type: String, required: !1 },
    Qa = { type: Number, required: !0 },
    Ga = { type: Number, required: !1 },
    Za = { type: Boolean, required: !1 },
    eu = { ...Qe, validator: Ho },
    dr = { ...Ge, validator: Ho };

function hr(e) { return { type: Array, required: !0, validator: Xa(e) } }

function Uo(e) { return { ...hr(e), required: !1 } } Uo("string");
const ci = Uo("number");
const _e = (e, t) => { const n = e.__vccOpts || e; for (const [s, r] of t) n[s] = r; return n },
    tu = { inject: ["ç_height"], props: { imgMinWidth: dr, height: Ge, bgImage: Qe, mode: { ...Ge, validator(e) { return ["", "relative", "absolute", "nopos"].includes(e) } } }, computed: { getMode() { switch (this.mode) {
                    case "relative":
                    case "":
                        return "position-relative";
                    case "absolute":
                        return "position-absolute";
                    case "nopos":
                        return "" } return "" }, commonStyle() { return { height: this.height || this.ç_height, width: "100%" } }, imgStyle() { return { ...this.commonStyle, minWidth: this.imgMinWidth } } } },
    nu = ["src"];

function su(e, t, n, s, r, i) { return U(), z("div", { class: "bg-image", style: vt(i.commonStyle) }, [I("img", { src: n.bgImage, style: vt(i.imgStyle) }, null, 12, nu)], 4) }
const ru = _e(tu, [
    ["render", su],
    ["__scopeId", "data-v-c8b30681"]
]);
const pr = { mounted() {}, inject: ["ç_height"], props: { height: Ge, width: eu, inclination: { ...dr, default: "-9deg" }, color: { ...Ge, default: "rgba(0, 0, 0, .75)" }, transformOrigin: { ...Ge, default: "top right" }, mode: { ...Ge, default: "rotate", validator(e) { return ["rotate", "cut"].includes(e) } } }, computed: { rightHeight() { return this.height || this.ç_height } } },
    ai = () => { fr(e => ({ "9b8f7b3e": e.color, "8756d23e": e.rightHeight, "99617e78": e.width, e2267d40: e.inclination, e79499a0: e.transformOrigin })) },
    ui = pr.setup;
pr.setup = ui ? (e, t) => (ai(), ui(e, t)) : ai;
const iu = pr;

function ou(e, t, n, s, r, i) { return U(), z("div", { class: Tt(["position-absolute", n.mode]) }, null, 2) }
const Bo = _e(iu, [
    ["render", ou],
    ["__scopeId", "data-v-cd627ecd"]
]);
const mr = { inject: ["ç_height", "toggleCarSelectionPage"], created() {}, data() { return {} }, props: { title: Qe, subtitle: Qe, submit: Qe, height: dr, mode: { ...Qe, validator(e) { return ["body-not-mobile", "footer-not-mobile", "body-mobile", "footer-mobile"].includes(e) } } }, methods: { submitAction() { this.toggleCarSelectionPage() } }, computed: { rightHeight() { return this.height || this.ç_height } } },
    fi = () => { fr(e => ({ "2894db80": e.rightHeight })) },
    di = mr.setup;
mr.setup = di ? (e, t) => (fi(), di(e, t)) : fi;
const lu = mr,
    cu = { key: 0, id: "body-not-mobile", class: "row main-text-container text-light position-relative" },
    au = { class: "main-text col-md-6" },
    uu = { class: "title display-1" },
    fu = { class: "subtitle lead fs-3 text-secondary col-md-6" },
    du = { class: "d-grid gap-2 col-3 mt-5 submit-container" },
    hu = { key: 1, class: "container-fluid", id: "body-mobile" },
    pu = { class: "title" },
    mu = { class: "subtitle lead text-secondary" },
    gu = { class: "d-grid gap-2 col-6 mx-auto" },
    _u = { key: 2, id: "footer-not-mobile", class: "row main-text-container text-light position-relative footer ms-5" },
    bu = { class: "col" },
    wu = { class: "title display-6" },
    yu = { class: "subtitle lead fs-5 text-secondary col-md-6" },
    Eu = { class: "col btn-container" };

function Au(e, t, n, s, r, i) { return n.mode === "body-not-mobile" ? (U(), z("div", cu, [I("div", au, [I("h1", uu, se(n.title), 1), I("p", fu, se(n.subtitle), 1), I("div", du, [I("button", { type: "submit", class: "btn btn-warning text-nowrap submit", onClick: t[0] || (t[0] = (...o) => i.submitAction && i.submitAction(...o)) }, se(n.submit), 1)])])])) : n.mode === "body-mobile" ? (U(), z("div", hu, [I("h1", pu, se(n.title), 1), I("p", mu, se(n.subtitle), 1), I("div", gu, [I("button", { type: "submit", class: "btn btn-warning text-nowrap submit", onClick: t[1] || (t[1] = (...o) => i.submitAction && i.submitAction(...o)) }, se(n.submit), 1)])])) : n.mode === "footer-not-mobile" ? (U(), z("div", _u, [I("div", bu, [I("h1", wu, se(n.title), 1), I("p", yu, se(n.subtitle), 1)]), I("div", Eu, [I("button", { type: "submit", class: "btn btn-warning text-nowrap submit", onClick: t[2] || (t[2] = (...o) => i.submitAction && i.submitAction(...o)) }, se(n.submit), 1)])])) : $t("", !0) }
const Do = _e(lu, [
    ["render", Au],
    ["__scopeId", "data-v-0ffc6253"]
]);

function hi(e) { if (!Number.isInteger(e)) throw TypeError(`${e} is not an integer`); return Boolean(e % 2) } class Nn { constructor(t, n) { this.title = t, this.message = n } } class $o { constructor(t, n) { this.name = t, this.url = n } setName(t) { this.name = t } setUrl(t) { this.url = t } addUrlBefore(t) { this.url = t + this.url } addUrlAfter(t) { this.url += t } } class xu { constructor(t, n = "", s = "", r = "", i = "", o = "", l = "") { this.car = t, this.userName = n, this.email = s, this.confirmEmail = r, this.from = i, this.to = o, this.notes = l } includesAny(t, ...n) { for (const s of n)
            if (t.includes(s)) return !0; return !1 } getErrors() { const t = [],
            n = []; return this.userName ? /\s/.test(this.userName) || t.push("SURNAME_MISSING") : t.push("USERNAME_MISSING"), this.includesAny(t, "USERNAME_MISSING", "SURNAME_MISSING") || n.push("userName"), this.email || t.push("EMAIL_MISSING"), this.email || t.push("CONFIRMEMAIL_MISSING"), this.email && this.confirmEmail && this.email !== this.confirmEmail && t.push("EMAIL_VALIDATION"), this.includesAny(t, "EMAIL_MISSING", "CONFIRMEMAIL_MISSING", "EMAIL_VALIDATION") || (n.push("email"), n.push("confirmEmail")), this.from ? this.to || t.push("TO_MISSING") : t.push("FROM_MISSING"), this.from && this.to && this.from >= this.to && t.push("DATE_VALIDATION"), this.includesAny(t, "FROM_MISSING", "TO_MISSING", "DATE_VALIDATION") || n.push("dates"), { errors: t, valids: n } } isValid() { return !this.getErrors().errors.length } isInvalid() { return !this.isValid() } reverseDates() { return [this.from, this.to].map(t => t.split("-").reverse().join("-")) } request(t = !1) { const { car: n, userName: s, email: r, notes: i } = this; let o, l; return t ? [o, l] = this.reverseDates() : { from: o, to: l } = this, { car: n, userName: s, email: r, from: o, to: l, notes: i } } JSONrequest() { return JSON.stringify(this.request()) } } class pi { constructor(t, n, s, r) { this.name = t, this.text = n, this.buttonId = s, this.inputId = r } }
const vu = { created() {}, props: { messages: hr(Nn), breakpoint: { ...Qe, validator(e) { return ["xs", "sm", "md", "lg", "xl", "xxl"].includes(e) } }, divClasses: Ge }, methods: { colSpan(e) { const t = this.messages.length,
                    n = Math.floor(12 / t),
                    s = 12 % t,
                    r = Array(t).fill(n); if (s) { let i = 0,
                        o = 0;
                    hi(t) ? (i = Math.floor(t / 2), o = i + 1) : i = o = t / 2; for (let l = 0; l < s; l++) hi(l) ? r[o++]++ : r[i--]++ } return r.map(i => `col-${e}-${i}`) } } },
    Cu = { class: "row" };

function Tu(e, t, n, s, r, i) { return U(), z("div", Cu, [(U(!0), z(te, null, Mt(n.messages, (o, l) => (U(), z("div", { key: o.title, class: Tt([i.colSpan(n.breakpoint)[l], n.divClasses]) }, [I("h2", null, se(o.title), 1), I("p", null, se(o.message), 1)], 2))), 128))]) }
const Iu = _e(vu, [
    ["render", Tu],
    ["__scopeId", "data-v-0d772b65"]
]);
const Nu = { components: { BaseBackgroundImage: ru, BaseBackgroundShape: Bo, BasePresentation: Do, TheInstructions: Iu }, inject: ["presentation", "messages", "mainBackground"], data() { return { settings: { global: { selectedBreakpoint: "lg", window: { width: window.innerWidth, height: window.innerHeight }, breakpoints: { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 } }, mobile: { height: "40vh", image: { bgImage: this.mainBackground, imgMinWidth: "550px" }, presentation: { ...this.presentation, mode: "body-mobile" }, instructions: { messages: this.messages, breakpoint: "lg", divClasses: "lead p-5 text-center" } }, notMobile: { height: "76vh", image: { bgImage: this.mainBackground, imgMinWidth: "1400px" }, shape: { width: "73vw", color: "rgba(0, 0, 0, .575)", inclination: "-9deg", transformOrigin: "top right" }, presentation: { ...this.presentation, mode: "body-not-mobile" }, instructions: { messages: this.messages, breakpoint: "lg", divClasses: "lead p-5" } } } } }, methods: { resize(e) { const t = e.target;
                this.settings.global.window.innerWidth = t.innerWidth, this.settings.global.window.innerHeight = t.innerHeight }, getHeight() { const e = this.settings.global.breakpoints,
                    t = this.settings.global.selectedBreakpoint,
                    n = e[t]; return this.settings.global.window.width > n ? this.settings.notMobile.height : this.settings.mobile.height } }, provide() { return { ç_height: this.getHeight() } }, mounted() { window.addEventListener("resize", this.resize) }, unmounted() { window.removeEventListener("resize", this.resize) } },
    Su = { class: "container-lg not-mobile" },
    Ru = { class: "container-fluid mobile p-0", id: "mobile-body-container" },
    Ou = { id: "image-container" },
    Pu = { class: "mobile" };

function Fu(e, t, n, s, r, i) { const o = Ee("base-background-image"),
        l = Ee("base-background-shape"),
        c = Ee("base-presentation"),
        a = Ee("the-instructions"); return U(), z(te, null, [I("div", { class: "container-fluid p-0 not-mobile position-relative", style: vt({ height: r.settings.notMobile.height }) }, [ee(o, it(Xe(r.settings.notMobile.image)), null, 16), ee(l, it(Xe(r.settings.notMobile.shape)), null, 16), ee(c, it(Xe(r.settings.notMobile.presentation)), null, 16)], 4), I("div", Su, [ee(a, it(Xe(r.settings.notMobile.instructions)), null, 16)]), I("div", Ru, [I("div", Ou, [ee(o, Fo({ id: "image" }, r.settings.mobile.image), null, 16)]), ee(c, it(Xe(r.settings.mobile.presentation)), null, 16)]), I("div", Pu, [ee(a, it(Xe(r.settings.mobile.instructions)), null, 16)])], 64) }
const Lu = _e(Nu, [
    ["render", Fu],
    ["__scopeId", "data-v-79b0c717"]
]);
const mi = (Math.sqrt(5) + 1) / 2,
    gr = { components: { BaseBackgroundShape: Bo, BasePresentation: Do }, inject: ["presentation", "text"], mounted() { window.addEventListener("resize", this.resize) }, unmounted() { window.removeEventListener("resize", this.resize) }, data() { const e = window.innerWidth,
                t = window.innerHeight * this.trianglesHeight; return { leftTriangleWidth: e * this.trianglesProportion[0] + "px", rightTriangleWidth: e * this.trianglesProportion[1] + "px", rightTrianglesHeight: t + "px", theta_1: this.computeTheta(e * this.trianglesProportion[0], t), theta_2: this.computeTheta(e * this.trianglesProportion[1], t, -1), color: "#271E16", firstLink: this.link("homePageFooterLink1"), secondLink: this.link("homePageFooterLink2"), thirdLink: this.link("homePageFooterLink3") } }, props: { trianglesHeight: { ...Ga, default: .1, validator: li }, trianglesProportion: { ...ci, validator(e) { return ci.validator(e) && e.every(li) }, default: [mi - 1, 1 / (mi + 1)] } }, computed: { leftAngle() { return this.theta_1 + "deg" }, rightAngle() { return this.theta_2 + "deg" }, computedColor() { if (this.color.startsWith("#")) { const e = this.color.substring(1); let t = []; for (let n = 0; n < 3; n++) t.push(e.substring(2 * n, 2 * (n + 1))); return t = t.map(n => parseInt(n, 16)), `rgb(${t.join(",")})` } return this.color } }, methods: { resize(e) { const t = e.target,
                    n = t.innerWidth; if (n > 990) { const s = t.innerHeight,
                        [r, i] = this.trianglesProportion;
                    this.leftTriangleWidth = n * r + "px", this.rightTriangleWidth = n * i + "px", this.rightTrianglesHeight = s * this.trianglesHeight + "px", this.theta_1 = this.computeTheta(this.leftTriangleWidth, this.rightTrianglesHeight), this.theta_2 = this.computeTheta(this.rightTriangleWidth, this.rightTrianglesHeight, -1) } }, computeTheta(e, t, n = 1) {
                [e, t] = [e, t].map(parseFloat); const s = Math.sqrt(e ** 2 + t ** 2); return this.deg(Math.asin(t / s) * n).toFixed(2) }, deg(e) { return e * 180 / Math.PI }, rad(e) { return e * Math.PI / 180 }, link(e) { return { text: this.text(e).value, url: this.text(e).url } } } },
    gi = () => { fr(e => ({ "1ed59cb0": e.computedColor, b8c3e99e: e.leftTriangleWidth, "9397c070": e.rightTriangleWidth, eada05c8: e.rightTrianglesHeight })) },
    _i = gr.setup;
gr.setup = _i ? (e, t) => (gi(), _i(e, t)) : gi;
const Mu = gr,
    ku = { id: "second", class: "container-fluid not-mobile p-0 position-relative" },
    Hu = { id: "not-mobile-footer-container", class: "container-fluid not-mobile p-0" },
    Uu = Po('<div id="not-mobile-links" class="lead" data-v-3b01cf85><ul class="text-light" data-v-3b01cf85><li data-v-3b01cf85><a href="#" data-v-3b01cf85>Chi siamo</a></li><li data-v-3b01cf85><a href="#" data-v-3b01cf85>Termini e Condizioni</a></li><li data-v-3b01cf85><a href="#" data-v-3b01cf85>Note Legali</a></li></ul></div>', 1),
    Bu = { id: "mobile-footer-container", class: "container-fluid mobile p-0" },
    Du = { id: "mobile-links", class: "lead" },
    $u = { class: "text-light" },
    ju = ["href"],
    Ku = ["href"],
    qu = ["href"];

function Vu(e, t, n, s, r, i) { const o = Ee("base-background-shape"),
        l = Ee("base-presentation"); return U(), z(te, null, [I("div", ku, [ee(o, { id: "left", mode: "cut", height: r.rightTrianglesHeight, width: r.leftTriangleWidth, inclination: i.leftAngle, "transform-origin": "47.33% 0", color: r.color }, null, 8, ["height", "width", "inclination", "color"]), ee(o, { id: "right", mode: "cut", height: r.rightTrianglesHeight, width: r.rightTriangleWidth, inclination: i.rightAngle, "transform-origin": "53% 0", color: r.color }, null, 8, ["height", "width", "inclination", "color"])]), I("div", Hu, [ee(l, it(Xe({ ...i.presentation, mode: "footer-not-mobile" })), null, 16), Uu]), I("div", Bu, [I("div", Du, [I("ul", $u, [I("li", null, [I("a", { href: r.firstLink.url }, se(r.firstLink.text), 9, ju)]), I("li", null, [I("a", { href: r.secondLink.url }, se(r.secondLink.text), 9, Ku)]), I("li", null, [I("a", { href: r.thirdLink.url }, se(r.thirdLink.text), 9, qu)])])])])], 64) }
const zu = _e(Mu, [
        ["render", Vu],
        ["__scopeId", "data-v-3b01cf85"]
    ]),
    Wu = { components: { HomePageBody: Lu, HomePageFooter: zu }, mounted() {}, inject: ["env", "textValue"], data() { return {} }, methods: { mainBackground() { const e = this.env(); if (e === "DEVELOPMENT") return "src/assets/images/main_background.png"; if (e === "PRODUCTION") return "static/images/main_background.png" } }, provide() { return { presentation: { title: this.textValue("homepageTitle"), subtitle: this.textValue("homePageSubtitle"), submit: this.textValue("homePageSubmit") }, messages: [new Nn(this.textValue("homePageInstruction1title"), this.textValue("homePageInstruction1message")), new Nn(this.textValue("homePageInstruction2title"), this.textValue("homePageInstruction2message")), new Nn(this.textValue("homePageInstruction3title"), this.textValue("homePageInstruction3message"))], mainBackground: this.mainBackground() } } };

function Ju(e, t, n, s, r, i) { const o = Ee("HomePageBody"),
        l = Ee("HomePageFooter"); return U(), z(te, null, [ee(o), ee(l)], 64) }
const Yu = _e(Wu, [
    ["render", Ju]
]);
const Xu = { inject: ["toggleHomePage"] },
    Qu = { class: "navbar navbar-expand-lg bg-dark navbar-dark px-5" },
    Gu = { class: "container-fluid" };

function Zu(e, t, n, s, r, i) { return U(), z("nav", Qu, [I("div", Gu, [I("a", { class: "navbar-brand cursor-pointer", onClick: t[0] || (t[0] = (...o) => i.toggleHomePage && i.toggleHomePage(...o)) }, "Home")])]) }
const jo = _e(Xu, [
    ["render", Zu],
    ["__scopeId", "data-v-a788e441"]
]);
const ef = { emits: ["close"], methods: { closeAction() { const e = this.mode;
                (!e || e === "closable") && this.close() }, close() { this.$emit("close") } }, props: { mode: { ...Ge, validator(e) {} } }, provide() { return { close: this.close } } },
    tf = { open: "" };

function nf(e, t, n, s, r, i) { return U(), $e(ca, { to: "body" }, [I("div", { class: "backdrop", onClick: t[0] || (t[0] = (...o) => i.closeAction && i.closeAction(...o)) }), I("dialog", tf, [bo(e.$slots, "default", {}, void 0, !0)])]) }
const sf = _e(ef, [
    ["render", nf],
    ["__scopeId", "data-v-28160056"]
]);
const rf = { components: { BaseDialog: sf }, mounted() { this.$refs.nome.focus(), Array.from(this.$refs.form.children).forEach(e => { const t = e.querySelector("input");
                t !== null && t.addEventListener("blur", n => { this.validateForm() }) }) }, emits: ["close"], inject: ["toggleFeedbackPage", "postRequest"], data() { return { activeInput: "from", form: new xu(this.car), inputs: [new pi("from", "A partire dal", "button-from", "date-from"), new pi("to", "Fino al", "button-to", "date-to")], errors: {}, requestExistError: !1, loading: !1 } }, computed: { title() { return `Prenota una ${this.car}` }, rentInterval() { const [e, t] = this.form.reverseDates(); return `Dal ${e} al ${t}` } }, props: { car: Qe }, methods: { checkActiveInput(e) { return e === this.activeInput }, toggleActiveInput(e) { this.activeInput = e }, closeDialog() { this.$emit("close") }, validateForm() {}, async submit(e) { const t = e.target; if (this.form.isValid()) try { this.loading = !0; const n = await this.postRequest(this.form.request()); if (this.loading = !1, n.data.code === 0) this.toggleFeedbackPage("SUCCESS");
                    else
                        for (const s of n.data.errors) switch (s) {
                            case "CONFLICT_USER_EMAIL":
                                this.errors.email = "Esiste già un utente con questa email con un altro nome", t.email.classList.add("is-invalid"); break;
                            case "QUERY_EXISTS":
                                this.requestExistError = !0; break } } catch (n) { n.name === "AxiosError" ? n.code === "ERR_NETWORK" && (console.log(`CONNECTION REFUSED: ${n.message}`), this.toggleFeedbackPage("FAILURE")) : console.log(n) } else { const { errors: n, valids: s } = this.form.getErrors(); for (const r of n) switch (r) {
                        case "USERNAME_MISSING":
                            this.errors.userName = "Questo campo deve essere compilato", t.name.classList.add("is-invalid"); break;
                        case "SURNAME_MISSING":
                            this.errors.userName = "Inserire nome e cognome", t.name.classList.add("is-invalid"); break;
                        case "EMAIL_MISSING":
                            this.errors.email = "Questo campo deve essere compilato", t.email.classList.add("is-invalid"); break;
                        case "CONFIRMEMAIL_MISSING":
                            this.errors.confirmEmail = "Questo campo deve essere compilato", t.confirmEmail.classList.add("is-invalid"); break;
                        case "EMAIL_VALIDATION":
                            this.errors.email = "", this.errors.confirmEmail = "Le email non coincidono", t.email.classList.add("is-invalid"), t.confirmEmail.classList.add("is-invalid"); break;
                        case "FROM_MISSING":
                            this.errors.dates = "Inserire il giorno di prenotazione"; for (const i of t.dates) i.classList.add("is-invalid"); break;
                        case "TO_MISSING":
                            this.errors.dates = "Inserire il giorno di restituzione"; for (const i of t.dates) i.classList.add("is-invalid"); break;
                        case "DATE_VALIDATION":
                            this.errors.dates = "La data di restituzione non può precedere quella di prenotazione"; for (const i of t.dates) i.classList.add("is-invalid"); break }
                    for (const r of s) t[r].classList.remove("is-invalid"), t[r].classList.add("is-valid") } } } },
    dt = e => (bc("data-v-a53b4e73"), e = e(), wc(), e),
    of = { class: "container-fluid" },
    lf = { id: "title" },
    cf = dt(() => I("hr", null, null, -1)),
    af = { class: "mb-4" },
    uf = dt(() => I("label", { for: "name", class: "form-label" }, "*Nome", -1)),
    ff = { class: "invalid-feedback" },
    df = { class: "mb-4" },
    hf = dt(() => I("label", { for: "email", class: "form-label" }, "*Indirizzo Email", -1)),
    pf = { class: "invalid-feedback" },
    mf = { class: "mb-4" },
    gf = dt(() => I("label", { for: "confirmEmail", class: "form-label" }, "*Conferma Indirizzo Email", -1)),
    _f = { class: "invalid-feedback" },
    bf = { class: "mb-4" },
    wf = dt(() => I("label", { for: "dates", class: "form-label" }, "*Intervallo", -1)),
    yf = { id: "dates", class: "input-group" },
    Ef = ["id", "onClick"],
    Af = ["id", "onUpdate:modelValue"],
    xf = { class: "invalid-feedback" },
    vf = { id: "date-help", class: "form-text" },
    Cf = { class: "mb-4" },
    Tf = dt(() => I("label", { for: "note", class: "form-label" }, "Note", -1)),
    If = dt(() => I("div", { class: "form-text mb-3" }, "*I campi con un asterisco sono obbligatori", -1)),
    Nf = { class: "my-3 d-grid gap-2 d-md-flex justify-content-md-end" },
    Sf = ["disabled"],
    Rf = { key: 0, class: "btn btn-primary", type: "button", disabled: "" },
    Of = dt(() => I("span", { class: "spinner-border spinner-border-sm", role: "status", "aria-hidden": "true" }, null, -1)),
    Pf = { key: 1, type: "submit", class: "btn btn-primary me-md-2", value: "Richiedi preventivo", name: "submit" },
    Ff = { key: 0, id: "requestExists" };

function Lf(e, t, n, s, r, i) { const o = Ee("base-dialog"); return U(), $e(o, { onClose: i.closeDialog }, { default: nr(() => [I("div", of , [I("h3", lf, se(i.title), 1), cf, I("form", { id: "form", onSubmit: t[5] || (t[5] = qa((...l) => i.submit && i.submit(...l), ["prevent"])), class: "row g-3 needs-validation", ref: "form", novalidate: "" }, [I("div", af, [uf, zt(I("input", { type: "text", class: "form-control", id: "name", placeholder: "Nome e cognome", ref: "nome", required: "", "onUpdate:modelValue": t[0] || (t[0] = l => r.form.userName = l), name: "userName" }, null, 512), [
            [Wt, r.form.userName]
        ]), I("div", ff, se(r.errors.userName), 1)]), I("div", df, [hf, zt(I("input", { type: "email", class: "form-control", id: "email", placeholder: "nome@esempio.com", required: "", "onUpdate:modelValue": t[1] || (t[1] = l => r.form.email = l), name: "email" }, null, 512), [
            [Wt, r.form.email]
        ]), I("div", pf, se(r.errors.email), 1)]), I("div", mf, [gf, zt(I("input", { type: "email", class: "form-control", id: "confirmEmail", placeholder: "nome@esempio.com", required: "", "onUpdate:modelValue": t[2] || (t[2] = l => r.form.confirmEmail = l), name: "confirmEmail" }, null, 512), [
            [Wt, r.form.confirmEmail]
        ]), I("div", _f, se(r.errors.confirmEmail), 1)]), I("div", bf, [wf, I("div", yf, [(U(!0), z(te, null, Mt(r.inputs, l => (U(), z("button", { key: l.buttonId, id: l.buttonId, class: Tt(["btn btn-outline-secondary", { active: i.checkActiveInput(l.name) }]), type: "button", onClick: c => i.toggleActiveInput(l.name) }, se(l.text), 11, Ef))), 128)), (U(!0), z(te, null, Mt(r.inputs, l => zt((U(), z("input", { key: l.inputId, id: l.inputId, type: "date", name: "dates", class: "form-control", "onUpdate:modelValue": c => r.form[l.name] = c, required: "" }, null, 8, Af)), [
            [Va, i.checkActiveInput(l.name)],
            [Wt, r.form[l.name]]
        ])), 128)), I("div", xf, se(r.errors.dates), 1)]), I("div", vf, se(i.rentInterval), 1)]), I("div", Cf, [Tf, zt(I("textarea", { type: "text", class: "form-control", id: "notes", placeholder: "Altre indicazioni...", rows: "1", "onUpdate:modelValue": t[3] || (t[3] = l => r.form.notes = l) }, null, 512), [
            [Wt, r.form.notes]
        ])]), If, I("div", Nf, [I("button", { type: "button", class: "btn btn-outline-secondary", onClick: t[4] || (t[4] = (...l) => i.closeDialog && i.closeDialog(...l)), disabled: r.loading }, " Annulla ", 8, Sf), r.loading ? (U(), z("button", Rf, [Of, Oo(" Caricamento... ")])) : (U(), z("input", Pf))]), r.requestExistError ? (U(), z("p", Ff, "Richiesta già inviata")) : $t("", !0)], 544)])]), _: 1 }, 8, ["onClose"]) }
const Mf = _e(rf, [
    ["render", Lf],
    ["__scopeId", "data-v-a53b4e73"]
]);
const kf = { props: { carExists: { ...Za, default: !0 } }, data() { return {} } },
    Hf = { key: 0, class: "existingCar" },
    Uf = { key: 1, class: "card notExistingCar", "aria-hidden": "true" },
    Bf = Po('<div class="placeholder w-100" style="height:16vh;" data-v-daa6828c></div><div class="card-body" data-v-daa6828c><h5 class="card-title placeholder-glow" data-v-daa6828c><span class="placeholder col-6" data-v-daa6828c></span></h5><p class="card-text placeholder-glow" data-v-daa6828c><span class="placeholder col-7" data-v-daa6828c></span><span class="placeholder col-4" data-v-daa6828c></span><span class="placeholder col-4" data-v-daa6828c></span><span class="placeholder col-6" data-v-daa6828c></span><span class="placeholder col-8" data-v-daa6828c></span></p></div>', 2),
    Df = [Bf];

function $f(e, t, n, s, r, i) { return n.carExists ? (U(), z("div", Hf, [bo(e.$slots, "default", {}, void 0, !0)])) : (U(), z("div", Uf, Df)) }
const jf = _e(kf, [
    ["render", $f],
    ["__scopeId", "data-v-daa6828c"]
]);
const Kf = { components: { BaseCarImageCard: jf, CarSelectionPageForm: Mf }, inject: ["leadMessage"], props: { cars: hr($o) }, data() { return { formId: "theForm", activeCar: null, showForm: !1 } }, computed: { carsLoaded() { return this.cars.length > 0 } }, provide() { return { showForm: this.showForm } }, methods: { toggleActiveCar(e) { this.activeCar = e, this.showForm = !0 }, closeForm() { this.showForm = !1, this.activeCar = null } } },
    qf = { class: "container-lg" },
    Vf = { class: "lead text-center display-6 pt-5 mt-5" },
    zf = { id: "cars", class: "px-5 mx-5 text-center" },
    Wf = { key: 0, class: "row" },
    Jf = ["src", "alt"],
    Yf = { class: "lead mt-3 mb-0 text-light" },
    Xf = { key: 1, class: "row" };

function Qf(e, t, n, s, r, i) { const o = Ee("car-selection-page-form"),
        l = Ee("base-car-image-card"); return U(), z(te, null, [r.showForm ? (U(), $e(o, { key: 0, onClose: i.closeForm, car: r.activeCar }, null, 8, ["onClose", "car"])) : $t("", !0), I("div", qf, [I("p", Vf, se(i.leadMessage), 1), I("div", zf, [i.carsLoaded ? (U(), z("div", Wf, [(U(!0), z(te, null, Mt(n.cars, c => (U(), z("div", { class: "col-lg-6 position-relative", key: c.name }, [(U(), $e(l, { key: c.name, class: "col-lg-8", onClick: a => i.toggleActiveCar(c.name) }, { default: nr(() => [I("img", { src: c.url, alt: c.name, class: "pt-1" }, null, 8, Jf), I("p", Yf, se(c.name), 1)]), _: 2 }, 1032, ["onClick"]))]))), 128))])) : (U(), z("div", Xf, [(U(), z(te, null, Mt(6, c => I("div", { class: "col-lg-6 position-relative", key: c }, [(U(), $e(l, { key: c, class: "col-lg-8", "car-exists": !1 }))])), 64))]))])])], 64) }
const Gf = _e(Kf, [
    ["render", Qf],
    ["__scopeId", "data-v-180e4835"]
]);

function Ko(e, t) { return function() { return e.apply(t, arguments) } }
const { toString: qo } = Object.prototype, { getPrototypeOf: _r } = Object, br = (e => t => { const n = qo.call(t); return e[n] || (e[n] = n.slice(8, -1).toLowerCase()) })(Object.create(null)), nt = e => (e = e.toLowerCase(), t => br(t) === e), Zn = e => t => typeof t === e, { isArray: jt } = Array, un = Zn("undefined");

function Zf(e) { return e !== null && !un(e) && e.constructor !== null && !un(e.constructor) && Ct(e.constructor.isBuffer) && e.constructor.isBuffer(e) }
const Vo = nt("ArrayBuffer");

function ed(e) { let t; return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Vo(e.buffer), t }
const td = Zn("string"),
    Ct = Zn("function"),
    zo = Zn("number"),
    wr = e => e !== null && typeof e == "object",
    nd = e => e === !0 || e === !1,
    Sn = e => { if (br(e) !== "object") return !1; const t = _r(e); return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e) },
    sd = nt("Date"),
    rd = nt("File"),
    id = nt("Blob"),
    od = nt("FileList"),
    ld = e => wr(e) && Ct(e.pipe),
    cd = e => { const t = "[object FormData]"; return e && (typeof FormData == "function" && e instanceof FormData || qo.call(e) === t || Ct(e.toString) && e.toString() === t) },
    ad = nt("URLSearchParams"),
    ud = e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");

function fn(e, t, { allOwnKeys: n = !1 } = {}) { if (e === null || typeof e > "u") return; let s, r; if (typeof e != "object" && (e = [e]), jt(e))
        for (s = 0, r = e.length; s < r; s++) t.call(null, e[s], s, e);
    else { const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
            o = i.length; let l; for (s = 0; s < o; s++) l = i[s], t.call(null, e[l], l, e) } }

function Wo(e, t) { t = t.toLowerCase(); const n = Object.keys(e); let s = n.length,
        r; for (; s-- > 0;)
        if (r = n[s], t === r.toLowerCase()) return r; return null }
const Jo = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(),
    Yo = e => !un(e) && e !== Jo;

function Fs() { const { caseless: e } = Yo(this) && this || {}, t = {}, n = (s, r) => { const i = e && Wo(t, r) || r;
        Sn(t[i]) && Sn(s) ? t[i] = Fs(t[i], s) : Sn(s) ? t[i] = Fs({}, s) : jt(s) ? t[i] = s.slice() : t[i] = s }; for (let s = 0, r = arguments.length; s < r; s++) arguments[s] && fn(arguments[s], n); return t }
const fd = (e, t, n, { allOwnKeys: s } = {}) => (fn(t, (r, i) => { n && Ct(r) ? e[i] = Ko(r, n) : e[i] = r }, { allOwnKeys: s }), e),
    dd = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
    hd = (e, t, n, s) => { e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", { value: t.prototype }), n && Object.assign(e.prototype, n) },
    pd = (e, t, n, s) => { let r, i, o; const l = {}; if (t = t || {}, e == null) return t;
        do { for (r = Object.getOwnPropertyNames(e), i = r.length; i-- > 0;) o = r[i], (!s || s(o, e, t)) && !l[o] && (t[o] = e[o], l[o] = !0);
            e = n !== !1 && _r(e) } while (e && (!n || n(e, t)) && e !== Object.prototype); return t },
    md = (e, t, n) => { e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length; const s = e.indexOf(t, n); return s !== -1 && s === n },
    gd = e => { if (!e) return null; if (jt(e)) return e; let t = e.length; if (!zo(t)) return null; const n = new Array(t); for (; t-- > 0;) n[t] = e[t]; return n },
    _d = (e => t => e && t instanceof e)(typeof Uint8Array < "u" && _r(Uint8Array)),
    bd = (e, t) => { const s = (e && e[Symbol.iterator]).call(e); let r; for (;
            (r = s.next()) && !r.done;) { const i = r.value;
            t.call(e, i[0], i[1]) } },
    wd = (e, t) => { let n; const s = []; for (;
            (n = e.exec(t)) !== null;) s.push(n); return s },
    yd = nt("HTMLFormElement"),
    Ed = e => e.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g, function(n, s, r) { return s.toUpperCase() + r }),
    bi = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype),
    Ad = nt("RegExp"),
    Xo = (e, t) => { const n = Object.getOwnPropertyDescriptors(e),
            s = {};
        fn(n, (r, i) => { t(r, i, e) !== !1 && (s[i] = r) }), Object.defineProperties(e, s) },
    xd = e => { Xo(e, (t, n) => { if (Ct(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1) return !1; const s = e[n]; if (!!Ct(s)) { if (t.enumerable = !1, "writable" in t) { t.writable = !1; return } t.set || (t.set = () => { throw Error("Can not rewrite read-only method '" + n + "'") }) } }) },
    vd = (e, t) => { const n = {},
            s = r => { r.forEach(i => { n[i] = !0 }) }; return jt(e) ? s(e) : s(String(e).split(t)), n },
    Cd = () => {},
    Td = (e, t) => (e = +e, Number.isFinite(e) ? e : t),
    Id = e => { const t = new Array(10),
            n = (s, r) => { if (wr(s)) { if (t.indexOf(s) >= 0) return; if (!("toJSON" in s)) { t[r] = s; const i = jt(s) ? [] : {}; return fn(s, (o, l) => { const c = n(o, r + 1);!un(c) && (i[l] = c) }), t[r] = void 0, i } } return s }; return n(e, 0) },
    y = { isArray: jt, isArrayBuffer: Vo, isBuffer: Zf, isFormData: cd, isArrayBufferView: ed, isString: td, isNumber: zo, isBoolean: nd, isObject: wr, isPlainObject: Sn, isUndefined: un, isDate: sd, isFile: rd, isBlob: id, isRegExp: Ad, isFunction: Ct, isStream: ld, isURLSearchParams: ad, isTypedArray: _d, isFileList: od, forEach: fn, merge: Fs, extend: fd, trim: ud, stripBOM: dd, inherits: hd, toFlatObject: pd, kindOf: br, kindOfTest: nt, endsWith: md, toArray: gd, forEachEntry: bd, matchAll: wd, isHTMLForm: yd, hasOwnProperty: bi, hasOwnProp: bi, reduceDescriptors: Xo, freezeMethods: xd, toObjectSet: vd, toCamelCase: Ed, noop: Cd, toFiniteNumber: Td, findKey: Wo, global: Jo, isContextDefined: Yo, toJSONObject: Id };

function V(e, t, n, s, r) { Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), s && (this.request = s), r && (this.response = r) } y.inherits(V, Error, { toJSON: function() { return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: y.toJSONObject(this.config), code: this.code, status: this.response && this.response.status ? this.response.status : null } } });
const Qo = V.prototype,
    Go = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(e => { Go[e] = { value: e } });
Object.defineProperties(V, Go);
Object.defineProperty(Qo, "isAxiosError", { value: !0 });
V.from = (e, t, n, s, r, i) => { const o = Object.create(Qo); return y.toFlatObject(e, o, function(c) { return c !== Error.prototype }, l => l !== "isAxiosError"), V.call(o, e.message, t, n, s, r), o.cause = e, o.name = e.name, i && Object.assign(o, i), o };
var Nd = typeof self == "object" ? self.FormData : window.FormData;
const Sd = Nd;

function Ls(e) { return y.isPlainObject(e) || y.isArray(e) }

function Zo(e) { return y.endsWith(e, "[]") ? e.slice(0, -2) : e }

function wi(e, t, n) { return e ? e.concat(t).map(function(r, i) { return r = Zo(r), !n && i ? "[" + r + "]" : r }).join(n ? "." : "") : t }

function Rd(e) { return y.isArray(e) && !e.some(Ls) }
const Od = y.toFlatObject(y, {}, null, function(t) { return /^is[A-Z]/.test(t) });

function Pd(e) { return e && y.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator] }

function es(e, t, n) { if (!y.isObject(e)) throw new TypeError("target must be an object");
    t = t || new(Sd || FormData), n = y.toFlatObject(n, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function(b, S) { return !y.isUndefined(S[b]) }); const s = n.metaTokens,
        r = n.visitor || u,
        i = n.dots,
        o = n.indexes,
        c = (n.Blob || typeof Blob < "u" && Blob) && Pd(t); if (!y.isFunction(r)) throw new TypeError("visitor must be a function");

    function a(g) { if (g === null) return ""; if (y.isDate(g)) return g.toISOString(); if (!c && y.isBlob(g)) throw new V("Blob is not supported. Use a Buffer instead."); return y.isArrayBuffer(g) || y.isTypedArray(g) ? c && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g }

    function u(g, b, S) { let P = g; if (g && !S && typeof g == "object") { if (y.endsWith(b, "{}")) b = s ? b : b.slice(0, -2), g = JSON.stringify(g);
            else if (y.isArray(g) && Rd(g) || y.isFileList(g) || y.endsWith(b, "[]") && (P = y.toArray(g))) return b = Zo(b), P.forEach(function(O, D) {!(y.isUndefined(O) || O === null) && t.append(o === !0 ? wi([b], D, i) : o === null ? b : b + "[]", a(O)) }), !1 } return Ls(g) ? !0 : (t.append(wi(S, b, i), a(g)), !1) } const h = [],
        f = Object.assign(Od, { defaultVisitor: u, convertValue: a, isVisitable: Ls });

    function _(g, b) { if (!y.isUndefined(g)) { if (h.indexOf(g) !== -1) throw Error("Circular reference detected in " + b.join("."));
            h.push(g), y.forEach(g, function(P, W) {
                (!(y.isUndefined(P) || P === null) && r.call(t, P, y.isString(W) ? W.trim() : W, b, f)) === !0 && _(P, b ? b.concat(W) : [W]) }), h.pop() } } if (!y.isObject(e)) throw new TypeError("data must be an object"); return _(e), t }

function yi(e) { const t = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" }; return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(s) { return t[s] }) }

function yr(e, t) { this._pairs = [], e && es(e, this, t) }
const el = yr.prototype;
el.append = function(t, n) { this._pairs.push([t, n]) };
el.toString = function(t) { const n = t ? function(s) { return t.call(this, s, yi) } : yi; return this._pairs.map(function(r) { return n(r[0]) + "=" + n(r[1]) }, "").join("&") };

function Fd(e) { return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]") }

function tl(e, t, n) { if (!t) return e; const s = n && n.encode || Fd,
        r = n && n.serialize; let i; if (r ? i = r(t, n) : i = y.isURLSearchParams(t) ? t.toString() : new yr(t, n).toString(s), i) { const o = e.indexOf("#");
        o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + i } return e } class Ld { constructor() { this.handlers = [] } use(t, n, s) { return this.handlers.push({ fulfilled: t, rejected: n, synchronous: s ? s.synchronous : !1, runWhen: s ? s.runWhen : null }), this.handlers.length - 1 } eject(t) { this.handlers[t] && (this.handlers[t] = null) } clear() { this.handlers && (this.handlers = []) } forEach(t) { y.forEach(this.handlers, function(s) { s !== null && t(s) }) } }
const Ei = Ld,
    nl = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
    Md = typeof URLSearchParams < "u" ? URLSearchParams : yr,
    kd = FormData,
    Hd = (() => { let e; return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u" })(),
    Ud = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(),
    De = { isBrowser: !0, classes: { URLSearchParams: Md, FormData: kd, Blob }, isStandardBrowserEnv: Hd, isStandardBrowserWebWorkerEnv: Ud, protocols: ["http", "https", "file", "blob", "url", "data"] };

function Bd(e, t) { return es(e, new De.classes.URLSearchParams, Object.assign({ visitor: function(n, s, r, i) { return De.isNode && y.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments) } }, t)) }

function Dd(e) { return y.matchAll(/\w+|\[(\w*)]/g, e).map(t => t[0] === "[]" ? "" : t[1] || t[0]) }

function $d(e) { const t = {},
        n = Object.keys(e); let s; const r = n.length; let i; for (s = 0; s < r; s++) i = n[s], t[i] = e[i]; return t }

function sl(e) {
    function t(n, s, r, i) { let o = n[i++]; const l = Number.isFinite(+o),
            c = i >= n.length; return o = !o && y.isArray(r) ? r.length : o, c ? (y.hasOwnProp(r, o) ? r[o] = [r[o], s] : r[o] = s, !l) : ((!r[o] || !y.isObject(r[o])) && (r[o] = []), t(n, s, r[o], i) && y.isArray(r[o]) && (r[o] = $d(r[o])), !l) } if (y.isFormData(e) && y.isFunction(e.entries)) { const n = {}; return y.forEachEntry(e, (s, r) => { t(Dd(s), r, n, 0) }), n } return null }
const jd = { "Content-Type": void 0 };

function Kd(e, t, n) { if (y.isString(e)) try { return (t || JSON.parse)(e), y.trim(e) } catch (s) { if (s.name !== "SyntaxError") throw s }
    return (n || JSON.stringify)(e) }
const ts = { transitional: nl, adapter: ["xhr", "http"], transformRequest: [function(t, n) { const s = n.getContentType() || "",
            r = s.indexOf("application/json") > -1,
            i = y.isObject(t); if (i && y.isHTMLForm(t) && (t = new FormData(t)), y.isFormData(t)) return r && r ? JSON.stringify(sl(t)) : t; if (y.isArrayBuffer(t) || y.isBuffer(t) || y.isStream(t) || y.isFile(t) || y.isBlob(t)) return t; if (y.isArrayBufferView(t)) return t.buffer; if (y.isURLSearchParams(t)) return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString(); let l; if (i) { if (s.indexOf("application/x-www-form-urlencoded") > -1) return Bd(t, this.formSerializer).toString(); if ((l = y.isFileList(t)) || s.indexOf("multipart/form-data") > -1) { const c = this.env && this.env.FormData; return es(l ? { "files[]": t } : t, c && new c, this.formSerializer) } } return i || r ? (n.setContentType("application/json", !1), Kd(t)) : t }], transformResponse: [function(t) { const n = this.transitional || ts.transitional,
            s = n && n.forcedJSONParsing,
            r = this.responseType === "json"; if (t && y.isString(t) && (s && !this.responseType || r)) { const o = !(n && n.silentJSONParsing) && r; try { return JSON.parse(t) } catch (l) { if (o) throw l.name === "SyntaxError" ? V.from(l, V.ERR_BAD_RESPONSE, this, null, this.response) : l } } return t }], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: De.classes.FormData, Blob: De.classes.Blob }, validateStatus: function(t) { return t >= 200 && t < 300 }, headers: { common: { Accept: "application/json, text/plain, */*" } } };
y.forEach(["delete", "get", "head"], function(t) { ts.headers[t] = {} });
y.forEach(["post", "put", "patch"], function(t) { ts.headers[t] = y.merge(jd) });
const Er = ts,
    qd = y.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]),
    Vd = e => { const t = {}; let n, s, r; return e && e.split(`
`).forEach(function(o) { r = o.indexOf(":"), n = o.substring(0, r).trim().toLowerCase(), s = o.substring(r + 1).trim(), !(!n || t[n] && qd[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s) }), t },
    Ai = Symbol("internals");

function Yt(e) { return e && String(e).trim().toLowerCase() }

function Rn(e) { return e === !1 || e == null ? e : y.isArray(e) ? e.map(Rn) : String(e) }

function zd(e) { const t = Object.create(null),
        n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g; let s; for (; s = n.exec(e);) t[s[1]] = s[2]; return t }

function Wd(e) { return /^[-_a-zA-Z]+$/.test(e.trim()) }

function xi(e, t, n, s) { if (y.isFunction(s)) return s.call(this, t, n); if (!!y.isString(t)) { if (y.isString(s)) return t.indexOf(s) !== -1; if (y.isRegExp(s)) return s.test(t) } }

function Jd(e) { return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s) }

function Yd(e, t) { const n = y.toCamelCase(" " + t);
    ["get", "set", "has"].forEach(s => { Object.defineProperty(e, s + n, { value: function(r, i, o) { return this[s].call(this, t, r, i, o) }, configurable: !0 }) }) } class ns { constructor(t) { t && this.set(t) } set(t, n, s) { const r = this;

        function i(l, c, a) { const u = Yt(c); if (!u) throw new Error("header name must be a non-empty string"); const h = y.findKey(r, u);
            (!h || r[h] === void 0 || a === !0 || a === void 0 && r[h] !== !1) && (r[h || c] = Rn(l)) } const o = (l, c) => y.forEach(l, (a, u) => i(a, u, c)); return y.isPlainObject(t) || t instanceof this.constructor ? o(t, n) : y.isString(t) && (t = t.trim()) && !Wd(t) ? o(Vd(t), n) : t != null && i(n, t, s), this } get(t, n) { if (t = Yt(t), t) { const s = y.findKey(this, t); if (s) { const r = this[s]; if (!n) return r; if (n === !0) return zd(r); if (y.isFunction(n)) return n.call(this, r, s); if (y.isRegExp(n)) return n.exec(r); throw new TypeError("parser must be boolean|regexp|function") } } } has(t, n) { if (t = Yt(t), t) { const s = y.findKey(this, t); return !!(s && (!n || xi(this, this[s], s, n))) } return !1 } delete(t, n) { const s = this; let r = !1;

        function i(o) { if (o = Yt(o), o) { const l = y.findKey(s, o);
                l && (!n || xi(s, s[l], l, n)) && (delete s[l], r = !0) } } return y.isArray(t) ? t.forEach(i) : i(t), r } clear() { return Object.keys(this).forEach(this.delete.bind(this)) } normalize(t) { const n = this,
            s = {}; return y.forEach(this, (r, i) => { const o = y.findKey(s, i); if (o) { n[o] = Rn(r), delete n[i]; return } const l = t ? Jd(i) : String(i).trim();
            l !== i && delete n[i], n[l] = Rn(r), s[l] = !0 }), this } concat(...t) { return this.constructor.concat(this, ...t) } toJSON(t) { const n = Object.create(null); return y.forEach(this, (s, r) => { s != null && s !== !1 && (n[r] = t && y.isArray(s) ? s.join(", ") : s) }), n } [Symbol.iterator]() { return Object.entries(this.toJSON())[Symbol.iterator]() } toString() { return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`) } get[Symbol.toStringTag]() { return "AxiosHeaders" } static from(t) { return t instanceof this ? t : new this(t) } static concat(t, ...n) { const s = new this(t); return n.forEach(r => s.set(r)), s } static accessor(t) { const s = (this[Ai] = this[Ai] = { accessors: {} }).accessors,
            r = this.prototype;

        function i(o) { const l = Yt(o);
            s[l] || (Yd(r, o), s[l] = !0) } return y.isArray(t) ? t.forEach(i) : i(t), this } } ns.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
y.freezeMethods(ns.prototype);
y.freezeMethods(ns);
const Ze = ns;

function hs(e, t) { const n = this || Er,
        s = t || n,
        r = Ze.from(s.headers); let i = s.data; return y.forEach(e, function(l) { i = l.call(n, i, r.normalize(), t ? t.status : void 0) }), r.normalize(), i }

function rl(e) { return !!(e && e.__CANCEL__) }

function dn(e, t, n) { V.call(this, e ? ? "canceled", V.ERR_CANCELED, t, n), this.name = "CanceledError" } y.inherits(dn, V, { __CANCEL__: !0 });
const Xd = null;

function Qd(e, t, n) { const s = n.config.validateStatus;!n.status || !s || s(n.status) ? e(n) : t(new V("Request failed with status code " + n.status, [V.ERR_BAD_REQUEST, V.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n)) }
const Gd = De.isStandardBrowserEnv ? function() { return { write: function(n, s, r, i, o, l) { const c = [];
            c.push(n + "=" + encodeURIComponent(s)), y.isNumber(r) && c.push("expires=" + new Date(r).toGMTString()), y.isString(i) && c.push("path=" + i), y.isString(o) && c.push("domain=" + o), l === !0 && c.push("secure"), document.cookie = c.join("; ") }, read: function(n) { const s = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)")); return s ? decodeURIComponent(s[3]) : null }, remove: function(n) { this.write(n, "", Date.now() - 864e5) } } }() : function() { return { write: function() {}, read: function() { return null }, remove: function() {} } }();

function Zd(e) { return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e) }

function eh(e, t) { return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e }

function il(e, t) { return e && !Zd(t) ? eh(e, t) : t }
const th = De.isStandardBrowserEnv ? function() { const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement("a"); let s;

    function r(i) { let o = i; return t && (n.setAttribute("href", o), o = n.href), n.setAttribute("href", o), { href: n.href, protocol: n.protocol ? n.protocol.replace(/:$/, "") : "", host: n.host, search: n.search ? n.search.replace(/^\?/, "") : "", hash: n.hash ? n.hash.replace(/^#/, "") : "", hostname: n.hostname, port: n.port, pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname } } return s = r(window.location.href),
        function(o) { const l = y.isString(o) ? r(o) : o; return l.protocol === s.protocol && l.host === s.host } }() : function() { return function() { return !0 } }();

function nh(e) { const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e); return t && t[1] || "" }

function sh(e, t) { e = e || 10; const n = new Array(e),
        s = new Array(e); let r = 0,
        i = 0,
        o; return t = t !== void 0 ? t : 1e3,
        function(c) { const a = Date.now(),
                u = s[i];
            o || (o = a), n[r] = c, s[r] = a; let h = i,
                f = 0; for (; h !== r;) f += n[h++], h = h % e; if (r = (r + 1) % e, r === i && (i = (i + 1) % e), a - o < t) return; const _ = u && a - u; return _ ? Math.round(f * 1e3 / _) : void 0 } }

function vi(e, t) { let n = 0; const s = sh(50, 250); return r => { const i = r.loaded,
            o = r.lengthComputable ? r.total : void 0,
            l = i - n,
            c = s(l),
            a = i <= o;
        n = i; const u = { loaded: i, total: o, progress: o ? i / o : void 0, bytes: l, rate: c || void 0, estimated: c && o && a ? (o - i) / c : void 0, event: r };
        u[t ? "download" : "upload"] = !0, e(u) } }
const rh = typeof XMLHttpRequest < "u",
    ih = rh && function(e) { return new Promise(function(n, s) { let r = e.data; const i = Ze.from(e.headers).normalize(),
                o = e.responseType; let l;

            function c() { e.cancelToken && e.cancelToken.unsubscribe(l), e.signal && e.signal.removeEventListener("abort", l) } y.isFormData(r) && (De.isStandardBrowserEnv || De.isStandardBrowserWebWorkerEnv) && i.setContentType(!1); let a = new XMLHttpRequest; if (e.auth) { const _ = e.auth.username || "",
                    g = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                i.set("Authorization", "Basic " + btoa(_ + ":" + g)) } const u = il(e.baseURL, e.url);
            a.open(e.method.toUpperCase(), tl(u, e.params, e.paramsSerializer), !0), a.timeout = e.timeout;

            function h() { if (!a) return; const _ = Ze.from("getAllResponseHeaders" in a && a.getAllResponseHeaders()),
                    b = { data: !o || o === "text" || o === "json" ? a.responseText : a.response, status: a.status, statusText: a.statusText, headers: _, config: e, request: a };
                Qd(function(P) { n(P), c() }, function(P) { s(P), c() }, b), a = null } if ("onloadend" in a ? a.onloadend = h : a.onreadystatechange = function() {!a || a.readyState !== 4 || a.status === 0 && !(a.responseURL && a.responseURL.indexOf("file:") === 0) || setTimeout(h) }, a.onabort = function() {!a || (s(new V("Request aborted", V.ECONNABORTED, e, a)), a = null) }, a.onerror = function() { s(new V("Network Error", V.ERR_NETWORK, e, a)), a = null }, a.ontimeout = function() { let g = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded"; const b = e.transitional || nl;
                    e.timeoutErrorMessage && (g = e.timeoutErrorMessage), s(new V(g, b.clarifyTimeoutError ? V.ETIMEDOUT : V.ECONNABORTED, e, a)), a = null }, De.isStandardBrowserEnv) { const _ = (e.withCredentials || th(u)) && e.xsrfCookieName && Gd.read(e.xsrfCookieName);
                _ && i.set(e.xsrfHeaderName, _) } r === void 0 && i.setContentType(null), "setRequestHeader" in a && y.forEach(i.toJSON(), function(g, b) { a.setRequestHeader(b, g) }), y.isUndefined(e.withCredentials) || (a.withCredentials = !!e.withCredentials), o && o !== "json" && (a.responseType = e.responseType), typeof e.onDownloadProgress == "function" && a.addEventListener("progress", vi(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && a.upload && a.upload.addEventListener("progress", vi(e.onUploadProgress)), (e.cancelToken || e.signal) && (l = _ => {!a || (s(!_ || _.type ? new dn(null, e, a) : _), a.abort(), a = null) }, e.cancelToken && e.cancelToken.subscribe(l), e.signal && (e.signal.aborted ? l() : e.signal.addEventListener("abort", l))); const f = nh(u); if (f && De.protocols.indexOf(f) === -1) { s(new V("Unsupported protocol " + f + ":", V.ERR_BAD_REQUEST, e)); return } a.send(r || null) }) },
    On = { http: Xd, xhr: ih };
y.forEach(On, (e, t) => { if (e) { try { Object.defineProperty(e, "name", { value: t }) } catch {} Object.defineProperty(e, "adapterName", { value: t }) } });
const oh = { getAdapter: e => { e = y.isArray(e) ? e : [e]; const { length: t } = e; let n, s; for (let r = 0; r < t && (n = e[r], !(s = y.isString(n) ? On[n.toLowerCase()] : n)); r++); if (!s) throw s === !1 ? new V(`Adapter ${n} is not supported by the environment`, "ERR_NOT_SUPPORT") : new Error(y.hasOwnProp(On, n) ? `Adapter '${n}' is not available in the build` : `Unknown adapter '${n}'`); if (!y.isFunction(s)) throw new TypeError("adapter is not a function"); return s }, adapters: On };

function ps(e) { if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new dn(null, e) }

function Ci(e) { return ps(e), e.headers = Ze.from(e.headers), e.data = hs.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), oh.getAdapter(e.adapter || Er.adapter)(e).then(function(s) { return ps(e), s.data = hs.call(e, e.transformResponse, s), s.headers = Ze.from(s.headers), s }, function(s) { return rl(s) || (ps(e), s && s.response && (s.response.data = hs.call(e, e.transformResponse, s.response), s.response.headers = Ze.from(s.response.headers))), Promise.reject(s) }) }
const Ti = e => e instanceof Ze ? e.toJSON() : e;

function Ht(e, t) { t = t || {}; const n = {};

    function s(a, u, h) { return y.isPlainObject(a) && y.isPlainObject(u) ? y.merge.call({ caseless: h }, a, u) : y.isPlainObject(u) ? y.merge({}, u) : y.isArray(u) ? u.slice() : u }

    function r(a, u, h) { if (y.isUndefined(u)) { if (!y.isUndefined(a)) return s(void 0, a, h) } else return s(a, u, h) }

    function i(a, u) { if (!y.isUndefined(u)) return s(void 0, u) }

    function o(a, u) { if (y.isUndefined(u)) { if (!y.isUndefined(a)) return s(void 0, a) } else return s(void 0, u) }

    function l(a, u, h) { if (h in t) return s(a, u); if (h in e) return s(void 0, a) } const c = { url: i, method: i, data: i, baseURL: o, transformRequest: o, transformResponse: o, paramsSerializer: o, timeout: o, timeoutMessage: o, withCredentials: o, adapter: o, responseType: o, xsrfCookieName: o, xsrfHeaderName: o, onUploadProgress: o, onDownloadProgress: o, decompress: o, maxContentLength: o, maxBodyLength: o, beforeRedirect: o, transport: o, httpAgent: o, httpsAgent: o, cancelToken: o, socketPath: o, responseEncoding: o, validateStatus: l, headers: (a, u) => r(Ti(a), Ti(u), !0) }; return y.forEach(Object.keys(e).concat(Object.keys(t)), function(u) { const h = c[u] || r,
            f = h(e[u], t[u], u);
        y.isUndefined(f) && h !== l || (n[u] = f) }), n }
const ol = "1.2.2",
    Ar = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => { Ar[e] = function(s) { return typeof s === e || "a" + (t < 1 ? "n " : " ") + e } });
const Ii = {};
Ar.transitional = function(t, n, s) {
    function r(i, o) { return "[Axios v" + ol + "] Transitional option '" + i + "'" + o + (s ? ". " + s : "") } return (i, o, l) => { if (t === !1) throw new V(r(o, " has been removed" + (n ? " in " + n : "")), V.ERR_DEPRECATED); return n && !Ii[o] && (Ii[o] = !0, console.warn(r(o, " has been deprecated since v" + n + " and will be removed in the near future"))), t ? t(i, o, l) : !0 } };

function lh(e, t, n) { if (typeof e != "object") throw new V("options must be an object", V.ERR_BAD_OPTION_VALUE); const s = Object.keys(e); let r = s.length; for (; r-- > 0;) { const i = s[r],
            o = t[i]; if (o) { const l = e[i],
                c = l === void 0 || o(l, i, e); if (c !== !0) throw new V("option " + i + " must be " + c, V.ERR_BAD_OPTION_VALUE); continue } if (n !== !0) throw new V("Unknown option " + i, V.ERR_BAD_OPTION) } }
const Ms = { assertOptions: lh, validators: Ar },
    rt = Ms.validators;
class Un { constructor(t) { this.defaults = t, this.interceptors = { request: new Ei, response: new Ei } } request(t, n) { typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Ht(this.defaults, n); const { transitional: s, paramsSerializer: r, headers: i } = n;
        s !== void 0 && Ms.assertOptions(s, { silentJSONParsing: rt.transitional(rt.boolean), forcedJSONParsing: rt.transitional(rt.boolean), clarifyTimeoutError: rt.transitional(rt.boolean) }, !1), r !== void 0 && Ms.assertOptions(r, { encode: rt.function, serialize: rt.function }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase(); let o;
        o = i && y.merge(i.common, i[n.method]), o && y.forEach(["delete", "get", "head", "post", "put", "patch", "common"], g => { delete i[g] }), n.headers = Ze.concat(o, i); const l = []; let c = !0;
        this.interceptors.request.forEach(function(b) { typeof b.runWhen == "function" && b.runWhen(n) === !1 || (c = c && b.synchronous, l.unshift(b.fulfilled, b.rejected)) }); const a = [];
        this.interceptors.response.forEach(function(b) { a.push(b.fulfilled, b.rejected) }); let u, h = 0,
            f; if (!c) { const g = [Ci.bind(this), void 0]; for (g.unshift.apply(g, l), g.push.apply(g, a), f = g.length, u = Promise.resolve(n); h < f;) u = u.then(g[h++], g[h++]); return u } f = l.length; let _ = n; for (h = 0; h < f;) { const g = l[h++],
                b = l[h++]; try { _ = g(_) } catch (S) { b.call(this, S); break } } try { u = Ci.call(this, _) } catch (g) { return Promise.reject(g) } for (h = 0, f = a.length; h < f;) u = u.then(a[h++], a[h++]); return u } getUri(t) { t = Ht(this.defaults, t); const n = il(t.baseURL, t.url); return tl(n, t.params, t.paramsSerializer) } } y.forEach(["delete", "get", "head", "options"], function(t) { Un.prototype[t] = function(n, s) { return this.request(Ht(s || {}, { method: t, url: n, data: (s || {}).data })) } });
y.forEach(["post", "put", "patch"], function(t) {
    function n(s) { return function(i, o, l) { return this.request(Ht(l || {}, { method: t, headers: s ? { "Content-Type": "multipart/form-data" } : {}, url: i, data: o })) } } Un.prototype[t] = n(), Un.prototype[t + "Form"] = n(!0) });
const Pn = Un;
class xr { constructor(t) { if (typeof t != "function") throw new TypeError("executor must be a function."); let n;
        this.promise = new Promise(function(i) { n = i }); const s = this;
        this.promise.then(r => { if (!s._listeners) return; let i = s._listeners.length; for (; i-- > 0;) s._listeners[i](r);
            s._listeners = null }), this.promise.then = r => { let i; const o = new Promise(l => { s.subscribe(l), i = l }).then(r); return o.cancel = function() { s.unsubscribe(i) }, o }, t(function(i, o, l) { s.reason || (s.reason = new dn(i, o, l), n(s.reason)) }) } throwIfRequested() { if (this.reason) throw this.reason } subscribe(t) { if (this.reason) { t(this.reason); return } this._listeners ? this._listeners.push(t) : this._listeners = [t] } unsubscribe(t) { if (!this._listeners) return; const n = this._listeners.indexOf(t);
        n !== -1 && this._listeners.splice(n, 1) } static source() { let t; return { token: new xr(function(r) { t = r }), cancel: t } } }
const ch = xr;

function ah(e) { return function(n) { return e.apply(null, n) } }

function uh(e) { return y.isObject(e) && e.isAxiosError === !0 }
const ks = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511 };
Object.entries(ks).forEach(([e, t]) => { ks[t] = e });
const fh = ks;

function ll(e) { const t = new Pn(e),
        n = Ko(Pn.prototype.request, t); return y.extend(n, Pn.prototype, t, { allOwnKeys: !0 }), y.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) { return ll(Ht(e, r)) }, n }
const ue = ll(Er);
ue.Axios = Pn;
ue.CanceledError = dn;
ue.CancelToken = ch;
ue.isCancel = rl;
ue.VERSION = ol;
ue.toFormData = es;
ue.AxiosError = V;
ue.Cancel = ue.CanceledError;
ue.all = function(t) { return Promise.all(t) };
ue.spread = ah;
ue.isAxiosError = uh;
ue.mergeConfig = Ht;
ue.AxiosHeaders = Ze;
ue.formToJSON = e => sl(y.isHTMLForm(e) ? new FormData(e) : e);
ue.HttpStatusCode = fh;
ue.default = ue;
const Hs = ue,
    cl = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function Ni(e, t, n, s) { let r, i, o; const l = t || [0],
        c = (n = n || 0) >>> 3,
        a = s === -1 ? 3 : 0; for (r = 0; r < e.length; r += 1) o = r + c, i = o >>> 2, l.length <= i && l.push(0), l[i] |= e[r] << 8 * (a + s * (o % 4)); return { value: l, binLen: 8 * e.length + n } }

function Kt(e, t, n) { switch (t) {
        case "UTF8":
        case "UTF16BE":
        case "UTF16LE":
            break;
        default:
            throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE") } switch (e) {
        case "HEX":
            return function(s, r, i) { return function(o, l, c, a) { let u, h, f, _; if (o.length % 2 != 0) throw new Error("String of HEX type must be in byte increments"); const g = l || [0],
                        b = (c = c || 0) >>> 3,
                        S = a === -1 ? 3 : 0; for (u = 0; u < o.length; u += 2) { if (h = parseInt(o.substr(u, 2), 16), isNaN(h)) throw new Error("String of HEX type contains invalid characters"); for (_ = (u >>> 1) + b, f = _ >>> 2; g.length <= f;) g.push(0);
                        g[f] |= h << 8 * (S + a * (_ % 4)) } return { value: g, binLen: 4 * o.length + c } }(s, r, i, n) };
        case "TEXT":
            return function(s, r, i) { return function(o, l, c, a, u) { let h, f, _, g, b, S, P, W, O = 0; const D = c || [0],
                        K = (a = a || 0) >>> 3; if (l === "UTF8")
                        for (P = u === -1 ? 3 : 0, _ = 0; _ < o.length; _ += 1)
                            for (h = o.charCodeAt(_), f = [], 128 > h ? f.push(h) : 2048 > h ? (f.push(192 | h >>> 6), f.push(128 | 63 & h)) : 55296 > h || 57344 <= h ? f.push(224 | h >>> 12, 128 | h >>> 6 & 63, 128 | 63 & h) : (_ += 1, h = 65536 + ((1023 & h) << 10 | 1023 & o.charCodeAt(_)), f.push(240 | h >>> 18, 128 | h >>> 12 & 63, 128 | h >>> 6 & 63, 128 | 63 & h)), g = 0; g < f.length; g += 1) { for (S = O + K, b = S >>> 2; D.length <= b;) D.push(0);
                                D[b] |= f[g] << 8 * (P + u * (S % 4)), O += 1 } else
                                for (P = u === -1 ? 2 : 0, W = l === "UTF16LE" && u !== 1 || l !== "UTF16LE" && u === 1, _ = 0; _ < o.length; _ += 1) { for (h = o.charCodeAt(_), W === !0 && (g = 255 & h, h = g << 8 | h >>> 8), S = O + K, b = S >>> 2; D.length <= b;) D.push(0);
                                    D[b] |= h << 8 * (P + u * (S % 4)), O += 2 }
                    return { value: D, binLen: 8 * O + a } }(s, t, r, i, n) };
        case "B64":
            return function(s, r, i) { return function(o, l, c, a) { let u, h, f, _, g, b, S, P = 0; const W = l || [0],
                        O = (c = c || 0) >>> 3,
                        D = a === -1 ? 3 : 0,
                        K = o.indexOf("="); if (o.search(/^[a-zA-Z0-9=+/]+$/) === -1) throw new Error("Invalid character in base-64 string"); if (o = o.replace(/=/g, ""), K !== -1 && K < o.length) throw new Error("Invalid '=' found in base-64 string"); for (h = 0; h < o.length; h += 4) { for (g = o.substr(h, 4), _ = 0, f = 0; f < g.length; f += 1) u = cl.indexOf(g.charAt(f)), _ |= u << 18 - 6 * f; for (f = 0; f < g.length - 1; f += 1) { for (S = P + O, b = S >>> 2; W.length <= b;) W.push(0);
                            W[b] |= (_ >>> 16 - 8 * f & 255) << 8 * (D + a * (S % 4)), P += 1 } } return { value: W, binLen: 8 * P + c } }(s, r, i, n) };
        case "BYTES":
            return function(s, r, i) { return function(o, l, c, a) { let u, h, f, _; const g = l || [0],
                        b = (c = c || 0) >>> 3,
                        S = a === -1 ? 3 : 0; for (h = 0; h < o.length; h += 1) u = o.charCodeAt(h), _ = h + b, f = _ >>> 2, g.length <= f && g.push(0), g[f] |= u << 8 * (S + a * (_ % 4)); return { value: g, binLen: 8 * o.length + c } }(s, r, i, n) };
        case "ARRAYBUFFER":
            try { new ArrayBuffer(0) } catch { throw new Error("ARRAYBUFFER not supported by this environment") } return function(s, r, i) { return function(o, l, c, a) { return Ni(new Uint8Array(o), l, c, a) }(s, r, i, n) };
        case "UINT8ARRAY":
            try { new Uint8Array(0) } catch { throw new Error("UINT8ARRAY not supported by this environment") } return function(s, r, i) { return Ni(s, r, i, n) };
        default:
            throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY") } }

function Si(e, t, n, s) { switch (e) {
        case "HEX":
            return function(r) { return function(i, o, l, c) { const a = "0123456789abcdef"; let u, h, f = ""; const _ = o / 8,
                        g = l === -1 ? 3 : 0; for (u = 0; u < _; u += 1) h = i[u >>> 2] >>> 8 * (g + l * (u % 4)), f += a.charAt(h >>> 4 & 15) + a.charAt(15 & h); return c.outputUpper ? f.toUpperCase() : f }(r, t, n, s) };
        case "B64":
            return function(r) { return function(i, o, l, c) { let a, u, h, f, _, g = ""; const b = o / 8,
                        S = l === -1 ? 3 : 0; for (a = 0; a < b; a += 3)
                        for (f = a + 1 < b ? i[a + 1 >>> 2] : 0, _ = a + 2 < b ? i[a + 2 >>> 2] : 0, h = (i[a >>> 2] >>> 8 * (S + l * (a % 4)) & 255) << 16 | (f >>> 8 * (S + l * ((a + 1) % 4)) & 255) << 8 | _ >>> 8 * (S + l * ((a + 2) % 4)) & 255, u = 0; u < 4; u += 1) g += 8 * a + 6 * u <= o ? cl.charAt(h >>> 6 * (3 - u) & 63) : c.b64Pad; return g }(r, t, n, s) };
        case "BYTES":
            return function(r) { return function(i, o, l) { let c, a, u = ""; const h = o / 8,
                        f = l === -1 ? 3 : 0; for (c = 0; c < h; c += 1) a = i[c >>> 2] >>> 8 * (f + l * (c % 4)) & 255, u += String.fromCharCode(a); return u }(r, t, n) };
        case "ARRAYBUFFER":
            try { new ArrayBuffer(0) } catch { throw new Error("ARRAYBUFFER not supported by this environment") } return function(r) { return function(i, o, l) { let c; const a = o / 8,
                        u = new ArrayBuffer(a),
                        h = new Uint8Array(u),
                        f = l === -1 ? 3 : 0; for (c = 0; c < a; c += 1) h[c] = i[c >>> 2] >>> 8 * (f + l * (c % 4)) & 255; return u }(r, t, n) };
        case "UINT8ARRAY":
            try { new Uint8Array(0) } catch { throw new Error("UINT8ARRAY not supported by this environment") } return function(r) { return function(i, o, l) { let c; const a = o / 8,
                        u = l === -1 ? 3 : 0,
                        h = new Uint8Array(a); for (c = 0; c < a; c += 1) h[c] = i[c >>> 2] >>> 8 * (u + l * (c % 4)) & 255; return h }(r, t, n) };
        default:
            throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY") } }
const R = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
    We = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428],
    Je = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
    hn = "Chosen SHA variant is not supported";

function Bn(e, t) { let n, s; const r = e.binLen >>> 3,
        i = t.binLen >>> 3,
        o = r << 3,
        l = 4 - r << 3; if (r % 4 != 0) { for (n = 0; n < i; n += 4) s = r + n >>> 2, e.value[s] |= t.value[n >>> 2] << o, e.value.push(0), e.value[s + 1] |= t.value[n >>> 2] >>> l; return (e.value.length << 2) - 4 >= i + r && e.value.pop(), { value: e.value, binLen: e.binLen + t.binLen } } return { value: e.value.concat(t.value), binLen: e.binLen + t.binLen } }

function Ri(e) { const t = { outputUpper: !1, b64Pad: "=", outputLen: -1 },
        n = e || {},
        s = "Output length must be a multiple of 8"; if (t.outputUpper = n.outputUpper || !1, n.b64Pad && (t.b64Pad = n.b64Pad), n.outputLen) { if (n.outputLen % 8 != 0) throw new Error(s);
        t.outputLen = n.outputLen } else if (n.shakeLen) { if (n.shakeLen % 8 != 0) throw new Error(s);
        t.outputLen = n.shakeLen } if (typeof t.outputUpper != "boolean") throw new Error("Invalid outputUpper formatting option"); if (typeof t.b64Pad != "string") throw new Error("Invalid b64Pad formatting option"); return t }

function lt(e, t, n, s) { const r = e + " must include a value and format"; if (!t) { if (!s) throw new Error(r); return s } if (t.value === void 0 || !t.format) throw new Error(r); return Kt(t.format, t.encoding || "UTF8", n)(t.value) } class ss { constructor(t, n, s) { const r = s || {}; if (this.t = n, this.i = r.encoding || "UTF8", this.numRounds = r.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds) throw new Error("numRounds must a integer >= 1");
        this.o = t, this.h = [], this.u = 0, this.l = !1, this.A = 0, this.H = !1, this.S = [], this.p = [] } update(t) { let n, s = 0; const r = this.m >>> 5,
            i = this.C(t, this.h, this.u),
            o = i.binLen,
            l = i.value,
            c = o >>> 5; for (n = 0; n < c; n += r) s + this.m <= o && (this.R = this.U(l.slice(n, n + r), this.R), s += this.m); return this.A += s, this.h = l.slice(s >>> 5), this.u = o % this.m, this.l = !0, this } getHash(t, n) { let s, r, i = this.v; const o = Ri(n); if (this.K) { if (o.outputLen === -1) throw new Error("Output length must be specified in options");
            i = o.outputLen } const l = Si(t, i, this.T, o); if (this.H && this.F) return l(this.F(o)); for (r = this.g(this.h.slice(), this.u, this.A, this.B(this.R), i), s = 1; s < this.numRounds; s += 1) this.K && i % 32 != 0 && (r[r.length - 1] &= 16777215 >>> 24 - i % 32), r = this.g(r, i, 0, this.L(this.o), i); return l(r) } setHMACKey(t, n, s) { if (!this.M) throw new Error("Variant does not support HMAC"); if (this.l) throw new Error("Cannot set MAC key after calling update"); const r = Kt(n, (s || {}).encoding || "UTF8", this.T);
        this.k(r(t)) } k(t) { const n = this.m >>> 3,
            s = n / 4 - 1; let r; if (this.numRounds !== 1) throw new Error("Cannot set numRounds with MAC"); if (this.H) throw new Error("MAC key already set"); for (n < t.binLen / 8 && (t.value = this.g(t.value, t.binLen, 0, this.L(this.o), this.v)); t.value.length <= s;) t.value.push(0); for (r = 0; r <= s; r += 1) this.S[r] = 909522486 ^ t.value[r], this.p[r] = 1549556828 ^ t.value[r];
        this.R = this.U(this.S, this.R), this.A = this.m, this.H = !0 } getHMAC(t, n) { const s = Ri(n); return Si(t, this.v, this.T, s)(this.Y()) } Y() { let t; if (!this.H) throw new Error("Cannot call getHMAC without first setting MAC key"); const n = this.g(this.h.slice(), this.u, this.A, this.B(this.R), this.v); return t = this.U(this.p, this.L(this.o)), t = this.g(n, this.v, this.m, t, this.v), t } }

function St(e, t) { return e << t | e >>> 32 - t }

function je(e, t) { return e >>> t | e << 32 - t }

function al(e, t) { return e >>> t }

function Oi(e, t, n) { return e ^ t ^ n }

function ul(e, t, n) { return e & t ^ ~e & n }

function fl(e, t, n) { return e & t ^ e & n ^ t & n }

function dh(e) { return je(e, 2) ^ je(e, 13) ^ je(e, 22) }

function pe(e, t) { const n = (65535 & e) + (65535 & t); return (65535 & (e >>> 16) + (t >>> 16) + (n >>> 16)) << 16 | 65535 & n }

function hh(e, t, n, s) { const r = (65535 & e) + (65535 & t) + (65535 & n) + (65535 & s); return (65535 & (e >>> 16) + (t >>> 16) + (n >>> 16) + (s >>> 16) + (r >>> 16)) << 16 | 65535 & r }

function Gt(e, t, n, s, r) { const i = (65535 & e) + (65535 & t) + (65535 & n) + (65535 & s) + (65535 & r); return (65535 & (e >>> 16) + (t >>> 16) + (n >>> 16) + (s >>> 16) + (r >>> 16) + (i >>> 16)) << 16 | 65535 & i }

function ph(e) { return je(e, 7) ^ je(e, 18) ^ al(e, 3) }

function mh(e) { return je(e, 6) ^ je(e, 11) ^ je(e, 25) }

function gh(e) { return [1732584193, 4023233417, 2562383102, 271733878, 3285377520] }

function dl(e, t) { let n, s, r, i, o, l, c; const a = []; for (n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], c = 0; c < 80; c += 1) a[c] = c < 16 ? e[c] : St(a[c - 3] ^ a[c - 8] ^ a[c - 14] ^ a[c - 16], 1), l = c < 20 ? Gt(St(n, 5), ul(s, r, i), o, 1518500249, a[c]) : c < 40 ? Gt(St(n, 5), Oi(s, r, i), o, 1859775393, a[c]) : c < 60 ? Gt(St(n, 5), fl(s, r, i), o, 2400959708, a[c]) : Gt(St(n, 5), Oi(s, r, i), o, 3395469782, a[c]), o = i, i = r, r = St(s, 30), s = n, n = l; return t[0] = pe(n, t[0]), t[1] = pe(s, t[1]), t[2] = pe(r, t[2]), t[3] = pe(i, t[3]), t[4] = pe(o, t[4]), t }

function _h(e, t, n, s) { let r; const i = 15 + (t + 65 >>> 9 << 4),
        o = t + n; for (; e.length <= i;) e.push(0); for (e[t >>> 5] |= 128 << 24 - t % 32, e[i] = 4294967295 & o, e[i - 1] = o / 4294967296 | 0, r = 0; r < e.length; r += 16) s = dl(e.slice(r, r + 16), s); return s } class bh extends ss { constructor(t, n, s) { if (t !== "SHA-1") throw new Error(hn);
        super(t, n, s); const r = s || {};
        this.M = !0, this.F = this.Y, this.T = -1, this.C = Kt(this.t, this.i, this.T), this.U = dl, this.B = function(i) { return i.slice() }, this.L = gh, this.g = _h, this.R = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.v = 160, this.K = !1, r.hmacKey && this.k(lt("hmacKey", r.hmacKey, this.T)) } }

function Pi(e) { let t; return t = e == "SHA-224" ? We.slice() : Je.slice(), t }

function Fi(e, t) { let n, s, r, i, o, l, c, a, u, h, f; const _ = []; for (n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], l = t[5], c = t[6], a = t[7], f = 0; f < 64; f += 1) _[f] = f < 16 ? e[f] : hh(je(g = _[f - 2], 17) ^ je(g, 19) ^ al(g, 10), _[f - 7], ph(_[f - 15]), _[f - 16]), u = Gt(a, mh(o), ul(o, l, c), R[f], _[f]), h = pe(dh(n), fl(n, s, r)), a = c, c = l, l = o, o = pe(i, u), i = r, r = s, s = n, n = pe(u, h); var g; return t[0] = pe(n, t[0]), t[1] = pe(s, t[1]), t[2] = pe(r, t[2]), t[3] = pe(i, t[3]), t[4] = pe(o, t[4]), t[5] = pe(l, t[5]), t[6] = pe(c, t[6]), t[7] = pe(a, t[7]), t } class wh extends ss { constructor(t, n, s) { if (t !== "SHA-224" && t !== "SHA-256") throw new Error(hn);
        super(t, n, s); const r = s || {};
        this.F = this.Y, this.M = !0, this.T = -1, this.C = Kt(this.t, this.i, this.T), this.U = Fi, this.B = function(i) { return i.slice() }, this.L = Pi, this.g = function(i, o, l, c) { return function(a, u, h, f, _) { let g, b; const S = 15 + (u + 65 >>> 9 << 4),
                    P = u + h; for (; a.length <= S;) a.push(0); for (a[u >>> 5] |= 128 << 24 - u % 32, a[S] = 4294967295 & P, a[S - 1] = P / 4294967296 | 0, g = 0; g < a.length; g += 16) f = Fi(a.slice(g, g + 16), f); return b = _ === "SHA-224" ? [f[0], f[1], f[2], f[3], f[4], f[5], f[6]] : f, b }(i, o, l, c, t) }, this.R = Pi(t), this.m = 512, this.v = t === "SHA-224" ? 224 : 256, this.K = !1, r.hmacKey && this.k(lt("hmacKey", r.hmacKey, this.T)) } } class m { constructor(t, n) { this.N = t, this.I = n } }

function Li(e, t) { let n; return t > 32 ? (n = 64 - t, new m(e.I << t | e.N >>> n, e.N << t | e.I >>> n)) : t !== 0 ? (n = 32 - t, new m(e.N << t | e.I >>> n, e.I << t | e.N >>> n)) : e }

function Ke(e, t) { let n; return t < 32 ? (n = 32 - t, new m(e.N >>> t | e.I << n, e.I >>> t | e.N << n)) : (n = 64 - t, new m(e.I >>> t | e.N << n, e.N >>> t | e.I << n)) }

function hl(e, t) { return new m(e.N >>> t, e.I >>> t | e.N << 32 - t) }

function yh(e, t, n) { return new m(e.N & t.N ^ e.N & n.N ^ t.N & n.N, e.I & t.I ^ e.I & n.I ^ t.I & n.I) }

function Eh(e) { const t = Ke(e, 28),
        n = Ke(e, 34),
        s = Ke(e, 39); return new m(t.N ^ n.N ^ s.N, t.I ^ n.I ^ s.I) }

function Se(e, t) { let n, s;
    n = (65535 & e.I) + (65535 & t.I), s = (e.I >>> 16) + (t.I >>> 16) + (n >>> 16); const r = (65535 & s) << 16 | 65535 & n; return n = (65535 & e.N) + (65535 & t.N) + (s >>> 16), s = (e.N >>> 16) + (t.N >>> 16) + (n >>> 16), new m((65535 & s) << 16 | 65535 & n, r) }

function Ah(e, t, n, s) { let r, i;
    r = (65535 & e.I) + (65535 & t.I) + (65535 & n.I) + (65535 & s.I), i = (e.I >>> 16) + (t.I >>> 16) + (n.I >>> 16) + (s.I >>> 16) + (r >>> 16); const o = (65535 & i) << 16 | 65535 & r; return r = (65535 & e.N) + (65535 & t.N) + (65535 & n.N) + (65535 & s.N) + (i >>> 16), i = (e.N >>> 16) + (t.N >>> 16) + (n.N >>> 16) + (s.N >>> 16) + (r >>> 16), new m((65535 & i) << 16 | 65535 & r, o) }

function xh(e, t, n, s, r) { let i, o;
    i = (65535 & e.I) + (65535 & t.I) + (65535 & n.I) + (65535 & s.I) + (65535 & r.I), o = (e.I >>> 16) + (t.I >>> 16) + (n.I >>> 16) + (s.I >>> 16) + (r.I >>> 16) + (i >>> 16); const l = (65535 & o) << 16 | 65535 & i; return i = (65535 & e.N) + (65535 & t.N) + (65535 & n.N) + (65535 & s.N) + (65535 & r.N) + (o >>> 16), o = (e.N >>> 16) + (t.N >>> 16) + (n.N >>> 16) + (s.N >>> 16) + (r.N >>> 16) + (i >>> 16), new m((65535 & o) << 16 | 65535 & i, l) }

function Xt(e, t) { return new m(e.N ^ t.N, e.I ^ t.I) }

function vh(e) { const t = Ke(e, 19),
        n = Ke(e, 61),
        s = hl(e, 6); return new m(t.N ^ n.N ^ s.N, t.I ^ n.I ^ s.I) }

function Ch(e) { const t = Ke(e, 1),
        n = Ke(e, 8),
        s = hl(e, 7); return new m(t.N ^ n.N ^ s.N, t.I ^ n.I ^ s.I) }

function Th(e) { const t = Ke(e, 14),
        n = Ke(e, 18),
        s = Ke(e, 41); return new m(t.N ^ n.N ^ s.N, t.I ^ n.I ^ s.I) }
const Ih = [new m(R[0], 3609767458), new m(R[1], 602891725), new m(R[2], 3964484399), new m(R[3], 2173295548), new m(R[4], 4081628472), new m(R[5], 3053834265), new m(R[6], 2937671579), new m(R[7], 3664609560), new m(R[8], 2734883394), new m(R[9], 1164996542), new m(R[10], 1323610764), new m(R[11], 3590304994), new m(R[12], 4068182383), new m(R[13], 991336113), new m(R[14], 633803317), new m(R[15], 3479774868), new m(R[16], 2666613458), new m(R[17], 944711139), new m(R[18], 2341262773), new m(R[19], 2007800933), new m(R[20], 1495990901), new m(R[21], 1856431235), new m(R[22], 3175218132), new m(R[23], 2198950837), new m(R[24], 3999719339), new m(R[25], 766784016), new m(R[26], 2566594879), new m(R[27], 3203337956), new m(R[28], 1034457026), new m(R[29], 2466948901), new m(R[30], 3758326383), new m(R[31], 168717936), new m(R[32], 1188179964), new m(R[33], 1546045734), new m(R[34], 1522805485), new m(R[35], 2643833823), new m(R[36], 2343527390), new m(R[37], 1014477480), new m(R[38], 1206759142), new m(R[39], 344077627), new m(R[40], 1290863460), new m(R[41], 3158454273), new m(R[42], 3505952657), new m(R[43], 106217008), new m(R[44], 3606008344), new m(R[45], 1432725776), new m(R[46], 1467031594), new m(R[47], 851169720), new m(R[48], 3100823752), new m(R[49], 1363258195), new m(R[50], 3750685593), new m(R[51], 3785050280), new m(R[52], 3318307427), new m(R[53], 3812723403), new m(R[54], 2003034995), new m(R[55], 3602036899), new m(R[56], 1575990012), new m(R[57], 1125592928), new m(R[58], 2716904306), new m(R[59], 442776044), new m(R[60], 593698344), new m(R[61], 3733110249), new m(R[62], 2999351573), new m(R[63], 3815920427), new m(3391569614, 3928383900), new m(3515267271, 566280711), new m(3940187606, 3454069534), new m(4118630271, 4000239992), new m(116418474, 1914138554), new m(174292421, 2731055270), new m(289380356, 3203993006), new m(460393269, 320620315), new m(685471733, 587496836), new m(852142971, 1086792851), new m(1017036298, 365543100), new m(1126000580, 2618297676), new m(1288033470, 3409855158), new m(1501505948, 4234509866), new m(1607167915, 987167468), new m(1816402316, 1246189591)];

function Mi(e) { return e === "SHA-384" ? [new m(3418070365, We[0]), new m(1654270250, We[1]), new m(2438529370, We[2]), new m(355462360, We[3]), new m(1731405415, We[4]), new m(41048885895, We[5]), new m(3675008525, We[6]), new m(1203062813, We[7])] : [new m(Je[0], 4089235720), new m(Je[1], 2227873595), new m(Je[2], 4271175723), new m(Je[3], 1595750129), new m(Je[4], 2917565137), new m(Je[5], 725511199), new m(Je[6], 4215389547), new m(Je[7], 327033209)] }

function ki(e, t) { let n, s, r, i, o, l, c, a, u, h, f, _; const g = []; for (n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], l = t[5], c = t[6], a = t[7], f = 0; f < 80; f += 1) f < 16 ? (_ = 2 * f, g[f] = new m(e[_], e[_ + 1])) : g[f] = Ah(vh(g[f - 2]), g[f - 7], Ch(g[f - 15]), g[f - 16]), u = xh(a, Th(o), (S = l, P = c, new m((b = o).N & S.N ^ ~b.N & P.N, b.I & S.I ^ ~b.I & P.I)), Ih[f], g[f]), h = Se(Eh(n), yh(n, s, r)), a = c, c = l, l = o, o = Se(i, u), i = r, r = s, s = n, n = Se(u, h); var b, S, P; return t[0] = Se(n, t[0]), t[1] = Se(s, t[1]), t[2] = Se(r, t[2]), t[3] = Se(i, t[3]), t[4] = Se(o, t[4]), t[5] = Se(l, t[5]), t[6] = Se(c, t[6]), t[7] = Se(a, t[7]), t } class Nh extends ss { constructor(t, n, s) { if (t !== "SHA-384" && t !== "SHA-512") throw new Error(hn);
        super(t, n, s); const r = s || {};
        this.F = this.Y, this.M = !0, this.T = -1, this.C = Kt(this.t, this.i, this.T), this.U = ki, this.B = function(i) { return i.slice() }, this.L = Mi, this.g = function(i, o, l, c) { return function(a, u, h, f, _) { let g, b; const S = 31 + (u + 129 >>> 10 << 5),
                    P = u + h; for (; a.length <= S;) a.push(0); for (a[u >>> 5] |= 128 << 24 - u % 32, a[S] = 4294967295 & P, a[S - 1] = P / 4294967296 | 0, g = 0; g < a.length; g += 32) f = ki(a.slice(g, g + 32), f); return b = _ === "SHA-384" ? [f[0].N, f[0].I, f[1].N, f[1].I, f[2].N, f[2].I, f[3].N, f[3].I, f[4].N, f[4].I, f[5].N, f[5].I] : [f[0].N, f[0].I, f[1].N, f[1].I, f[2].N, f[2].I, f[3].N, f[3].I, f[4].N, f[4].I, f[5].N, f[5].I, f[6].N, f[6].I, f[7].N, f[7].I], b }(i, o, l, c, t) }, this.R = Mi(t), this.m = 1024, this.v = t === "SHA-384" ? 384 : 512, this.K = !1, r.hmacKey && this.k(lt("hmacKey", r.hmacKey, this.T)) } }
const Sh = [new m(0, 1), new m(0, 32898), new m(2147483648, 32906), new m(2147483648, 2147516416), new m(0, 32907), new m(0, 2147483649), new m(2147483648, 2147516545), new m(2147483648, 32777), new m(0, 138), new m(0, 136), new m(0, 2147516425), new m(0, 2147483658), new m(0, 2147516555), new m(2147483648, 139), new m(2147483648, 32905), new m(2147483648, 32771), new m(2147483648, 32770), new m(2147483648, 128), new m(0, 32778), new m(2147483648, 2147483658), new m(2147483648, 2147516545), new m(2147483648, 32896), new m(0, 2147483649), new m(2147483648, 2147516424)],
    Rh = [
        [0, 36, 3, 41, 18],
        [1, 44, 10, 45, 2],
        [62, 6, 43, 15, 61],
        [28, 55, 25, 21, 56],
        [27, 20, 39, 8, 14]
    ];

function Us(e) { let t; const n = []; for (t = 0; t < 5; t += 1) n[t] = [new m(0, 0), new m(0, 0), new m(0, 0), new m(0, 0), new m(0, 0)]; return n }

function Oh(e) { let t; const n = []; for (t = 0; t < 5; t += 1) n[t] = e[t].slice(); return n }

function xn(e, t) { let n, s, r, i; const o = [],
        l = []; if (e !== null)
        for (s = 0; s < e.length; s += 2) t[(s >>> 1) % 5][(s >>> 1) / 5 | 0] = Xt(t[(s >>> 1) % 5][(s >>> 1) / 5 | 0], new m(e[s + 1], e[s])); for (n = 0; n < 24; n += 1) { for (i = Us(), s = 0; s < 5; s += 1) o[s] = (c = t[s][0], a = t[s][1], u = t[s][2], h = t[s][3], f = t[s][4], new m(c.N ^ a.N ^ u.N ^ h.N ^ f.N, c.I ^ a.I ^ u.I ^ h.I ^ f.I)); for (s = 0; s < 5; s += 1) l[s] = Xt(o[(s + 4) % 5], Li(o[(s + 1) % 5], 1)); for (s = 0; s < 5; s += 1)
            for (r = 0; r < 5; r += 1) t[s][r] = Xt(t[s][r], l[s]); for (s = 0; s < 5; s += 1)
            for (r = 0; r < 5; r += 1) i[r][(2 * s + 3 * r) % 5] = Li(t[s][r], Rh[s][r]); for (s = 0; s < 5; s += 1)
            for (r = 0; r < 5; r += 1) t[s][r] = Xt(i[s][r], new m(~i[(s + 1) % 5][r].N & i[(s + 2) % 5][r].N, ~i[(s + 1) % 5][r].I & i[(s + 2) % 5][r].I));
        t[0][0] = Xt(t[0][0], Sh[n]) } var c, a, u, h, f; return t }

function pl(e) { let t, n, s = 0; const r = [0, 0],
        i = [4294967295 & e, e / 4294967296 & 2097151]; for (t = 6; t >= 0; t--) n = i[t >> 2] >>> 8 * t & 255, n === 0 && s === 0 || (r[s + 1 >> 2] |= n << 8 * (s + 1), s += 1); return s = s !== 0 ? s : 1, r[0] |= s, { value: s + 1 > 4 ? r : [r[0]], binLen: 8 + 8 * s } }

function ms(e) { return Bn(pl(e.binLen), e) }

function Hi(e, t) { let n, s = pl(t);
    s = Bn(s, e); const r = t >>> 2,
        i = (r - s.value.length % r) % r; for (n = 0; n < i; n++) s.value.push(0); return s.value } class Ph extends ss { constructor(t, n, s) { let r = 6,
            i = 0;
        super(t, n, s); const o = s || {}; if (this.numRounds !== 1) { if (o.kmacKey || o.hmacKey) throw new Error("Cannot set numRounds with MAC"); if (this.o === "CSHAKE128" || this.o === "CSHAKE256") throw new Error("Cannot set numRounds for CSHAKE variants") } switch (this.T = 1, this.C = Kt(this.t, this.i, this.T), this.U = xn, this.B = Oh, this.L = Us, this.R = Us(), this.K = !1, t) {
            case "SHA3-224":
                this.m = i = 1152, this.v = 224, this.M = !0, this.F = this.Y; break;
            case "SHA3-256":
                this.m = i = 1088, this.v = 256, this.M = !0, this.F = this.Y; break;
            case "SHA3-384":
                this.m = i = 832, this.v = 384, this.M = !0, this.F = this.Y; break;
            case "SHA3-512":
                this.m = i = 576, this.v = 512, this.M = !0, this.F = this.Y; break;
            case "SHAKE128":
                r = 31, this.m = i = 1344, this.v = -1, this.K = !0, this.M = !1, this.F = null; break;
            case "SHAKE256":
                r = 31, this.m = i = 1088, this.v = -1, this.K = !0, this.M = !1, this.F = null; break;
            case "KMAC128":
                r = 4, this.m = i = 1344, this.X(s), this.v = -1, this.K = !0, this.M = !1, this.F = this._; break;
            case "KMAC256":
                r = 4, this.m = i = 1088, this.X(s), this.v = -1, this.K = !0, this.M = !1, this.F = this._; break;
            case "CSHAKE128":
                this.m = i = 1344, r = this.O(s), this.v = -1, this.K = !0, this.M = !1, this.F = null; break;
            case "CSHAKE256":
                this.m = i = 1088, r = this.O(s), this.v = -1, this.K = !0, this.M = !1, this.F = null; break;
            default:
                throw new Error(hn) } this.g = function(l, c, a, u, h) { return function(f, _, g, b, S, P, W) { let O, D, K = 0; const ae = [],
                    ie = S >>> 5,
                    k = _ >>> 5; for (O = 0; O < k && _ >= S; O += ie) b = xn(f.slice(O, O + ie), b), _ -= S; for (f = f.slice(O), _ %= S; f.length < ie;) f.push(0); for (O = _ >>> 3, f[O >> 2] ^= P << O % 4 * 8, f[ie - 1] ^= 2147483648, b = xn(f, b); 32 * ae.length < W && (D = b[K % 5][K / 5 | 0], ae.push(D.I), !(32 * ae.length >= W));) ae.push(D.N), K += 1, 64 * K % S == 0 && (xn(null, b), K = 0); return ae }(l, c, 0, u, i, r, h) }, o.hmacKey && this.k(lt("hmacKey", o.hmacKey, this.T)) } O(t, n) { const s = function(i) { const o = i || {}; return { funcName: lt("funcName", o.funcName, 1, { value: [], binLen: 0 }), customization: lt("Customization", o.customization, 1, { value: [], binLen: 0 }) } }(t || {});
        n && (s.funcName = n); const r = Bn(ms(s.funcName), ms(s.customization)); if (s.customization.binLen !== 0 || s.funcName.binLen !== 0) { const i = Hi(r, this.m >>> 3); for (let o = 0; o < i.length; o += this.m >>> 5) this.R = this.U(i.slice(o, o + (this.m >>> 5)), this.R), this.A += this.m; return 4 } return 31 } X(t) { const n = function(r) { const i = r || {}; return { kmacKey: lt("kmacKey", i.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: lt("Customization", i.customization, 1, { value: [], binLen: 0 }) } }(t || {});
        this.O(t, n.funcName); const s = Hi(ms(n.kmacKey), this.m >>> 3); for (let r = 0; r < s.length; r += this.m >>> 5) this.R = this.U(s.slice(r, r + (this.m >>> 5)), this.R), this.A += this.m;
        this.H = !0 } _(t) { const n = Bn({ value: this.h.slice(), binLen: this.u }, function(s) { let r, i, o = 0; const l = [0, 0],
                c = [4294967295 & s, s / 4294967296 & 2097151]; for (r = 6; r >= 0; r--) i = c[r >> 2] >>> 8 * r & 255, i === 0 && o === 0 || (l[o >> 2] |= i << 8 * o, o += 1); return o = o !== 0 ? o : 1, l[o >> 2] |= o << 8 * o, { value: o + 1 > 4 ? l : [l[0]], binLen: 8 + 8 * o } }(t.outputLen)); return this.g(n.value, n.binLen, this.A, this.B(this.R), t.outputLen) } } class Fh { constructor(t, n, s) { if (t == "SHA-1") this.P = new bh(t, n, s);
        else if (t == "SHA-224" || t == "SHA-256") this.P = new wh(t, n, s);
        else if (t == "SHA-384" || t == "SHA-512") this.P = new Nh(t, n, s);
        else { if (t != "SHA3-224" && t != "SHA3-256" && t != "SHA3-384" && t != "SHA3-512" && t != "SHAKE128" && t != "SHAKE256" && t != "CSHAKE128" && t != "CSHAKE256" && t != "KMAC128" && t != "KMAC256") throw new Error(hn);
            this.P = new Ph(t, n, s) } } update(t) { return this.P.update(t), this } getHash(t, n) { return this.P.getHash(t, n) } setHMACKey(t, n, s) { this.P.setHMACKey(t, n, s) } getHMAC(t, n) { return this.P.getHMAC(t, n) } }
const ml = "SHA-512";

function Lh(e, t = ml) { const n = new Fh(t, "TEXT", { encoding: "UTF8" }); return n.update(e), n.getHash("HEX") }

function Bs(e, t, n = ml) { return `${e}/${Lh(t,n)}/` }
const Mh = { components: { TheHeader: jo, CarSelectionPageBody: Gf }, inject: ["showHeader", "localhost", "delay", "textValue"], created() { window.scrollTo({ top: 0 }), this.getCars() }, data() { return { cars: [] } }, computed: {}, methods: { async getCars() { const e = Bs(this.localhost, "cars"),
                t = await Hs(e); let n = JSON.parse(t.data);
            n = n.map(s => new $o(s.name, s.img)), this.cars = n } }, provide() { return { leadMessage: this.textValue("carSelectionPageLeadMessage") } }, mounted() {} };

function kh(e, t, n, s, r, i) { const o = Ee("the-header"),
        l = Ee("car-selection-page-body"); return U(), z(te, null, [i.showHeader ? (U(), $e(o, { key: 0 })) : $t("", !0), ee(l, { cars: r.cars }, null, 8, ["cars"])], 64) }
const Hh = _e(Mh, [
        ["render", kh]
    ]),
    Uh = { components: { TheHeader: jo }, inject: ["showHeader", "textValue"], created() { window.scrollTo({ top: 0 }) }, data() { return { thanksMessages: [this.textValue("feedbackPageThankMessage1"), this.textValue("feedbackPageThankMessage2"), this.textValue("feedbackPageThankMessage3")], failureMessages: [this.textValue("feedbackPageFailureMessage1"), this.textValue("feedbackPageFailureMessage2"), this.textValue("feedbackPageFailureMessage3")] } }, computed: { messages() { switch (this.fulfillment) {
                    case "SUCCESS":
                        return this.thanksMessages;
                    case "FAILURE":
                        return this.failureMessages } throw Error(`Invalid fullfilment: ${this.fulfillment}`) } }, props: { fulfillment: { ...Qe, validator(e) { return ["SUCCESS", "FAILURE"].includes(e) } } } };

function Bh(e, t, n, s, r, i) { const o = Ee("the-header"); return U(), z(te, null, [i.showHeader ? (U(), $e(o, { key: 0 })) : $t("", !0), (U(!0), z(te, null, Mt(i.messages, l => (U(), z("p", { class: "lead text-center display-6 pt-5 mt-5", key: l }, se(l), 1))), 128))], 64) }
const Dh = _e(Uh, [
    ["render", Bh]
]);
const $h = { inject: ["env"], props: { number: Qa }, data() { return { logo: this.defaultLogo() } }, computed: { address() { return "https://api.whatsapp.com/send?phone=" + this.number } }, methods: { defaultLogo(e = !1) { const t = e ? "-hover" : ""; return this.env() === "DEVELOPMENT" ? `src/assets/images/whatsapp-logo${t}.png` : `static/images/whatsapp-logo${t}.png` } }, mounted() { const e = this.$refs.link;
            e.addEventListener("mouseover", t => { t.target.src = this.defaultLogo(!0) }), e.addEventListener("mouseout", t => { t.target.src = this.defaultLogo() }) } },
    jh = ["href"],
    Kh = ["src"];

function qh(e, t, n, s, r, i) { return U(), z("a", { href: i.address, id: "whatsapp", ref: "link", target: "_blank" }, [I("img", { src: r.logo, alt: "Whatsapp" }, null, 8, Kh)], 8, jh) }
const Vh = _e($h, [
        ["render", qh],
        ["__scopeId", "data-v-ca8d5b34"]
    ]),
    zh = { components: { HomePage: Yu, CarSelectionPage: Hh, FeedbackPage: Dh, TheWhatsappButton: Vh }, created() { this.getTextLayout() }, data() { return { currentPage: "HomePage", componentProps: null, textLayout: null } }, computed: { phoneNumber() { return this.textLayout.whatsappPhoneNumber.value } }, methods: { togglePage(e) { return () => { this.componentProps = null, this.currentPage = e } }, toggleFeedbackPage(e) { this.componentProps = { fulfillment: e }, this.currentPage = "FeedbackPage" }, postRequest(e) { const t = Bs(this.localhost(), "form"); return new Promise((n, s) => { Hs.post(t, e).then(i => n(i)).catch(i => s(i)) }) }, env() { return /5173/.test(window.location.href) ? "DEVELOPMENT" : "PRODUCTION" }, localhost() { return this.env() === "DEVELOPMENT" ? "http://localhost:9000" : "http://15.188.51.48/" }, async getTextLayout() { const e = await Hs(Bs(this.localhost(), "text_layout"));
                this.textLayout = JSON.parse(e.data) } }, provide() { return { toggleHomePage: this.togglePage("HomePage"), toggleCarSelectionPage: this.togglePage("CarSelectionPage"), toggleFeedbackPage: this.toggleFeedbackPage, postRequest: this.postRequest, env: this.env, localhost: this.localhost(), showHeader: !0, delay: e => new Promise(t => setTimeout(t, e)), textValue: e => this.textLayout[e].value, text: e => this.textLayout[e] } }, mounted() {} },
    Wh = { key: 0 };

function Jh(e, t, n, s, r, i) { const o = Ee("the-whatsapp-button"); return r.textLayout ? (U(), z("div", Wh, [(U(), $e(jc(r.currentPage), it(Xe(r.componentProps)), null, 16)), ee(o, { number: i.phoneNumber }, null, 8, ["number"])])) : $t("", !0) }
const Yh = _e(zh, [
    ["render", Jh]
]);
const Xh = Ja(Yh);
Xh.mount("#app");
