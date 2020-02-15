import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './searchPlanet.css';
import { rout_login, rout_dashBoard } from '../../router/routerPath';
import { connect } from 'react-redux';
import { ACTION_IS_LOGIN, ACTION_LOGOUT } from '../../action';
import { searchPlanet } from '../../apiRequest';
class SearchDashboard extends Component {


    constructor(props) {
        super(props)
        this.state = {
            
            searchString: '',
            searchIndex: 1,
            serachResults: [],
            time: 0,
            isOn: false,
            start: 0
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }
    startTimer() {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time
        })
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }, () => {
            if (this.state.time > 60000) {
                this.resetTimer();
            }
        }), 1000);
    }
    stopTimer() {
        this.setState({ isOn: false })
        clearInterval(this.timer)
    }
    resetTimer() {
        this.setState({ time: 0, isOn: false, searchIndex: 1 }, () => {
            this.startTimer();
        })
    }
    componentDidMount() {
        window.addEventListener("popstate", e => {
            if (this.props.is_login) {
                if (this.props.history.location.pathname === rout_login) {
                    this.props.history.push(rout_dashBoard)
                }
            }
        });
        this.startTimer();
    }
    componentWillUnmount() {
        this.stopTimer()
    }
    renderLogoutButton() {
        return (<section>
            <div style={{ 'textAlign': 'center' }}>
                <button
                    className="search-form-submit-button"
                    onClick={() => { this.btnLogoutClicked() }}
                >
                    Logout
            </button>
            </div>
        </section>);
    }

    btnLogoutClicked() {
        this.props.ACTION_IS_LOGIN(false)
        this.props.ACTION_LOGOUT({});
        this.props.history.replace(rout_login)
        this.props.history.go(1)
    }
    onEnterKeyPress() {
        if (this.state.searchString.length > 0) {
            if (this.props.user_login_info['name'] !== "Luke Skywalker" && this.state.searchIndex > 15) {
                alert('Search limit exceeded. You can make only 15 serach in a minut.')
            } else {
                this.doSearchPlanet();
            }
        } else {
            this.setState({ serachResults: [] })
        }
    }
    doSearchPlanet() {
        searchPlanet(this.state.searchString)
            .then(res => {
                if (res && res.length > 0) {
                    try {
                        res.sort((a, b) =>

                            ((b.population === "unknown" ? 0 : b.population) - (a.population === "unknown" ? 0 : a.population))
                        )
                    } catch (ex) {

                    }
                }
                this.setState({ serachResults: res })
                this.setState({ searchIndex: (this.state.searchIndex + 1) })
            })
            .catch(err => {
                this.setState({ searchIndex: (this.state.searchIndex + 1) })
                alert(err)
            })
    }
    handleSearch(e) {
        e.preventDefault();
        this.setState({
            searchString: e.target.value
        }, () => {
            this.onEnterKeyPress();
        });
    }
    renderSerachItems() {
        if (this.state.serachResults.length > 0) {
            return this.state.serachResults.map((item, i) => {
                return (
                    <div className="search-result-item">
                        <lable>{"Planet Name : " + item.name}</lable>
                        <br />
                        <lable style={{ 'font-size': (30 - i) }}>{"Population : " + item.population}</lable>
                    </div>

                );
            })
        } else {
            return (<lable>0 Results</lable>);
        }
    }
    render() {
        return (
            <div>
                <section className="search-form-title-section">
                    <h3><label className="search-form-label-title">
                        Search Starwars Planets
                                </label></h3>
                </section>
                {/* <lable>timer : {ms(this.state.time)}</lable> */}
                {this.renderLogoutButton()}
                <div style={{ 'textAlign': 'center' }}>
                    <input
                        type="text"
                        placeholder={'Type planet name here'}
                        className="SearchTextBoxDesign"
                        value={this.state.searchString}
                        onChange={this.handleSearch.bind(this)}
                    // onKeyPress={e => {
                    //     if (e.key === "Enter") {
                    //         this.onEnterKeyPress();
                    //     }
                    // }}
                    />

                </div>
                <div className="search-result-div">

                    {this.renderSerachItems()}

                </div>
            </div>
        )
    }
}


const mapStateToProps = function (state) {
    const { is_login,
        user_login_info } = state.AuthReducer
    return {
        is_login,
        user_login_info
    }
}

const _connect = connect(mapStateToProps, {
    ACTION_IS_LOGIN,
    ACTION_LOGOUT
})(SearchDashboard)



export default withRouter(_connect)