# Text_Summarizer

**Description:**
The Text Summarizer project is a simple web-based application that allows users to input a piece of text and receive a summarized version of the text. The application processes the input text and extracts the most relevant sentences to create a concise summary. This project demonstrates the implementation of a basic text summarization algorithm using JavaScript and user-friendly HTML/CSS interface.

**Features:**
1. **User Interface:** The project provides a user-friendly interface with a title, text input area, "Summarize" button, and an output area to display the generated summary.

2. **Summarization Algorithm:** The project utilizes a simple summarization algorithm that processes the input text to create a summary. It calculates the length of the summary based on the sentence count in the input text.

3. **Sentence Tokenization:** The input text is tokenized into sentences, which are processed individually for summarization.

4. **Stopword Removal:** Common stopwords (e.g., "a", "an", "the", "and", etc.) are removed from the text to focus on meaningful words.

5. **Word Frequency Calculation:** The frequency of words in the processed text is calculated to determine the importance of each word in the text.

6. **Sentence Scoring:** Sentences are scored based on the frequency of their constituent words. Sentences containing important words have higher scores.

7. **Summary Generation:** The sentences with the highest scores are selected to create the summary. The number of sentences in the summary is determined based on the length of the input text.

**Technologies Used:**
- HTML: Provides the structure and elements of the web page, including input text area, button, and output area.
- CSS: Styles the user interface, making it visually appealing and responsive.
- JavaScript: Implements the summarization logic, text processing, and user interaction.

**Usage:**
1. Users open the application in a web browser.
2. They enter the text they want to summarize into the input text area.
3. Clicking the "Summarize" button triggers the summarization algorithm.
4. The application processes the text and displays a summarized version in the output area.

**Benefits:**
- The Text Summarizer project showcases the use of basic JavaScript for processing and summarizing text.
- It provides a practical demonstration of natural language processing concepts, such as sentence tokenization and stopwords removal.
- Users can quickly obtain condensed versions of lengthy texts, making it useful for reviewing large documents or articles.

**Limitations:**
- The summarization algorithm used in this project is basic and might not produce highly accurate summaries for all types of text.
- It relies on a manually curated list of stopwords, which may not cover all possible cases.
- The project does not use advanced NLP libraries, which could offer more sophisticated summarization techniques.

**Future Enhancements:**
- Integration of more advanced NLP libraries like "compromise" or "natural" for improved summarization accuracy.
- Implementation of more complex summarization algorithms that consider semantic meaning and context.
- User customization options for specifying the desired length of the summary or specific topics to focus on.

Overall, the Text Summarizer project offers an insightful introduction to text summarization and basic natural language processing concepts through a practical web application.


```python
import nltk
import string
from heapq import nlargest
```
- These lines import necessary modules and functions from Python libraries. `nltk` is the Natural Language Toolkit library used for natural language processing, `string` provides various string-related operations, and `nlargest` is a function from the `heapq` module that returns the n largest elements from a collection.

```python
text = "Enter Text to Summarize"
```
- This line initializes a string variable `text` with the content that you want to summarize.

```python
if text.count(". ") > 20:
    length = int(round(text.count(". ")/10, 0))
else:
    length = 1
```
- This block calculates the desired length of the summary based on the number of sentences in the provided text. If the text contains more than 20 sentences (determined by counting the occurrences of ". "), the length of the summary is set to roughly one-tenth of the sentence count, rounded to the nearest integer. Otherwise, the length of the summary is set to 1 sentence.

```python
nopuch =[char for char in text if char not in string.punctuation]
nopuch = "".join(nopuch)
```
- These lines remove punctuation from the `text` string. It creates a list called `nopuch` containing characters from `text` that are not in the set of string punctuation. Then, it joins these characters back together into a string without punctuation and assigns it to the `nopuch` variable.

```python
processed_text = [word for word in nopuch.split() if word.lower() not in nltk.corpus.stopwords.words('english')]
```
- This line tokenizes the `nopuch` string into words and creates a list called `processed_text`. It filters out common English stopwords using the `nltk.corpus.stopwords.words('english')` list, which contains words like "a", "an", "the", etc.

```python
word_freq = {}
for word in processed_text:
    if word not in word_freq:
        word_freq[word] = 1
    else:
        word_freq[word] = word_freq[word] + 1
```
- This block calculates the frequency of each word in the `processed_text` list and stores it in the `word_freq` dictionary. If a word is encountered for the first time, it's added to the dictionary with a frequency of 1. If the word is encountered again, its frequency is incremented.

```python
max_freq = max(word_freq.values())
for word in word_freq.keys():
    word_freq[word] = (word_freq[word]/max_freq)
```
- These lines normalize the word frequencies in the `word_freq` dictionary by dividing each frequency by the maximum frequency in the dictionary. This ensures that the frequencies are in a normalized range between 0 and 1.

```python
sent_list = nltk.sent_tokenize(text)
```
- This line tokenizes the `text` into a list of sentences using the `nltk.sent_tokenize()` function.

```python
sent_score = {}
for sent in sent_list:
    for word in nltk.word_tokenize(sent.lower()):
        if word in word_freq.keys():
            if sent not in sent_score.keys():
                sent_score[sent] = word_freq[word]
            else:
                sent_score[sent] = sent_score[sent] + word_freq[word]
```
- These lines calculate a score for each sentence in the `sent_list` based on the frequency of words in the `word_freq` dictionary. It tokenizes each sentence into words, converts them to lowercase, and checks if they are present in the `word_freq` dictionary. If a word is found, its corresponding frequency is added to the score of the sentence. The scores are stored in the `sent_score` dictionary.

```python
summary_sents = nlargest(length, sent_score, key=sent_score.get)
```
- This line uses the `nlargest` function to select the top `length` sentences from the `sent_score` dictionary based on their scores.

```python
summary = " ".join(summary_sents)
```
- This line joins the selected summary sentences into a single string called `summary`, using a space as the separator.

```python
print(summary)
```
- Finally, this line prints the generated summary.

In summary, the provided code takes a piece of text, processes it to create a summary by assigning scores to sentences based on the frequency of significant words, and then selects the most important sentences for the final summary.
