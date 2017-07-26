import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, itemUpdateData, itemDeleteData } from '../actions/items';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';



class ItemList extends Component {
    componentWillMount() {
        debugger;
         if (this.props) {
            this.props.fetchSagaData({ type: "FETCH_DATA_REQUEST", payload: { user: 'ttuso', password: 'ttuso' } });
        }
        /*
        let mode;
        if (this.props.age > 70) {
            mode = 'old';
        } else if (this.props.age < 18) {
            mode = 'young';
        } else {
            mode = 'middle';
        }
        this.setState({ mode });
        */
    }

    componentWillReceiveProps(nextProps) {
        debugger;
    }

    shouldComponentUpdate(nextProps, nextState) {
        debugger;
        return true;
        /*
        if (this.props.isLoading !== nextProps.isLoading) {
            return true;
        }
        if (this.state.items !== nextState.items) {
            return true;
        }
        return true;
        */
    }

    componentDidMount() {
        debugger;
        //this.props.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
        //this.props.fetchData('http://localhost:4000/reactlogin/');
       
    }

    constructor(props) {
        super(props);
    }

    state = {
        fixedHeader: true,
        fixedFooter: true,
        stripedRows: false,
        showRowHover: false,
        selectable: true,
        multiSelectable: true,
        enableSelectAll: true,
        deselectOnClickaway: true,
        showCheckboxes: true,
        height: '300px',
        items: [],
        mode: undefined,
        itemsHasErrored : false,
        itemsIsLoading : false
    };

    _handleTouchTap = (row, edit) => {
        debugger;
        //console.log(e);
        //alert(e.target)
        //alert(e.target.outerHTML)
        //alert(e.target.name)
        if (edit === "E") {
            this.props.updateData({ type: "UPDATE_ROW", payload: row });
            //this.props.updateData(row);
        } else {
            this.props.deleteData({ type: "DELETE_ROW", payload: row });
        }
        //e.preventDefault();
        //this.forceUpdate();
        //alert(row);

    }

    render() {
        /*
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        */

        return (
            <div>
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="The ID" style={{ width: '20px' }}>ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Name" style={{ width: '200px' }}>Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="School" style={{ width: '60px' }}>School</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Title" style={{ width: '80px' }}>Title</TableHeaderColumn>
                            <TableHeaderColumn tooltip=".">...</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.props.items.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{ width: '20px' }}>{index}</TableRowColumn>
                                <TableRowColumn style={{ width: '200px' }}>{row.gs_pr_name}</TableRowColumn>
                                <TableRowColumn style={{ width: '60px' }}>{row.gs_oru_i}</TableRowColumn>
                                <TableRowColumn style={{ width: '80px' }}>{row.gs_ttl_i}</TableRowColumn>
                                <TableRowColumn>
                                    <RaisedButton label="Edit" name="Edit" primary={true} style={{ margin: '1px' }} onTouchTap={(e) => this._handleTouchTap(row, "E")} />
                                    <RaisedButton label="Delete" name="Delete" primary={true} style={{ margin: '1px' }} onTouchTap={(e) => this._handleTouchTap(row, "D")} />
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            /*
            <ul>
                {this.props.items.map((item,index) => (
                    <li key={index}>
                        {item.gs_pr_name}
                    </li>
                ))}
            </ul>
            */
        );
    }
}

//ItemList.defaultProps = {};

/*
ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired,
    deleteData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};
*/

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    debugger;
    return {
        //fetchData: (url) => dispatch(itemsFetchData(url)),
        fetchSagaData: (data) => dispatch(data),
        updateData: (item) => dispatch(item),
        deleteData: (item) => dispatch(item)
        //fetchData: (url) => dispatch(itemsFetchData(url))        
        //updateData: (item) => dispatch(itemUpdateData(item)),
        //deleteData: (item) => dispatch(itemDeleteData(item))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
