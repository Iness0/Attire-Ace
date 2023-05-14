import React from 'react';
import { Alert } from 'react-bootstrap'

function Message({variant, children, style}) {
    return (
        <Alert variant={variant} style={style}>{children}</Alert>
    )
}

export default Message