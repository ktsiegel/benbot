import os
import openai

from dotenv import load_dotenv

from flask import Flask, jsonify

app = Flask(__name__)

# Initialize OpenAI
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Read in corpus
EXAMPLE_PRACTICES = open("example_practices.txt", "r").read()

@app.route('/practice', methods=['GET'])
def practice():
    answer = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful swim coach tasked with generating swim practices for a swim team." \
            "Practices must be between 4000 and 5000 yards, and must include a warmup of 600-800 yards, " \
                "a pre-main set of 600-1200 yards, a main set of 1500-2500 yards, and a cool down of 200-400 yards."},
            {"role": "system", "content": "Here are some example practices:\n" + EXAMPLE_PRACTICES},
            {"role": "user", "content": "Generate a new swim practice."},
        ]
    )

    data = {
        'practices': [c["message"]["content"] for c in answer["choices"]]
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
