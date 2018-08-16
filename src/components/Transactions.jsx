import React from 'react';
import { Container, Row, Col, ListGroup } from 'reactstrap';
import ReactTable from 'react-table';
import { Tooltip } from 'react-tippy';

import 'react-table/react-table.css';
import 'react-tippy/dist/tippy.css';

import CheckboxList from '../components/CheckboxList';
import TransactionDetails from '../components/TransactionDetails';
import { isData, isEmpty, numericFilter } from '../utils/helpers';

class Transactions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterable: false,
      filters: {}
    };
  }

  componentDidMount() {
    isData(this.props);
  }

  isDelete = values => {
    for (var key in values) {
      if (values[key]) {
        return false;
      }
    }
    return true;
  };

  onChange(name, values) {
    let filters = this.state.filters;

    if (this.isDelete(values)) {
      delete filters[name];
    } else {
      filters[name] = values;
    }
    this.setState({ filters: filters });
    // this.setState({ [name]: values });
  }

  toggleFilter = () => {
    this.setState({ filterable: !this.state.filterable });
  };

  render() {
    const { transactions } = this.props;
    isData(transactions);

    let account = [];
    transactions.map(item => {
      account.push(item.accountName);
    });
    const uniqueAccount = [...new Set(account)];

    let transType = [];
    transactions.map(item => {
      transType.push(item.transactionType);
    });
    const uniqueTransType = [...new Set(transType)];

    const filterable = this.state.filterable;

    const tooltipHtml = (
      <div>
        <strong>Input Methods:</strong>
        <br />
        <span>Greater Then (&gt;x),</span>
        <br />
        <span>Less Then (&lt;x),</span>
        <br />
        <span>Range (x-y)</span>
      </div>
    );

    const tipInfo = (
      <span className="filter-info pl-1">
        <Tooltip html={tooltipHtml} arrow="true" position="right" trigger="mouseenter">
          <i className="fa fa-question-circle" aria-hidden="true" />
        </Tooltip>
      </span>
    );

    const filters = this.state.filters;

    let filteredTransactions = transactions;
    let tmpData = [];

    if (!isEmpty(filters)) {
      for (var type in filters) {
        if (filters.hasOwnProperty(type)) {
          let filter = filters[type];
          for (var key in filter) {
            if (filter.hasOwnProperty(key)) {
              if (filter[key]) {
                filteredTransactions.map(item => {
                  if (item[type] == key) {
                    tmpData.push(item);
                  }
                });
              }
            }
          }
          filteredTransactions = tmpData;
          tmpData = [];
        }
      }
    }

    filteredTransactions.sort(function(a, b) {
      return a.account - b.account;
    });

    return (
      <Container fluid>
        <Row>
          <Col lg={3} md={3} sm={3} xs={3} className="pt-2">
            <h4>Filters</h4>
            <ListGroup className="pb-4">
              <h6>Account Name</h6>
              <CheckboxList
                onChange={values => this.onChange('accountName', values)}
                values={uniqueAccount}
              />
            </ListGroup>
            <ListGroup>
              <h6>Transaction Type</h6>
              <CheckboxList
                onChange={values => this.onChange('transactionType', values)}
                values={uniqueTransType}
              />
            </ListGroup>
          </Col>
          <Col lg={9} md={9} sm={9} xs={9} className="no-gatters">
            <ReactTable
              data={filteredTransactions}
              pageSizeOptions={[20, 50, 100, 500, 1000]}
              columns={[
                {
                  width: 30,
                  Header: (
                    <div style={{ float: 'left' }} onClick={this.toggleFilter}>
                      <i className="fa fa-filter airing" />
                    </div>
                  ),
                  filterable: false,
                  sortable: false,
                  resizable: false,
                  accessor: 'filter'
                },
                {
                  flexGrow: 1,
                  Header: 'ACCOUNT NO.',
                  id: 'account',
                  accessor: d => d.account,
                  resizable: false,
                  filterable: filterable,
                  sortable: true,
                  Cell: row => (
                    <Tooltip html={(<TransactionDetails account={row.value} data={filteredTransactions}/>)} interactive arrow="true" position="right" trigger="mouseenter">
                      <button type="button" class="btn btn-link">
                        {row.value}
                      </button>
                    </Tooltip>
                  )
                },
                {
                  flexGrow: 1,
                  Header: 'ACCOUNT NAME',
                  id: 'accountName',
                  resizable: false,
                  filterable: filterable,
                  sortable: true,
                  accessor: d => d.accountName
                },
                {
                  flexGrow: 1,
                  Header: 'CURRENCY',
                  id: 'currencyCode',
                  resizable: false,
                  filterable: filterable,
                  sortable: true,
                  accessor: d => d.currencyCode
                },
                {
                  flexGrow: 1,
                  Header: 'AMOUNT',
                  id: 'amount',
                  resizable: false,
                  filterable: filterable,
                  sortable: true,
                  accessor: d => d.amount,
                  Cell: row => row.value.toFixed(2),
                  filterMethod: (filter, row) => {
                    return numericFilter(filter, row[filter.id].toFixed(2));
                  },
                  Filter: ({ filter, onChange }) => (
                    <div>
                      <input
                        onChange={event => onChange(event.target.value)}
                        style={{ width: '85%' }}
                      />
                      {tipInfo}
                    </div>
                  )
                },
                {
                  flexGrow: 1,
                  Header: 'TRANSACTION TYPE',
                  id: 'transactionType',
                  resizable: false,
                  filterable: filterable,
                  sortable: true,
                  accessor: d => d.transactionType
                }
              ]}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Transactions;
