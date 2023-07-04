from fastapi import APIRouter
from qa_sys import agent

router = APIRouter(prefix="/qa")

@router.post("/")
async def answer(query: str):
    # Need to catch and handle an OpenAI timeout due to networking issues or ratelimit
    # As well as catching langchain.schema.output_parser.Output ParserException for LLM string output that is not a json
    response = agent["agent"].run(agent["prompt"].format(query=query))
    return {"response": response}

