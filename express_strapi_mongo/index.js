var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var contacts = [
	{
		name: "katie baeten",
		age: 36,
		email: "ktb8n.foo@gmail.com",
		courses: [
			{ number: "1.00", name: "MitXpro" },
			{ number: "2.00", name: "Coping with MitXpro" },
		],
	},
	{
		name: "scooter beauregarde",
		age: 11,
		email: "noemail@cats.com",
		courses: [
			{ number: "1.00", name: "MitXpro" },
			{ number: "3.00", name: "how to be less bitey" },
		],
	},
	{
		name: "eleanor stitch",
		age: 3,
		email: "whatsthat@cats.com",
		courses: [
			{ number: "1.00", name: "MitXpro" },
			{ number: "3.00", name: "overcoming fear of people" },
		],
	},
];

var schema = buildSchema(`
  type Query {
    contact(id: Int) : Contact
    contacts: [Contact]
  },
  type Contact {
      name: String
      email: String
      age: Int
      courses: [Course]
  }
  type Course {
      number: String
      name: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    contact : (arg) => contacts[arg.id],
    contacts : () => contacts
};

var app = express();
app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);
app.listen(4000, () => {
    console.log("this is the way the old dude likes to log it");
});

console.log("Running a GraphQL API server at http://localhost:4000/graphql");
