import React from 'react';

type HeaderProps = {
    brand: string
}
//Component <Props, State>
export class Header extends React.Component<HeaderProps, {}> {
    render() {
        const { brand } = this.props
        return(
            <nav>
                <h1> { brand } </h1>
            </nav>
        )
    }
}