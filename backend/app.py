from fastapi import FastAPI
from bot_endpoints import router
from qa_sys import lifespan
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(lifespan=lifespan)

app.include_router(router)

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)