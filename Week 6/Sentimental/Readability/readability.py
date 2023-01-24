from cs50 import get_string


def main():
    text = get_string("Text: ")

    L = count_letters(text) / count_words(text) * 100
    S = count_sentences(text) / count_words(text) * 100
    grade = round(0.0588 * L - 0.296 * S - 15.8)
    if grade > 16:
        print("Grade 16+\n")

    elif grade > 0:
        print(f"Grade {grade}\n")

    else:
        print("Before Grade 1\n")


def count_letters(text):
    ans = 0
    n = len(text)
    for i in range(n):
        if text[i].isalpha():
            ans += 1
    return ans


def count_words(text):
    ans = 0
    n = len(text)
    for i in range(n):
        if text[i] == ' ':
            ans += 1
    return ans + 1


def count_sentences(text):
    ans = 0
    n = len(text)
    for i in range(n):
        if text[i] == '.' or text[i] == '!' or text[i] == '?':
            ans += 1

    return ans


main()
