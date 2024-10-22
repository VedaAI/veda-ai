from flask import Flask , render_template,jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route('/api/data' ,methods=['GET'] )
def getData():
    data = {"message": "Print from Flask Server"}

    return jsonify(data)

if __name__ =='__main__':
    app.run(debug=True)