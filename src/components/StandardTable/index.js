import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (nextProps.selectedRows&&nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  doRenderAlert = () => {
    const { selectedRowKeys, needTotalList } = this.state;
    const { selectable, data={} } = this.props;

    if (!selectable) {
      return <div className={styles.tableAlert}></div>;
    }
    
    return (
      <div className={styles.tableAlert}>
        <Alert
          message={
            <Fragment>
              共查到&nbsp;
              <span style={{ fontWeight: 600 }}>{data.pagination&&data.pagination.total?data.pagination.total:0}</span>
              &nbsp;条记录，已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 条。&nbsp;&nbsp;
              {needTotalList.map(item => (
                <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                  {item.title}总计&nbsp;
                  <span style={{ fontWeight: 600 }}>{item.render ? item.render(item.total) : item.total}</span>
                </span>
              ))}
              <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
            </Fragment>
          }
          type="info"
          showIcon
        />
      </div>
    )
  }

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const { data = {}, rowKey, selectable, ...rest } = this.props;
    const { list = [], pagination } = data;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = selectable ? {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    } : undefined;

    return (
      <div className={styles.standardTable}>
        {this.doRenderAlert()}
        <Table
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;
