import gql from 'graphql-tag';

const REGISTER = gql`
mutation register($username: String!, $password: String!, $name: String!){
	register(data: {
		username: $username
        password: $password
        name: $name
    }){
		token
	}
}`;

export default REGISTER;