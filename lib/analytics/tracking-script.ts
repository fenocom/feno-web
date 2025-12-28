export function generateTrackingScript(
    subdomain: string,
    apiBaseUrl: string,
): string {
    return `
<script>
(function() {
    var subdomain = "${subdomain}";
    var apiUrl = "${apiBaseUrl}/api/analytics/track";
    var clickBuffer = [];
    var flushInterval = 5000;
    var sent = false;

    function sendPageView() {
        if (sent) return;
        sent = true;
        var data = {
            type: "pageview",
            subdomain: subdomain,
            referrer: document.referrer || ""
        };
        navigator.sendBeacon ? navigator.sendBeacon(apiUrl, JSON.stringify(data)) :
            fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                keepalive: true
            }).catch(function() {});
    }

    function trackClick(e) {
        var target = e.target;
        var rect = document.documentElement.getBoundingClientRect();
        var x = Math.round((e.clientX / window.innerWidth) * 100);
        var y = Math.round(((e.clientY + window.scrollY) / document.documentElement.scrollHeight) * 100);

        var click = {
            x: Math.min(100, Math.max(0, x)),
            y: Math.min(100, Math.max(0, y)),
            tag: target.tagName.toLowerCase()
        };

        var text = (target.textContent || "").trim().slice(0, 100);
        if (text) click.text = text;

        if (target.href) click.href = target.href;
        else if (target.closest("a")) click.href = target.closest("a").href;

        clickBuffer.push(click);
    }

    function flushClicks() {
        if (clickBuffer.length === 0) return;
        var clicks = clickBuffer.splice(0, clickBuffer.length);
        var data = {
            type: "clicks",
            subdomain: subdomain,
            clicks: clicks
        };
        navigator.sendBeacon ? navigator.sendBeacon(apiUrl, JSON.stringify(data)) :
            fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                keepalive: true
            }).catch(function() {});
    }

    if (document.readyState === "complete") {
        sendPageView();
    } else {
        window.addEventListener("load", sendPageView);
    }

    document.addEventListener("click", trackClick, true);
    setInterval(flushClicks, flushInterval);
    window.addEventListener("beforeunload", flushClicks);
    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === "hidden") flushClicks();
    });
})();
</script>`.trim();
}

export function injectTrackingScript(
    html: string,
    subdomain: string,
    apiBaseUrl: string,
): string {
    const script = generateTrackingScript(subdomain, apiBaseUrl);

    if (html.includes("</body>")) {
        return html.replace("</body>", `${script}\n</body>`);
    }
    if (html.includes("</html>")) {
        return html.replace("</html>", `${script}\n</html>`);
    }
    return html + script;
}
