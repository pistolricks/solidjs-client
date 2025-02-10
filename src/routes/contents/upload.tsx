import {Component, lazy} from "solid-js";
import FileUploader from "~/components/ui/file-uploader";
import {RouteSectionProps} from "@solidjs/router";

const FormLayout = lazy(() => import( "~/components/layouts/form-layout"));

const Upload: Component<RouteSectionProps> = props => {

    return (
        <FormLayout title="">
            <FileUploader/>
        </FormLayout>
    );
};

export default Upload;