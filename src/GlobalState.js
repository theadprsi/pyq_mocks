import React, { createContext, Component } from "react";

const QuizContext = createContext();

export class UpdatedQuizContextProvider extends Component {
  state = {
    _1: null,
    _2: null,
    _3: null,
    refresh: true,
  };

  updateData = (one, two, three) => {
    this.setState({
      _1: one,
      _2: two,
      _3: three,

      refresh: !this.state.refresh,
    });
  };

  render() {
    return (
      <QuizContext.Provider
        value={{
          testContext: { ...this.state },
          updateTestContext: this.updateData,
        }}
      >
        {this.props.children}
      </QuizContext.Provider>
    );
  }
}

export default QuizContext;
