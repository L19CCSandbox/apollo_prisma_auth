import gql from 'graphql-tag';

const GET_USERS = gql`
	{
        users {
            name
        }
    }
`;

export default GET_USERS;