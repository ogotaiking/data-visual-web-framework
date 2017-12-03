import React, {Component} from 'react';
import {render} from 'react-dom';
import 'babel-polyfill';
var createReactClass = require('create-react-class');


import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style';

import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style';

import Breadcrumb from 'antd/lib/breadcrumb';
import 'antd/lib/breadcrumb/style';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';



const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;



var DefaultEntry =  createReactClass({
    getInitialState: function() {
        return {collapsed: false};
    },

  onCollapse: function(collapsed) {
    console.log(collapsed);
    this.setState({ collapsed });
  },
  render: function() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
});



module.exports = DefaultEntry;


