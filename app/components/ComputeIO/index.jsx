/*
 * 1. Implement the React.Component, <Input />
 *   - It should allow the user to type text in.
 *   - Style as you wish.
 *
 * 2. Implement the React.Component, <Output />
 *   - It should show the user the computed result from calling 'isClosed()'.
 *   - Style as you wish.
 *
 * 3. Implement the React.Component, <Button />
 *   - It should handle user's click, which will call 'isClosed()'
 *   - It should handle user's pressing 'Enter', which will also call 'isClosed()'
 *
 * 4. Implement `isClosed()`
 *   - Given a string input, `str`, write a function that returns a boolean if the `str`
 *     is properly "closed". This means we have 2 types of reserved characters:
 *     1. Opening Character, "^"
 *     2. Closing Character, "$"
 *     - The function needs to check that whenever an Opening Character appears, then a Closing
 *     Character comes after it.
 *     - Likewise, whenever a Closing Character appears, means a corresponding
 *     Opening Character must have appeared previously.
 *     - It should handle nesting, so "^^$$" should return `true`.
 *     - It should ignore other characters that is not "^" or "$".
 *   - Examples:
 *     - "^$" => true
 *     - "$^" => false
 *     - "^^$$" => true
 *     - "^$$^" => false
 *     - "^$^$" => true
 *     - "^123^abc$$" => true
 */
import React from 'react';

export function Input(props) {
  const { value, onChange } = props;
  return (
    <input
      style={styles.input}
      placeholder='enter your string...'
      value={value}
      onChange={onChange}
    />
  );
}

export function Button(props) {
  return (
    <button
      style={styles.button}
      type='submit'
      onClick={props.onClick}
    >Verify</button>
  );
}

export function Output(props) {
  return (
    <h4 style={styles.output}>{String(props.value)}</h4>
  );
}

export function isClosed(str) {
  const len = str.length;
  let count = 0;
  
  for (let i = 0; i < len; i++) {
    const chr = str[i];
    if (chr === '^') {
      count ++;
    }
    if (chr === '$') {
      count --;
    }

    if (count < 0) {
      return false;
    }
  }

  return count === 0;
}

export class ComputeIO extends React.Component {
  constructor() {
    super();
    this.state = {input: '', output: ''}
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onInputChange(e) {
    this.setState({ input: e.target.value });
  }

  onButtonClick(e) {
    e.preventDefault();
    this.setState({ output: isClosed(this.state.input) });
  }

  render() {
    return (
      <form style={styles.form}>
        <Input 
          value={this.state.input}
          onChange={this.onInputChange}
        />
        <Button 
          onClick={this.onButtonClick}
        />
        <Output
          value={this.state.output}
        />
      </form>
    );
  }
}

const styles = {
  form: {
    width: '100%',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    outline: 'none',
    padding: 10,
    marginBottom: 20,
    fontSize: 15,
    lineHeight: '20px',
    borderRadius: 20,
    border: '1px solid grey',
    color: 'green',
  },
  button: {
    marginBottom: 20,
    color: 'white',
    fontSize: 15,
    lineHeight: '20px',
    outline: 'none',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    backgroundColor: 'green',
    border: 'none',
  },
  output: {
    width: '100%',
    margin: 0,
    fontSize: 30,
    lineHeight: '40px',
    color: 'green'
  }
}
