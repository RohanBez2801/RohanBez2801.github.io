import threading
import time
import http.server
import socketserver
import sys
from playwright.sync_api import sync_playwright

PORT = 8001

def start_server():
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        try:
            page.goto(f"http://localhost:{PORT}")
            page.wait_for_load_state("networkidle")

            # Check for title
            title = page.title()
            print(f"Page title: {title}")

            # Check for duplicates or errors
            if console_errors:
                print("Console errors found:")
                for err in console_errors:
                    print(f"- {err}")
            else:
                print("No console errors found.")

            # Check if main sections exist
            assert page.locator("#about").count() == 1
            assert page.locator("#projects").count() == 1

            # Take screenshot
            page.screenshot(path="tests/screenshot_after.png")
            print("Screenshot saved to tests/screenshot_after.png")

        except Exception as e:
            print(f"Test failed: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    time.sleep(2) # Give server time to start

    run_test()
    sys.exit(0)
