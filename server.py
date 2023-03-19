import os
import openai

from dotenv import load_dotenv
from enum import Enum

from flask import Flask, jsonify, request
from glob import glob
from os.path import join

app = Flask(__name__)

# Initialize OpenAI
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

class Stroke(Enum):
    BACKSTROKE = 1
    BREASTSTROKE = 2
    BUTTERFLY = 3
    FREESTYLE = 4
    IM = 5
    KICKING = 6
    PULLING = 7

SUPPORTED_STROKES = {s.name for s in Stroke}


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
    stroke_arg = request.args.get('stroke', default = None)

    answer = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful swim coach tasked with generating swim practices for a swim team." \
            "Practices must be between 4000 and 5000 yards, and must include a warmup of 600-800 yards, " \
                "a pre-main set of 600-1200 yards, a main set of 1500-2500 yards, and a cool down of 200-400 yards."},
            {"role": "system", "content": "Here are some example practices:\n" + EXAMPLE_PRACTICES},
            {"role": "user", "content": generate_prompt(stroke_arg)},
        ]
    )

    data = {
        'practiceLines': answer["choices"][0]["message"]["content"].split("\n")
    }
    return jsonify(data)


def generate_prompt(stroke_arg):
    prompt = "Generate a new swim practice"
    if stroke_arg is not None:
        if stroke_arg.upper() not in SUPPORTED_STROKES:
            raise f"Unsupported stroke passed in: {stroke_arg}"
        prompt += f" with a focus on {stroke_arg}"
    prompt += "."
    return prompt


if __name__ == '__main__':
    app.run(debug=True)
