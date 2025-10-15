# Running Mr. Tow in Docker

This project is a Vite + React static site. The Dockerfile uses a multi-stage build:
- Build the production assets with Node
- Serve the compiled `dist/` with nginx

Build the image (run in project root):

```powershell
docker build -t mr-tow-app:latest .
```

Run the container (map port 80 to your host port):

```powershell
docker run -it --rm -p 5173:80 --name mr-tow mr-tow-app:latest
```

Now open http://localhost:5173 in your browser.

Notes
- If you want to change Nginx configuration, add a `nginx.conf` in the project root before building. The Dockerfile will copy it if present.
- This image serves static files. If you'd like server-side APIs, run them in a separate container and connect via network or a proxy.
