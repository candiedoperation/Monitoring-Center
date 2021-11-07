import React from "react";
import { List } from "react-native-paper";

const FeatureAccordition = (props) => {
    const [parentTitle, setParentTitle] = React.useState();
    const [parentDescription, setParentDescription] = React.useState();
    const [featureChildren, setFeatureChildren] = React.useState([]);

    const supportedChildFeatures = [];

    React.useEffect(() => {
        switch (props.featureID) {
            case "ccb535a2-1d24-4cc1-a709-8b47d2b2ac79":
                setParentTitle("Screen Lock");
                break;

            case "e4a77879-e544-4fec-bc18-e534f33b934c":
                setParentTitle("Lock Input Devices");
                break;

            case "7311d43d-ab53-439e-a03a-8cb25f7ed526":
                setParentTitle("LogOff User");
                break;

            case "6f5a27a0-0e2f-496e-afcc-7aae62eede10":
                setParentTitle("Power Down");
                break;

            case "da9ca56a-b2ad-4fff-8f8a-929b2927b442":
                setParentTitle("Start Application");
                break;

            case "8a11a75d-b3db-48b6-b9cb-f8422ddd5b0c":
                setParentTitle("Open Website");
                break;

            case "e75ae9c8-ac17-4d00-8f0d-019348346208":
                setParentTitle("Send Message");
                break;

            default:
                setParentTitle(props.featureData.name);
                break;
        }


        props.featureData.children.forEach((childFeature) => {
            featureChildren.push(<List.Item title={childFeature.name} />);
        });

    }, []);

    return (
        <List.Accordion id={props.featureID} left={(props_internal) => <List.Icon {...props_internal} icon="circle" />} title={parentTitle} description={parentDescription}>
            {featureChildren}
            <List.Item title="Enable for This PC" />
        </List.Accordion>
    );
}
//All tyeps in this.
//Check uuid in main func and return an internal func as componeent

export default FeatureAccordition;