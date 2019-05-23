import React, { Component } from 'react';
import Scrollspy from 'react-scrollspy';
import { Link } from 'gatsby';

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        { content: 'Welcome', href: '#intro' },
        { content: 'Who we are', href: '#main' },
        { content: 'Get in touch', href: '#contact' },
      ],
    };

  }
  renderItem({href, content}) {
    if(href.match(/^\/.+/)) {
      return <Link to={href}>{content}</Link>
    }else if(href.match) {
      return <a href={href}>{content}</a>
    }
  }

  render() {
    const { tabs } = this.state;
    return (
      <section id="sidebar">
        <div className="inner">
          <h2>ZAPWERX</h2>
          <nav>
            <Scrollspy currentClassName="active" offset={-100} items={this.state.tabs.filter((e) => e.href.match(/^#/)).map((e) => e.href.slice(1))}>
              {tabs.map(({href, content}) => 
                <li>
                  {this.renderItem({href, content})}
                </li>
              )}
            </Scrollspy>
          </nav>
        </div>
      </section>
    );
  }
}

export default Sidebar;
