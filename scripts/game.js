class Game {
    ui;
    wordDatasource;
    npmDatasource;

    constructor(ui, wordDatasource, npmDatasource) {
        this.ui = ui;
        this.wordDatasource = wordDatasource;
        this.npmDatasource = npmDatasource;
    }

    init() {
        async function clickOnYesHandler() {
            this.ui.displayAnswerLoader();
            await this.resolvePlayerAnswer(this.ui.wordContent(), 'YES');
        }

        async function clickOnNopeHandler() {
            this.ui.displayAnswerLoader();
            await this.resolvePlayerAnswer(this.ui.wordContent(), 'NOPE');
        }

        async function clickOnEncoreHandler() {
            await this.getNextWord();
        }

        async function clickOnRetryHandler() {
            await this.restart();
            await this.getNextWord();
        }

        this.ui.init(
            clickOnYesHandler.bind(this),
            clickOnNopeHandler.bind(this),
            clickOnEncoreHandler.bind(this),
            clickOnRetryHandler.bind(this),
        );
    }

    async start() {
        this.init();
        await this.addNewWord();
    }

    restart() {
        this.ui.restart();
    }

    async getNextWord() {
        this.ui.getNextWord();
        await this.addNewWord();
    }

    async addNewWord() {
        this.ui.displayWordLoader();
        const randomWord = await this.searchNewWord();
        this.ui.displayWord(randomWord);
    }

    async searchNewWord() {
        return this.wordDatasource.get();
    }

    async resolvePlayerAnswer(name, playerAnswer) {
        const object = await this.npmDatasource.get(name);
        const isExist = this.isExist(name, object);

        this.displayResultBloc(playerAnswer, isExist);
        this.displayDetailsBlock(isExist, object);
    }

    displayResultBloc(playerAnswer, isExist) {
        const won = this.isWon(playerAnswer, isExist);
        if (won) {
            let points = 1;
            const difficulty = this.ui.getDifficulty();
            switch (difficulty) {
                case 'very-soft':
                    points = isExist ? 2 : points;
                    break;
                case 'soft':
                    points = isExist ? 3 : points;
                    break;
                case 'hard':
                    points = isExist ? 5 : points;
                    break;
            }
            this.ui.updateScore(points);
            return this.ui.displayWinBlock(isExist ? 'Dingue non ?' : 'Et puis quoi encore...');
        }

        return this.ui.displayLoseBlock(!isExist ? 'Et puis quoi encore...' : 'Tu sous-estimes leur imagination !');
    }

    displayDetailsBlock(isExist, object) {
        if (isExist) {
            const { package: pack } = object;

            return this.ui.displayDetailsBlock({
                name: pack.name,
                description: pack.description ?? 'aucune description (SHAMED)',
                link: pack.links.npm,
            });
        }

        return this.ui.hideDetails();
    }

    isExist(name, object) {
        const difficulty = this.ui.getDifficulty();

        switch (difficulty) {
            case 'very-soft':
                return object?.package.name.toLowerCase().includes(name) ||
                    object?.package.keywords?.map((kw) => kw.toLowerCase()).includes(name) ||
                    object?.package.description?.toLowerCase().includes(name) ||
                    false;
            case 'soft':
                return object?.package.name.toLowerCase().includes(name) ||
                    false;
            case 'hard':
                return object?.package.name.toLowerCase() === name ||
                    false;
        }
    }

    isWon(playerAnswer, isExist) {
        switch (playerAnswer) {
            case 'YES':
                return isExist;
            case 'NOPE':
                return !isExist;
        }
    }
}