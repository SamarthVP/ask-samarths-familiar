from fastapi import APIRouter
from qa_sys import agent
from openai import error
from pydantic import BaseModel
from fastapi.routing import APIRoute
from typing import Callable
from fastapi import APIRouter, Request, Response
class LoggingRoute(APIRoute):
    def get_route_handler(self) -> Callable:
        original_route_handler = super().get_route_handler()

        async def custom_route_handler(request: Request) -> Response:
            response: Response = await original_route_handler(request)
            print(f"Responded to {await request.body()} with {response.body}")
            return response

        return custom_route_handler

router = APIRouter(prefix="/api/qa", route_class=LoggingRoute)

class QARequest(BaseModel):
    query: str

@router.post("/")
async def answer(request: QARequest):
    try:
        response = agent["agent"].run(agent["prompt"].format(query=request.query))

    except (error.RateLimitError, error.Timeout) as e:
        # Ratelimit and invalid openai request langchain nondeterministic bug response
        return {"response": "Sorry, I'm feeling a little overloaded, could you ask again in a few minutes?"}
    except (error.InvalidRequestError) as e:
        # Honestly this is so nondeterministic that correct behaviour might be to just retry...
        return {"response": "Sorry, I was distracted by a squirrel, could you be more specific or repeat the question?"}

    return {"response": response}

