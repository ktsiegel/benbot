import os
import openai

from dotenv import load_dotenv

load_dotenv()


def main():
    openai.api_key = os.getenv("OPENAI_API_KEY")
    example_practices = open("example_practices.txt", "r").read()

    answer = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful swim coach tasked with generating swim practices for a swim team." \
            "Practices must be between 4000 and 5000 yards, and must include a warmup of 600-800 yards, " \
                "a pre-main set of 600-1200 yards, a main set of 1500-2500 yards, and a cool down of 200-400 yards."},
            {"role": "system", "content": "Here are some example practices:\n" + example_practices},
            {"role": "user", "content": "Generate a new swim practice."},
        ]
    )

    for choice in answer["choices"]:
        print(choice["message"]["content"])

if __name__ == "__main__":
    main()