const { db } = require("../pgAdaptor");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
} = require("graphql");

const {
   ItemType,
 } = require("./types");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
  type: "Query",
  fields: {
     items: {
      type: ItemType,
      args: { itemno: { type: GraphQLString } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM dbo_items WHERE item_no=$1`;
        const values = [args.itemno];

        return db
          .one(query, values)
          .then((res) => res)
          .catch((err) => err);
      },
    },
    allItems: {
      type: new GraphQLList(ItemType),
      args: {},
      resolve(parentValue, args) {
        const query = `SELECT * FROM dbo_items`;

        return db
          .many(query)
          .then((res) => res)
          .catch((err) => err);
      },
    },
  }
})

exports.query = RootQuery;