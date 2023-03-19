import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")


def main():
    print("hello world")

if __name__ == "__main__":
    main()