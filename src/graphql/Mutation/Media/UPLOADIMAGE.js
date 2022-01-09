import { gql } from '@apollo/client';

const UPLOADIMAGE = gql`
    mutation SingleUpload($file: Upload!, $size: Int!) {
        singleUpload(file: $file, size: $size) {
            filename
            mimetype
            encoding
        }
    }
`;

export default UPLOADIMAGE;
