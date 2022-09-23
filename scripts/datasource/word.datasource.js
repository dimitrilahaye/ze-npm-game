class WordDatasource {
    async get() {
        const response = await fetch("https://random-word-api.herokuapp.com/word");
        const [randomWord] = await response.json();

        return randomWord;
    }
}