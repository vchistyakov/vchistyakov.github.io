import React from 'react';
import { Table } from 'reactstrap';

require('../utils/cycle.js');

class TransactionDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let record = null;
    const { account, data } = this.props;
    data.map(item => {
      if (item.account === account) {
        record = item;
      }
    });

    const card = (
      <div>
      <Table id="details" borderless size="sm">
        <tr>
          <td>
            <strong>Account No.: </strong>
          </td>
          <td>{record ? record.account : 'unknown'}</td>
        </tr>
        <tr>
          <td>
            <strong>Account Name: </strong>
          </td>
          <td>{record ? record.accountName : 'unknown'}</td>
        </tr>
        <tr>
          <td>
            <strong>Currency Code: </strong>
          </td>
          <td>{record ? record.currencyCode : 'unknown'}</td>
        </tr>
        <tr>
          <td>
            <strong>Amount: </strong>
          </td>
          <td>{record ? record.amount : '0'}</td>
        </tr>
        <tr>
          <td>
            <strong>Transaction Type: </strong>
          </td>
          <td>{record ? record.transactionType : 'unknown'}</td>
        </tr>
      </Table>
      </div>
    );

    return (
      <div>
        <strong className="details-header">Transaction {account}</strong>
        <br />
        {card}
      </div>
    );
  }
}

export default TransactionDetails;
