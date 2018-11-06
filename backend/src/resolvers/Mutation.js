const mutations = {
    createDog(parent, args, ctx, info) {
        // create a dog
        console.log(args);
        global.dogs = global.dogs || [];
        const newDog = {
            name: args.name
        }
        global.dogs.push(newDog)
        return newDog
    }
};

module.exports = mutations;
