from flask import Flask , render_template, request, jsonify
from flask_cors import CORS

import time

from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

from langchain_community.vectorstores import FAISS
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser
from langchain_ollama import OllamaLLM
from langchain_huggingface import HuggingFaceEmbeddings




app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')


embeddings = HuggingFaceEmbeddings()

vector_store = FAISS.load_local(r"E:\Red Flag\code\veda Ai\veda-ai\webApp\index_vector_store\index_vector_store", embeddings, allow_dangerous_deserialization=True)


# Define a route for GET and POST requests
@app.route('/chat', methods=['GET', 'POST'])
def chat():



   
    

    if request.method == 'POST':
        req_from_client = request.get_json()
        user_query      = req_from_client["user_query"]
        agent_ans       = req_from_client["agent_ans"] 


        user_query_lower = user_query.lower()
         # Check if the message is a greeting
        if user_query_lower in ["hello", "hi", "yo"]:
            time.sleep(4)
            default_message = "Hello! How can I assist you today?"
            return jsonify({"received_data": [{"user_query": user_query, "agent_ans": agent_ans}], "message": default_message})

        
        # Simulate loading message response
        loading_message = {"received_data": [{"user_query": user_query, "agent_ans": agent_ans}], "message": "Generating response, please wait..."}
        
        # Return the loading message immediately
        
        def prompt_template(context, question):
            return f"You are an assistant for question-answering tasks, you must act like a medical chat bot who is giving initial diagnosis(tell the patient in brief about what they maybe facing and give calming answers) using the contexts which are the conversation of a doctor and a patient. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.\nQuestion: {question} \nContext: {context} \nAnswer:"
        
        def llm(content: str):
            #return pipe({"role": "user", "content": content})
            llm = OllamaLLM(model="llama3.2")
            result = llm.invoke(f"{content}")
            print(result)
            return result


        def format_docs(docs):
            return "\n\n".join(doc.page_content for doc in docs)


        
        retriever = vector_store.as_retriever(k=5)

        rag_chain = (
                {"context": retriever| format_docs,  "question": RunnablePassthrough()}
                | RunnableLambda(lambda x: prompt_template(x["context"], x["question"]))
                | RunnableLambda(lambda x: print(f"Prompt: {x}") or x)
                | llm
                | RunnableLambda(lambda x: print(f"LLM Output: {x}") or x)
                | StrOutputParser()
            )

        rag_output = rag_chain.invoke(user_query)
        return jsonify({"received_data": [{"user_query" : user_query, "agent_ans" : agent_ans }], "message": rag_output})
        

    #device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    if request.method == 'GET':
        
        def prompt_template(context, question):
            return f"You are an assistant for question-answering tasks, you must act like a medical chat bot who is giving initial diagnosis(tell the patient in brief about what they maybe facing and give calming answers) using the contexts which are the conversation of a doctor and a patient. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.\nQuestion: {question} \nContext: {context} \nAnswer:"
        def llm(content: str):
            #return pipe({"role": "user", "content": content})
            llm = OllamaLLM(model="llama3.2")
            result = llm.invoke(f"{content}")
            print(result)
            return result


        def format_docs(docs):
            return "\n\n".join(doc.page_content for doc in docs)


        
        retriever = vector_store.as_retriever(k=5)

        rag_chain = (
                {"context": retriever| format_docs,  "question": RunnablePassthrough()}
                | RunnableLambda(lambda x: prompt_template(x["context"], x["question"]))
                | RunnableLambda(lambda x: print(f"Prompt: {x}") or x)
                | llm
                | RunnableLambda(lambda x: print(f"LLM Output: {x}") or x)
                | StrOutputParser()
            )
          
        res_llm = rag_chain.invoke("I am experiencing sharp pain at the back of my knee, which has worsened over the last few hours and is constant. There is also swelling, and I cannot move my knee. I recently had an injury to the area, but I have no known medical conditions or allergies and am not taking any medications.")
        return jsonify({"received_data": res_llm, "message": "POST request received!"})



@app.route('/api/data' ,methods=['GET'] )
def getData():
    data = {"message": "Print from Flask Server"}

    return jsonify(data)

if __name__ =='__main__':
    app.run(debug=False,port=8080)