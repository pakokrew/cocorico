var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var ReactIntl = require('react-intl');
var Reflux = require('reflux');
var ReactRouter = require('react-router');

var PageStore = require('../store/PageStore'),
    UserStore = require('../store/UserStore');

var PageAction = require('../action/PageAction'),
    UserAction = require('../action/UserAction');

var LoginButton = require('./LoginButton'),
    AccountDropdown = require('./AccountDropdown');

var Navbar = ReactBootstrap.Navbar,
    Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    NavBrand = ReactBootstrap.NavBrand;

var Link = ReactRouter.Link;

var Header = React.createClass({
    mixins: [
        Reflux.connect(PageStore, 'pages'),
        Reflux.connect(UserStore, 'users'),
        ReactIntl.IntlMixin
    ],

    componentDidMount: function()
    {
        UserAction.requireLogin();
    },

    render: function()
    {
        var currentUser = this.state.users
            ? this.state.users.getCurrentUser()
            : null;

		return (
            <div id="header">
                <Navbar fixedTop>
    		    	<NavBrand>
                        <div id="logo">
                            <Link to="/">
                                <span className="cocorico-blue">co</span>
                                <span className="cocorico-grey">cori</span>
                                <span className="cocorico-red">co</span>
                            </Link>
                        </div>
                    </NavBrand>
                    <Nav>
                        {!this.state.pages ? '' : this.state.pages.navBar().map(function(page) {
                            return (
                                <li>
                                    <Link to={'/' + page.slug} activeClassName="active">
                                        {page.title}
                                    </Link>
                                </li>
                            )
                        })}
    			    </Nav>
                    <Nav right>
                        <li>
                            {!!currentUser
                                ? <Link to={this.getIntlMessage('route.MY_TEXTS')}>
                                    {this.getIntlMessage('page.myTexts.TITLE')}
                                </Link>
                                : <div />}
                        </li>
                        <li>{!!currentUser ? <AccountDropdown fullName={currentUser.firstName + ' ' + currentUser.lastName}/> : ''}</li>
                        <li>{!currentUser ? <LoginButton /> : ''}</li>
                    </Nav>
    		  	</Navbar>
            </div>
		);
	}
});

module.exports = Header;
