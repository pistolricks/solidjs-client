import {Component, lazy} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "~/components/ui/breadcrumb";
import PageHeading from "~/components/layouts/partials/page-heading";


const ContentsLayout: Component<RouteSectionProps> = props => {

    return (
        <>
            {props.children}
        </>
    );
};

export default ContentsLayout;