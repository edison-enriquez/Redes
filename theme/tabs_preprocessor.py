# tabs_preprocessor.py
import sys
import json

def main():
    data = json.load(sys.stdin)
    tabs = ""

    with open("tabs.html", "r", encoding="utf-8") as f:
        tabs = f.read()

    for section in data["sections"]:
        if "Chapter" in section:
            chapter = section["Chapter"]
            chapter["content"] = tabs + chapter["content"]

    json.dump(data, sys.stdout)

if __name__ == "__main__":
    main()
