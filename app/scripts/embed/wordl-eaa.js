(function(d) {
    function e(d) {
        if (!(this instanceof e)) return new e(d);
        d || (d = {});
        "number" == typeof d && (d = {
            w: d
        });
        null != d.A || (d.A = !0);
        this.options = d;
        this.w = d.w || e.I;
        this.M = 1E3 / this.w;
        this.N = this.w !== e.I;
        this.C = null;
        this.m = {};
        this.r = this.B = 0
    }
    var s = Date.now,
        M = d.setTimeout,
        k, w, z = !1;
    (function() {
        var e, r = ["ms", "moz", "webkit", "o"];
        k = d.requestAnimationFrame;
        w = d.cancelAnimationFrame;
        for (e = 0; e < r.length && !k; e++) k = k || d[r[e] + "RequestAnimationFrame"], w = w || d[r[e] + "CancelAnimationFrame"] || d[r[e] + "CancelRequestAnimationFrame"];
        k && k(function() {
            z = !0
        })
    })();
    e.I = 60;
    e.T = function(k) {
        var r = new e(k);
        d.requestAnimationFrame = function(d) {
            return r.S(d)
        };
        d.cancelAnimationFrame = function(d) {
            return r.cancel(d)
        };
        return r
    };
    e.prototype.request = function(d) {
        var e = this,
            t;
        ++this.r;
        if (z && e.options.A && !this.N) return k(d);
        if (!d) throw new TypeError("Not enough arguments");
        null == this.C && (t = this.M + this.B - (s ? s() : (new Date).getTime()), 0 > t && (t = 0), this.C = M(function() {
            var d;
            e.B = s ? s() : (new Date).getTime();
            e.C = null;
            ++e.r;
            for (d in e.m)
                if (e.m[d]) {
                    if (z && e.options.A) k(e.m[d]);
                    else e.m[d](e.B);
                    delete e.m[d]
                }
        }, t));
        this.m[this.r] = d;
        return this.r
    };
    e.prototype.cancel = function(d) {
        z && this.options.A && w(d);
        delete this.m[d]
    };
    "object" == typeof exports && "object" == typeof module ? module.R = e : "function" == typeof define && define.Q ? define(function() {
        return e
    }) : d.AnimationFrame = e
})(window);
window.TagulDisplayCloud = function(d, e, s, M) {
    function k(b) {
        return !isNaN(parseFloat(b)) && isFinite(b)
    }

    function w() {
        var b = g.offsetWidth,
            a = g.offsetHeight;
        E = 36E4 < b * a ? 1 : 1.5;
        g.width = E * b + 1;
        g.height = E * a + 1
    }

    function z() {
        if (v) {
            attribution.h = F;
            var b = G();
            attribution.e = b - Math.max(attribution.g - (b - attribution.e), 0);
            attribution.s = !0
        }
    }

    function I(b) {
        b = parseInt(b.replace("#", ""), 16);
        return {
            l: b >> 16 & 255,
            k: b >> 8 & 255,
            i: b & 255
        }
    }

    function r(b, a) {
        b = b.substring(1, b.length);
        b = I(b);
        return "rgba(" + b.l + "," + b.k + "," + b.i + "," + a.toFixed(4) +
            ")"
    }

    function t(b) {
        b = b.toString(16);
        return 1 == b.length ? "0" + b : b
    }

    function O(b, a, n) {
        c1 = I(b.substring(1, b.length));
        c2 = I(a.substring(1, a.length));
        return "#" + t(Math.round(c1.l * (1 - n) + c2.l * n)) + t(Math.round(c1.k * (1 - n) + c2.k * n)) + t(Math.round(c1.i * (1 - n) + c2.i * n))
    }

    function G() {
        return Date.now ? Date.now() : (new Date).getTime()
    }

    function J(b, a) {
        b.setTransform(a[0][0], a[1][0], a[0][1], a[1][1], a[0][2], a[1][2])
    }

    function u(b, a) {
        return [
            [1, 0, b],
            [0, 1, a]
        ]
    }

    function p(b, a) {
        return [
            [b[0][0] * a[0][0] + b[0][1] * a[1][0], b[0][0] * a[0][1] +
                b[0][1] * a[1][1], b[0][0] * a[0][2] + b[0][1] * a[1][2] + b[0][2]
            ],
            [b[1][0] * a[0][0] + b[1][1] * a[1][0], b[1][0] * a[0][1] + b[1][1] * a[1][1], b[1][0] * a[0][2] + b[1][1] * a[1][2] + b[1][2]]
        ]
    }

    function P(b) {
        var a = b[0][0] * b[1][1] - b[0][1] * b[1][0];
        return [
            [b[1][1] / a, -b[0][1] / a, (b[0][1] * b[1][2] - b[0][2] * b[1][1]) / a],
            [-b[1][0] / a, b[0][0] / a, (b[0][2] * b[1][0] - b[0][0] * b[1][2]) / a]
        ]
    }

    function Q(b) {
        return Math.sqrt(b[0][0] * b[0][0] + b[0][1] * b[0][1])
    }

    function A(b, a) {
        return {
            x: a[0][0] * b.x + a[0][1] * b.y + a[0][2],
            y: a[1][0] * b.x + a[1][1] * b.y + a[1][2]
        }
    }

    function B(b,
        a) {
        var n = A({
                x: b.x,
                y: b.y
            }, a),
            c = A({
                x: b.x + b.width,
                y: b.y + b.height
            }, a),
            d = A({
                x: b.x,
                y: b.y + b.height
            }, a),
            f = A({
                x: b.x + b.width,
                y: b.y
            }, a),
            e = Math.min(n.x, c.x, d.x, f.x),
            g = Math.min(n.y, c.y, d.y, f.y),
            h = Math.max(n.x, c.x, d.x, f.x),
            n = Math.max(n.y, c.y, d.y, f.y);
        return {
            x: e,
            y: g,
            width: h - e,
            height: n - g
        }
    }

    function t(b) {
        b = b.toString(16);
        return 1 == b.length ? "0" + b : b
    }

    function R(b, a) {
        var d = u(-b.bbox.J, -b.bbox.K),
            c = Math.pow(b.G / b.scale, a),
            d = p([
                [c, 0, 0],
                [0, c, 0]
            ], d),
            c = (b.P - b.L) * a,
            d = p([
                [Math.cos(c), Math.sin(c), 0],
                [-Math.sin(c), Math.cos(c),
                    0
                ]
            ], d);
        return p(u(b.bbox.J, b.bbox.K), d)
    }

    function S(b, a, d, c, f) {
        radius = 0.1 * Math.min(c, f);
        b.beginPath();
        b.moveTo(a + radius, d);
        b.lineTo(a + c - radius, d);
        b.quadraticCurveTo(a + c, d, a + c, d + radius);
        b.lineTo(a + c, d + f - radius);
        b.quadraticCurveTo(a + c, d + f, a + c - radius, d + f);
        b.lineTo(a + radius, d + f);
        b.quadraticCurveTo(a, d + f, a, d + f - radius);
        b.lineTo(a, d + radius);
        b.quadraticCurveTo(a, d, a + radius, d);
        b.closePath();
        b.fill()
    }

    function K(b, a) {
        for (var d = 0, c = 0, f = 0; f < a.glyphs.length; f++) {
            var e = a.glyphs[f],
                d = u(e.x - d, e.y - c);
            b.transform(d[0][0],
                d[1][0], d[0][1], d[1][1], d[0][2], d[1][2]);
            d = b;
            c = e.path;
            d.beginPath();
            for (var g = 0; g < c.length; g++) "M" == c[g] ? d.moveTo(c[++g], c[++g]) : "Q" == c[g] ? d.quadraticCurveTo(c[++g], c[++g], c[++g], c[++g]) : "C" == c[g] ? d.bezierCurveTo(c[++g], c[++g], c[++g], c[++g], c[++g], c[++g]) : "L" == c[g] && d.lineTo(c[++g], c[++g]);
            d.fill();
            d = e.x;
            c = e.y
        }
    }

    function T() {
        var b = {},
            a;
        for (a in d.outlines) b[a] = d.outlines[a].split(" ");
        for (a = 0; a < q.length; ++a)
            for (var f = 0; f < q[a].glyphs.length; ++f) q[a].glyphs[f].path = b[q[a].glyphs[f].glyph];
        void 0 != h.backgroundColor &&
            (l.fillStyle = r(h.backgroundColor, h.t), l.fillRect(0, 0, g.width, g.height));
        b = d.b;
        a = Math.min(0.95 * g.width / b.width, 0.95 * g.height / b.height);
        f = p([
            [a, 0, 0],
            [0, a, 0]
        ], u(-b.x + (g.width / a - b.width) / 2, -b.y + (g.height / a - b.height) / 2));
        for (a = 0; a < q.length; a++) {
            var c = q[a];
            l.fillStyle = c.fill;
            c.j = p(f, c.matrix);
            J(l, c.j);
            K(l, c);
            c.bbox.c = c.bbox.x + c.bbox.width;
            c.bbox.d = c.bbox.y + c.bbox.height;
            c.bbox.J = c.bbox.x + c.bbox.width / 2;
            c.bbox.K = c.bbox.y + c.bbox.height / 2;
            c.D = P(c.j);
            c.e = 0;
            c.scale = Q(c.matrix);
            c.G = h.zoom ? Math.max(1.1 * c.scale,
                0.15 * Math.sqrt(b.width * b.height / (c.bbox.width * c.bbox.height))) : c.scale;
            c.G = Math.min(c.G, Math.min(b.width / c.bbox.width, b.height / c.bbox.height));
            var e = c.matrix,
                k = Q(e),
                m = e[0][0] / k,
                e = e[0][1] / k,
                k = void 0,
                k = 1 < e ? 90 : -1 > e ? -90 : 180 * Math.asin(e) / Math.PI;
            0 > m && (k = 180 * (0 > e ? -1 : 1) - k);
            c.L = Math.round(k) * Math.PI / 180;
            c.P = h.rotate ? 0 : c.L;
            c.o = 0;
            c.p = 0;
            c.f = B(c.bbox, p(c.j, R(c, 1)));
            0 > c.f.x && (c.o = -c.f.x);
            c.f.x + c.f.width > g.width && (c.o = -(c.f.x + c.f.width) + g.width);
            0 > c.f.y && (c.p = -c.f.y);
            c.f.y + c.f.height > g.height && (c.p = -(c.f.y + c.f.height) +
                g.height);
            c.O = O(h.backgroundColor, c.fill, 0.2);
            v && c.fill && (attribution.backgroundColor = attribution.backgroundColor || {
                l: 0,
                k: 0,
                i: 0
            }, c = I(c.fill), attribution.backgroundColor.l += c.l, attribution.backgroundColor.k += c.k, attribution.backgroundColor.i += c.i)
        }
        h.q && (h.v = r(h.q, 1), h.v = h.v.substring(0, h.v.length - 7));
        N = l.getImageData(0, 0, g.width, g.height);
        if (v) {
            attribution.backgroundColor.l /= q.length;
            attribution.backgroundColor.k /= q.length;
            attribution.backgroundColor.i /= q.length;
            attribution.backgroundColor = "#" + (65536 *
                attribution.backgroundColor.l + 256 * attribution.backgroundColor.k + attribution.backgroundColor.i).toString(16);
            attribution.backgroundColor = r(attribution.backgroundColor, 0.8);
            attribution.n = h.backgroundColor;
            for (a = 0; a < attribution.data.tags.length; a++) c = attribution.data.tags[a], b = B(c.bbox, c.matrix), attribution.b = attribution.b ? {
                x: Math.min(b.x, attribution.b.x),
                y: Math.min(b.y, attribution.b.y),
                c: Math.max(b.x + b.width, attribution.b.c),
                d: Math.max(b.y + b.height, attribution.b.d)
            } : {
                x: b.x,
                y: b.y,
                c: b.x + b.width,
                d: b.y +
                    b.height
            };
            attribution.b.width = attribution.b.c - attribution.b.x;
            attribution.b.height = attribution.b.d - attribution.b.y;
            a = Math.min(g.width / attribution.b.width, g.height / attribution.b.height);
            a = Math.min(a, Math.sqrt(0.02 * g.width * g.height / (attribution.b.width * attribution.b.height)));
            c = attribution.data.tags[0];
            c.bbox.c = c.bbox.x + c.bbox.width;
            c.bbox.d = c.bbox.y + c.bbox.height;
            c.j = p(p([
                [a, 0, 0],
                [0, a, 0]
            ], u(-attribution.b.x + (g.width / a - 1 * attribution.b.width), -attribution.b.y + (g.height / a - 0 * attribution.b.height))), c.matrix);
            c.o = 0;
            c.p = -attribution.b.height * a;
            c.D = P(p(u(1 * c.o, 1 * c.p), c.j));
            for (f = 0; f < c.glyphs.length; ++f) c.glyphs[f].path = attribution.data.outlines[c.glyphs[f].glyph].split(" ")
        }
    }

    function U() {
        if (m && 0 < m.length || v && attribution.s) {
            f && l.putImageData(N, 0, 0, f.x - 2, f.y - 2, f.width + 4, f.height + 4);
            f = void 0;
            for (var b = 0; b < m.length; b++) {
                var a = m[b];
                l.fillStyle = a.O;
                J(l, a.j);
                K(l, a)
            }
            for (var d = G(), b = 0; b < m.length; b++) {
                var a = m[b],
                    c = (d - a.e) / (1E3 * h.g),
                    c = 1 < c ? 1 : c;
                0.5 < c && a != C && a.h == F && (a.h = D, c = 1 - c, a.e = d - 1E3 * c * h.g);
                a.h == D && (c = 1 - c);
                var e;
                0 < c ? (e = p(a.j, R(a, c)), e = p(u(c * a.o, c * a.p), e)) : e = a.j;
                J(l, e);
                f ? (e = B(a.bbox, e), f = {
                    x: Math.min(f.x, e.x),
                    y: Math.min(f.y, e.y),
                    c: Math.max(f.c, e.x + e.width),
                    d: Math.max(f.d, e.y + e.height)
                }, f.width = f.c - f.x, f.height = f.d - f.y) : (f = B(a.bbox, e), f.c = f.x + f.width, f.d = f.y + f.height);
                h.q && (l.fillStyle = h.v + (c * h.u).toFixed(4) + ")", S(l, a.bbox.x, a.bbox.y, a.bbox.width, a.bbox.height));
                l.fillStyle = h.n ? O(a.fill, h.n, c) : a.fill;
                K(l, a);
                d > a.e + 1E3 * h.g && a.h == D && (m.splice(b, 1), b--)
            }
            v && (attribution.s || f) && (a = attribution.data.tags[0], c = (d - attribution.e) /
                attribution.g, c = 1 < c ? 1 : c, 1 <= c && (attribution.s = !1), attribution.h == D && (c = 1 - c), e = p(u(c * a.o, c * a.p), a.j), f ? (e = B(a.bbox, e), f = {
                    x: Math.min(f.x, e.x),
                    y: Math.min(f.y, e.y),
                    c: Math.max(f.c, e.x + e.width),
                    d: Math.max(f.d, e.y + e.height)
                }, f.width = f.c - f.x, f.height = f.d - f.y) : (f = B(a.bbox, e), f.c = f.x + f.width, f.d = f.y + f.height), l.fillStyle = attribution.backgroundColor, J(l, p(u(c * a.o, c * a.p), a.j)), S(l, a.bbox.x, a.bbox.y, a.bbox.width, a.bbox.height), l.fillStyle = attribution.n, K(l, a))
        }
        L && L.request(U)
    }
    if (!e)
        if (d)
            if (e = document.createElement("canvas"),
                e.getContext && e.getContext("2d")) {
                for (var x = 0; document.getElementById(e = "tagul_embed_cloud_" + x);) x++;
                document.writeln('<a id="' + e + '" style="width: 100%; height: 100%">');
                document.writeln('<canvas style="width: 100%; height: 100%"></canvas>');
                document.writeln("</a>");
                var x = document.getElementsByTagName("head")[0],
                    H = document.createElement("style"),
                    V = document.createTextNode("#" + e + " {outline: 0; border: 0; background: none; margin: 0; padding: 0;}\n#" + e + ":hover {border: 0;}\n");
                H.type = "text/css";
                H.styleSheet ?
                    H.styleSheet.cssText = V.nodeValue : H.appendChild(V);
                x.appendChild(H)
            } else {
                document.writeln('<a href="http://tagul.com/unsupported-browser" style="width: 100%; height: 100%">');
                document.writeln('<img src="http://tagul.com/static/please_update_browser.png" style="width: 100%; height: auto"/>');
                document.writeln("</a>");
                return
            } else {
        document.writeln("<div>Sorry! Cloud does not exist!</div>");
        return
    }
    var v = !1;
    d.b = {
        x: d.viewBox.x,
        y: d.viewBox.y,
        width: d.viewBox.width,
        height: d.viewBox.height
    };
    d.a = d.styleOptions;
    d.a.backgroundColor = d.a.backgroundColor;
    d.a.t = d.a.backgroundColorAlpha;
    d.a.g = d.a.animationSpeed;
    d.a.n = d.a.textColor;
    d.a.H = d.a.textAlpha;
    d.a.q = d.a.boxColor;
    d.a.u = d.a.boxAlpha;
    d.a.zoom = d.a.zoom;
    d.a.rotate = d.a.rotate;
    d.a.F = d.a.openLinksInNewWindow;
    x = {};
    s = "boolean" == typeof s ? s : !0;
    var E, f, q = d.tags,
        N, C = null,
        m = [],
        F = 0,
        D = 1;
    x.cleanUp = function() {
        h = L = m = C = N = f = g = l = y = null
    };
    var y = document.getElementById(e),
        g = y.getElementsByTagName("canvas")[0];
    window.onresize = function() {
        w();
        T()
    };
    w();
    var l = g.getContext("2d");
    l.clearRect(0,
        0, g.width, g.height);
    v && (g.onmouseover = z);
    g.onmousemove = function(b) {
        var a = g,
            d = 0,
            c = 0;
        if (void 0 !== a.offsetParent) {
            do d += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent)
        }
        d += W + X + Y;
        c += Z + $ + aa;
        b = {
            x: (b.pageX - d) * E,
            y: (b.pageY - c) * E
        };
        if (v && (a = attribution.data.tags[0], d = A(b, a.D), a = a.bbox, !(d.x < a.x || d.x > a.c || d.y < a.y || d.y > a.d))) {
            g.style.cursor = "pointer";
            y.href = attribution.url;
            y.target = "_blank";
            C = null;
            return
        }
        for (a = q.length - 1; 0 <= a && (d = A(b, q[a].D), c = q[a].bbox, d.x < c.x || d.x > c.c || d.y < c.y || d.y > c.d); a--);
        a = 0 <= a ? q[a] :
            null;
        null != a ? g.style.cursor = "pointer" : (g.style.cursor = "auto", y.removeAttribute("href"));
        a != C && null != a && (y.href = a.url ? a.url : "javascript:void(0);", y.target = h.F || M ? "_blank" : "_self", null != a && a.h != F && (a.h = F, b = G(), a.e = b - Math.max(1E3 * h.g - (b - a.e), 0), -1 == m.indexOf(a) && m.push(a)));
        C = a
    };
    g.onmouseout = function() {
        for (var b = 0; b < m.length; b++) {
            var a = m[b];
            if (a.h == F) {
                a.h = D;
                var d = G();
                a.e = d - Math.max(1E3 * h.g - (d - a.e), 0);
                C = null
            }
        }
        v && (attribution.h = D, d = G(), attribution.e = d - Math.max(attribution.g - (d - attribution.e), 0), attribution.s = !0)
    };
    var L = L || new window.AnimationFrame(60),
        W = parseInt(document.defaultView.getComputedStyle(g, void 0).paddingLeft, 10) || 0,
        Z = parseInt(document.defaultView.getComputedStyle(g, void 0).paddingTop, 10) || 0,
        X = parseInt(document.defaultView.getComputedStyle(g, void 0).borderLeftWidth, 10) || 0,
        $ = parseInt(document.defaultView.getComputedStyle(g, void 0).borderTopWidth, 10) || 0;
    e = document.body.parentNode;
    var aa = e.offsetTop,
        Y = e.offsetLeft,
        h = {
            backgroundColor: d.a.backgroundColor ? "#" + d.a.backgroundColor : "#FFFFFF",
            t: k(d.a.t) ?
                d.a.t : 1,
            g: k(d.a.g) ? d.a.g : 0.3,
            n: d.a.n ? "#" + d.a.n : void 0,
            H: k(d.a.H) ? d.a.H : 1,
            q: d.a.q ? "#" + d.a.q : void 0,
            u: k(d.a.u) ? d.a.u : 0.8,
            zoom: !0 == d.a.zoom,
            rotate: !0 == d.a.rotate,
            F: !0 == d.a.F
        },
        W, Z, X, $, aa, Y;
    T();
    s && U();
    return x
};
TagulDisplayCloud({
    "viewBox": {
        "x": 38.228928207816416,
        "y": 4.235689417818437,
        "width": 160.25313795217352,
        "height": 232.9147708623121
    },
    "styleOptions": {
        "backgroundColor": "ffffff",
        "backgroundColorAlpha": 1,
        "animationSpeed": 0.2,
        "textColor": "ffffff",
        "textAlpha": 1,
        "boxColor": "000000",
        "boxAlpha": 0.7,
        "zoom": true,
        "rotate": true,
        "openLinksInNewWindow": true
    },
    "outlines": {
        "0.32": "M 305 -178 L 133 -178 L 94 -14 Q 92 -6 86 -2 Q 80 2 56 2 Q 48 2 33.5 1.5 Q 19 1 5 -1 L 183 -689 Q 186 -703 214 -703 Q 237 -703 252 -700 L 431 -15 Q 433 -7 426.5 -2.5 Q 420 2 396 2 Q 387 2 375 2 Q 363 2 348 0 L 305 -178 M 150 -252 L 288 -252 L 254 -394 Q 248 -419 242.5 -445 Q 237 -471 232.5 -496.5 Q 228 -522 224.5 -545 Q 221 -568 219 -586 Q 217 -568 213 -545 Q 209 -522 204.5 -497 Q 200 -472 195 -445.5 Q 190 -419 184 -394 L 150 -252 ",
        "0.79": "M 343 163 Q 343 175 341.5 181.5 Q 340 188 334.5 191.5 Q 329 195 319.5 196.5 Q 310 198 295 198 Q 277 198 261 195 L 261 -34 Q 231 10 166 10 Q 142 10 118 2 Q 94 -6 74.5 -30.5 Q 55 -55 43 -99.5 Q 31 -144 31 -218 Q 31 -301 47 -357 Q 63 -413 91 -447 Q 119 -481 156.5 -495.5 Q 194 -510 236 -510 Q 271 -510 295.5 -502.5 Q 320 -495 343 -479 L 343 163 M 261 -425 Q 245 -439 215 -439 Q 193 -439 176 -428 Q 159 -417 147 -391 Q 135 -365 129 -323 Q 123 -281 123 -220 Q 123 -169 129.5 -138 Q 136 -107 146.5 -90 Q 157 -73 170 -67 Q 183 -61 196 -61 Q 216 -61 233.5 -73.5 Q 251 -86 261 -112 L 261 -425 ",
        "0.83": "M 343 -26 Q 314 -10 274.5 0 Q 235 10 194 10 Q 149 10 120 0 Q 91 -10 74 -31 Q 57 -52 50.5 -83 Q 44 -114 44 -156 L 44 -483 Q 44 -489 45.5 -492.5 Q 47 -496 54.5 -497.5 Q 62 -499 79 -499.5 Q 96 -500 128 -500 L 128 -149 Q 128 -100 141 -80.5 Q 154 -61 195 -61 Q 209 -61 227.5 -64.5 Q 246 -68 262 -79 L 262 -483 Q 262 -489 263.5 -492.5 Q 265 -496 272.5 -497.5 Q 280 -499 296.5 -499.5 Q 313 -500 343 -500 L 343 -26 ",
        "0.71": "M 129 -16 Q 129 -10 127.5 -6.5 Q 126 -3 118 -1.5 Q 110 0 93.5 0 Q 77 0 46 0 L 46 -463 Q 46 -477 49.5 -484.5 Q 53 -492 62.5 -495.5 Q 72 -499 88 -499.5 Q 104 -500 129 -500 L 129 -16 M 47 -659 Q 48 -686 59 -702.5 Q 70 -719 94 -719 Q 117 -719 126 -706 Q 135 -693 134 -661 Q 134 -630 122.5 -613 Q 111 -596 88 -596 Q 68 -596 57.5 -610 Q 47 -624 47 -659 ",
        "0.68": "M 12 -431 Q 12 -455 12.5 -469 Q 13 -483 15 -489.5 Q 17 -496 21 -498 Q 25 -500 33 -500 L 81 -500 L 81 -560 Q 81 -618 96.5 -653.5 Q 112 -689 136.5 -708 Q 161 -727 190.5 -733 Q 220 -739 249 -739 Q 295 -739 318.5 -728 Q 342 -717 342 -698 Q 342 -687 340 -675.5 Q 338 -664 333 -653 Q 315 -661 297 -663 Q 279 -665 262 -665 Q 242 -665 224 -662 Q 206 -659 192.5 -648.5 Q 179 -638 170.5 -618.5 Q 162 -599 162 -567 L 162 -500 L 252 -500 Q 252 -476 251.5 -462 Q 251 -448 249.5 -441.5 Q 248 -435 244.5 -433 Q 241 -431 235 -431 L 162 -431 L 162 -16 Q 162 -14 159.5 -7 Q 157 0 146 0 L 81 0 L 81 -431 L 12 -431 ",
        "0.67": "M 208 -510 Q 335 -510 335 -349 Q 335 -316 332.5 -281 Q 330 -246 324 -219 Q 298 -214 269 -211 Q 240 -208 211.5 -206 Q 183 -204 158 -203.5 Q 133 -203 115 -203 Q 116 -163 122.5 -137 Q 129 -111 140 -96 Q 151 -81 168 -75 Q 185 -69 208 -69 Q 238 -69 267 -77.5 Q 296 -86 322 -100 Q 326 -89 327.5 -73 Q 329 -57 329 -45 Q 329 -33 318 -23 Q 307 -13 288 -5.5 Q 269 2 244 6 Q 219 10 191 10 Q 156 10 126.5 1 Q 97 -8 76 -33.5 Q 55 -59 43 -105 Q 31 -151 31 -224 Q 31 -318 46.5 -374.5 Q 62 -431 86.5 -461 Q 111 -491 143 -500.5 Q 175 -510 208 -510 M 199 -439 Q 184 -439 170 -431.5 Q 156 -424 144.5 -404.5 Q 133 -385 125.5 -352.5 Q 118 -320 116 -269 Q 130 -269 148 -269 Q 166 -269 184.5 -270.5 Q 203 -272 220.5 -274 Q 238 -276 251 -280 Q 254 -294 255 -310 Q 256 -326 256 -340 Q 255 -394 243 -416.5 Q 231 -439 199 -439 ",
        "0.80": "M 45 -465 Q 74 -485 109 -497.5 Q 144 -510 181 -510 Q 219 -510 235 -499 Q 251 -488 251 -468 Q 251 -460 249 -446.5 Q 247 -433 242 -420 Q 219 -432 194 -432 Q 177 -432 159.5 -426.5 Q 142 -421 128 -409 L 127 -16 Q 127 -10 125.5 -6.5 Q 124 -3 116.5 -1.5 Q 109 0 92 0 Q 75 0 45 0 L 45 -465 ",
        "0.3": "",
        "0.34": "M 228 -710 Q 256 -710 274 -705 Q 292 -700 302.5 -692 Q 313 -684 317.5 -674.5 Q 322 -665 322 -655 Q 322 -641 318 -628 Q 314 -615 309 -606 Q 301 -613 284 -622 Q 267 -631 244 -631 Q 220 -631 197.5 -620 Q 175 -609 157 -577 Q 139 -545 128 -484.5 Q 117 -424 117 -325 Q 117 -249 124.5 -200.5 Q 132 -152 145 -124.5 Q 158 -97 176.5 -88.5 Q 195 -80 217 -80 Q 246 -80 270.5 -90 Q 295 -100 309 -111 Q 314 -101 317.5 -88 Q 321 -75 321 -62 Q 321 -33 287 -11.5 Q 253 10 197 10 Q 161 13 131 1.5 Q 101 -10 78.5 -45 Q 56 -80 43.5 -146 Q 31 -212 31 -321 Q 31 -449 49.5 -526.5 Q 68 -604 96.5 -645.5 Q 125 -687 160 -698.5 Q 195 -710 228 -710 ",
        "0.77": "M 24 -250 Q 24 -387 67.5 -448.5 Q 111 -510 190 -510 Q 229 -510 258.5 -498.5 Q 288 -487 307 -457.5 Q 326 -428 335.5 -378.5 Q 345 -329 345 -253 Q 345 -113 303 -51.5 Q 261 10 181 10 Q 142 10 113 1 Q 84 -8 64 -35.5 Q 44 -63 34 -114.5 Q 24 -166 24 -250 M 112 -248 Q 112 -186 116.5 -149 Q 121 -112 130 -92 Q 139 -72 152.5 -65.5 Q 166 -59 183 -59 Q 199 -59 212.5 -67 Q 226 -75 236 -97 Q 246 -119 251.5 -156 Q 257 -193 257 -252 Q 257 -312 252.5 -348.5 Q 248 -385 239.5 -405 Q 231 -425 218 -432 Q 205 -439 187 -439 Q 170 -439 156.5 -431 Q 143 -423 133 -402 Q 123 -381 117.5 -343.5 Q 112 -306 112 -248 ",
        "0.76": "M 45 -476 Q 60 -482 79 -488.5 Q 98 -495 119 -499.5 Q 140 -504 161.5 -507 Q 183 -510 203 -510 Q 282 -510 313 -479.5 Q 344 -449 344 -376 L 344 -16 Q 344 -10 342.5 -6.5 Q 341 -3 333 -1.5 Q 325 0 308 0 Q 291 0 260 0 L 260 -352 Q 260 -400 249 -419.5 Q 238 -439 200 -439 Q 184 -439 163.5 -434.5 Q 143 -430 126 -421 L 126 -16 Q 126 -10 124.5 -6.5 Q 123 -3 115 -1.5 Q 107 0 91 0 Q 75 0 45 0 L 45 -476 ",
        "0.66": "M 257 -426 Q 247 -434 237 -436.5 Q 227 -439 211 -439 Q 194 -439 178.5 -431 Q 163 -423 150.5 -401.5 Q 138 -380 130.5 -341 Q 123 -302 123 -241 Q 123 -185 128 -150 Q 133 -115 143 -95.5 Q 153 -76 166.5 -69.5 Q 180 -63 198 -63 Q 215 -63 230 -66.5 Q 245 -70 257 -78 L 257 -426 M 257 -698 Q 257 -712 260.5 -719.5 Q 264 -727 273 -730.5 Q 282 -734 297.5 -734.5 Q 313 -735 338 -735 L 338 -20 Q 313 -8 277.5 1 Q 242 10 195 10 Q 162 10 132.5 2.5 Q 103 -5 80.5 -30 Q 58 -55 45 -103 Q 32 -151 32 -232 Q 32 -306 44 -359 Q 56 -412 77 -445.5 Q 98 -479 126 -494.5 Q 154 -510 186 -510 Q 231 -510 257 -490 L 257 -698 ",
        "0.82": "M 86 -430 L 18 -430 Q 18 -453 18.5 -467 Q 19 -481 20.5 -488.5 Q 22 -496 26 -498 Q 30 -500 36 -500 L 86 -500 L 86 -652 Q 86 -662 89.5 -668 Q 93 -674 102 -676.5 Q 111 -679 127 -679.5 Q 143 -680 168 -680 L 168 -500 L 270 -500 Q 270 -476 269.5 -462.5 Q 269 -449 267.5 -441.5 Q 266 -434 263 -432 Q 260 -430 254 -430 L 168 -430 L 168 -139 Q 168 -123 168.5 -108.5 Q 169 -94 172.5 -83.5 Q 176 -73 183 -66.5 Q 190 -60 204 -60 Q 221 -60 234 -63.5 Q 247 -67 262 -75 Q 264 -67 266 -57 Q 268 -47 268 -35 Q 268 -21 260 -12.5 Q 252 -4 239.5 1 Q 227 6 212 8 Q 197 10 182 10 Q 150 10 131 -0.5 Q 112 -11 102 -30.5 Q 92 -50 89 -77.5 Q 86 -105 86 -139 L 86 -430 ",
        "0.81": "M 194 -510 Q 233 -510 257.5 -504 Q 282 -498 296 -489.5 Q 310 -481 315 -471 Q 320 -461 320 -454 Q 320 -433 302 -413 Q 259 -439 204 -439 Q 169 -439 147 -426.5 Q 125 -414 125 -391 Q 125 -377 132 -363.5 Q 139 -350 165 -329 L 258 -254 Q 290 -222 303.5 -194.5 Q 317 -167 317 -129 Q 317 -62 273 -26 Q 229 10 152 10 Q 98 10 64 -2.5 Q 30 -15 30 -41 Q 30 -50 33 -62 Q 36 -74 44 -88 Q 87 -63 144 -63 Q 182 -63 203.5 -79 Q 225 -95 225 -125 Q 225 -145 216.5 -164 Q 208 -183 185 -203 L 88 -286 Q 54 -314 42.5 -340.5 Q 31 -367 31 -392 Q 31 -444 70.5 -477 Q 110 -510 194 -510 ",
        "0.49": "M 43 -683 Q 43 -687 45 -691 Q 47 -694 50 -697 Q 53 -700 60 -700 L 159 -700 Q 254 -700 298.5 -653.5 Q 343 -607 343 -502 Q 343 -421 319 -374.5 Q 295 -328 256 -306 Q 268 -291 282.5 -266 Q 297 -241 311 -206 Q 325 -171 335.5 -124 Q 346 -77 350 -18 Q 350 -7 344 -2.5 Q 338 2 309 2 Q 299 2 287 1.5 Q 275 1 261 0 Q 257 -63 247 -111 Q 237 -159 225 -193.5 Q 213 -228 200.5 -250.5 Q 188 -273 179 -285 Q 174 -284 169 -284 Q 164 -284 159 -284 L 124 -284 L 124 -16 Q 124 -10 122.5 -6.5 Q 121 -3 113.5 -1.5 Q 106 0 89.5 0 Q 73 0 43 0 L 43 -683 M 253 -506 Q 253 -563 236 -596 Q 219 -629 174 -629 L 124 -629 L 124 -359 L 168 -359 Q 210 -359 231.5 -392.5 Q 253 -426 253 -506 ",
        "0.65": "M 294 -465 Q 294 -457 292 -445 Q 290 -433 285 -420 Q 273 -427 254 -432.5 Q 235 -438 215 -438 Q 197 -438 179.5 -432 Q 162 -426 148 -405.5 Q 134 -385 125 -345.5 Q 116 -306 116 -239 Q 116 -186 121.5 -152 Q 127 -118 138 -98 Q 149 -78 165.5 -70 Q 182 -62 205 -62 Q 229 -62 250 -69.5 Q 271 -77 284 -85 Q 288 -71 290 -61 Q 292 -51 292 -41 Q 292 -21 261 -5.5 Q 230 10 180 10 Q 144 10 116.5 1 Q 89 -8 70 -35 Q 51 -62 41 -111 Q 31 -160 31 -239 Q 31 -329 47.5 -382.5 Q 64 -436 90 -464.5 Q 116 -493 148 -501.5 Q 180 -510 211 -510 Q 246 -510 270 -497.5 Q 294 -485 294 -465 ",
        "0.70": "M 45 -698 Q 45 -712 48 -719.5 Q 51 -727 60 -730.5 Q 69 -734 85 -734.5 Q 101 -735 126 -735 L 126 -471 Q 149 -491 179 -500.5 Q 209 -510 238 -510 Q 270 -510 290.5 -501 Q 311 -492 322.5 -475.5 Q 334 -459 338 -434 Q 342 -409 342 -378 L 342 -16 Q 342 -10 340 -6.5 Q 338 -3 330 -1.5 Q 322 0 305 0 Q 288 0 258 0 L 258 -355 Q 258 -371 256 -386 Q 254 -401 248 -411.5 Q 242 -422 230.5 -428.5 Q 219 -435 201 -435 Q 184 -435 164 -429 Q 144 -423 126 -407 L 126 -16 Q 126 -10 124.5 -6.5 Q 123 -3 115.5 -1.5 Q 108 0 91.5 0 Q 75 0 45 0 L 45 -698 ",
        "0.63": "M 30 -455 Q 30 -463 32.5 -470.5 Q 35 -478 41 -483 Q 54 -491 95 -500.5 Q 136 -510 193 -510 Q 258 -510 287.5 -483 Q 317 -456 317 -388 L 317 -335 Q 317 -292 317 -248.5 Q 317 -205 316 -164.5 Q 315 -124 314 -88 Q 313 -52 311 -24 Q 291 -12 256 -1 Q 221 10 172 10 Q 145 10 119 6 Q 93 2 73 -14 Q 53 -30 41 -60.5 Q 29 -91 29 -142 Q 29 -194 40.5 -226 Q 52 -258 70.5 -276 Q 89 -294 113 -300 Q 137 -306 162 -306 Q 179 -306 199.5 -303.5 Q 220 -301 235 -293 L 235 -372 Q 235 -407 219 -419 Q 203 -431 173 -431 Q 135 -431 99 -424.5 Q 63 -418 41 -409 Q 34 -421 32 -433.5 Q 30 -446 30 -455 M 235 -236 Q 225 -241 212 -243 Q 199 -245 188 -245 Q 173 -245 159.5 -241.5 Q 146 -238 136 -227 Q 126 -216 120 -196.5 Q 114 -177 114 -144 Q 114 -117 118.5 -100 Q 123 -83 131.5 -73.5 Q 140 -64 152 -61 Q 164 -58 179 -58 Q 196 -58 210.5 -63 Q 225 -68 232 -75 Q 233 -87 233.5 -106.5 Q 234 -126 234.5 -148 Q 235 -170 235 -193 Q 235 -216 235 -236 ",
        "0.69": "M 205 -510 Q 215 -510 228.5 -508 Q 242 -506 255 -502 L 375 -502 Q 378 -497 380.5 -487 Q 383 -477 383 -463 Q 383 -432 355 -432 Q 341 -432 319 -437 Q 336 -420 346.5 -393 Q 357 -366 357 -329 Q 357 -249 319.5 -201.5 Q 282 -154 195 -154 Q 167 -154 150 -158 Q 140 -148 132 -136 Q 124 -124 124 -114 Q 124 -107 133 -102.5 Q 142 -98 158 -95 Q 174 -92 195.5 -89 Q 217 -86 242 -83 Q 272 -78 296 -70.5 Q 320 -63 337.5 -49.5 Q 355 -36 364.5 -16 Q 374 4 374 34 Q 374 66 363 95.5 Q 352 125 328.5 147.5 Q 305 170 268.5 183.5 Q 232 197 182 197 Q 132 197 100.5 187.5 Q 69 178 51.5 162 Q 34 146 28 127 Q 22 108 22 88 Q 22 51 44 20.5 Q 66 -10 98 -32 Q 69 -40 52.5 -53.5 Q 36 -67 37 -87 Q 38 -107 55 -130.5 Q 72 -154 101 -177 Q 66 -200 52.5 -239.5 Q 39 -279 39 -327 Q 39 -377 51 -412 Q 63 -447 85 -468.5 Q 107 -490 137.5 -500 Q 168 -510 205 -510 M 202 -450 Q 170 -450 147.5 -422.5 Q 125 -395 125 -329 Q 125 -302 128 -281 Q 131 -260 139 -245.5 Q 147 -231 161.5 -223.5 Q 176 -216 199 -216 Q 239 -216 257 -249 Q 275 -282 275 -348 Q 275 -403 256.5 -426.5 Q 238 -450 202 -450 M 178 -19 Q 173 -19 169 -19.5 Q 165 -20 160 -21 Q 138 -4 122 20 Q 106 44 106 69 Q 106 81 109.5 90.5 Q 113 100 122 107 Q 131 114 147.5 118 Q 164 122 190 122 Q 217 122 236 115 Q 255 108 267.5 96.5 Q 280 85 286 71.5 Q 292 58 292 45 Q 292 28 286.5 17 Q 281 6 268 -1.5 Q 255 -9 233 -13 Q 211 -17 178 -19 ",
        "0.57": "M 44 -683 Q 44 -700 61 -700 L 360 -700 Q 364 -694 366 -688.5 Q 368 -683 368 -673 Q 368 -653 360 -637 L 105 -73 L 298 -73 Q 315 -73 330 -74 Q 345 -75 357 -80 L 357 -16 Q 357 -9 354 -4.5 Q 351 0 340 0 L 28 0 Q 23 -5 19 -13 Q 15 -21 15 -32 Q 15 -49 23 -68 L 274 -627 L 88 -627 Q 74 -627 62.5 -626.5 Q 51 -626 44 -624 L 44 -683 ",
        "0.74": "M 127 -16 Q 127 -10 125.5 -6.5 Q 124 -3 116.5 -1.5 Q 109 0 92.5 0 Q 76 0 46 0 L 46 -698 Q 46 -712 49.5 -719.5 Q 53 -727 62 -730.5 Q 71 -734 87 -734.5 Q 103 -735 127 -735 L 127 -16 ",
        "0.44": "M 43 -683 Q 43 -695 48 -697.5 Q 53 -700 60 -700 L 119 -700 L 214 -398 Q 218 -383 223.5 -365 Q 229 -347 233.5 -330 Q 238 -313 241.5 -301 Q 245 -289 246 -286 Q 246 -287 249 -299.5 Q 252 -312 256.5 -328.5 Q 261 -345 265.5 -363 Q 270 -381 275 -395 L 363 -683 Q 365 -691 368 -695.5 Q 371 -700 379 -700 L 445 -700 L 445 -16 Q 445 -10 443.5 -6.5 Q 442 -3 434.5 -1.5 Q 427 0 410 0 Q 393 0 362 0 L 365 -243 Q 366 -279 368.5 -325 Q 371 -371 374 -414.5 Q 377 -458 379.5 -492 Q 382 -526 383 -538 Q 375 -510 365 -474.5 Q 355 -439 346 -406.5 Q 337 -374 329.5 -348.5 Q 322 -323 319 -314 L 266 -162 Q 264 -157 261 -155.5 Q 258 -154 255 -154 L 220 -154 L 168 -314 Q 165 -322 157.5 -347.5 Q 150 -373 140.5 -406 Q 131 -439 121 -475 Q 111 -511 103 -540 L 103 -539 Q 108 -486 112 -433 Q 116 -388 118.5 -337.5 Q 121 -287 122 -247 L 124 -16 Q 124 -10 122 -6.5 Q 120 -3 112 -1.5 Q 104 0 87.5 0 Q 71 0 43 0 L 43 -683 ",
        "0.75": "M 244 -389 Q 243 -416 234 -427.5 Q 225 -439 195 -439 Q 160 -439 127 -422 L 127 -16 Q 127 -10 125.5 -6.5 Q 124 -3 116 -1.5 Q 108 0 91.5 0 Q 75 0 46 0 L 46 -477 Q 79 -492 117 -501 Q 155 -510 197 -510 Q 229 -510 251 -502 Q 273 -494 287 -479 Q 313 -493 346 -501.5 Q 379 -510 410 -510 Q 447 -510 469.5 -500.5 Q 492 -491 503.5 -473 Q 515 -455 518.5 -429 Q 522 -403 522 -369 L 522 -16 Q 522 -10 520.5 -6.5 Q 519 -3 511 -1.5 Q 503 0 486.5 0 Q 470 0 441 0 L 441 -370 Q 441 -406 431.5 -422 Q 422 -438 392 -438 Q 375 -438 358.5 -434 Q 342 -430 325 -419 L 325 -16 Q 325 -10 324 -6.5 Q 323 -3 315.5 -1.5 Q 308 0 291.5 0 Q 275 0 244 0 L 244 -389 ",
        "0.35": "M 168 -700 Q 217 -700 254 -685 Q 291 -670 315.5 -634 Q 340 -598 352 -537.5 Q 364 -477 364 -386 Q 364 -276 351 -202 Q 338 -128 313 -83 Q 288 -38 251.5 -19 Q 215 0 169 0 L 44 0 L 44 -681 Q 44 -690 49 -695 Q 54 -700 71 -700 L 168 -700 M 271 -394 Q 271 -463 265 -508 Q 259 -553 246.5 -579 Q 234 -605 215 -615 Q 196 -625 171 -625 L 125 -625 L 125 -77 L 170 -77 Q 189 -77 207.5 -87.5 Q 226 -98 240 -131.5 Q 254 -165 262.5 -227.5 Q 271 -290 271 -394 ",
        "0.38": "M 241 -709 Q 292 -709 320 -694 Q 348 -679 348 -659 Q 348 -645 345 -632 Q 342 -619 337 -608 Q 324 -619 303.5 -625.5 Q 283 -632 258 -632 Q 220 -632 192.5 -617.5 Q 165 -603 147.5 -569.5 Q 130 -536 122 -479.5 Q 114 -423 114 -339 Q 114 -250 121 -197 Q 128 -144 141 -115.5 Q 154 -87 173.5 -78.5 Q 193 -70 217 -70 Q 243 -70 257 -79 Q 271 -88 275 -94 L 275 -342 L 202 -342 L 202 -394 Q 202 -411 221 -411 L 352 -411 L 351 -35 Q 334 -20 300.5 -5.5 Q 267 9 215 9 Q 165 9 129 -5 Q 93 -19 70.5 -57 Q 48 -95 37.5 -162 Q 27 -229 27 -334 Q 27 -451 42 -524.5 Q 57 -598 84.5 -639 Q 112 -680 151.5 -694.5 Q 191 -709 241 -709 ",
        "0.43": "M 125 -76 L 297 -76 L 297 -16 Q 297 -6 292.5 -3 Q 288 0 280 0 L 43 0 L 43 -677 Q 43 -686 44.5 -690.5 Q 46 -695 54 -697 Q 62 -699 78.5 -699.5 Q 95 -700 125 -700 L 125 -76 ",
        "0.7": "M 227 -706 Q 294 -706 335.5 -691.5 Q 377 -677 377 -659 Q 377 -645 371.5 -627.5 Q 366 -610 357 -599 Q 328 -619 299.5 -626.5 Q 271 -634 237 -634 Q 218 -634 201.5 -631.5 Q 185 -629 172.5 -621 Q 160 -613 153 -598 Q 146 -583 146 -558 Q 146 -531 163 -489 Q 180 -447 208 -398 Q 236 -349 271 -298 Q 306 -247 342 -201 Q 347 -227 348.5 -250.5 Q 350 -274 350 -291 Q 350 -370 332.5 -418 Q 315 -466 290 -496 Q 303 -499 319.5 -500.5 Q 336 -502 352 -502.5 Q 368 -503 382 -503.5 Q 396 -504 405 -504 Q 428 -504 446.5 -503.5 Q 465 -503 482 -501 Q 483 -499 484 -490.5 Q 485 -482 485 -471 Q 485 -456 478 -445.5 Q 471 -435 443 -435 L 394 -435 Q 399 -426 405 -414 Q 411 -402 416.5 -384 Q 422 -366 425.5 -341 Q 429 -316 429 -281 Q 429 -252 424 -211 Q 419 -170 404 -128 Q 429 -100 450.5 -81 Q 472 -62 487 -55 Q 486 -43 480 -31 Q 474 -19 466.5 -10 Q 459 -1 450 4.5 Q 441 10 434 10 Q 426 10 406.5 -7 Q 387 -24 361 -53 Q 336 -25 300 -7.5 Q 264 10 212 10 Q 157 10 121 -5 Q 85 -20 64 -45 Q 43 -70 34.5 -102.5 Q 26 -135 26 -170 Q 26 -201 35 -229 Q 44 -257 59.5 -281 Q 75 -305 95.5 -324.5 Q 116 -344 138 -358 Q 103 -418 81.5 -472.5 Q 60 -527 60 -568 Q 60 -636 104 -671 Q 148 -706 227 -706 M 308 -115 Q 275 -155 240.5 -202 Q 206 -249 174 -299 Q 145 -278 127.5 -246.5 Q 110 -215 110 -168 Q 110 -149 114.5 -131 Q 119 -113 130.5 -98.5 Q 142 -84 160.5 -75.5 Q 179 -67 207 -67 Q 243 -67 267.5 -80.5 Q 292 -94 308 -115 ",
        "0.85": "M 15 -483 Q 14 -489 16 -492.5 Q 18 -496 27 -497.5 Q 36 -499 54 -499.5 Q 72 -500 104 -500 L 134 -337 Q 142 -295 148 -252 Q 154 -209 159 -174 Q 164 -133 169 -94 L 175 -94 Q 177 -107 180 -128.5 Q 183 -150 186.5 -175.5 Q 190 -201 194 -227.5 Q 198 -254 203 -277 L 234 -469 Q 236 -480 240.5 -483 Q 245 -486 261 -486 L 314 -486 L 353 -276 Q 359 -247 364.5 -215.5 Q 370 -184 375 -157 Q 380 -125 384 -94 L 389 -94 Q 390 -116 393.5 -145.5 Q 397 -175 401 -208 Q 405 -241 410 -274 Q 415 -307 420 -337 L 446 -482 Q 447 -489 449 -492.5 Q 451 -496 458.5 -497.5 Q 466 -499 482 -499.5 Q 498 -500 526 -500 Q 496 -359 473 -248 Q 463 -201 453.5 -155.5 Q 444 -110 436.5 -75 Q 429 -40 424 -18.5 Q 419 3 418 3 Q 413 4 405 5 Q 398 6 388.5 6 Q 379 6 366 6 Q 355 6 341.5 -6.5 Q 328 -19 323 -46 L 310 -113 Q 304 -144 298 -178 Q 292 -212 287.5 -245 Q 283 -278 279.5 -308 Q 276 -338 274 -361 Q 271 -338 267.5 -307.5 Q 264 -277 259.5 -244 Q 255 -211 249.5 -177.5 Q 244 -144 238 -113 L 215 3 Q 203 4 191 5 Q 180 6 168.5 6 Q 157 6 147 6 Q 133 6 125 -8 Q 117 -22 112 -43 Q 107 -66 100 -97 Q 93 -128 85 -163 Q 77 -198 69 -235.5 Q 61 -273 53 -309 Q 35 -393 15 -483 ",
        "0.54": "M 7 -676 Q 5 -688 7.5 -694 Q 10 -700 24 -700 L 91 -700 L 163 -313 Q 175 -246 181.5 -191 Q 188 -136 193 -88 L 199 -88 Q 201 -148 208 -203.5 Q 215 -259 225 -313 L 286 -642 Q 288 -655 291.5 -660.5 Q 295 -666 307 -666 L 365 -666 L 435 -313 Q 448 -245 454 -191 Q 460 -137 465 -89 L 471 -89 Q 475 -137 481 -196.5 Q 487 -256 496 -313 L 560 -676 Q 562 -688 566 -694 Q 570 -700 581 -700 L 650 -700 L 519 3 Q 508 4 500.5 5 Q 493 6 486 6.5 Q 479 7 471 7.5 Q 463 8 451 8 Q 433 8 422.5 -7.5 Q 412 -23 407 -49 L 356 -273 Q 352 -293 347.5 -321.5 Q 343 -350 339 -381.5 Q 335 -413 331.5 -444 Q 328 -475 325 -501 Q 322 -475 318 -444 Q 314 -413 310.5 -382 Q 307 -351 303 -322.5 Q 299 -294 296 -274 L 241 3 Q 222 5 207.5 6 Q 193 7 167 7 Q 151 7 141 -10 Q 131 -27 126 -55 Q 119 -86 110.5 -129 Q 102 -172 92 -221.5 Q 82 -271 72 -324 Q 62 -377 53 -428 Q 31 -546 7 -676 ",
        "0.48": "M 30 -354 Q 30 -454 41.5 -522 Q 53 -590 77 -631.5 Q 101 -673 137 -691 Q 173 -709 221 -709 Q 270 -709 304 -692 Q 338 -675 359 -634.5 Q 380 -594 389.5 -526 Q 399 -458 399 -357 Q 399 -275 392 -214 Q 385 -153 371 -110 Q 357 -67 334.5 -41 Q 312 -15 282 -3 Q 289 37 301 53.5 Q 313 70 336 70 Q 351 70 367.5 66.5 Q 384 63 398 53 Q 404 62 407 75 Q 410 88 410 97 Q 410 109 400.5 117 Q 391 125 377.5 129.5 Q 364 134 348.5 135.5 Q 333 137 320 137 Q 268 137 237 106.5 Q 206 76 189 8 Q 146 5 116 -13.5 Q 86 -32 67 -73.5 Q 48 -115 39 -183.5 Q 30 -252 30 -354 M 121 -334 Q 121 -264 125.5 -215 Q 130 -166 141 -134.5 Q 152 -103 169.5 -88.5 Q 187 -74 214 -74 Q 241 -74 259.5 -89 Q 278 -104 289.5 -138 Q 301 -172 306 -225 Q 311 -278 311 -355 Q 311 -430 306.5 -481.5 Q 302 -533 291.5 -565.5 Q 281 -598 263.5 -612 Q 246 -626 219 -626 Q 193 -626 174.5 -610.5 Q 156 -595 144 -560.5 Q 132 -526 126.5 -470.5 Q 121 -415 121 -334 ",
        "0.87": "M 24 -478 Q 22 -486 22 -490.5 Q 22 -495 29.5 -497 Q 37 -499 54 -499.5 Q 71 -500 103 -500 L 157 -262 Q 163 -234 167.5 -205 Q 172 -176 175.5 -151 Q 179 -126 181 -108 Q 183 -90 184 -85 Q 184 -88 186 -105.5 Q 188 -123 191 -148 Q 194 -173 198.5 -203.5 Q 203 -234 208 -263 L 252 -476 Q 253 -485 255.5 -490 Q 258 -495 266.5 -497 Q 275 -499 292 -499.5 Q 309 -500 340 -500 L 217 27 Q 206 75 193 106.5 Q 180 138 163.5 157.5 Q 147 177 125.5 185 Q 104 193 77 193 Q 32 193 14 182 Q -4 171 -4 154 Q -4 143 -1 129.5 Q 2 116 8 108 Q 18 115 36 119.5 Q 54 124 71 124 Q 94 124 113.5 101 Q 133 78 144 16 L 24 -478 ",
        "0.50": "M 198 -710 Q 270 -710 299.5 -695.5 Q 329 -681 329 -660 Q 329 -649 324.5 -636.5 Q 320 -624 309 -613 Q 298 -621 272 -629.5 Q 246 -638 211 -638 Q 166 -638 140 -619.5 Q 114 -601 114 -569 Q 114 -541 125.5 -519 Q 137 -497 160 -470 L 268 -347 Q 287 -324 300 -303.5 Q 313 -283 321 -262.5 Q 329 -242 332 -221.5 Q 335 -201 335 -178 Q 335 -140 326 -106 Q 317 -72 296.5 -46 Q 276 -20 241.5 -5 Q 207 10 156 10 Q 88 10 56.5 -9.5 Q 25 -29 25 -50 Q 25 -62 30 -78 Q 35 -94 46 -108 Q 62 -94 87.5 -83.5 Q 113 -73 149 -73 Q 203 -73 225 -101 Q 247 -129 247 -175 Q 247 -209 234.5 -238 Q 222 -267 189 -305 L 88 -422 Q 54 -464 40 -497.5 Q 26 -531 26 -566 Q 26 -629 69.5 -669.5 Q 113 -710 198 -710 ",
        "0.78": "M 46 -470 Q 109 -510 192 -510 Q 229 -510 259 -500.5 Q 289 -491 310.5 -467.5 Q 332 -444 343.5 -403.5 Q 355 -363 355 -302 Q 355 -201 341.5 -139.5 Q 328 -78 306 -45 Q 284 -12 257.5 -1 Q 231 10 206 10 Q 178 10 158 1.5 Q 138 -7 127 -18 L 127 190 Q 117 194 106 195.5 Q 95 197 85 197 Q 64 197 55 189.5 Q 46 182 46 162 L 46 -470 M 127 -96 Q 138 -79 152 -71 Q 166 -63 181 -63 Q 193 -63 207.5 -69.5 Q 222 -76 234.5 -100 Q 247 -124 256 -169.5 Q 265 -215 265 -293 Q 265 -338 260 -366 Q 255 -394 245.5 -410.5 Q 236 -427 221.5 -433 Q 207 -439 188 -439 Q 154 -439 127 -420 L 127 -96 ",
        "0.40": "M 43 -663 Q 43 -677 44.5 -684.5 Q 46 -692 53.5 -695.5 Q 61 -699 78 -699.5 Q 95 -700 125 -700 L 125 -16 Q 125 -10 123.5 -6.5 Q 122 -3 114.5 -1.5 Q 107 0 90 0 Q 73 0 43 0 L 43 -663 ",
        "0.86": "M 258 -266 L 391 -19 Q 394 -11 394.5 -7.5 Q 395 -4 386.5 -2 Q 378 0 358 0 Q 338 0 301 0 L 264 -65 Q 255 -81 246 -99.5 Q 237 -118 228 -136 Q 219 -154 211.5 -170.5 Q 204 -187 199 -199 Q 194 -187 186.5 -170.5 Q 179 -154 171 -136 Q 163 -118 154 -99.5 Q 145 -81 136 -65 L 108 -16 Q 105 -10 101 -6.5 Q 97 -3 87 -1.5 Q 77 0 60 0 Q 43 0 15 0 L 156 -261 L 35 -487 Q 32 -492 32.5 -494.5 Q 33 -497 41 -498.5 Q 49 -500 67.5 -500 Q 86 -500 120 -500 L 157 -432 Q 164 -418 172 -401.5 Q 180 -385 187 -369.5 Q 194 -354 200 -340.5 Q 206 -327 210 -318 Q 214 -327 220 -340 Q 226 -353 233.5 -369 Q 241 -385 249 -401 Q 257 -417 265 -432 L 295 -486 Q 298 -491 300.5 -494 Q 303 -497 311.5 -498.5 Q 320 -500 337 -500 Q 354 -500 386 -500 L 258 -266 ",
        "0.39": "M 284 -340 L 125 -340 L 125 -16 Q 125 -10 124 -6.5 Q 123 -3 115.5 -1.5 Q 108 0 91.5 0 Q 75 0 44 0 L 44 -683 Q 44 -689 45 -692.5 Q 46 -696 53.5 -697.5 Q 61 -699 77.5 -699.5 Q 94 -700 125 -700 L 125 -415 L 284 -415 L 284 -683 Q 284 -689 285 -692.5 Q 286 -696 293.5 -697.5 Q 301 -699 317.5 -699.5 Q 334 -700 365 -700 L 365 -16 Q 365 -10 364 -6.5 Q 363 -3 355.5 -1.5 Q 348 0 331.5 0 Q 315 0 284 0 L 284 -340 ",
        "0.64": "M 47 -697 Q 47 -711 50 -719 Q 53 -727 62 -730.5 Q 71 -734 87 -734.5 Q 103 -735 128 -735 L 128 -475 Q 148 -492 174 -501 Q 200 -510 235 -510 Q 265 -510 288 -499.5 Q 311 -489 326 -466 Q 341 -443 349 -405.5 Q 357 -368 357 -313 Q 357 -205 338.5 -141 Q 320 -77 291.5 -43.5 Q 263 -10 229 0 Q 195 10 164 10 Q 85 10 47 -20 L 47 -697 M 128 -75 Q 135 -70 146.5 -66 Q 158 -62 175 -62 Q 188 -62 204 -70 Q 220 -78 233.5 -102.5 Q 247 -127 256.5 -173 Q 266 -219 266 -295 Q 266 -375 249 -406 Q 232 -437 198 -437 Q 159 -437 128 -409 L 128 -75 ",
        "0.84": "M 18 -475 Q 16 -484 17 -489.5 Q 18 -495 26.5 -497 Q 35 -499 53.5 -499.5 Q 72 -500 105 -500 L 137 -340 Q 145 -301 152 -256.5 Q 159 -212 164 -174 Q 170 -130 176 -87 L 178 -87 Q 183 -131 189 -175 Q 194 -213 200.5 -257 Q 207 -301 215 -341 L 242 -482 Q 243 -489 245 -492.5 Q 247 -496 255.5 -497.5 Q 264 -499 280.5 -499.5 Q 297 -500 328 -500 L 213 3 Q 202 5 184 5.5 Q 166 6 156 6 Q 142 6 133.5 -8 Q 125 -22 120 -43 L 18 -475 ",
        "0.47": "M 43 -683 Q 43 -700 60 -700 L 159 -700 Q 254 -700 298.5 -653.5 Q 343 -607 343 -502 Q 343 -440 328.5 -398.5 Q 314 -357 288.5 -331.5 Q 263 -306 229.5 -295 Q 196 -284 159 -284 L 124 -284 L 124 -16 Q 124 -10 122.5 -6.5 Q 121 -3 113.5 -1.5 Q 106 0 89.5 0 Q 73 0 43 0 L 43 -683 M 253 -511 Q 253 -564 235.5 -596.5 Q 218 -629 174 -629 L 124 -629 L 124 -359 L 168 -359 Q 210 -359 231.5 -393.5 Q 253 -428 253 -511 ",
        "0.36": "M 297 -73 Q 297 -47 296.5 -32.5 Q 296 -18 294.5 -11 Q 293 -4 290 -2 Q 287 0 281 0 L 44 0 L 44 -683 Q 44 -687 46 -691 Q 48 -694 51.5 -697 Q 55 -700 61 -700 L 300 -700 Q 300 -675 300 -660.5 Q 300 -646 298.5 -638.5 Q 297 -631 294 -629 Q 291 -627 285 -627 L 126 -627 L 126 -418 L 276 -418 Q 276 -395 276 -380 Q 276 -365 274.5 -357 Q 273 -349 270 -346 Q 267 -343 261 -343 L 126 -343 L 126 -73 L 297 -73 ",
        "0.42": "M 42 -683 Q 42 -689 43.5 -692.5 Q 45 -696 52.5 -697.5 Q 60 -699 76.5 -699.5 Q 93 -700 124 -700 L 124 -398 L 283 -695 Q 297 -698 310.5 -699.5 Q 324 -701 335 -701 Q 380 -701 368 -677 L 207 -398 Q 267 -353 307 -257.5 Q 347 -162 367 -18 Q 368 -7 361.5 -2.5 Q 355 2 334 2 Q 307 2 277 -1 Q 255 -118 231 -195 Q 207 -272 165 -318 Q 156 -327 145.5 -333.5 Q 135 -340 124 -345 L 124 -16 Q 124 -10 122.5 -6.5 Q 121 -3 113.5 -1.5 Q 106 0 89.5 0 Q 73 0 42 0 L 42 -683 "
    },
    "tags": [{
        "text": "Aquifer Conditions",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Conditions",
        "fill": "#2649dd",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2767,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3135,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3517,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3903,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4078,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4369,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4912,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5294,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5918.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0005382866019610347, 0.030838418772699792, 143.6609367214666],
            [-0.030838418772699792, 0.0005382866019610347, 215.59884048758738]
        ]
    }, {
        "text": "Recharge Zone",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Zone",
        "fill": "#3034d4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3340,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3708,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4090,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4689.56,
            "height": 1239.56
        },
        "matrix": [
            [0.010904417008590142, 0.025689196607615847, 66.5786313607057],
            [-0.025689196607615847, 0.010904417008590142, 189.1184517931053]
        ]
    }, {
        "text": "Regulated Materials",
        "url": "http://edwardsaquifer.org/go?tag=Regulated Materials",
        "fill": "#121bce",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1127,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1517,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1690,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2335,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2696,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3082,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3239,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 3728,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4082,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4734,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4997,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5172,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5526,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5699,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6283.56,
            "height": 1239.56
        },
        "matrix": [
            [0.011170283038372116, 0.0038462368983727003, 54.93822167107267],
            [-0.0038462368983727003, 0.011170283038372116, 204.19382773057845]
        ]
    }, {
        "text": "Range Management",
        "url": "http://edwardsaquifer.org/go?tag=Range Management",
        "fill": "#2c58e1",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1109,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1502,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2020,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2863,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3245,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3599,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3992,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4353,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 4916,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5277,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5659,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -105.005,
            "y": -848.005,
            "width": 6182.01,
            "height": 1193.01
        },
        "matrix": [
            [0.00038037296081258647, 0.021791552330331608, 168.3859857748359],
            [-0.021791552330331608, 0.00038037296081258647, 210.8467153612642]
        ]
    }, {
        "text": "Drainage Area",
        "url": "http://edwardsaquifer.org/go?tag=Drainage Area",
        "fill": "#264add",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 656,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1185,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1567,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1921,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2314,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2675,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2832,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 3269,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3532,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3893,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -107.14000000000001,
            "y": -870.14,
            "width": 4468.28,
            "height": 1218.28
        },
        "matrix": [
            [0.0034727607745761134, 0.016338054903086492, 103.40595681630181],
            [-0.016338054903086492, 0.0034727607745761134, 174.85435670688938]
        ]
    }, {
        "text": "Rainfall",
        "url": "http://edwardsaquifer.org/go?tag=Rainfall",
        "fill": "#2950df",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1539,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1893,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2066,
            "y": 0,
            "glyph": "0.74"
        }],
        "bbox": {
            "x": -80.58500000000001,
            "y": -862.585,
            "width": 2397.17,
            "height": 996.1700000000001
        },
        "matrix": [
            [0.00041592183565488424, 0.023828146006063533, 194.24003766126532],
            [-0.023828146006063533, 0.00041592183565488424, 173.8981028683641]
        ]
    }, {
        "text": "Rain Gauge",
        "url": "http://edwardsaquifer.org/go?tag=Rain Gauge",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1441,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 1826,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2180,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2570,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -108.14000000000001,
            "y": -870.14,
            "width": 3557.28,
            "height": 1218.28
        },
        "matrix": [
            [0.01634718258870482, -0.006604690484352596, 83.34284552876214],
            [0.006604690484352596, 0.01634718258870482, 210.3996577431324]
        ]
    }, {
        "text": "Remote Meters",
        "url": "http://edwardsaquifer.org/go?tag=Remote Meters",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1665,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1956,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2317,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2474,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3324,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3615,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3976,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4239,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -74.15,
            "y": -817.15,
            "width": 4750.3,
            "height": 944.3
        },
        "matrix": [
            [0.00816476909933977, -0.008755642906708378, 127.52022715174074],
            [0.008755642906708378, 0.00816476909933977, 21.289473778660337]
        ]
    }, {
        "text": "Legislation & Rules",
        "url": "http://edwardsaquifer.org/go?tag=Legislation & Rules",
        "fill": "#3871e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.43"
        }, {
            "x": 317,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 678,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1071,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1591,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1764,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2118,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2409,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2584,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3334,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3491,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3993,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4150,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 4523,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 4913,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6031.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0001750858371122313, 0.010030660890249204, 154.69274173877602],
            [-0.010030660890249204, 0.0001750858371122313, 148.299869837052]
        ]
    }, {
        "text": "Groundwater Withdrawals",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Withdrawals",
        "fill": "#0602c7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 4795,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4970,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5261,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 5641,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 6027,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6644,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 7184,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7538,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7711,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -95.92500000000001,
            "y": -857.925,
            "width": 8249.85,
            "height": 990.85
        },
        "matrix": [
            [0.006992083507663155, 0.005867054692440895, 71.15942493288148],
            [-0.005867054692440895, 0.006992083507663155, 94.27565607388524]
        ]
    }, {
        "text": "Water Quality Monitors",
        "url": "http://edwardsaquifer.org/go?tag=Water Quality Monitors",
        "fill": "#0a0cca",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.48"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2899,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3253,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3426,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3601,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3892,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 4248,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4405,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4894,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5262,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5644,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5819,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 6110,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6478,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6741,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.12,
            "y": -888.12,
            "width": 7362.24,
            "height": 1234.24
        },
        "matrix": [
            [0.003230285330486652, -0.004446106326845077, 164.1446116749887],
            [0.004446106326845077, 0.003230285330486652, 67.98152014368128]
        ]
    }, {
        "text": "Comal Springs",
        "url": "http://edwardsaquifer.org/go?tag=Comal Springs",
        "fill": "#8c8ce7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1270,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1624,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1797,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2312,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 2695,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2958,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3133,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3515,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3908,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 4504.56,
            "height": 1239.56
        },
        "matrix": [
            [0.006058009449216747, 0.014271775893119915, 50.90272557475008],
            [-0.014271775893119915, 0.006058009449216747, 160.85621500133948]
        ]
    }, {
        "text": "San Marcos Springs",
        "url": "http://edwardsaquifer.org/go?tag=San Marcos Springs",
        "fill": "#111ccf",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 712,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1094,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1251,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 1740,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2094,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2357,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 2670,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3038,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3383,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3540,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 3898,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 4281,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4719,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5101,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 5494,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -126.14000000000001,
            "y": -870.14,
            "width": 6091.28,
            "height": 1218.28
        },
        "matrix": [
            [0.003263202110199722, 0.007687622411475075, 78.10387861014968],
            [-0.007687622411475075, 0.003263202110199722, 186.373252898526]
        ]
    }, {
        "text": "Index readings",
        "url": "http://edwardsaquifer.org/go?tag=Index readings",
        "fill": "#2e5be2",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.40"
        }, {
            "x": 168,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 550,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 936,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.86"
        }, {
            "x": 1707,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1864,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2127,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2488,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2842,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3228,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3403,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3785,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4178,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4762.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0015169522506016785, 0.007136699232821757, 119.70723065911037],
            [-0.007136699232821757, 0.0015169522506016785, 134.73208778672682]
        ]
    }, {
        "text": "Habitat Conservation Plan",
        "url": "http://edwardsaquifer.org/go?tag=Habitat Conservation Plan",
        "fill": "#0c0fcb",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.39"
        }, {
            "x": 409,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 763,
            "y": 0,
            "glyph": "0.64"
        }, {
            "x": 1146,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1321,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1612,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1966,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2257,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2414,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2753,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3121,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3503,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3848,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4209,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4472,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 4816,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5170,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5461,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5636,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6004,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6386,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 6543,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 6903,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7076,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7430,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -79.42,
            "y": -858.42,
            "width": 7976.84,
            "height": 994.84
        },
        "matrix": [
            [0.00009916140021183737, 0.005680952813388587, 120.8643704599331],
            [-0.005680952813388587, 0.00009916140021183737, 101.06836720368639]
        ]
    }, {
        "text": "Aquifer Management",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Management",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2917,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3271,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3653,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4007,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4400,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4761,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 5324,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5685,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6067,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 6641.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0037120508391875586, -0.0039806871699656025, 71.9581419255516],
            [0.0039806871699656025, 0.0037120508391875586, 205.61027893124432]
        ]
    }, {
        "text": "Aquifer Science",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Science",
        "fill": "#172ad3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2786,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 3099,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3274,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3635,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4017,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4330,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 4969.21,
            "height": 1246.21
        },
        "matrix": [
            [0.004759010006071763, 0.003993283540863801, 104.1365977085726],
            [-0.003993283540863801, 0.004759010006071763, 204.75155256562823]
        ]
    }, {
        "text": "Modeling & Data",
        "url": "http://edwardsaquifer.org/go?tag=Modeling & Data",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 489,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 857,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 1243,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1604,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1777,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 2334,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2727,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2884,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3386,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3543,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 3936,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4290,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4581,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 5162.56,
            "height": 1239.56
        },
        "matrix": [
            [0.004370215773863941, 0.00329319379621829, 107.74714636274047],
            [-0.00329319379621829, 0.004370215773863941, 51.69036094271806]
        ]
    }, {
        "text": "Aquifer Protection",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Protection",
        "fill": "#0603c7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 2788,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3051,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3419,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3710,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4071,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4384,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4675,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4850,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5218,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5866.21,
            "height": 1246.21
        },
        "matrix": [
            [0.005413086090051434, 0.0005689382739221266, 139.46259849844066],
            [-0.0005689382739221266, 0.005413086090051434, 220.89155384701388]
        ]
    }, {
        "text": "Recharge Enhancement",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Enhancement",
        "fill": "#192ed4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 3275,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3657,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 4037,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4391,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4773,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 6010,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6371,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6753,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 7287.56,
            "height": 1239.56
        },
        "matrix": [
            [0.001137714187951259, 0.005352524424616318, 173.25461335037062],
            [-0.005352524424616318, 0.001137714187951259, 212.32315924339457]
        ]
    }, {
        "text": "Water Rights",
        "url": "http://edwardsaquifer.org/go?tag=Water Rights",
        "fill": "#1b31d5",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 2454,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2629,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3022,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 3402,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3693,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.78,
            "y": -888.78,
            "width": 4315.56,
            "height": 1239.56
        },
        "matrix": [
            [0.004353959487523462, -0.0046690499191352625, 173.52165448153227],
            [0.0046690499191352625, 0.004353959487523462, 97.14062507572083]
        ]
    }, {
        "text": "Conservation Easements",
        "url": "http://edwardsaquifer.org/go?tag=Conservation Easements",
        "fill": "#0602c7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1089,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1434,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1795,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2058,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 2402,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2756,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3047,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3222,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3590,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3972,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4129,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 4449,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4803,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 5148,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5509,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 6072,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6433,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6815,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 7106,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -89.78,
            "y": -839.78,
            "width": 7636.56,
            "height": 973.56
        },
        "matrix": [
            [0.003391096012912102, 0.0025553741348173517, 148.73107815343087],
            [-0.0025553741348173517, 0.003391096012912102, 78.41597531517567]
        ]
    }, {
        "text": "Critical Period Management",
        "url": "http://edwardsaquifer.org/go?tag=Critical Period Management",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 602,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 777,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1068,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1243,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1556,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1910,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2083,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2240,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 2600,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2961,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3224,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3399,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3767,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 4153,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4310,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4799,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5153,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5535,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5889,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 6282,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6643,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 7206,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 7567,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 7949,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 8495.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0026022490712753, -0.003581688574266224, 133.67626529718348],
            [0.003581688574266224, 0.0026022490712753, 6.03731013940353]
        ]
    }, {
        "text": "Groundwater Conservation Plan",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Conservation Plan",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 4479,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4847,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5229,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 5574,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5935,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6198,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 6542,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6896,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 7187,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 7362,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 7730,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 8112,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 8269,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 8629,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 8802,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 9156,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -96.42,
            "y": -858.42,
            "width": 9719.84,
            "height": 994.84
        },
        "matrix": [
            [0.002324994409303972, -0.0024932512555198992, 65.20241432985785],
            [0.0024932512555198992, 0.002324994409303972, 206.0758961864759]
        ]
    }, {
        "text": "Artesian Zone",
        "url": "http://edwardsaquifer.org/go?tag=Artesian Zone",
        "fill": "#3367e6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 700,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 991,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1352,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1697,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1872,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2226,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 2608,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2765,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3150,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3518,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3900,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -115.28500000000001,
            "y": -839.285,
            "width": 4470.57,
            "height": 969.57
        },
        "matrix": [
            [0.004465965546304056, 0.0037473900427541728, 109.12784540073449],
            [-0.0037473900427541728, 0.004465965546304056, 171.10193739547606]
        ]
    }, {
        "text": "Karst",
        "url": "http://edwardsaquifer.org/go?tag=Karst",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.42"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 747,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1355,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -75.31500000000001,
            "y": -818.315,
            "width": 1817.63,
            "height": 945.63
        },
        "matrix": [
            [0.007173261336096399, -0.007692381005659626, 99.14469137229715],
            [0.007692381005659626, 0.007173261336096399, 223.9759255931333]
        ]
    }, {
        "text": "Edwards Plateau",
        "url": "http://edwardsaquifer.org/go?tag=Edwards Plateau",
        "fill": "#8e8ee8",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 320,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 706,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1600,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2249,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 2594,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2751,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 3111,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3284,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3638,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3929,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4644,
            "y": 0,
            "glyph": "0.83"
        }],
        "bbox": {
            "x": -78.92500000000001,
            "y": -857.925,
            "width": 5188.85,
            "height": 990.85
        },
        "matrix": [
            [0.004241185947550362, 0.0031959628480156318, 41.753083097270235],
            [-0.0031959628480156318, 0.004241185947550362, 174.1108423864839]
        ]
    }, {
        "text": "Water Wells",
        "url": "http://edwardsaquifer.org/go?tag=Water Wells",
        "fill": "#3973e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 2736,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3097,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3270,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3443,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -117.92500000000001,
            "y": -857.925,
            "width": 4003.85,
            "height": 990.85
        },
        "matrix": [
            [0.004555974386175832, 0.003433172950867389, 111.89429694636198],
            [-0.003433172950867389, 0.004555974386175832, 157.62121265562612]
        ]
    }, {
        "text": "Springflow",
        "url": "http://edwardsaquifer.org/go?tag=Springflow",
        "fill": "#448df1",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 741,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1004,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1179,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1561,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 2209,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2382,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2750,
            "y": 0,
            "glyph": "0.85"
        }],
        "bbox": {
            "x": -129.44,
            "y": -893.44,
            "width": 3559.88,
            "height": 1244.88
        },
        "matrix": [
            [0.0001109421135703377, 0.006355869429680051, 150.2639525802166],
            [-0.006355869429680051, 0.0001109421135703377, 174.20797754207643]
        ]
    }, {
        "text": "Ecosystem",
        "url": "http://edwardsaquifer.org/go?tag=Ecosystem",
        "fill": "#1014cc",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 320,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 633,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1001,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1346,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 1702,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 2047,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2338,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2699,
            "y": 0,
            "glyph": "0.75"
        }],
        "bbox": {
            "x": -103.345,
            "y": -847.345,
            "width": 3471.69,
            "height": 1187.69
        },
        "matrix": [
            [0.003356892258333274, -0.0046203658133395645, 41.353362000694304],
            [0.0046203658133395645, 0.003356892258333274, 177.91660351422576]
        ]
    }, {
        "text": "Water Resources",
        "url": "http://edwardsaquifer.org/go?tag=Water Resources",
        "fill": "#0804c7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 2454,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2815,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3160,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3528,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 3918,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4181,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4494,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4855,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -112.15,
            "y": -817.15,
            "width": 5404.3,
            "height": 944.3
        },
        "matrix": [
            [0.001244541811233067, 0.0058551088776319345, 46.12616771425985],
            [-0.0058551088776319345, 0.001244541811233067, 147.1201361436165]
        ]
    }, {
        "text": "Aquifer Conditions",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Conditions",
        "fill": "#0f16cd",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2767,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3135,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3517,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3903,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4078,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4369,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4912,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5294,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5918.21,
            "height": 1246.21
        },
        "matrix": [
            [0.004087863337187276, 0.0014075642263480207, 89.3471595659926],
            [-0.0014075642263480207, 0.004087863337187276, 197.66035189191072]
        ]
    }, {
        "text": "Recharge Zone",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Zone",
        "fill": "#1525d1",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3340,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3708,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4090,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4689.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0024944744790892487, 0.005876613603049378, 182.4941051302304],
            [-0.005876613603049378, 0.0024944744790892487, 202.87019614968636]
        ]
    }, {
        "text": "Regulated Materials",
        "url": "http://edwardsaquifer.org/go?tag=Regulated Materials",
        "fill": "#7272e3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1127,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1517,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1690,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2335,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2696,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3082,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3239,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 3728,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4082,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4734,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4997,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5172,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5526,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5699,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6283.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0009132667141844354, 0.004296582081536546, 70.49601885470886],
            [-0.004296582081536546, 0.0009132667141844354, 139.17010088863606]
        ]
    }, {
        "text": "Range Management",
        "url": "http://edwardsaquifer.org/go?tag=Range Management",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1109,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1502,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2020,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2863,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3245,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3599,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3992,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4353,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 4916,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5277,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5659,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -105.005,
            "y": -848.005,
            "width": 6182.01,
            "height": 1193.01
        },
        "matrix": [
            [0.0025850550994565157, -0.0027721322023469114, 60.6937239101825],
            [0.0027721322023469114, 0.0025850550994565157, 207.4324382961874]
        ]
    }, {
        "text": "Drainage Area",
        "url": "http://edwardsaquifer.org/go?tag=Drainage Area",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 656,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1185,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1567,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1921,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2314,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2675,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2832,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 3269,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3532,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3893,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -107.14000000000001,
            "y": -870.14,
            "width": 4468.28,
            "height": 1218.28
        },
        "matrix": [
            [0.003781603964820863, -0.004055273765579174, 123.53172472050467],
            [0.004055273765579174, 0.003781603964820863, 24.812189490340288]
        ]
    }, {
        "text": "Rainfall",
        "url": "http://edwardsaquifer.org/go?tag=Rainfall",
        "fill": "#2344db",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1539,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1893,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2066,
            "y": 0,
            "glyph": "0.74"
        }],
        "bbox": {
            "x": -80.58500000000001,
            "y": -862.585,
            "width": 2397.17,
            "height": 996.1700000000001
        },
        "matrix": [
            [0.0046693220976504884, -0.006426770516062666, 172.12256248606494],
            [0.006426770516062666, 0.0046693220976504884, 106.02352026251654]
        ]
    }, {
        "text": "Rain Gauge",
        "url": "http://edwardsaquifer.org/go?tag=Rain Gauge",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1441,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 1826,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2180,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2570,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -108.14000000000001,
            "y": -870.14,
            "width": 3557.28,
            "height": 1218.28
        },
        "matrix": [
            [0.003164293701163339, -0.0033932895544557585, 148.32490263593536],
            [0.0033932895544557585, 0.003164293701163339, 51.7826062695145]
        ]
    }, {
        "text": "Remote Meters",
        "url": "http://edwardsaquifer.org/go?tag=Remote Meters",
        "fill": "#1423d1",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1665,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1956,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2317,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2474,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3324,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3615,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3976,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4239,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -74.15,
            "y": -817.15,
            "width": 4750.3,
            "height": 944.3
        },
        "matrix": [
            [0.00476249921725652, 0.0005005588381831293, 83.56703798974792],
            [-0.0005005588381831293, 0.00476249921725652, 180.69383100538874]
        ]
    }, {
        "text": "Legislation & Rules",
        "url": "http://edwardsaquifer.org/go?tag=Legislation & Rules",
        "fill": "#376fe8",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.43"
        }, {
            "x": 317,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 678,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1071,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1591,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1764,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2118,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2409,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2584,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3334,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3491,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3993,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4150,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 4523,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 4913,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6031.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0000955013656975807, 0.005471269576499566, 174.59584833514305],
            [-0.005471269576499566, 0.0000955013656975807, 169.68727302314315]
        ]
    }, {
        "text": "Groundwater Withdrawals",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Withdrawals",
        "fill": "#101ace",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 4795,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4970,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5261,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 5641,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 6027,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6644,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 7184,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7538,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7711,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -95.92500000000001,
            "y": -857.925,
            "width": 8249.85,
            "height": 990.85
        },
        "matrix": [
            [0.003404068232468586, 0.0003577819883657937, 106.2802352553689],
            [-0.0003577819883657937, 0.003404068232468586, 206.5499570994569]
        ]
    }, {
        "text": "Water Quality Monitors",
        "url": "http://edwardsaquifer.org/go?tag=Water Quality Monitors",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.48"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2899,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3253,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3426,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3601,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3892,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 4248,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4405,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4894,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5262,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5644,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5819,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 6110,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6478,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6741,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.12,
            "y": -888.12,
            "width": 7362.24,
            "height": 1234.24
        },
        "matrix": [
            [0.0032696504031495648, 0.0011258309196080813, 141.49711420261647],
            [-0.0011258309196080813, 0.0032696504031495648, 229.54130796481869]
        ]
    }, {
        "text": "Comal Springs",
        "url": "http://edwardsaquifer.org/go?tag=Comal Springs",
        "fill": "#0b0fcb",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1270,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1624,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1797,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2312,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 2695,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2958,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3133,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3515,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3908,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 4504.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0036280841676524993, 0.0003813270119206242, 153.23642175925838],
            [-0.0003813270119206242, 0.0036280841676524993, 80.19004492316095]
        ]
    }, {
        "text": "San Marcos Springs",
        "url": "http://edwardsaquifer.org/go?tag=San Marcos Springs",
        "fill": "#4d4ddc",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 712,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1094,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1251,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 1740,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2094,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2357,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 2670,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3038,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3383,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3540,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 3898,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 4281,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4719,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5101,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 5494,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -126.14000000000001,
            "y": -870.14,
            "width": 6091.28,
            "height": 1218.28
        },
        "matrix": [
            [0.003341271754837485, 0.002803659897147196, 75.40909304129963],
            [-0.002803659897147196, 0.003341271754837485, 97.75110094253466]
        ]
    }, {
        "text": "Index readings",
        "url": "http://edwardsaquifer.org/go?tag=Index readings",
        "fill": "#121dcf",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.40"
        }, {
            "x": 168,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 550,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 936,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.86"
        }, {
            "x": 1707,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1864,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2127,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2488,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2842,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3228,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3403,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3785,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4178,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4762.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0009450531400807247, 0.004446125457880934, 111.89938950274347],
            [-0.004446125457880934, 0.0009450531400807247, 102.99439371202935]
        ]
    }, {
        "text": "Habitat Conservation Plan",
        "url": "http://edwardsaquifer.org/go?tag=Habitat Conservation Plan",
        "fill": "#0d13cc",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.39"
        }, {
            "x": 409,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 763,
            "y": 0,
            "glyph": "0.64"
        }, {
            "x": 1146,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1321,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1612,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1966,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2257,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2414,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2753,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3121,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3503,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3848,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4209,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4472,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 4816,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5170,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5461,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5636,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6004,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6386,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 6543,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 6903,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7076,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7430,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -79.42,
            "y": -858.42,
            "width": 7976.84,
            "height": 994.84
        },
        "matrix": [
            [0.0026439100840644266, 0.0002778861474968019, 148.2806112523306],
            [-0.0002778861474968019, 0.0026439100840644266, 214.78426315988355]
        ]
    }, {
        "text": "Aquifer Management",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Management",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2917,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3271,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3653,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4007,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4400,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4761,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 5324,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5685,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6067,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 6641.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0018560254195937793, -0.0019903435849828012, 170.54220115189912],
            [0.0019903435849828012, 0.0018560254195937793, 67.58012887301196]
        ]
    }, {
        "text": "Aquifer Science",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Science",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2786,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 3099,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3274,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3635,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4017,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4330,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 4969.21,
            "height": 1246.21
        },
        "matrix": [
            [0.002779670337891703, 0.002332420355319353, 94.40764517933007],
            [-0.002332420355319353, 0.002779670337891703, 63.897711108302865]
        ]
    }, {
        "text": "Modeling & Data",
        "url": "http://edwardsaquifer.org/go?tag=Modeling & Data",
        "fill": "#51a8fa",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 489,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 857,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 1243,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1604,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1777,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 2334,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2727,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2884,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3386,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3543,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 3936,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4290,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4581,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 5162.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0031238844293236183, 0.000328333484002413, 133.12151993972168],
            [-0.000328333484002413, 0.0031238844293236183, 145.82740786162736]
        ]
    }, {
        "text": "Aquifer Protection",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Protection",
        "fill": "#1627d2",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 2788,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3051,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3419,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3710,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4071,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4384,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4675,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4850,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5218,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5866.21,
            "height": 1246.21
        },
        "matrix": [
            [0.002536479710885225, 0.0021283591898924458, 141.64771550697122],
            [-0.0021283591898924458, 0.002536479710885225, 210.88993598955324]
        ]
    }, {
        "text": "Recharge Enhancement",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Enhancement",
        "fill": "#0804c7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 3275,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3657,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 4037,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4391,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4773,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 6010,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6371,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6753,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 7287.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0007584761253008393, 0.0035683496164108787, 55.70204038329092],
            [-0.0035683496164108787, 0.0007584761253008393, 123.30989618240251]
        ]
    }, {
        "text": "Water Rights",
        "url": "http://edwardsaquifer.org/go?tag=Water Rights",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 2454,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2629,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3022,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 3402,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3693,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.78,
            "y": -888.78,
            "width": 4315.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0034493166921005123, 0.0011876949840711724, 72.72480018257448],
            [-0.0011876949840711724, 0.0034493166921005123, 202.60180742477155]
        ]
    }, {
        "text": "Conservation Easements",
        "url": "http://edwardsaquifer.org/go?tag=Conservation Easements",
        "fill": "#182bd3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1089,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1434,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1795,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2058,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 2402,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2756,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3047,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3222,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3590,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3972,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4129,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 4449,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4803,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 5148,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5509,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 6072,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6433,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6815,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 7106,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -89.78,
            "y": -839.78,
            "width": 7636.56,
            "height": 973.56
        },
        "matrix": [
            [0.0023096819974399788, 0.00024275736004782906, 139.13032244605108],
            [-0.00024275736004782906, 0.0023096819974399788, 90.55981878435678]
        ]
    }, {
        "text": "Critical Period Management",
        "url": "http://edwardsaquifer.org/go?tag=Critical Period Management",
        "fill": "#2f5ee3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 602,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 777,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1068,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1243,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1556,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1910,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2083,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2240,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 2600,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2961,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3224,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3399,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3767,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 4153,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4310,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4799,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5153,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5535,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5889,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 6282,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6643,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 7206,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 7567,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 7949,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 8495.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0000623452477150145, 0.0035717568494534006, 154.69967808551274],
            [-0.0035717568494534006, 0.0000623452477150145, 196.37057053304733]
        ]
    }, {
        "text": "Groundwater Conservation Plan",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Conservation Plan",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 4479,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4847,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5229,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 5574,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5935,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6198,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 6542,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6896,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 7187,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 7362,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 7730,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 8112,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 8269,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 8629,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 8802,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 9156,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -96.42,
            "y": -858.42,
            "width": 9719.84,
            "height": 994.84
        },
        "matrix": [
            [0.0006046624176110285, 0.002844713015962878, 124.82633133402427],
            [-0.002844713015962878, 0.0006046624176110285, 75.105689573076]
        ]
    }, {
        "text": "Artesian Zone",
        "url": "http://edwardsaquifer.org/go?tag=Artesian Zone",
        "fill": "#1729d3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 700,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 991,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1352,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1697,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1872,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2226,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 2608,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2765,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3150,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3518,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3900,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -115.28500000000001,
            "y": -839.285,
            "width": 4470.57,
            "height": 969.57
        },
        "matrix": [
            [0.0023855909714120315, -0.0025582331126596494, 90.88704720473132],
            [0.0025582331126596494, 0.0023855909714120315, 110.4655344426346]
        ]
    }, {
        "text": "Karst",
        "url": "http://edwardsaquifer.org/go?tag=Karst",
        "fill": "#0704c7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.42"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 747,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1355,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -75.31500000000001,
            "y": -818.315,
            "width": 1817.63,
            "height": 945.63
        },
        "matrix": [
            [0.0055422382305328356, -0.002239209594961499, 127.69904565977458],
            [0.002239209594961499, 0.0055422382305328356, 216.9567800370893]
        ]
    }, {
        "text": "Edwards Plateau",
        "url": "http://edwardsaquifer.org/go?tag=Edwards Plateau",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 320,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 706,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1600,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2249,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 2594,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2751,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 3111,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3284,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3638,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3929,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4644,
            "y": 0,
            "glyph": "0.83"
        }],
        "bbox": {
            "x": -78.92500000000001,
            "y": -857.925,
            "width": 5188.85,
            "height": 990.85
        },
        "matrix": [
            [0.0020118824071755797, -0.002769118571350491, 134.2562707301503],
            [0.002769118571350491, 0.0020118824071755797, 13.661110235487854]
        ]
    }, {
        "text": "Water Wells",
        "url": "http://edwardsaquifer.org/go?tag=Water Wells",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 2736,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3097,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3270,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3443,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -117.92500000000001,
            "y": -857.925,
            "width": 4003.85,
            "height": 990.85
        },
        "matrix": [
            [0.0023343568028984848, -0.00250329119346159, 112.7857934843296],
            [0.00250329119346159, 0.0023343568028984848, 226.3257549585769]
        ]
    }, {
        "text": "Springflow",
        "url": "http://edwardsaquifer.org/go?tag=Springflow",
        "fill": "#1a30d5",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 741,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1004,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1179,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1561,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 2209,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2382,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2750,
            "y": 0,
            "glyph": "0.85"
        }],
        "bbox": {
            "x": -129.44,
            "y": -893.44,
            "width": 3559.88,
            "height": 1244.88
        },
        "matrix": [
            [0.001592490757453977, 0.00375167311850041, 102.38836485796298],
            [-0.00375167311850041, 0.001592490757453977, 115.99752672773917]
        ]
    }, {
        "text": "Ecosystem",
        "url": "http://edwardsaquifer.org/go?tag=Ecosystem",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 320,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 633,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1001,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1346,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 1702,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 2047,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2338,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2699,
            "y": 0,
            "glyph": "0.75"
        }],
        "bbox": {
            "x": -103.345,
            "y": -847.345,
            "width": 3471.69,
            "height": 1187.69
        },
        "matrix": [
            [0.002596634293631013, -0.002784549367866942, 146.74215318009328],
            [0.002784549367866942, 0.002596634293631013, 57.78944224323541]
        ]
    }, {
        "text": "Water Resources",
        "url": "http://edwardsaquifer.org/go?tag=Water Resources",
        "fill": "#192dd4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 2454,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2815,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3160,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3528,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 3918,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4181,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4494,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4855,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -112.15,
            "y": -817.15,
            "width": 5404.3,
            "height": 944.3
        },
        "matrix": [
            [0.002868338803690981, 0.002161448322588342, 112.47478550791547],
            [-0.002161448322588342, 0.002868338803690981, 202.47494667964415]
        ]
    }, {
        "text": "Aquifer Conditions",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Conditions",
        "fill": "#c7c7f4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2767,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3135,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3517,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3903,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4078,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4369,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4912,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5294,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5918.21,
            "height": 1246.21
        },
        "matrix": [
            [0.001351432321749316, 0.0031837750324438118, 60.0996469298758],
            [-0.0031837750324438118, 0.001351432321749316, 150.1819020878262]
        ]
    }, {
        "text": "Recharge Zone",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Zone",
        "fill": "#2b2ed3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3340,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3708,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4090,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4689.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0031071354378434876, 0.001069872529480387, 77.00495032431476],
            [-0.001069872529480387, 0.0031071354378434876, 113.269113283945]
        ]
    }, {
        "text": "Regulated Materials",
        "url": "http://edwardsaquifer.org/go?tag=Regulated Materials",
        "fill": "#aaaaee",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1127,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1517,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1690,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2335,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2696,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3082,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3239,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 3728,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4082,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4734,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4997,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5172,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5526,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5699,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6283.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0021851078869319705, 0.001646596898109145, 48.86538922866569],
            [-0.001646596898109145, 0.0021851078869319705, 173.39785698561673]
        ]
    }, {
        "text": "Range Management",
        "url": "http://edwardsaquifer.org/go?tag=Range Management",
        "fill": "#376fe8",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1109,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1502,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2020,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2863,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3245,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3599,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3992,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4353,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 4916,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5277,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5659,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -105.005,
            "y": -848.005,
            "width": 6182.01,
            "height": 1193.01
        },
        "matrix": [
            [0.0022703685068234075, 0.0017108453835426119, 110.61732522384182],
            [-0.0017108453835426119, 0.0022703685068234075, 150.62867898044985]
        ]
    }, {
        "text": "Drainage Area",
        "url": "http://edwardsaquifer.org/go?tag=Drainage Area",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 656,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1185,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1567,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1921,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2314,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2675,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2832,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 3269,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3532,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3893,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -107.14000000000001,
            "y": -870.14,
            "width": 4468.28,
            "height": 1218.28
        },
        "matrix": [
            [0.0027685926126518523, 0.0002909908093149741, 124.50933947504433],
            [-0.0002909908093149741, 0.0027685926126518523, 236.2932448483602]
        ]
    }, {
        "text": "Rainfall",
        "url": "http://edwardsaquifer.org/go?tag=Rainfall",
        "fill": "#1013cc",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1539,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1893,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2066,
            "y": 0,
            "glyph": "0.74"
        }],
        "bbox": {
            "x": -80.58500000000001,
            "y": -862.585,
            "width": 2397.17,
            "height": 996.1700000000001
        },
        "matrix": [
            [0.003477371303877871, 0.0029178609785503783, 108.1900760388757],
            [-0.0029178609785503783, 0.003477371303877871, 70.18180281766583]
        ]
    }, {
        "text": "Rain Gauge",
        "url": "http://edwardsaquifer.org/go?tag=Rain Gauge",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1441,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 1826,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2180,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2570,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -108.14000000000001,
            "y": -870.14,
            "width": 3557.28,
            "height": 1218.28
        },
        "matrix": [
            [0.0034415121239378572, -0.0013904611546005467, 88.36403311915727],
            [0.0013904611546005467, 0.0034415121239378572, 216.59913490471897]
        ]
    }, {
        "text": "Remote Meters",
        "url": "http://edwardsaquifer.org/go?tag=Remote Meters",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1665,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1956,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2317,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2474,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3324,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3615,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3976,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4239,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -74.15,
            "y": -817.15,
            "width": 4750.3,
            "height": 944.3
        },
        "matrix": [
            [0.0027512863802160482, 0.0023086033869023593, 81.69283037611402],
            [-0.0023086033869023593, 0.0027512863802160482, 75.55561579332431]
        ]
    }, {
        "text": "Legislation & Rules",
        "url": "http://edwardsaquifer.org/go?tag=Legislation & Rules",
        "fill": "#3c7bec",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.43"
        }, {
            "x": 317,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 678,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1071,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1591,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1764,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2118,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2409,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2584,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3334,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3491,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3993,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4150,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 4523,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 4913,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6031.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0018527383820705543, -0.0019868186687942175, 122.99575873035225],
            [0.0019868186687942175, 0.0018527383820705543, 123.62578356680712]
        ]
    }, {
        "text": "Groundwater Withdrawals",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Withdrawals",
        "fill": "#2951df",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 4795,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4970,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5261,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 5641,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 6027,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6644,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 7184,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7538,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7711,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -95.92500000000001,
            "y": -857.925,
            "width": 8249.85,
            "height": 990.85
        },
        "matrix": [
            [0.0020909143913178294, 0.0007199595619554812, 104.71508980150213],
            [-0.0007199595619554812, 0.0020909143913178294, 175.5259821969192]
        ]
    }, {
        "text": "Water Quality Monitors",
        "url": "http://edwardsaquifer.org/go?tag=Water Quality Monitors",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.48"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2899,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3253,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3426,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3601,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3892,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 4248,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4405,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4894,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5262,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5644,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5819,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 6110,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6478,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6741,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.12,
            "y": -888.12,
            "width": 7362.24,
            "height": 1234.24
        },
        "matrix": [
            [0.001249350444080008, -0.0013397643240868424, 99.12695275562004],
            [0.0013397643240868424, 0.001249350444080008, 227.44925975204592]
        ]
    }, {
        "text": "Comal Springs",
        "url": "http://edwardsaquifer.org/go?tag=Comal Springs",
        "fill": "#0602c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1270,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1624,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1797,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2312,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 2695,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2958,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3133,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3515,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3908,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 4504.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0014254139880509992, 0.0033580649160282155, 61.956975220012566],
            [-0.0033580649160282155, 0.0014254139880509992, 110.01610261797428]
        ]
    }, {
        "text": "San Marcos Springs",
        "url": "http://edwardsaquifer.org/go?tag=San Marcos Springs",
        "fill": "#0b0dca",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 712,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1094,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1251,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 1740,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2094,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2357,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 2670,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3038,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3383,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3540,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 3898,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 4281,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4719,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5101,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 5494,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -126.14000000000001,
            "y": -870.14,
            "width": 6091.28,
            "height": 1218.28
        },
        "matrix": [
            [0.0022232757102844942, 0.001675358415980047, 94.52824352018709],
            [-0.001675358415980047, 0.0022232757102844942, 204.0876937063294]
        ]
    }, {
        "text": "Index readings",
        "url": "http://edwardsaquifer.org/go?tag=Index readings",
        "fill": "#4545da",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.40"
        }, {
            "x": 168,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 550,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 936,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.86"
        }, {
            "x": 1707,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1864,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2127,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2488,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2842,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3228,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3403,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3785,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4178,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4762.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0025368227780529053, -0.001024942932629373, 54.097116847074375],
            [0.001024942932629373, 0.0025368227780529053, 186.8645875716727]
        ]
    }, {
        "text": "Habitat Conservation Plan",
        "url": "http://edwardsaquifer.org/go?tag=Habitat Conservation Plan",
        "fill": "#7878e4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.39"
        }, {
            "x": 409,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 763,
            "y": 0,
            "glyph": "0.64"
        }, {
            "x": 1146,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1321,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1612,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1966,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2257,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2414,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2753,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3121,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3503,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3848,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4209,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4472,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 4816,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5170,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5461,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5636,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6004,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6386,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 6543,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 6903,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7076,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7430,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -79.42,
            "y": -858.42,
            "width": 7976.84,
            "height": 994.84
        },
        "matrix": [
            [0.0018150807046529382, 0.001367761416254655, 78.70261786765147],
            [-0.001367761416254655, 0.0018150807046529382, 99.05601392222593]
        ]
    }, {
        "text": "Aquifer Management",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Management",
        "fill": "#1c35d6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2917,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3271,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3653,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4007,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4400,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4761,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 5324,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5685,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6067,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 6641.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0010633557925802011, 0.0025051092596624575, 181.19652560050693],
            [-0.0025051092596624575, 0.0010633557925802011, 190.6194510526449]
        ]
    }, {
        "text": "Aquifer Science",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Science",
        "fill": "#3435d5",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2786,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 3099,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3274,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3635,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4017,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4330,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 4969.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0021508316847840183, 0.0016207679271584134, 39.41592154756256],
            [-0.0016207679271584134, 0.0021508316847840183, 169.23104012990444]
        ]
    }, {
        "text": "Modeling & Data",
        "url": "http://edwardsaquifer.org/go?tag=Modeling & Data",
        "fill": "#3060e4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 489,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 857,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 1243,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1604,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1777,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 2334,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2727,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2884,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3386,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3543,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 3936,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4290,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4581,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 5162.56,
            "height": 1239.56
        },
        "matrix": [
            [0.001398335667142753, -0.0019246439310052815, 143.97555761211174],
            [0.0019246439310052815, 0.001398335667142753, 177.64207958082795]
        ]
    }, {
        "text": "Aquifer Protection",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Protection",
        "fill": "#2c57e1",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 2788,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3051,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3419,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3710,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4071,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4384,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4675,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4850,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5218,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5866.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0012216879006618799, -0.0016815091389293941, 171.1160189480429],
            [0.0016815091389293941, 0.0012216879006618799, 111.06639701207249]
        ]
    }, {
        "text": "Recharge Enhancement",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Enhancement",
        "fill": "#2547dc",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 3275,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3657,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 4037,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4391,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4773,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 6010,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6371,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6753,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 7287.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0005688570939756294, 0.002676262212308159, 99.48452286181755],
            [-0.002676262212308159, 0.0005688570939756294, 144.61190750275495]
        ]
    }, {
        "text": "Water Rights",
        "url": "http://edwardsaquifer.org/go?tag=Water Rights",
        "fill": "#1627d2",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 2454,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2629,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3022,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 3402,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3693,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.78,
            "y": -888.78,
            "width": 4315.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0014254139880509992, 0.0033580649160282155, 88.51020872764788],
            [-0.0033580649160282155, 0.0014254139880509992, 172.8665332358662]
        ]
    }, {
        "text": "Conservation Easements",
        "url": "http://edwardsaquifer.org/go?tag=Conservation Easements",
        "fill": "#1d36d7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1089,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1434,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1795,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2058,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 2402,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2756,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3047,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3222,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3590,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3972,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4129,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 4449,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4803,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 5148,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5509,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 6072,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6433,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6815,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 7106,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -89.78,
            "y": -839.78,
            "width": 7636.56,
            "height": 973.56
        },
        "matrix": [
            [0.000060797317506929786, 0.003483075987225133, 197.98530529234955],
            [-0.003483075987225133, 0.000060797317506929786, 162.34288624854443]
        ]
    }, {
        "text": "Critical Period Management",
        "url": "http://edwardsaquifer.org/go?tag=Critical Period Management",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 602,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 777,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1068,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1243,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1556,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1910,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2083,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2240,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 2600,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2961,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3224,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3399,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3767,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 4153,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4310,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4799,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5153,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5535,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5889,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 6282,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6643,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 7206,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 7567,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 7949,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 8495.56,
            "height": 1239.56
        },
        "matrix": [
            [0.00037923806265041963, 0.0017841748082054393, 40.0957862520912],
            [-0.0017841748082054393, 0.00037923806265041963, 146.27423637916704]
        ]
    }, {
        "text": "Groundwater Conservation Plan",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Conservation Plan",
        "fill": "#2547dc",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 4479,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4847,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5229,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 5574,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5935,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6198,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 6542,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6896,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 7187,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 7362,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 7730,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 8112,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 8269,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 8629,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 8802,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 9156,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -96.42,
            "y": -858.42,
            "width": 9719.84,
            "height": 994.84
        },
        "matrix": [
            [0.000039664560084734944, 0.0022723811253554348, 157.94890891034242],
            [-0.0022723811253554348, 0.000039664560084734944, 111.9796353386655]
        ]
    }, {
        "text": "Artesian Zone",
        "url": "http://edwardsaquifer.org/go?tag=Artesian Zone",
        "fill": "#3871e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 700,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 991,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1352,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1697,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1872,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2226,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 2608,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2765,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3150,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3518,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3900,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -115.28500000000001,
            "y": -839.285,
            "width": 4470.57,
            "height": 969.57
        },
        "matrix": [
            [0.0029506500678183993, 0.0003101258189146692, 156.75152512313082],
            [-0.0003101258189146692, 0.0029506500678183993, 170.03445192919304]
        ]
    }, {
        "text": "Karst",
        "url": "http://edwardsaquifer.org/go?tag=Karst",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.42"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 747,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1355,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -75.31500000000001,
            "y": -818.315,
            "width": 1817.63,
            "height": 945.63
        },
        "matrix": [
            [0.004666695178734971, 0.00351660705253092, 127.0442949592177],
            [-0.00351660705253092, 0.004666695178734971, 44.71617758943865]
        ]
    }, {
        "text": "Edwards Plateau",
        "url": "http://edwardsaquifer.org/go?tag=Edwards Plateau",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 320,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 706,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1600,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2249,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 2594,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2751,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 3111,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3284,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3638,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3929,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4644,
            "y": 0,
            "glyph": "0.83"
        }],
        "bbox": {
            "x": -78.92500000000001,
            "y": -857.925,
            "width": 5188.85,
            "height": 990.85
        },
        "matrix": [
            [0.0018223897544703326, 0.0013732691803469556, 115.6057915043562],
            [-0.0013732691803469556, 0.0018223897544703326, 38.70037354867934]
        ]
    }, {
        "text": "Water Wells",
        "url": "http://edwardsaquifer.org/go?tag=Water Wells",
        "fill": "#111cce",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 2736,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3097,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3270,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3443,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -117.92500000000001,
            "y": -857.925,
            "width": 4003.85,
            "height": 990.85
        },
        "matrix": [
            [0.0022775623786014786, -0.002442386629941615, 170.7412677988258],
            [0.002442386629941615, 0.0022775623786014786, 86.07590671299982]
        ]
    }, {
        "text": "Springflow",
        "url": "http://edwardsaquifer.org/go?tag=Springflow",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 741,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1004,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1179,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1561,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 2209,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2382,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2750,
            "y": 0,
            "glyph": "0.85"
        }],
        "bbox": {
            "x": -129.44,
            "y": -893.44,
            "width": 3559.88,
            "height": 1244.88
        },
        "matrix": [
            [0.0005664260807535113, 0.002664825194306842, 124.48009460913414],
            [-0.002664825194306842, 0.0005664260807535113, 60.69620734654663]
        ]
    }, {
        "text": "Ecosystem",
        "url": "http://edwardsaquifer.org/go?tag=Ecosystem",
        "fill": "#3366e5",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 320,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 633,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1001,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1346,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 1702,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 2047,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2338,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2699,
            "y": 0,
            "glyph": "0.75"
        }],
        "bbox": {
            "x": -103.345,
            "y": -847.345,
            "width": 3471.69,
            "height": 1187.69
        },
        "matrix": [
            [0.002280538130594173, 0.001718508744723094, 172.97546956473423],
            [-0.001718508744723094, 0.002280538130594173, 136.20513493397561]
        ]
    }, {
        "text": "Water Resources",
        "url": "http://edwardsaquifer.org/go?tag=Water Resources",
        "fill": "#4243da",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 2454,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2815,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3160,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3528,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 3918,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4181,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4494,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4855,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -112.15,
            "y": -817.15,
            "width": 5404.3,
            "height": 944.3
        },
        "matrix": [
            [0.0004978167244932269, 0.002342043551052774, 75.88239459589076],
            [-0.002342043551052774, 0.0004978167244932269, 128.62638803798154]
        ]
    }, {
        "text": "Aquifer Conditions",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Conditions",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2767,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3135,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3517,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3903,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4078,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4369,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4912,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5294,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5918.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0021155746342969204, 0.000728450764563615, 137.76145586938068],
            [-0.000728450764563615, 0.0021155746342969204, 234.26155704566492]
        ]
    }, {
        "text": "Recharge Zone",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Zone",
        "fill": "#0a0bc9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3340,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3708,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4090,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4689.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0014151379305535356, -0.0019477702625868769, 117.799844491926],
            [0.0019477702625868769, 0.0014151379305535356, 207.7829408037167]
        ]
    }, {
        "text": "Regulated Materials",
        "url": "http://edwardsaquifer.org/go?tag=Regulated Materials",
        "fill": "#3163e4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1127,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1517,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1690,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2335,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2696,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3082,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3239,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 3728,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4082,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4734,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4997,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5172,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5526,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5699,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6283.56,
            "height": 1239.56
        },
        "matrix": [
            [0.00003665122168472329, 0.0020997470840382715, 127.08529597118492],
            [-0.0020997470840382715, 0.00003665122168472329, 123.00702103834683]
        ]
    }, {
        "text": "Range Management",
        "url": "http://edwardsaquifer.org/go?tag=Range Management",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1109,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1502,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2020,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2863,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3245,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3599,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3992,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4353,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 4916,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5277,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5659,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -105.005,
            "y": -848.005,
            "width": 6182.01,
            "height": 1193.01
        },
        "matrix": [
            [0.0011139742797070284, -0.0015332540584586515, 161.45044306302458],
            [0.0015332540584586515, 0.0011139742797070284, 42.134808849094114]
        ]
    }, {
        "text": "Drainage Area",
        "url": "http://edwardsaquifer.org/go?tag=Drainage Area",
        "fill": "#1627d2",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 656,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1185,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1567,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1921,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2314,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2675,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2832,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 3269,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3532,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3893,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -107.14000000000001,
            "y": -870.14,
            "width": 4468.28,
            "height": 1218.28
        },
        "matrix": [
            [0.002621396915067717, 0.0009026193432501582, 117.1436710720748],
            [-0.0009026193432501582, 0.002621396915067717, 202.36747210267762]
        ]
    }, {
        "text": "Rainfall",
        "url": "http://edwardsaquifer.org/go?tag=Rainfall",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1539,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1893,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2066,
            "y": 0,
            "glyph": "0.74"
        }],
        "bbox": {
            "x": -80.58500000000001,
            "y": -862.585,
            "width": 2397.17,
            "height": 996.1700000000001
        },
        "matrix": [
            [0.002569851800720581, -0.0035370975568020956, 145.23830329102313],
            [0.0035370975568020956, 0.002569851800720581, 64.22922506235477]
        ]
    }, {
        "text": "Rain Gauge",
        "url": "http://edwardsaquifer.org/go?tag=Rain Gauge",
        "fill": "#356be7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1441,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 1826,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2180,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2570,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -108.14000000000001,
            "y": -870.14,
            "width": 3557.28,
            "height": 1218.28
        },
        "matrix": [
            [0.000048584755911651315, 0.0027834188020183378, 178.66748634631625],
            [-0.0027834188020183378, 0.000048584755911651315, 151.5562135132722]
        ]
    }, {
        "text": "Remote Meters",
        "url": "http://edwardsaquifer.org/go?tag=Remote Meters",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1665,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1956,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2317,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2474,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3324,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3615,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3976,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4239,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -74.15,
            "y": -817.15,
            "width": 4750.3,
            "height": 944.3
        },
        "matrix": [
            [0.0004978167244932269, 0.002342043551052774, 128.38774626967125],
            [-0.002342043551052774, 0.0004978167244932269, 73.9975034345241]
        ]
    }, {
        "text": "Legislation & Rules",
        "url": "http://edwardsaquifer.org/go?tag=Legislation & Rules",
        "fill": "#1627d2",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.43"
        }, {
            "x": 317,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 678,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1071,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1591,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1764,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2118,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2409,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2584,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3334,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3491,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3993,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4150,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 4523,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 4913,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6031.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0012439884250067033, -0.0013340142626100749, 183.58458826465],
            [0.0013340142626100749, 0.0012439884250067033, 99.53491350356009]
        ]
    }, {
        "text": "Groundwater Withdrawals",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Withdrawals",
        "fill": "#4b9bf6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 4795,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4970,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5261,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 5641,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 6027,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6644,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 7184,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7538,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7711,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -95.92500000000001,
            "y": -857.925,
            "width": 8249.85,
            "height": 990.85
        },
        "matrix": [
            [0.0003558708351078591, 0.001674240645933675, 152.45628026774438],
            [-0.001674240645933675, 0.0003558708351078591, 161.7871684808568]
        ]
    }, {
        "text": "Water Quality Monitors",
        "url": "http://edwardsaquifer.org/go?tag=Water Quality Monitors",
        "fill": "#2f5ee3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.48"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2899,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3253,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3426,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3601,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3892,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 4248,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4405,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4894,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5262,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5644,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5819,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 6110,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6478,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6741,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.12,
            "y": -888.12,
            "width": 7362.24,
            "height": 1234.24
        },
        "matrix": [
            [0.0014033141738170934, 0.0011775204056757723, 107.65488190697232],
            [-0.0011775204056757723, 0.0014033141738170934, 165.71915008015725]
        ]
    }, {
        "text": "Comal Springs",
        "url": "http://edwardsaquifer.org/go?tag=Comal Springs",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1270,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1624,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1797,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2312,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 2695,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2958,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3133,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3515,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3908,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 4504.56,
            "height": 1239.56
        },
        "matrix": [
            [0.001551842825493653, -0.001664147688935687, 44.511171332609976],
            [0.001664147688935687, 0.001551842825493653, 188.67315595922622]
        ]
    }, {
        "text": "San Marcos Springs",
        "url": "http://edwardsaquifer.org/go?tag=San Marcos Springs",
        "fill": "#3e80ed",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 712,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1094,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1251,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 1740,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2094,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2357,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 2670,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3038,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3383,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3540,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 3898,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 4281,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4719,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5101,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 5494,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -126.14000000000001,
            "y": -870.14,
            "width": 6091.28,
            "height": 1218.28
        },
        "matrix": [
            [0.0014216982022950467, 0.0011929464371911755, 120.17001553694644],
            [-0.0011929464371911755, 0.0014216982022950467, 155.20196896551477]
        ]
    }, {
        "text": "Index readings",
        "url": "http://edwardsaquifer.org/go?tag=Index readings",
        "fill": "#9191e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.40"
        }, {
            "x": 168,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 550,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 936,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.86"
        }, {
            "x": 1707,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1864,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2127,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2488,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2842,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3228,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3403,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3785,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4178,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4762.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0005390303095275246, 0.0025359382241246817, 65.25747206712263],
            [-0.0025359382241246817, 0.0005390303095275246, 151.4212640365783]
        ]
    }, {
        "text": "Habitat Conservation Plan",
        "url": "http://edwardsaquifer.org/go?tag=Habitat Conservation Plan",
        "fill": "#0f17cd",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.39"
        }, {
            "x": 409,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 763,
            "y": 0,
            "glyph": "0.64"
        }, {
            "x": 1146,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1321,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1612,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1966,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2257,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2414,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2753,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3121,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3503,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3848,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4209,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4472,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 4816,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5170,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5461,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5636,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6004,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6386,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 6543,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 6903,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7076,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7430,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -79.42,
            "y": -858.42,
            "width": 7976.84,
            "height": 994.84
        },
        "matrix": [
            [0.000888025292021077, 0.0020920564851191824, 79.23800439177123],
            [-0.0020920564851191824, 0.000888025292021077, 166.14639592962308]
        ]
    }, {
        "text": "Aquifer Management",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Management",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2917,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3271,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3653,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4007,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4400,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4761,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 5324,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5685,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6067,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 6641.21,
            "height": 1246.21
        },
        "matrix": [
            [0.000708903861720134, 0.0016700728397749717, 52.31928621883647],
            [-0.0016700728397749717, 0.000708903861720134, 113.55044462113838]
        ]
    }, {
        "text": "Aquifer Science",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Science",
        "fill": "#1d36d6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2786,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 3099,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3274,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3635,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4017,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4330,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 4969.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0018043620300171447, 0.00018964609130737555, 187.74667150748573],
            [-0.00018964609130737555, 0.0018043620300171447, 120.31197160007396]
        ]
    }, {
        "text": "Modeling & Data",
        "url": "http://edwardsaquifer.org/go?tag=Modeling & Data",
        "fill": "#0602c7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 489,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 857,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 1243,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1604,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1777,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 2334,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2727,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2884,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3386,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3543,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 3936,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4290,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4581,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 5162.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0017246583460502562, 0.0005938474920355862, 155.12241211015825],
            [-0.0005938474920355862, 0.0017246583460502562, 76.40999399861748]
        ]
    }, {
        "text": "Aquifer Protection",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Protection",
        "fill": "#111ace",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 2788,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3051,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3419,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3710,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4071,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4384,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4675,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4850,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5218,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5866.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0018043620300171447, 0.00018964609130737555, 148.07145560471508],
            [-0.00018964609130737555, 0.0018043620300171447, 83.2561653644311]
        ]
    }, {
        "text": "Recharge Enhancement",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Enhancement",
        "fill": "#264add",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 3275,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3657,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 4037,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4391,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4773,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 6010,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6371,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6753,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 7287.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0014531047245846158, 0.0010949929504342425, 116.90581807187772],
            [-0.0010949929504342425, 0.0014531047245846158, 187.55220987002275]
        ]
    }, {
        "text": "Water Rights",
        "url": "http://edwardsaquifer.org/go?tag=Water Rights",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 2454,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2629,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3022,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 3402,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3693,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.78,
            "y": -888.78,
            "width": 4315.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0004435241907414779, 0.0020866172620444207, 39.82095285920485],
            [-0.0020866172620444207, 0.0004435241907414779, 156.13490333364115]
        ]
    }, {
        "text": "Conservation Easements",
        "url": "http://edwardsaquifer.org/go?tag=Conservation Easements",
        "fill": "#0d12cb",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1089,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1434,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1795,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2058,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 2402,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2756,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3047,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3222,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3590,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3972,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4129,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 4449,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4803,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 5148,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5509,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 6072,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6433,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6815,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 7106,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -89.78,
            "y": -839.78,
            "width": 7636.56,
            "height": 973.56
        },
        "matrix": [
            [0.001263472283009632, -0.0013549081422829796, 88.30562530449379],
            [0.0013549081422829796, 0.001263472283009632, 97.1584239533181]
        ]
    }, {
        "text": "Critical Period Management",
        "url": "http://edwardsaquifer.org/go?tag=Critical Period Management",
        "fill": "#0a0cca",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 602,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 777,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1068,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1243,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1556,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1910,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2083,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2240,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 2600,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2961,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3224,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3399,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3767,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 4153,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4310,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4799,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5153,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5535,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5889,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 6282,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6643,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 7206,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 7567,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 7949,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 8495.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0006537636126408221, 0.0015401705535293638, 174.31970858020773],
            [-0.0015401705535293638, 0.0006537636126408221, 215.16136234092497]
        ]
    }, {
        "text": "Groundwater Conservation Plan",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Conservation Plan",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 4479,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4847,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5229,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 5574,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5935,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6198,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 6542,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6896,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 7187,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 7362,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 7730,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 8112,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 8269,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 8629,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 8802,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 9156,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -96.42,
            "y": -858.42,
            "width": 9719.84,
            "height": 994.84
        },
        "matrix": [
            [0.0009461332190955393, 0.0007939000351876394, 78.46916769046007],
            [-0.0007939000351876394, 0.0009461332190955393, 207.4194525318087]
        ]
    }, {
        "text": "Artesian Zone",
        "url": "http://edwardsaquifer.org/go?tag=Artesian Zone",
        "fill": "#0a0cca",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 700,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 991,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1352,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1697,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1872,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2226,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 2608,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2765,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3150,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3518,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3900,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -115.28500000000001,
            "y": -839.285,
            "width": 4470.57,
            "height": 969.57
        },
        "matrix": [
            [0.001370692632232105, -0.001886596557527312, 181.14610535438717],
            [0.001886596557527312, 0.001370692632232105, 83.44949210872761]
        ]
    }, {
        "text": "Karst",
        "url": "http://edwardsaquifer.org/go?tag=Karst",
        "fill": "#101ace",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.42"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 747,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1355,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -75.31500000000001,
            "y": -818.315,
            "width": 1817.63,
            "height": 945.63
        },
        "matrix": [
            [0.003819072762532764, 0.002877877747843831, 146.01822248812158],
            [-0.002877877747843831, 0.003819072762532764, 213.40127177847222]
        ]
    }, {
        "text": "Edwards Plateau",
        "url": "http://edwardsaquifer.org/go?tag=Edwards Plateau",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 320,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 706,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1600,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2249,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 2594,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2751,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 3111,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3284,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3638,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3929,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4644,
            "y": 0,
            "glyph": "0.83"
        }],
        "bbox": {
            "x": -78.92500000000001,
            "y": -857.925,
            "width": 5188.85,
            "height": 990.85
        },
        "matrix": [
            [0.0015672191882376571, 0.0011809843666953, 109.61918288835227],
            [-0.0011809843666953, 0.0015672191882376571, 73.21265958269247]
        ]
    }, {
        "text": "Water Wells",
        "url": "http://edwardsaquifer.org/go?tag=Water Wells",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 2736,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3097,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3270,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3443,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -117.92500000000001,
            "y": -857.925,
            "width": 4003.85,
            "height": 990.85
        },
        "matrix": [
            [0.002269378821645724, 0.0002385213255771958, 140.89647267465048],
            [-0.0002385213255771958, 0.002269378821645724, 224.11420317164516]
        ]
    }, {
        "text": "Springflow",
        "url": "http://edwardsaquifer.org/go?tag=Springflow",
        "fill": "#1b31d5",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 741,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1004,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1179,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1561,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 2209,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2382,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2750,
            "y": 0,
            "glyph": "0.85"
        }],
        "bbox": {
            "x": -129.44,
            "y": -893.44,
            "width": 3559.88,
            "height": 1244.88
        },
        "matrix": [
            [0.000047546620101573295, 0.0027239440412914506, 197.2891102063129],
            [-0.0027239440412914506, 0.000047546620101573295, 174.07062248856693]
        ]
    }, {
        "text": "Ecosystem",
        "url": "http://edwardsaquifer.org/go?tag=Ecosystem",
        "fill": "#376ee8",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 320,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 633,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1001,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1346,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 1702,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 2047,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2338,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2699,
            "y": 0,
            "glyph": "0.75"
        }],
        "bbox": {
            "x": -103.345,
            "y": -847.345,
            "width": 3471.69,
            "height": 1187.69
        },
        "matrix": [
            [0.0026295196478103543, 0.0002763736516991782, 114.12704310004628],
            [-0.0002763736516991782, 0.0026295196478103543, 137.8472476531116]
        ]
    }, {
        "text": "Water Resources",
        "url": "http://edwardsaquifer.org/go?tag=Water Resources",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 2454,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2815,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3160,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3528,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 3918,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4181,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4494,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4855,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -112.15,
            "y": -817.15,
            "width": 5404.3,
            "height": 944.3
        },
        "matrix": [
            [0.001632953819867954, -0.0017511285813416758, 54.80605670215026],
            [0.0017511285813416758, 0.001632953819867954, 206.7972467267039]
        ]
    }, {
        "text": "Aquifer Conditions",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Conditions",
        "fill": "#1626d1",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2767,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3135,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3517,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3903,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4078,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4369,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4912,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5294,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5918.21,
            "height": 1246.21
        },
        "matrix": [
            [0.000708903861720134, 0.0016700728397749717, 191.77894541884757],
            [-0.0016700728397749717, 0.000708903861720134, 186.81490900166793]
        ]
    }, {
        "text": "Recharge Zone",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Zone",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3340,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3708,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4090,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4689.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0013972913662041446, 0.0011724666700290952, 73.29357842077874],
            [-0.0011724666700290952, 0.0013972913662041446, 83.58454397338153]
        ]
    }, {
        "text": "Regulated Materials",
        "url": "http://edwardsaquifer.org/go?tag=Regulated Materials",
        "fill": "#1e38d7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1127,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1517,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1690,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2335,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2696,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3082,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3239,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 3728,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4082,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4734,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4997,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5172,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5526,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5699,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6283.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0007127069940254996, 0.0016790324580141078, 170.75869469088508],
            [-0.0016790324580141078, 0.0007127069940254996, 195.3863777122842]
        ]
    }, {
        "text": "Range Management",
        "url": "http://edwardsaquifer.org/go?tag=Range Management",
        "fill": "#4996f4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1109,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1502,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2020,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2863,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3245,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3599,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3992,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4353,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 4916,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5277,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5659,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -105.005,
            "y": -848.005,
            "width": 6182.01,
            "height": 1193.01
        },
        "matrix": [
            [0.0018079144207340339, 0.00019001946261703906, 128.59196246123142],
            [-0.00019001946261703906, 0.0018079144207340339, 142.60682579284378]
        ]
    }, {
        "text": "Drainage Area",
        "url": "http://edwardsaquifer.org/go?tag=Drainage Area",
        "fill": "#a2a2ed",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 656,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1185,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1567,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1921,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2314,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2675,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2832,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 3269,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3532,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3893,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -107.14000000000001,
            "y": -870.14,
            "width": 4468.28,
            "height": 1218.28
        },
        "matrix": [
            [0.00038586230828623476, 0.0018153394336762768, 78.84137204886133],
            [-0.0018153394336762768, 0.00038586230828623476, 108.25242844327303]
        ]
    }, {
        "text": "Rainfall",
        "url": "http://edwardsaquifer.org/go?tag=Rainfall",
        "fill": "#1c34d6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1539,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1893,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2066,
            "y": 0,
            "glyph": "0.74"
        }],
        "bbox": {
            "x": -80.58500000000001,
            "y": -862.585,
            "width": 2397.17,
            "height": 996.1700000000001
        },
        "matrix": [
            [0.002718986048892652, 0.002048902949316052, 145.50728667293112],
            [-0.002048902949316052, 0.002718986048892652, 202.62822642261236]
        ]
    }, {
        "text": "Rain Gauge",
        "url": "http://edwardsaquifer.org/go?tag=Rain Gauge",
        "fill": "#1716cd",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1441,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 1826,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2180,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2570,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -108.14000000000001,
            "y": -870.14,
            "width": 3557.28,
            "height": 1218.28
        },
        "matrix": [
            [0.002306801938565426, 0.00024245465366229909, 69.03129522464724],
            [-0.00024245465366229909, 0.002306801938565426, 187.68720400702102]
        ]
    }, {
        "text": "Remote Meters",
        "url": "http://edwardsaquifer.org/go?tag=Remote Meters",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1665,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1956,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2317,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2474,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3324,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3615,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3976,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4239,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -74.15,
            "y": -817.15,
            "width": 4750.3,
            "height": 944.3
        },
        "matrix": [
            [0.0004978167244932269, 0.002342043551052774, 44.76397649478842],
            [-0.002342043551052774, 0.0004978167244932269, 130.73500445344303]
        ]
    }, {
        "text": "Legislation & Rules",
        "url": "http://edwardsaquifer.org/go?tag=Legislation & Rules",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.43"
        }, {
            "x": 317,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 678,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1071,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1591,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1764,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2118,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2409,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2584,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3334,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3491,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3993,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4150,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 4523,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 4913,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6031.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0007127069940254996, 0.0016790324580141078, 129.3796720568482],
            [-0.0016790324580141078, 0.0007127069940254996, 19.02364689867727]
        ]
    }, {
        "text": "Groundwater Withdrawals",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Withdrawals",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 4795,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4970,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5261,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 5641,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 6027,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6644,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 7184,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7538,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7711,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -95.92500000000001,
            "y": -857.925,
            "width": 8249.85,
            "height": 990.85
        },
        "matrix": [
            [0.00030391888837678476, 0.0014298259530966422, 75.11106973380274],
            [-0.0014298259530966422, 0.00030391888837678476, 180.09961934318898]
        ]
    }, {
        "text": "Water Quality Monitors",
        "url": "http://edwardsaquifer.org/go?tag=Water Quality Monitors",
        "fill": "#2f5ee3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.48"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2899,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3253,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3426,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3601,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3892,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 4248,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4405,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4894,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5262,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5644,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5819,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 6110,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6478,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6741,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.12,
            "y": -888.12,
            "width": 7362.24,
            "height": 1234.24
        },
        "matrix": [
            [0.0005925202770458093, 0.0013958902964769147, 177.93652518954576],
            [-0.0013958902964769147, 0.0005925202770458093, 165.58956119052118]
        ]
    }, {
        "text": "Comal Springs",
        "url": "http://edwardsaquifer.org/go?tag=Comal Springs",
        "fill": "#1e38d7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1270,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1624,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1797,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2312,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 2695,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2958,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3133,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3515,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3908,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 4504.56,
            "height": 1239.56
        },
        "matrix": [
            [0.00037923806265041963, 0.0017841748082054393, 104.86699053706486],
            [-0.0017841748082054393, 0.00037923806265041963, 120.51427046805962]
        ]
    }, {
        "text": "San Marcos Springs",
        "url": "http://edwardsaquifer.org/go?tag=San Marcos Springs",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 712,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1094,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1251,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 1740,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2094,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2357,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 2670,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3038,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3383,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3540,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 3898,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 4281,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4719,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5101,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 5494,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -126.14000000000001,
            "y": -870.14,
            "width": 6091.28,
            "height": 1218.28
        },
        "matrix": [
            [0.0017547833826624876, 0.0006042203739925396, 151.2115445641525],
            [-0.0006042203739925396, 0.0017547833826624876, 228.98973284517857]
        ]
    }, {
        "text": "Index readings",
        "url": "http://edwardsaquifer.org/go?tag=Index readings",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.40"
        }, {
            "x": 168,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 550,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 936,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.86"
        }, {
            "x": 1707,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1864,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2127,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2488,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2842,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3228,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3403,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3785,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4178,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4762.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0018140420838262496, 0.0001906635059603121, 135.51652493927836],
            [-0.0001906635059603121, 0.0018140420838262496, 59.4379310196705]
        ]
    }, {
        "text": "Habitat Conservation Plan",
        "url": "http://edwardsaquifer.org/go?tag=Habitat Conservation Plan",
        "fill": "#1627d2",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.39"
        }, {
            "x": 409,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 763,
            "y": 0,
            "glyph": "0.64"
        }, {
            "x": 1146,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1321,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1612,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1966,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2257,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2414,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2753,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3121,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3503,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3848,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4209,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4472,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 4816,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5170,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5461,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5636,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6004,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6386,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 6543,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 6903,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7076,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7430,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -79.42,
            "y": -858.42,
            "width": 7976.84,
            "height": 994.84
        },
        "matrix": [
            [0.0005408568014017115, 0.001274178775154089, 86.29374863413597],
            [-0.001274178775154089, 0.0005408568014017115, 148.47464639229787]
        ]
    }, {
        "text": "Aquifer Management",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Management",
        "fill": "#111ccf",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2917,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3271,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3653,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4007,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4400,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4761,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 5324,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5685,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6067,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 6641.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0015667825716779256, -0.0006330212491393333, 78.42974501426464],
            [0.0006330212491393333, 0.0015667825716779256, 134.3698209066229]
        ]
    }, {
        "text": "Aquifer Science",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Science",
        "fill": "#3265e5",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2786,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 3099,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3274,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3635,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4017,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4330,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 4969.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0018043620300171447, 0.00018964609130737555, 138.90543705132114],
            [-0.00018964609130737555, 0.0018043620300171447, 113.37929284225856]
        ]
    }, {
        "text": "Modeling & Data",
        "url": "http://edwardsaquifer.org/go?tag=Modeling & Data",
        "fill": "#1c35d6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 489,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 857,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 1243,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1604,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1777,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 2334,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2727,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2884,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3386,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3543,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 3936,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4290,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4581,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 5162.56,
            "height": 1239.56
        },
        "matrix": [
            [0.00037923806265041963, 0.0017841748082054393, 98.52088291060633],
            [-0.0017841748082054393, 0.00037923806265041963, 131.13142210651074]
        ]
    }, {
        "text": "Aquifer Protection",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Protection",
        "fill": "#1216cd",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 2788,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3051,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3419,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3710,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4071,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4384,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4675,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4850,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5218,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5866.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0016821905579119942, -0.0006796491022487197, 70.58053284285506],
            [0.0006796491022487197, 0.0016821905579119942, 153.89331334202654]
        ]
    }, {
        "text": "Recharge Enhancement",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Enhancement",
        "fill": "#192ed4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 3275,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3657,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 4037,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4391,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4773,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 6010,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6371,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6753,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 7287.56,
            "height": 1239.56
        },
        "matrix": [
            [0.00003183378856586024, 0.0018237565254998554, 172.77243637427432],
            [-0.0018237565254998554, 0.00003183378856586024, 103.32414826611347]
        ]
    }, {
        "text": "Water Rights",
        "url": "http://edwardsaquifer.org/go?tag=Water Rights",
        "fill": "#305fe4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 2454,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2629,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3022,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 3402,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3693,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.78,
            "y": -888.78,
            "width": 4315.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0017246583460502562, 0.0005938474920355862, 117.19875541689831],
            [-0.0005938474920355862, 0.0017246583460502562, 174.07781068995797]
        ]
    }, {
        "text": "Conservation Easements",
        "url": "http://edwardsaquifer.org/go?tag=Conservation Easements",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1089,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1434,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1795,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2058,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 2402,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2756,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3047,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3222,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3590,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3972,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4129,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 4449,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4803,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 5148,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5509,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 6072,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6433,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6815,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 7106,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -89.78,
            "y": -839.78,
            "width": 7636.56,
            "height": 973.56
        },
        "matrix": [
            [0.0009012287566105624, 0.0007562207172782814, 60.65087136694525],
            [-0.0007562207172782814, 0.0009012287566105624, 97.5130345485563]
        ]
    }, {
        "text": "Critical Period Management",
        "url": "http://edwardsaquifer.org/go?tag=Critical Period Management",
        "fill": "#1e38d7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 602,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 777,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1068,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1243,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1556,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1910,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2083,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2240,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 2600,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2961,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3224,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3399,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3767,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 4153,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4310,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4799,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5153,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5535,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5889,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 6282,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6643,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 7206,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 7567,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 7949,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 8495.56,
            "height": 1239.56
        },
        "matrix": [
            [0.000985161154705795, -0.0003980309431751874, 113.19994929956343],
            [0.0003980309431751874, 0.000985161154705795, 101.63451526019728]
        ]
    }, {
        "text": "Groundwater Conservation Plan",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Conservation Plan",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 4479,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4847,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5229,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 5574,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5935,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6198,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 6542,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6896,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 7187,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 7362,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 7730,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 8112,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 8269,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 8629,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 8802,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 9156,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -96.42,
            "y": -858.42,
            "width": 9719.84,
            "height": 994.84
        },
        "matrix": [
            [0.0008500641778113463, -0.0011700129655797297, 172.07392516754564],
            [0.0011700129655797297, 0.0008500641778113463, 62.03566101169022]
        ]
    }, {
        "text": "Artesian Zone",
        "url": "http://edwardsaquifer.org/go?tag=Artesian Zone",
        "fill": "#2f5ee3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 700,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 991,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1352,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1697,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1872,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2226,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 2608,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2765,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3150,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3518,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3900,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -115.28500000000001,
            "y": -839.285,
            "width": 4470.57,
            "height": 969.57
        },
        "matrix": [
            [0.0022805821241305554, 0.00023969884011731404, 131.0927846834339],
            [-0.00023969884011731404, 0.0022805821241305554, 184.89597368376127]
        ]
    }, {
        "text": "Karst",
        "url": "http://edwardsaquifer.org/go?tag=Karst",
        "fill": "#1a1ecf",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.42"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 747,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1355,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -75.31500000000001,
            "y": -818.315,
            "width": 1817.63,
            "height": 945.63
        },
        "matrix": [
            [0.002864304571899573, 0.0021584083108828734, 41.07838837349135],
            [-0.0021584083108828734, 0.002864304571899573, 163.61801544992554]
        ]
    }, {
        "text": "Edwards Plateau",
        "url": "http://edwardsaquifer.org/go?tag=Edwards Plateau",
        "fill": "#0808c8",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 320,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 706,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1600,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2249,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 2594,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2751,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 3111,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3284,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3638,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3929,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4644,
            "y": 0,
            "glyph": "0.83"
        }],
        "bbox": {
            "x": -78.92500000000001,
            "y": -857.925,
            "width": 5188.85,
            "height": 990.85
        },
        "matrix": [
            [0.0016641739040489693, 0.000573021028480126, 107.25708796540644],
            [-0.000573021028480126, 0.0016641739040489693, 210.60693691882682]
        ]
    }, {
        "text": "Water Wells",
        "url": "http://edwardsaquifer.org/go?tag=Water Wells",
        "fill": "#101ace",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 2736,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3097,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3270,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3443,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -117.92500000000001,
            "y": -857.925,
            "width": 4003.85,
            "height": 990.85
        },
        "matrix": [
            [0.0008916012327943162, 0.0021004808736498634, 108.0239755911557],
            [-0.0021004808736498634, 0.0008916012327943162, 98.34811315599026]
        ]
    }, {
        "text": "Springflow",
        "url": "http://edwardsaquifer.org/go?tag=Springflow",
        "fill": "#3031d4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 741,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1004,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1179,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1561,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 2209,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2382,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2750,
            "y": 0,
            "glyph": "0.85"
        }],
        "bbox": {
            "x": -129.44,
            "y": -893.44,
            "width": 3559.88,
            "height": 1244.88
        },
        "matrix": [
            [0.0021104769374943795, -0.0008526880317679942, 67.12428575732824],
            [0.0008526880317679942, 0.0021104769374943795, 159.95341457424612]
        ]
    }, {
        "text": "Ecosystem",
        "url": "http://edwardsaquifer.org/go?tag=Ecosystem",
        "fill": "#2f5de3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 320,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 633,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1001,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1346,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 1702,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 2047,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2338,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2699,
            "y": 0,
            "glyph": "0.75"
        }],
        "bbox": {
            "x": -103.345,
            "y": -847.345,
            "width": 3471.69,
            "height": 1187.69
        },
        "matrix": [
            [0.000474460106524632, 0.002232159302902137, 172.93582245038766],
            [-0.002232159302902137, 0.000474460106524632, 178.23369559860015]
        ]
    }, {
        "text": "Water Resources",
        "url": "http://edwardsaquifer.org/go?tag=Water Resources",
        "fill": "#1c34d6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 2454,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2815,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3160,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3528,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 3918,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4181,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4494,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4855,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -112.15,
            "y": -817.15,
            "width": 5404.3,
            "height": 944.3
        },
        "matrix": [
            [0.00039008576420353317, 0.0018352092315508538, 95.24907762095192],
            [-0.0018352092315508538, 0.00039008576420353317, 165.94719547410642]
        ]
    }, {
        "text": "Aquifer Conditions",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Conditions",
        "fill": "#3162e4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2767,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3135,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3517,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3903,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4078,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4369,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4912,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5294,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5918.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0010963618162531921, 0.0008261678870156484, 114.51821912151132],
            [-0.0008261678870156484, 0.0010963618162531921, 169.31040011634974]
        ]
    }, {
        "text": "Recharge Zone",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Zone",
        "fill": "#2951df",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3340,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3708,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4090,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4689.56,
            "height": 1239.56
        },
        "matrix": [
            [0.001072140481649361, -0.0014756747751474362, 146.33662813057055],
            [0.0014756747751474362, 0.001072140481649361, 184.68123615218113]
        ]
    }, {
        "text": "Regulated Materials",
        "url": "http://edwardsaquifer.org/go?tag=Regulated Materials",
        "fill": "#101ace",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1127,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1517,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1690,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2335,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2696,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3082,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3239,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 3728,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4082,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4734,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4997,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5172,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5526,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5699,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6283.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0013765079664849493, 0.000473969702773973, 84.93255733030564],
            [-0.000473969702773973, 0.0013765079664849493, 176.44173770750862]
        ]
    }, {
        "text": "Range Management",
        "url": "http://edwardsaquifer.org/go?tag=Range Management",
        "fill": "#3365e5",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1109,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1502,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2020,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2863,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3245,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3599,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3992,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4353,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 4916,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5277,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5659,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -105.005,
            "y": -848.005,
            "width": 6182.01,
            "height": 1193.01
        },
        "matrix": [
            [0.0008687957347850012, -0.001195794741940544, 145.7975384645406],
            [0.001195794741940544, 0.0008687957347850012, 175.03744397673324]
        ]
    }, {
        "text": "Drainage Area",
        "url": "http://edwardsaquifer.org/go?tag=Drainage Area",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 656,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1185,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1567,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1921,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2314,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2675,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2832,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 3269,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3532,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3893,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -107.14000000000001,
            "y": -870.14,
            "width": 4468.28,
            "height": 1218.28
        },
        "matrix": [
            [0.00038586230828623476, 0.0018153394336762768, 159.90135013276245],
            [-0.0018153394336762768, 0.00038586230828623476, 44.337681629200915]
        ]
    }, {
        "text": "Rainfall",
        "url": "http://edwardsaquifer.org/go?tag=Rainfall",
        "fill": "#3871e9",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1539,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1893,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2066,
            "y": 0,
            "glyph": "0.74"
        }],
        "bbox": {
            "x": -80.58500000000001,
            "y": -862.585,
            "width": 2397.17,
            "height": 996.1700000000001
        },
        "matrix": [
            [0.00005941740509355488, 0.0034040208580090755, 148.70413247686656],
            [-0.0034040208580090755, 0.00005941740509355488, 121.36908375214371]
        ]
    }, {
        "text": "Rain Gauge",
        "url": "http://edwardsaquifer.org/go?tag=Rain Gauge",
        "fill": "#2c30d6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1441,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 1826,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2180,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2570,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -108.14000000000001,
            "y": -870.14,
            "width": 3557.28,
            "height": 1218.28
        },
        "matrix": [
            [0.0017207560619689286, -0.0006952305773002734, 55.90115020754399],
            [0.0006952305773002734, 0.0017207560619689286, 191.09696668877746]
        ]
    }, {
        "text": "Remote Meters",
        "url": "http://edwardsaquifer.org/go?tag=Remote Meters",
        "fill": "#1c34d6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1665,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1956,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2317,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2474,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3324,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3615,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3976,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4239,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -74.15,
            "y": -817.15,
            "width": 4750.3,
            "height": 944.3
        },
        "matrix": [
            [0.000041350918706583724, 0.0023689925460968525, 197.6126460333267],
            [-0.0023689925460968525, 0.000041350918706583724, 131.32573931611702]
        ]
    }, {
        "text": "Legislation & Rules",
        "url": "http://edwardsaquifer.org/go?tag=Legislation & Rules",
        "fill": "#4fa4f8",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.43"
        }, {
            "x": 317,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 678,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1071,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1591,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1764,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2118,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2409,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2584,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3334,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3491,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3993,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4150,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 4523,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 4913,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6031.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0012719240098034137, 0.00043795855858143014, 145.527334542803],
            [-0.00043795855858143014, 0.0012719240098034137, 152.7561631437866]
        ]
    }, {
        "text": "Groundwater Withdrawals",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Withdrawals",
        "fill": "#2f5ee3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 4795,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4970,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5261,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 5641,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 6027,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6644,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 7184,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7538,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7711,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -95.92500000000001,
            "y": -857.925,
            "width": 8249.85,
            "height": 990.85
        },
        "matrix": [
            [0.00037589076578803214, 0.0008855431498730373, 114.89626029562868],
            [-0.0008855431498730373, 0.00037589076578803214, 125.81421248731357]
        ]
    }, {
        "text": "Water Quality Monitors",
        "url": "http://edwardsaquifer.org/go?tag=Water Quality Monitors",
        "fill": "#1019ce",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.48"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2899,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3253,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3426,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3601,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3892,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 4248,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4405,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4894,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5262,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5644,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5819,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 6110,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6478,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6741,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.12,
            "y": -888.12,
            "width": 7362.24,
            "height": 1234.24
        },
        "matrix": [
            [0.000897813840209102, 0.0003091420967776289, 134.25398625839424],
            [-0.0003091420967776289, 0.000897813840209102, 82.99425205493228]
        ]
    }, {
        "text": "Comal Springs",
        "url": "http://edwardsaquifer.org/go?tag=Comal Springs",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1270,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1624,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1797,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2312,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 2695,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2958,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3133,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3515,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3908,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 4504.56,
            "height": 1239.56
        },
        "matrix": [
            [0.00003183378856586024, 0.0018237565254998554, 117.14560398708603],
            [-0.0018237565254998554, 0.00003183378856586024, 81.45668545000689]
        ]
    }, {
        "text": "San Marcos Springs",
        "url": "http://edwardsaquifer.org/go?tag=San Marcos Springs",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 712,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1094,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1251,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 1740,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2094,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2357,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 2670,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3038,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3383,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3540,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 3898,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 4281,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4719,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5101,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 5494,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -126.14000000000001,
            "y": -870.14,
            "width": 6091.28,
            "height": 1218.28
        },
        "matrix": [
            [0.0011512500699836085, 0.0009660135091160634, 79.20341553802487],
            [-0.0009660135091160634, 0.0011512500699836085, 188.0766564328639]
        ]
    }, {
        "text": "Index readings",
        "url": "http://edwardsaquifer.org/go?tag=Index readings",
        "fill": "#6666e1",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.40"
        }, {
            "x": 168,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 550,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 936,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.86"
        }, {
            "x": 1707,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1864,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2127,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2488,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2842,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3228,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3403,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3785,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4178,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4762.56,
            "height": 1239.56
        },
        "matrix": [
            [0.00037923806265041963, 0.0017841748082054393, 68.39147876655792],
            [-0.0017841748082054393, 0.00037923806265041963, 147.8260310598984]
        ]
    }, {
        "text": "Habitat Conservation Plan",
        "url": "http://edwardsaquifer.org/go?tag=Habitat Conservation Plan",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.39"
        }, {
            "x": 409,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 763,
            "y": 0,
            "glyph": "0.64"
        }, {
            "x": 1146,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1321,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1612,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1966,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2257,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2414,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2753,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3121,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3503,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3848,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4209,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4472,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 4816,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5170,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5461,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5636,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6004,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6386,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 6543,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 6903,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7076,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7430,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -79.42,
            "y": -858.42,
            "width": 7976.84,
            "height": 994.84
        },
        "matrix": [
            [0.0007675790080910397, -0.0008231277107486135, 89.96853491324107],
            [0.0008231277107486135, 0.0007675790080910397, 218.67802182798562]
        ]
    }, {
        "text": "Aquifer Management",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Management",
        "fill": "#fdfdff",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2917,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3271,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3653,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4007,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4400,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4761,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 5324,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5685,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6067,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 6641.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0002856651468911098, 0.0013439488512924998, 55.87405743082752],
            [-0.0013439488512924998, 0.0002856651468911098, 158.5975498833327]
        ]
    }, {
        "text": "Aquifer Science",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Science",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2786,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 3099,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3274,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3635,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4017,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4330,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 4969.21,
            "height": 1246.21
        },
        "matrix": [
            [0.0011482527719564083, 0.0008652705268495115, 137.99283048621146],
            [-0.0008652705268495115, 0.0011482527719564083, 52.57682882884514]
        ]
    }, {
        "text": "Modeling & Data",
        "url": "http://edwardsaquifer.org/go?tag=Modeling & Data",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 489,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 857,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 1243,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1604,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1777,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 2334,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2727,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2884,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3386,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3543,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 3936,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4290,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4581,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 5162.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0010816451848571036, -0.0011599224515896215, 118.57920525840659],
            [0.0011599224515896215, 0.0010816451848571036, 226.1557898946728]
        ]
    }, {
        "text": "Aquifer Protection",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Protection",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 2788,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3051,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3419,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3710,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4071,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4384,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4675,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4850,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5218,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5866.21,
            "height": 1246.21
        },
        "matrix": [
            [0.00096290407005882, 0.0007256002618532885, 113.3120548707663],
            [-0.0007256002618532885, 0.00096290407005882, 51.39356785462033]
        ]
    }, {
        "text": "Recharge Enhancement",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Enhancement",
        "fill": "#0d13cc",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 3275,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3657,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 4037,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4391,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4773,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 6010,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6371,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6753,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 7287.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0007665985554895217, 0.0005776734462920808, 125.0122612666396],
            [-0.0005776734462920808, 0.0007665985554895217, 83.59523480562359]
        ]
    }, {
        "text": "Water Rights",
        "url": "http://edwardsaquifer.org/go?tag=Water Rights",
        "fill": "#52acfb",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 2454,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2629,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3022,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 3402,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3693,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.78,
            "y": -888.78,
            "width": 4315.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0015805824492303952, 0.0005442381823510354, 138.84785609963407],
            [-0.0005442381823510354, 0.0015805824492303952, 148.56331809389522]
        ]
    }, {
        "text": "Conservation Easements",
        "url": "http://edwardsaquifer.org/go?tag=Conservation Easements",
        "fill": "#356ce7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1089,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1434,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1795,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2058,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 2402,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2756,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3047,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3222,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3590,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3972,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4129,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 4449,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4803,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 5148,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5509,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 6072,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6433,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 6815,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 7106,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -89.78,
            "y": -839.78,
            "width": 7636.56,
            "height": 973.56
        },
        "matrix": [
            [0.000022892270783184412, 0.0013114973148096003, 157.41668926733814],
            [-0.0013114973148096003, 0.000022892270783184412, 122.56166874434105]
        ]
    }, {
        "text": "Critical Period Management",
        "url": "http://edwardsaquifer.org/go?tag=Critical Period Management",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 602,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 777,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1068,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1243,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1556,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1910,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2083,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2240,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 2600,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2961,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3224,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3399,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3767,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 4153,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4310,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4799,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5153,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5535,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5889,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 6282,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 6643,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 7206,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 7567,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 7949,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 8495.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0005559626779762541, 0.00041894792769500184, 119.92952654460942],
            [-0.00041894792769500184, 0.0005559626779762541, 30.291568540736222]
        ]
    }, {
        "text": "Groundwater Conservation Plan",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Conservation Plan",
        "fill": "#2f5ee3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 4479,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4847,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5229,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 5574,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5935,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6198,
            "y": 0,
            "glyph": "0.84"
        }, {
            "x": 6542,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6896,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 7187,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 7362,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 7730,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 8112,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 8269,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 8629,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 8802,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 9156,
            "y": 0,
            "glyph": "0.76"
        }],
        "bbox": {
            "x": -96.42,
            "y": -858.42,
            "width": 9719.84,
            "height": 994.84
        },
        "matrix": [
            [0.00048054707138916596, 0.0003621181919103426, 170.64839806273687],
            [-0.0003621181919103426, 0.00048054707138916596, 122.51352296295202]
        ]
    }, {
        "text": "Artesian Zone",
        "url": "http://edwardsaquifer.org/go?tag=Artesian Zone",
        "fill": "#bcbcf2",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 700,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 991,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1352,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1697,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1872,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2226,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 2608,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2765,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3150,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3518,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3900,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -115.28500000000001,
            "y": -839.285,
            "width": 4470.57,
            "height": 969.57
        },
        "matrix": [
            [0.000031769155926024114, 0.0018200537240435492, 69.367113553383],
            [-0.0018200537240435492, 0.000031769155926024114, 125.99395356092776]
        ]
    }, {
        "text": "Karst",
        "url": "http://edwardsaquifer.org/go?tag=Karst",
        "fill": "#3b79eb",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.42"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 747,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1355,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -75.31500000000001,
            "y": -818.315,
            "width": 1817.63,
            "height": 945.63
        },
        "matrix": [
            [0.00006259301886789396, 0.003585951649295074, 127.92034711763695],
            [-0.003585951649295074, 0.00006259301886789396, 165.99331971668371]
        ]
    }, {
        "text": "Edwards Plateau",
        "url": "http://edwardsaquifer.org/go?tag=Edwards Plateau",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 320,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 706,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1600,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2249,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 2594,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2751,
            "y": 0,
            "glyph": "0.47"
        }, {
            "x": 3111,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3284,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3638,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3929,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4644,
            "y": 0,
            "glyph": "0.83"
        }],
        "bbox": {
            "x": -78.92500000000001,
            "y": -857.925,
            "width": 5188.85,
            "height": 990.85
        },
        "matrix": [
            [0.0012567533533476584, -0.0005077613141587316, 96.0459651301306],
            [0.0005077613141587316, 0.0012567533533476584, 232.11325368654164]
        ]
    }, {
        "text": "Water Wells",
        "url": "http://edwardsaquifer.org/go?tag=Water Wells",
        "fill": "#2343db",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 2736,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3097,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3270,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3443,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -117.92500000000001,
            "y": -857.925,
            "width": 4003.85,
            "height": 990.85
        },
        "matrix": [
            [0.0008005933180860587, 0.001886079662475729, 182.34846556978107],
            [-0.001886079662475729, 0.0008005933180860587, 181.58789623447745]
        ]
    }, {
        "text": "Springflow",
        "url": "http://edwardsaquifer.org/go?tag=Springflow",
        "fill": "#1423d1",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 741,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1004,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1179,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1561,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 2209,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2382,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2750,
            "y": 0,
            "glyph": "0.85"
        }],
        "bbox": {
            "x": -129.44,
            "y": -893.44,
            "width": 3559.88,
            "height": 1244.88
        },
        "matrix": [
            [0.0003776173871690076, 0.0017765501295378947, 170.84277992432212],
            [-0.0017765501295378947, 0.0003776173871690076, 204.52818740693692]
        ]
    }, {
        "text": "Ecosystem",
        "url": "http://edwardsaquifer.org/go?tag=Ecosystem",
        "fill": "#121ecf",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.36"
        }, {
            "x": 320,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 633,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1001,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1346,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 1702,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 2047,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2338,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2699,
            "y": 0,
            "glyph": "0.75"
        }],
        "bbox": {
            "x": -103.345,
            "y": -847.345,
            "width": 3471.69,
            "height": 1187.69
        },
        "matrix": [
            [0.001223604234295323, -0.0013121548943120151, 188.03845928825598],
            [0.0013121548943120151, 0.001223604234295323, 99.83956041611975]
        ]
    }, {
        "text": "Water Resources",
        "url": "http://edwardsaquifer.org/go?tag=Water Resources",
        "fill": "#2f5ee3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 2454,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2815,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3160,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3528,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 3918,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4181,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 4494,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4855,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -112.15,
            "y": -817.15,
            "width": 5404.3,
            "height": 944.3
        },
        "matrix": [
            [0.000025992945757656094, 0.0014891348651265403, 176.23541646133384],
            [-0.0014891348651265403, 0.000025992945757656094, 127.85769162853926]
        ]
    }, {
        "text": "Aquifer Conditions",
        "url": "http://edwardsaquifer.org/go?tag=Aquifer Conditions",
        "fill": "#2a52e0",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 437,
            "y": 0,
            "glyph": "0.79"
        }, {
            "x": 827,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1217,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1392,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1647,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2008,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2271,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2428,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 2767,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3135,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3517,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3903,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4078,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4369,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 4912,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5294,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -149.60500000000002,
            "y": -893.605,
            "width": 5918.21,
            "height": 1246.21
        },
        "matrix": [
            [0.000811592513330285, 0.0006115788254531422, 126.91046042348304],
            [-0.0006115788254531422, 0.000811592513330285, 109.31705081931582]
        ]
    }, {
        "text": "Recharge Zone",
        "url": "http://edwardsaquifer.org/go?tag=Recharge Zone",
        "fill": "#4792f3",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 1047,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 1427,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1781,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2437,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2798,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2955,
            "y": 0,
            "glyph": "0.57"
        }, {
            "x": 3340,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3708,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 4090,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4689.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0008871270315737657, -0.0009513272704767849, 135.20546271865328],
            [0.0009513272704767849, 0.0008871270315737657, 131.36333065388925]
        ]
    }, {
        "text": "Regulated Materials",
        "url": "http://edwardsaquifer.org/go?tag=Regulated Materials",
        "fill": "#468ff2",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1127,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1517,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1690,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2044,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2335,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2696,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3082,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3239,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 3728,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 4082,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 4373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4734,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4997,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5172,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 5526,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5699,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6283.56,
            "height": 1239.56
        },
        "matrix": [
            [0.000022487203742818274, 0.0012882910396091387, 156.85064687845784],
            [-0.0012882910396091387, 0.000022487203742818274, 136.5686656192524]
        ]
    }, {
        "text": "Range Management",
        "url": "http://edwardsaquifer.org/go?tag=Range Management",
        "fill": "#2547dc",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1109,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1502,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1863,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2020,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2863,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3245,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3599,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3992,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 4353,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 4916,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5277,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5659,
            "y": 0,
            "glyph": "0.82"
        }],
        "bbox": {
            "x": -105.005,
            "y": -848.005,
            "width": 6182.01,
            "height": 1193.01
        },
        "matrix": [
            [0.00023666468373751076, 0.0011134197969616883, 98.24338735773527],
            [-0.0011134197969616883, 0.00023666468373751076, 152.31133685604146]
        ]
    }, {
        "text": "Drainage Area",
        "url": "http://edwardsaquifer.org/go?tag=Drainage Area",
        "fill": "#2a52df",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.35"
        }, {
            "x": 393,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 656,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1010,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1185,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1567,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1921,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2314,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2675,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2832,
            "y": 0,
            "glyph": "0.32"
        }, {
            "x": 3269,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3532,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3893,
            "y": 0,
            "glyph": "0.63"
        }],
        "bbox": {
            "x": -107.14000000000001,
            "y": -870.14,
            "width": 4468.28,
            "height": 1218.28
        },
        "matrix": [
            [0.001491150222178943, -0.0006024637964202138, 104.74808904205476],
            [0.0006024637964202138, 0.001491150222178943, 127.7915655321695]
        ]
    }, {
        "text": "Rainfall",
        "url": "http://edwardsaquifer.org/go?tag=Rainfall",
        "fill": "#1d36d7",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.68"
        }, {
            "x": 1539,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1893,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 2066,
            "y": 0,
            "glyph": "0.74"
        }],
        "bbox": {
            "x": -80.58500000000001,
            "y": -862.585,
            "width": 2397.17,
            "height": 996.1700000000001
        },
        "matrix": [
            [0.00004505156080321988, 0.0025810021898223126, 148.9993314664672],
            [-0.0025810021898223126, 0.00004505156080321988, 96.40611936814341]
        ]
    }, {
        "text": "Rain Gauge",
        "url": "http://edwardsaquifer.org/go?tag=Rain Gauge",
        "fill": "#3163e4",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 727,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 902,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1284,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1441,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 1826,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2180,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2570,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }],
        "bbox": {
            "x": -108.14000000000001,
            "y": -870.14,
            "width": 3557.28,
            "height": 1218.28
        },
        "matrix": [
            [0.00003238983727443421, 0.001855612534678892, 127.45489265537215],
            [-0.001855612534678892, 0.00003238983727443421, 178.06255482439497]
        ]
    }, {
        "text": "Remote Meters",
        "url": "http://edwardsaquifer.org/go?tag=Remote Meters",
        "fill": "#3839d8",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 373,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 734,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1665,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1956,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2317,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2474,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 2963,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3324,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3615,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3976,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4239,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -74.15,
            "y": -817.15,
            "width": 4750.3,
            "height": 944.3
        },
        "matrix": [
            [0.0014027844234976578, 0.00048301741250286745, 92.51852301887664],
            [-0.00048301741250286745, 0.0014027844234976578, 78.68606627792609]
        ]
    }, {
        "text": "Legislation & Rules",
        "url": "http://edwardsaquifer.org/go?tag=Legislation & Rules",
        "fill": "#284ede",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.43"
        }, {
            "x": 317,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 678,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 1071,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 1246,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 1591,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1764,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2118,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 2409,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 2584,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 2952,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3334,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3491,
            "y": 0,
            "glyph": "0.7"
        }, {
            "x": 3993,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4150,
            "y": 0,
            "glyph": "0.49"
        }, {
            "x": 4523,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 4913,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 5086,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 5447,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 6031.56,
            "height": 1239.56
        },
        "matrix": [
            [0.000023477206423319707, 0.0013450082551894151, 176.46229396852715],
            [-0.0013450082551894151, 0.000023477206423319707, 180.9201302098249]
        ]
    }, {
        "text": "Groundwater Withdrawals",
        "url": "http://edwardsaquifer.org/go?tag=Groundwater Withdrawals",
        "fill": "#1118cd",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.38"
        }, {
            "x": 385,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 648,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 1016,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 1406,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1788,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 2174,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 2714,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3068,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3359,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 3720,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 3983,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4140,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 4795,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4970,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 5261,
            "y": 0,
            "glyph": "0.70"
        }, {
            "x": 5641,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 6027,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6290,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 6644,
            "y": 0,
            "glyph": "0.85"
        }, {
            "x": 7184,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 7538,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 7711,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -95.92500000000001,
            "y": -857.925,
            "width": 8249.85,
            "height": 990.85
        },
        "matrix": [
            [0.000174039021549099, 0.0008187892210040602, 72.10764326638643],
            [-0.0008187892210040602, 0.000174039021549099, 184.55568093852096]
        ]
    }, {
        "text": "Water Quality Monitors",
        "url": "http://edwardsaquifer.org/go?tag=Water Quality Monitors",
        "fill": "#1525d1",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.54"
        }, {
            "x": 655,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1009,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 1300,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1661,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 1924,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 2081,
            "y": 0,
            "glyph": "0.48"
        }, {
            "x": 2509,
            "y": 0,
            "glyph": "0.83"
        }, {
            "x": 2899,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 3253,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 3426,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3601,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 3892,
            "y": 0,
            "glyph": "0.87"
        }, {
            "x": 4248,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 4405,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 4894,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 5262,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5644,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 5819,
            "y": 0,
            "glyph": "0.82"
        }, {
            "x": 6110,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 6478,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 6741,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -148.12,
            "y": -888.12,
            "width": 7362.24,
            "height": 1234.24
        },
        "matrix": [
            [0.0003710173697389647, 0.0008740621482612457, 178.03876639030102],
            [-0.0008740621482612457, 0.0003710173697389647, 198.22069207480928]
        ]
    }, {
        "text": "Comal Springs",
        "url": "http://edwardsaquifer.org/go?tag=Comal Springs",
        "fill": "#0500c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.34"
        }, {
            "x": 339,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 707,
            "y": 0,
            "glyph": "0.75"
        }, {
            "x": 1270,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 1624,
            "y": 0,
            "glyph": "0.74"
        }, {
            "x": 1797,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1954,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 2312,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 2695,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2958,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3133,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3515,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 3908,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -122.78,
            "y": -888.78,
            "width": 4504.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0018140420838262496, 0.0001906635059603121, 135.14935464900034],
            [-0.0001906635059603121, 0.0018140420838262496, 70.53711324744113]
        ]
    }, {
        "text": "San Marcos Springs",
        "url": "http://edwardsaquifer.org/go?tag=San Marcos Springs",
        "fill": "#141bce",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 358,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 712,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 1094,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1251,
            "y": 0,
            "glyph": "0.44"
        }, {
            "x": 1740,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2094,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2357,
            "y": 0,
            "glyph": "0.65"
        }, {
            "x": 2670,
            "y": 0,
            "glyph": "0.77"
        }, {
            "x": 3038,
            "y": 0,
            "glyph": "0.81"
        }, {
            "x": 3383,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 3540,
            "y": 0,
            "glyph": "0.50"
        }, {
            "x": 3898,
            "y": 0,
            "glyph": "0.78"
        }, {
            "x": 4281,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 4544,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 4719,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 5101,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 5494,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -126.14000000000001,
            "y": -870.14,
            "width": 6091.28,
            "height": 1218.28
        },
        "matrix": [
            [0.000020198846628052965, 0.0011571911483067578, 80.3556747716944],
            [-0.0011571911483067578, 0.000020198846628052965, 120.20468119392616]
        ]
    }, {
        "text": "Index readings",
        "url": "http://edwardsaquifer.org/go?tag=Index readings",
        "fill": "#0501c6",
        "glyphs": [{
            "x": 0,
            "y": 0,
            "glyph": "0.40"
        }, {
            "x": 168,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 550,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 936,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 1297,
            "y": 0,
            "glyph": "0.86"
        }, {
            "x": 1707,
            "y": 0,
            "glyph": "0.3"
        }, {
            "x": 1864,
            "y": 0,
            "glyph": "0.80"
        }, {
            "x": 2127,
            "y": 0,
            "glyph": "0.67"
        }, {
            "x": 2488,
            "y": 0,
            "glyph": "0.63"
        }, {
            "x": 2842,
            "y": 0,
            "glyph": "0.66"
        }, {
            "x": 3228,
            "y": 0,
            "glyph": "0.71"
        }, {
            "x": 3403,
            "y": 0,
            "glyph": "0.76"
        }, {
            "x": 3785,
            "y": 0,
            "glyph": "0.69"
        }, {
            "x": 4178,
            "y": 0,
            "glyph": "0.81"
        }],
        "bbox": {
            "x": -110.78,
            "y": -888.78,
            "width": 4762.56,
            "height": 1239.56
        },
        "matrix": [
            [0.0010218232115083209, 0.0007699990195211393, 92.72034639815917],
            [-0.0007699990195211393, 0.0010218232115083209, 200.28270381260586]
        ]
    }],
    "meta": "Tagul Generator Version 1.56; Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:33.0) Gecko/20100101 Firefox/33.0"
});
