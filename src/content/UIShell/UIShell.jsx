import React from "react";
import {
    HeaderContainer, Header, SkipToContent, HeaderMenuButton, HeaderName,
    HeaderNavigation, HeaderMenu, HeaderMenuItem, HeaderGlobalBar,
    HeaderGlobalAction, SideNav, SideNavItems, Content, SideNavMenuItem, Theme, SideNavDivider
} from '@carbon/react';
import {
    Notification,
    Search,
    Switcher,
} from '@carbon/react/icons';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';

import ErrorBoundary from "../../components/ErrorBoundary";
import LandingPage from '../LandingPage';
import NotFound from '../../components/NotFound';
import Asset from "../Asset/Asset";
import Workorder from "../Workorder/Workorder";
import Location from "../Location/Location";
import Person from "../Person/Person";
import User from "../User/User";
import AssetView from "../Asset/AssetView";
import WorkorderView from "../Workorder/WorkorderView";
import LocationView from "../Location/LocationView";
import PersonView from "../Person/PersonView";
import UserView from "../User/UserView";


class UIShell extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        activeItem: `/${window.location.pathname.split('/')[1] ?? ''}`
      };
    }

    render() {
        return (
            <BrowserRouter>
                <Theme theme='g10'>
                    <HeaderContainer
                        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                            <div>
                                <Header aria-label="IBM Platform Name">
                                    <SkipToContent />
                                    <HeaderMenuButton
                                        aria-label="Open menu"
                                        onClick={onClickSideNavExpand}
                                        isActive={isSideNavExpanded}
                                    />
                                    <HeaderName href="#" prefix="Asset">
                                        Lift
                                    </HeaderName>
                                    <HeaderNavigation aria-label="Carbon React App">
                                        <HeaderMenuItem href="#">Contributing</HeaderMenuItem>
                                        <HeaderMenuItem href="#">Contact</HeaderMenuItem>
                                        <HeaderMenu aria-label="How To" menuLinkName="How To">
                                            <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
                                            <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
                                            <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
                                        </HeaderMenu>
                                    </HeaderNavigation>
                                    <HeaderGlobalBar>
                                        <HeaderGlobalAction
                                            aria-label="Search"
                                            tooltipAlignment="end">
                                            <Search size={20} />
                                        </HeaderGlobalAction>
                                        <HeaderGlobalAction
                                            aria-label="Notifications"
                                            tooltipAlignment="end">
                                            <Notification size={20} />
                                        </HeaderGlobalAction>
                                        <HeaderGlobalAction
                                            aria-label="App Switcher"
                                            tooltipAlignment="end">
                                            <Switcher size={20} />
                                        </HeaderGlobalAction>
                                    </HeaderGlobalBar>
                                    <ErrorBoundary>
                                        <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                                            <SideNavItems>
                                                <SideNavMenuItem element={Link} to='/'
                                                    isActive={this.state.activeItem === '/'}
                                                    onClick={() => { this.setState({ activeItem: '/' }) }}>
                                                    Overview
                                                </SideNavMenuItem>
                                                {/* divider here */}
                                                <SideNavDivider/>
                                                <SideNavMenuItem element={Link} to='/assets'
                                                    isActive={this.state.activeItem === '/assets'}
                                                    onClick={() => { this.setState({ activeItem: '/assets' }) }}>
                                                    Assets
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/workorders'
                                                    isActive={this.state.activeItem === '/workorders'}
                                                    onClick={() => { this.setState({ activeItem: '/workorders' }) }}>
                                                    Work Orders
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/locations'
                                                    isActive={this.state.activeItem === '/locations'}
                                                    onClick={() => { this.setState({ activeItem: '/locations' }) }}>
                                                    Locations
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/persons'
                                                    isActive={this.state.activeItem === '/persons'}
                                                    onClick={() => { this.setState({ activeItem: '/persons' }) }}>
                                                    Persons
                                                </SideNavMenuItem>
                                                <SideNavMenuItem element={Link} to='/users'
                                                    isActive={this.state.activeItem === '/users'}
                                                    onClick={() => { this.setState({ activeItem: '/users' }) }}>
                                                    Users
                                                </SideNavMenuItem>
                                                {/* <SideNavMenu renderIcon={Fade} title="Inventory" defaultExpanded>
                                                    <SideNavMenuItem element={Link} to='/inventory/items'
                                                        isActive={this.state.activeItem === '/inventory/items'}
                                                        onClick={() => { this.setState({ activeItem: '/inventory/items' }) }}>
                                                        Items
                                                    </SideNavMenuItem>
                                                </SideNavMenu>
                                                <SideNavMenu renderIcon={Fade} title="Management">
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                </SideNavMenu>
                                                <SideNavMenu
                                                    renderIcon={Fade}
                                                    title="Docs">
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                    <SideNavMenuItem href="#">
                                                        Link
                                                    </SideNavMenuItem>
                                                </SideNavMenu> */}
                                            </SideNavItems>
                                        </SideNav>
                                    </ErrorBoundary>
                                </Header>
                            </div>
                        )}
                    />
                </Theme>
                <Content className='content'>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/assets" element={<Asset />} />
                        <Route path="/workorders" element={<Workorder />} />
                        <Route path="/locations" element={<Location />} />
                        <Route path="/persons" element={<Person />} />
                        <Route path="/users" element={<User />} />
                        <Route path="/assetview" element={<AssetView />} />
                        <Route path="/workorderview" element={<WorkorderView />} />
                        <Route path="/locationview" element={<LocationView />} />
                        <Route path="/personview" element={<PersonView />} />
                        <Route path="/userview" element={<UserView />} />
                    </Routes>
                </Content>
            </BrowserRouter>
        );
    }
}

export default UIShell;
