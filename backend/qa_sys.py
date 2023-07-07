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

def docstore_from_doc(path):
    loader = TextLoader(path)
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=200, chunk_overlap=50)
    texts = text_splitter.split_documents(documents)

    embeddings = OpenAIEmbeddings()
    docsearch = Chroma.from_documents(texts, embeddings)
    return docsearch

@asynccontextmanager
async def lifespan(app: FastAPI):
    doc1 = docstore_from_doc("Samarth.txt")
    retriever1 = RetrievalQA.from_chain_type(llm=OpenAI(), chain_type="stuff", retriever=doc1.as_retriever(search_type="similarity"))

    tools = [
        Tool(
            name = "Information about Samarth Patel",
            func=retriever1,
            description="useful for answering all questions" 
        )
    ]

    # Memory buffer seems to crash when relied on
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    llm = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), max_retries=4, request_timeout=15, temperature=0.5)
    agent["agent"] = initialize_agent(
        tools, 
        llm, 
        agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION, 
        verbose=True, 
        memory=memory,
        handle_parsing_errors=lambda x: str(x)[28:],
        )

    with open('Familiar.txt', 'r') as file:
        template = file.read()

    agent["prompt"] = PromptTemplate(
        input_variables=["query"],
        template=template,
    )
    
    yield
    # Prevent leaking the vector store when ending the server
    doc1.delete_collection()
