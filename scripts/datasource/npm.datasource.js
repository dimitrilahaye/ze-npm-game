class NpmDatasource {
    async get(name) {
        const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${name}&size=1`);
        const body = await response.json();

        console.log(body.objects[0]);

        return body.objects[0];
    }
}