import React, { useState, useEffect, Component } from 'react';
import ChatBot, {Loading} from 'react-simple-chatbot';
import axios from 'axios';
import PropTypes from 'prop-types';

type UserInputStep = {
  value: string
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
    console.log(this.props.steps? this.props.steps.userInput.value : "Incoherent question.");
    axios.post(`https://asksamarthsfamiliar.com/api/qa`, {
      query: this.props.steps? this.props.steps.userInput.value : "Incoherent question.",
    },
    )
    .then((response) => {
      console.log(response);
      if (response.status === 200){
        this.setState({loading: false, result: response.data.response})
        this.triggerNext();
      }
      
    })
    .catch((error) => {
      console.log(error);

      this.setState({loading: false, result: "Sorry, I think my brain blinked away, can you repeat the question?"});
      this.triggerNext();
    });
    // if (this.props.steps){
    //   fetch("http://localhost:8000/qa?" + new URLSearchParams({query: this.props.steps.userInput.value}),{ method:"POST"})
    //     .then(response=>response.json())
    //     .then(data=>{ 
    //       this.setState({loading: false, result: data.response})
    //       this.triggerNext();
    //     })
    // }
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
        message: "Woof, I'm Poof, a far from perfect blink dog familiar. Do you have questions about my creator?",
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
