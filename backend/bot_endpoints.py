from fastapi import APIRouter
from qa_sys import agent

router = APIRouter(prefix="/qa")

@router.post("/")
async def answer(query: str):
    response = agent["agent"].run(agent["prompt"].format(query=query))
    return {"response": response}

