import * as React from 'react';
import * as redux from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import MainNav from "../components/MainNav";
import './CategoryPage.css';

import JdenticonPlaceHolder from '../components/JdenticonFiller';

import store from '../store'
import { fetchPOST } from '../utils'
import { ReduxAction } from '../../../types';

import { Hash } from '../../../holochain';

type CategoryPageProps = {
  allApps: Map<Hash,{ title: string, icon: string }>,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  appsByCategory: Map<string, Array<{Hash,string}>>,
  currentCategory: string,
  fetchAgent: () => void,
  fetchAllApps: () => void,
  fetchAppDetails: () => void,
}

class CategoryPage extends React.Component <CategoryPageProps, {}> {
  public componentDidMount() {
    this.props.fetchAgent();
    setInterval(this.props.fetchAllApps, 500);
  }

  public handleSelectApp = () => {
    // this.props.fetchAppDetails();
  }

  public render() {
    const greeting: string = "Category Page";
    if (!this.props.currentAgent) {
      return <div>
        <h4 className="loading-text">Loading...</h4>
      </div>
    }
    else {
      const { agent } = this.props.currentAgent;
      return (
          <div>
            <MainNav/>
            <div style={{ textAlign: 'center' }}>
              <h1 className="category-header">{ greeting }</h1>
              <hr className="category-header-line"/>
              <Link to={`/appstore/${agent.Hash}`}>
              <div className="appstore-app-icons" onClick={this.handleSelectApp}>
                {/* // BELOW> : The App Icon should instead pass the App Hash into the hash prop,... (not the whoami Hash). */}
                <JdenticonPlaceHolder className="jdenticon" size={150} hash={ agent.Hash } />
              </div>
              </Link>
              {/* // BELOW> : This should instead be the App Hash (... not the whoami Hash). */}
              <Link to={`/appstore/${this.props.currentCategory}/${agent.Hash}`}>
              <div className="appstore-app-icons" onClick={this.handleSelectApp}>
                {/* // BELOW> : The App Icon should instead pass the App Hash into the hash prop,... (not the whoami Hash). */}
                <JdenticonPlaceHolder className="jdenticon" size={150} hash={ agent.Hash } />
              </div>
            </Link>
          </div>
        </div>
      );
    }
  }
}


const mapStateToProps = ({ allApps, currentAgent, appsByCategory, currentCategory }) => ({ allApps, currentAgent, appsByCategory, currentCategory });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
      .then(agent => {
        dispatch({ type: 'FETCH_AGENT', agent })
      })
  },
  fetchAppDetails: (appHash) => {
    fetchPOST('/fn/happs/getApp', appHash)
      .then( appDetails => {
        dispatch({ type: 'VIEW_APP', appDetails })
      })
  },
  getAppsByCategory: (category) => {
    fetchPOST('/fn/happs/getAppsByCategories', category)
      .then( appsByCategory => {
        dispatch({ type: 'FETCH_APP_BY_CATEGORY', category, appsByCategory })
      })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);