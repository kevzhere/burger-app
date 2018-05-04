import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxx/Auxx';

const ErrorHandler=(Component, axios) =>{
    return class extends Component {
        state ={
            error: null
        }
        componentDidMount() {            
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error=>{
                this.setState({error: error})
            });
        }

        errorConfirmedHandler = () => {
            this.setState( { error: null } );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }


        render(){
            return(
                <Aux>
                <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}
                >
                    {this.state.error? this.state.error.message : null}
                </Modal>
                <Component {...this.props} />
            </Aux>
            )
        }
    }
}

export default ErrorHandler;