from flask import Flask , render_template, request, jsonify
from flask_cors import CORS
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


# model_name = "tejas1206/llama-3.2-3b-Medical-ChatBot"  # Replace with the exact model name/path
# tokenizer = AutoTokenizer.from_pretrained(model_name)
# model = AutoModelForCausalLM.from_pretrained(model_name,torch_dtype='auto')
# model = AutoModelForCausalLM.from_pretrained(model_name,low_cpu_mem_usage=True,return_dict=True,torch_dtype=torch.float16,device_map="auto")
# model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float32)



# Instruction for the system
# instruction = """You are a helpful and knowledgeable doctor. 
# Answer medical queries with clear, concise, and relevant information."""


# @app.route('/')
# def home():
#     return "Hugging Face Doctor API"







embeddings = HuggingFaceEmbeddings()

vector_store = FAISS.load_local(r"E:\Red Flag\code\veda Ai\veda-ai\webApp\index_vector_store\index_vector_store", embeddings, allow_dangerous_deserialization=True)


# Define a route for GET and POST requests
@app.route('/chat', methods=['GET', 'POST'])
def chat():



    # data = { "model":"llama3.2", "prompt":f"hello", "stream":"false"}
    # response = requests.post("http://localhost:11434/api/generate", data=data)
    # print(response.json)

    

    if request.method == 'POST':
        req_from_client = request.get_json()
        user_query      = req_from_client["user_query"]
        agent_ans       = req_from_client["agent_ans"] 
        
        
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
            # complex_query = {
            #     "role": "system",
            #     "content": "I am experiencing sharp pain at the back of my knee, which has worsened over the last few hours and is constant. There is also swelling, and I cannot move my knee",
            #     "symptoms": ["sharp pain", "swelling", "limited movement"]
            # }
        res_llm = rag_chain.invoke("I am experiencing sharp pain at the back of my knee, which has worsened over the last few hours and is constant. There is also swelling, and I cannot move my knee. I recently had an injury to the area, but I have no known medical conditions or allergies and am not taking any medications.")
        return jsonify({"received_data": res_llm, "message": "POST request received!"})







# @app.route('/medical-query', methods=['POST'])
# def medical_query():
#     print("entering into medical_query function")
#     try:
#         # Parse the incoming request data
#         data = request.json
#         user_query = data.get("query", "")
        
#         # Construct the messages for the chat
#         messages = [{"role": "system", "content": instruction},
#                     {"role": "user", "content": user_query}]
        
#         # Prepare the input for the model
#         prompt = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
#         inputs = tokenizer(prompt, return_tensors='pt', padding=True, truncation=True)  # Running on CPU
        
#         # Generate the output from the model
#         outputs = model.generate(**inputs, max_new_tokens=200, num_return_sequences=1, no_repeat_ngram_size=3)
#         text = tokenizer.decode(outputs[0], skip_special_tokens=True)

#         # Extract the assistant's response
#         response = text.split("assistant")[1].strip()

#         data = {
#             "status":200,
#             "message": "This is a GET request response",
#             "status": "success",
#             "data": {
#                 "query": "I have a mild fever",
#                 "response": "You should consider visiting a doctor if your symptoms persist."
#             }
#         }
#         return data
    
#     except Exception as e:
#         print(f"Error: {e}")  # Logs the error
#         return jsonify({"error": str(e)}), 500


# @app.route('/api/chat', methods=['POST'])
# def chat():
#     try:
#         # Get user input from the request body
#         user_input = request.json.get("query")

#         # Create the chat messages
#         messages = [
#             {"role": "system", "content": instruction},
#             {"role": "user", "content": user_input}
#         ]

#         # Generate the prompt using the template
#         prompt = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
#         inputs = tokenizer(prompt, return_tensors='pt', padding=True, truncation=True).to("cuda")

#         # Generate the response from the model
#         outputs = model.generate(**inputs, max_new_tokens=200, num_return_sequences=1, no_repeat_ngram_size=3)

#         # Decode the response and format it properly
#         text = tokenizer.decode(outputs[0], skip_special_tokens=True)
#         response = text.split("assistant")[1].strip()

#         # Return the response as JSON
#         return jsonify({"response": response})
    
#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({"error": "An error occurred"}), 500






@app.route('/api/data' ,methods=['GET'] )
def getData():
    data = {"message": "Print from Flask Server"}

    return jsonify(data)




# Define a route for generating responses
# @app.route('/generate', methods=['POST'])
# def generate_response():
#     data = request.json
#     prompt = data.get('prompt', '')

#     if not prompt:
#         return jsonify({"error": "Prompt is required"}), 400

#     # Encode the prompt
#     inputs = tokenizer.encode(prompt, return_tensors="pt")

#     # Generate the model's response
#     outputs = model.generate(inputs, max_length=200, num_return_sequences=1)

#     # Decode the generated text
#     response = tokenizer.decode(outputs[0], skip_special_tokens=True)

#     return jsonify({"response": response})



if __name__ =='__main__':
    app.run(debug=False,port=8080)