import React from 'react';

type HeaderProps = {
    header: string
}
//Component <Props, State>
export class Header extends React.Component<HeaderProps, {}> {
    render() {
        const { header } = this.props
        return(
            <nav>
                <h1> { header } </h1>
            </nav>
        )
    }
}