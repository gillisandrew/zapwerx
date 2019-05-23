import React, { Component } from 'react';
import Scrollspy from 'react-scrollspy';

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tabs: [
        { content: 'Welcome', href: '#intro' },
        { content: 'Who we are', href: '#one' },
        { content: 'What we do', href: '#two' },
        { content: 'Get in touch', href: '#three' },
      ],
    };

    this.onTabSelect = this.onTabSelect.bind(this);
  }

  onTabSelect(index) {
    this.setState({ activeTab: index });
  }

  render() {
    const { tabs, activeTab } = this.state;
    return (
      <section id="sidebar">
        <div className="inner">
          <nav>
            <Scrollspy currentClassName="active" items={this.state.tabs.filter((e) => e.href.match(/^#/)).map((e) => e.href.slice(1))}>
              {tabs.map((tab, i) => {
                const { href, content } = tab;
                return (
                  <li
                    key={href}
                    className={i === activeTab ? 'active' : ''}
                  >
                    <a
                      href={href}
                      onClick={e => {
                        e.preventDefault();
                        this.onTabSelect(i);
                      }}
                    >
                      {content}
                    </a>
                  </li>
                );
              })}
            </Scrollspy>
          </nav>
        </div>
      </section>
    );
  }
}

export default Sidebar;
