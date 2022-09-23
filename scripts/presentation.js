class Presentation {
    word;
    yes;
    nope;
    result;
    encore;
    details;
    resultLoader;
    difficulty;

    constructor() {
        this.result = document.querySelector('app-result');
        this.yes = document.querySelector('app-yes');
        this.nope = document.querySelector('app-nope');
        this.encore = document.querySelector('app-encore');
        this.retry = document.querySelector('app-retry');
        this.details = document.querySelector('app-details');
        this.difficulty = document.querySelector('app-difficulty');
        this.word = document.querySelector('app-word');
        this.resultLoader = document.querySelector('app-loader#result');
        this.wordLoader = this.word.shadowRoot.querySelector('app-loader#word');
        this.score = document.querySelector('app-score');
    }

    init(
        clickOnYesHandler,
        clickOnNopeHandler,
        clickOnEncoreHandler,
        clickOnRetryHandler,
    ) {
        this.yes.addEventListener("click", clickOnYesHandler);
        this.nope.addEventListener("click", clickOnNopeHandler);
        this.encore.addEventListener("click", clickOnEncoreHandler);
        this.retry.addEventListener("click", clickOnRetryHandler);
    }

    updateScore(newScore) {
        const score = Number(this.score.getAttribute('score'));
        this.score.setAttribute('score', score + newScore);
    }

    resetScore() {
        this.score.setAttribute('score', 0);
    }

    resetButtons() {
        this.result.setAttribute('display', false);
        this.details.setAttribute('display', false);
        this.encore.setAttribute('display', false);
        this.retry.setAttribute('display', false);
    }

    getNextWord() {
        this.resetButtons();
    }

    restart() {
        this.resetButtons();
        this.resetScore();
    }

    displayYesNopeButtons() {
        this.yes.setAttribute('display', true);
        this.nope.setAttribute('display', true);
    }

    wordContent() {
        return this.word.getAttribute('word');
    }

    displayWordLoader() {
        this.word.setAttribute('word', '');
        this.wordLoader.setAttribute('display', true);
    }

    displayAnswerLoader() {
        this.hideYesNopeButtons();
        this.resultLoader.setAttribute('display', true);
    }

    displayWord(word) {
        this.wordLoader.setAttribute('display', false);
        this.word.setAttribute('word', word);
        this.displayYesNopeButtons();
    }

    getDifficulty() {
        return this.difficulty.getAttribute('difficulty');
    }

    displayWinBlock(text) {
        this.result.setAttribute('subtitle', text);
        this.result.setAttribute('display', 'win');
        this.showEncoreButton();
    }

    displayLoseBlock(text) {
        this.result.setAttribute('subtitle', text);
        this.result.setAttribute('display', 'lose');
        this.showRetryButton();
    }

    hideResultLoader() {
        this.resultLoader.setAttribute('display', false);
    }

    displayDetailsBlock(details) {
        this.details.setAttribute('content', JSON.stringify(details));
        this.details.setAttribute('display', true);
    }

    hideDetails() {
        this.details.setAttribute('display', false);
    }

    hideYesNopeButtons() {
        this.yes.setAttribute('display', false);
        this.nope.setAttribute('display', false);
    }

    showEncoreButton() {
        this.hideResultLoader();
        this.encore.setAttribute('display', true);
    }

    showRetryButton() {
        this.hideResultLoader();
        this.retry.setAttribute('display', true);
    }
}