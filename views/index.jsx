var React = require('react');
var DefaultLayout = require('./layouts/default');

class HelloMessage extends React.Component {
    render() {
        return (
            <DefaultLayout title={this.props.title} >
                <link rel="stylesheet" href="css/bootstrap.min.css"/>
                <link rel="stylesheet" href="css/font-awesome.min.css"/>
                <div id="DefaultEntry"></div>
                {['index.js'].map(function(item) {
                    return <script src={"/js/" + item} key={item}></script>;
                })}
            </DefaultLayout>
        );
    }
}

module.exports = HelloMessage;
