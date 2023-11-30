export default `# graphql
type User {
	id : Int!
	username: String!
	password: String!
	userType: userType
	createdAt: String!
	updatedAt: String!

}
enum userType {
	DEV
	ADMIN
	SUBADMIN
	USER
}
`