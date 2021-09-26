import React from 'react';

type FooterProps = {
    footer: string
}
//Component <Props, State>
export class Footer extends React.Component<FooterProps, {}> {
    render() {
        const { footer } = this.props
        return(
            <nav>
                <h6> { footer } </h6>
            </nav>
        )
    }
}