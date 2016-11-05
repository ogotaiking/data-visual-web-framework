var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head><title>{this.props.title}</title>
          <link rel='stylesheet' href='/stylesheets/style.css' />

          </head>
        <body>{this.props.children}
        <script src="/js/common.js"></script>
        <script src={"/js/"+this.props.jslib}></script>
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;
