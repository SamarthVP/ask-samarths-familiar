import React, { useState, useEffect, Component } from 'react';
import ChatBot, {Loading} from 'react-simple-chatbot';
import axios from 'axios';
import PropTypes from 'prop-types';
import Box from "@mui/material/Box"
import Fade from '@mui/material/Fade';
import {isMobile} from 'react-device-detect';

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
      if (error.response){
        if (error.response.status === 429){
          this.setState({loading: false, result: "Sorry, I've recieved too many questions, I need to take a nap now. Can you ask again in a few minutes?"});
          this.triggerNext();
        }
        else{
          this.setState({loading: false, result: "Sorry, I think my brain blinked away, can you repeat the question?"});
          this.triggerNext();
        }
      }
      else{
        this.setState({loading: false, result: "Sorry, I think my brain blinked away, can you repeat the question?"});
        this.triggerNext();
      }
      
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

function sx(){
  if (isMobile){
    return null
  }
  return {mr:25, ml:25, pb:20, pt:5}
}

function ChatWindow(){
  return (
    <Fade appear={true} in={true} timeout={1500} easing="ease-in">
      <Box 
      sx={sx()}
      >
        <ChatBot
        width={1000}
        // hideHeader="true"
        headerTitle="Meet Poof, Samarth's Familiar"
        placeholder="Ask a question ..."
        botAvatar="/favicon.ico"
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
      </Box>
    </Fade>
  )}

export default ChatWindow
