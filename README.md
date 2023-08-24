# Text_Summarizer
Certainly, I'd be happy to explain each line of the provided code:

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
