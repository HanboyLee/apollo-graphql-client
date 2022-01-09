import { gql } from '@apollo/client';

const GETME = gql`
    query getMe {
        getMe {
            id
            email
            age
            name
            phone
            job
            gender
            address
            _thumbnail
        }
    }
`;

export default GETME;
