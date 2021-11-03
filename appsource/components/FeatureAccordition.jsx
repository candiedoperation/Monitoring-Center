import React from "react";
import { List } from "react-native-paper";

const FeatureAccordition = (props) => {
    return (
        <List.Accordion id={props.featureID} left={(props_internal) => <List.Icon {...props_internal} icon="circle" />} title={"Screen Lock"} description={"SCL"}>
            <List.Item title="Enable for This PC" />
        </List.Accordion>
    );
}
//All tyeps in this.
//Check uuid in main func and return an internal func as componeent

export default FeatureAccordition;