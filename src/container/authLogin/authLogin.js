import React, { Component } from 'react';
import './authLogin.css'
import { withRouter } from 'react-router-dom';
import { rout_dashBoard, rout_login } from '../../router/routerPath';
import { ACTION_IS_LOGIN,ACTION_LOGIN_USER_INFO } from '../../action';
import { connect } from 'react-redux';
import { login } from '../../apiRequest';
import { Row, Col } from 'react-bootstrap';
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import {
    ClipLoader,
} from 'react-spinners';
class AuthLogin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            txt_username: '',
            txt_password: '',
            isStartLoader: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        /**
         * handle back button
         */
        window.addEventListener("popstate", e => {
            if (this.state.is_login) {
                this.props.history.push(rout_dashBoard)
            }
            else {
                if (window.location.pathname === rout_login) {
                    this.props.history.push(rout_login)
                }
                else {
                    this.props.history.push(rout_login)
                }
            }
        });

    }
    login() {
        this.setState({ isStartLoader: true })
        login(this.state.txt_username)
            .then(res => {
                if(res && res.length>0){
                    let name = res[0]['name'];
                    let bdat = res[0]['birth_year'];
                    if(name === this.state.txt_username && bdat===this.state.txt_password){
                        this.setState({ isStartLoader: false, errorMessage: 'You are logged in successfully.' }, () => {
                            this.setTimerForErrorInvisible(true,res[0]);
                        })
                    }else{
                        this.setState({ isStartLoader: false, errorMessage: 'Enter Wrong Credential.' }, () => {
                            this.setTimerForErrorInvisible(false,null);
                        })
                    }
                }else{
                    this.setState({ isStartLoader: false, errorMessage: 'User not found.' }, () => {
                        this.setTimerForErrorInvisible(false,null);
                    })
                }
                
            })
            .catch(err => {
                this.setState({ isStartLoader: false, errorMessage: err }, () => {
                    this.setTimerForErrorInvisible(false,null);
                })
            })
    }

    setTimerForErrorInvisible(isLogin,loginInfo) {
        setTimeout(() => {
            this.setState({ errorMessage: "" }, () => {
                if (isLogin) {
                    this.props.ACTION_IS_LOGIN(true)
                    this.props.ACTION_LOGIN_USER_INFO(loginInfo);
                    this.props.history.replace(rout_dashBoard)
                    this.props.history.go(1)
                }
            });
        }, 2000);
    }
    btnLoginClicked() {
        if (this.state.txt_username.length <= 0) {
            alert('Kindly enter username');

        } else if (this.state.txt_password.length <= 0) {
            alert('Kindly enter password');

        } else {
            this.login();
        }
    }
    renderLoader() {

        return (<ClipLoader
            sizeUnit={"px"}
            size={25}
            color={'#FFE300'}
            loading={this.state.isStartLoader}
        />)

    }
    renderError() {
        if (this.state.errorMessage.length > 0) {
            return (<label>{this.state.errorMessage}</label>)
        }

    }
    render() {
        return (
            <div>
                <Row className="login-form-row">
                    <Col xs={{ span: 12, offset: 12 }} lg={{ span: 4, offset: 4 }}>
                        <div className="login-form-div">
                            <section className="login-form-title-section">
                                <label className="login-form-label-title">
                                    Login With Star Wars Characters
                                </label>
                            </section>
                            <section className="login-form-text-field-section">
                                <Textbox
                                    attributesInput={{
                                        id: 'Name',
                                        name: 'Name',
                                        type: 'text',
                                        placeholder: 'Username',
                                        className: 'TextBoxDesign'
                                    }}
                                    value={this.state.txt_username}
                                    onChange={(name, e) => {
                                        this.setState({ txt_username: name });

                                    }}
                                    onBlur={(e) => { console.log(e) }} // 
                                    validationOption={{
                                        name: 'Username', // Optional.[String].Default: "". To display in the Error message. i.e Please enter your {name}.
                                        check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                                        required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                                    }}

                                ></Textbox>
                                <br />
                                <Textbox
                                    attributesInput={{
                                        id: 'Password',
                                        name: 'Password',
                                        type: 'password',
                                        placeholder: 'Password',
                                        className: 'TextBoxDesign'
                                    }}
                                    value={this.state.txt_password}
                                    onChange={(name, e) => {
                                        this.setState({ txt_password: name });

                                    }}
                                    onBlur={(e) => { console.log(e) }} // 
                                    validationOption={{
                                        name: 'Password', // Optional.[String].Default: "". To display in the Error message. i.e Please enter your {name}.
                                        check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                                        required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                                    }}
                                ></Textbox>
                            </section>
                            <br />
                            {this.renderLoader()}
                            {this.renderError()}
                            <br />
                            <section>
                                <button
                                    className="login-form-submit-button"
                                    onClick={() => { this.btnLoginClicked() }}
                                >
                                    Login
                                </button>
                            </section>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    const { is_login } = state.AuthReducer
    return {
        is_login
    }
}

const _connect = connect(mapStateToProps, {
    ACTION_IS_LOGIN,
    ACTION_LOGIN_USER_INFO
})(AuthLogin)



export default withRouter(_connect)