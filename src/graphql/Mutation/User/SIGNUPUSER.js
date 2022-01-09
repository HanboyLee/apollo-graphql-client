import { gql } from '@apollo/client';

const SIGNUPUSER = gql`
    mutation signupUser($input: UserCreateInput) {
        signupUser(UserCreateInput: $input) {
            id
            email
            token
            age
            name
            phone
            job
            gender
            address
            _thumbnail
            Successful {
                code
                message
                state
            }
        }
    }
`;

export default SIGNUPUSER;
