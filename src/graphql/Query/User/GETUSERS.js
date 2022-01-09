import { gql } from '@apollo/client';

const GETUSERS = gql`
    query GetUsers {
        getUsers {
            id
            email
        }
    }
`;

export default GETUSERS;
