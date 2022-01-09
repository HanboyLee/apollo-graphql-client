import { gql } from '@apollo/client';
const LOGINUSER = gql`
    mutation LoginUser($input: UserCreateInput) {
        loginUser(UserCreateInput: $input) {
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

export default LOGINUSER;
