import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/test/{message}")
def echo_message(message: str):
    return {"message": f"You sent: {message}"}

if os.path.isdir("frontend/build"):
    app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static")

    @app.get("{path:path}")
    def serve_frontend(path: str = ""):
        # This route should catch any path that is not an API route
        # and serve the index.html file.
        # We assume that the frontend router will handle the path.
        return FileResponse("frontend/build/index.html")
else:
    # If frontend/build does not exist, we still need to be able to import main.py
    # and expose the API routes. The StaticFiles mount and the catch-all route
    # will not be created.
    pass

# This import is needed for the FileResponse in the catch-all route
from fastapi.responses import FileResponse
