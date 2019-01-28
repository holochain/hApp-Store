import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import SplashNav from "../components/SplashNav";
import './SplashScreen.css';

import store from '../store'
import { fetchPOST } from '../utils'
import { WelcomeMsg, ReduxAction } from '../../../types';

import { Hash } from '../../../holochain';

type SplashScreenProps = {
  fetchAgent: () => void,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentCategory: string,
  registerCategoryType: (category) => Promise<any>,
}


type SplashScreenState = {
  toggleMessage: boolean,
  panels1: Array<any>,
  panels2: Array<any>,
  toggle1: boolean,
  toggle2: boolean,
  toggle3: boolean,
  toggle4: boolean,
  toggle5: boolean,
  toggle6: boolean,
  toggle7: boolean,
  toggle8: boolean,
  toggle9: boolean,
  toggle10: boolean,
}

class SplashScreen extends React.Component<SplashScreenProps, SplashScreenState> {
  constructor(props) {
    super(props);
    this.state = {
      toggleMessage: true,
      panels1: [
        {name: 'Games', icon: "videogame_asset", btn: "Play"},
        {name: 'Admin Tools', icon: "timeline", btn: "Browse"},
        {name: 'Dev Tools', icon: "code", btn: "Dive In"},
        {name: 'Top Downloads', icon: "stars", btn: "Visit"},
        {name: 'Categories', icon: "format_list_bulleted", btn: "See"},
      ],
      panels2: [
        {name: 'Movies', icon: "movie_filter", btn: "Watch"},
        {name: 'Educational', icon: "book", btn: "Learn"},
        {name: 'Finance', icon: "attach_money", btn: "Save"},
        {name: 'Leisure', icon: "language", btn: "Travel"},
        {name: 'Music', icon: "music_note", btn: "Listen"},
      ],
      toggle1: false,
      toggle2: false,
      toggle3: false,
      toggle4: false,
      toggle5: false,
      toggle6: false,
      toggle7: false,
      toggle8: false,
      toggle9: false,
      toggle10: false,
    };
  }

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public registerCategory = (category) => {
    this.props.registerCategoryType(category)
  }

  public removeMessages = () => {
    // console.log("SET THE STATE TO FALSE");
    this.setState({toggleMessage: false });
  }

  public render(){
    if (!this.props.currentAgent) {
      return <div/>
    }
    const renderWelcomeMsgs = () => {
      const { agent } = this.props.currentAgent!;
      const waitGreeting1: WelcomeMsg = `Hello ${agent.Name}`
      const waitGreeting2: WelcomeMsg = "Welcome to the Holo App Store";
      if (this.state.toggleMessage === true) {
        setInterval(() => {this.removeMessages()}, 6150);
        return (
          <div>
            <h1 className={`${this.state.toggleMessage ? `welcome-message-1` : `welcome-message-1 no-show`}`}>{ waitGreeting1 }</h1>
            <h1 className={`${this.state.toggleMessage ? `welcome-message-2` : `welcome-message-2 no-show`}`}>{ waitGreeting2 }</h1>
          </div>
        )
      }
    }

    return (
      <div>
        <SplashNav/>
        {renderWelcomeMsgs()}
        <div className="splash-screen-container" style={{ textAlign: 'center' }}>
          <h1 className="app-store-header">App Store</h1>
          <hr className="app-store-header-underline"/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ currentAgent, currentCategory }) => ({ currentAgent, currentCategory });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => true,
  registerCategoryType: (category) => {
    console.log("category CALLED : ", category );
    dispatch({ type: 'REGISTER_CATEGORY', category })
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
