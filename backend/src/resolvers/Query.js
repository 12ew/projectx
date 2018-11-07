// another way is to forwardT o DB just to oush and pull data (without authentication etc)
// const { forwardTo } = require('prisma-bidning);
// then inside of the query, do: items: forwardto('db)

const Query = {
    async items(parent, args, ctx, info) {
        const items = await ctx.db.query.items();
        return items
    }
};

module.exports = Query;
