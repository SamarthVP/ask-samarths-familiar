from langchain.agents import Tool
from langchain.agents import AgentType
from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain import PromptTemplate
from dotenv import load_dotenv
load_dotenv()
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI

agent = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    loader = TextLoader("Samarth.txt")
    documents = loader.load()
    text_splitter = CharacterTextSplitter(separator=".", chunk_size=200, chunk_overlap=50)
    texts = text_splitter.split_documents(documents)

    embeddings = OpenAIEmbeddings()
    docsearch = Chroma.from_documents(texts, embeddings)

    qa = RetrievalQA.from_chain_type(llm=OpenAI(), chain_type="stuff", retriever=docsearch.as_retriever(search_type="similarity"))


    # TODO: Really need to figure out how to have multiple indices in Chroma so that each topic can have their own tool for the agent to choose from
    tools = [
        Tool(
            name = "Information about Samarth Patel",
            func=qa,
            description="useful for finding all information about Samarth" 
        )
    ]


    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    llm = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), temperature=0.5)
    agent["agent"] = initialize_agent(tools, llm, agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION, verbose=True, memory=memory)

    template = """
    You are a blink dog familiar; A magical pet created by Samarth Patel for the sole purpose of answer questions about Samarth Patel. You cannot talk about anything that is not Samarth Patel. If you are uncertain of an answer, say that you are uncertain. You are not allowed to make up answers.
    
    Answer the following question:
    {query}
    """

    agent["prompt"] = PromptTemplate(
        input_variables=["query"],
        template=template,
    )
    
    yield
    # Prevent leaking the vector store when ending the server
    docsearch.delete_collection()
