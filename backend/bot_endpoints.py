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
        # Honestly this is so nondeterministic that correct behaviour might be to just retry...
        return {"response": "Sorry, I was distracted by a squirrel, could you be more specific or repeat the question?"}

    return {"response": response}

