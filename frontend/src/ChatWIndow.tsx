import React, { useState, useEffect, Component } from 'react';
import ChatBot, {Loading} from 'react-simple-chatbot';
import axios from 'axios';
import PropTypes from 'prop-types';

type UserInputStep = {
  value: String
}

type Steps = {
  userInput: UserInputStep,
}

type GetResponseProps = {
  steps?: Steps,
  triggerNextStep?: Function,
};
type GetResponseStates = {
  loading: Boolean,
  result: String,
  trigger: Boolean,
};

class GetResponse extends Component<GetResponseProps, GetResponseStates> {
  constructor(props: GetResponseProps) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggerNext = this.triggerNext.bind(this);
  }

  triggerNext() {
    this.setState({ trigger: true }, () => {
      if (this.props.triggerNextStep){
        this.props.triggerNextStep();
      }
    });
  }

  componentDidMount(){
    axios.post('http://127.0.0.1:8000/qa', {
      query: this.props.steps? this.props.steps.userInput.value : "Incoherent question.",
    })
    .then((response) => {
      console.log(response);
      // if (response.status === 200){
      //   this.setState({loading: false, result: response.data.response})
      //   this.triggerNext();
      // }
      // else {
      //   console.log(response);
      // }
      
      this.triggerNext();
    })
    .catch((error) => {
      console.log(error);
      
      this.setState({loading: false, result: "bruh"});
      this.triggerNext();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div>
        { loading ? <Loading /> : result }
      </div>
    )
  }
}

function ChatWindow(){
  return (
    <ChatBot
    width={1000}
    steps={[
      {
        id: '1',
        message: 'Say something',
        trigger: 'userInput',
      },
      {
        id: 'userInput',
        user: true,
        trigger: 'response',
      },
      {
        id: 'response',
        component: <GetResponse />,
        waitAction: true,
        trigger: 'userInput',
      },
    ]}
    />
  )}

export default ChatWindow