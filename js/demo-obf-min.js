(function() {
        function s(a) { console.log(a) }

        function ra(a, b) { var c = function() {};
            c.prototype = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.prototype.super = b; "OWN_PROPS" in b && (a.OWN_PROPS = b.OWN_PROPS.slice()) }

        function ha(a) {
            a = a.replace(/ /g, "");
            if (-1 != a.indexOf("#")) { var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a); return b ? { r: parseInt(b[1], 16), g: parseInt(b[2], 16), b: parseInt(b[3], 16), a: 1 } : null }
            b = a.toLowerCase();
            if (-1 != b.indexOf("rgb(") || -1 != b.indexOf("rgba(")) return b = b.substring(b.indexOf("(") +
                1, b.indexOf(")")).split(","), { r: Number(b[0]), g: Number(b[1]), b: Number(b[2]), a: 3 < b.length ? Number(b[3]) : 1 };
            if ("undefined" != typeof Fa[b]) return a = Fa[b], a.a = 1, a;
            b = F.PIXEL;
            b.save();
            b.fillStyle = a;
            b.fillRect(0, 0, 1, 1);
            a = b.getImageData(0, 0, 1, 1).data;
            a = { r: a[0], g: a[1], b: a[2], a: a[3] / 255 };
            b.restore();
            b.clearRect(0, 0, 2, 2);
            return a
        }

        function y(a, b) { return isNaN(a) || 0 > a ? b : a }

        function I(a, b, c, d) { return isNaN(a) ? d : a < b ? b : a > c ? c : a }

        function Ga() {
            var a = new this.constructor,
                b = this.constructor.OWN_PROPS;
            for (i = b.length; i--;) a[b[i]] =
                this[b[i]];
            return a
        }

        function na() { var a = Ga.call(this);
            a.listeners = {}; for (var b in this.listeners) a.listeners[b] = this.listeners[b].slice();
            (b = oa.of(this)) && b.addTo(a); return a }

        function wa() {
            var a, b = [],
                c = [];
            this.get = function(d) { for (a = b.length; a--;)
                    if (b[a] === d) return c[a] };
            this.set = function(d, e) { for (a = b.length; a--;) { k = b[a]; if (k === d) { c[a] = e; return }
                    this.useGC && this.gcCondition(k, c[a]) && (b.splice(a, 1), c.splice(a, 1), this.useGCEvents && this.dispatchEvent("removedByGC", { key: k, value: c[a] })) }
                b.push(d);
                c.push(e) };
            this.has = function(c) { for (a = b.length; a--;)
                    if (b[a] === c) return !0;
                return !1 };
            this.delete = function(d) { for (a = b.length; a--;)
                    if (b[a] === d) { b.splice(a, 1);
                        c.splice(a, 1); break } };
            Object.defineProperty(this, "size", { get: function() { return b.length }, enumerable: !0, configurable: !1 });
            this.log = function() { s("");
                s('Hash-table "' + this.name + '" log:');
                s("");
                a = 0; for (n = b.length; a < n; a++) s(a + ". key = " + b[a] + ", value = " + c[a]) };
            this.name = "untitled";
            this.gcCondition = wa.EMPTY_GC_CONDITION;
            this.useGCEvents = this.useGC = !1;
            N.init(this)
        }

        function V() {
            if (arguments.length && arguments[0] === P) { var a = arguments[1],
                    b = a.errorType; if (a.hostClass) var c = a.hostClass.getID(),
                    d = a.hostClass.prototype.className;
                else c = V.getID(), d = "SoftMap" } else b = 'SoftMap "set"', c = V.getID(), d = "SoftMap";
            var e = 0,
                f = G.createHiddenZone,
                g = G.keyIsObject,
                h = G.keyIsFixed,
                t = G.hiddenZoneOf,
                l = G.keyHasHiddenZone,
                r = G.keyKnowsID;
            this.set = function(a, d) {
                if (!g(a)) return s(b + " ERROR: " + a + " is not an Object"), !1;
                if (l(a)) r(a, c) || (e++, t(a).propsTotal++);
                else {
                    if (h(a)) return s(b + " ERROR: " +
                        a + ' is frozen or its "valueOf" is not configurable'), !1;
                    f(a);
                    e++;
                    t(a).propsTotal++
                }
                t(a)[c] = d;
                return !0
            };
            this.get = function(a) { if (g(a) && l(a)) return t(a)[c] };
            this.has = function(a) { return g(a) && l(a) && r(a, c) };
            this.hasPair = function(a, b) { return this.has(a) && t(a)[c] === b };
            this.delete = function(a) { return this.has(a) ? (delete t(a)[c], t(a).propsTotal--, e--, !0) : !1 };
            Object.defineProperty(this, "size", { get: function() { return e } });
            this.traceID = function() { s(d + " instance id == " + c) };
            this.traceCollectionsOf = G.traceCollectionsOf
        }

        function ia() { var a = new V(P, { hostClass: ia, errorType: 'SoftSet "add"' });
            this.add = function(b) { return a.set(b, !0) };
            this.has = function(b) { return a.has(b) };
            this.delete = function(b) { return a.delete(b) };
            Object.defineProperty(this, "size", { get: function() { return a.size } });
            this.traceID = function() { a.traceID() };
            this.traceCollectionsOf = G.traceCollectionsOf }

        function ja() {
            if (arguments.length && arguments[0] === P) var a = arguments[1],
                b = a.errorType,
                c = a.hostClass;
            var d = a ? new V(P, { hostClass: c || ja, errorType: b || 'HardMap "set"' }) :
                new V(P, { hostClass: ja, errorType: 'HardMap "set"' }),
                e = {},
                f = {},
                g = {},
                h = 0;
            this.set = function(a, b) { var c = !G.keyIsObject(a); if (c) { var x = a;
                    g.hasOwnProperty(a) && (a = g[a]) } if (d.has(a)) return c = d.get(a), f[c] = b, !0;
                c && (g[x] = a = { $: a }); if (d.set(a, ++h)) return e[h] = c ? x : a, f[h] = b, !0;
                h--; return !1 };
            this.get = function(a) { return G.keyIsObject(a) ? f[d.get(a)] : g.hasOwnProperty(a) ? f[d.get(g[a])] : void 0 };
            this.has = function(a) { return G.keyIsObject(a) ? d.has(a) : g.hasOwnProperty(a) };
            this.hasPair = function(a, b) {
                return this.has(a) && this.get(a) ===
                    b
            };
            this.delete = function(a) { if (!G.keyIsObject(a) && g.hasOwnProperty(a)) { var b = g[a];
                    delete g[a];
                    a = b }
                b = d.get(a); return void 0 !== b ? (delete e[b], delete f[b], d.delete(a), !0) : !1 };
            this.forEach = function(a) { for (id in e) a(f[id], e[id], this) };
            this.forEachKey = function(a, b) { for (id in e) a(e[id], b) };
            this.randomKey = function() { var a = Math.ceil(this.size * Math.random()) || 1,
                    b = 0; for (id in e)
                    if (++b == a) return e[id] };
            this.clear = function() { for (id in e) { var a = e[id];
                    d.delete(G.keyIsObject(a) ? a : g[a]) }
                e = {};
                f = {};
                g = {};
                h = 0 };
            Object.defineProperty(this,
                "size", { get: function() { return d.size } });
            this.traceID = function() { d.traceID() };
            this.traceCollectionsOf = G.traceCollectionsOf
        }

        function sa() {
            var a = new ja(P, { hostClass: sa, errorType: 'HardSet "add"' });
            this.add = function(b) { return a.set(b, !0) };
            this.has = function(b) { return a.has(b) };
            this.delete = function(b) { return a.delete(b) };
            this.forEach = function(b) { a.forEachKey(b, this) };
            this.clear = function() { a.clear() };
            this.random = function() { return a.randomKey() };
            Object.defineProperty(this, "size", { get: function() { return a.size } });
            this.traceID = function() { a.traceID() };
            this.traceCollectionsOf = G.traceCollectionsOf
        }

        function Ca(a) {
            if (a && a instanceof Object) { var b = new Ca,
                    c; for (c in a) b.add(c); return b }
            var d = {},
                e, f, g, h = 0;
            this.add = function(a) { a = String(a); return this.has(a) || "" === a ? !1 : (h ? (g[2] = a, g = d[a] = [g[1], a, 0]) : d[a] = f = g = [0, a, 0], h++, !0) };
            this.addBefore = function(a, b) {
                if (this.has(a) && b != a && "" !== b) {
                    b = String(b);
                    if (this.has(b))
                        if (d[a][0] != b) d[a][0] ? (d[b][2] ? (e = d[b], d[e[0]][2] = e[2], d[e[2]][0] = e[0]) : (e = g, g = d[e[0]], g[2] = 0), e[2] = a, e[0] = d[a][0],
                            d[e[0]][2] = d[a][0] = b) : (d[b][2] ? (f = d[b], d[f[0]][2] = f[2], d[f[2]][0] = f[0]) : (f = g, g = d[f[0]], g[2] = 0), f[2] = a, f[0] = 0, d[a][0] = b);
                        else return !1;
                    else { if (d[a][0]) { var c = d[a][0];
                            d[c][2] = b;
                            d[a][0] = b;
                            d[b] = [c, b, a] } else f[0] = b, f = d[b] = [0, b, a];
                        h++ }
                    return !0
                }
                return !1
            };
            this.addAfter = function(a, b) { if (this.has(a) && b != a && d[a][2] != b && "" !== b) { if (d[a][2]) return this.addBefore(d[a][2], b);
                    g[2] = "";
                    g = d[""] = [a, "", 0]; var c = this.addBefore("", b);
                    g = d[g[0]];
                    g[2] = 0;
                    delete d[""]; return c } return !1 };
            this.has = function(a) { return d.hasOwnProperty(a) };
            this.nextTo = function(a) { return this.has(a) ? d[a][2] : void 0 };
            this.prevTo = function(a) { return this.has(a) ? d[a][0] : void 0 };
            this.delete = function(a) { return this.has(a) ? (d[a][0] ? d[a][2] ? (e = d[a], d[e[0]][2] = e[2], d[e[2]][0] = e[0]) : (g = d[d[a][0]], g[2] = 0) : (f = d[d[a][2]], f[0] = 0), delete d[a], h--, !0) : !1 };
            this.isFirst = function(a) { return this.has(a) && !d[a][0] };
            this.isLast = function(a) { return this.has(a) && !d[a][2] };
            Object.defineProperty(this, "size", { get: function() { return h } });
            Object.defineProperty(this, "first", {
                get: function() {
                    return h ?
                        f[1] : void 0
                }
            });
            Object.defineProperty(this, "last", { get: function() { return h ? g[1] : void 0 } });
            this.traceLinks = function() { s("");
                s("----- IdChain links: -----"); for (var a = f[1]; a;) s(a + ": [" + d[a] + "]"), a = d[a][2] }
        }

        function W() { Object.defineProperty(this, "propsTotal", { value: 0, configurable: !1, wrirable: !0, enumerable: !1 }) }

        function A(a, b, c) {
            if (c || 3 > arguments.length) A.__defaultInstance = this;
            a = isNaN(a) || 0 >= a ? 60 : a;
            var d = 60 == a;
            this.frameDuration = 1E3 / a;
            b = 2 > arguments.length ? !0 : b;
            var e = null,
                f = [],
                g = [],
                h = 0,
                t = !1,
                l = !1,
                r, x =
                0,
                H = 0,
                m = this,
                p = { object: { func: function() { m.removeListener(p.object, "func") } }, methodName: "func" },
                B = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(a) { return setTimeout(a, m.frameDuration) },
                v = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame ||
                window.webkitCancelRequestAnimationFrame || clearTimeout,
                u = b ? function() { r = (new Date).getTime();
                    l = !0; for (x = f.length; x--;)
                        if (f[x]) f[x].object[f[x].methodName](r, r);
                    l = !1; if (h)
                        for (H = g.length; H--;)
                            if (g[H]) g[H].object[g[H].methodName]();
                    t && s() } : function() { l = !0; for (x = f.length; x--;)
                        if (f[x]) f[x].object[f[x].methodName]();
                    l = !1; if (h)
                        for (H = g.length; H--;)
                            if (g[H]) g[H].object[g[H].methodName]();
                    t && s() },
                s = d ? function() { e = B(u) } : function() { e = setTimeout(u, m.frameDuration) };
            this.addListener = function(a, b, c) {
                2 > arguments.length ?
                    b = "call" : "boolean" == typeof arguments[1] && (c = b, b = "call");
                for (var d = f.length; d--;)
                    if (f[d].object === a && f[d].methodName === b) return;
                d = { object: a, methodName: b, debugStr: "debugStr" };
                c ? d.isHidden = c : h++;
                f.push(d);
                t || (t = !0, l || s())
            };
            this.removeListener = function(a, b) {
                2 > arguments.length && (b = "call");
                for (var c = f.length; c--;)
                    if (f[c].object === a && f[c].methodName === b) {
                        var l = !f[c].isHidden;
                        l && h--;
                        f.splice(c, 1);
                        c < x && x--;
                        if (!f.length) { if (t = !1, d ? v(e) : clearTimeout(e), l)
                                for (c = g.length; c--;) g[c].object[g[c].methodName]() } else if (!h &&
                            l)
                            for (c = g.length; c--;) g[c].object[g[c].methodName]();
                        break
                    }
            };
            this.removeAllListeners = function() { d ? v(e) : clearTimeout(e);
                t = !1;
                f.length = h = x = 0; for (var a = g.length; a--;) g[a].object[g[a].methodName]() };
            this.addUpdateListener = function(a, b) { for (var c = g.length; c--;)
                    if (g[c].object === a && g[c].methodName === b) return;
                g.push({ object: a, methodName: b }) };
            this.removeUpdateListener = function(a, b) { for (var c = g.length; c--;)
                    if (g[c].object === a && g[c].methodName === b) { g.splice(c, 1);
                        c < H && H--; break } };
            this.doNextTick = function(a, b) {
                function c() {
                    d.removeListener(c);
                    a()
                }
                var d = this;
                b ? this.addListener(c, b) : this.addListener(c)
            };
            this.doLater = function(a, b, c) {
                function d() {
                    (new Date).getTime() - f > b && (e.removeListener(d), a()) } var e = this,
                    f = (new Date).getTime();
                c ? this.addListener(d, c) : this.addListener(d) };
            this.addTimerListener = function(a, b, c, d) {
                if (1 < arguments.length && isNaN(arguments[1])) { var e = a,
                        f = b;
                    a = function() { e[f]() };
                    b = c;
                    c = d;
                    d = arguments[4] }
                b = b || 1E3;
                var g = this,
                    h = (new Date).getTime(),
                    l, x = 0;
                if (d) {
                    var r = 1,
                        t = d.repeats || 0,
                        H = d.precision || 1,
                        m = d.randomization || 0,
                        w = b * (1 + m * (2 *
                            Math.random() - 1)),
                        p = H * w,
                        B = function() { l = (new Date).getTime();
                            x += l - h; if (x > p) { for (; x > p;) a(), x -= w;++r > t && t ? g.removeListener(B) : (w = b * (1 + m * (2 * Math.random() - 1)), p = H * w) }
                            h = l };
                    Object.defineProperty(B, "delay", { get: function() { return b }, set: function(a) { b = a;
                            w = b * (1 + m * (2 * Math.random() - 1));
                            p = H * w } })
                } else B = function() { l = (new Date).getTime(); for (x += l - h; x > b;) a(), x -= b;
                    h = l }, Object.defineProperty(B, "delay", { get: function() { return b }, set: function(a) { b = a } });
                c ? this.addListener(B, c) : this.addListener(B);
                return B
            };
            this.ensureNextTickUpdate =
                function() { h || (h++, f.push(p), t || (t = !0, s())) };
            this.listenersTotal = function() { return f.length };
            this.getListeners = function() { return f }
        }

        function pa(a, b) { var c = a[b];
            Object.defineProperty(this, "value", { get: function() { return c }, set: function(d) { c = a[b] = d } }) }

        function u(a, b, c, d) {
            this.__object = a;
            this.__delta = b || {};
            this.__deltaInit = {};
            for (var e in this.__delta) this.__deltaInit[e] = this.__delta[e];
            this.__ratio = c || {};
            this.__ratioInit = {};
            for (e in this.__ratio) this.__ratioInit[e] = this.__ratio[e];
            this.__efs;
            this.__isPlayed = !1;
            this.__efs = d ? d : a.__stage && a.__stage.metronome ? a.__stage.metronome : A.getInstance()
        }

        function Ra(a, b, c) { this.__object = a;
            this.__delta = b || {};
            this.__deltaInit = {}; for (var d in b) this.__deltaInit[d] = b[d];
            this.__efs = c ? c : a.__stage && a.__stage.metronome ? a.__stage.metronome : A.getInstance();
            this.__frameDuration = this.__efs.frameDuration;
            this.__isPlayed = !1 }

        function ta(a, b, c) {
            this.__object = a;
            this.__speed = b || {};
            this.__speedInit = {};
            for (var d in b) this.__speedInit[d] = b[d];
            this.__efs = c ? c : a.__stage && a.__stage.metronome ?
                a.__stage.metronome : A.getInstance();
            this.__isPlayed = !1
        }

        function S(a, b, c, d) { this.__speed = isNaN(b) ? 0 : b;
            this.__angle = isNaN(c) ? 0 : c * Math.PI / 180;
            this.__motion = new ta(a, { x: this.__speed * Math.cos(this.__angle), y: this.__speed * Math.sin(this.__angle) }, d) }

        function z(a, b, c, d) {
            this.__object = a;
            this.__propName = b;
            this.__propValue = a[b];
            c ? (this.wave = "wave" in c ? c.wave : E.sin, this.amplitude = "amplitude" in c ? c.amplitude : 10, this.frequency = "frequency" in c ? c.frequency : 1, this.phase = "phase" in c ? c.phase : 0) : (this.wave = E.sin, this.amplitude =
                10, this.frequency = 1, this.phase = 0);
            this.__efs = d ? d : a.__stage && a.__stage.metronome ? a.__stage.metronome : A.getInstance();
            this.__isPlayed = !1;
            this.__startTime = void 0;
            this.__stopTime
        }

        function C() { this.__stage = this.__context = null;
            this.__children = [];
            this.parent = null;
            this.rotation = this.x = this.y = 0;
            this.scaleX = this.scaleY = 1;
            this.originX = this.originY = 0;
            this.alpha = 1;
            this.matrixLocal = void 0;
            this.matrixGlobal = m.ZERO;
            N.init(this);
            this.masks = [];
            this.holes = [];
            this.draw = this.drawNormal;
            this.getHitAsset = this.getHitAssetNormal }

        function F(a) {
            function b(a) { l.__gestureOccured = !0;
                l.gesturePoint = l.getMousePoint(a);
                l.gestures.group1.mouseDown = !0;
                delete l.gestures.group1.mouseUp;
                l.isDown = !0 }

            function c(a) { l.__gestureOccured = !0;
                l.gesturePoint = l.getMousePoint(a);
                l.gestures.group1.mouseUp = !0;
                delete l.gestures.group1.mouseDown;
                l.isDown = !1 }

            function d(a) {
                l.__gestureOccured = !0;
                a = l.getMousePoint(a);
                if (a.x != l.gesturePoint.x || a.y != l.gesturePoint.y) l.gesturePoint = a, l.gestures.group1.mouseMove = !0, l.gestures.group2.mouseOver = !0, l.gestures.group2.mouseOut = !0
            }

            function e(a) { l.__gestureOccured = !0;
                l.gesturePoint = l.getMousePoint(a);
                l.gestures.group1.mouseMove = !0;
                l.gestures.group2.mouseOver = !0 }

            function f(a) { l.__gestureOccured = !0;
                l.gesturePoint = { x: void 0, y: void 0 };
                l.gestures.group2.mouseOut = !0;
                l.gestures.group1.mouseUp = !0;
                delete l.gestures.group1.mouseDown }

            function g(a) { l.__gestureOccured = !0;
                l.gestures.group1.mouseDown = !0;
                delete l.gestures.group1.mouseUp;
                l.isDown = !0;
                l.gesturePoint = l.getTouchPoint(a) }

            function h(a) {
                l.__gestureOccured = !0;
                l.__touchEndOccured = !0;
                l.gestures.group1.mouseUp = !0;
                delete l.gestures.group1.mouseDown;
                l.isDown = !1;
                l.gesturePoint = l.getTouchPoint(a)
            }

            function t(a) { l.__gestureOccured = !0;
                l.gesturePoint = l.getTouchPoint(a);
                l.gestures.group1.mouseMove = !0;
                l.gestures.group2.mouseOver = !0;
                l.gestures.group2.mouseOut = !0 }
            this.__container = this.__height = this.__width = this.__context = this.__canvas = this.__canvasID = null;
            this.__cornerRadius = 0;
            this.__cornerTL;
            this.__cornerTR;
            this.__cornerBL;
            this.__cornerBR;
            this.draw = this.drawNormal;
            this.metronome = new A(a, !0, !1);
            this.clearBeforeDraw = !0;
            this.listenPassiveGestures = this.__listenGestures = !1;
            this.gesturePoint = { x: void 0, y: void 0 };
            this.isDown = !1;
            this.hitAsset = void 0;
            this.hitContainers = [];
            this.downAsset = void 0;
            this.downContainers = [];
            this.outContainers = [];
            this.__downTimeForDbClick = this.__downTime = 0;
            this.__clickWithoutMouseMotion = !1;
            this.__dbClickCandidates = [];
            this.__minDbClickDownTime = 0;
            this.dbClickTime = this.fastClickTime = 200;
            this.pixelRatio = 1;
            this.__touchEndOccured = this.__gestureOccured = !1;
            this.gestures = {
                group1: {},
                group2: {},
                group3: {}
            };
            var l = this;
            this.addDomGestureListeners = function() { var a = this.__canvas;
                a.addEventListener("mousedown", b);
                a.addEventListener("mouseup", c);
                a.addEventListener("mousemove", d);
                a.addEventListener("mouseenter", e);
                a.addEventListener("mouseleave", f);
                a.addEventListener("touchstart", g);
                a.addEventListener("touchend", h);
                a.addEventListener("touchmove", t);
                a.addEventListener("touchcancel", h) };
            this.removeDomGestureListeners = function() {
                var a = this.__canvas;
                a.removeEventListener("mousedown", b);
                a.removeEventListener("mouseup",
                    c);
                a.removeEventListener("mousemove", d);
                a.removeEventListener("mouseenter", e);
                a.removeEventListener("mouseleave", f);
                a.removeEventListener("touchstart", g);
                a.removeEventListener("touchend", h);
                a.removeEventListener("touchmove", t);
                a.removeEventListener("touchcancel", h)
            }
        }

        function Ia(a) {
            var b = 1,
                c = document.createElement("canvas");
            L.set(c, { position: "relative", width: "100%", height: "100%", top: 0, left: 0, margin: 0 });
            c.width = b * a.clientWidth;
            c.height = b * a.clientHeight;
            a.appendChild(c);
            this.__stage = void 0;
            Object.defineProperties(this, { canvas: { get: function() { return c } }, webElement: { get: function() { return a } }, pixelRatio: { get: function() { return b }, set: function(a) { b = a;
                        this.__stage && (this.__stage.pixelRatio = a, this.resize()) } } });
            window.addEventListener("resize", function(a) { this.__stage && this.resize() })
        }

        function Da(a, b, c, d, e) {
            this.parent = this.__stage = this.__context = null;
            this.rotation = this.x = this.y = 0;
            this.scaleX = this.scaleY = 1;
            this.originX = this.originY = 0;
            this.image = null;
            this.alpha = 1;
            this.draw = this.drawNothing;
            this.height = this.width = 0;
            this.sx =
                b;
            this.sy = c;
            this.sw = d;
            this.sh = e;
            this.matrixLocal = void 0;
            this.matrixGlobal = m.ZERO;
            a && (this.src = a);
            this.isLoading = this.useDeepHitTest = !1;
            N.init(this)
        }

        function fa() { this.data = null; var a = this;
            this.load = function(b) { var c = v.ref,
                    d = new XMLHttpRequest;
                d.open("GET", b, !0);
                d.onreadystatechange = function() { if (4 === d.readyState && (200 === d.status || 0 == d.status)) { a.data = d.responseText; if (a.hasOwnProperty("onComplete")) a.onComplete();
                        c.end() } };
                d.send(null) } }

        function D(a) {
            this.frames = [];
            this.data = null;
            var b = this,
                c, d = function(a,
                    d, g, h) { a = String(a); for (d -= a.length; d--;) a = "0" + a;
                    c = g + a + h;
                    b.frames.push(c) };
            this.load = function(a) { var c = v.ref,
                    d = new fa;
                d.onComplete = function() { var a = b.data = this.data;
                    b.parse(a); if (b.hasOwnProperty("onLoad")) b.onLoad();
                    c.end() };
                d.load(a) };
            this.parse = function(e) {
                e = e.trim().split(" ").join("").split(",");
                for (var f = e.length, g, h, t, l, r, x = 0; x < f; x++)
                    if (g = e[x], l = g.length, h = g.indexOf("*"), h + 1)
                        if (t = g.lastIndexOf("*") - h + 1, r = g.substr(0, h), g = g.substring(h + t, l), l = g.lastIndexOf("["), h = g.lastIndexOf("]"), l + 1 && 1 == g.length -
                            h)
                            if (h = g.substring(l + 1, h), g = g.substr(0, l), l = h.split("-"), 1 < l.length)
                                if (h = l[0], l = l[1], h < l)
                                    for (; h <= l; h++) d(h, t, r, g);
                                else
                                    for (; h >= l; h--) d(h, t, r, g);
                else d(h, t, r, g);
                else { if (a)
                        for (h = 0, l = !0; l;) { l = h++;
                            l = String(l); for (var H = t - l.length; H--;) l = "0" + l;
                            l = r + l + g; if (H = a.frames.hasOwnProperty(l)) b.frames.push(l), c = l;
                            l = H } } else if (0 == g.indexOf("[") && g.indexOf("]") == l - 1) { if (t = g.substr(1, l - 2), !isNaN(t) && c)
                        for (; t--;) r = c, b.frames.push(r), c = r } else if (0 == g.indexOf("<") && g.indexOf(">") == l - 1) {
                    if (t = g.substr(1, l - 2), !isNaN(t))
                        for (; t--;) b.frames.length++,
                            c = void 0
                } else t = g, b.frames.push(t), c = t
            }
        }

        function Aa(a, b) { this.parent = this.__stage = this.__context = null;
            this.rotation = this.x = this.y = 0;
            this.scaleX = this.scaleY = 1;
            this.originX = this.originY = 0;
            this.alpha = 1;
            this.draw = this.drawImage;
            this.matrixLocal = void 0;
            this.matrixGlobal = m.ZERO;
            this.__imageName = this.__atlasData = null;
            a && (this.atlasData = a);
            b && (this.imageName = b);
            this.useDeepHitTest = !1;
            N.init(this) }

        function ua(a, b) {
            this.parent = this.__stage = this.__context = null;
            this.rotation = this.x = this.y = 0;
            this.scaleX = this.scaleY =
                1;
            this.originX = this.originY = 0;
            this.alpha = 1;
            this.__atlasData = a;
            this.__totalFrames = (this.__atlasFilmData = b) && b.frames ? b.frames.length : void 0;
            this.__destinationFrameIndex = this.__startIndex = this.__changeIndexMethodName = void 0;
            this.__removeInTheEnd = !1;
            this.__stretchRatio = this.__repeatsNumber = 1;
            this.frameIndex = this.frameTrimLeft = this.frameTrimTop = this.frameHeight = this.frameWidth = this.__stretchCount = 0;
            this.__wasPlayingBeforeRemoving = this.isPlayed = !1;
            this.loseQueue();
            this.matrixLocal = void 0;
            this.matrixGlobal =
                m.ZERO;
            this.draw = this.drawFrame;
            this.useDeepHitTest = !1;
            this.__fps = 0;
            this.__fpsTimer = void 0;
            N.init(this)
        }

        function Y(a) { this.props = {}; if (a)
                for (var b in a) this.props[b] = a[b] }

        function aa() {
            this.parent = this.__stage = this.__context = null;
            this.rotation = this.x = this.y = 0;
            this.scaleX = this.scaleY = 1;
            this.originX = this.originY = 0;
            this.alpha = 1;
            this.__text = "";
            this.__style = Y.getDefaultTextStyle();
            this.__boldItalic = (this.__style.props.bold ? "bold " : "") + (this.__style.props.italic ? "italic " : "");
            this.color = this.__style.props.color;
            this.strokeColor = this.__style.props.strokeColor;
            this.shadowColor = this.__style.props.shadowColor;
            this.draw = this.drawNormal;
            this.__alignOffsetX = this.__height = this.__width = 0;
            this.matrixLocal = void 0;
            this.matrixGlobal = m.ZERO;
            this.strokeOverFill = !0;
            this.useDeepHitTest = !1;
            this.lines = [];
            this.__lineSpacing = 30;
            this.__textWidth = void 0;
            this.__multiline = !1;
            this.fill = this.fillLine;
            this.stroke = this.strokeLine;
            this.measureWidth = this.measureLineWidth;
            this.measureHeight = this.measureLineHeight;
            this.calculateText = ba;
            N.init(this)
        }

        function U(a, b, c) { var d = U.parseCSSValue(a.style[b] || ("opacity" == b ? "1" : "0"));
            this.__element = a;
            this.__prop = b;
            this.__suffix = c ? c : d.suffix;
            this.__value = d.value }

        function v(a) {
            function b() { r ? r = !1 : c.nextTask() }
            var c = this,
                d = "parallel" == a ? "parallel" : "sequence",
                e = [],
                f = [],
                g, h, t;
            this.onComplete = function() {};
            this.onStart = function() {};
            var l, r = !1;
            this.delay = 0;
            this.getIndex = function() { return g };
            this.getTaskDataList = function() { return f };
            this.nextTask = function() {
                if (g + 1 < e.length) e[++g]();
                else h || (r = !1, this.onComplete(),
                    t.end())
            };
            this.cancelScheduledTask = function() { r = !0 };
            this.end = function() { "sequence" == d ? setTimeout(b, 1E3 * this.delay) : (g++, g >= e.length && !h && (r = !1, this.onComplete(), t.end())) };
            this.onStartBranch = function() { h++; "sequence" == d && c.nextTask() };
            this.endBranch = function() { h--;
                g + 1 >= e.length && !h && (r = !1, this.onComplete(), t.end()) };
            this.run = function(a) {
                t = v.ref;
                e.length || this.addCall(function() {});
                l = a;
                this.onStart();
                g = h = 0;
                if ("sequence" == d) e[0]();
                else if (this.delay) {
                    if (e[0](), 1 < e.length) {
                        var b = 1;
                        a = function() {
                            var a =
                                arguments.callee;
                            clearInterval(a._delayInterval);
                            b < a.tasks.length && (a.tasks[b++](), a._delayInterval = setInterval(a, 1E3 * c.delay))
                        };
                        a.tasks = e;
                        a._delayInterval = setInterval(a, 1E3 * this.delay)
                    }
                } else
                    for (b = 0; b < e.length; b++) e[b]()
            };
            this.clear = function() { e.length = f.length = 0;
                r = !1 };
            this.getArgs = function() { return l };
            this.clone = function() { for (var a = new v, b = e.length, c = 0; c < b; c++) a.addTaskData(f[c]); return a };
            this.addTask = function() {
                f.push(arguments);
                var a;
                a = [];
                for (var b = 1; b < arguments.length; b++) a[b - 1] = arguments[b];
                arguments[0] instanceof Function ? a = v.createTask2(this, arguments[0], a) : (a.shift(), a = v.createTask3(this, arguments[0], arguments[1], a));
                e.push(a);
                return a._result
            };
            this.addBranchTask = function() { f.push(arguments); var a;
                a = []; for (var b = 1; b < arguments.length; b++) a[b - 1] = arguments[b];
                arguments[0] instanceof Function ? a = v.createTask2(this, arguments[0], a, !0) : (a.shift(), a = v.createTask3(this, arguments[0], arguments[1], a, !0));
                e.push(a); return a._result };
            this.addTaskData = function(a) {
                f.push(a);
                var b = a.concat();
                b.shift();
                a[0] instanceof Function ? a = v.createTask2(this, a[0], b) : (b.shift(), a = v.createTask3(this, a[0], a[1], b));
                e.push(a)
            };
            this.addQueue = function(a, b) { return this.addTask(a, "run", b) };
            this.addBranchQueue = function(a, b) { return this.addBranchTask(a, "run", b) };
            this.addQueueClone = function(a, b) { return this.addQueue(a.clone(), b) };
            this.attachQueue = function(a, b) { return this.addCall(a, "run", b) };
            this.embedQueue = function(a) { a = a.getTaskDataList(); for (var b = a.length, c = 0; c < b; c++) this.addTaskData(a[c]) };
            this.addCall = function() {
                for (var a = [], b = 1; b < arguments.length; b++) a[b - 1] = arguments[b];
                var c = arguments[0];
                if (c instanceof Function) b = function() { var b = v.ref,
                        d = c.apply(null, a);
                    b.end(); return d };
                else { a.shift(); var d = arguments[1],
                        b = function() { var b = v.ref,
                                e = c[d].apply(c, a);
                            b.end(); return e } }
                return this.addTask(b)
            };
            this.addPause = function(a, b) { return this.addTask(b ? Ea.frames : Ea.seconds, a) };
            this.addWait = function() {
                var a = arguments,
                    b = a[0];
                return "string" == typeof b ? this.addTask(function() {
                    var c = v.ref,
                        d = 1 < a.length ? a[1] : document,
                        e = function(a) {
                            d.removeEventListener(b,
                                e);
                            c.end()
                        };
                    d.addEventListener(b, e)
                }) : this.addTask(ka.run, b)
            };
            this.addTween = function(a, b, c, d, e) { this.addTask(ca.run, a, b, c, 1E3 * d, e) };
            this.addCallTween = function(a, b, c, d, e) { this.addCall(ca.run, a, b, c, 1E3 * d, e) };
            this.addBranchTween = function(a, b, c, d, e) { this.addBranchTask(ca.run, a, b, c, 1E3 * d, e) };
            this.addLoad = function(a) { if ("load" in a) { for (var b = [arguments[0], "load"], c = arguments.length, d = 1; d < c; d++) b.push(arguments[d]); return this.addTask.apply(this, b) } return this.addCall(ba) }
        }

        function O(a, b) {
            this.x = this.y =
                this.rotation = this.originX = this.originY = 0;
            this.scaleX = this.scaleY = 1;
            a && (this.build = a);
            if (b)
                for (var c in b) this[c] = b[c]
        }

        function da(a) {
            this.parent = this.__stage = this.__context = null;
            this.x = this.y = this.rotation = this.originX = this.originY = 0;
            this.scaleX = this.scaleY = this.alpha = 1;
            this.shape = a || O.EMPTY;
            this.strokeOverFill = !0;
            this.strokeColor = this.color = "rgb(0,0,0)";
            this.strokeWidth = 0;
            this.strokeCap = "butt";
            this.strokeJoin = "miter";
            this.strokeMiterLimit = 10;
            this.matrixLocal = void 0;
            this.matrixGlobal = m.ZERO;
            this.shapeMatrixLocal =
                void 0;
            this.shapeMatrixGlobal = m.ZERO;
            this.useDeepHitTest = !1;
            N.init(this)
        }

        function Q() { this.super(new la.RectangleShape(162, 100)) }

        function ma() { this.super(new la.CircleShape(25)) }

        function qa(a) {
            this.parent = this.__stage = this.__context = null;
            this.x = this.y = this.rotation = this.originX = this.originY = 0;
            this.scaleX = this.scaleY = 1;
            this.shape = a || O.EMPTY;
            this.draw = this.drawNothing;
            this.__visible = !1;
            this.color = "rgb(0,100,200)";
            this.alpha = .5;
            this.matrixLocal = void 0;
            this.matrixGlobal = m.ZERO;
            this.shapeMatrixLocal = void 0;
            this.shapeMatrixGlobal = m.ZERO;
            N.init(this)
        }
        var P = {},
            ba = function() {},
            Z = "x y rotation scaleX scaleY originX originY".split(" "),
            p = Z.concat(["alpha"]),
            Fa = {
                aliceblue: { r: 240, g: 248, b: 255 },
                antiquewhite: { r: 250, g: 235, b: 215 },
                aqua: { r: 0, g: 255, b: 255 },
                aquamarine: { r: 127, g: 255, b: 212 },
                azure: { r: 240, g: 255, b: 255 },
                beige: { r: 245, g: 245, b: 220 },
                bisque: { r: 255, g: 228, b: 196 },
                black: { r: 0, g: 0, b: 0 },
                blanchedalmond: { r: 255, g: 235, b: 205 },
                blue: { r: 0, g: 0, b: 255 },
                blueviolet: { r: 138, g: 43, b: 226 },
                brown: { r: 165, g: 42, b: 42 },
                burlywood: {
                    r: 222,
                    g: 184,
                    b: 135
                },
                cadetblue: { r: 95, g: 158, b: 160 },
                chartreuse: { r: 127, g: 255, b: 0 },
                chocolate: { r: 210, g: 105, b: 30 },
                coral: { r: 255, g: 127, b: 80 },
                cornflowerblue: { r: 100, g: 149, b: 237 },
                cornsilk: { r: 255, g: 248, b: 220 },
                crimson: { r: 220, g: 20, b: 60 },
                cyan: { r: 0, g: 255, b: 255 },
                darkblue: { r: 0, g: 0, b: 139 },
                darkcyan: { r: 0, g: 139, b: 139 },
                darkgoldenrod: { r: 184, g: 134, b: 11 },
                darkgray: { r: 169, g: 169, b: 169 },
                darkgreen: { r: 0, g: 100, b: 0 },
                darkkhaki: { r: 189, g: 183, b: 107 },
                darkmagenta: { r: 139, g: 0, b: 139 },
                darkolivegreen: { r: 85, g: 107, b: 47 },
                darkorange: { r: 255, g: 140, b: 0 },
                darkorchid: {
                    r: 153,
                    g: 50,
                    b: 204
                },
                darkred: { r: 139, g: 0, b: 0 },
                darksalmon: { r: 233, g: 150, b: 122 },
                darkseagreen: { r: 143, g: 188, b: 143 },
                darkslateblue: { r: 72, g: 61, b: 139 },
                darkslategray: { r: 47, g: 79, b: 79 },
                darkturquoise: { r: 0, g: 206, b: 209 },
                darkviolet: { r: 148, g: 0, b: 211 },
                deeppink: { r: 255, g: 20, b: 147 },
                deepskyblue: { r: 0, g: 191, b: 255 },
                dimgray: { r: 105, g: 105, b: 105 },
                dodgerblue: { r: 30, g: 144, b: 255 },
                firebrick: { r: 178, g: 34, b: 34 },
                floralwhite: { r: 255, g: 250, b: 240 },
                forestgreen: { r: 34, g: 139, b: 34 },
                fuchsia: { r: 255, g: 0, b: 255 },
                gainsboro: { r: 220, g: 220, b: 220 },
                ghostwhite: {
                    r: 248,
                    g: 248,
                    b: 255
                },
                gold: { r: 255, g: 215, b: 0 },
                goldenrod: { r: 218, g: 165, b: 32 },
                gray: { r: 128, g: 128, b: 128 },
                green: { r: 0, g: 128, b: 0 },
                greenyellow: { r: 173, g: 255, b: 47 },
                honeydew: { r: 240, g: 255, b: 240 },
                hotpink: { r: 255, g: 105, b: 180 },
                indianred: { r: 205, g: 92, b: 92 },
                indigo: { r: 75, g: 0, b: 130 },
                ivory: { r: 255, g: 255, b: 240 },
                khaki: { r: 240, g: 230, b: 140 },
                lavender: { r: 230, g: 230, b: 250 },
                lavenderblush: { r: 255, g: 240, b: 245 },
                lawngreen: { r: 124, g: 252, b: 0 },
                lemonchiffon: { r: 255, g: 250, b: 205 },
                lightblue: { r: 173, g: 216, b: 230 },
                lightcoral: { r: 240, g: 128, b: 128 },
                lightcyan: {
                    r: 224,
                    g: 255,
                    b: 255
                },
                lightgoldenrodyellow: { r: 250, g: 250, b: 210 },
                lightgrey: { r: 211, g: 211, b: 211 },
                lightgreen: { r: 144, g: 238, b: 144 },
                lightpink: { r: 255, g: 182, b: 193 },
                lightsalmon: { r: 255, g: 160, b: 122 },
                lightseagreen: { r: 32, g: 178, b: 170 },
                lightskyblue: { r: 135, g: 206, b: 250 },
                lightslategray: { r: 119, g: 136, b: 153 },
                lightsteelblue: { r: 176, g: 196, b: 222 },
                lightyellow: { r: 255, g: 255, b: 224 },
                lime: { r: 0, g: 255, b: 0 },
                limegreen: { r: 50, g: 205, b: 50 },
                linen: { r: 250, g: 240, b: 230 },
                magenta: { r: 255, g: 0, b: 255 },
                maroon: { r: 128, g: 0, b: 0 },
                mediumaquamarine: { r: 102, g: 205, b: 170 },
                mediumblue: { r: 0, g: 0, b: 205 },
                mediumorchid: { r: 186, g: 85, b: 211 },
                mediumpurple: { r: 147, g: 112, b: 216 },
                mediumseagreen: { r: 60, g: 179, b: 113 },
                mediumslateblue: { r: 123, g: 104, b: 238 },
                mediumspringgreen: { r: 0, g: 250, b: 154 },
                mediumturquoise: { r: 72, g: 209, b: 204 },
                mediumvioletred: { r: 199, g: 21, b: 133 },
                midnightblue: { r: 25, g: 25, b: 112 },
                mintcream: { r: 245, g: 255, b: 250 },
                mistyrose: { r: 255, g: 228, b: 225 },
                moccasin: { r: 255, g: 228, b: 181 },
                navajowhite: { r: 255, g: 222, b: 173 },
                navy: { r: 0, g: 0, b: 128 },
                oldlace: { r: 253, g: 245, b: 230 },
                olive: { r: 128, g: 128, b: 0 },
                olivedrab: {
                    r: 107,
                    g: 142,
                    b: 35
                },
                orange: { r: 255, g: 165, b: 0 },
                orangered: { r: 255, g: 69, b: 0 },
                orchid: { r: 218, g: 112, b: 214 },
                palegoldenrod: { r: 238, g: 232, b: 170 },
                palegreen: { r: 152, g: 251, b: 152 },
                paleturquoise: { r: 175, g: 238, b: 238 },
                palevioletred: { r: 216, g: 112, b: 147 },
                papayawhip: { r: 255, g: 239, b: 213 },
                peachpuff: { r: 255, g: 218, b: 185 },
                peru: { r: 205, g: 133, b: 63 },
                pink: { r: 255, g: 192, b: 203 },
                plum: { r: 221, g: 160, b: 221 },
                powderblue: { r: 176, g: 224, b: 230 },
                purple: { r: 128, g: 0, b: 128 },
                rebeccapurple: { r: 102, g: 51, b: 153 },
                red: { r: 255, g: 0, b: 0 },
                rosybrown: { r: 188, g: 143, b: 143 },
                royalblue: {
                    r: 65,
                    g: 105,
                    b: 225
                },
                saddlebrown: { r: 139, g: 69, b: 19 },
                salmon: { r: 250, g: 128, b: 114 },
                sandybrown: { r: 244, g: 164, b: 96 },
                seagreen: { r: 46, g: 139, b: 87 },
                seashell: { r: 255, g: 245, b: 238 },
                sienna: { r: 160, g: 82, b: 45 },
                silver: { r: 192, g: 192, b: 192 },
                skyblue: { r: 135, g: 206, b: 235 },
                slateblue: { r: 106, g: 90, b: 205 },
                slategray: { r: 112, g: 128, b: 144 },
                snow: { r: 255, g: 250, b: 250 },
                springgreen: { r: 0, g: 255, b: 127 },
                steelblue: { r: 70, g: 130, b: 180 },
                tan: { r: 210, g: 180, b: 140 },
                teal: { r: 0, g: 128, b: 128 },
                thistle: { r: 216, g: 191, b: 216 },
                tomato: { r: 255, g: 99, b: 71 },
                turquoise: {
                    r: 64,
                    g: 224,
                    b: 208
                },
                violet: { r: 238, g: 130, b: 238 },
                wheat: { r: 245, g: 222, b: 179 },
                white: { r: 255, g: 255, b: 255 },
                whitesmoke: { r: 245, g: 245, b: 245 },
                yellow: { r: 255, g: 255, b: 0 },
                yellowgreen: { r: 154, g: 205, b: 50 }
            };
        wa.prototype = { className: "CommonMap", superclassName: "Object", constructor: wa };
        wa.EMPTY_GC_CONDITION = function(a, b) { return !1 };
        V.prototype = { className: "SoftMap", superclassName: "Object", constructor: V };
        (function() { var a = 0;
            V.getID = function() { return "SoftMap_" + ++a } })();
        ia.prototype = { className: "SoftSet", superclassName: "Object", constructor: ia };
        (function() { var a = 0;
            ia.getID = function() { return "SoftSet_" + ++a } })();
        ja.prototype = { className: "HardMap", superclassName: "Object", constructor: ja, get forEachProxy() { var a = this; return { forEach: function(b) { a.forEach(b) } } } };
        (function() { var a = 0;
            ja.getID = function() { return "HardMap_" + ++a } })();
        sa.prototype = { className: "HardSet", superclassName: "Object", constructor: sa, get forEachProxy() { var a = this; return { forEach: function(b) { a.forEach(b) } } } };
        (function() { var a = 0;
            sa.getID = function() { return "HardSet_" + ++a } })();
        Ca.prototype = { className: "IdChain", superclassName: "Object", constructor: Ca };
        W.prototype = { className: "__KeyHiddenZone", superclassName: "Object", constructor: W };
        var G = {};
        (function(a) {
            function b(a) { return a && a instanceof Object }

            function c(a) { return a.valueOf(W) }

            function d(a) { return a.hasOwnProperty("valueOf") && c(a) instanceof W }
            a.createHiddenZone = function(a) { var b = new W,
                    c = a.valueOf;
                Object.defineProperty(a, "valueOf", { value: function(a) { return a && a === W ? b : c.apply(this, arguments) }, configurable: !1, wrirable: !1 }) };
            a.keyIsObject =
                b;
            a.keyIsFixed = function(a) { var b = Object.getOwnPropertyDescriptor(a, "valueOf"); return b && !b.configurable || Object.isFrozen(a) };
            a.hiddenZoneOf = c;
            a.keyHasHiddenZone = d;
            a.keyKnowsID = function(a, b) { return c(a).hasOwnProperty(b) };
            a.traceCollectionsOf = function(a) { if (b(a) && d(a))
                    for (str in s(""), s("Collections of " + a + ":"), a = c(a), a) "className" != str && "superclassName" != str && "constructor" != str && s(str) }
        })(G);
        A.prototype = {
            className: "EnterFrameSignal",
            superclassName: "Object",
            constructor: A,
            get frameRate() {
                return 1E3 /
                    this.frameDuration
            }
        };
        A.getInstance = function() { return A.__defaultInstance ? A.__defaultInstance : new A };
        var N = {},
            Ja = function(a, b) { a.object[a.methodName](b) },
            Na = function(a, b) { a.object(b) };
        N.addEventListener = function(a, b, c) { this.listeners[a] || (this.listeners[a] = []); for (var d = 3 > arguments.length ? Na : Ja, e = this.listeners[a], f = e.length; f--;)
                if (e[f].object === b && e[f].methodName === c) return;
            e.push({ object: b, methodName: c, invokeListenerType: d, debugStr: "debugStr" }) };
        N.removeEventListener = function(a, b, c) {
            if (this.listeners[a])
                for (var d =
                        this.listeners[a], e = d.length; e--;)
                    if (d[e].object === b && d[e].methodName === c) { d.splice(e, 1);
                        d.length || delete this.listeners[a]; break }
        };
        N.dispatchEvent = function(a, b) { if (this.listeners[a])
                for (var c = this.listeners[a], d = c.length, e = { type: a, currentTarget: this, target: b && b.target ? b.target : this, data: b }, f = 0; f < d; f++) c[f].invokeListenerType(c[f], e) };
        N.init = function(a) { a.listeners = {};
            a.addEventListener = this.addEventListener;
            a.removeEventListener = this.removeEventListener;
            a.dispatchEvent = this.dispatchEvent };
        var K = {
            lin: function() { return function(a, b, c) { return a + (b - a) * c } },
            circ: function() { return function(a, b, c) { return .5 > c ? a + (b - a) / 2 * (1 - Math.sqrt(1 - 4 * c * c)) : b - (b - a) / 2 * (1 - Math.sqrt(1 - 4 * (1 - c) * (1 - c))) } },
            circIn: function() { return function(a, b, c) { return a + (b - a) * (1 - Math.sqrt(1 - c * c)) } },
            circOut: function() { return function(a, b, c) { return b - (b - a) * (1 - Math.sqrt(1 - (1 - c) * (1 - c))) } },
            elps: function(a, b) {
                a = a || .618;
                b = b || 9;
                return function(c, d, e) {
                    return .5 > e ? c + (d - c) / 2 * a * (1 - Math.sqrt(1 - Math.pow(2 * e, b))) : d - (d - c) / 2 * a * (1 - Math.sqrt(1 - Math.pow(2 -
                        2 * e, b)))
                }
            },
            elpsIn: function(a, b) { a = a || .618;
                b = b || 9; return function(c, d, e) { return c + (d - c) * a * (1 - Math.sqrt(1 - Math.pow(e, b))) } },
            elpsOut: function(a, b) { a = a || .618;
                b = b || 9; return function(c, d, e) { return d - (d - c) * a * (1 - Math.sqrt(1 - Math.pow(1 - e, b))) } },
            pow: function(a) { a = a || 3; return function(b, c, d) { return .5 > d ? b + (c - b) / 2 * Math.pow(2 * d, a) : c - (c - b) / 2 * Math.pow(2 * (1 - d), a) } },
            powIn: function(a) { a = a || 3; return function(b, c, d) { return b + (c - b) * Math.pow(d, a) } },
            powOut: function(a) {
                a = a || 3;
                return function(b, c, d) {
                    return c - (c - b) * Math.pow(1 -
                        d, a)
                }
            },
            sin: function() { return function(a, b, c) { return a - (b - a) / 2 * (Math.cos(Math.PI * c) - 1) } },
            sinIn: function() { return function(a, b, c) { return b - (b - a) * Math.cos(Math.PI / 2 * c) } },
            sinOut: function() { return function(a, b, c) { return a + (b - a) * Math.sin(Math.PI / 2 * c) } },
            exp: function() { return function(a, b, c) { return 0 == c ? a : 1 == c ? b : 1 > (c *= 2) ? a + (b - a) / 2 * Math.pow(2, 10 * (c - 1)) : a + (b - a) / 2 * (2 - Math.pow(2, 10 * (1 - c))) } },
            expIn: function() { return function(a, b, c) { return 0 == c ? a : a + (b - a) * Math.pow(2, 10 * (c - 1)) } },
            expOut: function() {
                return function(a,
                    b, c) { return 1 == c ? b : a + (b - a) * (1 - Math.pow(2, -10 * c)) }
            },
            osc: function(a, b) { a = a || 4;
                b = b || 11; return function(c, d, e) { return .5 > e ? c + (d - c) / 2 * Math.abs(Math.pow((e = 1 - 2 * e) - 1, a)) * Math.sin(Math.PI / 2 * (b * e + 1)) : d - (d - c) / 2 * Math.abs(Math.pow((e = 2 * e - 1) - 1, a)) * Math.sin(Math.PI / 2 * (b * e + 1)) } },
            oscOut: function(a, b) { a = a || 4;
                b = b || 11; return function(c, d, e) { return d - (d - c) * Math.abs(Math.pow(e - 1, a)) * Math.sin(Math.PI / 2 * (b * e + 1)) } },
            oscIn: function(a, b) {
                a = a || 4;
                b = b || 11;
                return function(c, d, e) {
                    return c + (d - c) * Math.abs(Math.pow(e, a)) * Math.sin(Math.PI /
                        2 * (b * (1 - e) + 1))
                }
            },
            osc2: function(a, b) { a = a || 9;
                b = b || 11; return function(c, d, e) { return .5 > e ? c + (d - c) / 2 * Math.exp(-a * (e = 1 - 2 * e)) * Math.sin(Math.PI / 2 * (b * e + 1)) : d - (d - c) / 2 * Math.exp(-a * (e = 2 * e - 1)) * Math.sin(Math.PI / 2 * (b * e + 1)) } },
            osc2Out: function(a, b) { a = a || 9;
                b = b || 11; return function(c, d, e) { return d - (d - c) * Math.exp(-a * e) * Math.sin(Math.PI / 2 * (b * e + 1)) } },
            osc2In: function(a, b) { a = a || 9;
                b = b || 11; return function(c, d, e) { return c + (d - c) * Math.exp(-a * (1 - e)) * Math.sin(Math.PI / 2 * (b * (1 - e) + 1)) } },
            _bncGetParams: function(a, b) {
                for (var c = Math.sqrt(b),
                        d = [{ tMax: 1, tOffset: 0, fOffset: 0 }], e = 0, f = 0, g = 0; g++ < a;) { var e = f,
                        f = f + 2 * Math.pow(c, g),
                        h = {};
                    h.tMax = 1 + f;
                    h.tOffset = 1 + e + Math.pow(c, g);
                    h.fOffset = 1 - Math.pow(b, g);
                    d.push(h) }
                for (c = 1 / d[a - 1].tMax; g--;) h = d[g], h.tMax *= c, h.tOffset *= c;
                return { f: d, s: 1 / (c * c) }
            },
            bncOut: function(a, b) { a = a || 5; var c = K._bncGetParams(a, b || .25),
                    d = c.f,
                    e = c.s; return function(b, c, h) { for (var t = 0; t < a; t++) { var l = d[t]; if (h < l.tMax) return b + (c - b) * (e * (h - l.tOffset) * (h - l.tOffset) + l.fOffset) } } },
            bncIn: function(a, b) {
                a = a || 5;
                var c = K._bncGetParams(a, b || .25),
                    d = c.f,
                    e = c.s;
                return function(b, c, h) { h = 1 - h; for (var t = 0; t < a; t++) { var l = d[t]; if (h < l.tMax) return c - (c - b) * (e * (h - l.tOffset) * (h - l.tOffset) + l.fOffset) } }
            },
            bnc: function(a, b) { a = a || 5; var c = K._bncGetParams(a, b || .25),
                    d = c.f,
                    e = c.s; return function(b, c, h) { if (.5 > h) { h = 1 - 2 * h; for (var t = 0; t < a; t++) { var l = d[t]; if (h < l.tMax) return c - (c - b) / 2 * (e * (h - l.tOffset) * (h - l.tOffset) + l.fOffset + 1) } }
                    h = 2 * h - 1; for (t = 0; t < a; t++)
                        if (l = d[t], h < l.tMax) return b + (c - b) / 2 * (e * (h - l.tOffset) * (h - l.tOffset) + l.fOffset + 1) } },
            backIn: function(a) {
                a = a || 2.7;
                var b = -2 * a - 1,
                    c = a + 2;
                return function(d, e, f) { return e - (e - d) * (a * (f = 1 - f) * f * f + b * f * f + c * f) }
            },
            backOut: function(a) { a = a || 2.7; var b = -2 * a - 1,
                    c = a + 2; return function(d, e, f) { return d + (e - d) * (a * f * f * f + b * f * f + c * f) } },
            back: function(a) { a = a || 2.7; var b = -2 * a - 1,
                    c = a + 2; return function(d, e, f) { return .5 > f ? e - (e - d) / 2 * (a * (f = 1 - 2 * f) * f * f + b * f * f + c * f + 1) : d + (e - d) / 2 * (a * (f = 2 * f - 1) * f * f + b * f * f + c * f + 1) } },
            powLin: function(a, b) {
                a = a || 3;
                b = void 0 == b || 0 > b || 1 < b ? .309 : b / 2;
                var c = a * (1 / b - 2) + 2;
                return b ? function(d, e, f) {
                    return f <= b ? d + (e - d) / c * Math.pow(f / b, a) : f > 1 - b ? e - (e - d) / c * Math.pow((1 -
                        f) / b, a) : d + (e - d) * (1 / c + (1 - 2 / c) * (f - b) / (1 - 2 * b))
                } : K.lin()
            },
            powLinIn: function(a, b) { a = a || 3;
                b = void 0 == b || 0 > b || 1 < b ? .618 : b; var c = a * (1 / b - 1) + 1; return b ? function(d, e, f) { return f < b ? d + (e - d) / c * Math.pow(f / b, a) : d + (e - d) * (1 / c + (1 - 1 / c) * (f - b) / (1 - b)) } : K.lin() },
            powLinOut: function(a, b) { a = a || 3;
                b = void 0 == b || 0 > b || 1 < b ? .618 : b; var c = a * (1 / b - 1) + 1; return b ? function(d, e, f) { return f > 1 - b ? e - (e - d) / c * Math.pow((1 - f) / b, a) : e - (e - d) * (1 + f * (1 - c) / (c * (1 - b))) } : K.lin() },
            powCombo: function(a, b, c) {
                a = a || 3;
                b = b || 5;
                c = c || .618;
                var d = a / (b * (1 / c - 1) + a);
                return function(e,
                    f, g) { return g < d ? e + (f - e) * c * Math.pow(g / d, a) : f - (f - e) * (1 - c) * Math.pow((1 - g) / (1 - d), b) }
            },
            powCombo2: function(a, b, c) { a = a || 3;
                b = b || 5;
                c = c || .618; var d = 1 / (a / b * (1 / c - 1) + 1); return function(e, f, g) { return g < c ? e + (f - e) * d * Math.pow(g / c, a) : f - (f - e) * (1 - d) * Math.pow((1 - g) / (1 - c), b) } },
            morph: function(a, b, c) { a = a || K.circ();
                b = b || K.pow(5); return c ? function(d, e, f) { return c(a(d, e, f), b(d, e, f), f) } : function(c, e, f) { return (1 - f) * a(c, e, f) + f * b(c, e, f) } },
            custom: function(a) { return function(b, c, d) { return .5 > d ? b + (c - b) / 2 * a(2 * d) : c - (c - b) / 2 * a(2 - 2 * d) } },
            customIn: function(a) { return function(b, c, d) { return b + (c - b) * a(d) } },
            customOut: function(a) { return function(b, c, d) { return c - (c - b) * a(1 - d) } }
        };
        K.def = K.pow;
        var Ea = { frames: function(a, b) {
                    function c() { f++ > a && (e.removeListener(c), d.hasOwnProperty("onComplete") && setTimeout(function() { d.onComplete() }, 0), q.end()) } var d = {},
                        e = b || A.getInstance(),
                        f = 0;
                    q = v.ref;
                    e.addListener(c, !0); return d }, seconds: function(a) { var b = {},
                        c = v.ref;
                    setTimeout(function() { if (b.onComplete) b.onComplete();
                        c.end() }, 1E3 * a); return b } },
            ka = {
                run: function(a,
                    b) {
                    function c() { a() && (e.removeListener(c), d.hasOwnProperty("onComplete") && setTimeout(function() { d.onComplete() }, 0), f.end()) } var d = {},
                        e = b || A.getInstance(),
                        f = v.ref;
                    Object.defineProperty(d, "abort", { value: function() { e.removeListener(c) }, writable: !1 });
                    e.addListener(c, !0); return d },
                abort: function(a) { a.abort() }
            },
            R = {
                run: function(a, b, c, d, e, f) {
                    if (a instanceof HTMLElement && !a.hasOwnProperty(b) && b in a.style) {
                        a.style[b] = window.getComputedStyle(a)[b];
                        if (!a.hasOwnProperty("cssPropModifier") || !a.cssPropModifier instanceof pa) a.cssPropModifier = new pa(a.style, b);
                        return R.run(a.cssPropModifier, "value", c, d, e, f)
                    }
                    var g = v.ref,
                        h = { object: a },
                        t = e || 500,
                        l = d || K.lin(),
                        r, x = ha(a[b]),
                        m = ha(c),
                        p = "change" + b;
                    r = f ? f : a.__stage && a.__stage.metronome ? a.__stage.metronome : A.getInstance();
                    var s = 0,
                        B, u = (new Date).getTime();
                    a[p] = function(a) {
                        B = s / t;
                        this[b] = "rgba(" + Math.round(l(x.r, m.r, B)) + "," + Math.round(l(x.g, m.g, B)) + "," + Math.round(l(x.b, m.b, B)) + "," + l(x.a, m.a, B) + ")";
                        s = a - u;
                        if (s > t) {
                            this[b] = c;
                            r.removeListener(this, p);
                            delete this[p];
                            if (h.hasOwnProperty("onComplete")) h.onComplete();
                            g.end()
                        }
                    };
                    r.addListener(a, p);
                    h.stop = function() { r.removeListener(a, p) };
                    return h
                }
            },
            $ = { run: function(a, b, c, d, e, f) { var g = v.ref,
                        h = { object: a },
                        t = e || 500,
                        l = d || K.lin(),
                        r, m = a[b],
                        p = "change" + b;
                    r = f ? f : a.__stage && a.__stage.metronome ? a.__stage.metronome : A.getInstance(); var w = 0,
                        s = (new Date).getTime();
                    a[p] = function(a) { this[b] = l(m, c, w / t);
                        w = a - s; if (w > t) { this[b] = c;
                            r.removeListener(this, p);
                            delete this[p]; if (h.hasOwnProperty("onComplete")) h.onComplete();
                            g.end() } };
                    r.addListener(a, p); return h } },
            ca = {
                run: function(a, b, c, d, e) {
                    var f =
                        v.ref,
                        g = { object: a },
                        h = d || 500,
                        t = c || K.lin(),
                        l;
                    l = e ? e : a.__stage && a.__stage.metronome ? a.__stage.metronome : A.getInstance();
                    c = 0;
                    var r, m = {},
                        p = {};
                    for (r in b) "string" == typeof b[r] ? (d = b[r].replace(/ /g, ""), d.indexOf("+") || (p[r] = a[r] + Number(d.substring(1, d.length)))) : p[r] = b[r], m[r] = a[r], c++;
                    b = c;
                    var w = (new Date).getTime();
                    for (r in p) c = "change" + r, a[c] = function(a) {
                        var b = arguments.callee,
                            c = b.p,
                            d = b.updateFunctionName;
                        this[c] = t(m[c], p[c], b.t / h);
                        b.t = a - w;
                        if (b.t > h && (this[c] = p[c], l.removeListener(this, d), delete this[d], !b.propsCounter)) { if (g.hasOwnProperty("onComplete")) g.onComplete();
                            f.end() }
                    }, a[c].p = r, a[c].t = 0, a[c].propsCounter = --b, a[c].updateFunctionName = c, l.addListener(a, c);
                    g.stop = function() { for (r in p) l.removeListener(a, "change" + r) };
                    return g
                }
            },
            ga = { osc: function(a, b, c) { a = a || 3;
                    b = b || 1;
                    c = c || 2; return function(d) { return Math.pow(d - 1, c) * Math.sin((2 * a + 1.5) * Math.PI * Math.pow(d, b)) } } };
        u.prototype = {
            className: "Shift",
            superclassName: "Object",
            constructor: u,
            get delta() { return this.__delta },
            get ratio() { return this.__ratio },
            get isPlayed() { return this.__isPlayed },
            update: function() { for (var a in this.__deltaInit) this.__object[a] += this.__delta[a]; for (a in this.__ratioInit) this.__object[a] *= this.__ratio[a] },
            play: function() { this.__isPlayed = !0;
                this.__efs.addListener(this, "update") },
            stop: function() { this.__efs.removeListener(this, "update");
                this.__isPlayed = !1 }
        };
        Ra.prototype = {
            className: "ShiftTimebased",
            superclassName: "Object",
            constructor: Ra,
            get delta() { return this.__delta },
            get isPlayed() { return this.__isPlayed },
            update: function(a) {
                var b =
                    (a - this.__currentTimer) / this.__frameDuration,
                    c;
                for (c in this.__deltaInit) this.__object[c] += this.__delta[c] * b;
                this.__currentTimer = a
            },
            play: function() { this.__isPlayed || (this.__isPlayed = !0, this.__currentTimer = (new Date).getTime(), this.__efs.addListener(this, "update")) },
            stop: function() { this.__efs.removeListener(this, "update");
                this.__isPlayed = !1 }
        };
        ta.prototype = {
            className: "Motion",
            superclassName: "Object",
            constructor: ta,
            get speed() { return this.__speed },
            get isPlayed() { return this.__isPlayed },
            update: function(a) {
                var b =
                    (a - this.__currentTimer) / 1E3,
                    c;
                for (c in this.__speedInit) this.__object[c] += b * this.__speed[c];
                this.__currentTimer = a
            },
            play: function() { this.__isPlayed || (this.__isPlayed = !0, this.__currentTimer = (new Date).getTime(), this.__efs.addListener(this, "update")) },
            stop: function() { this.__efs.removeListener(this, "update");
                this.__isPlayed = !1 }
        };
        S.prototype = {
            className: "Motion2D",
            superclassName: "Object",
            constructor: S,
            get speed() { return this.__speed },
            set speed(a) {
                this.__speed = a;
                this.updateSpeedVector(this.__motion.speed,
                    a, this.__angle)
            },
            get angle() { return 180 * this.__angle / Math.PI },
            set angle(a) { this.__angle = a * Math.PI / 180;
                this.updateSpeedVector(this.__motion.speed, this.__speed, this.__angle) },
            get isPlayed() { return this.__motion.isPlayed },
            updateSpeedVector: function(a, b, c) { a.x = b * Math.cos(c);
                a.y = b * Math.sin(c) },
            play: function() { this.__motion.play() },
            stop: function() { this.__motion.stop() }
        };
        var E = {};
        E.sin = Math.sin;
        E.sinPro = function(a) {
            if (0 === a || 0 > a) return E.square;
            !a || isNaN(a) ? a = .3 : 1 < a && (a = 1 / a);
            var b = Math.sqrt(a);
            return function(c) {
                c =
                    Math.sin(c);
                var d = Math.abs(c);
                return (0 > c ? -1 : 1) * (Math.pow(d, b) * Math.pow(d, a) + (1 - Math.pow(d, b)) * d)
            }
        };
        E.triangle = function(a) { return 2 / Math.PI * Math.asin(Math.sin(a)) };
        E.square = function(a) { return 0 > Math.sin(a) ? -1 : 1 };
        E.noise = function(a) { return 2 * Math.random() - 1 };
        E.pulsePro = function(a) { if (0 === a) return E.sin;
            a = !a || isNaN(a) || 0 > a ? 4 : 1 + Math.ceil(a); var b = Math.PI / (2 * a),
                c = 2 * Math.PI,
                d = 2 / (2 - 1 / a); return function(e) { e %= c; return e < b || e > c - b ? Math.sin(a * e) : Math.cos(d * e / 2 - b / d) } };
        E.pulse = E.pulsePro();
        z.prototype = {
            className: "Swing",
            superclassName: "Object",
            constructor: z,
            get isPlayed() { return this.__isPlayed },
            update: function(a) { this.__object[this.__propName] = this.__propValue + this.amplitude * this.wave(this.phase + this.frequency * z.K * (a - this.__startTime)) },
            play: function() {
                this.__isPlayed || (this.__isPlayed = !0, void 0 == this.__startTime ? (this.__startTime = (new Date).getTime(), this.__object[this.__propName] = this.__propValue + this.amplitude * this.wave(this.phase)) : this.__stopTime && (this.__startTime += (new Date).getTime() - this.__stopTime, this.__stopTime =
                    0), this.__efs.addListener(this, "update"))
            },
            stop: function() { this.__stopTime = (new Date).getTime();
                this.__efs.removeListener(this, "update");
                this.__isPlayed = !1 },
            reset: function() { this.__efs.removeListener(this, "update");
                this.__isPlayed = !1;
                this.__startTime = this.__stopTime = void 0 }
        };
        z.K = Math.PI / 500;
        C.prototype = {
            className: "CanvasContainer",
            superclassName: "CanvasLayer",
            constructor: C,
            get children() { return this.__children },
            get isContainer() { return !0 },
            setContext: function(a) {
                this.__context = a;
                for (var b = this.__children,
                        c = b.length; c--;) b[c].setContext(a)
            },
            setStage: function(a) { this.__stage = a; for (var b = this.__children, c = b.length; c--;) b[c].setStage(a); if (this.onDisplayed && a) this.onDisplayed() },
            isolate: function() { this.parent = null;
                this.setContext(null);
                this.setStage(null) },
            prepareNewChild: function(a) { this.removeChild(a);
                a.parent && (a.parent.container == a ? a.parent.container = null : a.parent.removeChild(a));
                this.__context && a.setContext(this.__context);
                a.parent = this;
                this.__stage && a.setStage(this.__stage); if (a.onAdded) a.onAdded() },
            canBeAdded: function(a) { if ("CanvasLayer" == a.superclassName) { for (var b = this, c = this.__stage; b != c;) { if (b == a) return !1;
                        b = b.parent } return !0 } return !1 },
            addChild: function(a) { this.canBeAdded(a) && (this.prepareNewChild(a), this.__children.push(a)) },
            addRearChild: function(a) { this.canBeAdded(a) && (this.prepareNewChild(a), this.__children.unshift(a)) },
            addChildOver: function(a, b) { if (this.canBeAdded(a))
                    for (var c = this.__children, d = c.length; d--;)
                        if (c[d] == b) { this.prepareNewChild(a);
                            c.splice(d + 1, 0, a); break } },
            addChildUnder: function(a,
                b) { if (this.canBeAdded(a))
                    for (var c = this.__children, d = c.length; d--;)
                        if (c[d] == b) { this.prepareNewChild(a);
                            c.splice(d, 0, a); break } },
            removeChild: function(a) { for (var b = this.__children, c = b.length; c--;)
                    if (b[c] == a) { a.isolate();
                        b.splice(c, 1); break } },
            contains: function(a) { for (a = a.parent; a && a.isContainer;) { if (a == this) return !0;
                    a = a.parent } return !1 },
            __copy: function(a, b) {
                if (a.isContainer) {
                    var c = na.call(a),
                        d, e = 2 == arguments.length,
                        f, g, h;
                    e ? (f = a, g = new ja, g.set(a, c), h = []) : (f = arguments[2], g = arguments[3], h = arguments[4]);
                    var t, l = a.children;
                    c.__children = Array(l.length);
                    for (d = l.length; d--;) t = this.__copy(l[d], b, f, g, h), t.parent = c, c.__children[d] = t, g.set(l[d], t);
                    var r = a.masks;
                    t = a.holes;
                    var m;
                    c.masks = Array(r.length);
                    c.holes = Array(t.length);
                    for (d = r.length; d--;) m = r[d], l = g.get(m.host), c.masks[d] = m.host == f || f.contains(m.host) ? { shape: m.shape.copy(), host: l } : { shape: m.shape, host: m.host }, l || h.push([c.masks[d], m]);
                    for (d = t.length; d--;) r = t[d], l = g.get(r.host), c.holes[d] = r.host == f || f.contains(r.host) ? { shape: r.shape.copy(), host: l } : {
                        shape: r.shape,
                        host: r.host
                    }, l || h.push([c.holes[d], r]);
                    if (e) { for (d = h.length; d--;) h[d][0].host = g.get(h[d][1].host);
                        g.clear() }
                    return c
                }
                return a.copy(b)
            },
            copy: function(a) { return this.__copy(this, a) },
            __addShapeData: function(a, b, c) { var d;
                b = b || this; for (var e = c.length; e--;)
                    if (d = c[e], d.shape === a && d.host === b) return;
                c.push({ shape: a, host: b }) },
            __removeShapeData: function(a, b, c) { var d;
                b = b || this; for (var e = c.length; e--;)
                    if (d = c[e], d.shape === a && d.host === b) { c.splice(e, 1); break } },
            addMask: function(a, b) {
                this.masks.length || (this.draw =
                    this.holes.length ? this.drawWithMasksAndHoles : this.drawWithMasks, this.getHitAsset = this.holes.length ? this.getHitAssetWithMasksAndHoles : this.getHitAssetWithMasks);
                this.__addShapeData(a, b, this.masks)
            },
            removeMask: function(a, b) { this.__removeShapeData(a, b, this.masks);
                this.masks.length || (this.draw = this.holes.length ? this.drawWithHoles : this.drawNormal, this.getHitAsset = this.holes.length ? this.getHitAssetWithHoles : this.getHitAssetNormal) },
            addHole: function(a, b) {
                this.holes.length || (this.draw = this.masks.length ? this.drawWithMasksAndHoles :
                    this.drawWithHoles, this.getHitAsset = this.masks.length ? this.getHitAssetWithMasksAndHoles : this.getHitAssetWithHoles);
                this.__addShapeData(a, b, this.holes)
            },
            removeHole: function(a, b) { this.__removeShapeData(a, b, this.holes);
                this.holes.length || (this.draw = this.masks.length ? this.drawWithMasks : this.drawNormal, this.getHitAsset = this.masks.length ? this.getHitAssetWithMasks : this.getHitAssetNormal) },
            drawNormal: function() { var a = this.__context;
                a.save();
                this.setMatrixAndAlpha(a);
                this.drawChildren();
                a.restore() },
            drawWithMasks: function() {
                var a =
                    this.__context;
                a.save();
                this.setMatrixAndAlpha(a);
                this.buildMasks(a);
                this.drawChildren();
                a.restore()
            },
            drawWithHoles: function() { var a = this.__context;
                a.save();
                this.setMatrixAndAlpha(a);
                this.buildHoles(a, this.__stage.width, this.__stage.height);
                this.drawChildren();
                a.restore() },
            drawWithMasksAndHoles: function() { var a = this.__context;
                a.save();
                this.setMatrixAndAlpha(a);
                this.buildMasks(a);
                this.buildHoles(a, this.__stage.width, this.__stage.height);
                this.drawChildren();
                a.restore() },
            getHitAssetNormal: function(a,
                b) { for (var c = this.__children, d, e, f = c.length; f--;)
                    if (d = c[f], d.isContainer) { if (e = d.getHitAsset(a, b)) break } else if (d.hitTest && d.hitTest(a, b)) { e = d; break } return e },
            getHitAssetWithMasks: function(a, b) { var c = this.__context;
                this.buildPaths(c, this.masks); return c.isPointInPath(a, b) ? this.getHitAssetNormal(a, b) : !1 },
            getHitAssetWithHoles: function(a, b) { var c = this.__context;
                this.buildPaths(c, this.holes); return c.isPointInPath(a, b) ? !1 : this.getHitAssetNormal(a, b) },
            getHitAssetWithMasksAndHoles: function(a, b) {
                var c = this.__context;
                this.buildPaths(c, this.masks);
                return c.isPointInPath(a, b) ? (this.buildPaths(c, this.holes), c.isPointInPath(a, b) ? !1 : this.getHitAssetNormal(a, b)) : !1
            },
            setMatrixAndAlpha: function(a) { m.setTransform(a, this.matrixGlobal);
                a.globalAlpha *= this.alpha },
            buildPaths: function(a, b) {
                var c, d, e;
                a.beginPath();
                for (var f = b.length; f--;) a.save(), c = b[f], d = c.shape, e = m.multiply(m.get(d.x, d.y, d.rotation, d.scaleX, d.scaleY), m.get(-d.originX, -d.originY, 0, 1, 1)), m.setTransform(a, "global" == c.host ? e : m.multiply(c.host.matrixGlobal, e)),
                    d.build(a), a.restore();
                a.closePath()
            },
            buildMasks: function(a) { this.buildPaths(a, this.masks);
                a.clip() },
            buildHoles: function(a, b, c) {
                for (var d, e, f, g = this.holes.length; g--;) a.save(), a.beginPath(), a.save(), m.setTransform(a, m.GLOBAL), a.moveTo(0, 0), a.lineTo(0, c), a.lineTo(b, c), a.lineTo(b, 0), a.closePath(), a.restore(), d = this.holes[g], e = d.shape, f = m.multiply(m.get(e.x, e.y, e.rotation, e.scaleX, e.scaleY), m.get(-e.originX, -e.originY, 0, 1, 1)), m.setTransform(a, "global" == d.host ? f : m.multiply(d.host.matrixGlobal, f)), e.build(a),
                    a.restore(), a.closePath(), a.clip()
            },
            calcOwnMatrices: function() { this.matrixLocal = m.multiply(m.get(this.x, this.y, this.rotation, this.scaleX, this.scaleY), m.get(-this.originX, -this.originY, 0, 1, 1));
                this.matrixGlobal = this.parent.matrixGlobal ? m.multiply(this.parent.matrixGlobal, this.matrixLocal) : this.matrixLocal },
            calc: function() { this.calcOwnMatrices(); for (var a = this.__children, b = a.length; b--;) a[b].calc() },
            drawChildren: function() { for (var a = this.__children, b = a.length, c = 0; c < b; c++) a[c].draw() }
        };
        C.GLOBAL = "global";
        C.OWN_PROPS = p.concat(["draw", "getHitAsset"]);
        F.prototype = {
            className: "CanvasComposition",
            constructor: F,
            set listenGestures(a) { a ? (this.addDomGestureListeners(), this.metronome.addListener(this, "processGestures", !0), this.__listenGestures = !0) : (this.removeDomGestureListeners(), this.metronome.removeListener(this, "processGestures"), this.__listenGestures = !1) },
            markHitContainers: function(a) { a = a.parent;
                a.isContainer && (a.hasHitAsset = !0, this.hitContainers.push(a), this.markHitContainers(a)) },
            markDownContainers: function(a) {
                a =
                    a.parent;
                a.isContainer && (a.hasDownAsset = !0, this.downContainers.push(a), this.markDownContainers(a))
            },
            markOutContainers: function(a) {
                (a = a.parent) && a.isContainer && (a.hasOutAsset = !0, this.outContainers.push(a), this.markOutContainers(a)) },
            unmarkHitContainers: function() { for (var a = this.hitContainers.length; a--;) this.hitContainers[a].hasHitAsset = !1 },
            unmarkDownContainers: function() { for (var a = this.downContainers.length; a--;) this.downContainers[a].hasDownAsset = !1 },
            unmarkOutContainers: function() {
                for (var a = this.outContainers.length; a--;) this.outContainers[a].hasOutAsset = !1
            },
            processGestures: function() {
                if (this.__gestureOccured) {
                    var a = this.gesturePoint,
                        a = this.__container.getHitAsset(a.x, a.y),
                        b;
                    a ? (this.markHitContainers(a), this.dispatchGestureGroup(a, a, this.gestures.group1), this.gestures.group1.mouseDown && (b = a, this.markDownContainers(a)), this.gestures.group2.mouseOver && a != this.hitAsset && (this.hitAsset ? (this.markOutContainers(this.hitAsset), this.gestures.group2.mouseOut && this.dispatchGestureOut(this.hitAsset, this.hitAsset, "mouseOut"), this.dispatchGestureOver(a, a, "mouseOver")) :
                        this.dispatchGesture(a, a, "mouseOver"), this.isDown && this.dispatchGestureOver(a, a, "dragOver")), this.gestures.group1.mouseUp && (a == this.downAsset ? this.dispatchGesture(a, a, "click") : this.downAsset && (this.dispatchGestureClick(null, a, "click"), this.dispatchGestureReleaseOutside(this.downAsset, this.downAsset, "releaseOutside"))), this.gestures.group1.mouseMove && (a == this.downAsset ? this.dispatchGesture(a, a, "drag") : this.isDown && a != this.hitAsset && this.hitAsset && (this.hitAsset == this.downAsset ? this.dispatchGestureOut(this.hitAsset,
                        this.hitAsset, "dragOutThis") : this.dispatchGestureDragOutThis(null, this.hitAsset, "dragOutThis"), this.dispatchGestureOut(this.hitAsset, this.hitAsset, "dragOut")))) : (this.gestures.group2.mouseOut && this.hitAsset && (this.dispatchGesture(this.hitAsset, this.hitAsset, "mouseOut"), this.isDown && (this.hitAsset == this.downAsset ? this.dispatchGestureOut(this.hitAsset, this.hitAsset, "dragOutThis") : this.dispatchGestureDragOutThis(null, this.hitAsset, "dragOutThis"), this.dispatchGestureOut(this.hitAsset, this.hitAsset, "dragOut"))),
                        this.gestures.group1.mouseUp && this.downAsset && this.dispatchGesture(this.downAsset, this.downAsset, "releaseOutside"));
                    this.hitAsset = a;
                    this.gestures.group1.mouseUp ? (this.unmarkDownContainers(), this.downContainers = [], this.downAsset = void 0) : b && (this.downAsset = b);
                    this.unmarkHitContainers();
                    this.hitContainers = [];
                    this.unmarkOutContainers();
                    this.outContainers = [];
                    this.__gestureOccured = !1;
                    this.__touchEndOccured && (this.gesturePoint = { x: void 0, y: void 0 }, this.__touchEndOccured = !1);
                    this.gestures = {
                        group1: {},
                        group2: {},
                        group3: {}
                    }
                }
            },
            dispatchGestureGroup: function(a, b, c) { var d = b.parent; if (d) { for (var e in c) b.dispatchEvent(e, { target: a });
                    d.isContainer && this.dispatchGestureGroup(a, d, c) } },
            dispatchGesture: function(a, b, c) { var d = b.parent;
                d && (b.dispatchEvent(c, { target: a }), d.isContainer && this.dispatchGesture(a, d, c)) },
            dispatchGestureOver: function(a, b, c) { var d = b.parent;
                d && (b.dispatchEvent(c, { target: a }), d.isContainer && !d.hasOutAsset && this.dispatchGestureOver(a, d, c)) },
            dispatchGestureOut: function(a, b, c) {
                var d = b.parent;
                d && (b.dispatchEvent(c, { target: a }), d.isContainer && !d.hasHitAsset && this.dispatchGestureOut(a, d, c))
            },
            dispatchGestureDragOutThis: function(a, b, c) {
                (b = b.parent) && b.isContainer && (b.hasDownAsset && !b.hasHitAsset && (a || (a = b), b.dispatchEvent(c, { target: a })), this.dispatchGestureDragOutThis(a, b, c)) },
            dispatchGestureClick: function(a, b, c) {
                (b = b.parent) && b.isContainer && (b.hasDownAsset && (a || (a = b), b.dispatchEvent(c, { target: a })), this.dispatchGestureClick(a, b, c)) },
            dispatchGestureReleaseOutside: function(a, b, c) {
                var d = b.parent;
                d && (b.isContainer &&
                    !b.hasHitAsset || a == b) && (b.dispatchEvent(c, { target: a }), this.dispatchGestureReleaseOutside(a, d, c))
            },
            getMousePoint: function(a) { var b = this.__canvas.getBoundingClientRect(); return { x: this.pixelRatio * (a.clientX - b.left), y: this.pixelRatio * (a.clientY - b.top) } },
            getTouchPoint: function(a) { a.preventDefault(); var b = this.__canvas.getBoundingClientRect();
                a = a.targetTouches[0]; return { x: this.pixelRatio * (a.clientX - b.left), y: this.pixelRatio * (a.clientY - b.top) } },
            saveDownTime: function(a) { this.__downTime = (new Date).getTime() },
            detectFastClick: function(a) {
                (new Date).getTime() - this.__downTime < this.fastClickTime && a.currentTarget.dispatchEvent("fastClick", { target: a.target }) },
            listenFastClickOn: function(a, b) { 1 == arguments.length || b ? (a.addEventListener("mouseDown", this, "saveDownTime"), a.addEventListener("click", this, "detectFastClick")) : (a.removeEventListener("mouseDown", this, "saveDownTime"), a.removeEventListener("click", this, "detectFastClick")) },
            listenMouseMotion: function(a) {
                a.currentTarget.addEventListener("mouseMove", this, "detectMouseMotion");
                a.currentTarget.addEventListener("mouseOut", this, "detectMouseMotion");
                this.__clickWithoutMouseMotion = !0
            },
            detectMouseMotion: function(a) { a.currentTarget.removeEventListener("mouseMove", this, "detectMouseMotion");
                a.currentTarget.removeEventListener("mouseOut", this, "detectMouseMotion");
                this.__clickWithoutMouseMotion = !1 },
            detectPointClick: function(a) { a.currentTarget.removeEventListener("mouseMove", this, "detectMouseMotion");
                this.__clickWithoutMouseMotion && a.currentTarget.dispatchEvent("pointClick", { target: a.target }) },
            listenPointClickOn: function(a, b) { 1 == arguments.length || b ? (a.addEventListener("mouseDown", this, "listenMouseMotion"), a.addEventListener("click", this, "detectPointClick")) : (a.removeEventListener("mouseDown", this, "listenMouseMotion"), a.removeEventListener("click", this, "detectPointClick")) },
            detectDbClick: function(a) {
                for (var b = !1, c = a.currentTarget, d, e = (new Date).getTime(), f = this.__dbClickCandidates.length; f--;)
                    if (this.__dbClickCandidates[f].layer === c) { d = f;
                        b = !0; break }
                b ? e - this.__dbClickCandidates[d].downTime <
                    this.dbClickTime ? (c.dispatchEvent("dbClick", { target: a.target }), this.__dbClickCandidates.splice(d, 1)) : this.__minDbClickDownTime = this.__dbClickCandidates[d].downTime = e : (e - this.__minDbClickDownTime > this.dbClickTime && (this.__minDbClickDownTime = e, this.__dbClickCandidates.length = 0), this.__dbClickCandidates.push({ layer: c, downTime: e }))
            },
            listenDbClickOn: function(a, b) { 1 == arguments.length || b ? a.addEventListener("mouseDown", this, "detectDbClick") : a.removeEventListener("mouseDown", this, "detectDbClick") },
            get canvasID() { return this.__canvasID },
            set canvasID(a) { this.canvas = document.getElementById(a) },
            get canvas() { return this.__canvas },
            set canvas(a) {
                if (this.__canvas !== a) {
                    this.__canvas && (this.__canvas.width = this.__width, F.__instanceByCanvas.delete(this.__canvas));
                    var b = F.__instanceByCanvas.get(a);
                    b && b.isolate();
                    this.__canvasID = a.id;
                    this.__canvas = a;
                    this.__context = a.getContext("2d");
                    this.__width = a.width;
                    this.__height = a.height;
                    this.__container && (this.__container.setContext(this.__context), this.__container.parent = this, this.__container.setStage(this));
                    F.__instanceByCanvas.set(a, this)
                }
            },
            get container() { return this.__container },
            set container(a) { this.__container && this.__container.isolate();
                a.isContainer && (this.__context && a.setContext(this.__context), a.parent = this, this.__container = a, a.setStage(this)) },
            get width() { return this.__width },
            set width(a) { this.__width = this.__canvas.width = a },
            get height() { return this.__height },
            set height(a) { this.__height = this.__canvas.height = a },
            get metronome() { return this.__metronome },
            set metronome(a) {
                this.__metronome && this.__metronome.removeUpdateListener(this,
                    "draw");
                a.addUpdateListener(this, "draw");
                this.__metronome = a
            },
            get cornerRadius() { return this.__cornerRadius },
            set cornerRadius(a) {
                if (0 < a) {
                    var b = document.createElement("canvas");
                    b.width = b.height = a;
                    var c = b.getContext("2d");
                    c.fillStyle = "rgb(0,0,0)";
                    c.beginPath();
                    c.moveTo(0, 0);
                    c.lineTo(a, 0);
                    c.arcTo(0, 0, 0, a, a);
                    c.lineTo(0, 0);
                    c.fill();
                    this.__cornerTL = b;
                    b = document.createElement("canvas");
                    b.width = b.height = a;
                    c = b.getContext("2d");
                    c.fillStyle = "rgb(0,0,0)";
                    c.beginPath();
                    c.moveTo(0, 0);
                    c.lineTo(a, 0);
                    c.lineTo(a, a);
                    c.arcTo(a, 0, 0, 0, a);
                    c.fill();
                    this.__cornerTR = b;
                    b = document.createElement("canvas");
                    b.width = b.height = a;
                    c = b.getContext("2d");
                    c.fillStyle = "rgb(0,0,0)";
                    c.beginPath();
                    c.moveTo(a, 0);
                    c.lineTo(a, a);
                    c.lineTo(0, a);
                    c.arcTo(a, a, a, 0, a);
                    c.fill();
                    this.__cornerBR = b;
                    b = document.createElement("canvas");
                    b.width = b.height = a;
                    c = b.getContext("2d");
                    c.fillStyle = "rgb(0,0,0)";
                    c.beginPath();
                    c.moveTo(0, 0);
                    c.lineTo(0, a);
                    c.lineTo(a, a);
                    c.arcTo(0, a, 0, 0, a);
                    c.fill();
                    this.__cornerBL = b;
                    this.__cornerRadius = a
                }
            },
            drawNormal: function() {
                this.__canvas.width =
                    this.__width;
                this.__container.calc();
                this.__container.draw();
                this.listenPassiveGestures && (this.__gestureOccured = !0, this.gestures.group2.mouseOver = !0, this.gestures.group2.mouseOut = !0);
                if (this.__cornerRadius) {
                    var a = this.__canvas.width,
                        b = this.__canvas.height,
                        c = this.__cornerRadius;
                    this.__context.save();
                    this.__context.globalCompositeOperation = "destination-out";
                    this.__context.drawImage(this.__cornerTL, 0, 0);
                    this.__context.drawImage(this.__cornerTR, a - c, 0);
                    this.__context.drawImage(this.__cornerBR, a - c, b - c);
                    this.__context.drawImage(this.__cornerBL, 0, b - c);
                    this.__context.restore()
                }
            },
            drawTweenSize: function() { this.__canvas.height = this.__height;
                this.drawNormal() },
            tweenSize: function(a, b, c, d, e) { this.draw = this.drawTweenSize; var f = this,
                    g = {},
                    h = {},
                    t = v.ref;
                isNaN(a) || (g.__width = a);
                isNaN(b) || (g.__height = b);
                ca.run(this, g, c, d, e || this.metronome).onComplete = function() { f.draw = f.drawNormal; if (h.hasOwnProperty("onComplete")) h.onComplete();
                    t.end() }; return h },
            isolate: function() {
                this.__canvas.width = this.__width;
                F.__instanceByCanvas.delete(this.__canvas);
                this.__container && this.__container.isolate();
                this.__canvasID = this.__canvas = this.__context = this.__width = null
            },
            $: function() { this.__metronome.ensureNextTickUpdate() }
        };
        (function() { var a = document.createElement("canvas");
            a.width = a.height = 1;
            F.PIXEL = a.getContext("2d") })();
        F.__instanceByCanvas = new V;
        Ia.prototype = {
            className: "CanvasCompositionWrapper",
            superclassName: "Object",
            constructor: Ia,
            get stage() { return this.__stage },
            set stage(a) { a.canvas = this.canvas;
                a.pixelRatio = this.pixelRatio;
                this.__stage = a;
                this.resize() },
            resize: function() { var a = this.__stage;
                a.width = this.pixelRatio * this.webElement.clientWidth;
                a.height = this.pixelRatio * this.webElement.clientHeight;
                a.$() }
        };
        Da.prototype = {
            className: "ImageLayer",
            superclassName: "CanvasLayer",
            constructor: Da,
            get src() { return this.image.src },
            set src(a) {
                function b() {
                    d.draw = d.drawImage;
                    d.sx = d.sx && 0 < d.sx && d.sx < e.width ? d.sx : 0;
                    d.sy = d.sy && 0 < d.sy && d.sy < e.height ? d.sy : 0;
                    d.width = d.sw = d.sw && d.sw <= e.width - d.sx && 0 < d.sw ? d.sw : e.width - d.sx;
                    d.height = d.sh = d.sh && d.sh <= e.height - d.sy && 0 < d.sh ? d.sh :
                        e.height - d.sy;
                    this.isLoading = !1;
                    if (d.hasOwnProperty("onLoad")) d.onLoad();
                    d.dispatchEvent("load");
                    c.end()
                }
                var c = v.ref,
                    d = this,
                    e;
                a instanceof Image ? (e = this.image = a, e.complete ? b() : e.onload = b) : a instanceof HTMLCanvasElement ? (e = this.image = a, b()) : (this.isLoading = !0, e = this.image = new Image, e.onload = b, e.src = a)
            },
            load: function(a) { this.src = a },
            setContext: function(a) { this.__context = a },
            setStage: function(a) { this.__stage = a; if (this.onDisplayed && a) this.onDisplayed() },
            calc: function() {
                this.matrixLocal = m.get(this.x, this.y,
                    this.rotation, this.scaleX, this.scaleY);
                this.matrixGlobal = m.multiply(this.parent.matrixGlobal, this.matrixLocal)
            },
            calcOwnMatrices: this.calc,
            drawImage: function() { var a = this.__context;
                a.save();
                m.setTransform(a, this.matrixGlobal);
                a.globalAlpha *= this.alpha;
                a.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, -this.originX, -this.originY, this.width, this.height);
                a.restore() },
            drawNothing: function() {},
            isolate: function() { this.__context = this.__stage = this.parent = null },
            copy: function(a) {
                var b = na.call(this);
                if (this.isLoading) b.load(this.src);
                else if (a && !this.image) { var c = this;
                    this.addEventListener("load", function(a) { b.load(c.src) }) }
                return b
            },
            hitTest: function(a, b) {
                var c = this.__context;
                m.setTransform(c, this.matrixGlobal);
                c.beginPath();
                c.rect(-this.originX, -this.originY, this.width, this.height);
                var d = c.isPointInPath(a, b);
                c.closePath();
                d && this.useDeepHitTest && (c = F.PIXEL, c.save(), m.setMovedTransform(c, this.matrixGlobal, -a, -b), c.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, -this.originX, -this.originY, this.width, this.height), d = Boolean(c.getImageData(0,
                    0, 1, 1).data[3]), c.restore(), d && c.clearRect(0, 0, 2, 2));
                return d
            }
        };
        Da.OWN_PROPS = p.concat("image draw width height sx sy sw sh useDeepHitTest isLoading".split(" "));
        Aa.prototype = {
            className: "AtlasImageLayer",
            superclassName: "CanvasLayer",
            constructor: Aa,
            get imageName() { return this.__imageName },
            set imageName(a) { if (this.__atlasData && this.__atlasData.loaded) { var b = this.__atlasData.frames[a];
                    b && (this.width = b.frame.w, this.height = b.frame.h) }
                this.__imageName = a },
            get atlasData() { return this.__atlasData },
            set atlasData(a) {
                if (this.__imageName &&
                    a.loaded) { var b = a.frames[this.__imageName];
                    b && (this.width = b.frame.w, this.height = b.frame.h) }
                this.__atlasData = a
            },
            setContext: function(a) { this.__context = a },
            setStage: function(a) { this.__stage = a; if (this.onDisplayed && a) this.onDisplayed() },
            calc: function() { this.matrixLocal = m.get(this.x, this.y, this.rotation, this.scaleX, this.scaleY);
                this.matrixGlobal = m.multiply(this.parent.matrixGlobal, this.matrixLocal) },
            calcOwnMatrices: this.calc,
            drawImage: function() {
                var a = this.__context;
                a.save();
                m.setTransform(a, this.matrixGlobal);
                a.globalAlpha *= this.alpha;
                var b = this.__atlasData.frames[this.__imageName].frame;
                a.drawImage(this.__atlasData.image, b.x, b.y, b.w, b.h, -this.originX, -this.originY, this.width, this.height);
                a.restore()
            },
            drawNothing: function() {},
            isolate: function() { this.__context = this.__stage = this.parent = null },
            copy: na,
            hitTest: function(a, b) {
                var c = this.__context;
                m.setTransform(c, this.matrixGlobal);
                c.beginPath();
                c.rect(-this.originX, -this.originY, this.width, this.height);
                var d = c.isPointInPath(a, b);
                c.closePath();
                d && this.useDeepHitTest &&
                    (c = F.PIXEL, c.save(), m.setMovedTransform(c, this.matrixGlobal, -a, -b), d = this.__atlasData.frames[this.__imageName].frame, c.drawImage(this.__atlasData.image, d.x, d.y, d.w, d.h, -this.originX, -this.originY, this.width, this.height), d = Boolean(c.getImageData(0, 0, 1, 1).data[3]), c.restore(), d && c.clearRect(0, 0, 2, 2));
                return d
            }
        };
        Aa.OWN_PROPS = p.concat("draw width height __atlasData __imageName useDeepHitTest".split(" "));
        ua.prototype = {
            className: "AtlasFilmLayer",
            superclassName: "CanvasLayer",
            constructor: ua,
            get totalFrames() { return this.__totalFrames },
            setContext: function(a) { this.__context = a },
            setStage: function(a) { this.__stage = a; if (this.onDisplayed && a) this.onDisplayed() },
            get fps() { return this.__fps },
            set fps(a) { isNaN(a) || 0 >= a ? this.isPlayed && this.__fps ? (this.__stopChangingIndex(), this.__fps = 0, this.__startChangingIndex()) : this.__fps = 0 : this.isPlayed ? this.__fps ? (this.__fpsTimer.delay = 1E3 / a, this.__fps = a) : (this.__stopChangingIndex(), this.__fps = a, this.__startChangingIndex()) : this.__fps = a },
            loseQueue: function() { this.queue = v.REF_DEFAULT },
            setNextIndex: function() {
                this.frameIndex =
                    this.frameIndex < this.__totalFrames - 1 ? this.frameIndex + 1 : 0
            },
            setPrevIndex: function() { this.frameIndex = this.frameIndex ? this.frameIndex - 1 : this.__totalFrames - 1 },
            setNextIndexStretch: function() {--this.__stretchCount || (this.__stretchCount = this.__stretchRatio, this.setNextIndex()) },
            setPrevIndexStretch: function() {--this.__stretchCount || (this.__stretchCount = this.__stretchRatio, this.setPrevIndex()) },
            handleDestinationFrameTo: function() {
                if (this.__removeInTheEnd) { var a = this.__stage;
                    this.parent.removeChild(this);
                    a.$() } else this.__stopChangingIndex();
                this.queue.end()
            },
            setNextIndexTo: function() { this.frameIndex == this.__destinationFrameIndex ? this.handleDestinationFrameTo() : this.setNextIndex() },
            setPrevIndexTo: function() { this.frameIndex == this.__destinationFrameIndex ? this.handleDestinationFrameTo() : this.setPrevIndex() },
            setNextIndexToStretch: function() {--this.__stretchCount || (this.__stretchCount = this.__stretchRatio, this.setNextIndexTo()) },
            setPrevIndexToStretch: function() {--this.__stretchCount || (this.__stretchCount = this.__stretchRatio, this.setPrevIndexTo()) },
            handleDestinationFrameFromTo: function() { 0 === this.__repeatsNumber || --this.__repeatsNumber ? this.frameIndex = this.__startIndex : this.handleDestinationFrameTo() },
            setNextIndexFromTo: function() { this.frameIndex == this.__destinationFrameIndex ? this.handleDestinationFrameFromTo() : this.setNextIndex() },
            setPrevIndexFromTo: function() { this.frameIndex == this.__destinationFrameIndex ? this.handleDestinationFrameFromTo() : this.setPrevIndex() },
            setNextIndexFromToStretch: function() {
                --this.__stretchCount || (this.__stretchCount =
                    this.__stretchRatio, this.setNextIndexFromTo())
            },
            setPrevIndexFromToStretch: function() {--this.__stretchCount || (this.__stretchCount = this.__stretchRatio, this.setPrevIndexFromTo()) },
            nextFrame: function() { this.__stage && this.frameIndex < this.__totalFrames - 1 && (this.frameIndex++, this.__stage.$()) },
            prevFrame: function() { this.__stage && this.frameIndex && (this.frameIndex--, this.__stage.$()) },
            __delayedStartChangingIndex: function() {
                this.__stage.metronome.addListener(this, this.__changeIndexMethodName);
                this.__stage.metronome.removeListener(this,
                    "__delayedStartChangingIndex")
            },
            __noNewIndexInThisFrame: function() { this[this.__changeIndexMethodName] = this.__changeIndexBufferMethod },
            __startChangingIndex: function() {
                this.matrixLocal || (this.__changeIndexBufferMethod = this[this.__changeIndexMethodName], this[this.__changeIndexMethodName] = this.__noNewIndexInThisFrame);
                this.__fps ? this.isPlayed || (this.__fpsTimer = this.__stage.metronome.addTimerListener(this, this.__changeIndexMethodName, 1E3 / this.__fps)) : this.__stage.metronome.addListener(this, this.__changeIndexMethodName);
                this.isPlayed = !0
            },
            __stopChangingIndex: function() { this.__fps ? (this.__stage.metronome.removeListener(this.__fpsTimer), this.__fpsTimer = null) : this.__stage.metronome.removeListener(this, this.__changeIndexMethodName);
                this.isPlayed = !1 },
            __startPlayback: function(a) {
                this.loseQueue();
                a ? (this.__stretchRatio = isNaN(a.stretch) && 1 > a.stretch ? 1 : Math.ceil(a.stretch), 1 < this.__stretchRatio ? (this.__stretchCount = this.__stretchRatio, a = !0 === a.reverse ? "setPrevIndexStretch" : "setNextIndexStretch") : a = !0 === a.reverse ? "setPrevIndex" :
                    "setNextIndex") : a = "setNextIndex";
                this.isPlayed && this.__changeIndexMethodName != a && this.__stopChangingIndex();
                this.__changeIndexMethodName = a;
                this.__startChangingIndex()
            },
            play: function(a) { this.__stage && this.__startPlayback(a) },
            playFrom: function(a, b) { this.__stage && (this.frameIndex = a, this.__startPlayback(b)) },
            playTo: function(a, b) {
                if (this.__stage) {
                    this.queue = v.ref;
                    var c = this.frameIndex;
                    b ? (this.__removeInTheEnd = b.remove, this.__stretchRatio = isNaN(b.stretch) && 1 > b.stretch ? 1 : Math.ceil(b.stretch), 1 < this.__stretchRatio ?
                        (this.__stretchCount = this.__stretchRatio, c = c > a && !1 !== b.reverse || c < a && !0 === b.reverse ? "setPrevIndexToStretch" : "setNextIndexToStretch") : c = c > a && !1 !== b.reverse || c < a && !0 === b.reverse ? "setPrevIndexTo" : "setNextIndexTo") : (this.__removeInTheEnd = !1, this.__stretchRatio = 1, c = c > a ? "setPrevIndexTo" : "setNextIndexTo");
                    this.isPlayed && this.__changeIndexMethodName != c && this.__stopChangingIndex();
                    this.__changeIndexMethodName = c;
                    this.__destinationFrameIndex = a;
                    this.__startChangingIndex()
                }
            },
            playToTheEnd: function(a) {
                this.playTo(this.__totalFrames -
                    1, a)
            },
            playToTheBeginning: function(a) { this.playTo(0, a) },
            playFromTo: function(a, b, c) {
                this.__stage && (this.queue = v.ref, this.frameIndex = this.__startIndex = a, c ? (this.__removeInTheEnd = c.remove, this.__repeatsNumber = isNaN(c.repeats) ? 1 : Math.ceil(Math.abs(c.repeats)), this.__stretchRatio = isNaN(c.stretch) && 1 > c.stretch ? 1 : Math.ceil(c.stretch), 1 < this.__stretchRatio ? (this.__stretchCount = this.__stretchRatio, a = a > b && !1 !== c.reverse || a < b && !0 === c.reverse ? "setPrevIndexFromToStretch" : "setNextIndexFromToStretch") : a = a > b && !1 !==
                    c.reverse || a < b && !0 === c.reverse ? "setPrevIndexFromTo" : "setNextIndexFromTo") : (this.__removeInTheEnd = !1, this.__stretchRatio = this.__repeatsNumber = 1, a = a > b ? "setPrevIndexFromTo" : "setNextIndexFromTo"), this.isPlayed && this.__changeIndexMethodName != a && this.__stopChangingIndex(), this.__changeIndexMethodName = a, this.__destinationFrameIndex = b, this.__startChangingIndex())
            },
            stop: function() { this.__stage && (this.loseQueue(), this.isPlayed && this.__stopChangingIndex()) },
            goto: function(a) {
                this.__stage && (this.loseQueue(), this.__stopChangingIndex(),
                    this.frameIndex = a, this.__stage.$())
            },
            calc: function() { this.matrixLocal = m.get(this.x, this.y, this.rotation, this.scaleX, this.scaleY);
                this.matrixGlobal = m.multiply(this.parent.matrixGlobal, this.matrixLocal) },
            calcOwnMatrices: this.calc,
            drawFrame: function() {
                var a = this.__context;
                a.save();
                m.setTransform(a, this.matrixGlobal);
                a.globalAlpha *= this.alpha;
                var b = this.__atlasData.frames[this.__atlasFilmData.frames[this.frameIndex]];
                if (b) {
                    var c = b.frame,
                        b = b.spriteSourceSize;
                    a.drawImage(this.__atlasData.image, c.x, c.y,
                        c.w, c.h, b.x - this.originX, b.y - this.originY, c.w, c.h);
                    this.frameWidth = c.w;
                    this.frameHeight = c.h;
                    this.frameTrimTop = b.y;
                    this.frameTrimLeft = b.x
                }
                a.restore()
            },
            drawNothing: function() {},
            isolate: function() { this.__wasPlayingBeforeRemoving = this.isPlayed;
                this.stop();
                this.matrixLocal = void 0;
                this.__context = this.__stage = this.parent = null },
            onDisplayed: function() { this.__wasPlayingBeforeRemoving && this.__startChangingIndex() },
            copy: function() {
                var a = new this.constructor(this.__atlasData, this.__atlasFilmData),
                    b = this.constructor.OWN_PROPS;
                for (i = b.length; i--;) a[b[i]] = this[b[i]];
                a.listeners = {};
                for (var c in this.listeners) a.listeners[c] = this.listeners[c].slice();
                (b = oa.of(this)) && b.addTo(a);
                this.isPlayed && (a.__wasPlayingBeforeRemoving = !0);
                return a
            },
            set atlasData(a) { this.__atlasData = a },
            get atlasData() { return this.__atlasData },
            set atlasFilmData(a) { this.__totalFrames = a && a.frames ? a.frames.length : void 0;
                this.__atlasFilmData = a },
            get atlasFilmData() { return this.__atlasFilmData },
            hitTest: function(a, b) {
                var c = this.__context;
                m.setTransform(c, this.matrixGlobal);
                c.beginPath();
                c.rect(this.frameTrimLeft - this.originX, this.frameTrimTop - this.originY, this.frameWidth, this.frameHeight);
                var d = c.isPointInPath(a, b);
                c.closePath();
                if (d && this.useDeepHitTest) {
                    var e = this.__atlasData.frames[this.__atlasFilmData.frames[this.frameIndex]];
                    e && (c = F.PIXEL, c.save(), m.setMovedTransform(c, this.matrixGlobal, -a, -b), d = e.frame, c.drawImage(this.__atlasData.image, d.x, d.y, d.w, d.h, this.frameTrimLeft - this.originX, this.frameTrimTop - this.originY, this.frameWidth, this.frameHeight), d = Boolean(c.getImageData(0,
                        0, 1, 1).data[3]), c.restore(), d && c.clearRect(0, 0, 2, 2))
                }
                return d
            }
        };
        ua.OWN_PROPS = p.concat("__atlasData __atlasFilmData __totalFrames __autoRemove __changeIndexMethodName __startIndex __destinationFrameIndex __removeInTheEnd __repeatsNumber __stretchRatio __stretchCount frameWidth frameHeight __wasPlayingBeforeRemoving frameTrimTop frameTrimLeft frameIndex draw useDeepHitTest __fps".split(" "));
        Y.prototype = {
            className: "StyleObject",
            superclassName: "Object",
            constructor: Y,
            clone: function() { return new Y(this.props) },
            mix: function(a, b, c) { 3 > arguments.length && (!0 == c, 2 > arguments.length && (b = !0)); var d = this.props,
                    e = a.props,
                    f, g, h; if (c)
                    for (f in e)
                        if (g = d[f], b) { if (void 0 != h && null != h || !d.hasOwnProperty(f)) d[f] = h } else { if (void 0 == g || null == g) d[f] = h }
                else
                    for (f in e)
                        if (d.hasOwnProperty(f))
                            if (g = d[f], h = e[f], b) void 0 != h && null != h && (d[f] = h);
                            else if (void 0 == g || null == g) d[f] = h },
            setValue: function(a) { var b = this.props;
                a = a.props; for (var c in b) b[c] == a.hasOwnProperty(c) ? a[c] : void 0 }
        };
        Y.getDefaultTextStyle = function() {
            return new Y({
                font: "sans-serif",
                size: 12,
                color: "rgba(0,0,0,1)",
                align: "start",
                baseline: "hanging",
                bold: !1,
                italic: !1,
                strokeWidth: 0,
                strokeColor: "rgba(0,0,0,1)",
                strokeCap: "butt",
                strokeJoin: "miter",
                strokeMiterLimit: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
                shadowColor: "rgba(0,0,0,0)"
            })
        };
        aa.prototype = {
            className: "TextLayer",
            superclassName: "CanvasLayer",
            constructor: aa,
            get text() { return this.__text },
            set text(a) { this.__text = a;
                this.calculateText();
                this.measureWidth();
                this.measureHeight() },
            get font() { return this.__style.props.font },
            set font(a) {
                this.__style.props.font =
                    a;
                this.__textWidth && this.__text.length && this.calculateText();
                this.measureWidth();
                this.measureHeight()
            },
            get size() { return this.__style.props.size },
            set size(a) { this.__style.props.size = a;
                this.__textWidth && this.__text.length && this.calculateText();
                this.measureWidth();
                this.measureHeight() },
            get bold() { return this.__style.props.bold },
            set bold(a) {
                this.__style.props.bold = a;
                this.__boldItalic = (a ? "bold " : "") + (this.__style.props.italic ? "italic " : "");
                this.__textWidth && this.__text.length && this.calculateText();
                this.measureWidth();
                this.measureHeight()
            },
            get italic() { return this.__style.props.italic },
            set italic(a) { this.__style.props.italic = a;
                this.__boldItalic = (this.__style.props.bold ? "bold " : "") + (a ? "italic " : "");
                this.__textWidth && this.__text.length && this.calculateText();
                this.measureWidth();
                this.measureHeight() },
            get align() { return this.__style.props.align },
            set align(a) { this.__style.props.align = a;
                this.__textWidth && this.__text.length && this.calculateText();
                this.measureWidth();
                this.measureHeight() },
            get baseline() { return this.__style.props.baseline },
            set baseline(a) { this.__style.props.baseline = a },
            get strokeWidth() { return this.__style.props.strokeWidth },
            set strokeWidth(a) { this.__style.props.strokeWidth = a },
            get strokeCap() { return this.__style.props.strokeCap },
            set strokeCap(a) { this.__style.props.strokeCap = a },
            get strokeJoin() { return this.__style.props.strokeJoin },
            set strokeJoin(a) { this.__style.props.strokeJoin = a },
            get strokeMiterLimit() { return this.__style.props.strokeMiterLimit },
            set strokeMiterLimit(a) { this.__style.props.strokeMiterLimit = a },
            get shadowOffsetX() { return this.__style.props.shadowOffsetX },
            set shadowOffsetX(a) { this.__style.props.shadowOffsetX = a },
            get shadowOffsetY() { return this.__style.props.shadowOffsetY },
            set shadowOffsetY(a) { this.__style.props.shadowOffsetY = a },
            get shadowBlur() { return this.__style.props.shadowBlur },
            set shadowBlur(a) { this.__style.props.shadowBlur = a },
            get lineSpacing() { return this.__lineSpacing },
            set lineSpacing(a) { this.__lineSpacing = a;
                this.measureHeight() },
            get multiline() { return this.__multiline },
            set multiline(a) {
                this.__textWidth ? (this.measureWidth = this.measureBoundedWidth,
                    a ? (this.measureHeight = this.measureMultilineHeight, this.calculateText = this.calculateBoundedMultiline, this.fill = this.fillMultiline, this.stroke = this.strokeMultiline, !this.__multiline && this.__text.length && this.calculateText()) : (this.measureHeight = this.measureLineHeight, this.calculateText = this.calculateBoundedLine, this.fill = this.fillBoundedLine, this.stroke = this.strokeBoundedLine)) : a ? (this.measureWidth = this.measureMultilineWidth, this.measureHeight = this.measureMultilineHeight, this.calculateText = this.calculateMultiline,
                    this.fill = this.fillMultiline, this.stroke = this.strokeMultiline, !this.__multiline && this.__text.length && this.calculateText()) : (this.measureWidth = this.measureLineWidth, this.measureHeight = this.measureLineHeight, this.calculateText = ba, this.fill = this.fillLine, this.stroke = this.strokeLine);
                this.__multiline = a;
                this.measureWidth();
                this.measureHeight()
            },
            get textWidth() { return this.__width },
            set textWidth(a) {
                var b = this.__textWidth;
                this.__textWidth = isNaN(a) ? 0 : Math.abs(a);
                this.__multiline ? (this.measureHeight = this.measureMultilineHeight,
                    this.fill = this.fillMultiline, this.stroke = this.strokeMultiline, a ? (this.measureWidth = this.measureBoundedWidth, this.calculateText = this.calculateBoundedMultiline, this.__text.length && this.calculateText()) : (this.measureWidth = this.measureMultilineWidth, this.calculateText = this.calculateMultiline, b && this.__text.length && this.calculateText())) : (this.measureHeight = this.measureLineHeight, a ? (this.measureWidth = this.measureBoundedWidth, this.calculateText = this.calculateBoundedLine, this.fill = this.fillBoundedLine, this.stroke =
                    this.strokeBoundedLine, this.__text.length && this.calculateText()) : (this.measureWidth = this.measureLineWidth, this.calculateText = ba, this.fill = this.fillLine, this.stroke = this.strokeLine));
                this.measureWidth();
                this.measureHeight()
            },
            get textHeight() { return this.__height },
            get style() { var a = this.__style.props;
                a.color = this.color;
                a.strokeColor = this.strokeColor;
                a.shadowColor = this.shadowColor; return this.__style },
            set style(a) {
                this.__style.setValue(a);
                this.color = this.__style.props.color;
                this.strokeColor = this.__style.props.strokeColor;
                this.shadowColor = this.__style.props.shadowColor;
                this.__textWidth && this.calculateText();
                this.measureWidth();
                this.measureHeight()
            },
            addStyle: function(a, b) { this.__style.mix(a, b, !1);
                this.__textWidth && this.calculateText();
                this.measureWidth();
                this.measureHeight() },
            setupStroke: function(a) { a.lineWidth = this.__style.props.strokeWidth;
                a.lineJoin = this.__style.props.strokeJoin;
                a.strokeStyle = this.strokeColor },
            fillLine: function(a) { a.fillText(this.__text, -this.originX, -this.originY) },
            strokeLine: function(a) {
                this.__style.props.strokeWidth &&
                    (this.setupStroke(a), a.strokeText(this.__text, -this.originX, -this.originY))
            },
            fillBoundedLine: function(a) { a.fillText(this.lines[0], -this.originX, -this.originY) },
            strokeBoundedLine: function(a) { this.__style.props.strokeWidth && (this.setupStroke(a), a.strokeText(this.lines[0], -this.originX, -this.originY)) },
            fillMultiline: function(a) { for (var b = 0, c = this.lines.length; b < c; b++) a.fillText(this.lines[b], -this.originX, b * this.__lineSpacing - this.originY) },
            strokeMultiline: function(a) {
                this.setupStroke(a);
                for (var b = 0,
                        c = this.lines.length; b < c; b++) a.strokeText(this.lines[b], -this.originX, b * this.__lineSpacing - this.originY)
            },
            measureBoundedWidth: function() { this.__width = this.__textWidth },
            measureLineWidth: function() { var a = aa.RULER;
                this.prepareMeasureWidth(a);
                this.__width = a.measureText(this.__text).width;
                a = this.align;
                this.__alignOffsetX = "start" == a || "left" == a ? 0 : "center" == a ? -this.__width / 2 : -this.__width },
            measureMultilineWidth: function() {
                var a = aa.RULER;
                this.prepareMeasureWidth(a);
                for (var b = this.__width = 0, c = this.lines.length; b <
                    c; b++) this.__width = Math.max(this.__width, a.measureText(this.lines[b]).width);
                this.measureAlignOffsetX(this.align)
            },
            measureAlignOffsetX: function(a) { this.__alignOffsetX = "start" == a || "left" == a ? 0 : "center" == a ? -this.__width / 2 : -this.__width },
            prepareMeasureWidth: function(a) { a.font = this.__boldItalic + this.__style.props.size + "px " + this.__style.props.font;
                a.textAlign = this.__style.props.align;
                a.textBaseline = this.__style.props.baseline },
            measureLineHeight: function() { this.__height = 1.03 * this.size },
            measureMultilineHeight: function() {
                this.__height =
                    this.__lineSpacing * (this.lines.length - 1) + 1.03 * this.size
            },
            calculateBoundedLine: function() { var a = aa.RULER;
                this.lines.length = 1;
                this.lines[0] = ""; var b = this.__text.split(" "),
                    c = "",
                    d = 0,
                    e = b.length; for (this.prepareMeasureWidth(a); a.measureText(c).width <= this.__textWidth && d < e;) this.lines[0] = c, c += b[d++] + " " },
            calculateMultiline: function() { this.lines = this.__text.split("\n") },
            calculateBoundedMultiline: function() {
                var a = aa.RULER;
                this.lines.length = 0;
                var b = this.__text.split("\n"),
                    c, d, e, f, g = 0,
                    h, t;
                this.prepareMeasureWidth(a);
                e = 0;
                for (stringsTotal = b.length; e < stringsTotal; e++) { c = b[e].split(" ");
                    this.lines[g] = d = "";
                    h = f = -1; for (t = c.length; f < t;) a.measureText(d).width > this.__textWidth ? (h && f--, h = -1, this.lines[++g] = d = "") : (this.lines[g] = d, d += c[++f] + " ", h++);
                    g++ }
            },
            calc: function() { this.matrixLocal = m.get(this.x, this.y, this.rotation, this.scaleX, this.scaleY);
                this.matrixGlobal = m.multiply(this.parent.matrixGlobal, this.matrixLocal) },
            calcOwnMatrices: this.calc,
            drawNormal: function() {
                var a = this.__context;
                a.save();
                m.setTransform(a, this.matrixGlobal);
                a.globalAlpha *= this.alpha;
                a.font = this.__boldItalic + this.__style.props.size + "px " + this.__style.props.font;
                a.textAlign = this.__style.props.align;
                a.textBaseline = this.__style.props.baseline;
                a.fillStyle = this.color;
                this.strokeOverFill ? (this.fill(a), this.__style.props.strokeWidth && this.stroke(a)) : (this.__style.props.strokeWidth && this.stroke(a), this.fill(a));
                a.restore()
            },
            drawCached: function() {},
            setContext: function(a) { this.__context = a },
            setStage: function(a) { this.__stage = a; if (this.onDisplayed && a) this.onDisplayed() },
            isolate: function() { this.__context = this.__stage = this.parent = null },
            copy: function() { var a = na.call(this);
                a.lines = this.lines.slice(); return a },
            onAdded: function() { this.measureWidth();
                this.measureHeight() },
            hitTest: function(a, b) {
                var c = this.__context;
                m.setTransform(c, this.matrixGlobal);
                c.beginPath();
                c.rect(this.__alignOffsetX - this.originX, -this.originY, this.__width, this.__height);
                var d = c.isPointInPath(a, b);
                c.closePath();
                d && this.useDeepHitTest && (c = F.PIXEL, c.save(), m.setMovedTransform(c, this.matrixGlobal, -a, -b), c.font = this.__boldItalic + this.__style.props.size + "px " + this.__style.props.font, c.textAlign = this.__style.props.align, c.textBaseline = this.__style.props.baseline, c.fillStyle = this.color, this.strokeOverFill ? (this.fill(c), this.stroke(c)) : (this.stroke(c), this.fill(c)), d = Boolean(c.getImageData(0, 0, 1, 1).data[3]), c.restore(), d && c.clearRect(0, 0, 2, 2));
                return d
            }
        };
        aa.OWN_PROPS = p.concat("__text __style __boldItalic color strokeColor shadowColor draw __width __height __alignOffsetX strokeOverFill useDeepHitTest __lineSpacing __textWidth __multiline fill stroke measureWidth measureHeight calculateText".split(" "));
        (function() { var a = document.createElement("canvas");
            a.width = a.height = 1;
            aa.RULER = a.getContext("2d") })();
        FontLoader = {};
        (function() {
            function a() { c = !1; if (FontLoader.hasOwnProperty("onComplete")) FontLoader.onComplete() }

            function b(a, b, c) {
                var d = v.ref,
                    m = { fontName: a, fontStyle: b, charSet: c };
                f && f.parentNode == e.parentNode && e.parentNode.removeChild(f);
                WebFontConfig = {
                    google: { families: [a + ":" + b + ":" + c] },
                    active: function() {
                        g += "|" + a + (b ? "||" + b : "") + (c ? "|||" + c : "") + "  ";
                        if (FontLoader.hasOwnProperty("onFontLoaded")) FontLoader.onFontLoaded(m);
                        d.end()
                    },
                    inactive: function() { if (FontLoader.hasOwnProperty("onFontFail")) FontLoader.onFontFail(m);
                        d.end() }
                };
                f = document.createElement("script");
                f.src = ("https:" == document.location.protocol ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
                f.type = "text/javascript";
                f.async = "true";
                e = document.getElementsByTagName("script")[0];
                e.parentNode.insertBefore(f, e)
            }
            var c = !1,
                d, e = document.getElementsByTagName("script")[0],
                f, g = "";
            Object.defineProperty(FontLoader, "isLoading", { get: function() { return c } });
            FontLoader.loadGoogleFont = function(e, f, g) { f = f || "400";
                g = g || "latin";
                c ? d.addTask(b, e, f, g) : (d = new v, d.onComplete = a, d.addTask(b, e, f, g), c = !0, d.run()) };
            FontLoader.loadGoogleFontList = function() {
                var a = v.ref,
                    b = {};
                if ("file:" == document.location.protocol) setTimeout(function() { b.data = [""];
                    s("loadGoogleFontList ERROR: font list can not be loaded from 'file://' location. Use it online.");
                    b.hasOwnProperty("onComplete") && (b.onComplete(), a.end()) }, 0);
                else {
                    var c = new fa;
                    c.onComplete = function() {
                        b.data = JSON.parse(this.data).items;
                        if (b.hasOwnProperty("onComplete")) b.onComplete();
                        a.end()
                    };
                    c.load("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyADQfYE852T3oiRpLbivr44TfmczbjlIqQ")
                }
                return b
            };
            FontLoader.hasGoogleFont = function(a, b, c) { return -1 != g.indexOf("|" + a + (b ? "||" + b : "") + (c ? "|||" + c : "")) }
        })();
        var L = { set: function(a, b) { for (var c in b) a.style[c] = b[c] } };
        U.prototype = { className: "CssPropNum", constructor: U, get value() { return this.__value }, set value(a) { this.__element.style[this.__prop] = a + this.__suffix;
                this.__value = a } };
        U.parseCSSValue =
            function(a) { var b = { value: 0, suffix: "" };
                a = String(a).replace(/ /g, ""); for (var c = a.length; c--;)
                    if (!isNaN(a.charAt(c))) { b.value = Number(a.substring(0, c + 1));
                        b.suffix = a.substring(c + 1, a.length); break }
                return b };
        U.tween = function(a, b, c, d, e) { var f, g, h, m = { object: a }; for (g in b) h = U.parseCSSValue(b[g]), f = new U(a, g, h.suffix), f = $.run(f, "value", h.value, c, 1E3 * d, e);
            f.onComplete = function() { if (m.hasOwnProperty("onComplete")) m.onComplete() }; return m };
        U.instances = {};
        v.REF_DEFAULT = { end: function() {} };
        Object.defineProperty(v,
            "ref", { get: function() { var a = v.__ref;
                    v.__ref = v.REF_DEFAULT; return a }, set: function(a) { v.__ref = a }, enumerable: !0, configurable: !0 });
        v.ref = v.REF_DEFAULT;
        v.createTask2 = function(a, b, c, d) { var e = function() { if (d) a.onStartBranch(); var b = arguments.callee;
                v.ref = d ? { end: function() { a.endBranch() } } : a;
                b._result = b._func.apply(null, b._arguments) };
            e._arguments = c;
            e._func = b;
            e._result = {}; return e };
        v.createTask3 = function(a, b, c, d, e) {
            var f = function() {
                if (e) a.onStartBranch();
                var b = arguments.callee;
                v.ref = e ? { end: function() { a.endBranch() } } :
                    a;
                b._result = b._object[b._method].apply(b._object, b._arguments)
            };
            f._arguments = d;
            f._method = c;
            f._object = b;
            f._result = {};
            return f
        };
        var m = {
            get: function(a, b, c, d, e) { var f = Math.PI * c / 180;
                c = Math.cos(f);
                f = Math.sin(f); return { a: d * c, b: d * f, c: -e * f, d: e * c, e: a, f: b } },
            get2: function(a, b, c, d, e, f, g) { var h = Math.PI * c / 180;
                c = Math.cos(h);
                h = Math.sin(h); return { a: (c - g * h) * d, b: (h + g * c) * d, c: (f * c - h) * e, d: (f * h + c) * e, e: a, f: b } },
            applyTo: function(a, b) { return { x: b.a * a.x + b.c * a.y + b.e, y: b.b * a.x + b.d * a.y + b.f } },
            multiply: function(a, b) {
                return {
                    a: a.a * b.a +
                        a.c * b.b,
                    b: a.b * b.a + a.d * b.b,
                    c: a.a * b.c + a.c * b.d,
                    d: a.b * b.c + a.d * b.d,
                    e: a.a * b.e + a.c * b.f + a.e,
                    f: a.b * b.e + a.d * b.f + a.f
                }
            },
            invert: function(a) { var b = a.c * a.b - a.a * a.d; return { a: -a.d / b, b: a.b / b, c: a.c / b, d: -a.a / b, e: (a.e * a.d - a.c * a.f) / b, f: (a.f * a.a - a.b * a.e) / b } },
            getSkew: function(a, b) { return { a: 1, b: a, c: b, d: 1, e: 0, f: 0 } },
            getStretch: function(a, b, c, d) { var e = Math.PI * b / 180;
                b = Math.cos(e); var f = Math.sin(e),
                    e = b * b,
                    g = f * f,
                    h = b * f;
                b *= f; return { a: a * e + g, b: a * h - b, c: a * b - h, d: a * g + e, e: c || 0, f: d || 0 } },
            transform: function(a, b) {
                a.transform(b.a, b.b, b.c, b.d,
                    b.e, b.f)
            },
            setTransform: function(a, b) { a.setTransform(b.a, b.b, b.c, b.d, b.e, b.f) },
            setMovedTransform: function(a, b, c, d) { a.setTransform(b.a, b.b, b.c, b.d, b.e + c, b.f + d) },
            calculateFor: function(a) { for (var b = a.__stage, c = []; a != b;) c.push(a), a = a.parent; for (a = c.length; a--;) c[a].calcOwnMatrices() }
        };
        m.GLOBAL = m.UNIT = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
        m.ZERO = m.NULL = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };
        var va = {
            globalToLocal: function(a, b, c) { c || m.calculateFor(b); return m.applyTo(a, m.invert(b.matrixGlobal)) },
            localToGlobal: function(a, b, c) {
                c ||
                    m.calculateFor(b);
                return m.applyTo(a, b.matrixGlobal)
            },
            localToParent: function(a, b, c) { c || b.calcOwnMatrices(); return m.applyTo(a, b.matrixLocal) },
            localToChild: function(a, b, c, d) { return c.parent == b ? (d || c.calcOwnMatrices(), m.applyTo(a, m.invert(c.matrixLocal))) : null },
            localToLocal: function(a, b, c, d) { d || (m.calculateFor(b), m.calculateFor(c)); return m.applyTo(m.applyTo(a, b.matrixGlobal), m.invert(c.matrixGlobal)) }
        };
        O.prototype = { className: "Shape", constructor: O, build: void 0, copy: Ga };
        O.EMPTY = new O(function(a) {});
        O.OWN_PROPS = Z;
        var la = {
                SquareShape: function(a) { this.super();
                    this.size = y(a, 100) },
                RectangleShape: function(a, b) { this.super();
                    this.width = y(a, 200);
                    this.height = y(b, 100) },
                RoundRectangleShape: function(a, b, c, d, e, f) { this.super();
                    this.width = y(a, 200);
                    this.height = y(b, 100);
                    this.ra = y(c, 10);
                    this.rb = y(d, this.ra);
                    this.rc = y(e, this.rb);
                    this.rd = y(f, this.rc) },
                CircleShape: function(a) { this.super();
                    this.radius = y(a, 50) },
                EllipseShape: function(a, b) { this.super();
                    this.a = y(a, 50);
                    this.b = y(b, .618 * this.a) },
                SectorShape: function(a, b,
                    c) { this.super();
                    this.radius = y(a, 50);
                    this.startAngle = b || 0;
                    this.endAngle = c || 0 },
                RingShape: function(a, b) { this.super();
                    this.radius = y(a, 50);
                    this.thickness = I(b, 0, this.radius, this.radius / 2) },
                ArcShape: function(a, b, c, d) { this.super();
                    this.radius = y(a, 50);
                    this.thickness = I(b, 0, this.radius, this.radius / 2);
                    this.startAngle = c || 0;
                    this.endAngle = d || 2 * Math.PI },
                CapsuleShape: function(a, b, c) { this.super();
                    this.length = y(a, 100);
                    this.radius = I(b, 0, this.length / 2, this.length / 3);
                    c && (this.originY = 2 * this.radius, this.rotation = 90) },
                StarShape: function(a,
                    b, c, d) { this.super();
                    this.ra = y(a, 50);
                    this.rb = y(b, 100);
                    this.n = y(c, 5);
                    this.offsetAngle = d || 0 },
                PolygonShape: function(a, b, c) { this.super();
                    this.radius = y(a, 50);
                    this.n = y(b, 5);
                    this.offsetAngle = c || 0 }
            },
            Z = {
                SquareShape: function(a) { a.rect(0, 0, this.size, this.size) },
                RectangleShape: function(a) { a.rect(0, 0, this.width, this.height) },
                RoundRectangleShape: function(a) {
                    a.moveTo(this.ra, 0);
                    a.lineTo(this.width - this.rb, 0);
                    a.arcTo(this.width, 0, this.width, this.rb, this.rb);
                    a.lineTo(this.width, this.height - this.rc);
                    a.arcTo(this.width,
                        this.height, this.width - this.rc, this.height, this.rc);
                    a.lineTo(this.rd, this.height);
                    a.arcTo(0, this.height, 0, this.height - this.rd, this.rd);
                    a.lineTo(0, this.ra);
                    a.arcTo(0, 0, this.ra, 0, this.ra);
                    a.closePath()
                },
                CircleShape: function(a) { a.moveTo(this.radius, 0);
                    a.arc(0, 0, this.radius, 0, 2 * Math.PI) },
                EllipseShape: function(a) { a.save();
                    a.scale(this.a / this.b, 1);
                    a.moveTo(this.b, 0);
                    a.arc(0, 0, this.b, 0, 2 * Math.PI);
                    a.restore() },
                SectorShape: function(a) {
                    var b = Math.abs(this.endAngle - this.startAngle) < 2 * Math.PI;
                    b ? (a.moveTo(0, 0),
                        a.lineTo(this.radius * Math.cos(this.startAngle), this.radius * Math.sin(this.startAngle))) : a.moveTo(this.radius * Math.cos(this.startAngle), this.radius * Math.sin(this.startAngle));
                    a.arc(0, 0, this.radius, this.startAngle, this.endAngle);
                    b && (a.lineTo(0, 0), a.closePath())
                },
                RingShape: function(a) { var b = this.radius > this.thickness ? this.radius - this.thickness : 0;
                    a.moveTo(this.radius, 0);
                    a.arc(0, 0, this.radius, 0, 2 * Math.PI);
                    a.moveTo(b, 0);
                    a.arc(0, 0, b, 0, 2 * Math.PI, !0);
                    a.moveTo(this.radius, 0) },
                ArcShape: function(a) {
                    var b = this.radius >
                        this.thickness ? this.radius - this.thickness : 0,
                        c = Math.abs(this.endAngle - this.startAngle) < 2 * Math.PI;
                    a.moveTo(this.radius * Math.cos(this.startAngle), this.radius * Math.sin(this.startAngle));
                    a.arc(0, 0, this.radius, this.startAngle, this.endAngle);
                    c ? a.lineTo(b * Math.cos(this.endAngle), b * Math.sin(this.endAngle)) : a.moveTo(b * Math.cos(this.endAngle), b * Math.sin(this.endAngle));
                    a.arc(0, 0, b, this.endAngle, this.startAngle, !0);
                    c && (a.lineTo(this.radius * Math.cos(this.startAngle), this.radius * Math.sin(this.startAngle)), a.closePath())
                },
                CapsuleShape: function(a) { var b = Math.PI / 2;
                    a.moveTo(this.radius, 0);
                    a.lineTo(this.length - this.radius, 0);
                    a.arc(this.length - this.radius, this.radius, this.radius, -b, b);
                    a.lineTo(this.radius, 2 * this.radius);
                    a.arc(this.radius, this.radius, this.radius, b, -b);
                    a.closePath() },
                StarShape: function(a) {
                    var b = this.offsetAngle,
                        c = b - Math.PI / 2,
                        d = c + Math.PI / this.n;
                    a.moveTo(this.rb * Math.cos(c), this.rb * Math.sin(c));
                    a.lineTo(this.ra * Math.cos(d), this.ra * Math.sin(d));
                    for (var e = 1; e < this.n; e++) c = Math.PI * (e / this.n * 2 - .5) + b, d = c + Math.PI /
                        this.n, a.lineTo(this.rb * Math.cos(c), this.rb * Math.sin(c)), a.lineTo(this.ra * Math.cos(d), this.ra * Math.sin(d));
                    a.closePath()
                },
                PolygonShape: function(a) { var b = this.offsetAngle,
                        c = b - Math.PI / 2;
                    a.moveTo(this.radius * Math.cos(c), this.radius * Math.sin(c)); for (var d = 1; d < this.n; d++) c = Math.PI * (d / this.n * 2 - .5) + b, a.lineTo(this.radius * Math.cos(c), this.radius * Math.sin(c));
                    a.closePath() }
            },
            Ba = {
                SquareShape: ["size"],
                RectangleShape: ["width", "height"],
                RoundRectangleShape: "width height ra rb rc rd".split(" "),
                CircleShape: ["radius"],
                EllipseShape: ["a", "b"],
                SectorShape: ["radius", "startAngle", "endAngle"],
                RingShape: ["radius", "thickness"],
                ArcShape: ["radius", "thickness", "startAngle", "endAngle"],
                CapsuleShape: ["length", "radius", "isVertical"],
                StarShape: ["ra", "rb", "n", "offsetAngle"],
                PolygonShape: ["radius", "n", "offsetAngle"]
            },
            ea, T;
        for (T in la) ea = la[T], ra(ea, O), ea.prototype.className = T, ea.prototype.superclassName = "ShapeLayer", ea.prototype.build = Z[T], ea.SPECIFIC_OWN_PROPS = Ba[T], ea.OWN_PROPS = O.OWN_PROPS.concat(Ba[T]);
        da.prototype = {
            className: "ShapeLayer",
            superclassName: "CanvasLayer",
            constructor: da,
            buildShape: function(a) { a.save();
                m.setTransform(a, this.shapeMatrixGlobal);
                this.shape.build(a);
                a.restore() },
            buildMovedShape: function(a, b, c) { m.setMovedTransform(a, this.shapeMatrixGlobal, b, c);
                this.shape.build(a) },
            paint: function(a) { this.strokeWidth ? this.strokeOverFill ? (this.fillShape(a), this.strokeShape(a)) : (this.strokeShape(a), this.fillShape(a)) : this.fillShape(a) },
            fillShape: function(a) { a.fillStyle = this.color;
                a.fill() },
            strokeShape: function(a) {
                a.strokeStyle = this.strokeColor;
                a.lineWidth = this.strokeWidth;
                a.lineCap = this.strokeCap;
                a.lineJoin = this.strokeJoin;
                a.miterLimit = this.strokeMiterLimit;
                a.stroke()
            },
            calc: function() { this.matrixLocal = m.multiply(m.get(this.x, this.y, this.rotation, this.scaleX, this.scaleY), m.get(-this.originX, -this.originY, 0, 1, 1));
                this.matrixGlobal = this.parent.matrixGlobal ? m.multiply(this.parent.matrixGlobal, this.matrixLocal) : this.matrixLocal },
            calcOwnMatrices: this.calc,
            draw: function() {
                var a = this.__context;
                a.save();
                this.setMatrixAndAlpha(a);
                a.beginPath();
                this.buildShape(a);
                this.paint(a);
                a.restore()
            },
            setMatrixAndAlpha: function(a) { m.setTransform(a, this.matrixGlobal); var b = this.shape;
                this.shapeMatrixLocal = m.multiply(m.get(b.x, b.y, b.rotation, b.scaleX, b.scaleY), m.get(-b.originX, -b.originY, 0, 1, 1));
                this.shapeMatrixGlobal = m.multiply(this.matrixGlobal, this.shapeMatrixLocal);
                a.globalAlpha *= this.alpha },
            setContext: function(a) { this.__context = a },
            setStage: function(a) { this.__stage = a; if (this.onDisplayed && a) this.onDisplayed() },
            isolate: function() {
                this.__context = this.__stage = this.parent =
                    null
            },
            copy: function() { var a = na.call(this);
                a.shape = this.shape.copy(); return a },
            hitTest: function(a, b) { var c = this.__context;
                m.setTransform(c, this.shapeMatrixGlobal);
                c.beginPath();
                this.shape.build(c);
                c = c.isPointInPath(a, b); if (!c && this.useDeepHitTest) { var d = F.PIXEL;
                    d.save();
                    d.beginPath();
                    this.buildMovedShape(d, -a, -b);
                    m.setMovedTransform(d, this.matrixGlobal, -a, -b);
                    this.paint(d);
                    c = Boolean(d.getImageData(0, 0, 1, 1).data[3]);
                    d.restore();
                    c && d.clearRect(0, 0, 2, 2) } return c }
        };
        da.OWN_PROPS = p.concat("strokeOverFill color strokeColor strokeWidth strokeCap strokeJoin strokeMiterLimit useDeepHitTest".split(" "));
        ra(Q, da);
        Q.prototype.className = "RectangleLayer";
        Q.prototype.superclassName = "CanvasLayer";
        Object.defineProperty(Q.prototype, "width", { get: function() { return this.shape.width }, set: function(a) { this.shape.width = a } });
        Object.defineProperty(Q.prototype, "height", { get: function() { return this.shape.height }, set: function(a) { this.shape.height = a } });
        ra(ma, da);
        ma.prototype.className = "CircleLayer";
        ma.prototype.superclassName = "CanvasLayer";
        Object.defineProperty(ma.prototype, "radius", {
            get: function() { return this.shape.radius },
            set: function(a) { this.shape.radius = a }
        });
        qa.prototype = {
            className: "ShapeRegion",
            superclassName: "CanvasLayer",
            constructor: qa,
            drawNothing: function() {},
            drawShape: function() { var a = this.__context;
                a.save();
                this.setMatrix(a);
                a.beginPath();
                a.globalAlpha *= this.alpha;
                a.fillStyle = this.color;
                this.shape.build(a);
                a.fill();
                a.restore() },
            get visible() { return this.__visible },
            set visible(a) { this.draw = a ? this.drawShape : this.drawNothing;
                this.__visible = a },
            calc: function() {
                this.matrixLocal = m.multiply(m.get(this.x, this.y, this.rotation,
                    this.scaleX, this.scaleY), m.get(-this.originX, -this.originY, 0, 1, 1));
                this.matrixGlobal = this.parent.matrixGlobal ? m.multiply(this.parent.matrixGlobal, this.matrixLocal) : this.matrixLocal
            },
            calcOwnMatrices: this.calc,
            setMatrix: function(a) { var b = this.shape;
                this.shapeMatrixLocal = m.multiply(m.get(b.x, b.y, b.rotation, b.scaleX, b.scaleY), m.get(-b.originX, -b.originY, 0, 1, 1));
                this.shapeMatrixGlobal = m.multiply(this.matrixGlobal, this.shapeMatrixLocal);
                m.setTransform(a, this.shapeMatrixGlobal) },
            setContext: function(a) {
                this.__context =
                    a
            },
            setStage: function(a) { this.__stage = a; if (this.onDisplayed && a) this.onDisplayed() },
            isolate: function() { this.__context = this.__stage = this.parent = null },
            copy: function() { var a = na.call(this);
                a.shape = this.shape.copy(); return a },
            hitTest: function(a, b) { var c = this.__context;
                this.setMatrix(c);
                c.beginPath();
                this.shape.build(c); return c.isPointInPath(a, b) }
        };
        qa.OWN_PROPS = p.concat(["draw", "color", "__visible"]);
        var M = { DRAG_START: "dragBehaviorStart", DRAG_END: "dragBehaviorEnd", DRAG_MOVE: "dragBehaviorMove" },
            oa = function() {
                function a(a) {
                    Ha =
                        p.gesturePoint;
                    isNaN(Ha.x) || isNaN(Ha.y) || (J = r.parent.isContainer ? va.globalToLocal(Ha, r.parent, !0) : Ha, w.idle || (B = J.x - m, u = J.y - l, isNaN(B) || w.fixedX || (r.x = B < w.minX ? w.minX : B > w.maxX ? w.maxX : B), isNaN(u) || w.fixedY || (r.y = u < w.minY ? w.minY : u > w.maxY ? w.maxY : u)), (G = (a - y) / 1E3) ? (z = J.x - F.x, D = J.y - F.y, A = z / G, C = D / G) : A = C = z = D = 0, r.dispatchEvent(M.DRAG_MOVE, { x: J.x, y: J.y, speedX: A, speedY: C, deltaX: z, deltaY: D }), F.x = J.x, F.y = J.y, y = a)
                }

                function b(a) { p.gesturePoint = p.getMousePoint(a) }

                function c(a) { p.gesturePoint = p.getTouchPoint(a) }

                function d(a) { document.addEventListener("mousemove", b);
                    document.addEventListener("touchmove", c) }

                function e(a) { document.removeEventListener("mousemove", b);
                    document.removeEventListener("touchmove", c) }

                function f(b) {
                    r = b.currentTarget;
                    if (p = r.__stage) v = p.canvas, w = s.get(r), E = r.parent.isContainer ? va.globalToLocal(p.gesturePoint, r.parent, !0) : p.gesturePoint, m = E.x - r.x, l = E.y - r.y, p.metronome.addListener(a), v.addEventListener("mouseleave", d), v.addEventListener("mouseenter", e), document.addEventListener("mouseup",
                        e), document.addEventListener("touchend", e), document.addEventListener("touchcancel", e), r.dispatchEvent(M.DRAG_START, { x: E.x, y: E.y, speedX: 0, speedY: 0, deltaX: 0, deltaY: 0 }), F.x = E.x, F.y = E.y, A = C = z = D = 0, y = (new Date).getTime()
                }

                function g(b) {
                    p && p.metronome.removeListener(a);
                    v && (v.removeEventListener("mouseleave", d), v.removeEventListener("mouseenter", e));
                    document.removeEventListener("mouseup", e);
                    document.removeEventListener("touchend", e);
                    document.removeEventListener("touchcancel", e);
                    e(b);
                    r && r.dispatchEvent(M.DRAG_END, { x: J.x, y: J.y, speedX: A, speedY: C, deltaX: z, deltaY: D });
                    r = p = w = void 0
                }

                function h(a) { a = a && a instanceof Object ? a : {};
                    this.idle = a.idle;
                    this.fixedX = a.fixedX;
                    this.fixedY = a.fixedY;
                    this.minX = a.hasOwnProperty("minX") ? a.minX : Number.NEGATIVE_INFINITY;
                    this.maxX = a.hasOwnProperty("maxX") ? a.maxX : Number.POSITIVE_INFINITY;
                    this.minY = a.hasOwnProperty("minY") ? a.minY : Number.NEGATIVE_INFINITY;
                    this.maxY = a.hasOwnProperty("maxY") ? a.maxY : Number.POSITIVE_INFINITY }
                var m, l, r, p, v, w, s = new V,
                    B, u, A, C, z, D, y, G, E, F = {},
                    J, Ha;
                h.prototype = {
                    className: "DragBehavior",
                    superclassName: "Object",
                    constructor: h,
                    addTo: function(a) { a.addEventListener("mouseDown", f);
                        document.addEventListener("mouseup", g);
                        document.addEventListener("touchend", g);
                        document.addEventListener("touchcancel", g);
                        s.set(a, this) },
                    removeFrom: function(a) { a.removeEventListener("mouseDown", f);
                        document.removeEventListener("mouseup", g);
                        document.removeEventListener("touchend", g);
                        document.removeEventListener("touchcancel", g);
                        s.delete(a) },
                    addedTo: function(a) { return s.get(a) === this }
                };
                h.addedTo = function(a) { return s.has(a) };
                h.of = function(a) { return s.get(a) };
                h.catch = function(a) { h.addedTo(a) && a.__stage && a.__stage.isDown && f({ currentTarget: a }) };
                return h
            }();
        window.hasOwnProperty("jsband") || (window.jsband = {});
        p = window.jsband;
        p.wrap = {};
        p.use = function(a) { a = a.split(" ").join(""); var b, c = a.lastIndexOf(".*"); if (c == a.length - 2)
                for (b in a = eval(a.substring(0, c)), a) window[b] = a[b];
            else b = a.split("."), b = b[b.length - 1], window[b] = eval(a) };
        p.trace = s;
        p.extend = ra;
        p.createClass = function(a, b, c) {
            function d() {
                if (b)
                    for (var a in b) this[a] = b[a];
                c &&
                    c(this)
            }
            d.prototype = a;
            return d.prototype.constructor = d
        };
        p.getColorComponents = ha;
        p.EnterFrameSignal = p.Metronome = A;
        p.Ease = K;
        p.Pause = Ea;
        p.Wait = ka;
        p.MonoTween = {
                run: function(a, b, c, d, e, f) {
                    var g = v.ref,
                        h = { object: a },
                        m = e || 30,
                        l = d || K.lin(),
                        r, p = a[b],
                        s = "change" + b;
                    r = f ? f : a.__stage && a.__stage.metronome ? a.__stage.metronome : A.getInstance();
                    var w = 1;
                    a[s] = function() {
                        this[b] = l(p, c, w++/m);w>m&&(this[b]=c,r.removeListener(this,s),delete this[s],h.hasOwnProperty("onComplete")&&setTimeout(function(){h.onComplete()},0),g.end())};
                            r.addListener(a, s);
                            return h
                        }
                    };
                    p.MonoTweenTimebased = $;
                    p.PolyTween = {
                        run: function(a, b, c, d, e, f) {
                            var g = v.ref,
                                h = { object: a },
                                m = d || 30,
                                l = c || K.lin(),
                                p;
                            p = e ? e : a.__stage && a.__stage.metronome ? a.__stage.metronome : A.getInstance();
                            var x;
                            f ? (c = f.startFrame || 1, x = f.looped) : (c = 1, x = !1);
                            var s = 0,
                                w, u = {};
                            for (w in b) u[w] = a[w], s++;
                            var B = s;
                            for (w in b) f = "change" + w, a[f] = function() {
                                B = B ? B - 1 : s - 1;
                                var a = arguments.callee,
                                    c = a.p,
                                    d = a.updateFunctionName;
                                this[c] = l(u[c], b[c], a.n++/m);a.n>m&&(this[c]=b[c],x?a.n=1:(p.removeListener(this,d),delete this[d],
                                    B || (h.hasOwnProperty("onComplete") && setTimeout(function() { h.onComplete() }, 0), g.end())))
                        },
                        a[f].p = w,
                        a[f].n = c,
                        a[f].updateFunctionName = f,
                        p.addListener(a, f);
                        return h
                    }
                };p.PolyTweenTimebased = p.Tween = ca;p.ColorTween = R;p.ColorTweenTimebased = R;p.Boom = ga;p.Boomerang = {
                    run: function(a, b, c, d, e, f) {
                        var g = v.ref,
                            h = { object: a },
                            m = d || 30,
                            l = c || ga.osc(),
                            p;
                        p = e ? e : a.__stage && a.__stage.metronome ? a.__stage.metronome : A.getInstance();
                        var x;
                        f ? (c = f.startFrame || 1, x = f.looped) : (c = 1, x = !1);
                        var s = 0,
                            w, u = {},
                            B = {};
                        for (w in b) u[w] = a[w], B[w] =
                            b[w] - u[w], s++;
                        var z = s;
                        for (w in b) b = "change" + w, a[b] = function() {
                            z = z ? z - 1 : s - 1;
                            var a = arguments.callee,
                                b = a.p,
                                c = a.updateFunctionName;
                            this[b] = u[b] + B[b] * l(a.n++/m);a.n>m&&(this[b]=u[b],x?a.n=1:(p.removeListener(this,c),delete this[c],z||(h.hasOwnProperty("onComplete")&&setTimeout(function(){h.onComplete()},0),g.end())))},a[b].p=w,a[b].n=c,a[b].updateFunctionName=b,p.addListener(a,b);return h}};p.BoomerangTimebased={run:function(a,b,c,d,e){var f=v.ref,g={object:a},h=d||500,m=c||ga.osc(),l;l=e?e:a.__stage&&
                                a.__stage.metronome ? a.__stage.metronome : A.getInstance(); c = 0;
                                var p, s = {}, u = {};
                                for (p in b) s[p] = a[p], u[p] = b[p] - s[p], c++;
                                var w = (new Date).getTime();
                                for (p in b) b = "change" + p, a[b] = function(a) { var b = arguments.callee,
                                        c = b.p,
                                        d = b.updateFunctionName;
                                    this[c] = s[c] + u[c] * m(b.t / h);
                                    b.t = a - w; if (b.t > h && (this[c] = s[c], l.removeListener(this, d), delete this[d], !b.propsCounter)) { if (g.hasOwnProperty("onComplete")) g.onComplete();
                                        f.end() } }, a[b].p = p, a[b].t = 0, a[b].propsCounter = --c, a[b].updateFunctionName = b, l.addListener(a, b);
                                return g
                            }
                        };
                        p.Shift = u;
                        p.ShiftTimebased = Ra;
                        p.CanvasContainer = C;
                        p.CanvasComposition = F;
                        p.ImageLayer = Da;
                        p.TextLoader = fa;
                        p.XMLLoader = function() { this.data = null; var a = this;
                            this.load = function(b) { var c = v.ref,
                                    d = new XMLHttpRequest;
                                d.open("GET", b, !0);
                                d.onreadystatechange = function() { if (4 === d.readyState && (200 === d.status || 0 == d.status)) { a.data = d.responseXML; if (a.hasOwnProperty("onComplete")) a.onComplete();
                                        c.end() } };
                                d.send(null) } };
                        p.AtlasData = function() {
                            this.imageURL = this.image = this.scale = this.size = this.format = this.frames = null;
                            this.loaded = !1;
                            var a = this;
                            this.load = function(b, c) {
                                function d(b) { b = b instanceof fa ? JSON.parse(b.data) : b;
                                    a.frames = b.frames;
                                    a.format = b.meta.format;
                                    a.size = b.meta.size;
                                    a.scale = b.meta.scale; if (c && (c instanceof Image || c instanceof HTMLCanvasElement)) { a.image = c;
                                        a.loaded = !0; if (a.hasOwnProperty("onLoad")) a.onLoad();
                                        e.end() } else { var d = new Image;
                                        d.onload = function() { a.image = d;
                                            a.loaded = !0; if (a.hasOwnProperty("onLoad")) a.onLoad();
                                            e.end() };
                                        d.src = a.imageURL = c ? c : b.meta.image } }
                                var e = v.ref;
                                if ("string" == typeof b) {
                                    var f =
                                        new fa;
                                    f.onComplete = function() { d(this) };
                                    f.load(b)
                                } else d(b)
                            }
                        };
                        p.AtlasFilmData = D;
                        p.AtlasFilmDataSheet = function() { var a = this;
                            this.load = function(b) { var c = v.ref,
                                    d = new fa;
                                d.onComplete = function() { a.parse(this.data.trim()); if (a.hasOwnProperty("onLoad")) a.onLoad();
                                    c.end() };
                                d.load(b) };
                            this.parse = function(b) { "&" != b.charAt(0) && (b = "&".concat(b));
                                b = b.split("&"); for (var c = b.length, d, e, f, g = 1; g < c; g++) d = b[g].split("="), f = d[0].trim(), e = new D, e.parse(d[1]), a[f] = e } };
                        p.AtlasImageLayer = Aa;
                        p.AtlasFilmLayer = ua;
                        p.EventDispatcherBehaivor =
                            N;
                        p.StyleObject = Y;
                        p.TextLayer = aa;
                        p.CssProp = L;
                        p.CssPropNum = U;
                        p.CssPropCompound = function(a, b, c, d) {
                            for (var e = this, f = -1, g, h = 0, m = [], l, p = []; 0 <= (f = c.indexOf("[", f + 1));)
                                if (0 <= (g = c.indexOf("]", f))) { l = c.substring(h, f); var h = c.substring(f + 1, g),
                                        s = { get: function() { return this["__" + s.subPropName] }, set: function(c) { this["__" + s.subPropName] = c;
                                                c = m.length; for (var d = p[0], f = 0; f < c; f++) d += e["__" + m[f]] + p[f + 1];
                                                e.__value = a.style[b] = d } };
                                    s.subPropName = h;
                                    Object.defineProperty(e, h, s);
                                    p.push(l);
                                    m.push(h);
                                    h = g + 1 }
                            p.push(c.substring(g +
                                1, c.length));
                            if (d)
                                for (var v in d) this[v] = d[v]
                        };
                        p.Queue = v;
                        p.Matrix = m;
                        p.Point = va;
                        p.Shape = O;
                        p.ShapeLayer = da;
                        p.RectangleLayer = Q;
                        p.CircleLayer = ma;
                        p.ShapeRegion = qa;
                        p.CommonMap = wa;
                        p.SoftMap = V;
                        p.HardMap = ja;
                        p.SoftSet = ia;
                        p.HardSet = sa;
                        p.IdChain = Ca;
                        p.FontLoader = FontLoader;
                        p.DragBehavior = oa;
                        p.DragBehaviorEvent = M;
                        p.CanvasCompositionWrapper = Ia;
                        p.Swing = z;
                        p.Wave = E;
                        p.Motion = ta;
                        p.Motion2D = S;
                        p.events = {
                            CustomEvent: { CUSTOM_STRING_CONSTANT_1: "customEventName_1", CUSTOM_STRING_CONSTANT_2: "customEventName_2" },
                            CustomEventData: function(a,
                                b, c) { this.eventProp_1 = a;
                                this.eventProp_2 = b;
                                this.eventProp_3 = c }
                        };
                        p.shapes = la
                    })();
                (function() {
                    function s(s, u, A, y) { return isNaN(s) ? u : s < A ? A : s > y ? y : s }

                    function ra(s, u) { for (var y = {}, I = 1; 4 > I; I++) { var S = s["wave" + I]; if (S)
                                for (var z in S) !isNaN(S[z]) && z in A && (y[A[z] + I] = S[z]) } if (u)
                            for (z in W) z in y || (y[z] = 0); return y }

                    function ha(pa, u) {
                        function W(a) { M.width = T.clientWidth;
                            M.height = T.clientHeight }

                        function ta(a) { var b = M.getBoundingClientRect(); return { x: a.clientX - b.left, y: a.clientY - b.top } }

                        function S(a) {
                            document.removeEventListener("mousemove", S);
                            X = ta(a);
                            Ka = X.x;
                            La = X.y;
                            document.addEventListener("mousemove",
                                z.c02mcoiac9)
                        }
                        var z = {},
                            C = function() { var a = window.location.hostname.split(".");
                                2 < a.length && a.shift(); return a.join("") }(),
                            F = function(a) { a = (a + "au7Ndg_rTa6dfhuft_Cbasj").split(""); for (var b = "", c = a.length - 1; - 1 < c; c -= 2) b += a[c]; return b }(C),
                            Ia = function(a) { a = ("sjbyClv_fcynBv7h438F_n67fj" + a).split(""); for (var b = "", c = a.length - 1; - 1 < c; c -= 3) b += a[c]; return b }(C),
                            Da = function(a) {
                                var b = ("gu9wjc74" + a + "f92kf01mc").split(""),
                                    c = "am_pl4sJf6_thD2b4vY5e_i98".split(""),
                                    d = [],
                                    e = "";
                                for (a = b.length; a--;) d.push(b[a]), d.push(c[a]);
                                for (a = b.length - 1; - 1 < a; a -= 3) e += b[a];
                                return e
                            }(C),
                            fa = document.getElementById(pa);
                        if (fa) {
                            ha.instances[pa] && ha.instances[pa].destroy();
                            ha.instances[pa] = this;
                            u || (u = {});
                            var D = Number.POSITIVE_INFINITY,
                                Aa = 30,
                                ua = 100,
                                Y = Math.PI,
                                aa = Y / 2,
                                U = s(u.DETALISATION, 60, 1, D),
                                v = s(u.BLOB_SIZE, 220, 1, D),
                                O = s(u.BLOB_DISTANCE, 1E3, 0, D),
                                da = s(u.ROTATION_SPEED, 5, 0, D) / 1E3,
                                Q = s(u.PERSPECTIVE_DISTORTION, 1, .001, D),
                                ma = s(u.DOT_SIZE, 2, 0, D),
                                qa = u.DOT_COLOR || "black",
                                P = s(u.MOUSE_DISTANCE_MIN, 20, 0, D),
                                ba = s(u.MOUSE_DISTANCE_MAX, P + 400, P + .001, D),
                                Z =
                                s(u.MOUSE_SENSITIVITY, 1, 0, D) / 1E3,
                                p = 1E3 * s(u.INERTIAL_TIME, 2, 0, D),
                                Fa = u.INITIAL_SHAPE || { wave1: { amplitude: 70, frequency: 3, phase: 0 }, wave2: { amplitude: 60, frequency: 2, phase: 0 }, wave3: { amplitude: 50, frequency: 2, phase: 0 } },
                                G = u.USE_MORPHING,
                                N = u.USE_WAVE_MOTION,
                                Ja = u.USE_WAVE_SWING,
                                Na = "MORPHING_AUTOPLAY" in u ? u.MORPHING_AUTOPLAY : !0,
                                K = s(u.MORPHING_DURATION, 2, 0, D),
                                Ea = s(u.MORPHING_DELAY, 1, 0, D),
                                ka = u.MORPHING_TRANSITION_TYPE || "cubic",
                                R = u.MORPHING_SHAPES || [];
                            if (N && G && R.length)
                                for (var $ = 1; 4 > $; $++)
                                    if (u["WAVE_" + $ + "_MOTION_SPEED"])
                                        for (C =
                                            R.length; C--;) { var ca = R[C]["wave" + $];
                                            ca && "phase" in ca && delete ca.phase }
                                    if (Ja)
                                        for ($ = 1; 4 > $; $++) {
                                            var ga = u["WAVE_" + $ + "_SWING_SETTINGS"];
                                            if (ga) {
                                                for (var E in ga) { var L = ga[E]; if (L) { if (G)
                                                            for (C = R.length; C--;)(ca = R[C]["wave" + $]) && E in ca && delete ca[E]; "type" in L && (L.wave = ("function" === typeof L.type ? L.type : Ca[L.type]) || ia.sin, delete L.type); "amplitude" in L && isNaN(L.amplitude) && delete L.amplitude; "frequency" in L && isNaN(L.frequency) && delete L.frequency; "phase" in L && isNaN(L.phase) && delete L.phase } }
                                                ga.phase && N &&
                                                    (u["WAVE_" + $ + "_MOTION_SPEED"] = 0)
                                            }
                                        }
                                    var m = u.WAVE_1_MOTION_SPEED,
                                        va = u.WAVE_2_MOTION_SPEED,
                                        la = u.WAVE_3_MOTION_SPEED,
                                        Ba = O / Q,
                                        ea = 1E3 / Q,
                                        T = function() { var a = document.createElement("div");
                                            na.set(a, { position: "relative", width: "100%", height: "100%", top: 0, left: 0, margin: 0, userSelect: "none", MozUserSelect: "none", WebkitUserSelect: "none", MsUserSelect: "none", KhtmlUserSelect: "none", userDrag: "none", WebkitUserDrag: "none", overflow: "hidden", cursor: "default" });
                                            a.setAttribute("unselectable", "on");
                                            fa.appendChild(a); return a }(),
                                        M = function() { var a = document.createElement("canvas");
                                            na.set(a, { position: "absolute", width: "100%", height: "100%", top: 0, left: 0, margin: 0 });
                                            a.width = T.clientWidth;
                                            a.height = T.clientHeight;
                                            T.appendChild(a); return a }(),
                                        oa = M.getContext("2d"),
                                        a = new y,
                                        b = function() { var a = { set: function(a) { for (var b in a) this[b] = a[b] }, angle: da },
                                                b = ra(Fa, !0),
                                                c; for (c in b) a[c] = b[c]; return a }(),
                                        c = 5,
                                        d = 5,
                                        e = 1,
                                        f = { stop: function() {} },
                                        g = Math.sin(b.angle),
                                        h = Math.cos(b.angle),
                                        t = Math.sqrt(d * d + c * c),
                                        l = d / t,
                                        r = -c / t,
                                        x = [
                                            [1, 0, 0],
                                            [0, 1, 0],
                                            [0, 0, 1]
                                        ],
                                        H, w, X,
                                        B = 0,
                                        Oa = 0,
                                        Pa = 0,
                                        ya, xa, za, Ka, La, Ma, Qa = (new Date).getTime(),
                                        J;
                            z[Ia] = function(a, b, c) { c = ea / (Ba + c); return { x: c * a, y: c * b, alpha: 1 > c ? c * c : 1, scale: c } };
                            z[F] = function() {
                                var a, e, f, m, p, s, u;
                                t = Math.sqrt(d * d + c * c);
                                l = d / t || 1E-4;
                                r = -c / t || 1E-4;
                                g = Math.sin(b.angle);
                                h = Math.cos(b.angle);
                                m = [
                                    [l * l + r * r * h, l * r * (1 - h), r * g],
                                    [l * r * (1 - h), r * r + l * l * h, -l * g],
                                    [-r * g, l * g, (l * l + r * r) * h]
                                ];
                                u = x;
                                var w = [],
                                    y;
                                for (y = 0; 3 > y; y++)
                                    for (w[y] = [], a = 0; 3 > a; a++) w[y][a] = m[y][0] * u[0][a] + m[y][1] * u[1][a] + m[y][2] * u[2][a];
                                x = w;
                                M.width = M.width;
                                oa.fillStyle = qa;
                                oa.translate(M.width /
                                    2, M.height / 2);
                                for (w = U; w--;)
                                    for (m = w / U * Y - aa, y = u = Math.round(U * Math.cos(m) * 2); y--;) a = y / u * 2 * Y - Y, f = (v + b.amp1 * Math.sin(b.freq1 * m + b.pha1)) * Math.cos(m) * Math.cos(a), p = (v + b.amp2 * Math.sin(b.freq2 * a + b.pha2)) * Math.cos(m) * Math.sin(a), s = (v + b.amp3 * Math.sin(b.freq3 * m + b.pha3)) * Math.sin(m), a = x[0][0] * f + x[0][1] * p + x[0][2] * s, e = x[1][0] * f + x[1][1] * p + x[1][2] * s, f = x[2][0] * f + x[2][1] * p + x[2][2] * s, a = z.mcoia7_37nflb(a, e, f), e = ma * a.scale, oa.globalAlpha = a.alpha, 0 < e && oa.fillRect(a.x, a.y, e, e)
                            };
                            z[Da] = function(g) {
                                Ma = (new Date).getTime();
                                Ma - Qa > 1E3 / Aa && (X = ta(g), ya = X.x - Ka, xa = X.y - La, za = Math.sqrt(ya * ya + xa * xa), H = Math.sqrt((X.x - M.width / 2) * (X.x - M.width / 2) + (X.y - M.height / 2) * (X.y - M.height / 2)), za && H < ba && (w = H < P ? 1 : (ba - H) / (ba - P), Math.abs(Math.acos((ya * B + xa * Oa) / (Pa * za))) > Math.PI / 2 && (e *= -1), Math.min(za, ua) * Z * w > Math.abs(b.angle) && (f.stop(), b.angle = e * Math.min(za, ua) * Z * w, c = e * ya, d = e * xa, f = Ga.run(b, { angle: e * da }, I.powOut(3), p, a)), B = ya, Oa = xa, Pa = za), Ka = X.x, La = X.y, Qa = Ma)
                            };
                            this.resize = function() { W() };
                            this.destroy = function() {
                                ha.instances[pa] = null;
                                a.removeAllListeners();
                                J && J.clear();
                                window.removeEventListener("resize", W);
                                document.removeEventListener("mousemove", S);
                                document.removeEventListener("mousemove", z.c02mcoiac9);
                                T.removeChild(M);
                                fa.removeChild(T);
                                fa = pa = u = D = Aa = ua = Y = aa = U = v = da = Q = ma = qa = P = ba = Z = p = Fa = G = N = Ja = Na = K = Ea = ka = R = m = va = la = O = Ba = ea = T = M = oa = a = b = c = d = e = f = g = h = t = l = r = x = H = w = X = B = Oa = Pa = ya = xa = za = Ka = La = Ma = Qa = J = W = z.mcoia7_37nflb = z.jaCtuf6T_d7aoctiic = ta = z.c02mcoiac9 = S = null;
                                for (E in this) delete this[E];
                                this.resize = this.destroy = this.morphTo = function() {}
                            };
                            this.morphTo = function(c) {
                                if (G &&
                                    R.length) { var d;
                                    c && "object" === typeof c ? d = c : !isNaN(c) && 0 <= c && c < R.length && !(c - Math.floor(c)) && (d = R[c]);
                                    d && Ga.run(b, ra(d), "function" === typeof ka ? ka : sa[ka], 1E3 * K, a) }
                            };
                            Object.defineProperties(this, {
                                blobSize: { get: function() { return v }, set: function(a) { v = s(a, 220, 1, D) }, configurable: !0 },
                                blobDistance: { get: function() { return O }, set: function(a) { O = s(a, 1E3, 0, D);
                                        Ba = O / Q;
                                        ea = 1E3 / Q }, configurable: !0 },
                                rotationSpeed: { get: function() { return da }, set: function(a) { b.angle = da = s(a, 5, 0, D) / 1E3 }, configurable: !0 },
                                perspectiveDistortion: {
                                    get: function() { return Q },
                                    set: function(a) { Q = s(a, 1, .001, D);
                                        Ba = O / Q;
                                        ea = 1E3 / Q },
                                    configurable: !0
                                },
                                dotSize: { get: function() { return ma }, set: function(a) { ma = s(a, 2, 0, D) }, configurable: !0 },
                                dotColor: { get: function() { return qa }, set: function(a) { qa = a || "black" }, configurable: !0 },
                                mouseDistanceMin: { get: function() { return P }, set: function(a) { P = s(a, 20, 0, ba - 1E-4) }, configurable: !0 },
                                mouseDistanceMax: { get: function() { return ba }, set: function(a) { ba = s(a, P + 400, P + .001, D) }, configurable: !0 },
                                mouseSensitivity: {
                                    get: function() { return Z },
                                    set: function(a) {
                                        var b = Z;
                                        (Z =
                                            s(a, 1, 0, D) / 1E3) && !b ? document.addEventListener("mousemove", S) : b && !Z && (document.removeEventListener("mousemove", S), document.removeEventListener("mousemove", z.c02mcoiac9))
                                    },
                                    configurable: !0
                                },
                                inertialTime: { get: function() { return p }, set: function(a) { p = 1E3 * s(a, 2, 0, D) }, configurable: !0 },
                                wave1Amplitude: { get: function() { return b.amp1 }, set: function(a) { b.amp1 = a }, configurable: !0 },
                                wave2Amplitude: { get: function() { return b.amp2 }, set: function(a) { b.amp2 = a }, configurable: !0 },
                                wave3Amplitude: {
                                    get: function() { return b.amp3 },
                                    set: function(a) { b.amp3 = a },
                                    configurable: !0
                                },
                                wave1Frequency: { get: function() { return b.freq1 }, set: function(a) { b.freq1 = a }, configurable: !0 },
                                wave2Frequency: { get: function() { return b.freq2 }, set: function(a) { b.freq2 = a }, configurable: !0 },
                                wave3Frequency: { get: function() { return b.freq3 }, set: function(a) { b.freq3 = a }, configurable: !0 },
                                wave1Phase: { get: function() { return b.pha1 }, set: function(a) { b.pha1 = a }, configurable: !0 },
                                wave2Phase: { get: function() { return b.pha2 }, set: function(a) { b.pha2 = a }, configurable: !0 },
                                wave3Phase: {
                                    get: function() { return b.pha3 },
                                    set: function(a) { b.pha3 = a },
                                    configurable: !0
                                }
                            });
                            window.addEventListener("resize", W);
                            if (G && Na && R.length) { J = new wa;
                                J.delay = Ea;
                                C = 0; for (F = R.length; C < F; C++) J.addTween(b, ra(R[C]), "function" === typeof ka ? ka : sa[ka], K, a);
                                J.addQueue(J);
                                J.run() }
                            N && (C = function() { var c = {},
                                    d = 0;
                                m && !isNaN(m) && (c.pha1 = m, d++);
                                va && !isNaN(va) && (c.pha2 = va, d++);
                                la && !isNaN(la) && (c.pha3 = la, d++); return d ? new ja(b, c, a) : 0 }()) && C.play();
                            if (Ja)
                                for (C = 1; 4 > C; C++)
                                    if (ga = u["WAVE_" + C + "_SWING_SETTINGS"])
                                        for (E in ga)(F = A[E]) && (new V(b, F + C, ga[E], a)).play();
                            a.addListener(z.jaCtuf6T_d7aoctiic);
                            Z && document.addEventListener("mousemove", S)
                        } else alert("BlobAnimation ERROR: There is no element with the specified id")
                    }
                    var y = jsband.Metronome,
                        I = jsband.Ease,
                        Ga = jsband.Tween,
                        na = jsband.CssProp,
                        wa = jsband.Queue,
                        V = jsband.Swing,
                        ia = jsband.Wave,
                        ja = jsband.Motion,
                        sa = { linear: I.lin(), quad: I.pow(2), cubic: I.pow(3), quart: I.pow(4), quint: I.pow(5), circ: I.circ(), sine: I.sin(), expo: I.exp(), elastic: I.osc2Out(), bounce: I.bncOut(), back: I.backOut() },
                        Ca = { sine: ia.sin, linear: ia.triangle, pulse: ia.pulse },
                        W = { amp1: 1, freq1: 1, pha1: 1, amp2: 1, freq2: 1, pha2: 1, amp3: 1, freq3: 1, pha3: 1 },
                        A = { amplitude: "amp", frequency: "freq", phase: "pha" };
                    ha.instances = {};
                    window.hasOwnProperty("BlobAnimation") ? alert('Unable to load "blob.js". Make sure that the document does not contain a global variable with the name "BlobAnimation"') : window.BlobAnimation = ha
                })();