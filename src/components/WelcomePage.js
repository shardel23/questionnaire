import React from "react"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function WelcomePage(props) {
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Text className="text-muted">
                    היי! בוא/י נבדוק יחד את זכאותך להחזר מס :)
                    <br/>
                    שנצא לדרך?
                    <br/>
                </Form.Text>
                <Form.Label>שמך:</Form.Label>
                <Form.Control
                    type="name"
                    name={'name'}
                    value={props.name}
                    onChange={e => props.handleInputTextChange(e)}
                    placeholder="הקלד את שמך המלא"/>
            </Form.Group>
            <Button variant="primary" onClick={props.onSubmit}>
                התחל (לוקח פחות מדקה)
            </Button>
        </Form>
    );
}

export default WelcomePage
