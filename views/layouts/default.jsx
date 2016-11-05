var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head><title>{this.props.title}</title>
          <link rel='stylesheet' href='/stylesheets/style.css' />
          <script src="/js/common.js"></script>
          <script src="/js/vendor.js"></script>
          </head>
        <body>{this.props.children}

        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;
