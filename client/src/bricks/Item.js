import React from "react";
import Card from "react-bootstrap/Card";
import Icon from '@mdi/react';
import { mdiCogOutline } from '@mdi/js';

class Item extends React.Component {
    render() {

        return (
            <Card>
                <Card.Body>
                    <div>
                        {this.props.item.Name} {this.props.item.Price}
                    </div>
                    <div>
                        <Icon path={mdiCogOutline} size={1} />
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default Item;