import React from 'react';
import { ListGroupItem } from 'reactstrap';

class CheckboxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.values.map((v, i) => {
      this.state[v] = false;
    });
  }

  onChange(key, value) {
    this.setState({ [key]: value }, state => {
      this.props.onChange(this.state);
    });
  }

  render() {
    return (
        <ListGroupItem>
          {this.props.values.map((value, i) => (
            <div className="checkbox" key={i}>
              <label>
                <input
                  onChange={e => this.onChange(value, e.target.checked)}
                  type="checkbox"
                  value={this.state[value]}
                />
                <span className="pl-2">{value}</span>
              </label>
            </div>
          ))}
        </ListGroupItem>
    );
  }
}

export default CheckboxList;
