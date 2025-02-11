import {Component, lazy} from "solid-js";
import FileUploader from "~/components/ui/file-uploader";
const FormLayout = lazy(() => import( "~/components/layouts/form-layout"));

const UploadContent: Component = props => {

    return (
        <FormLayout title="">
            <FileUploader/>
        </FormLayout>
    );
};

export default UploadContent;