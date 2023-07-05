from fastapi import APIRouter
from qa_sys import agent
from openai import error

router = APIRouter(prefix="/qa")

@router.post("/")
async def answer(query: str):
    try:
        response = agent["agent"].run(agent["prompt"].format(query=query))

    except (error.RateLimitError, error.Timeout) as e:
        # Ratelimit and invalid openai request langchain nondeterministic bug response
        return {"response": "Sorry, I'm feeling a little overloaded, could you ask again in a few minutes?"}
    except (error.InvalidRequestError) as e:
        return {"response": "Sorry, could you be more specific?"}

    return {"response": response}

