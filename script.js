document.getElementById("summarize-btn").addEventListener("click", function() {
    var text = document.getElementById("input-text").value;

    // Tokenize the text into sentences
    var sentList = text.split('. ');

    // Calculate the length for summary
    var length = sentList.length > 20 ? Math.round(sentList.length / 10) : 1;

    // Remove punctuation
    var nopuch = text.replace(/[^\w\s]/g, '');

    // Tokenize and process the text
    var processedText = nopuch.split(/\s+/).filter(function(word) {
        return !stopWords.includes(word.toLowerCase());
    });

    // Calculate word frequencies
    var wordFreq = {};
    processedText.forEach(function(word) {
        if (!wordFreq[word]) {
            wordFreq[word] = 1;
        } else {
            wordFreq[word]++;
        }
    });

    // Normalize word frequencies
    var maxFreq = Math.max(...Object.values(wordFreq));
    Object.keys(wordFreq).forEach(function(word) {
        wordFreq[word] = wordFreq[word] / maxFreq;
    });

    // Tokenize sentences and calculate sentence scores
    var sentScore = {};
    sentList.forEach(function(sent) {
        var words = sent.toLowerCase().split(/\s+/);
        var score = words.reduce(function(acc, word) {
            return acc + (wordFreq[word] || 0);
        }, 0);
        sentScore[sent] = score;
    });

    // Get the top sentences for summary
    var summarySents = Object.keys(sentScore).sort(function(a, b) {
        return sentScore[b] - sentScore[a];
    }).slice(0, length);

    var summary = summarySents.join('. ');
    document.getElementById("output-area").textContent = summary;
});

var stopWords = ["a", "about", "above", "after", "an" , "the"]; // List of stopwords
