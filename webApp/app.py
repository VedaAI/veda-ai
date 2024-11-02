from flask import Flask , render_template, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch



app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')


model_name = "tejas1206/llama-3.2-3b-Medical-ChatBot"  # Replace with the exact model name/path
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name,torch_dtype='auto')
# model = AutoModelForCausalLM.from_pretrained(model_name,low_cpu_mem_usage=True,return_dict=True,torch_dtype=torch.float16,device_map="auto")
# model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float32)



# Instruction for the system
instruction = """You are a helpful and knowledgeable doctor. 
Answer medical queries with clear, concise, and relevant information."""


# @app.route('/')
# def home():
#     return "Hugging Face Doctor API"





@app.route('/medical-query', methods=['POST'])
def medical_query():
    print("entering into medical_query function")
    try:
        # Parse the incoming request data
        data = request.json
        user_query = data.get("query", "")
        
        # Construct the messages for the chat
        messages = [{"role": "system", "content": instruction},
                    {"role": "user", "content": user_query}]
        
        # Prepare the input for the model
        prompt = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
        inputs = tokenizer(prompt, return_tensors='pt', padding=True, truncation=True)  # Running on CPU
        
        # Generate the output from the model
        outputs = model.generate(**inputs, max_new_tokens=200, num_return_sequences=1, no_repeat_ngram_size=3)
        text = tokenizer.decode(outputs[0], skip_special_tokens=True)

        # Extract the assistant's response
        response = text.split("assistant")[1].strip()

        data = {
            "status":200,
            "message": "This is a GET request response",
            "status": "success",
            "data": {
                "query": "I have a mild fever",
                "response": "You should consider visiting a doctor if your symptoms persist."
            }
        }
        return data
    
    except Exception as e:
        print(f"Error: {e}")  # Logs the error
        return jsonify({"error": str(e)}), 500


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