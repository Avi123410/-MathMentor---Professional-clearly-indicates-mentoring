from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(_name_)
CORS(app)  # Enable CORS for frontend requests

# Set your OpenAI API key here
openai.api_key = "sk-proj-4MI7idAZRYXxHzn5leY530yQlty7mgVX9nRNr2_GMzS2T6-dURrTn6FICBp7Su-1Md.................."
@app.route('/')
def home():
    return "Math Chatbot Tutor backend is running!"


@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful math tutor chatbot. Explain math problems step-by-step in simple language suitable for middle school students."},
                {"role": "user", "content": user_message},
            ],
            max_tokens=150,
            temperature=0.5,
        )
        answer = response.choices[0].message['content'].strip()
        return jsonify({'answer': answer})
    
    except Exception as e:
        print("Error:", e)  # This prints error in your console for debugging
        return jsonify({'answer': "Sorry, I couldn't process your question. Please try again."}), 500
if _name_ == '_main_':
    app.run(debug=True, port=5001)
