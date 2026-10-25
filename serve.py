"""Static-only SPA preview server. It exposes files and falls back to index.html for client routes."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit


class StaticSpaHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = urlsplit(self.path).path
        if path in ("/demo", "/login") or path.startswith("/app/"):
            self.path = "/index.html"
        super().do_GET()


if __name__ == "__main__":
    print("Praman frontend preview: http://localhost:4173")
    ThreadingHTTPServer(("127.0.0.1", 4173), StaticSpaHandler).serve_forever()
