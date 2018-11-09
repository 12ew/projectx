// another way is to forwardT o DB just to oush and pull data (without authentication etc)
// then inside of the query, do: items: forwardto('db)
const { forwardTo } = require('prisma-binding');

const Query = {
    items: forwardTo('db'),
    item: forwardTo('db')
    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.query.items();
    //     return items
    // }
};

module.exports = Query; 
