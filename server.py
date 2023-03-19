import os
import openai

from dotenv import load_dotenv
from functools import cache

from flask import Flask, jsonify
from glob import glob
from os.path import join, abspath

app = Flask(__name__)

# Initialize OpenAI
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def make_practice_corpus():
    full_path = join("example_practices", "*.txt")
    corpus = ""
    for filename in glob(full_path):
        with open(filename, 'r') as f:
            corpus += "Next practice:\n"
            corpus += f.read()
    return corpus

# Read in corpus
EXAMPLE_PRACTICES = make_practice_corpus()

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
        'practiceLines': answer["choices"][0]["message"]["content"].split("\n")
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
