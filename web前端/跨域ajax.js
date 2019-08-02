var common = {
    curl: function(b, c) {
        var e = "jsonp",
        g = {},
        f = "jQuery" + (new Date).getTime();
        "object" == typeof b ? (url = b.url, g = b.data || g, e = b.datatype || e, f = b.callback || f, g = b.context || g) : url = b;
        $.ajax({
            url: url,
            type: "GET",
            dataType: e,
            data: g,
            jsonpCallback: f,
            context: g,
            cache: !0,
            error: function(e) {
                c(e)
            },
            success: function(b) {
                c(b)
            }
        })
    },
    useragent: function() {
        var b = navigator.userAgent;
        return /ipad/i.test(b) ? "ipad": /IEMobile/i.test(b) || /NOKIA/i.test(b) ? "winphone": /iphone/i.test(b) ? "iphone": /android/i.test(b) ? "android": /Mobile/i.test(b) ? "phone": !/Chrome/i.test(b) && /Safari/i.test(b) ? "safari": /edge/i.test(b) ? "edge": /chrome/i.test(b) ? "chrome": /firefox/i.test(b) ? "firefox": "pc"
    },
    ua: function() {
        switch (this.useragent()) {
        case "ipad":
        case "iphone":
        case "winphone":
        case "phone":
        case "safari":
        case "android":
            var b = "1";
            break;
        default:
            b = ""
        }
        return b
    },
    data: function(b, c, e) {
        switch (String(c)) {
        case "1":
            c = b.length;
            b = 3 < c ? b[c - 3] : b[0];
            break;
        case "3":
            b = b[b.length - 1];
            break;
        default:
            c = b.length,
            b = 2 < c ? b[c - 2] : b[0]
        }
        return d = e ? b[e] : b
    },
    format: function(b) {
        function c(b) {
            return 10 > b ? "0" + b: b
        }
        var e = new Date(b);
        b = e.getFullYear();
        var g = e.getMonth() + 1,
        f = e.getDate(),
        h = e.getHours(),
        r = e.getMinutes();
        e = e.getSeconds();
        return b + "-" + c(g) + "-" + c(f) + " " + c(h) + ":" + c(r) + ":" + c(e)
    },
    createuuid: function(b, c) {
        switch (c) {
        case "h":
            c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            break;
        case "s":
            c = "0123456789";
            break;
        case "d":
            c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case "x":
            c = "abcdefghijklmnopqrstuvwxyz";
            break;
        default:
            c = "0123456789abcdef"
        }
        for (var e = "",
        g = 0; g < b; g++) e += c[Math.ceil(1E8 * Math.random()) % c.length];
        return e
    },
    cookie: {
        get: function(b) {
            var c;
            return (c = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"))) ? unescape(c[2]) : null
        },
        set: function(b, c, e) {
            e = e || 864E6;
            var g = new Date;
            g.setTime(g.getTime() + e);
            document.cookie = b + "=" + escape(c) + ";expires=" + g.toGMTString()
        }
    },
    md5: function(b) {
        return function(b) {
            function c(b, c) {
                return ((b >> 1) + (c >> 1) << 1) + (b & 1) + (c & 1)
            }
            for (var g = [], f = 0; 64 > f;) g[f] = 0 | 4294967296 * Math.abs(Math.sin(++f));
            return function(e) {
                var f, h, n, k, p = [];
                e = decodeURIComponent(encodeURI(e));
                for (var l = e.length,
                q = [f = 1732584193, h = -271733879, ~f, ~h], m = 0; m <= l;) p[m >> 2] |= (e.charCodeAt(m) || 128) << 8 * (m++%4);
                p[e = (l + 8 >> 6) * b + 14] = 8 * l;
                for (m = 0; m < e; m += b) {
                    l = q;
                    for (k = 0; 64 > k;) l = [n = l[3], c(f = l[1], (n = c(c(l[0], [f & (h = l[2]) | ~f & n, n & f | ~n & h, f ^ h ^ n, h ^ (f | ~n)][l = k >> 4]), c(g[k], p[[k, 5 * k + 1, 3 * k + 5, 7 * k][l] % b + m]))) << (l = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, b, 23, 6, 10, 15, 21][4 * l + k++%4]) | n >>> 32 - l), f, h];
                    for (k = 4; k;) q[--k] = c(q[k], l[k])
                }
                for (e = ""; 32 > k;) e += (q[k >> 3] >> 4 * (1 ^ k++&7) & 15).toString(b);
                return e
            }
        } (16)(b)
    },
    sum: function(b) {
        for (var c = 0,
        e = 0; e < b.length; e++) c += parseFloat(b[e]);
        return c
    },
    replace: function(b, c, e) {
        var g = b;
        if ("string" == typeof c) g = b.replace(eval("/" + c + "/g"), e);
        else if ("object" == typeof c && "object" == typeof e) for (var f in c) g = g.replace(eval("/" + c[f] + "/g"), e[f]);
        else if ("object" == typeof c && "string" == typeof e) for (f in c) g = g.replace(eval("/" + c[f] + "/g"), e);
        return g
    },
    arrayrand: function(b) {
        return Math.floor(Math.random() * b.length)
    },
    matchall: function(b, c) {
        c = eval(c);
        var e = eval(c + "g");
        e = b.match(e);
        b = {};
        for (var g = (c + "g").match(/\(/g).length, f = 1; f <= g; f++) b[f] = [];
        for (var h in e) for (e[h].match(c), g = e[h].match(c), f = 1; f < g.length; f++) b[f].push(g[f]);
        b[0] = e;
        c = [];
        for (var r in b) c.push(b[r]);
        return c
    },
    unpacking: function(b) {
        var c, e = "",
        g;
        for (g in b.split(""))(c = b.charCodeAt(g)) && (e += String.fromCharCode(c));
        return e
    },
    stristr: function(b, c) {
        return 0 <= b.indexOf(c) ? 1 : 0
    },
    rand: function(b, c) {
        return Math.floor(Math.random() * (c - b + 1) + b)
    },
    match: function(b, c) {
        c = c.replace(/\//g, "\\/").replace(/"/g, '\\"').replace(/'/g, "\\'").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace("$1", "(.*?)");
        eval("var a=b.match(/" + c + "/)");
        if (a) return a[1]
    },
    sort: function(b, c, e) {
        var g = [],
        f;
        for (f in b) for (var h in c) if (h == b[f]) {
            e ? g[h] = c[h] : g.push(c[h]);
            break
        }
        return g
    },
    local: function(b, c) {
        ipc.data.h5player = b.h5player;
        ipc.data.player = b.player;
        ipc.data.image = b.image;
        ipc.data.title = b.title;
        ipc.data.duration = b.duration;
        if (b.ua) {
            ipc.data.playtype = b.playtype;
            var e = String(b.display);
            if (1 < e && "dxplayer" == b.h5player) {
                for (e = 1; e <= String(b.display); e++) ipc.data.video.push({
                    url: b.parseurl.replace(/&hd=\d/, "&hd=" + e) + "&ctype=phone"
                });
                c(ipc.data)
            } else $.ajax({
                url: b.parseurl + "&ctype=html5",
                type: "GET",
                dataType: "jsonp",
                cache: !0,
                success: function(b) {
                    b.m3u8 = b.m3u8 || [];
                    b.mp4 = b.mp4 || [];
                    0 < b.m3u8.length && (ipc.data.m3u8 = b.m3u8);
                    0 < b.mp4.length && (ipc.data.mp4 = b.mp4);
                    ipc.data.platform = b.platform;
                    c(ipc.data)
                }
            })
        } else if ("m3u8" == b.playtype) $.ajax({
            url: b.parseurl + "&ctype=m3u8",
            type: "GET",
            dataType: "jsonp",
            cache: !0,
            success: function(e) {
                ipc.data.segs = e.m3u8;
                ipc.data.playtype = e.playtype || b.playtype;
                c(ipc.data)
            }
        });
        else if ("dplayer" == b.player) {
            ipc.data.playtype = b.playtype;
            e = String(b.display);
            for (e = 1; e <= String(b.display); e++) ipc.data.segs.push({
                url: b.parseurl.replace(/&hd=\d/, "&hd=" + e) + "&ctype=phone"
            });
            c(ipc.data)
        } else $.ajax({
            url: b.parseurl + "&ctype=segs",
            type: "GET",
            dataType: "jsonp",
            cache: !0,
            success: function(e) {
                ipc.data.segs = e.segs;
                ipc.data.playtype = e.playtype || b.playtype;
                c(ipc.data)
            }
        })
    },
    report: function(a) {
        if (typeof a == 'object') {
            for (var b of a) {
                document.createElement("img").src = b
            }
        } else {
            document.createElement("img").src = a
        }
    }
};