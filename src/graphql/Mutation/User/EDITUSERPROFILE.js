import { gql } from '@apollo/client';
// input UserEditInput {
//         id: ID!
//         name: String
//         age: Int
//         job: String
//         gender: Int
//         address: String
//     }

const EDITUSERPROFILE = gql`
    mutation EditUserProfile($input: UserEditInput) {
        editUserProfile(input: $input) {
            id
            email
            age
            name
            phone
            job
            gender
            address
        }
    }
`;
export default EDITUSERPROFILE;
