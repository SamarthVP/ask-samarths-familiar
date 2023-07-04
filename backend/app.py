from fastapi import FastAPI
from bot_endpoints import router
from qa_sys import lifespan

app = FastAPI(lifespan=lifespan)

app.include_router(router)